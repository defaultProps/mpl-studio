import { SERVICE_MODE } from '@mpl/const'

export declare namespace MPL {
  export type ActiveSidebarTag = '' | 'projectModel' | 'componentLibsModel' | 'resourceModel' | 'sourceCodeModel'
  export type ActiveWorkbenchModel =
    | 'pageCodePaneModel'
    | 'quickConfigPaneModel'
    | 'serviceConfigPaneModel'
    | 'schemaPaneModel'
    | 'packagePaneModel'
    | 'intelligentDetection'
    | ''
  export type ActiveComponentBoxModel = 'baseComponent' | 'moduleComponent' | 'bussComponent'
  export type ActiveComponentGroupView = 'systemComponent' | 'bussComponent'
  export type ActiveMainModel = 'initialPage' | 'workbench' | 'theme' | 'market' | 'staticResource' | 'codeModel'
  export type WorkbenchResizeType = 'normal' | 'reduce'
  export type VarIDESize = 'small' | 'medium' | 'large'
  export type Fn = (k: string, meta?: any) => void
  export type NodeClickInject = (tag: string) => never
  export type Fn1 = (k: DragEvent, n?: NodePos) => void


  // 事件IDE中的代码自动保存的解析结果
  export interface ParseVueOptions {
    emits: string[]
    methods: { [key: string]: { code: string, fn: string } }
    computed: { [key: string]: { code: string, fn: string } }
    watch: { [key: string]: { code: string, fn: string } }
    lifecycle: { [key: string]: { code: string, fn: string } }
  }


  // 组件层级面包屑
  export interface BreadCrumbNode {
    label: string
    tag: NODE_TAG | SENIOR_TAG
    cid: string
  }

  export type IDE_FOOTER_MODEL =
    | 'var'
    | 'javascript'
    | 'style'
    | 'pageCode'
    | 'package'
    | 'aiQuestion'
    | ''

  export type SUB_BOX_SETTING_MODEL =
    | '' // 默认不打开
    | 'i18n' // 多语言设置
    | 'iconSelect' // 图标选择
    | 'boxLayout' // 容器选择布局
    | 'clientAPI' // API选择
    | 'tableColumnSetting' // 表格列设置
    | 'staticJSON' // JSON静态设置
    | 'serviceMode' // 绑定接口配置

  export type FormItemSize = 'small' | 'medium' | 'large' //
  export type FormItemLabelPos = 'l' | 'c' | 'r'
  export type ComponentPosType = 'w' | 'wh' | 'h' // 宽度 宽高 高度

  export type FILE_TYPE =
    | 'folder'
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
    | 'commandPane'
    | 'javascript'
    | 'moduleMarket'
    | 'themeMarket'
    | 'imageMarket'
    | 'iconMarket'
    | 'javascriptMarket'
    | 'serviceMarket'
    | 'projectDetail'
    | 'dataPage' // 存储页面变量数据. mplVar
    | 'baseMaterialPage' // 基础物料页面
    | 'receiptPage' // 收据页面
    | 'dialogPage' // 弹窗页面
    | 'basePage' // 基础页面
  export interface File {
    title: string
    id: string
    type: FILE_TYPE
    pageInfo: any // 页面其他信息集合
  }

  export interface PageInfo {
    ideModel: 'IDEMode' | 'flowMode' | 'catalogMode' // ide模式, 流程模式, 目录模式
  }

  export interface ThemeFileProp extends File {
    locked: boolean
    title: string
    type: 'theme'
    desc: string
    author: string
    logo: string
  }

  // 用户角色'': 初始角色需要用户选择角色后才进入项目
  export type Authority = 'community' | 'enterprise'

  export interface ProjectDir {
    title: string
    id: string
    type: FILE_TYPE
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

  // 页面大纲[目录层级结构]
  export interface PageOutline {
    label: string
    cid: string
    total: number
    tag: string
    children: PageOutline[]
  }

  export type ActiveComponentSettingModel = '' | 'componentModel' | 'styleModel' | 'moduleModel' | 'patchModel' | 'schemaModel'

