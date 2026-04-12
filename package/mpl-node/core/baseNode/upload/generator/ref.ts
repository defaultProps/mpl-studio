import { UploadInputFormProp } from '../define'

export default (el: UploadInputFormProp): Partial<UploadInputFormProp> => {
  const v: Partial<UploadInputFormProp> = JSON.parse(JSON.stringify(el))

  delete v.mpl_group
  delete v.mpl_title
  delete v.pos
  delete v.mpl_zh
  delete v.mpl_version
  delete v.tag
  delete v.mpl_ce

  return v
}
