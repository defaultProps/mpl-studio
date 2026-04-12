import * as parser from '@babel/parser';
import generate from '@babel/generator';
import * as t from '@babel/types';
import traverse from '@babel/traverse';
import { javascript } from "@codemirror/lang-javascript";
import {
  drawSelection,
  dropCursor,
  highlightActiveLine,
  lineNumbers,
  EditorView
} from '@codemirror/view'
import {
  indentUnit,
  indentOnInput,
  foldGutter,
  defaultHighlightStyle,
  bracketMatching,
  syntaxHighlighting
} from '@codemirror/language'
import { history } from '@codemirror/commands'
import { oneDark } from '@codemirror/theme-one-dark'

/**
 * 在变量的嵌套对象中插入方法
 * @param {string} code - 完整代码，如 "const mpl = { methods: {} }"
 * @param {string} varName - 变量名，如 "mpl"
 * @param {string[]} propertyPath - 属性路径，如 ["methods"], // 支持多层嵌套 ['var', 'methods'] => mpl.var.methods
 * @param {string} newMethodStr - 新方法字符串，如 "submit() {}"
 */
export function insertMethodIntoNestedObject(code: string, varName: string, propertyPath: string[], newMethodStr: string): { success: boolean, code: string, error: string } {
  try {
    // === 1. 解析完整代码 ===
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });

    let targetObject: any = null;

    // === 2. 遍历 AST 找到目标 ObjectExpression ===
    const findTargetObject = (node: any) => {
      if (t.isVariableDeclaration(node)) {
        for (const decl of node.declarations) {
          if (t.isIdentifier(decl.id) && decl.id.name === varName) {
            // 找到 const mpl = ...
            targetObject = extractNestedObject(decl.init, propertyPath);
            return;
          }
        }
      }
      if (t.isProgram(node)) {
        for (const stmt of node.body) {
          findTargetObject(stmt);
          if (targetObject) return;
        }
      }
    };

    findTargetObject(ast.program);

    if (!targetObject) {
      throw new Error(`未找到 ${varName}.${propertyPath.join('.')}`);
    }

    // === 3. 解析新方法（使用稳健方式：转函数再提取）===
    const methodTrimmed = newMethodStr.trim();
    const nameMatch = methodTrimmed.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/);
    if (!nameMatch || !nameMatch[1]) {
      throw new Error('无法解析方法名');
    }
    const methodName = nameMatch[1];

    // 构造临时函数解析 body
    const fakeFunc = `function tmp_${methodName} ${methodTrimmed.slice(methodName.length)}`;
    const funcAst = parser.parse(fakeFunc, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });
    const funcDecl = funcAst.program.body[0];
    if (!t.isFunctionDeclaration(funcDecl)) {
      throw new Error('方法解析失败');
    }

    // 检查是否已存在
    const exists = targetObject.properties.some((prop: any) => {
      if (t.isObjectMethod(prop) || t.isObjectProperty(prop)) {
        let key;
        if (t.isIdentifier(prop.key)) key = prop.key.name;
        else if (t.isStringLiteral(prop.key)) key = prop.key.value;
        return key === methodName;
      }
      return false;
    });

    if (exists) {
      throw new Error(`方法 "${methodName}" 已存在`);
    }

    // 创建新方法节点
    const newMethodNode = t.objectMethod(
      'method',
      t.identifier(methodName),
      funcDecl.params,
      funcDecl.body,
      false
    );

    // 插入
    targetObject.properties.push(newMethodNode);

    // === 4. 生成新代码 ===
    const { code: newCode } = generate(ast, {
      concise: true,
      retainFunctionParens: false
    });

    // 校验
    parser.parse(newCode, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });

    return { success: true, code: newCode, error: '' };
  } catch (error: any) {
    return { success: false, code: '', error: error.message };
  }
}

// 辅助函数：从初始表达式中按路径提取 ObjectExpression
function extractNestedObject(initExpr: any, path: string[]) {
  let current = initExpr;
  for (const key of path) {
    if (!t.isObjectExpression(current)) {
      return null;
    }
    const prop: any = current.properties.find((p: any) =>
      t.isIdentifier(p.key) && p.key.name === key ||
      t.isStringLiteral(p.key) && p.key.value === key
    );
    if (!prop || !t.isObjectExpression(prop.value)) {
      return null;
    }
    current = prop.value;
  }
  return current;
}

