import { ButtonProp } from '../define'

export default (el: ButtonProp): Partial<ButtonProp> => {
  // 生成变量时保留有意义的变量
  const v: Partial<ButtonProp> = JSON.parse(JSON.stringify(el))

  delete v.mpl_title
  delete v.mpl_group
  delete v.mpl_zh
  delete v.mpl_version
  delete v.tag
  delete v.mpl_ce
  delete v.pos

  return v
}
