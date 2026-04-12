import { BaseTableProp } from '../define'

export default (el: BaseTableProp): Partial<BaseTableProp> => {
  const v: Partial<BaseTableProp> = JSON.parse(JSON.stringify(el))

  delete v.mpl_group
  delete v.mpl_title
  delete v.pos
  delete v.mpl_zh
  delete v.mpl_version
  delete v.tag
  delete v.mpl_ce

  return v
}
