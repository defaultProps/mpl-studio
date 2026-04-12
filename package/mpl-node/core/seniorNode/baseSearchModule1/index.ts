import { defineAsyncComponent } from 'vue'
import { newBaseSearchModule1, baseSearchModule1Node } from './define'
import renderCode from './renderCode'
import type { BaseSearchModule1Prop } from './define'
import type { SettingMap } from '@mpl/typings'

export * from './define'

export default <SettingMap>{
  tag: 'mpl-baseSearchModule1',
  node: baseSearchModule1Node,
  renderCode,
  newNode: newBaseSearchModule1,

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
    elementPlus: async (node: BaseSearchModule1Prop) => (await import('./generator/ElementPlus')).default(node),
    vant4: async (node: BaseSearchModule1Prop) => (await import('./generator/Vant4')).default(node),
    antDesign: async (node: BaseSearchModule1Prop) => (await import('./generator/AntDesign')).default(node),
    antDesignMobile: async (node: BaseSearchModule1Prop) => (await import('./generator/AntDesignMobile')).default(node),
    vars: async (node: BaseSearchModule1Prop) => (await import('./generator/ref')).default(node)
  }
}
