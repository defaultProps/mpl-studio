// 随机id
export function newId() {
	const str = 'qwertyuiopasdfghjklzxcvbnm'
	const c = () => str[Math.floor(Math.random() * 26)]
	const n = () => Math.floor(Math.random() * 11)

	// rg59hy66 简短、简洁、不报错
	return [c(), c(), n(), n(), c(), c(), n(), n()].join('')
}

interface WatermarkProps {
	title: string
	mode: 'richtext' | 'text' // 换行水印、默认单行文本
}

// 导入水印功能。 引入watermark-plus
export function watermark(opt: WatermarkProps) {
	console.log(opt)
}
