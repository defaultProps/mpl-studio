import { Project } from '@mpl/typings'

// 演示项目列表
export const projectList: Project[] = [
  {
    title: '汽车金融资产沉淀平台',
    description: '演示标准表单表格页的常规交互能力。',
    id: 'lbacc3c261u242c5',
    platform: [
      { label: 'MPL-DFN 标准桌面应用中台', value: 'MPL-DFN' }
    ],
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
    platform: [
      { label: 'MPL-MHS 标准移动端平台', value: 'MPL-MHS' }
    ],
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
      { label: 'MPL-DFN 标准桌面应用中台', value: 'MPL-DFN' },
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
    platform: [
      { label: 'MPL-LPT 标准大屏展示平台', value: 'MPL-DFN' },
    ],
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
    platform: [
      { label: 'MPL-WFP 标准桌面应用中台', value: 'MPL-WFP' },
    ],
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
    platform: [
      { label: 'MPL-TP 标准移动端平台', value: 'MPL-TP' },
    ],
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
      { label: 'MPL-WFP 标准桌面应用中台', value: 'MPL-WFP' },
      { label: 'MPL-TP 标准移动端平台', value: 'MPL-TP' },
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
    platform: [
      { label: 'MPL-RPL 标准大屏展示平台', value: 'MPL-RPL' }
    ],
    technology: ['Ant Design', '桌面端', '大屏'],
    imgLinks: [],
    cssLinks: [],
    jsLinks: [],
    iconLinks: []
  }
]

// 文件节点列表。不存在文件夹概念
export interface ProjectNode {
  title: string
  id: string
  parentId: string
  projectId: string
  type: 'page' | 'docs' | 'javascript' | 'typescript' | 'vue' | 'image' | 'css' | 'markdown' | 'excel' | 'word' | 'folder'
  nodes: string // json string MPL.Node[]
  evt: string
  style: string
  codeStr: string
}

// 演示项目的页面目录
export const projectPageList: ProjectNode[] = [
  {
    title: '个体户线上商城某运营管理后台',
    id: 'rw2adwy2p9ij1796',
    projectId: 'lbacc3c261u242c5',
    parentId: '',
    type: 'folder',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: '订单列表',
    id: 'xh2gh20e33reknak',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: '商家列表',
    id: 'm0syjb1wlct6u03s',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: '客户列表',
    id: 'do65boaoajsfb0a1',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: '食品列表',
    id: 'rg6jt4rdfgdfg4v343',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: '个人详情',
    id: '1234565432sdfgdfhgfd',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: '仓储运输',
    id: 'edfdsgdfgdrh345345',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: '商城图表统计',
    id: 'jhgfds2345yhb4ed345',
    projectId: 'lbacc3c261u242c5',
    parentId: 'rw2adwy2p9ij1796',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: 'HarmonyOS设置',
    id: 'qq2ee3tt5yy6uu8',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: '',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: '设置列表主页',
    id: 'o4fe3g5gn532f0f8b',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: 'WLAN',
    id: 'gn6ht7jt6ku8ky7',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: '蓝牙',
    id: 'llo001ok3j3h3g3ff3',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    evt: '',
    style: '',
    codeStr: ''
  },
  {
    title: '移动网络',
    id: 'uq9al1gv1cc',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '超级终端',
    id: 'kr0rr5er5gg',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '桌面壁纸',
    id: 'cz6ep1rv4qy',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '显示和亮度',
    id: 'br2nc3fq5ft',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '声音和振动',
    id: 'xi6qq7du5gt',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '通知',
    id: 'oc4tm7nb1do',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '生物识别和密码',
    id: 'ib3mh8ck0lk',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '应用和服务',
    id: 'dk7lc4ve0qk',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '电池',
    id: 'lv2sz1vj5yn',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '存储',
    id: 'fj1ti4hf5eh',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '安全',
    id: 'ne9cv2vg1sp',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '隐私',
    id: 'ur8ym4tc1fm',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '健康使用手机',
    id: 'dx1tu8wd5qh',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '智慧助手',
    id: 'nr6mw1fd0da',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '辅助功能',
    id: 'ga0ht2nk4sj',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '用户和账号',
    id: 'ub5rb2xr4ww',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: 'HMS Core',
    id: 'ko5ci8pd0gj',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  },
  {
    title: '系统和更新',
    id: 'kc9dl4ri5pv',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''

  },
  {
    title: '关于手机',
    id: 'qa4dg7bz4kv',
    projectId: 'ol6po4fe3g5gn532f',
    parentId: 'qq2ee3tt5yy6uu8',
    type: 'page',
    nodes: '',
    style: '',
    evt: '',
    codeStr: ''
  }
]
