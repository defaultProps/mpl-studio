import { FILE_TYPE } from '@mpl/typings'

export declare namespace MPL_DATA {
  // 页面列表
  export interface Page {
    title: string
    id: string
    parentId: string
    projectId: string
    type: FILE_TYPE
    nodes: string // json string MPL.Node[]
    evt: string
    style: string
    codeStr: string
  }

  export interface File {
    title: string
    id: string
    type: FILE_TYPE
  }

  // 项目类型
  export type PLATFORM = 'MPL-MHS' | 'MPL-DFN' | 'MPL-LPT' | 'MPL_CLOUD'

  // 项目列表
  export interface Project {
    label: string
    id: string
    platform: PLATFORM
    platformName: string
    desc: string
    logo: string // 项目logo-image-src
  }
}

declare global {
  interface Window {
    workbench: Window
    PreviewIframe: Window
    mplDocIframe: Window
    mplContextmenu: string
    dfnIframe: Window
    mplIconIframe: Window
    mplFocusPreviewWindowList: Array<{ target: Window | null, id: string, params: string }>
  }
}

export default MPL_DATA

export = MPL_DATA