  // 系统默认按钮功能
  export type BaseBtnType =
    | 'import' // 表格导入
    | 'export' // 表格导出
    | 'tableRowAdd' // 表格添加
    | 'tableRowDelete' // 表格行删除【支持批量】
    | 'copy' // 复制内容
    | 'paste' // 粘贴内容
    | 'go' // 跳转新窗口
    | 'c' // 自定义custom
    | 'download' // 下载
    | 'disabled' // 禁用表单或者按钮
    | 'viewPassword' // 查看密码
    | 'searchExpand' // 高级查询页面 - 展开/关闭
    | 'searchReset' // 高级查询页面 - 重置表单
    | 'searchSubmit' // 高级查询页面 - 提交按钮
    | '' //无点击事件

  // 系统内置按钮主题
  export type BTN_THEME_TYPE = 'primary' | 'text' | 'link' | ''

  // 基础的按钮类型
  export interface BaseBtn {
    title: string
    icon: string
    disabledName: string
    clickName: string
    type: BaseBtnType
    theme: BTN_THEME_TYPE
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



  export interface ServicePostMan {
    url: string
    methods: 'get' | 'post'
    params: Array<{ key: string; value: string }>
  }

  // 表格绑定
  export interface ServiceTableBindNode {
    mode: SERVICE_MODE
    staticData: any // 静态数据类型
    methodName: string // 自定义方法名称
    methodCode: string // 自定义方法代码
    postman: ServicePostMan
  }

  // 表单绑定接口 -单选,多选,下拉选择,树选择,弹窗选择
  export interface ServiceFormBindNode {
    mode: SERVICE_MODE
    staticData: any // 静态数据存储区域
    methodName: string // 自定义方法名称
    methodCode: string // 自定义方法代码
    labelKey: string
    valueKey: string
    postman: {
      url: string
      methods: 'get' | 'post'
      params: Array<{ key: string; value: string }>
    }
  }

  type miniSchema<T> = (node: T) => Partial<T>

  // 节点注解
  export interface NodeNote {
    index: string // 序号[唯一值]  '1' | '1-1' |  '1.1'  | 'P'
    description: string // 描述信息
  }

  // 高级组件标签集合
  export type SENIOR_TAG = 'mpl-qr-code' | 'mpl-baseSearchModule1'

  export type NODE_TAG =
    | 'mpl-search-box'
    | 'mpl-input'
    | 'mpl-password'
    | 'mpl-number-input'
    | 'mpl-input'
    | 'mpl-password'
    | 'mpl-number-input'
    | 'mpl-select'
    | 'mpl-radio'
    | 'mpl-checkbox'
    | 'mpl-rate'
    | 'mpl-slider'
    | 'mpl-switch'
    | 'mpl-time-picker'
    | 'mpl-time-range-picker'
    | 'mpl-date-picker'
    | 'mpl-date-range-picker'
    | 'mpl-color-picker'
    | 'mpl-transfer'
    | 'mpl-select-dialog'
    | 'mpl-body'
    | 'mpl-btn'
    | 'mpl-btn-group'
    | 'mpl-tabs'
    | 'mpl-card'
    | 'mpl-collapse'
    | 'mpl-drawer'
    | 'mpl-dialog'
    | 'mpl-base-box'
    | 'mpl-slot-box'
    | 'mpl-text'
    | 'mpl-panel'
    | 'mpl-base-table'
    | 'mpl-paragraph'
    | 'mpl-tree'
    | 'mpl-avatar'
    | 'mpl-loop-box'
    | 'mpl-link'
    | 'mpl-base-upload'
    | 'mpl-upload-file'
    | 'mpl-upload-img'
    | 'mpl-pagination'
    | 'mpl-empty'
    | 'mpl-img'
    | 'mpl-divider'
    | 'mpl-step'
    | 'mpl-tag'
    | 'mpl-timeline'
    | 'mpl-badge'
    | 'mpl-popover'
    | 'mpl-tooltip'
    | 'mpl-toast'
    | 'mpl-dropdown'
    | 'mpl-pageHeader'
    | 'mpl-footer'
    | 'mpl-statistics'
    | 'mpl-breadcrumb'
    | 'mpl-skeleton'
    | 'mpl-description'
    | 'mpl-carousel'
    | 'mpl-list-carousel'
    | 'mpl-calendar'
    | 'mpl-process'
    | 'mpl-anchor'
    | 'mpl-check-in-work'
    | 'mpl-punch-out'
    | 'mpl-clock-out'
    | 'mpl-leave'
    | 'mpl-business-trip'
    | 'mpl-overtime'
    | 'mpl-reimbursement'
    | 'mpl-day-report'
    | 'mpl-week-report'
    | 'mpl-calendar-group'
    | 'mpl-baseSearchModule1'
    | 'mpl-baseSearchModule2'
    | 'mpl-baseSearchModule3'
    | 'mpl-baseSearchModule4'
    | 'mpl-tableSearchBaseModule1'
    | 'mpl-tableSearchBaseModule2'
    | 'mpl-tableSearchBaseModule3'
    | 'mpl-tableSearchBaseModule4'
    | 'mpl-tableSearchBaseModule5'
    | 'mpl-qr-code'
    | 'mpl-video'
    | 'mpl-audio'
    | 'mpl-richtext'
    | 'mpl-signature'
    | 'mpl-map'
    | 'mpl-ide'
    | 'mpl-comment'
    | 'mpl-excel-table'
    | 'mpl-watermark'
    | 'mpl-flow-map'
    | 'mpl-banner1'
    | 'mpl-nestingTable1'
    | 'mpl-treePage1'
    | 'ai-chart'
    | 'chart-multiple'
    | 'mpl-grid-layout'
    | 'mpl-horizontal-layout'
    | 'mpl-vertical-layout'
    | 'mpl-search-panel'
    | 'mpl-input'
    | 'mpl-password'
    | 'mpl-number-input'
    | 'mpl-select'
    | 'mpl-radio'
    | 'mpl-checkbox'
    | 'mpl-rate'
    | 'mpl-slider'
    | 'mpl-switch'
    | 'mpl-time-picker'
    | 'mpl-time-range-picker'
    | 'mpl-date-picker'
    | 'mpl-date-range-picker'
    | 'mpl-color-picker'
    | 'mpl-select-dialog'
    | 'mpl-loop-box'
  // | 'mpl-workbench-highlight-node'

