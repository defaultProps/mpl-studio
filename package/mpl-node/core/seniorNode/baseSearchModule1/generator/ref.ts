import { BaseSearchModule1Prop } from '../define'

export default (el: BaseSearchModule1Prop): Partial<BaseSearchModule1Prop> => {
  const v: Partial<BaseSearchModule1Prop> = JSON.parse(JSON.stringify(el))

  delete v.mpl_title
  delete v.mpl_group
  delete v.mpl_zh
  delete v.mpl_version
  delete v.tag
  delete v.mpl_ce
  delete v.pos

  return v
}
