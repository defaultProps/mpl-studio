import { defineAsyncComponent } from 'vue'
import { baseTable, newBaseTableNode } from './define'
import renderCode from './renderCode'
import type { SettingMap } from '@mpl/typings'

export * from './define'
export default <SettingMap> {
  tag: 'mpl-base-table',
  node: baseTable,
  renderCode,
  newNode: newBaseTableNode,

  componentModel: defineAsyncComponent(() => import('./SettingBox.vue')),
  moduleModel: defineAsyncComponent(() => import('./ModuleBox.vue')),
  styleModel: defineAsyncComponent(() => import('./StyleBox.vue')),
  patchModel: defineAsyncComponent(() => import('./PatchBox.vue')),
  
  workbench: {
    elementPlus: defineAsyncComponent(() => import('./workbench/ElementPlus.vue')),
    vant4: defineAsyncComponent(() => import('./workbench/Vant4.vue')),
    antDesign: () => import('./workbench/AntDesign'),
    antDesignMobile: () => import('./workbench/AntDesignMobile'),
  },
  generator: {
    elementPlus: () => import('./generator/ElementPlus'),
    vant4: () => import('./generator/Vant4'),
    antDesign: () => import('./generator/AntDesign'),
    antDesignMobile: () => import('./generator/AntDesignMobile'),
  }
}