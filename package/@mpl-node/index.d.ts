
export declare namespace MPL {
  export type ActiveSidebarTag = '' | 'projectModel' | 'componentLibsModel' | 'resourceModel' | 'sourceCodeModel'
  export type ActiveWorkbenchModel =
    | 'pageCodePaneModel'
    | 'quickConfigPaneModel'
    | 'serviceConfigPaneModel'
    | 'schemaPaneModel'
    | 'packagePaneModel'
    | 'intelligentDetection'
  export type ActiveComponentBoxModel = 'baseComponent' | 'moduleComponent' | 'pageComponent'
  export type ActiveMainModel = 'initialPage' | 'workbench' | 'theme' | 'market' | 'staticResource' | 'codeModel'
  export type WorkbenchResizeType = 'normal' | 'reduce'
  export type ExpandSize = 'mini' | 'small' | 'medium' | 'large'
  export type VarIDESize = 'small' | 'medium' | 'large'

  // 组件层级面包屑
  export interface BreadCrumbNode {
    label: string
    value: string
    cid: string
  }

  export interface CoreView {
    activeNavTag: ActiveSidebarTag
    visibleRightBarComponentSetting: boolean
    activeMainModel: ActiveMainModel
    activeWorkbenchModel: ActiveWorkbenchModel
    activeComponentView: ActiveComponentBoxModel
    context: ContextmenuWrapper
    activeTheme: ThemeFileProp | null
    workbenchResizeType: WorkbenchResizeType
    isWorkbenchResizeEventMode: boolean
    isWorkbenchResize3DMode: boolean
    workbenchFooterToolSize: ExpandSize
    outlineExpandSize: ExpandSize
    visibleVideoDialog: boolean
    visibleIconSelect: boolean
    videoSrc: string
    visibleDraftDialog: boolean
    visibleDisplayNodeBox: boolean
    workbenchFooterIDESize: VarIDESize
  }

  export type FormItemSize = 'small' | 'medium' | 'large' //
  export type FormItemLabelPos = 'l' | 'c' | 'r'
  export type ComponentPosType = 'w' | 'wh' | 'h' // 宽度 宽高 高度

  export type FileType =
    | 'folder'
    | 'page'
    | 'doc'
    | 'theme'
    | 'preview'
    | 'annotation'
    | 'eventFlow'
    | 'markdown'
    | 'resource'
    | 'sourceCode'
    | 'vue'
    | 'image'
    | 'css'
    | 'json'
    | 'txt'
    | 'javascript'
    | 'moduleMarket'
    | 'themeMarket'
    | 'imageMarket'
    | 'iconMarket'
    | 'javascriptMarket'
    | 'serviceMarket'
  export interface File {
    title: string
    id: string
    type: FileType
  }

  export interface ThemeFileProp extends File {
    desc: string
    author: string
    logo: string
    locked: boolean
  }

  export interface NodeFileProp extends File { }

  interface ContextMenu {
    icon?: string
    divider?: boolean
    label: string
    disabled?: boolean
    value: string
    onclick?: () => unknown
  }

  export interface ContextmenuWrapper {
    display: 'none' | 'block'
    top: number
    left: number
    meta: any // 右键携带参数
    menu: ContextMenu[]
  }

  // 用户角色'': 初始角色需要用户选择角色后才进入项目
  export type UserRole = 'community' | 'enterprise' | 'demo-community' | 'demo-enterprise' | ''

  export interface ProjectDir {
    title: string
    id: string
    type: FileType
    children?: File[]
  }

  export enum SIZE1 {
    MINI = 1,
    SMALL = 2,
    MEDIUM = 3,
    LARGE = 4
  }

  export enum RESOURCE {
    ELEMENT_PLUS = '@mpl/node',
    VANT4 = '@mpl/vant4',
    ANT_DESIGN = '@mpl/ant-design',
    ANT_DESIGN_MOBILE = '@mpl/ant-design-mobile'
  }

