import { defineAsyncComponent } from 'vue'
import { newTreeNode, treeNode } from './define'
import renderCode from './renderCode'

export * from './define'
export default {
  tag: 'mpl-tree',
  node: treeNode,
  renderCode,
  newNode: newTreeNode,
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
