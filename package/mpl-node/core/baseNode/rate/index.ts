import { defineAsyncComponent } from 'vue'
import { newRateNode, rateNode, type RateFormProp } from './define'
import renderCode from './renderCode'
import type { SettingMap } from '@mpl/typings'

export * from './define'
export default <SettingMap>{
  tag: 'mpl-rate',
  renderCode,
  newNode: newRateNode,
  node: rateNode,

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
    elementPlus: async (node: RateFormProp) => (await import('./generator/ElementPlus')).default(node),
    vant4: async (node: RateFormProp) => (await import('./generator/Vant4')).default(node),
    antDesign: async (node: RateFormProp) => (await import('./generator/AntDesign')).default(node),
    antDesignMobile: async (node: RateFormProp) => (await import('./generator/AntDesignMobile')).default(node),
    vars: async (node: RateFormProp) => (await import('./generator/ref')).default(node)
  }
}