  export interface SettingMap {
    tag: string; // 组件标签
    node: ComponentBaseExport; // 组件的属性定义
    newNode: (cid: string) => MPL.Node; // 组件初始化
    renderCode: (node: any, type: RESOURCE) => string; // 最终生成的源码

    // 画板展示内容
    workbench: {
      elementPlus: any;
      vant4: any;
      antDesign: any;
      antDesignMobile: any;
    };
    // 预览-源码渲染过程 - vue3-sfc-loader | react-sfc-loader
    generator: {
      elementPlus: any;
      vant4: any;
      antDesign: any;
      antDesignMobile: any;
    };

    componentModel: any; // 组件UI设置
    moduleModel: any; // 组件推荐的模板列表
    styleModel: any; // 组件的样式设置
    patchModel: any; // 组件的兜底补充、新增属性、删除属性、新增方法、参数自定义传递等等
  }

  export type ActiveComponentSettingModel =
    | ""
    | "componentModel"
    | "styleModel"
    | "moduleModel"
    | "patchModel";

  // 基础的按钮类型
  export interface BaseBtn {
    title: string
    icon: string
    disabledName: string
    clickName: string
    theme: string
    cid: string
    visibleName: string // 显示按钮
    className: string // 自定义样式
    // loading: string // 快捷配置。如果true, icon + disabled改变
  }

  type FileAuthority = 'editable' | 'readonly' | 'delete' | 'rename'
  export interface CategorySourceTree {
    type: 'file' | 'folder' | 'vue' | 'image' | 'js' | 'css' | 'doc' | 'json' // 文件夹或文件夹类型
    id: string
    title: string // 文件名
    authority: FileAuthority[]
    isModified: boolean // 文件夹名称不可修改
    children?: CategorySourceTree[]
    // 仅项目组上传的文件可修改，包括：静态资源css、js、图片
    // 图标仅从图标库修改
  }

  export type ServiceBindMode = 'static' | 'dynamics'

  export interface ServiceBindNode {
    mode: ServiceBindMode
    staticData: any // 静态数据存储区域
    labelKey: string
    valueKey: string
    defaultValue: any
    postman?: {
      url: string
      methods: 'get' | 'post'
      params: Array<{ key: string, value: string }>
    }
  }

  type miniSchema<T> = (node: T) => Partial<T>

  // 节点注解
  export interface NodeNote {
    index: string // 序号[唯一值]  '1' | '1-1' |  '1.1'  | 'P'
    description: string // 描述信息
  }

  export type NODE_TAG =
    | 'mpl-btn'
    | 'mpl-input'
    | 'mpl-select'
    | 'mpl-panel'
    | 'mpl-tabs'
    | 'mpl-body'
    | 'mpl-base-table'
    | 'mpl-drawer'
    | 'mpl-dialog'
    | 'mpl-card'
    | 'mpl-checkbox'
    | 'mpl-color-picker'
    | 'mpl-date-picker'
    | 'mpl-date-range-picker'
    | 'mpl-link'
    | 'mpl-number-input'
    | 'mpl-paragraph'
    | 'mpl-password'
    | 'mpl-radio'
    | 'mpl-rate'
    | 'mpl-select'
    | 'mpl-select-dialog'
    | 'mpl-slider'
    | 'mpl-switch'
    | 'mpl-time-range-picker'
    | 'mpl-tree'
    | 'mpl-base-box'
    | 'mpl-collapse'
    | 'mpl-time-picker'
    | 'mpl-workbench-highlight-node'
    | 'mpl-btn-group'

