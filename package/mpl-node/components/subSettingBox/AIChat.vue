<script setup lang="ts">
import SubSettingHeaderUI from '../SubSettingHeaderUI.vue'
import InputNodeTextarea from '../InputNodeTextarea.vue'
import { ref } from 'vue'

const type = defineModel<string>('type', { default: 'limit' })
const emit = defineEmits(['change', 'cancel'])
const inputValue = ref('')

function handleSubmit() {
  if (inputValue.value) {
    inputValue.value = ''
  }
}

function handleCancel() {
  emit('cancel')
}

</script>

<template>
  <div class="ai-chat--box mpl-scroll-none">
    <SubSettingHeaderUI label="AI交互" @close="handleCancel" />
    <div class="chat-box">
      todo. 等后台接口, 再完善.
      <br>
      1, 根据输入内容进行ai搜索, 返回数据增加按钮"使用", "复制", "运行测试"即可一键插入到当前节点的代码中.
      <br>
      2, 需要保留搜索内容. 用户可能需要知道历史记录.
      <br>
      3. 此组件仅作为基础组件的limit字段使用
      <br>
    </div>
    <div class="footer-search">
      <InputNodeTextarea v-model="inputValue" placeholder="请输入" />
      <button type="button" @click="handleSubmit">搜<br>索</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ai-chat--box {
  width: 300px;
  height: 100%;
  position: absolute;
  z-index: 10;
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

  >.chat-box {
    flex: 1;
    padding: 5px;
    box-sizing: border-box;
  }

  >.footer-search {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 5px;

    button {
      height: 100%;
      padding: 0 15px;
      border: 1px solid #767676;
      border-left: 0;

      &:hover {
        border: 1px solid var(--primary-color);
        outline: 1px solid var(--primary-color);
        background: #dbd9d9;
      }
    }
  }
}
</style>
