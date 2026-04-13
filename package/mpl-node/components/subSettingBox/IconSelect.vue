<script setup lang="ts">
import { projectIcons, systemIcons } from '@mpl/node'
import SubSettingHeaderUI from '../SubSettingHeaderUI.vue'
import { ref, onMounted, nextTick } from 'vue'
import { projectStore } from '@mpl/store'
import type { IconPackage } from '@mpl/typings'
import { icons } from 'lucide'
import * as LucideVueNext from 'lucide-vue-next'
import InputNode from '../../components/InputNode.vue'

const modelValue = defineModel<string>('modelValue', { default: '' })
const project = projectStore()
const iconPanes = ref<IconPackage[]>(project.projectIcon)
const emit = defineEmits(['change', 'cancel'])
const selectIconPackage = ref<string>('systemIcon')
const iconNames = Object.keys(icons) // 1908个图标
const pageSize = 17 * 7 // 每页显示17行，每行7个图标
const currentPage = ref(1)
const total = ref(iconNames.length)
const maxPage = ref(Math.ceil(total.value / pageSize))
const getIconComponent = (name: any) => {
  return LucideVueNext[name]
};
const searchIcon = ref<string>('')

onMounted(() => {
  // 如果选择了图标, 直接跳转到具体的页码
  if (modelValue.value) {
    const index = iconNames.indexOf(modelValue.value)
    if (index !== -1) {
      currentPage.value = Math.floor(index / pageSize) + 1
      nextTick(() => {
        document.querySelector('#iconSelectSideBarBox .icon-item .icon.select')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      })
    }
  }
})

const allIconList = [
  {
    label: 'mplStudio标准图标库', // lucide-vue-next图标库
    value: 'systemIcon',
  },
  {
    label: 'element-plus图标库',
    value: 'elementPlusIcon',
  },
  {
    label: 'mplStudio标准图片库',
    value: 'imageIcon',
  },
  {
    label: '项目图标',
    value: 'projectIcon',
  },
  {
    label: '项目图片',
    value: 'projectImage',
  }
]

function submitIcon(event: MouseEvent | 'cancel') {
  if (event === 'cancel') {
    emit('cancel')
    return
  }
  const icon = (event.target as HTMLElement).getAttribute('aria-icon')
  if (!icon) return
  modelValue.value = icon

  console.log(icon)
  emit('change', icon)
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
function nextPage() {
  if (currentPage.value < maxPage.value) {
    currentPage.value++
  }
}

function changeIconType() {
  //
}

function handleSearchIcon() {
  // 跳转到图标页签， 没有打开的图标页签就新开一个
  project.updateActiveFile({
    title: '图标管理',
    id: 'iconMarket',
    type: 'iconMarket',
    pageInfo: {}
  }, true)
}
</script>

<template>
  <div id="iconSelectSideBarBox" class="icon-select--box mpl-scroll-none">
    <SubSettingHeaderUI label="图标/图片选择" @close="submitIcon('cancel')" />
    <div class="search-box mt-5">
      资源库
      <select v-model="selectIconPackage" class="mpl-select ml-5" @change="changeIconType">
        <option v-for="pane in allIconList" :value="pane.value">
          {{ pane.label }}
        </option>
      </select>
      <button type="button" class="mpl-btn icon icon-select5 ml-5" @click="handleSearchIcon" />
    </div>
    <div class="search-box pb-5" style="border-bottom: 1px solid #ccc;">
      搜索图标
      <InputNode v-model="searchIcon" class="ml-5" />
      <button type="button" class="mpl-btn icon icon-search1 ml-5" />
    </div>
    <div class="icon-item mpl-scroll-none" @click="submitIcon($event)">
      <component :is="getIconComponent(iconName)"
        v-for="iconName in iconNames.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        :class="{ select: modelValue === iconName }" class="icon" :aria-icon="iconName" :size="30" />
    </div>
    <div class="footer-box">
      <span>{{ total }}</span>
      <div class="prev-page-btn">
        {{ currentPage + '/' + Math.ceil(total / pageSize) }}
        <button type="button" class="mpl-btn icon icon-minus ml-5" :disabled="currentPage <= 1" @click="prevPage" />
        <button type="button" class="mpl-btn icon icon-plus ml-5" :disabled="currentPage >= maxPage"
          @click="nextPage" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.icon-select--box {
  width: 300px;
  height: 100%;
  position: absolute;
  z-index: 100;
  right: 300px;
  top: 0;
  color: #000;
  height: 100%;
  bottom: 0;
  overflow: hidden auto;
  border: 1px solid #ccc;
  background: #fff;
  display: flex;
  flex-direction: column;

  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background: #fff;
    height: 30px;
    padding: 0 5px;
    white-space: nowrap;
  }

  .footer-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 5px;
    position: sticky;
    bottom: 0;
    z-index: 1;
    background: #fff;
    height: 40px;
    border-top: 1px solid #ccc;
  }

  .icon-item {
    display: grid;
    grid-template-columns: repeat(5, 56px);
    grid-gap: 0px;
    box-sizing: border-box;
    cursor: default;
    flex: 1;
    overflow: hidden auto;
    padding: 10px;
    grid-template-rows: minmax(43px, 43px);

    svg {
      fill: none;
      padding: 18px;
      box-sizing: border-box;
      border-radius: var(--border-radius);
      cursor: pointer;
      width: 56px;
      height: 56px;
      user-select: none;

      &:hover,
      &.select {
        background: #e6e6e6;
        padding: 3px;
        outline: 1px solid #1e1e1e33;
      }
    }

    >div {
      width: 100%;
      height: 30px;
      outline: 1px solid #ccc;
      border-radius: 4px;
      display: inline-flex;
      user-select: none;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      color: #1E1E1E;
      background: #fff;

      i {
        font-size: 16px;
      }



      &:hover {
        outline: 1px dashed var(--primary-color);
        font-size: 22px;
        font-weight: 600;
        transform: scale(1.3);
      }
    }
  }

  .empty-block-link {
    width: 100%;
    text-align: center;
    user-select: none;
    margin: 100px 0;
    display: inline-block;
    color: var(--primary-color);
    font-size: 12px;
    text-decoration: underline;
  }
}
</style>
