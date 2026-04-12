import { defineAsyncComponent } from 'vue'
import { baseButton, newBaseButtonNode, type ButtonProp } from './define'
import renderCode from './renderCode'
import type { SettingMap } from '@mpl/typings'

export * from './define'
export default <SettingMap>{
  tag: 'mpl-btn',
  node: baseButton,
  newNode: newBaseButtonNode,
  renderCode,
  componentModel: defineAsyncComponent(() => import('./SettingBox.vue')),
  moduleModel: defineAsyncComponent(() => import('./ModuleBox.vue')),
  styleModel: defineAsyncComponent(() => import('./StyleBox.vue')),
  patchModel: defineAsyncComponent(() => import('./PatchBox.vue')),

  workbench: {
    elementPlus: defineAsyncComponent(() => import('./workbench/ElementPlus.vue')),
    vant4: defineAsyncComponent(() => import('./workbench/Vant4.vue')),
    antDesign: () => import('./workbench/AntDesign'),
    antDesignMobile: () => import('./workbench/AntDesignMobile')
  },
  generator: {
    elementPlus: async (_: ButtonProp) => (await import('./generator/ElementPlus')).default(_),
    vant4: async (_: ButtonProp) => (await import('./generator/Vant4')).default(_),
    antDesign: async (_: ButtonProp) => (await import('./generator/AntDesign')).default(_),
    antDesignMobile: async (_: ButtonProp) => (await import('./generator/AntDesignMobile')).default(_),
    vars: async (node: ButtonProp) => (await import('./generator/ref')).default(node),
  }
}
