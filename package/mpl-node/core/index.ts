import type MPL from '@mpl/typings'
import { newCid } from "@mpl/const";

// root node
import bodyNode from './baseNode/body'

// base node
import singleInputNode from './baseNode/baseInput' // 基础输入框
import passwordInputNode from './baseNode/passwordInput' // 密码输入框
import baseButton from './baseNode/baseButton' // 基础按钮
import buttonGroup from './baseNode/buttonGroup' // 按钮组
import upload from './baseNode/upload' // 上传
import checkbox from './baseNode/checkbox' // 多选框
import radioBox from './baseNode/radio' // 单选框
import select from './baseNode/select' // 下拉框
import rate from './baseNode/rate' // 评分
import slider from './baseNode/slider' // 滑块
import mplSwitch from './baseNode/switch' // 开关
import timePicker from './baseNode/timePicker' // 时间选择 hh:ss
import timeRangePicker from './baseNode/timeRangePicker' // 时间范围 hh:ss
import datePicker from './baseNode/datePicker' // 日期选择 yyyy   yyyy-mm  yyyy-mm-dd weak
import dateRangePicker from './baseNode/dateRangePicker' // 日期范围
import numberInput from './baseNode/numberInput' // 数字输入
import colorPicker from './baseNode/colorPicker' // 颜色输入
import baseBox from './baseNode/baseBox' // 基础容器
import dialogNode from './baseNode/dialog' // 弹窗
import drawerNode from './baseNode/drawer' // 抽屉
import collapse from './baseNode/collapse'  // 折叠面板
import panel from './baseNode/panel' // 面板
import baseTable from './baseNode/table' // 表格
import paragraph from './baseNode/paragraph' // 文章段落
import baseCard from './baseNode/baseCard' // 卡片
import tabs from './baseNode/tabs' // 页签

// common style.
import '../components/common.less'

export * from './baseNode/baseBox'
export * from './baseNode/baseButton'
export * from './baseNode/upload'
export * from './baseNode/buttonGroup'
export * from './baseNode/body'
export * from './baseNode/checkbox'
export * from './baseNode/collapse'
export * from './baseNode/colorPicker'
export * from './baseNode/datePicker'
export * from './baseNode/dateRangePicker'
export * from './baseNode/dialog'
export * from './baseNode/drawer'
export * from './baseNode/numberInput'
export * from './baseNode/passwordInput'
export * from './baseNode/radio'
export * from './baseNode/rate'
export * from './baseNode/select'
export * from './baseNode/baseInput'
export * from './baseNode/slider'
export * from './baseNode/switch'
export * from './baseNode/timePicker'
export * from './baseNode/timeRangePicker'
export * from './baseNode/panel'
export * from './baseNode/table'
export * from './baseNode/paragraph'
export * from './baseNode/baseCard'
export * from './baseNode/tabs'

export const mplBodyRoot = bodyNode

export const mapNodeSetting: Record<string, MPL.SettingMap> = {
  [baseButton.tag]: baseButton,
  [buttonGroup.tag]: buttonGroup,
  [upload.tag]: upload,
  [tabs.tag]: tabs,
  [baseCard.tag]: baseCard,
  [collapse.tag]: collapse,
  [singleInputNode.tag]: singleInputNode,
  [passwordInputNode.tag]: passwordInputNode,
  [drawerNode.tag]: drawerNode,
  [dialogNode.tag]: dialogNode,
  [numberInput.tag]: numberInput,
  [baseBox.tag]: baseBox,
  [select.tag]: select,
  [radioBox.tag]: radioBox,
  [checkbox.tag]: checkbox,
  [rate.tag]: rate,
  [slider.tag]: slider,
  [mplSwitch.tag]: mplSwitch,
  [timePicker.tag]: timePicker,
  [timeRangePicker.tag]: timeRangePicker,
  [datePicker.tag]: datePicker,
  [dateRangePicker.tag]: dateRangePicker,
  [colorPicker.tag]: colorPicker,
  [bodyNode.tag]: bodyNode,
  [panel.tag]: panel,
  [baseTable.tag]: baseTable,
  [paragraph.tag]: paragraph,
}

export function initNode(tag: string): MPL.Node | null {
  if (mapNodeSetting[tag]) {
    const t = mapNodeSetting[tag]

    return t ? t.newNode(newCid()) : null
  }
  return null
}
