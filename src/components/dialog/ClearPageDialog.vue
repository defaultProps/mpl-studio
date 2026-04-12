<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { workbenchStore } from '@mpl/store'

const inputValue = ref<string>('')
const visible = defineModel<boolean>()

function showModel() {
  inputValue.value = ''
  const node = document.getElementById('clearPageDialog') as HTMLDialogElement
  node?.showModal()
}

function confirm() {
  if (inputValue.value.trim() === 'mpl studio') {
    workbenchStore().resetStore()
    cancel()
  }
}

defineExpose({
  showModel
})

function cancel() {
  const node = document.getElementById('clearPageDialog') as HTMLDialogElement
  node?.close()
  visible.value = false
}
</script>

<template>
  <Teleport to="body">
    <dialog id="clearPageDialog">
      <div class="dialog-header">
        <img src="@/assets/logo.png" alt="logo">
        <h3>清空确认</h3>
        <button class="icon icon-close1" @click="cancel" />
      </div>
      <div class="dialog-content">
        <div class="form-item">
          <span>清空后无法找回</span>，请输入 <strong>mpl studio</strong> 确认清空文件内容
        </div>
        <input v-model="inputValue" autofocus>
      </div>
      <div class="footer-dialog">
        <button class="cancel-btn" type="button" @click="cancel">
          取消
        </button>
        <button class="submit-btn" type="button" @click="confirm">
          确认
        </button>
      </div>
    </dialog>
  </Teleport>
</template>
<style lang="less" scoped>
#clearPageDialog {
  width: 500px;
  border: 1px solid #aeafad;
  outline: none;
  top: 0;
  position: fixed;
  margin-top: 240px;
  background-color: #fff;
  border-radius: var(--radius-3);
  padding: 0;

  .dialog-header {
    height: 50px;
    font-size: 16px;
    color: #303133;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;

    h3 {
      margin: 0;
      height: 50px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      flex: 1;
    }

    img {
      height: 30px;
      margin-right: 3px;
    }

    button {
      width: 35px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-3);
      border: 1px solid transparent;
      background-color: transparent;
      cursor: default;

      &:hover {
        background: #f0f0f0;
        border: 1px solid #e6e6e6;
        color: #c3002f;
      }
    }
  }



  .dialog-content {
    padding: 15px 30px 20px;
    box-sizing: border-box;

    .form-item {
      height: 24px;
      color: #333;
      font-size: 14px;

      span {
        color: #c3002f;
        font-weight: 600;
      }
    }

    input {
      height: 32px;
      width: 100%;
      border: 1px solid #767676;
      border-radius: var(--radius-2);
      box-sizing: border-box;
      background: #e6e6e6;
      text-indent: 4px;
    }
  }

  .footer-dialog {
    height: 50px;
    border-top: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 10px;
    box-sizing: border-box;

    button {
      padding: 6px 10px;
      margin-left: 10px;
      font-size: 13px;
      color: #303133;
      background-color: #efefef;
      border: 1px solid #ccc;
      border-radius: var(--radius-3);
      cursor: default;

      &:hover {
        border: 1px solid #404040b0;
        background-color: #e6e6e6;
      }
    }

    .submit-btn {
      color: #ffffff;
      background-color: var(--primary-color);
      border: 1px solid #404040;

      &:hover {
        border: 1px solid #404040b0;
        opacity: 0.9;
        background-color: var(--primary-color);
      }
    }
  }
}
</style>