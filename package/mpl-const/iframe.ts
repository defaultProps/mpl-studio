import type { ProjectDir, Node } from '@mpl/typings'

// mpl窗口传递消息给子窗口
export const mplIframePostMessage = {
  preview: {
    // 初始化iframe窗口
    initPlatformMenu(projectTree: ProjectDir[]) {
      const previewIframe = window.frames.mplPreviewIframe

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
      const workbenchFrame = window.frames.mplPreviewIframe

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
    updateNodeList: (nodeList: Node[]): void => {
      const workbenchFrame = window.frames.mplPreviewIframe

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'RENDER_NODE_LIST',
            payload: {
              nodeStr: JSON.stringify(nodeList)
            }
          },
          '*'
        )
      }
    }
  },
  workbench: {
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
    // 更新NodeList
    updateWorkbenchNodeList: (nodeList: Node[]): void => {
      const workbenchFrame = window.frames.workbench

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'RENDER_NODE_LIST',
            payload: {
              nodeStr: JSON.stringify(nodeList)
            }
          },
          '*'
        )
      }
    },
    updateActivePage: (id: string): void => {
      const workbenchFrame = window.frames.workbench

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
    changeVisibleNote: (visible: boolean): void => {
      const workbenchFrame = window.frames.workbench

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'VISIBLE_NOTE_ACTION',
            payload: {
              visible
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
    changePage: (pageId: string): void => {
      const workbenchFrame = window.frames.workbench

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'PAGE_CHANGE',
            payload: {
              pageId
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
              assetsFilePath: assetsFilePath
                ? `./markdown/${assetsFilePath}.md`
                : ''
            }
          },
          '*'
        )
      }
    }
  },
  iconIframe: {
    // 更新图标url
    updateIcon(value: string, url: string) {
      const mplIconIframe = window.frames.mplIconIframe

      if (mplIconIframe) {
        mplIconIframe.postMessage(
          {
            type: 'UPDATE_IFRAME_ICON',
            payload: {
              url,
              value
            }
          },
          '*'
        )
      }
    }
  }
}

// 子窗口传递消息给mpl窗口
export const mplIframePropagationMessage = {
  preview: {},
  elementPlus: {}
}
