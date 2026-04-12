<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FormItem from './FormItem.vue'
import { userStore } from '@mpl/store'

interface Note {
  open: boolean
  tip: string
  text: string
}

// 注解内容
const noteTip = ref('')
const noteText = ref('')
const user = userStore()
const note = defineModel<Note>({ default: { open: false, tip: '', text: '' } })

onMounted(() => {
  noteTip.value = note.value.tip
  noteText.value = note.value.text
})

function blurNoteText() {
  note.value.text = noteText.value
}

function blurNoteTip() {
  note.value.tip = noteTip.value
}

</script>
<template>
  <FormItem label="开启注解">
    <input v-model="note.open" :disabled="user.authority !== 'enterprise'" type="checkbox" class="mpl-input">
  </FormItem>
  <template v-if="note.open">
    <FormItem label="注解标识">
      <input v-model.trim="noteTip" autocomplete="off" class="mpl-input" placeholder="默认为: 注" maxlength="20"
        @blur="blurNoteTip">
    </FormItem>
    <FormItem label="注解内容" flex-start>
      <textarea v-model="noteText" rows="5" maxlength="200" class="mpl-textarea" style="resize: none"
        @blur="blurNoteText" />
    </FormItem>
  </template>
</template>
<style lang="less" scoped>
.slot-btn-line {
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-around;
}
</style>
