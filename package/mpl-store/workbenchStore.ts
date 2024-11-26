import { defineStore } from 'pinia'
import { markRaw, nextTick } from "vue"
import { mapNodeSetting, mplBodyRoot } from "@mpl/node";
import { pageEventList, workbenchFooterEventMode, mplIframePostMessage } from "@mpl/const";
import type {
  BreadCrumbNode,
  PlatType,
  EventNode,
  Node,
  NodeNote,
  ActiveNodeEvent,
  ActiveComponentSettingModel
} from "@mpl/typings";
import { newCid } from "@mpl/const";

export interface WorkbenchStore {
  visibleGuildLine: boolean
  visibleNodeCalloutLine: boolean
  visibleNote: boolean
  visibleComment: boolean
  visibleEventFlow: boolean
  visibleWorkflow: boolean
  visibleDraft: boolean
  activePlatform: PlatType[]
  themeType: string
  breadcrumbList: BreadCrumbNode[]
  footerEventMode: workbenchFooterEventMode
  nodeList: Node[]; // 一维数组
  noteList: NodeNote[];
  eventList: EventNode[];
  activeNode: null | Node;
  activeNodeId: string;
  activeEvent: null | ActiveNodeEvent;
  activeBreadcrumb: string;
  shallComponentSettingRef: any;
  activeNodeEventList: ActiveNodeEvent[];
  activeComponentSettingModel: ActiveComponentSettingModel;
  pageEventList: ActiveNodeEvent[];
}

