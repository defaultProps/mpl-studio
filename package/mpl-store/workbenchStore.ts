import { defineStore } from 'pinia'
import { markRaw, nextTick } from 'vue'
import { mapNodeSetting, mplBodyRoot, SchemaIDE, getComponentVars } from '@mpl/node'
import { mplIframePostMessage } from '@mpl/const'
import { queryNodePath, updateNodeSingleProp, insertNodeRight, insertNodeChild, insertToMplVar, queryNodeByCid, newCid } from '@mpl/libs'
import { useDebounceFn } from '@vueuse/core'
import localforage from 'localforage'
import { projectStore } from './projectStore'
import { viewStore } from './viewStore'
import { defaultsDeep } from 'lodash'
import type {
  BreadCrumbNode,
  PlatType,
  Node,
  NodeNote,
  EventNode,
  IDE_FOOTER_MODEL,
  ActiveComponentSettingModel,
  PageOutline
} from '@mpl/typings'

// 修改NodeList后保存到本地. 延迟2秒保存
const saveCurrentPageIntoLocalforage = useDebounceFn(({ nodeList, style, pageId }: { nodeList: Node[], style: string, pageId: string }) => {
  // nodeList需要压缩. JSON.stringify({ nodeList, style })数据量较大时卡顿. 防止数据量过大保存缓慢
  localforage.setItem(`previewNodeList-${pageId}`, JSON.stringify({ nodeList, style }))
}, 2000)

export interface WorkbenchStore {
  ideModel: IDE_FOOTER_MODEL
  // 项目类型展示
  visibleGuildLine: boolean // 显示辅助线
  visibleNodeOutline: boolean // 显示节点边框线
  visibleBtnGroup: boolean // 显示辅助工具栏
  visibleNote: boolean // 显示注解
  visibleWorkflow: boolean // 预览时显示工作流功能
  visibleDraft: boolean // 显示草稿
  breadcrumbList: BreadCrumbNode[] // nodeList组件统计展示【根据组件类型、组件事件】，级联选择展示
  nodeList: Node[] // JSON数据. 存储mini-zip压缩后的数据, 完整数据存储在indexDB中
  noteList: NodeNote[] // 注解列表

  footerOperation: {
    size: number // 画板底部操作区域尺寸
    visible: boolean // 是否显示画板底部操作区域
  },

  activeNode: Node | null // 页面类型中的-当前选中组件
  activeNodeId: string // 页面类型中的-当前选中组件cid
  activeBreadcrumb: string // 页面类型中的-当前选中组件的目录结构-一维数组
  pageMeta: { // 页面类型中的-页面其他配置属性
    layout: string // 页面排版布局【有值表示使用了页面排版组件】
    style: string // 仅限制用于此页面的私有样式
  }

  // nodeList内部同样存储所有事件，eventList 仅仅做一个用户可视化编辑的快捷存储列表，用户修改后同步更新到nodeList每个节点中
  // 包含组件内部辅助组件的所有事件
  eventList: EventNode[] // 组件事件列表, 用户快速定位查询. 存储代码和事件, 仅存储节点和事件列表[临时存储状态]
  pageVar: string
  // 页面脚本
  pageJs: string
  pageStyle: string // 页面样式
  pageImport: string[] // 页面脚本

  activePlatform: Array<PlatType> // 当前挂载平台
  workbenchLayout: 'standard' | 'grid' // 项目画板布局
  workbenchSize: '1920*1080' | '2560*1440' | '3840*2160' | '1440*900' | '1336*768' // 项目画板尺寸

  themeType: string // 查看当前平台主题
  shallComponentSettingRef: any // 右侧展示组件配置项
  activeComponentSettingModel: ActiveComponentSettingModel // 右侧配置项
  pageOutline: PageOutline[] // 页面大纲目录
}

