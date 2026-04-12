import { Project, Platform, ProjectNode, FileDetailProp } from '@mpl/typings'

// MPL平台
export const systemPlatformList: Platform[] = [
  {
    id: 'MPL-DFN',
    title: 'MPL-DFN 营销领域平台', // 表单、表格复杂交互。支持工作流
    description: '适配于 Vue3 + element-plus 平台',
    version: '1.0.0',
    theme: ['light', 'dark', 'colors']
  },
  {
    id: 'MPL-MHS',
    title: 'MPL-MHS 标准移动端平台',
    description: '适配于 Vue3 + Vant4 平台',
    version: '1.0.0',
    theme: ['light', 'dark']
  },
  {
    id: 'MPL-WFP',
    title: 'MPL-WFP 资产云平台', // 表单、表格复杂交互。支持工作流
    description: '适配于 React + ant-design 平台',
    version: '1.0.0',
    theme: ['light', 'dark']
  },
  {
    id: 'MPL-TP',
    title: 'MPL-TP 标准移动端平台',
    description: '适配于 React + ant-design-mobile 平台',
    version: '1.0.0',
    theme: ['light', 'dark']
  },
  {
    id: 'MPL-RPL',
    title: 'MPL-RPL 大屏展示平台',
    description: '适配于 Vue + Echarts 平台',
    version: '1.0.0',
    theme: ['light']
  },
  {
    id: 'MPL-EPT',
    title: 'MPL-RPL 空白平台',
    description: '适配于于原型设计、平面设计等空白平台',
    version: '1.0.0',
    theme: ['light']
  }
]

