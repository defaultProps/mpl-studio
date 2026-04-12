import { BaseBoxProp } from '../define'

export default (el: BaseBoxProp): Partial<BaseBoxProp> => {
  const v: Partial<BaseBoxProp> = JSON.parse(JSON.stringify(el))

  delete v.mpl_group
  delete v.mpl_title
  delete v.mpl_zh
  delete v.mpl_version
  delete v.tag
  delete v.mpl_ce
  delete v.pos

  return v
}
