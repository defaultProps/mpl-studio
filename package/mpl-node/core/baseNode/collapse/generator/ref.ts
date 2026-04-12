import { CollapseProp } from '../define'

export default (el: CollapseProp): Partial<CollapseProp> => {
  const v: Partial<CollapseProp> = JSON.parse(JSON.stringify(el))

  delete v.mpl_group
  delete v.mpl_title
  delete v.pos
  delete v.mpl_zh
  delete v.mpl_version
  delete v.tag
  delete v.mpl_ce
  delete v.pos

  return v
}
