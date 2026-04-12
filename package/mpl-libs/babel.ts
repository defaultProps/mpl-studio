import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as t from '@babel/types'
import type { ParseVueOptions } from '@mpl/typings'
import type { Node } from '@babel/types'
/**
 * 从函数节点中提取函数体
 */
function extractBody(node: any, sourceCode: string) {
  if (!node.body || node.body.start == null) return '';
  const code = sourceCode.slice(node.body.start + 1, node.body.end - 1).trim();
  const fn = sourceCode.slice(node.key.start, node.body.end).trim()
  return {
    code,
    fn
  }
}

// 辅助函数：安全提取属性名
function getPropertyName(key: Node): string | null {
  if (t.isIdentifier(key)) {
    return key.name;
  }
  if (t.isStringLiteral(key) || t.isNumericLiteral(key)) {
    return String(key.value);
  }
  // 如果是计算属性（如 [someVar]），无法静态确定名称，返回 null 或跳过
  return null;
}

/**
 * 解析 Vue 选项式 API（仅支持指定字段）
 * @param {string} codeStr - 包含组件对象的 JS 字符串
 * @returns {Object}
 * 解析提取mpl方法IDE中的代码
  const codeStr = `
    const mpl = {
      watch: {},
      props: {},
      emits: ['input', 'update:modelValue'],
      methods: {
        input_jd1ka(value) {
          console.log(value);
        }
      },
      computed: {
        reversedMessage() {
          return this.message.split('').reverse().join('');
        }
      },
      created() {
        console.log('Component created');
      },
      mounted() {
        this.$refs.input.focus();
      },
      destroyed() {}
    };
  `;
 */
export function parseVueOptions(codeStr: string): ParseVueOptions {
  const ast = parse(codeStr, {
    sourceType: 'module'
  });

  // 结果结构
  const result: any = {
    emits: [],
    methods: {},
    computed: {},
    watch: {},
    lifecycle: {
      created: '',
      mounted: '',
      destroyed: ''
    }
  };

  let rootObject: any = null;

  // 第一步：找到最外层的对象字面量（假设是 const xxx = { ... }）
  traverse(ast, {
    VariableDeclarator(path) {
      if (t.isObjectExpression(path.node.init)) {
        rootObject = path.node.init;
        path.stop(); // 找到第一个就停止
      }
    }
  });

  if (!rootObject) {
    throw new Error('未找到组件对象');
  }

  // 第二步：遍历对象属性
  for (const prop of rootObject.properties) {
    if (!t.isObjectProperty(prop) && !t.isObjectMethod(prop)) continue;

    const key = prop.key;
    if (!t.isIdentifier(key)) continue;

    const keyName = key.name;
    const value: any = prop.type === 'ObjectMethod' ? prop : prop.value;

    // --- emits: [] ---
    if (keyName === 'emits' && t.isArrayExpression(value)) {
      result.emits = value.elements
        .filter(el => t.isStringLiteral(el))
        .map(el => el.value);
    }

    // --- methods: { ... } ---
    else if (keyName === 'methods' && t.isObjectExpression(value)) {
      for (const methodProp of value.properties) {
        if (t.isObjectMethod(methodProp)) {
          const name = getPropertyName(methodProp.key);
          if (name !== null) {
            result.methods[name] = extractBody(methodProp, codeStr)
          }
        } else if (t.isObjectProperty(methodProp) && t.isFunction(methodProp.value)) {
          const name = getPropertyName(methodProp.key);
          if (name !== null) {
            result.methods[name] = extractBody(methodProp.value, codeStr);
          }
        }
      }
    }

    // --- computed: { ... } ---
    else if (keyName === 'computed' && t.isObjectExpression(value)) {
      for (const compProp of value.properties) {
        if (t.isObjectMethod(compProp)) {
          const name = getPropertyName(compProp.key)
          if (name !== null) {
            result.computed[name] = extractBody(compProp, codeStr);
          }
        } else if (t.isObjectProperty(compProp) && t.isFunction(compProp.value)) {
          const name = getPropertyName(compProp.key)
          if (name !== null) {
            result.computed[name] = extractBody(compProp.value, codeStr);
          }
        }
      }
    }

    // --- watch: { ... } ---
    else if (keyName === 'watch' && t.isObjectExpression(value)) {
      for (const watchProp of value.properties) {
        if (t.isObjectMethod(watchProp)) {
          const name = getPropertyName(watchProp.key);
          if (name !== null) {
            result.watch[name] = extractBody(watchProp, codeStr);
          }
        } else if (t.isObjectProperty(watchProp) && t.isFunction(watchProp.value)) {
          const name = getPropertyName(watchProp.key);
          if (name !== null) {
            result.watch[name] = extractBody(watchProp.value, codeStr);
          }
        }
      }
    }

    // --- 生命周期钩子 ---
    else if (['created', 'mounted', 'destroyed'].includes(keyName)) {
      if (t.isFunction(value) || prop.type === 'ObjectMethod') {
        result.lifecycle[keyName] = extractBody(value, codeStr);
      }
    }
  }

  return result;
}

