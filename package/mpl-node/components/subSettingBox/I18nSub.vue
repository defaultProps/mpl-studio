<script setup lang="ts">
import SubSettingHeaderUI from '../SubSettingHeaderUI.vue'
import { ref } from 'vue'
import InputNode from '../../components/InputNode.vue'
import FormItem from '../../components/FormItem.vue'

const props = defineProps<{
  modelValue: string
}>()

const labeI18n = ref(props.modelValue)
const loadingBtn = ref(false)

function submitIcon(event: MouseEvent | 'cancel') {
  //
}

function handleTranslate() {
  // AI翻译输入语言。默认是中文输入
  alert('请求后台多语言数据自动翻译')
  loadingBtn.value = true
  setTimeout(() => {
    loadingBtn.value = false
  }, 1000)
}
</script>

<template>
  <div class="label-i18n--box mpl-scroll-none">
    <SubSettingHeaderUI label="国际化设置" @close="submitIcon('cancel')" />
    <FormItem label="中文简体" style="padding: 5px 5px 0">
      <InputNode v-model="labeI18n" disabled class="ml-5" />
    </FormItem>
    <FormItem label="英文" style="padding: 0 5px">
      <InputNode v-model="labeI18n" disabled class="ml-5" />
      <button type="button" class="mpl-btn del-btn ml-5 icon icon-close" />
      <button type="button" class="mpl-btn ml-5" :disabled="loadingBtn" @click="handleTranslate">
        <i :class="loadingBtn ? 'icon-loading' : 'icon-search1'" class="icon" />
      </button>
    </FormItem>
    <button type="button" class="mpl-btn plus-btn icon icon-plus mt-5 ml-5">
      添加多语言
    </button>
  </div>
</template>

<style lang="less" scoped>
.label-i18n--box {
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
    height: 28px;
    padding: 0 5px;
    white-space: nowrap;
  }
}
</style>