  // 表单组件集合
  export interface FormItemNode extends Node {
    label: FormLabelProp
    size: FormItemSize
    tag: NODE_TAG | SENIOR_TAG
    [k: string]: any
  }
  export type LEN_UNIT_TYPE = '%' | 'px'

  export interface Node {
    mpl_group: string
    mpl_title: string
    mpl_version: string
    visible: '1' | '0' // `${cid}_visible` 显示隐藏初始变量 '1' true '0' false
    visibleType: 'default' | 'custom' // 显示隐藏变量类型
    mpl_ce: 'c' | 'e' | 'ce' // c: community免费版 enterprise企业版 ce免费版控件包含企业版功能
    mpl_zh: string // 自定义标识 - 业务标识节点
    cid: string

    field: string // 组件绑定的字段, 一般用于表单, 表格等组件
    tag: NODE_TAG | SENIOR_TAG
    mpl_children: Node[] // 子组件节点挂载顺序【所有组件都有此属性。此属性是直接子节点的绑定】
    events: EventNode[] // 组件内动态新增事件
    variables: NodeVar[] // 组件内动态新增变量
    defaultEvents: EventNode[] // 组件默认内置事件
    pos: { pc: NodePos; mobile: NodePos } // 位置缩放定位
    classList: string[] // 系统级别 tailwindcss
    userClassName: [] // 用户新增的classlist
    style: string // style ide
    itemList?: any[]
  }

  // 页面类型的附件内容 - 全局样式、关联资源等
  export interface PageMeta {
    page: {
      bgColor: string
    }
  }

  export interface FormItemRule {
    type: 'custom' | 'system'
    code: string
    option: FormItemRuleNode[]
  }

  export interface FormItemRuleNode {
    type: string // 系统规则名称，或者自定义方法名
    message: string
    trigger: string[]
  }

  // 限制输入规则
  export interface LimitInputProp {
    label: string
    value: string
    meta: any
  }

  export interface NodePos {
    w: number
    wType: LEN_UNIT_TYPE
    h: number
    hType: LEN_UNIT_TYPE
    minH?: number | string | '' // 用于容器组件
    maxH?: number | ''
    minW?: number | ''
    type: ComponentPosType // 组件宽高拖拉拽配置【所有容器】
    mod?: 'popover' | 'box' | 'normal' | 'form' | 'dialog' | 'drawer' | 'formItem' | 'slot' // 画板UI定位 默认 normal
  }
  // 组件向外提供的变量
  export interface NodeVar {
    desc: string
    key: string
    value: any
    fullPath: string
  }

  export interface ContextMenuNode {
    label: string
    icon: string
    disabled: boolean
    divider: boolean
    value: string
    onClick: () => void
    children?: ContextMenuNode[]
  }

