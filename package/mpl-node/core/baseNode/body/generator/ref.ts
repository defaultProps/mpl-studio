import type { Node } from '@mpl/typings'

export default (_: Node): any => {
  return {
    page: {
      disabledPage: false, // 页面整体禁用
      showNote: false, // 是否显示注解
    }
  }
}
