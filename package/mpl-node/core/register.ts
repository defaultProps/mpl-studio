import baseInput from './baseNode/baseInput/register/ElementPlus.vue'
import btnGroup from './baseNode/baseButton/register/ElementPlus.vue'
import passwordInput from './baseNode/passwordInput/register/ElementPlus.vue'
import checkGroup from './baseNode/checkbox/register/ElementPlus.vue'
import collapse from './baseNode/collapse/register/ElementPlus.vue'
import colorPicker from './baseNode/colorPicker/register/ElementPlus.vue'
import datePicker from './baseNode/datePicker/register/ElementPlus.vue'
import dateRangePicker from './baseNode/dateRangePicker/register/ElementPlus.vue'
import numberInput from './baseNode/numberInput/register/ElementPlus.vue'
import select from './baseNode/select/register/ElementPlus.vue'
import selectDialog from './baseNode/selectDialog/register/ElementPlus.vue'
import radio from './baseNode/radio/register/ElementPlus.vue'
import rate from './baseNode/rate/register/ElementPlus.vue'
import switchNode from './baseNode/switch/register/ElementPlus.vue'
import timePicker from './baseNode/timePicker/register/ElementPlus.vue'
import timeRangePicker from './baseNode/timeRangePicker/register/ElementPlus.vue'
import table from './baseNode/table/register/ElementPlus.vue'

import type { App } from 'vue'

export const mplRegister = {
  install(vue: App) {
    vue.component('MplBaseInput', baseInput)
    vue.component('MplBtn', btnGroup)
    vue.component('MplPassword', passwordInput)
    vue.component('MplCheckGroup', checkGroup)
    vue.component('MplCollapse', collapse)
    vue.component('MplColorPicker', colorPicker)
    vue.component('MplDatePicker', datePicker)
    vue.component('MplDateRangePicker', dateRangePicker)
    vue.component('MplNumberInput', numberInput)
    vue.component('MplSelect', select)
    vue.component('MplSelectDialog', selectDialog)
    vue.component('MplRadio', radio)
    vue.component('MplRate', rate)
    vue.component('MplSwitch', switchNode)
    vue.component('MplTimePicker', timePicker)
    vue.component('MplTimeRangePicker', timeRangePicker)
    vue.component('MplTable', table)
  }
}