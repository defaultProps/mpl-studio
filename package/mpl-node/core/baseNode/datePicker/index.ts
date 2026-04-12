import { defineAsyncComponent } from 'vue'
import { datePicker, newDatePickerNode, type DatePickerFormProp } from './define'
import renderCode from './renderCode'
import type { SettingMap } from '@mpl/typings'

export * from './define'
export default <SettingMap>{
  tag: 'mpl-date-picker',
  renderCode,
  node: datePicker,
  newNode: newDatePickerNode,

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
    elementPlus: async (node: DatePickerFormProp) => (await import('./generator/ElementPlus')).default(node),
    vant4: async (node: DatePickerFormProp) => (await import('./generator/Vant4')).default(node),
    antDesign: async (node: DatePickerFormProp) => (await import('./generator/AntDesign')).default(node),
    antDesignMobile: async (node: DatePickerFormProp) => (await import('./generator/AntDesignMobile')).default(node),
    vars: async (node: DatePickerFormProp) => (await import('./generator/ref')).default(node)
  }
}
