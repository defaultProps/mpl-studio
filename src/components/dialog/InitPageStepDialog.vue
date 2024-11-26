<script setup lang="ts">
import { ref } from 'vue'
import ProjectPlatformStep from './ProjectPlatformStep.vue'
import ResourceServiceStep from './ResourceServiceStep.vue'
import PackageStep from './PackageStep.vue'
import PrivacyStatement from './PrivacyStatement.vue'

const prop = defineProps<{ visible: boolean }>()
const emit = defineEmits(['update:visible'])
const activeStep = ref<number>(1)
const loading = ref<boolean>(false)
const visibleDialog = ref<boolean>(prop.visible)
function handleCloseDialog() {
  activeStep.value = 1
  emit('update:visible', false)
}

function handleSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    emit('update:visible', false)
  }, 1600)
}

const steps = ['项目平台', '资源脚本', '环境仓库', '隐私声明']
</script>

<template>
  <el-dialog
    v-model="visibleDialog"
    title="新建项目"
    append-to-body
    :show-close="false"
    top="30px"
    width="1000px"
    class="init-select-project--dialog"
    :close-on-click-modal="false"
    :close-on-press-escap="false"
  >
    <aside class="project-step">
      <div
        v-for="(label, index) in steps"
        :key="label"
        class="step"
        :class="{
          active: activeStep === index + 1,
          done: activeStep > index + 1
        }"
      >
        {{ label }}
      </div>
    </aside>
    <div class="step-description">
      <ProjectPlatformStep v-if="activeStep === 1" />
      <ResourceServiceStep v-if="activeStep === 2" />
      <PackageStep v-if="activeStep === 3" />
      <PrivacyStatement v-if="activeStep === 4" />
    </div>
    <template #footer>
      <button @click="handleCloseDialog">
        取消
      </button>
      <button
        v-if="activeStep !== 1"
        @click="activeStep--"
      >
        上一步
      </button>
      <button
        v-if="activeStep !== steps.length"
        @click="activeStep++"
      >
        下一步
      </button>
      <button
        v-if="activeStep === steps.length"
        :loading="loading"
        @click="handleSubmit"
      >
        确定
      </button>
    </template>
  </el-dialog>
</template>
