import type {
  BaseBtn,
  ComponentBaseExport,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
  FormItemRule,
  BaseInputRelationNodeType,
  EventNode,
} from "@mpl/typings";

// 基础输入框内置的组件 - 常用于：筛选查询、二级输入
export const relationNodeOptions: Array<{ label: string, value: BaseInputRelationNodeType }> = [
  { value: 'select', label: '下拉菜单' },
  { value: 'cascader', label: '级联选择' },
  { value: 'text', label: '文本' }, 
  { value: 'datePicker', label: '日期' },
  { value: 'datePickerRange', label: '日期范围' },
  { value: 'selectDialog', label: '弹窗选择' },
]

export interface SingleInputNode {
  model: string;
  width: number | ""; // 0 代表全宽
  size: "sm" | "m" | "l";
  maxlength: number | "";
  pos: "l" | "c" | "r";
  required: boolean;
  showLimit: boolean;
  prefixIcon: string;
  suffixIcon: string;
  clearable: boolean;
  rules: FormItemRule[];
  readonly: boolean;
  placeholder: string;
  maxLength: number | "none";
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 6,
      h: 4,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: "w",
      mod: "formItem",
    },
    mobile: {
      w: 24,
      h: '76px',
      minH: 8,
      maxH: 20,
      minW: 24,
      type: "h",
      mod: "formItem",
    }
  };
}

export interface SingleInputFormProp extends Node {
  label: FormLabelProp;
  size: FormItemSize;
  input: SingleInputNode;
  slotBtn: BaseBtn[];
  relationNodes: Array<{label: string, value: BaseInputRelationNodeType, cid: string}>; // 关联组件
  pos: { pc: NodePos, mobile: NodePos }
}

export function newSingleInputNode(cid: string): SingleInputFormProp {
  return {
    mpl_group: "表单控件",
    mpl_title: "基础输入",
    mpl_zh: "输入",
    mpl_ce: "c",
    mpl_version: "1.0.0",
    cid,
    tag: "mpl-input",
    size: "small",
    childIds: [],
    classList: [],
    userClassName: [],
    style: "",
    visible: true,
    label: {
      show: true,
      width: 120,
      text: "基础输入框",
      pos: "r",
      icon: "icon-info2",
      iconTheme: "#C3002F",
      iconText: "基础信息",
    },
    input: {
      required: false,
      model: "",
      suffixIcon: "",
      prefixIcon: "",
      width: "",
      size: "sm",
      pos: "l",
      maxlength: 10,
      showLimit: false,
      clearable: true,
      readonly: false,
      maxLength: "none",
      placeholder: "请输入",

      rules: [
        {
          mod: 'system',
          trigger: ['blur'],
          option: [
            { value: 'required', message: '请输入' }
          ],
          message: ''
        }
      ]
    },
    events: [],
    slotBtn: [],
    relationNodes: [],
    pos: pos(),
  };
}

