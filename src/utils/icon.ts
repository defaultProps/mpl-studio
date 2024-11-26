// 传递iconFont-fontClass url。返回解析后的图标列表
export async function fetchIcons(
  url: string,
  isAppendNode = true
): Promise<string[]> {
  return await fetch(url)
    .then(response => response.text())
    .then((data) => {
      // 挂载到页面节点上
      if (isAppendNode) {
        const dom = document.createElement('style')
        dom.textContent = data
        document.head.appendChild(dom)
      }

      return [...data.matchAll(/.(.+?):before/gi)].map(v => v[1])
    })
}
