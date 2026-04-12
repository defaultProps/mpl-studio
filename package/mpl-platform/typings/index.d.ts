declare interface Window {
  draggingBlock: HTMLElement | null
  mplHighlightBlockSize: [string, string]
  elementPlus: Window
  draggingBlockParentNode: HTMLElement | null
  mplDocIframe: Window
  mplIconIframe: Window
  mplWorkbenchNodeContextmenuStatus: 'open' | 'close'
  mplContextmenu: string
  PreviewIframe: Window
  widthRatio: number
  heightRatio: number
  mplAssetFilePath: string
  workbench: Window
  mplFocusPreviewWindowList: Window[]
  app: any
  dfnIframe: Window
}


declare module 'ag-grid-community/dist/esm/agGridModules.js' {
  import { Module } from 'ag-grid-community';

  export const AllCommunityModule: Module;
}