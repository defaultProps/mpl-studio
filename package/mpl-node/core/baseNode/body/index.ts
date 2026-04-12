import { defineAsyncComponent } from 'vue'
import { bodyNode, newNode } from './define'
import renderCode from './renderCode'
import type { SettingMap, Node } from '@mpl/typings'

export * from './define'
export const mplBodyRoot = <SettingMap>{
  tag: 'mpl-body',
  node: bodyNode,
  renderCode,
  newNode,

  componentModel: defineAsyncComponent(() => import('./SettingBox.vue')),
  moduleModel: defineAsyncComponent(() => import('./ModuleBox.vue')),
  patchModel: defineAsyncComponent(() => import('./PatchBox.vue')),
  styleModel: defineAsyncComponent(() => import('./StyleBox.vue')),

  workbench: {
    elementPlus: defineAsyncComponent(() => import('./workbench/ElementPlus.vue')),
    vant4: defineAsyncComponent(() => import('./workbench/Vant4.vue')),
    antDesign: () => import('./workbench/AntDesign'),
    antDesignMobile: () => import('./workbench/AntDesignMobile')
  },
  generator: {
    elementPlus: async (_: Node) => (await import('./generator/ElementPlus')).default(_),
    vant4: async (_: Node) => (await import('./generator/Vant4')).default(_),
    antDesign: async (_: Node) => (await import('./generator/AntDesign')).default(_),
    antDesignMobile: async (_: Node) => (await import('./generator/AntDesignMobile')).default(_),
    vars: async (node: Node) => (await import('./generator/ref')).default(node)
  }
}

export default mplBodyRoot
