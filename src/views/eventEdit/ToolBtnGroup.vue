<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  splice?: boolean
  copy?: boolean
  lock?: boolean
  embeddedOut?: boolean
  clear?: boolean
  delete?: boolean
}>(), {
  splice: false,
  copy: false,
  lock: false,
  embeddedOut: false,
  clear: false,
  delete: true,
})
const emit = defineEmits(['delete', 'copy', 'reset', 'collapse', 'clear'])
const isCollapse = ref(true)

function handleCollapse() {
  isCollapse.value = !isCollapse.value
  emit('collapse', isCollapse.value)
}

</script>
<template>
  <div class="btn-group">
    <button class="mpl-btn icon" :class="[isCollapse ? 'icon-jurassic_unfold' : 'icon-jurassic_packup']"
      title="流程展开/关闭" @click.stop="handleCollapse" />
    <button v-if="props.lock" type="button" class="mpl-btn icon-unlock icon" title="流程锁定/解锁" @click.stop />
    <button v-if="props.embeddedOut" type="button" class="mpl-btn icon-unlock icon" title="嵌出执行块" @click.stop />
    <button v-if="props.splice" type="button" class="mpl-btn icon-jurassic_refresh1 icon" title="重置表单"
      @click.stop="emit('reset')" />
    <button v-if="props.copy" type="button" class="mpl-btn icon-copy-document icon" title="流程向下复制"
      @click.stop="emit('copy')" />
    <button v-if="props.clear" type="button" class="mpl-btn del-btn icon-jurassic_delete-form icon" title="清空所有流程"
      @click.stop="emit('clear')" />
    <button v-if="props.delete" type="button" class="mpl-btn del-btn icon-close icon" title="节点删除" @click.stop="emit('delete')" />
  </div>
</template>
<style lang="less" scoped>
.btn-group {
  display: flex;
  justify-content: flex-end;
  // position: absolute;
  // right: 5px;

  button+button {
    margin-left: 3px;
  }
}
</style>