/**
 * @description 提取代码中的方法列表
 * @param code 代码 const mpl = { methods: {} }
 * @param varName 变量名，如 "mpl"
 * @param propertyPath 属性路径，如 ["methods"]
 * @returns { ast: any, targetObject: any, methodMap: Map<string, any> } 抽象语法树, 目标对象, 方法映射
 */
function extractMethodsFromCode(code: string, varName: string, propertyPath: string[]): { ast: any, targetObject: any, methodMap: Map<string, any> } {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });

  let targetObject: any = null;
  let targetDecl: t.VariableDeclarator | null = null;

  for (const stmt of ast.program.body) {
    if (t.isVariableDeclaration(stmt)) {
      for (const decl of stmt.declarations) {
        if (t.isIdentifier(decl.id) && decl.id.name === varName) {
          targetDecl = decl;
          targetObject = extractNestedObject(decl.init, propertyPath);
          break;
        }
      }
    }
    if (targetObject) break;
  }

  if (!targetObject) {
    throw new Error(`未找到 ${varName}.${propertyPath.join('.')}`);
  }

  const methodMap = new Map();
  for (const prop of targetObject.properties) {
    if (t.isObjectMethod(prop)) {
      const name = t.isIdentifier(prop.key) ? prop.key.name : t.isStringLiteral(prop.key) ? prop.key.value : null;
      if (name) methodMap.set(name, prop);
    }
  }

  return { ast, targetObject, methodMap };
}

/**
 * @description 对比俩js代码[代码格式一致都是 const mpl = { methods: {} }], 保留用户的修改, 返回差异和新的js代码.
 * @param storeJsCode 原js代码 const mpl = { methods: {} }
 * @param userEditJsCode 用户编辑的js代码 const mpl = { methods: {xxx() {} } }
 * @param varName 变量名，如 "mpl"
 * @param propertyPath 属性路径，如 ["methods"]
 * @returns { added: string[], removed: string[], modified: string[], newCode: string } 新增方法列表, 删除方法列表, 修改方法列表, 新代码
 */
export function compareAndMergeMethods(
  storeJsCode: string,
  userEditJsCode: string,
  varName: string = 'mpl',
  propertyPath = ['methods']
): { added: string[], removed: string[], modified: string[], newCode: string } {
  try {
    // 1. 解析 store 代码（用于保留整体结构）
    const store = extractMethodsFromCode(storeJsCode, varName, propertyPath);
    // 2. 解析 user 代码（获取最新方法）
    const user = extractMethodsFromCode(userEditJsCode, varName, propertyPath);

    // 3. 计算差异
    const added: string[] = [];
    const removed: string[] = [];
    const modified: string[] = [];

    for (const [name, userMethod] of user.methodMap) {
      if (!store.methodMap.has(name)) {
        added.push(name);
      } else {
        const storeMethod = store.methodMap.get(name);
        if (!areMethodsEqual(storeMethod, userMethod)) {
          modified.push(name);
        }
      }
    }

    for (const [name] of store.methodMap) {
      if (!user.methodMap.has(name)) {
        removed.push(name);
      }
    }

    // 4. ★★★ 关键：用 user 的方法列表替换 store 中的 properties
    store.targetObject.properties = Array.from(user.methodMap.values());

    // 5. 生成 newCode
    const { code: newCode } = generate(store.ast, {
      concise: true,
      retainFunctionParens: false
    });

    // 6. 校验 newCode 语法
    parser.parse(newCode, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });

    return {
      added,
      removed,
      modified,
      newCode
    };
  } catch (error) {
    console.error('合并代码失败:');
    return {
      added: [],
      removed: [],
      modified: [],
      newCode: storeJsCode // 回退
    };
  }
}

