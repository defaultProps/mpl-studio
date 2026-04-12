import WorkbenchEntry from './WorkbenchEntry.vue'
import PreviewEntry from './PreviewEntry.vue'

export const WorkbenchIframe = WorkbenchEntry
export const PreviewIframe = PreviewEntry

export default {
  install(vue: any) {
    vue.component('MplWorkbenchIframe', WorkbenchEntry)
    vue.component('MplPreviewIframe', PreviewIframe)
  }
}