/**
 * 从 Vue 选项式 API 的 codeStr 中删除 methods 中的某个方法
 * @param {string} codeStr - 包含组件对象的 JS 字符串
 * @param {string} methodName - 要删除的方法名
 * @returns {string} 删除方法后的新代码字符串，如果未找到方法则返回原代码
 * 
 * 示例：
 * const codeStr = `
 *   const mpl = {
 *     methods: {
 *       method1() { console.log(1); },
 *       method2() { console.log(2); }
 *     }
 *   };
 * `;
 * const newCode = removeMethodFromVueOptions(codeStr, 'method1');
 */
export function removeMethodFromVueOptions(codeStr: string, methodName: string): string {
  if (!codeStr || !methodName) {
    return codeStr;
  }

  const ast = parse(codeStr, {
    sourceType: 'module',
    allowReturnOutsideFunction: true
  });

  let rootObject: any = null;

  // 第一步：找到最外层的对象字面量（假设是 const xxx = { ... }）
  traverse(ast, {
    VariableDeclarator(path) {
      if (t.isObjectExpression(path.node.init)) {
        rootObject = path.node.init;
        path.stop(); // 找到第一个就停止
      }
    }
  });

  if (!rootObject) {
    // 如果未找到组件对象，返回原代码
    return codeStr;
  }

  let methodsFound = false;
  let methodRemoved = false;

  // 第二步：找到 methods 属性并删除指定方法
  for (const prop of rootObject.properties) {
    if (!t.isObjectProperty(prop) && !t.isObjectMethod(prop)) continue;

    const key = prop.key;
    if (!t.isIdentifier(key)) continue;

    const keyName = key.name;

    // 找到 methods 对象
    if (keyName === 'methods') {
      methodsFound = true;
      const value: any = prop.type === 'ObjectMethod' ? prop : prop.value;
      
      if (t.isObjectExpression(value)) {
        const originalLength = value.properties.length;
        
        // 从 methods 对象的 properties 中删除指定方法
        value.properties = value.properties.filter((methodProp: any) => {
          // 处理 ObjectMethod 和 ObjectProperty 两种情况
          if (t.isObjectMethod(methodProp)) {
            const name = getPropertyName(methodProp.key);
            if (name === methodName) {
              methodRemoved = true;
              return false; // 删除匹配的方法
            }
            return true;
          } else if (t.isObjectProperty(methodProp)) {
            const name = getPropertyName(methodProp.key);
            if (name === methodName) {
              methodRemoved = true;
              return false; // 删除匹配的方法
            }
            return true;
          }
          return true; // 保留其他类型的属性
        });

        // 如果 methods 对象为空，可以选择删除整个 methods 属性（可选）
        // if (value.properties.length === 0) {
        //   rootObject.properties = rootObject.properties.filter((p: any) => p !== prop);
        // }
      }
      break; // 找到并处理完 methods 后退出
    }
  }

  // 如果未找到 methods 或未找到要删除的方法，返回原代码
  if (!methodsFound || !methodRemoved) {
    return codeStr;
  }

  // 第三步：生成新的代码字符串，尽量保留原始格式
  const output = generate(ast, {
    retainLines: false,
    compact: false,
    comments: true
  }, codeStr);

  return output.code;
}
