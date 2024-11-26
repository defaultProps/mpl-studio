<script setup lang="ts">
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { onBeforeUnmount, ref, watch, shallowRef, onMounted } from 'vue'
  import { IToolbarConfig, DomEditor } from '@wangeditor/editor'

  const editorRef = shallowRef()
  const props = defineProps<{ modelValue: string }>()
  const emit = defineEmits(['update:modelValue', 'blur'])
  const modelInput = ref<string>(props.modelValue)

  watch(() => props.modelValue, () => {
    modelInput.value = props.modelValue
  })

  // 模拟 ajax 异步获取内容
  onMounted(() => {
    setTimeout(() => {
      modelInput.value = '<p>模拟 Ajax 异步设置内容</p>'
      const toolbar = DomEditor.getToolbar(editorRef.value)

      const curToolbarConfig = toolbar?.getConfig()
      console.log(curToolbarConfig?.toolbarKeys) // 当前菜单排序和分组
    }, 1500)


  })

  const toolbarConfig: Partial<IToolbarConfig> = {
    // 增加 表情emoji、背景颜色、字体颜色、字体大小、图片转base64限制大小、 
    excludeKeys: [
      "blockquote", "header1", "header2", "header3", 'through', 'codeBlock', "undo", "redo", '|',
      "fullScreen", "justifyLeft",
      "justifyRight", "justifyCenter", "insertVideo"
    ]
  }
  const editorConfig = { placeholder: '请输入内容...' }
  onBeforeUnmount(() => {
    editorRef.value?.destroy()
  })

  const handleCreated = (editor: string) => {
    editorRef.value = editor
  }
</script>
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="simple" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="modelInput" :defaultConfig="editorConfig" mode="simple"
            @onCreated="handleCreated" />
  </div>
</template>