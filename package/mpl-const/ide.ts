import type { IDE_FOOTER_MODEL } from '@mpl/typings'

export const pageIDEOptions: Array<{ label: string, value: IDE_FOOTER_MODEL, type: 'community' | 'enterprise' }> = [
	/**
	 * 所有组件变量存储在mpl.var中通过
	 * import mplVar from '@mpl/variable'
	 * const mpl = { var: ref(mplVar) }
	 * 页面变量存储页面级别的变量
	 */
	{ label: '变量', value: 'var', type: 'community' },
	{ label: '脚本', value: 'javascript', type: 'community' },
	{ label: '样式', value: 'style', type: 'community' }, // page less 可编辑
	{ label: '资源包', value: 'package', type: 'enterprise' }, // 页面使用过的全部脚本库
	{ label: '页面源码', value: 'pageCode', type: 'enterprise' } // 可导出作为一个单独的页面使用 不能脱离于平台
]