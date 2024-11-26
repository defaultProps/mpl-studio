<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MdCatalog, MdPreview } from 'md-editor-v3'
import './markdown.css'

const id = 'preview-only'
const text = ref<string>('')
const scrollElement = ref<string | HTMLElement | undefined>()

onMounted(() => {
  scrollElement.value = document.querySelector(
    '.preview-only-preview-wrapper'
  ) as HTMLElement
  window.addEventListener(
    'message',
    async (e) => {
      const { type, payload } = e.data

      if (type === 'LOAD_IFRAME_DOCS') {
        if (payload.assetsFilePath) {
          const response = await fetch(payload.assetsFilePath)
          const defaultText = `# ${payload.assetsFilePath.replace('./markdown/', '').replace('.md', '')}`
          text.value = (await response.text()) || defaultText
        }
      }
    },
    false
  )
})
</script>

<template>
  <div class="doc-container">
    <MdPreview
      :editor-id="id"
      :model-value="text"
      preview-theme="cyanosis"
    />
    <MdCatalog
      :editor-id="id"
      :scroll-element="scrollElement"
    />
  </div>
</template>

<style lang="less">
.doc-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background: #f6f8fa;
  box-sizing: border-box;
  font-size: 12px;
  padding: 20px 0 20px;
  color: var(--color-1);
  overflow: hidden;
  .md-editor-catalog {
    max-height: 100%;
    overflow: auto;
    color: var(--color-3);
    font-size: 13px;
    width: 200px;
    min-width: 200px;
    max-width: 200px;
    border-radius: 10px;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .md-editor.md-editor-previewOnly {
    height: 100%;
    border-radius: 10px;
    background-color: var(--color-7);
    margin-left: 20px;
    overflow: hidden;
    h1 {
      margin: 10px 0;
      font-size: 25px;
    }
  }
}
</style>
