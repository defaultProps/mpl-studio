interface Window {
  draggingBlock: HTMLElement | null
  mplHighlightBlockSize: [string, string]
  elementPlus: Window
  draggingBlockParentNode: HTMLElement | null
  mplDocIframe: Window
  mplIconIframe: Window
  mplWorkbenchNodeContextmenuStatus: 'open' | 'close'
  PreviewIframe: Window
  widthRatio: number
  heightRatio: number
  mplAssetFilePath: string
  dfnIframe: Window
  workbench: Window
  mplContextmenu: string
    mplFocusPreviewWindowList: Array<{ target: Window | null, id: string, params: string }>
}

export default Window
