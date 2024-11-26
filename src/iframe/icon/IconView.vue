<script setup lang="ts">
import { onMounted, ref } from 'vue'

const iconList = ref<string[]>([])
const currentIconSymbolUrl = ref<string>('https://at.alicdn.com/t/c/font_2784375_i4hi73a82t.js')
const resizeNumber = ref(30)

function resize(val: 'up' | 'down') {
  if (val === 'up') {
    resizeNumber.value = resizeNumber.value >= 50 ? 50 : resizeNumber.value + 5
  } else {
    resizeNumber.value = resizeNumber.value <= 15 ? 15 : resizeNumber.value - 5
  }
}

function updateIcon(value: string, url: string) {
  const lastScriptNode = document.querySelector(`head > script[mpl-icon]`)
  lastScriptNode?.parentNode?.removeChild(lastScriptNode)

  const lastSvgNode = document.querySelector('body > svg[aria-hidden="true"]')
  lastSvgNode?.parentNode?.removeChild(lastSvgNode)

  iconList.value = []

  const dom = document.createElement('script')
  dom.setAttribute('mpl-icon', value)
  dom.setAttribute('src', url)
  document.head.appendChild(dom)

  fetch(url).then(res => res.text()).then((str) => {
    iconList.value = [...str.matchAll(/(?<=(id=")).*?(?=(" viewBox=))/g)].map(v => v[0])
  })
}

onMounted(() => {
  updateIcon('f4gt456', currentIconSymbolUrl.value)
})

onMounted(() => {
  window.addEventListener('message', (e) => {
    if (e.data.type === 'UPDATE_IFRAME_ICON') {
      const { value, url } = e.data.payload
      currentIconSymbolUrl.value = url
      updateIcon(value, url)
    }
  })
})

function copySvg(icon: string) {
  navigator.clipboard.writeText(icon);
  alert("已复制选中图标")
}
</script>

<template>
  <div class="edit-btn-group">
    <select value="allIcon">
      <option value="allIcon">全部图标：{{ iconList.length }}</option>
      <option value="usedIcon">已使用图标：47</option>
      <option value="usedIcon">未使用图标：{{ iconList.length - 47 }}</option>
    </select>
    <button @click="resize('up')" :disabled="resizeNumber >= 50">放大</button>
    <button @click="resizeNumber = 30">重置</button>
    <button @click="resize('down')" :disabled="resizeNumber <= 15" style="margin-right: 40px">缩小</button>
    <button>新增</button>
    <button>删除</button>
    <button>下载</button>
    <button>项目设置</button>
  </div>
  <div class="content-svg">
    <svg class="icon" aria-hidden="true" v-for="icon in iconList" @click.stop="copySvg(icon)"
      :style="{ width: resizeNumber + 'px', height: resizeNumber + 'px' }">
      <use v-bind:xlink:href="`#${icon}`"></use>
    </svg>
  </div>

</template>

<style lang="less">
#lcsIconPreview {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}
.content-svg {
  padding-top: 10px;
}

.edit-btn-group {
  background: #e6e6e6;
  padding: 5px 10px;
  width: 100%;
  position: sticky;
  top: 0;

  button {
    margin-right: 5px;
    font-size: 12px;
  }

  select {
    font-size: 12px;
    height: 22px;
    margin-right: 5px;
    min-width: 120px;
  }
}

svg.icon {
  width: 30px;
  height: 30px;
  display: inline-block;
  overflow: hidden;
  padding: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
  }
}
</style>
