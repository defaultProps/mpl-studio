import { BaseSearchModule1Prop } from '../define'

export default (el: BaseSearchModule1Prop): string => {
	// mpl.cid 存储组件的所有有效变量。包括时间事件方法、变量。
	return `<mpl-form-item type="baseInput" :node="mpl.${el.cid}" cid="${el.cid}" />`
}
