// import type { SingleInputFormProp } from '../define'
// import { ref } from 'vue'

export default () => {
  return {
    props: ['modelValue'],
    template: `
      <el-form-item
        :class="[{ 'mpl-none': !modelValue.label.show }]"
        :required="modelValue.required"
        label-width="80"
        class="mpl-form-item">
        <template #label>
          <div v-show="modelValue.label.show" class="mpl-label">
            <span :title="modelValue.label.text">
              {{ modelValue.label.text }}
            </span>
            <div v-if="modelValue.label.icon" class="mpl-label-icon">
              <i class="mpl icon" :class="[modelValue.label.icon]" :style="{ color: modelValue.label.iconTheme }" />
            </div>
          </div>
        </template>
        <div class="mpl-content">
          <el-input v-model="inputValue" theme="mpl" class="mr-5" :autofocus="false"
            :show-word-limit="modelValue.input.showLimit" :maxlength="modelValue.input.maxlength"
            :style="{ width: modelValue.input.width ? '' : '100%' }"
            :placeholder="modelValue.input.placeholder" :clearable="modelValue.input.clearable">
            <template #prefix>
              <i class="mpl icon" :class="[modelValue.input.prefixIcon]" />
            </template>
            <template #suffix>
              <i class="icon" :class="[modelValue.input.suffixIcon]" />
            </template>
          </el-input>
        </div>
        <template #error>
          <div class="mpl-form-item-error">
            错误信息提示
          </div>
        </template>
      </el-form-item>
    `
  }
}