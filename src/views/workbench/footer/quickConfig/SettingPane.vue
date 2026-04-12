<script lang="ts" setup>
import { ref } from 'vue'

const interactiveSettingForm = ref({
  editModel: 'IDEMode',
  syncComponent: false,
  smartTip: true,
  aiEdit: true,
  autoSave: true,
  ideTheme: 'system',
})

// 只允许 简易模式 > 流程模式 > IDE模式  单项操作.
const handleEditModelChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value
  if (value === 'catalogMode') {
    interactiveSettingForm.value.syncComponent = true
    interactiveSettingForm.value.smartTip = true
    interactiveSettingForm.value.aiEdit = true
  }
}

</script>

<template>
  <div class="quick-config-setting--panel">
    <div class="form-item-line" label="事件编辑模式">
      <select v-model="interactiveSettingForm.editModel" class="mpl-select mr-2" style="width: 150px;"
        @change="handleEditModelChange">
        <option label="目录模式" value="catalogMode" />
        <option label="流程模式" value="flowMode" />
        <option label="IDE模式" value="IDEMode" />
      </select>
    </div>
    <div class="form-item-line" label="同步选中组件">
      <input v-model="interactiveSettingForm.syncComponent" type="checkbox" class="mpl-input">
    </div>
    <div class="form-item-line" label="智能提示">
      <input v-model="interactiveSettingForm.smartTip" disabled type="checkbox" class="mpl-input">
    </div>
    <div class="form-item-line" label="自动保存">
      <input v-model="interactiveSettingForm.autoSave" type="checkbox" class="mpl-input">
    </div>
    <div class="form-item-line" label="AI辅助提示">
      <input v-model="interactiveSettingForm.aiEdit" type="checkbox" class="mpl-input">
    </div>
  </div>
</template>

<style lang="less" scoped>
.quick-config-setting--panel {
  padding: 10px;
  box-sizing: border-box;
  font-size: 12px;

  .form-item-line {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &::before {
      content: attr(label);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 90px;
    }
  }
}
</style>
