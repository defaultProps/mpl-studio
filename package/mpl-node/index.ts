import { defineAsyncComponent } from 'vue'
import { initNode, mapNodeSetting } from './core'
import { formatNodeListToTree } from './libs/node'
import symbol from './libs/symbolProvide'

export * from './core/index'
export * from './libs/index'

export const WorkbenchRootNode = defineAsyncComponent(() => import('./components/RenderNodeList.vue'))


export default {
  initNode,
  mapNodeSetting,
  api: {
    formatNodeListToTree,
  },
  symbol,
}