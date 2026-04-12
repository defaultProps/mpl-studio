import { TimePickerFormProp } from '../define'

export default (el: TimePickerFormProp): Partial<TimePickerFormProp> => {
  const v: Partial<TimePickerFormProp> = JSON.parse(JSON.stringify(el))

  delete v.mpl_group
  delete v.mpl_title
  delete v.pos
  delete v.mpl_zh
  delete v.mpl_version
  delete v.tag
  delete v.mpl_ce

  return v
}
