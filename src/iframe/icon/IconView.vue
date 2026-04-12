<script setup lang="ts">
import { onMounted, ref } from 'vue'

const iconList = ref<string[]>([])
const currentIconSymbolUrl = ref<string>('//at.alicdn.com/t/c/font_2784375_236yaj40exp.js')
const resizeNumber = ref(30)
const copiedIcon = ref<string>('')
const withIconList = ref<string[]>([])
const activeIconPackage = ref<string>('')

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

  fetch(url)
    .then(res => res.text())
    .then(str => {
      iconList.value = [...str.matchAll(/(?<=(id=")).*?(?=(" viewBox=))/g)].map(v => v[0])
    })
}

onMounted(() => {
  updateIcon('f4gt456', currentIconSymbolUrl.value)
})

onMounted(() => {
  window.addEventListener('message', e => {
    if (e.data.type === 'UPDATE_IFRAME_ICON') {
      const { value, url, withIcons } = e.data.payload
      currentIconSymbolUrl.value = url
      activeIconPackage.value = value
      withIconList.value = withIcons
      updateIcon(value, url)
    }
  })
})

function copySvg(icon: string) {
  if (!withIconList.value.includes(activeIconPackage.value)) {
    alert('未使用此图标库, 无法复制')
    return
  }
  navigator.clipboard.writeText(icon)
  copiedIcon.value = icon
  setTimeout(() => {
    copiedIcon.value = ''
  }, 500)
}

function editIconPackage() {
  alert('请到iconfont官网编辑图标库')
  if (confirm(`是否确认跳转到iconfont官方网站继续编辑图标库: ${currentIconSymbolUrl.value}`)) {
    window.open(currentIconSymbolUrl.value)
  }
}
</script>

<template>
  <div class="edit-btn-group">
    <select value="allIcon" class="mpl-select">
      <option value="allIcon">
        全部图标: {{ iconList.length }}
      </option>
      <option value="usedIcon">
        已使用图标: 47
      </option>
      <option value="usedIcon">
        未使用图标: {{ iconList.length - 47 }}
      </option>
    </select>
    <button type="button" :disabled="resizeNumber >= 50" @click="resize('up')">
      放大
    </button>
    <button type="button" @click="resizeNumber = 30">
      重置
    </button>
    <button type="button" :disabled="resizeNumber <= 15" style="margin-right: 40px" @click="resize('down')">
      缩小
    </button>
    <button type="button" @click="editIconPackage">
      编辑
    </button>
    <button type="button">下载</button>
  </div>
  <div class="content-svg">
    <div v-for="icon in iconList" class="icon-box" :class="{ 'copied': copiedIcon === icon }"
      @click.stop="copySvg(icon)">
      <svg v-if="copiedIcon !== icon" class="icon" aria-hidden="true"
        :style="{ width: resizeNumber + 'px', height: resizeNumber + 'px' }">
        <use :xlink:href="`#${icon}`" />
      </svg>
      <template v-else>
        已复制
      </template>
    </div>
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

.icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border-radius: var(--radius-2);
  margin: 10px;
  width: 50px;
  height: 50px;
  font-size: 12px;
  color: #1e1e1e;
  font-weight: 600;
  vertical-align: middle;
  user-select: none;

  &:hover {
    transform: scale(1.5);
    background-color: #f0f0f0;
  }

  svg.icon {
    width: 100%;
    height: 100%;
  }
}
</style>