function getTemplateCode(node: SingleInputFormProp): string {
  let eventStr = "";

  if (node.events.includes("input")) {
    eventStr += ` @input="mpl.${node.cid}.input"`;
  }
  if (node.events.includes("change")) {
    eventStr += ` @change="mpl.${node.cid}.change"`;
  }
  if (node.events.includes("blur")) {
    eventStr += ` @blur="mpl.${node.cid}.blur"`;
  }
  if (node.events.includes("focus")) {
    eventStr += ` @focus="mpl.${node.cid}.focus"`;
  }
  if (node.events.includes("disabled")) {
    eventStr += ` :disabled="mpl.${node.cid}.disabled"`;
  }
  if (node.events.includes("readonly")) {
    eventStr += ` :readonly="mpl.${node.cid}.readonly"`;
  }
  if (node.events.includes("visible")) {
    eventStr += ` :visible="mpl.${node.cid}.visible"`;
  }

  if (node.events.includes("clearable")) {
    eventStr += ` :clearable="mpl.${node.cid}.clearable"`;
  }

  if (node.events.includes("placeholder")) {
    eventStr += ` :placeholder="mpl.${node.cid}.placeholder"`;
  }

  // todo: 紧凑源码的生成，延后做
  // 思路：默认使用静态文本写入template. 当存在赋值操作时，即[watchEffect () => mpl.var.fb4rg5.label] // 源码存在时替换静态文本
  // 性能比较缓慢，每个组件仅部分使用其动态，大部分默认为静态

  return `
		<!-- 1、基础输入框 template 节点源码 -->
    <!-- 2、DOM只占一行，编辑template时，一次只能编辑一行。用户选择编辑的行【即DOM】，MPL展示该DOM的所有属性，用户选择属性或新增属性进行编辑更新。 -->
    <!-- 3、用户选择属性【属性需要根据MPL规则展示可编辑的范围，更换绑定、变量替换、禁止编辑、删除属性等】 -->
    <!-- 4、新增属性【查看是否存在冲突、key-value合法性】-->

		<div class="mpl-form-item mpl-input--fb4rg5">
			<div class="mpl-label">{{ mpl.variable.fb4rg5.label }}</div>
			<div class="mpl-content">
				<el-input
          ${eventStr}
          :placeholder="mpl.${node.cid}.placeholder"
          :clearable="mpl.${node.cid}.clearable"
        />
			</div>
		</div>
	`;
}

// 向外部提供的可直接赋值的变量
function getNodeVar(node: SingleInputFormProp): string {
  console.log(node);

  return `
    // 基础输入框组件变量
    const mplVar = {
      ${node.cid}: {
        visible: true, // 显示控件
        vModal: null, // 选中值
        required: false, // 必填值
        disabled: false // 禁用变量
      }
    }
  `;
}

const events: EventNode[] = [
  {
    name: "input",
    desc: "输入时",
    code: `console.log(value)`,
    type: "flow",
    doc: "/docs/event-input.md",
  },
  { name: "focus", desc: "聚焦时", code: "", type: "flow" },
  { name: "blur", desc: "失焦时", code: `console.log(value)`, type: "flow" },
  { name: "change", desc: "输入内容改变时", code: "", type: "flow" },
  { name: "clear", desc: "点击清空图标", code: "", type: "flow" },
];

export const singleInputNode: ComponentBaseExport = {
  tag: "mpl-input",
  comp: newSingleInputNode,
  pos: pos(),
  events,
  getContextmenu: (node: SingleInputFormProp) => {
    // 操作内容： 删除、替换、往前移位、往后移位、往前插入、往后插入、复制、剪切、格式化、历史记录、另存页面、另存模板
    // 展示内容：事件已绑列表、智能检测监控信息
    const delMenu = {
      label: "删除",
      value: "delete",
      icon: "icon icon-close1",
      divider: false,
      disabled: false,
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log(node);
      },
    };

    const copyMenu = {
      label: "复制",
      value: "copy",
      icon: "icon icon-document-copy",
      divider: false,
      disabled: false,
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log(node);
      },
    };

    const replaceMenu = {
      label: "替换",
      value: "replace",
      icon: "icon icon-d-caret",
      divider: false,
      disabled: false,
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log(node);
      },
    };

    const shearMenu = {
      label: "剪切",
      value: "replace",
      icon: "icon icon-jianqie2",
      divider: false,
      disabled: false,
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log(node);
      },
    };

    const moveToRightMenu = {
      label: "往后移位",
      value: "replace",
      icon: "icon icon-double-arro-right",
      divider: false,
      disabled: false,
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log(node);
      },
    };

    const moveToLeftMenu = {
      label: "往前移位",
      value: "replace",
      icon: "icon icon-double-arrow-left",
      divider: false,
      disabled: false,
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log(node);
      },
    };

    const initMenu = {
      label: "格式化组件",
      value: "replace",
      icon: "icon icon-refresh",
      divider: true,
      disabled: false,
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log(node);
      },
    };

    return [
      copyMenu,
      replaceMenu,
      shearMenu,
      moveToLeftMenu,
      moveToRightMenu,
      initMenu,
      delMenu,
    ];
  },
  getTemplateCode,
  getNodeVar,
};
