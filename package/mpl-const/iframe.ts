import type { ProjectDir, Node, EventNode } from '@mpl/typings'

// mpl窗口传递消息给子窗口
export const mplIframePostMessage = {
  preview: {
    // 初始化iframe窗口
    initPlatformMenu(projectTree: ProjectDir[]) {
      const previewIframe = window.frames.PreviewIframe

      if (previewIframe) {
        previewIframe.postMessage(
          {
            type: 'INIT_PROJECT_DIR',
            payload: {
              projectTree: JSON.stringify(projectTree)
            }
          },
          '*'
        )
      }
    },
    // 目录菜单页面切换
    updateActivePage: (id: string): void => {
      const workbenchFrame = window.frames.PreviewIframe

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'UPDATE_ACTIVE_PAGE',
            payload: {
              id
            }
          },
          '*'
        )
      }
    },
    // 挂载更新页面内容
    updateNodeListWorkbench: (nodeList: Node[]): void => {
      const workbenchFrame = window.frames.PreviewIframe

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'RENDER_NODE_LIST',
            payload: {
              nodeList: JSON.stringify(nodeList)
            }
          },
          '*'
        )
      }
    }
  },
  workbench: {
    updateNodeListWorkbench(nodeList: Node[]) {
      const workbenchFrame = window.frames.workbench

      console.log('更新节点列表') // nodeList
      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'UPDATE_NODE_LIST',
            payload: {
              nodeList: JSON.stringify(nodeList)
            }
          },
          '*'
        )
      }
    },
    dragEndElement() {
      const workbenchFrame = window.frames.workbench
      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'DRAG_END_ELEMENT',
            payload: {}
          },
          '*'
        )
      }
    },
    resetNodeList() {
      const workbenchFrame = window.frames.workbench

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'RESET_NODE_LIST',
            payload: {}
          },
          '*'
        )
      }
    },
    updateActiveNode(node: Node | null) {
      const workbenchFrame = window.frames.workbench
      
      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'UPDATE_ACTIVE_NODE',
            payload: {
              node: node ? JSON.stringify(node) : ''
            }
          },
          '*'
        )
      }
    },
    initPlatformMenu(projectTree: ProjectDir[]) {
      const workbenchFrame = window.frames.workbench

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'INIT_PROJECT_DIR',
            payload: {
              projectTree: JSON.stringify(projectTree)
            }
          },
          '*'
        )
      }
    },
    updateActivePage: (id: string): void => {
      const workbenchFrame = window.frames.workbench

      console.log('更新页面', id)

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'UPDATE_ACTIVE_PAGE',
            payload: {
              id
            }
          },
          '*'
        )
      }
    },
    changeGuildLineStatus: (visible: boolean): void => {
      const workbenchFrame = window.frames.workbench

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'GUILD_LINE_STATUS_ACTION',
            payload: {
              visible
            }
          },
          '*'
        )
      }
    },
    changeVisibleBtnGroup: (visible: boolean): void => {
      const workbenchFrame = window.frames.workbench
      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'VISIBLE_BTN_GROUP_ACTION',
            payload: {
              visible
            }
          },
          '*'
        )
      }
    },
    changeCalloutLineStatus: (visible: boolean): void => {
      const workbenchFrame = window.frames.workbench

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'NODE_CALLOUT_LINE_STATUS',
            payload: {
              visible
            }
          },
          '*'
        )
      }
    },
    dragStartElement(tag: string) {
      const workbenchFrame = window.frames.workbench

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'DRAG_START_ELEMENT',
            payload: {
              tag
            }
          },
          '*'
        )
      }
    },
    // 滑板平台尺寸变换
    changeWorkbenchSize(size: string) {
      const workbenchFrame = window.frames.workbench
      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'CHANGE_WORKBENCH_SIZE',
            payload: { size }
          },
          '*'
        )
      }
    },
    changePlatform() {
      const workbenchFrame = window.frames.workbench

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'CHANGE_PLATFORM',
            payload: {}
          },
          '*'
        )
      }
    }
  },
  docsIframe: {
    // 更新文件内容
    updateDocs(assetsFilePath: string) {
      const mplDocIframe = window.frames.mplDocIframe

      if (mplDocIframe) {
        mplDocIframe.postMessage(
          {
            type: 'LOAD_IFRAME_DOCS',
            payload: {
              assetsFilePath: assetsFilePath ? `./markdown/${assetsFilePath}.md` : ''
            }
          },
          '*'
        )
      }
    }
  },
  iconIframe: {
    // 更新图标url
    updateIcon(value: string, url: string, withIcons: string[]) {
      const mplIconIframe = window.frames.mplIconIframe

      if (mplIconIframe) {
        mplIconIframe.postMessage(
          {
            type: 'UPDATE_IFRAME_ICON',
            payload: {
              url,
              value,
              withIcons: JSON.parse(JSON.stringify(withIcons))
            }
          },
          '*'
        )
      }
    }
  },
}

// 子窗口传递消息给mpl窗口
export const mplIframePropagationMessage = {
  preview: {},
  elementPlus: {}
}