// 方法比较（同前）
function areMethodsEqual(method1: any, method2: any) {
  if (method1.params.length !== method2.params.length) return false;
  for (let i = 0; i < method1.params.length; i++) {
    const p1 = method1.params[i];
    const p2 = method2.params[i];
    if (t.isIdentifier(p1) && t.isIdentifier(p2)) {
      if (p1.name !== p2.name) return false;
    } else {
      return false;
    }
  }

  const body1 = generate(method1.body, { concise: true }).code;
  const body2 = generate(method2.body, { concise: true }).code;
  return body1 === body2;
}

/**
 * 校验代码是否严格符合: const mpl = { methods: { ... } }
 * 仅支持 JS/TS，不支持 JSX 等
 * @param {string} code - 要校验的代码
 * @returns {{ valid: boolean; error?: string }}
 */
export function validateMplFormat(code: string): { valid: boolean, error?: string } {
  try {
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['typescript'] // 仅 JS/TS
    });

    // 1. 必须只有 1 条语句
    if (ast.program.body.length !== 1) {
      return { valid: false, error: '代码必须只包含一条语句' };
    }

    const stmt = ast.program.body[0];

    // 2. 必须是 const 声明
    if (!t.isVariableDeclaration(stmt) || stmt.kind !== 'const') {
      return { valid: false, error: '必须使用 const 声明' };
    }

    // 3. 必须只有一个变量
    if (stmt.declarations.length !== 1) {
      return { valid: false, error: '只能声明一个变量' };
    }

    const decl = stmt.declarations[0]!;

    // 4. 变量名必须是 mpl
    if (!t.isIdentifier(decl.id) || decl.id.name !== 'mpl') {
      return { valid: false, error: '变量名必须是 "mpl"' };
    }

    // 5. 初始化值必须存在
    if (!decl.init) {
      return { valid: false, error: '变量必须初始化' };
    }

    // 6. 初始化值必须是对象字面量
    if (!t.isObjectExpression(decl.init)) {
      return { valid: false, error: 'mpl 的值必须是对象字面量' };
    }

    const rootObj = decl.init;

    // 7. 必须有且仅有一个属性：method
    // （允许有其他属性？根据需求调整。这里要求必须有 method，但允许多属性？）
    // 根据你描述 "{methods: {}}"，我们要求：至少包含 method，可含其他？ 
    // 但通常你可能只想要 method。我们按「必须有 method，其他属性不允许」处理。

    if (rootObj.properties.length === 0) {
      return { valid: false, error: 'mpl 对象不能为空，必须包含 methods 属性' };
    }

    // 查找 methods 属性
    let methodProp: t.ObjectProperty | null = null;
    for (const prop of rootObj.properties) {
      if (t.isObjectProperty(prop)) {
        if (t.isIdentifier(prop.key) && prop.key.name === 'methods') {
          methodProp = prop;
        } else if (t.isStringLiteral(prop.key) && prop.key.value === 'methods') {
          methodProp = prop;
        } else {
          // 如果存在非 methods 属性，视为非法（按严格模式）
          // const keyName = t.isIdentifier(prop.key) ? prop.key.name : t.isStringLiteral(prop.key) ? prop.key.value : 'unknown';
          // return { valid: false, error: `mpl 对象不能包含 "${keyName}" 属性，只允许 "methods"` };
        }
      }
    }

    if (!methodProp) {
      return { valid: false, error: 'mpl 对象必须包含 "methods" 属性' };
    }

    // 8. methods 的值必须是对象字面量
    if (!t.isObjectExpression(methodProp.value)) {
      return { valid: false, error: '"methods" 的值必须是对象字面量' };
    }

    // ✅ 所有条件通过
    return { valid: true };
  } catch (parseError: any) {
    return { valid: false, error: `语法错误: ${parseError.message}` };
  }
}

// const { parse } = require('@babel/parser');
// const traverse = require('@babel/traverse').default;
// const t = require('@babel/types');
// const { generate } = require('@babel/generator');

