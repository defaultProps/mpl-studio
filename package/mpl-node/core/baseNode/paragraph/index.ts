import { defineAsyncComponent } from 'vue'
import { newParagraph, paragraph, type Paragraph } from './define'
import renderCode from './renderCode'
import type { SettingMap } from '@mpl/typings'

export * from './define'
export default <SettingMap>{
  tag: 'mpl-paragraph',
  node: paragraph,
  renderCode,
  newNode: newParagraph,

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
    elementPlus: async (node: Paragraph) => (await import('./generator/ElementPlus')).default(node),
    vant4: async (node: Paragraph) => (await import('./generator/Vant4')).default(node),
    antDesign: async (node: Paragraph) => (await import('./generator/AntDesign')).default(node),
    antDesignMobile: async (node: Paragraph) => (await import('./generator/AntDesignMobile')).default(node),
    vars: async (node: Paragraph) => (await import('./generator/ref')).default(node)
  }
}