  export interface Node {
    mpl_group: string
    mpl_title: string
    mpl_version: string
    visible: boolean // `${cid}_visible` 显示隐藏初始变量
    mpl_ce: 'c' | 'e' | 'ce' // c: community免费版 enterprise企业版 ce免费版控件包含企业版功能
    mpl_zh: string // 自定义标识 - 业务标识节点
    cid: string
    tag: NODE_TAG
    childIds: string[] // 子组件节点挂载顺序
    events: string[] // ['input', 'blur'] 已经绑定的事件名称列表
    pos: { pc: NodePos, mobile: NodePos } // 位置缩放定位
    classList: string[] // 系统级别 TailwindCSS
    userClassName: [] // 用户新增的classlist
    style: string // style ide
  }

  export interface FormItemRule {
    mod: 'system' | 'custom'
    trigger: string[]
    option: Array<{
      value: 'required' | 'onlyNumber' | 'tel' | 'email' | string
      message: string
    }>
    message: string
  }

  export interface NodePos {
    w: number | string // '' 代表无效数据，比如横向抽屉组件。
    h: number | string // '' 代表100%.  string 代表px[包含px单位] 8 | '100px"
    minH?: number | ''
    maxH?: number | ''
    minW?: number | ''
    type: ComponentPosType
    mod?: 'popover' | 'box' | 'normal' | 'form' | 'dialog' | 'drawer' | 'formItem' // 画板UI定位 默认 normal
  }

  export interface ContextMenuNode {
    label: string
    icon: string
    disabled?: boolean
    divider: boolean
    value: string
    onClick: () => void
    children?: ContextMenuNode[]
  }

  export interface TreeNodeList extends Node {
    mpl_children: Node[]
    isDeep: boolean
  }

  export interface NodeContextmenu {
    label: string
    value: string
    divider: boolean
    disabled: boolean
    icon: string
    onclick?: () => any
    var?: string
    children?: NodeContextmenu[]
  }

  // 关联组件类型
  export type BaseInputRelationNodeType = 'select' | 'cascader' | 'text' | 'datePicker' | 'datePickerRange' | 'selectDialog'

  export interface ComponentBaseExport {
    tag: string

    comp: ([K]: any) => Node
    pos: { pc: NodePos, mobile: NodePos }
    getContextmenu: (node: any) => NodeContextmenu[]
    events: EventNode[],
    getTemplateCode: (node: any) => string
    getNodeVar: (node: any) => string
  }

  export interface FormLabelProp {
    text: string
    width: number | ''
    pos: FormItemLabelPos
    icon: string
    iconTheme: string // 图标颜色
    iconText: string
    show: boolean
  }

  export interface EventNode {
    name: string // 事件名 fb5gt6_blur
    code: string // 源码 或 事件流
    desc: string // 事件描述
    type: 'flow' | 'code' // 事件内容
    doc?: string // 画板底部展示该事件的相关文档md 地址
  }

  export interface ActiveNodeEvent extends EventNode {
    checked: boolean
  }

  export interface Project {
    id: string
    title: string
    description: string
    platform: Array<{ label: string, value: PlatType }>
    imgLinks: string[]
    cssLinks: string[]
    jsLinks: []
    iconLinks: []
    technology: string[]
  }

  export type PlatType =
    | 'MPL-DFN' // MPL 标准桌面应用中台 vue3 + element-plus + pc
    | 'MPL-MHS' // MPL 标准移动端平台 vue3 + vant4 + mobile
    | 'MPL-LPT' // MPL 标准大屏展示平台 vue3 + element-plus + pc

    | 'MPL-WFP' // MPL 标准桌面应用中台 react + ant-design + pc
    | 'MPL-TP' // MPL 标准移动端平台 react + ant-design-mobile + mobile
    | 'MPL-RPL' // MPL 标准大屏展示平台 react + ant-design + pc

  interface PlatformOption {
    label: string
    value: 'miniFrontEnd' | 'iframe' | 'singleWindow'
    children: {
      label: string
      value: PlatType
      disabled: boolean
      size: string[]
    }[]
  }

  export type PopoverType = '' | 'popover' | 'tooltip' | 'title' | 'confirm'
  export type PopoverPos =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
}


export = MPL

export default MPL