// ==========================================
// 同步插入：向 merge({ ... }) 里插入属性
// ==========================================
export function insertToMplVar(sourceCode: string, insertStr: string) {
  if (!insertStr) return sourceCode;

  // 1. 解析代码 AST
  const ast = parser.parse(sourceCode, { sourceType: 'module' });

  // 2. 解析要插入的 key: value
  const tempAst: any = parser.parse(`const t = { ${insertStr} }`, { sourceType: 'module' });
  const insertProp = tempAst.program.body[0].declarations[0].init.properties[0];

  // 3. 遍历 AST
  traverse(ast, {
    // 找到 const mpl = { ... }
    VariableDeclarator(declPath: any) {
      const node = declPath.node;
      if (node.id.name !== 'mpl') return;
      if (!t.isObjectExpression(node.init)) return;

      // 找到 mpl.var
      const mplObj = node.init;
      const varProp = mplObj.properties.find(
        p => t.isIdentifier(p.key, { name: 'var' })
      );
      if (!varProp) return;

      // 找到 mpl.var.merge( { ... } )
      const callExpr: any = varProp.value;
      if (
        t.isCallExpression(callExpr) &&
        t.isMemberExpression(callExpr.callee) &&
        (callExpr.callee.property as any).name === 'merge'
      ) {
        // 拿到 merge 内部的对象
        const objArg = callExpr.arguments[0];
        if (t.isObjectExpression(objArg)) {
          objArg.properties.push(insertProp); // ✅ 插入
        }
      }
    },
  });

  // 4. 生成代码（同步）
  return generate(ast, { compact: false, retainLines: true }).code;
}

// 根据变量字符串聚焦获取变量位置信息
export function getVariableNameAtPosition(code: string, lineNumber: number) {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['objectRestSpread'],
  });

  // 最终返回结构
  const result = {
    fullPath: '',
    variableName: '',
    parentObject: ''
  };

  // 存储所有在当前行内的 ObjectProperty（key: value）
  const foundNodes: any[] = [];

  traverse(ast, {
    ObjectProperty(path) {
      const { node } = path;
      if (!node.loc) return;

      const line = node.loc.start.line;
      if (line === lineNumber) {
        foundNodes.push(path);
      }
    }
  });

  if (!foundNodes.length) return result;

  // 取当前行最精确的节点（通常只有一个）
  const targetPath = foundNodes.at(-1);
  const nodeKey = targetPath.node.key;
  const keyName = nodeKey.name || nodeKey.value;

  if (!keyName) return result;

  // ====================
  // 核心：向上收集完整路径
  // ====================
  const pathSegments: string[] = [];
  let current = targetPath;

  while (current) {
    const n = current.node;

    // 1. 对象属性 { a: b }
    if (t.isObjectProperty(n)) {
      const key: any = n.key;
      const name = key.name || key.value;
      if (name) pathSegments.unshift(name);
    }

    // 2. 遇到变量声明 const mpl = {}
    if (t.isVariableDeclarator(n)) {
      if (t.isIdentifier(n.id)) {
        pathSegments.unshift(n.id.name);
      }
      break;
    }

    // 3. 遇到 MemberExpression 如 mpl.var.merge
    if (t.isMemberExpression(n)) {
      const prop = n.property;
      if (t.isIdentifier(prop)) {
        pathSegments.unshift(prop.name);
      }

      // 递归解析左侧 mpl.var
      if (t.isIdentifier(n.object)) {
        pathSegments.unshift(n.object.name);
        break;
      }
    }

    current = current.parentPath;
  }

  // 组装结果
  result.fullPath = pathSegments.join('.');
  result.variableName = keyName;
  result.parentObject = pathSegments.at(-2) || '';

  return result;
}

export const defaultCodeMirrorExtensions = (extensions: any[] = []) => [
  javascript({ jsx: true }), // 语法高亮
  lineNumbers(),
  highlightActiveLine(),
  drawSelection(),
  history(),
  dropCursor(),
  indentUnit.of('  '),
  indentOnInput(),
  foldGutter(),
  bracketMatching(),
  EditorView.theme({
    '&': {
      backgroundColor: '#ffffff',
      color: '#000000',
      fontSize: '14px',
      height: '100%',
      border: '1px solid #ccc',
    },
    '.cm-content': {
      caretColor: '#000000',
      fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
    },
    '.cm-cursor': { borderLeftColor: '#000000' },
    '.cm-selectionBackground': { backgroundColor: '#add6ff !important' },
    '.cm-gutters': { backgroundColor: '#ffffff', color: '#888', border: 'none' }
  }, { dark: false }),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  oneDark,
  ...extensions,
]