export declare namespace MPL_DATA {
  // 页面列表
  export interface Page {
    title: string
    id: string
    parentId: string
    projectId: string
    type: 'page' | 'docs' | 'javascript' | 'typescript' | 'vue' | 'image' | 'css' | 'markdown' | 'excel' | 'word'
    nodes: string // json string MPL.Node[]
    evt: string
    style: string
    codeStr: string
  }

  export interface File {
    title: string
    id: string
    type: FileType
  }

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
    | 'img'
    | 'txt'
    | 'javascript'
    | 'moduleMarket'
    | 'themeMarket'
    | 'imageMarket'
    | 'iconMarket'
    | 'javascriptMarket'

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

export default MPL_DATA

export = MPL_DATA
