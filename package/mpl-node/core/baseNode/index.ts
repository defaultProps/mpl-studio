import { SettingMap } from '@mpl/typings'

// base node
import bodyNode from './body'
import singleInputNode from './baseInput'
import passwordInputNode from './passwordInput'
import baseButton from './baseButton'
import buttonGroup from './buttonGroup'
import checkbox from './checkbox'
import radioBox from './radio'
import select from './select'
import rate from './rate'
import slider from './slider'
import mplSwitch from './switch'
import timePicker from './timePicker'
import timeRangePicker from './timeRangePicker'
import datePicker from './datePicker'
import dateRangePicker from './dateRangePicker'
import numberInput from './numberInput'
import colorPicker from './colorPicker'
import baseBox from './baseBox'
import dialogNode from './dialog'
import drawerNode from './drawer'
import collapse from './collapse'
import panel from './panel'
import baseTable from './table'
import paragraph from './paragraph'
import baseCard from './baseCard'
import tabs from './tabs'
import tree from './tree'
import transfer from './transfer'
import avatarForm from './avatarForm'
import loopBox from './loopBox'
import selectDialog from './selectDialog'
import link from './link'
import upload from './upload'
import slotBox from './slotBox'

// common style.
import '../../components/common.less'

export * from './baseBox'
export * from './baseButton'
export * from './buttonGroup'
export * from './body'
export * from './checkbox'
export * from './collapse'
export * from './colorPicker'
export * from './datePicker'
export * from './dateRangePicker'
export * from './dialog'
export * from './drawer'
export * from './numberInput'
export * from './passwordInput'
export * from './radio'
export * from './rate'
export * from './select'
export * from './baseInput'
export * from './slider'
export * from './switch'
export * from './timePicker'
export * from './timeRangePicker'
export * from './panel'
export * from './table'
export * from './paragraph'
export * from './baseCard'
export * from './tabs'
export * from './tree'
export * from './transfer'
export * from './avatarForm'
export * from './link'
export * from './selectDialog'
export * from './loopBox'
export * from './link'
export * from './upload'
export * from './slotBox'

export const baseNodeMapSetting: Record<string, SettingMap> = {
  [bodyNode.tag]: bodyNode,
  [baseButton.tag]: baseButton,
  [buttonGroup.tag]: buttonGroup,
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
  [panel.tag]: panel,
  [baseTable.tag]: baseTable,
  [paragraph.tag]: paragraph,
  [tree.tag]: tree,
  [transfer.tag]: transfer,
  [avatarForm.tag]: avatarForm,
  [loopBox.tag]: loopBox,
  [selectDialog.tag]: selectDialog,
  [link.tag]: link,
  [upload.tag]: upload,
  [slotBox.tag]: slotBox
}
