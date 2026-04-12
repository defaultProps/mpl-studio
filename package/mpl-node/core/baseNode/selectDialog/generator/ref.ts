import { SelectDialogFormProp } from '../define'

export default (el: SelectDialogFormProp): Partial<SelectDialogFormProp> => {
  const v: Partial<SelectDialogFormProp> = JSON.parse(JSON.stringify(el))

  delete v.mpl_group
  delete v.mpl_title
  delete v.pos
  delete v.mpl_zh
  delete v.mpl_version
  delete v.tag
  delete v.mpl_ce

  return v
}
