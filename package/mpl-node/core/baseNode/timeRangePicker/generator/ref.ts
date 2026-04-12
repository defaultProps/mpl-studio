import { TimeRangePickerFormProp } from '../define'

export default (el: TimeRangePickerFormProp): Partial<TimeRangePickerFormProp> => {
  const v: Partial<TimeRangePickerFormProp> = JSON.parse(JSON.stringify(el))

  delete v.mpl_group
  delete v.mpl_title
  delete v.pos
  delete v.mpl_zh
  delete v.mpl_version
  delete v.tag
  delete v.mpl_ce

  return v
}
