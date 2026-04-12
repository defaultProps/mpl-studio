import { BaseAvatar } from '../define'

export default (el: BaseAvatar): Partial<BaseAvatar> => {
  // 生成变量时保留有意义的变量
  const v: any = JSON.parse(JSON.stringify(el))

  delete v.mpl_title
  delete v.mpl_group
  delete v.mpl_zh
  delete v.mpl_version
  delete v.tag
  delete v.mpl_ce
  delete v.pos
  delete v.rule
  delete v.mpl_children
  delete v.defaultEvents
  delete v.events

  return v
}