export const workbenchStore = defineStore('Workbench', {
  state: (): WorkbenchStore => {
    return {
      footerEventMode: 'flow', // 事件可视化类型
      visibleComment: false, // 是否显示评论
      visibleEventFlow: false, // 是否显示事件流
      visibleWorkflow: false, // 是否显示工作流
      visibleDraft: false, // 是否显示草稿
      visibleNote: false, // 是否显示注解
      visibleGuildLine: true, // 辅助线
      visibleNodeCalloutLine: true, // 控件之间的间距线
      activePlatform: [], // 挂载平台
      breadcrumbList: [
        // 组件层级列表
        { label: '基础容器', value: 'tabs', cid: 'fn4pp3' },
        { label: '基础输入框', value: 'baseContainer', cid: 'fg0wh5' }
      ],
      themeType: 'MPL-Light',
      eventList: [], // 事件列表
      pageEventList, // 页面事件
      noteList: [], // 注解列表
      nodeList: [], // 节点列表
      activeNode: null, // 当前选中的节点
      activeNodeId: "", // 当前选中节点的cid
      activeEvent: null, // 当前选择的事件节点
      activeBreadcrumb: "", // 当前选中的节点目录结构
      shallComponentSettingRef: markRaw(mplBodyRoot.componentModel),
      activeNodeEventList: [], // 当前选中节点的事件列表 - 所有事件
      activeComponentSettingModel: "componentModel", // 画布控件右侧配置UI模块
    }
  },
  actions: {
    initStore() {
      const rootBodyNode = mplBodyRoot.newNode(newCid());

      this.nodeList.push(rootBodyNode);
      this.activeNode = rootBodyNode
      this.activeNodeId = rootBodyNode.cid
      const bodyOnloadEvent: EventNode = {
        name: 'onload',
        code: '',
        desc: '页面渲染完成onload',
        type: 'flow',
        doc: ''
      }
      this.eventList = [bodyOnloadEvent]
      this.activeNodeEventList = [{ ...bodyOnloadEvent, checked: false }]
      mplBodyRoot.node.events[0]

      // 初始化选中body.onload事件
    },
    addEvent(event: EventNode) {
      this.eventList.push(event);
    },
    updateActiveEvent(eventName: string, type: "flow" | "code") {
      const obj = this.activeNodeEventList.find((n) => n.name === eventName);

      console.log(eventName, type)
      if (obj) {
        this.activeEvent = obj;
        this.activeEvent.type = type || "flow";
      }
    },
    selectNodeById(cid: string) {
      // 选中节点重复点击无效
      if(this.activeNode?.cid === cid) {
        return
      }
      const node = this.nodeList.find((p) => p.cid === cid) as Node;
      this.updateActiveNodeAction(node);
    },
    addNode(node: Node, parentCid: string) {
      if (["mpl-drawer", "mpl-dialog"].includes(node.tag))
        this.nodeList.unshift(node);
      else this.nodeList.push(node);

      this.nodeList.forEach((n) => {
        if (n.cid === parentCid) n.childIds.push(node.cid);
      });
      this.updateActiveNodeAction(node);
    },
    updateShallComponentSettingRef(activeModel: ActiveComponentSettingModel) {
      this.activeComponentSettingModel = activeModel;
      const _temp = mapNodeSetting[this.activeNode?.tag || ""];

      nextTick(() => {
        if (_temp) {
          this.shallComponentSettingRef = activeModel
            ? markRaw(_temp[activeModel])
            : null;
        } else {
          this.shallComponentSettingRef = markRaw(mplBodyRoot.componentModel);
        }
      });
    },
    // 删除组件
    deleteNode(cid: string) {
      console.log(cid, this.nodeList, this.activeNode)
      console.log("删除组件")
      // this.activeNode = null;
      // this.activeNodeId = "";
      // this.activeEvent = null;
      // this.shallComponentSettingRef = null;
      // const index = this.nodeList.findIndex((node) => node.cid === cid);
      // index >= 0 && this.nodeList.splice(index, 1);

      // this.nodeList.forEach((node) => {
      //   const index = node.childIds.findIndex((id) => id === node.cid);

      //   if (index >= 0) node.childIds.splice(index, 1);
      // });

      // mplIframePostMessage.workbench.updateWorkbenchNodeList(this.nodeList)
      // mplIframePostMessage.workbench.updateActiveNode(this.activeNode)


    },
    // 更新频率非常高 - 主要由右侧配置项内部交互的调用频率高导致
    updateActiveNodeAction(node: Node | null) {
      this.activeNode = node
      this.activeNodeId = node?.cid || '';
      mplIframePostMessage.workbench.updateActiveNode(node)

      if (node) {
        const i = this.nodeList.findIndex((p) => node.cid === p.cid);
        const isCurrentNode =
          JSON.stringify(node) !== JSON.stringify(this.nodeList[i]);

        if (i >= 0 && isCurrentNode) this.nodeList[i] = node;

        const _temp = mapNodeSetting[node.tag];
        if (_temp) {
          this.activeNodeEventList = _temp.node.events.map((e) => ({
            ...e,
            type: e.type || "flow",
            checked: node.events.includes(e.name),
          }));
          this.activeEvent = null;
        }
      } else {
        this.activeNodeEventList = []
        this.activeEvent = null
      }

      this.updateShallComponentSettingRef("componentModel");
    },
    // 重置节点数据
    resetStore() {
      this.noteList = [];
      this.nodeList = [];
      this.eventList = [];
      this.activeEvent = null;
      this.activeNode = null;
      console.log("重置节点数据")
      this.activeNodeEventList = [];
      this.activeBreadcrumb = "";
      this.activeComponentSettingModel = "componentModel";
    },
    // 单个事件新增
    singleEventPlus(event: EventNode) {
      this.eventList.push(event);
      const eventIndex = this.eventList.findIndex((v) => v.name === event.name);

      if (eventIndex >= 0) {
        this.eventList.splice(eventIndex, 1, event);
        console.info(`信息：事件列表替换事件${event.name}`); // eslint-disable-line no-console
      }
    },
    // 单个事件移除
    singleEventReduce(eventName: string) {
      const eventIndex = this.eventList.findIndex((v) => v.name === eventName);

      if (eventIndex === -1) {
        console.warn("删除事件失败，无法找到该事件，自动跳过该步骤", eventName);

        return;
      }

      this.eventList.splice(eventIndex, 1);
    },
    resetWorkbench() {
      this.resetStore()
      this.eventList = []
      mplIframePostMessage.workbench.updateWorkbenchNodeList([])
    },
    initWorkbench() {
      const messageObj: Partial<WorkbenchStore> = {
        visibleGuildLine: this.visibleGuildLine,
        themeType: this.themeType,
        visibleNote: this.visibleNote,
        visibleNodeCalloutLine: this.visibleNodeCalloutLine
      }

      window.localStorage.setItem(
        'mplInitialWorkbenchView',
        JSON.stringify(messageObj)
      )
    },
    changeMountedPlatform(val: PlatType[]) {
      this.activePlatform = val
    },
    triggerVisibleGuild() {
      this.visibleGuildLine = !this.visibleGuildLine
      mplIframePostMessage.workbench.changeGuildLineStatus(
        this.visibleGuildLine
      )
    },
    triggerVisibleNodeCalloutLine() {
      this.visibleNodeCalloutLine = !this.visibleNodeCalloutLine
      mplIframePostMessage.workbench.changeCalloutLineStatus(
        this.visibleNodeCalloutLine
      )
    },
    triggerVisibleNote() {
      this.visibleNote = !this.visibleNote
      mplIframePostMessage.workbench.changeVisibleNote(this.visibleNote)
    },
    triggerVisibleComment() {
      this.visibleComment = !this.visibleComment
    },
    triggerVisibleEventFlow() {
      this.visibleEventFlow = !this.visibleEventFlow
    },
    triggerVisibleWorkflow() {
      this.visibleWorkflow = !this.visibleWorkflow
    },
    triggerVisibleDraft() {
      this.visibleDraft = !this.visibleDraft
    }
  }
})