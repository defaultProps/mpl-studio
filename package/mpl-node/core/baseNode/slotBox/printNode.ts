// 打印页面根据不同的组件生成不同的打印页面UI
import type { SlotBoxProp } from './define'

export default (node: SlotBoxProp) => {
	console.log(node.mpl_title)

	return ``
}