export const workbenchStore = defineStore('Workbench', {
  state: (): WorkbenchStore => {
    return {
      ideModel: 'var',
      pageMeta: {
        layout: '',
        style: '',
      },
      visibleWorkflow: false, // 是否显示工作流
      visibleDraft: false, // 是否显示草稿
      visibleNote: false, // 是否显示注解
      visibleGuildLine: true, // 辅助线
      visibleNodeOutline: true, // 控件之间的间距线
      visibleBtnGroup: false, // 辅助工具栏
      activePlatform: ['MPL-DFN'], // 挂载平台
      workbenchLayout: 'standard', // 项目画板布局
      workbenchSize: '1920*1080', // 项目画板尺寸
      breadcrumbList: [],
      themeType: 'MPL-Light',
      noteList: [], // 注解列表
      nodeList: [], // 节点列表, 初始化body根节点
      footerOperation: {
        size: 600,
        visible: true
      },
      activeNode: null, // 当前选中的节点
      activeNodeId: '', // 当前选中节点的cid
      activeBreadcrumb: '', // 当前选中的节点目录结构
      shallComponentSettingRef: markRaw(mplBodyRoot.componentModel),
      // 一维数组, 保存所有事件
      eventList: [],
      pageVar: `
        const mpl = {
          var: mpl.var.merge({
            page: {
              disabledPage: false,
              loadingPage: false,
              rules: []
            },
          })
        }
      `,
      pageJs: `
        const mpl = {
          watch: {},
          props: {},
          emits: [],
          methods: {},
          created() {},
          mounted() {},
          destroyed() {}
        }
      `,
      pageStyle: `
        aria-mod="mpl" {
          // 页面样式, 支持less写法
          .el-form {
            background-color: #f00;
            color: #333;
          }
        }
      `,
      pageImport: [], // 三方脚本 `import eCharts from 'echarts'`
      activeComponentSettingModel: 'componentModel', // 画布控件右侧配置UI模块
      pageOutline: [] // 页面大纲目录
    }
  },
  actions: {
    initWorkbench() {
      this.breadcrumbList = []
      this.resetBodyNode()
    },
    resetBodyNode() {
      const rootBodyNode = mplBodyRoot.newNode()
      this.nodeList = [rootBodyNode]
      this.activeNode = rootBodyNode
      this.activeNodeId = rootBodyNode.cid
      this.shallComponentSettingRef = markRaw(mplBodyRoot.componentModel)
    },
    selectNodeByCid(cid: string) {
      // 选中节点重复点击无效
      if (this.activeNode?.cid === cid) {
        return
      }

      if (cid === 'body') {
        this.breadcrumbList = []
        const bodyNode: Node | undefined = this.nodeList.find(v => v.tag === 'mpl-body')
        this.activeNode = bodyNode || null
        this.activeNodeId = bodyNode?.cid || ''
        this.shallComponentSettingRef = markRaw(mplBodyRoot.componentModel)
        mplIframePostMessage.workbench.updateActiveNode(null)

        return
      }

      const view = viewStore()

      view.$patch({
        subBoxSettingModel: '',
        subBoxSettingModelId: ''
      })

      const obj = queryNodeByCid(this.nodeList, cid)

      if (!obj.node) {
        console.error('画板点击未找到节点', cid, this.nodeList)
        return
      }

      mplIframePostMessage.workbench.updateActiveNode(obj.node)

      this.breadcrumbList = queryNodePath(this.nodeList, cid)
      this.activeNode = obj.node
      this.activeNodeId = obj.node.cid

      this.shallComponentSettingRef = null // 更新节点后立即清空右侧配置下。防止相同类型节点点击无效不更新
      this.updateShallComponentSettingRef('componentModel')
    },
    // 仅仅更新控件标题, 只需要更新eventNodeList的name即可, 减少无用刷新.
    updateEventNodeListByNameText(obj: { labelText: string, cid: string }) {
      const target = this.eventList.find(v => v.cid === obj.cid)
      if (target) {
        target.mpl_zh = obj.labelText
        window.parent.postMessage({ type: 'UPDATE_EVENT_NODE_LIST', }, '*')
      }
    },
    // 增加组件时, 组件事件同步增加
    addEventList(node: Node) {
      const addEventList: EventNode[] = node.defaultEvents.map(s => ({
        type: 'baseComponent',
        name: s.name,
        mpl_zh: node.mpl_zh || '',
        code: s.code,
        desc: s.desc,
        cid: node.cid,
        tag: node.tag,
        open: s.open || false, // 新建是可能是默认开启状态, 比如表格分页
        flowType: 'ide',
      }))
      this.eventList.push(...addEventList)
      window.parent.postMessage({ type: 'UPDATE_EVENT_NODE_LIST', }, '*')
      const pageId = projectStore().activeFileId
      saveCurrentPageIntoLocalforage({
        nodeList: this.nodeList,
        style: this.pageStyle,
        pageId
      })
    },
    /**
     * @param node 新增节点
     * @param pid 父节点cid
     * @param position 插入位置, 默认右侧
     * @description nodeList添加节点
     */
    addNode(node: Node, pid = '', position: 'l' | 'r' = 'r') {
      insertNodeChild(this.nodeList, node, pid, position)

      // 选中节点
      this.selectNodeByCid(node.cid)
      // 更新事件列表
      this.addEventList(node)

      mplIframePostMessage.workbench.updateNodeListWorkbench(this.nodeList)
      const pageId = projectStore().activeFileId
      saveCurrentPageIntoLocalforage({
        nodeList: this.nodeList,
        style: this.pageStyle,
        pageId
      })
      // 新增节点插入变量
      // `${node.cid}: mpl.var.marge('input', { vModel: ''})`
      const result = insertToMplVar(this.pageVar, getComponentVars({ tag: node.tag, cid: node.cid }))
      if (result) {
        this.pageVar = result
        window.parent.postMessage({ type: 'UPDATE_PAGE_VAR_IDE', }, '*')
      }
    },
    // 删除单个节点
    deleteNode(cid: string) {
      if (this.activeNodeId === cid) {
        this.breadcrumbList = []
      }

      function _deleteNode(nodes: Node[]) {
        let isDeleted = false
        function findTargetNode(nodes: Node[]) {
          if (isDeleted) {
            return
          }

          nodes.forEach((v, i) => {
            if (v.cid === cid) {
              nodes.splice(i, 1) // 仅仅删除node, 事件不删除
              isDeleted = true
              return
            }

            if (['mpl-tabs', 'mpl-collapse'].includes(v.tag)) {
              (v as any).itemList.forEach((s: any) => {
                findTargetNode(s.mpl_children)
              })
            }
            else if (Array.isArray(v.mpl_children)) {
              findTargetNode(v.mpl_children)
            }
          })
        }
        findTargetNode(nodes)
      }

      _deleteNode(this.nodeList)
      // 移除单个控件 eventList
      this.eventList = this.eventList.filter(v => v.cid !== cid)
      window.parent.postMessage({ type: 'UPDATE_EVENT_NODE_LIST', }, '*')
      mplIframePostMessage.workbench.updateNodeListWorkbench(this.nodeList)
      const pageId = projectStore().activeFileId
      saveCurrentPageIntoLocalforage({
        nodeList: this.nodeList,
        style: this.pageStyle,
        pageId
      })
    },
    updateShallComponentSettingRef(activeModel: ActiveComponentSettingModel) {
      this.activeComponentSettingModel = activeModel

      if (activeModel !== 'componentModel') {
        const view = viewStore()

        view.$patch({
          subBoxSettingModel: '',
          subBoxSettingModelId: ''
        })
      }

      if (activeModel === 'schemaModel') {
        this.shallComponentSettingRef = markRaw(SchemaIDE)
        return
      }

      const _temp = this.activeNode?.tag && mapNodeSetting[this.activeNode.tag]

      nextTick(() => {
        if (_temp) {
          this.shallComponentSettingRef = activeModel ? markRaw(_temp[activeModel]) : markRaw(mplBodyRoot.componentModel)
        } else {
          this.shallComponentSettingRef = markRaw(mplBodyRoot.componentModel)
        }
      })
    },
    // 复制选中节点到选中节点右侧
    copyActiveNodeToRightNode(cid: string) {
      if (this.activeNode?.cid !== cid) {
        return
      }

      const id = newCid()
      // cid替换为id
      const stringifyStr = JSON.stringify(this.activeNode)
      const newNode: Node = JSON.parse(stringifyStr.replace(cid, id))
      // 插入节点
      insertNodeRight(this.nodeList, newNode, cid)
      // 通知workbench
      this.selectNodeByCid(id)
      mplIframePostMessage.workbench.updateNodeListWorkbench(this.nodeList)
    },
    deleteActiveNode() {
      if (!this.activeNode) {
        return
      }
      this.deleteNode(this.activeNode.cid)
    },
    // 更新节点部分属性
    updateNodeProp(cid: string, prop: any) {
      if (!cid || this.activeNode?.cid === cid) {
        // nodeList与activeNode是同一个引用, 只需要更新activeNode
        Object.keys(prop).forEach(k => {
          updateNodeSingleProp(this.activeNode, k, prop[k])
        })
      } else {
        let isDeleted = false
        function findTargetNode(nodes: Node[]) {
          if (isDeleted) {
            return
          }
          nodes.forEach((v, i) => {
            if (v.cid === cid) {
              defaultsDeep(nodes[i], prop)
              Object.keys(prop).forEach(key => {
                updateNodeSingleProp(v, key, prop[key])
              })
              isDeleted = true
              return
            }
            if (Array.isArray(v.mpl_children)) {
              findTargetNode(v.mpl_children)
            }
          })
        }
        findTargetNode(this.nodeList)
      }
      mplIframePostMessage.workbench.updateNodeListWorkbench(this.nodeList)
    },
    // 更新频率非常高 - 主要由右侧配置项内部交互的调用频率高导致.
    // 不更新 mpl_children
    updateActiveNodeAction(node: Node) {
      const obj = queryNodeByCid(this.nodeList, node.cid)

      // 节点直接替换
      if (obj.node && obj.parentNode) {
        obj.parentNode.mpl_children[obj.position] = node // 直接替换nodeList
      }

      mplIframePostMessage.workbench.updateNodeListWorkbench(this.nodeList)

      // 非常卡顿。节流调用. todo, 后续直接广播获取nodeList
      // 撤销重做的功能. 建议使用压缩 + 延迟批量存储.
      const pageId = projectStore().activeFileId
      saveCurrentPageIntoLocalforage({
        nodeList: this.nodeList,
        pageId,
        style: this.pageStyle
      })
    },
    // 仅仅更新nodeList
    updateNodeList(nodeList: Node[]) {
      this.nodeList = nodeList
      // const project = projectStore()
      // http.page.updatePageInfo(project.activeFileId, { nodes: JSON.stringify(nodeList) }) 自动保存默认关闭，非常卡
      mplIframePostMessage.workbench.updateNodeListWorkbench(nodeList)

      const pageId = projectStore().activeFileId
      saveCurrentPageIntoLocalforage({
        nodeList,
        pageId,
        style: this.pageStyle
      })
    },
    // 重置节点数据
    resetStore() {
      const rootBodyNode = mplBodyRoot.newNode()
      this.noteList = []
      this.eventList = []
      window.parent.postMessage({ type: 'UPDATE_EVENT_NODE_LIST', }, '*')
      this.nodeList = [rootBodyNode]
      this.activeNode = rootBodyNode
      this.activeNodeId = rootBodyNode.cid
      this.activeBreadcrumb = ''
      this.activeComponentSettingModel = 'componentModel'
      this.shallComponentSettingRef = markRaw(mplBodyRoot.componentModel)
      mplIframePostMessage.workbench.resetNodeList()
      const pageId = projectStore().activeFileId
      saveCurrentPageIntoLocalforage({
        nodeList: [],
        style: '',
        pageId,
      })
      mplIframePostMessage.workbench.updateNodeListWorkbench(this.nodeList)
    },
    // nodeList 更新单个事件
    updateNodeEvent(events: Array<{ name: string, code: string, cid: string }>) {
      function queryNode(list: Node[]) {
        list.forEach((v: any) => {
          const obj = events.find(s => s.cid === v.cid)
        })
      }
      queryNode(this.nodeList)
    },
    // nodeList 更新多个节点事件
    updateNodeEvents(events: Array<{ name: string, code: string, cid: string }>) {
      function queryNode(list: Node[]) {
        list.forEach((v: any) => {
          const obj = events.find(s => s.cid === v.cid)
          if (obj) {
            const t1 = v.defaultEvents.find((s: any) => s.name === obj.name)
            const t2 = v.events.find((s: any) => s.name === obj.name)
            if (t1) {
              t1.code = obj.code
            }
            if (t2) {
              t2.code = obj.code
            }
          }
          // 折叠面板
          if (['mpl-collapse', 'mpl-tabs'].includes(v.tag)) {
            v.itemList.forEach((s: any) => {
              if (Array.isArray(s.mpl_children) && s.mpl_children.length > 0) {
                queryNode(s.mpl_children)
              }
            })
          }
          // 其他容器
          else if (Array.isArray(v.mpl_children) && v.mpl_children.length > 0) {
            queryNode(v.mpl_children)
          }
        })
      }

      queryNode(this.nodeList)
    },
    /**
     * 
     * @param event {name: string, code: string, desc: string, cid?: string}
     * @param  name 事件名
     * @param  code 事件代码
     * @param  desc 事件描述
     * @param  cid  节点cid, 未传递cid默认为用户自定义的事件[非控件事件]
     * @description 单个事件新增
     */
    singleNodeEventPlus(event: EventNode) {
      this.eventList.push(event)
      window.parent.postMessage({ type: 'UPDATE_EVENT_NODE_LIST', }, '*')
      const pageId = projectStore().activeFileId
      saveCurrentPageIntoLocalforage({
        nodeList: this.nodeList,
        style: this.pageStyle,
        pageId
      })
    },
    // 更新整个 eventList
    updateEventList(eventList: EventNode[]) {
      this.eventList = eventList
      window.parent.postMessage({ type: 'UPDATE_EVENT_NODE_LIST', }, '*')
      const pageId = projectStore().activeFileId
      saveCurrentPageIntoLocalforage({
        nodeList: this.nodeList,
        style: this.pageStyle,
        pageId
      })
    },
    // 单个事件移除
    singleEventReduce(eventName: string) {
      if (!eventName) {
        return
      }
      const obj = this.eventList.find(v => v.name === eventName)
      if (obj) {
        obj.open = false
      }
      window.parent.postMessage({ type: 'UPDATE_EVENT_NODE_LIST', }, '*')
    },
    changeMountedPlatform(val: PlatType[]) {
      this.activePlatform = val
    },
    triggerVisibleGuild() {
      this.visibleGuildLine = !this.visibleGuildLine
      mplIframePostMessage.workbench.changeGuildLineStatus(this.visibleGuildLine)
    },
    triggerVisibleBtnGroup() {
      this.visibleBtnGroup = !this.visibleBtnGroup
      mplIframePostMessage.workbench.changeVisibleBtnGroup(this.visibleBtnGroup)
    },
    triggerVisibleNodeCalloutLine() {
      this.visibleNodeOutline = !this.visibleNodeOutline
      mplIframePostMessage.workbench.changeCalloutLineStatus(this.visibleNodeOutline)
    },
    triggerVisibleNote(visibleNote?: boolean) {
      this.visibleNote = visibleNote === undefined ? !this.visibleNote : visibleNote
    },
    triggerVisibleWorkflow() {
      this.visibleWorkflow = !this.visibleWorkflow
    },
    triggerVisibleDraft() {
      this.visibleDraft = !this.visibleDraft
    }
  }
})