// 演示项目列表
export const projectList: Project[] = [
  {
    name: '汽车金融资产沉淀平台',
    description: '演示标准表单表格页的常规交互能力。',
    id: 'lbacc3c261u242c5',
    logo: 'https://vitejs.cn/vite3-cn/logo.svg',
    platformList: [{ name: 'MPL-DFN 标准应用中台', id: 'MPL-DFN' }],
    technology: ['vue3', 'element-plus'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    name: 'HarmonyOS设置',
    description: '鸿蒙移动终端设置页，演示移动端页面的常规交互。',
    id: 'ol6po4fe3g5gn532f',
    logo: 'https://vitejs.cn/vite3-cn/logo.svg',
    platformList: [{ name: 'MPL-MHS 标准移动端平台', id: 'MPL-MHS' }],
    technology: ['vue3', 'vant4'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    name: '车联网华南区管理',
    description: '营销领域平台，演示营销类平台的复杂表单表格交互能力。',
    id: 'vf4ju8lo9ju7ku8lo9',
    platformList: [
      { name: 'MPL-DFN 标准应用中台', id: 'MPL-DFN' },
      { name: 'MPL-MHS 标准移动端平台', id: 'MPL-MHS' }
    ],
    logo: 'https://vitejs.cn/vite3-cn/logo.svg',
    technology: ['react', 'ant-design'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    name: '某地房产营销一体化平台',
    description: '全面演示常用组件的交互能力，包括: 图表展示交互、表格展示编辑、表单校验、基础排版、同步服务等能力。',
    id: 'rg5jt7ku0003wf4jy7',
    platformList: [{ name: 'MPL-WFP 标准应用中台', id: 'MPL-WFP' }],
    technology: ['react', 'ant-design'],
    logo: 'https://vitejs.cn/vite3-cn/logo.svg',
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    name: '京东App个人设置',
    description: '演示移动端组件库业务功能能力',
    id: 'rg5jt7ku8bf3wf4jy7',
    logo: 'https://vitejs.cn/vite3-cn/logo.svg',
    platformList: [{ name: 'MPL-TP 标准移动端平台', id: 'MPL-TP' }],
    technology: ['vue3', 'vant4'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    name: '党办服务工作站',
    description: '演示工作流常用组件能力',
    id: 'rg5jt7ku8bf3wf4jy7',
    platformList: [
      { name: 'MPL-WFP 标准应用中台', id: 'MPL-WFP' },
      { name: 'MPL-TP 标准移动端平台', id: 'MPL-TP' }
    ],
    logo: 'https://vitejs.cn/vite3-cn/logo.svg',
    technology: ['vue3', 'element-plus'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    name: '建筑施工进度大屏展示',
    description: '演示大屏展示组件库能力',
    id: 'rg5jt7ku8bf3wf4jy7',
    logo: 'https://vitejs.cn/vite3-cn/logo.svg',
    platformList: [{ name: 'MPL-RPL 标准大屏展示平台', id: 'MPL-RPL' }],
    technology: ['vue3', 'echarts'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    name: '深圳福田图书馆书籍管理平台',
    description: '演示常规文本排版能力',
    id: '112jt7ku8bf3wf4jy7',
    logo: 'https://vitejs.cn/vite3-cn/logo.svg',
    platformList: [{ name: 'MPL-LPT 标准大屏展示平台', id: 'MPL-DFN' }],
    technology: ['vue3', 'element-plus'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    name: '数据模型一体化平台',
    description: '演示后台数据模型一体化平台，数据模型自动生成页面',
    id: '54u7jt7ku8bf3wf4jy7',
    logo: 'https://vitejs.cn/vite3-cn/logo.svg',
    platformList: [{ name: 'MPL-LPT 标准大屏展示平台', id: 'MPL-DFN' }],
    technology: ['react', 'echarts'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  }
]

// 服务生态
export const serviceDocsList = [
  {
    title: '汽车金融资产沉淀平台',
    description: '演示标准表单表格页的常规交互能力。',
    id: 'lbacc3c261u242c5',
    platform: [{ label: 'MPL-DFN 标准应用中台', value: 'MPL-DFN' }],
    technology: ['Element-Plus', '桌面端'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    title: 'HarmonyOS设置',
    description: '鸿蒙移动终端设置页，演示移动端页面的常规交互。',
    id: 'ol6po4fe3g5gn532f',
    platform: [{ label: 'MPL-MHS 标准移动端平台', value: 'MPL-MHS' }],
    technology: ['Vant4', '移动端'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    title: '车联网华南区管理',
    description: '营销领域平台，演示营销类平台的复杂表单表格交互能力。',
    id: 'vf4ju8lo9ju7ku8lo9',
    platform: [
      { label: 'MPL-DFN 标准应用中台', value: 'MPL-DFN' },
      { label: 'MPL-MHS 标准移动端平台', value: 'MPL-MHS' }
    ],
    technology: ['Element-Plus', 'Vant4', '跨平台'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    title: '四统一报销服务平台',
    description: '演示面板容器等控件的排版布局能力。',
    id: 'rg5jt7ku8bf3wf4jy7',
    platform: [{ label: 'MPL-LPT 标准大屏展示平台', value: 'MPL-DFN' }],
    technology: ['Element-Plus', '桌面端', '大屏'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    title: '某地房产营销一体化平台',
    description: '全面演示常用组件的交互能力，包括不限于：图表展示交互、表格展示编辑、表单校验、基础排版、同步服务等能力。',
    id: 'rg5jt7ku0003wf4jy7',
    platform: [{ label: 'MPL-WFP 标准应用中台', value: 'MPL-WFP' }],
    technology: ['Ant Design', '桌面端'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    title: '京东App个人设置',
    description: '演示移动端组件库业务功能能力',
    id: 'rg5jt7ku8bf3wf4jy7',
    platform: [{ label: 'MPL-TP 标准移动端平台', value: 'MPL-TP' }],
    technology: ['Ant Design Mobile', '移动端'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    title: '党办服务工作站',
    description: '演示工作流常用组件能力',
    id: 'rg5jt7ku8bf3wf4jy7',
    platform: [
      { label: 'MPL-WFP 标准应用中台', value: 'MPL-WFP' },
      { label: 'MPL-TP 标准移动端平台', value: 'MPL-TP' }
    ],
    technology: ['Ant Design Mobile', 'Ant Design', '跨平台'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  },
  {
    title: '建筑施工进度大屏展示',
    description: '演示大屏展示组件库能力',
    id: 'rg5jt7ku8bf3wf4jy7',
    platform: [{ label: 'MPL-RPL 标准大屏展示平台', value: 'MPL-RPL' }],
    technology: ['Ant Design', '桌面端', '大屏'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  }
]

// 项目中的文件详情
export const fileDetailList: FileDetailProp[] = [
  {
    id: '7l9o3gdf34dfg34',
    title: '个人详情',
    type: 'basePage',
    nodes: "[{\"mpl_group\":\"表单控件\",\"mpl_title\":\"基础输入\",\"mpl_zh\":\"输入\",\"mpl_ce\":\"c\",\"mpl_version\":\"1.0.0\",\"cid\":\"co2eu\",\"tag\":\"mpl-input\",\"size\":\"small\",\"mpl_children\":[],\"classList\":[],\"userClassName\":[],\"style\":\"\",\"visible\":\"1\",\"visibleType\":\"\",\"label\":{\"show\":true,\"width\":120,\"text\":\"基础输入框\",\"pos\":\"r\",\"icon\":\"icon-info2\",\"iconTheme\":\"#C3002F\",\"iconText\":\"基础信息\"},\"input\":{\"required\":false,\"model\":\"\",\"modelType\":\"\",\"suffixIcon\":\"\",\"prefixIcon\":\"\",\"width\":\"\",\"size\":\"sm\",\"pos\":\"l\",\"maxlength\":10,\"showLimit\":false,\"clearable\":true,\"readonly\":false,\"maxLength\":\"none\",\"placeholder\":\"请输入\",\"rules\":[{\"mod\":\"system\",\"trigger\":[\"blur\"],\"option\":[{\"value\":\"required\",\"message\":\"请输入\"}],\"message\":\"\"}]},\"events\":[],\"slotBtn\":[],\"relationNodes\":[],\"pos\":{\"pc\":{\"w\":6,\"h\":4,\"minH\":5,\"maxH\":7,\"minW\":1,\"type\":\"w\",\"mod\":\"formItem\"},\"mobile\":{\"w\":24,\"h\":\"76px\",\"minH\":8,\"maxH\":20,\"minW\":24,\"type\":\"h\",\"mod\":\"formItem\"}}}]",
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'xh2gh20e33reknak',
    title: '订单列表',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'm0syjb1wlct6u03s',
    title: '商家列表',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'do65boaoajsfb0a1',
    title: '客户列表',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'rg6jt4rdfgdfg4v343',
    title: '食品列表',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'edfdsgdfgdrh345345',
    title: '仓储运输',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'jhgfds2345yhb4ed345',
    title: '商城图表统计',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'qq2ee3tt5yy6uu8',
    title: 'HarmonyOS设置',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'o4fe3g5gn532f0f8b',
    title: '设置列表主页',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'gn6ht7jt6ku8ky7',
    title: 'WLAN',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'llo001ok3j3h3g3ff3',
    title: '蓝牙',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'uq9al1gv1cc',
    title: '移动网络',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'kr0rr5er5gg',
    title: '超级终端',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'cz6ep1rv4qy',
    title: '桌面壁纸',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'xi6qq7du5gt',
    title: '声音和振动',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'oc4tm7nb1do',
    title: '通知',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'ib3mh8ck0lk',
    title: '生物识别和密码',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'dk7lc4ve0qk',
    title: '应用和服务',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'lv2sz1vj5yn',
    title: '电池',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'fj1ti4hf5eh',
    title: '存储',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'ne9cv2vg1sp',
    title: '安全',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'ur8ym4tc1fm',
    title: '隐私',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'dx1tu8wd5qh',
    title: '健康使用手机',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'nr6mw1fd0da',
    title: '智慧助手',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'ga0ht2nk4sj',
    title: '辅助功能',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'ub5rb2xr4ww',
    title: '用户和账号',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'ko5ci8pd0gj',
    title: 'HMS Core',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'kc9dl4ri5pv',
    title: '系统和更新',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  },
  {
    id: 'qa4dg7bz4kv',
    title: '关于手机',
    type: 'basePage',
    nodes: '',
    events: '',
    styles: '',
    codeStr: '',
    value: '',
    size: ''
  }
]

// 演示项目的页面目录
export const projectPageList: ProjectNode[] = [
  {
    title: '个体户线上商城运营管理后台',
    id: 'rw2adwy2p9ij1796',
    projectId: 'lbacc3c261u242c5',
    parentId: '',
    type: 'folder'
  },
  {
    title: '订单列表',
    id: 'xh2gh20e33reknak',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'folder'
  },
  {
    title: '商家列表',
    id: 'm0syjb1wlct6u03s',
    projectId: 'lbacc3c261u242c5',
    parentId: 'xh2gh20e33reknak',
    type: 'basePage'
  },
  {
    title: '客户列表',
    id: 'do65boaoajsfb0a1',
    projectId: 'lbacc3c261u242c5',
    parentId: 'xh2gh20e33reknak',
    type: 'basePage'
  },
  {
    title: '食品列表',
    id: 'rg6jt4rdfgdfg4v343',
    projectId: 'lbacc3c261u242c5',
    parentId: 'xh2gh20e33reknak',
    type: 'basePage'
  },
  {
    title: '个人详情',
    id: '7l9o3gdf34dfg34',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'basePage'
  },
  {
    title: '仓储运输',
    id: 'edfdsgdfgdrh345345',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'basePage'
  },
  {
    title: '商城图表统计',
    id: 'jhgfds2345yhb4ed345',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'basePage'
  },
  {
    title: 'HarmonyOS设置',
    id: 'qq2ee3tt5yy6uu8',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: '',
    type: 'basePage'
  },
  {
    title: '设置列表主页',
    id: 'o4fe3g5gn532f0f8b',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: 'WLAN',
    id: 'gn6ht7jt6ku8ky7',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '蓝牙',
    id: 'llo001ok3j3h3g3ff3',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '移动网络',
    id: 'uq9al1gv1cc',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '超级终端',
    id: 'kr0rr5er5gg',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '桌面壁纸',
    id: 'cz6ep1rv4qy',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '显示和亮度',
    id: 'br2nc3fq5ft',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '声音和振动',
    id: 'xi6qq7du5gt',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '通知',
    id: 'oc4tm7nb1do',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '生物识别和密码',
    id: 'ib3mh8ck0lk',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '应用和服务',
    id: 'dk7lc4ve0qk',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '电池',
    id: 'lv2sz1vj5yn',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '存储',
    id: 'fj1ti4hf5eh',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '安全',
    id: 'ne9cv2vg1sp',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '隐私',
    id: 'ur8ym4tc1fm',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '健康使用手机',
    id: 'dx1tu8wd5qh',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '智慧助手',
    id: 'nr6mw1fd0da',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '辅助功能',
    id: 'ga0ht2nk4sj',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '用户和账号',
    id: 'ub5rb2xr4ww',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: 'HMS Core',
    id: 'ko5ci8pd0gj',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '系统和更新',
    id: 'kc9dl4ri5pv',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  },
  {
    title: '关于手机',
    id: 'qa4dg7bz4kv',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'basePage'
  }
]
