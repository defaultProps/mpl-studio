import { defineAsyncComponent } from 'vue'
import { newRadioNode, radioNode, type RadioBoxFormProp } from './define'
import renderCode from './renderCode'
import type { SettingMap } from '@mpl/typings'

export * from './define'
export default <SettingMap>{
  tag: 'mpl-radio',
  renderCode,
  node: radioNode,
  newNode: newRadioNode,

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
    elementPlus: async (node: RadioBoxFormProp) => (await import('./generator/ElementPlus')).default(node),
    vant4: async (node: RadioBoxFormProp) => (await import('./generator/Vant4')).default(node),
    antDesign: async (node: RadioBoxFormProp) => (await import('./generator/AntDesign')).default(node),
    antDesignMobile: async (node: RadioBoxFormProp) => (await import('./generator/AntDesignMobile')).default(node),
    vars: async (node: RadioBoxFormProp) => (await import('./generator/ref')).default(node)
  }
}
