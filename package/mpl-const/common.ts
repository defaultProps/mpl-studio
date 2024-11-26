// 生成有规律的组件id
export function newCid() {
  const str = 'qwertyuiopasdfghjklzxcvbnm'
  const c = () => str[Math.floor(Math.random() * 26)]
  const n = () => Math.floor(Math.random() * 11)

  // rg5hy 简短、简洁、不报错
  return [c(), c(), n(), c(), c()].join('')
}

interface WatermarkProps {
  title: string
  mode: 'richtext' | 'text' // 换行水印、默认单行文本
}

// 导入水印功能。 引入watermark-plus
export function watermark(opt: WatermarkProps) {
  console.log(opt)
}