  export interface TreeNodeList extends Node {
    mpl_children: Node[]
    isRootNode: boolean
  }

  // 组件内置组件。 slotPos 内置组件顺序位置
  export type SlotSubNode = Node & { slotPos: 'l' | 'r' }

  export type SubSlotNode = { slotPos: 'l' | 'r', cid: string, tag: string }

  export interface NodeContextmenu {
    label: string
    value: string
    divider: boolean
    disabled: boolean
    icon: string
    onclick?: () => void
    var?: string
    children?: NodeContextmenu[]
  }

  // 关联子组件类型
  export type SLOT_NODE_TAG = 'btn' | 'input' | 'txt' | 'link' | 'icon' | 'input'

  export interface SLOT_NODE {
    tag: SLOT_NODE_TAG
    cid: string
    pos: 'l' | 'r'
    metaInfo: any // 存储子节点信息
  }

  export interface ComponentBaseExport {
    tag: NODE_TAG | SENIOR_TAG
    comp: ([k]: any) => Node
    pos: { pc: NodePos; mobile: NodePos }
    getTemplateCode: (node: any) => string
    getBaseVar?: (cid: string) => string
    getNodeVar: (node: any) => NodeVar[]
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

  // 仅存储已经绑定的事件和自定义事件
  export interface EventNode {
    name: string // 事件名
    code: string // 源码 或 事件流
    desc: string // 事件描述
    mpl_zh?: string // 事件对应的组件标题
    type: 'baseComponent' | 'seniorComponent' | 'referenceComponent' | 'businessTemplate' | 'others'
    flowType: 'ide' | 'catalog' | 'flow' | '' // 代码内容格式. 初始化
    cid: string // 存储组件cid. 删除组件时, 可批量删除组件绑定事件
    tag: string // type=node时，存储组件标签. 主要用于好分类UI
    open: boolean // 默认开启
  }

  // 文件节点列表。不存在文件夹概念
  export interface ProjectNode {
    title: string // 文件标题
    id: string // 文件id
    parentId: string // 目录id
    projectId: string // 项目id
    // 页面类型
    type: FILE_TYPE
  }

  export interface FileDetailProp {
    id: string // 文件id
    title: string // 文件名
    type: FILE_TYPE // 文件类型
    nodes: string // 仅type=page时展示
    events: string // 仅type=page时展示
    styles: string // 仅type=page时展示
    codeStr: string // 仅type=page时展示
    value: string // 其他页面的存储格式
    size: string // 文件大小 - 仅图片、样式、js文件等静态资源时显示
  }

  export interface IconPackage {
    label: string
    url: string
  }

  export interface Platform {
    id: string
    title: string
    description: string
    version: string
    theme: string[]
  }

  export interface Project {
    id: string
    name: string
    logo: string
    description: string
    // platform: Array<{ label: string; value: PlatType }>
    imgLinks: string[]
    cssLinks: string[]
    jsLinks: []
    iconLinks: []
    technology: string[]
    platformList: Array<{ name: string, id: PlatType }>
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

  export type PLATFORM_UI = 'elementPlus' | 'vant4' | 'antDesign' | 'antDesignMobile'
  export type PLATFORM_GENERATOR = PLATFORM_UI | 'vars'
  export type GENERATOR_RENDER<T extends Node> = (k: T) => Promise<T>

  export interface SettingMap {
    tag: string
    // tag: NODE_TAG | SENIOR_TAG // 组件标签
    node: ComponentBaseExport // 组件的属性定义
    newNode: (cid?: string) => Node // 组件初始化
    renderCode: (node: any, type: RESOURCE) => string // 最终生成的源码

    // 画板展示内容
    workbench: Record<PLATFORM_UI, any>
    // 预览-源码渲染过程 - vue3-sfc-loader | react-sfc-loader
    generator: Record<PLATFORM_GENERATOR, GENERATOR_RENDER<any | Node>>
    componentModel: any // 组件UI设置
    moduleModel: any // 组件推荐的模板列表
    styleModel: any // 组件的样式设置
    patchModel: any // 组件的兜底补充、新增属性、删除属性、新增方法、参数自定义传递等等
  }

  export interface QrCodeFields {
    id: string
    type: 'text' | 'img'
    text: string
    fontFamily: string
    fontWeight: string
    fontSize: string
    color: string
  }

  export interface QrCodeProp {
    type: string
    id: string
    title: string
    fields: QrCodeFields[]
  }
}

export = MPL

export default MPL
