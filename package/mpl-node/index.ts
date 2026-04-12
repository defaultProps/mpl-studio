import { defineAsyncComponent } from 'vue'
import { initNode } from './core'
import symbol from './libs/symbolProvide'
import './assets/index.less'

export * from './core/index'
export * from './libs/index'
export * from './core/register'

export const WorkbenchRootNode = defineAsyncComponent(() => import('./components/RenderNodeList.vue'))
export const SchemaIDE = defineAsyncComponent(() => import('./components/SchemaIDE.vue'))

export default {
  initNode,
  symbol
}
