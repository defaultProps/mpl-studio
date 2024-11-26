<script lang="ts" setup>
import { ref } from 'vue'
import CardBox from '../CardBox.vue'

const size = ref<string>('default')
const disabled = ref(false)
const loading = ref(false)
const visibleIcon = ref(false)
const cardModel = ref('connect')
const isGroup = ref(false)
const btnConfig = ref<any>({
  smallHeight: '--MPL-H-01',
  mediumHeight: '--MPL-H-02',
  smallFontSize: '--MPL-FZ-01',
  mediumFontSize: '', // 字体大小medium尺寸
  borderRadius: '', // 圆角
  paddingSpace: '', // 左右间距
  // 主要按钮
  primary: {
    borderColor: '--MPL-BA-20',
    backgroundColor: '',
    color: '',
    hoverBorderColor: '',
    hoverColor: '',
    hoverBackgroundColor: '',
    activeBorderColor: '',
    activeColor: '',
    activeBackgroundColor: '',
    focusColor: '',
    focusBackgroundColor: '',
    focusBorderColor: ''
  },
  // 主要边框按钮
  primaryBorderBtn: {
    borderColor: '--MPL-BA-20',
    color: '',
    hoverBorderColor: '',
    hoverColor: '',
    hoverBackgroundColor: '',
    activeBorderColor: '',
    activeColor: '',
    activeBackgroundColor: '',
    focusColor: '',
    focusBackgroundColor: '',
    focusBorderColor: ''
  },
  // 主要文本按钮
  primaryTextBtn: {
    borderColor: '--MPL-BA-20',
    color: '',
    hoverBorderColor: '',
    hoverColor: '',
    hoverBackgroundColor: '',
    activeBorderColor: '',
    activeColor: '',
    activeBackgroundColor: '',
    focusColor: '',
    focusBackgroundColor: '',
    focusBorderColor: ''
  },
  // 警告按钮
  warningBtn: {
    borderColor: '--MPL-BA-20',
    color: '',
    hoverBorderColor: '',
    hoverColor: '',
    hoverBackgroundColor: '',
    activeBorderColor: '',
    activeColor: '',
    activeBackgroundColor: '',
    focusColor: '',
    focusBackgroundColor: '',
    focusBorderColor: ''
  },
  // 警告边框按钮
  warningBorderBtn: {
    borderColor: '--MPL-BA-20',
    color: '',
    hoverBorderColor: '',
    hoverColor: '',
    hoverBackgroundColor: '',
    activeBorderColor: '',
    activeColor: '',
    activeBackgroundColor: '',
    focusColor: '',
    focusBackgroundColor: '',
    focusBorderColor: ''
  },
  // 警告文本按钮
  warningTextBtn: {
    borderColor: '--MPL-BA-20',
    color: '',
    hoverBorderColor: '',
    hoverColor: '',
    hoverBackgroundColor: '',
    activeBorderColor: '',
    activeColor: '',
    activeBackgroundColor: '',
    focusColor: '',
    focusBackgroundColor: '',
    focusBorderColor: ''
  },
  // 文本边框按钮
  textBorderBtn: {
    borderColor: '--MPL-BA-20',
    color: '',
    hoverBorderColor: '',
    hoverColor: '',
    hoverBackgroundColor: '',
    activeBorderColor: '',
    activeColor: '',
    activeBackgroundColor: '',
    focusColor: '',
    focusBackgroundColor: '',
    focusBorderColor: ''
  },
  // 文本按钮
  TextBtn: {
    borderColor: '--MPL-BA-20',
    color: '',
    hoverBorderColor: '',
    hoverColor: '',
    hoverBackgroundColor: '',
    activeBorderColor: '',
    activeColor: '',
    activeBackgroundColor: '',
    focusColor: '',
    focusBackgroundColor: '',
    focusBorderColor: ''
  }
})
</script>

<template>
  <CardBox title="按钮">
    <div class="mpl-btn--box">
      <el-button
        class="mpl-btn-1"
        :disabled="disabled"
        :loading="loading"
      >
        主要按钮
      </el-button>
      <el-button
        class="mpl-primary--btn"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >
        <i
          v-if="visibleIcon && !loading"
          class="icon icon-enable"
        />
        主要边框
      </el-button>
      <el-button
        class="mpl-primary--btn"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >
        <i
          v-if="visibleIcon && !loading"
          class="icon icon-enable"
        />
        主要文本
      </el-button>
      <br>
      <br>
      <el-button
        class="mpl-warning--btn"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >
        <i
          v-if="visibleIcon && !loading"
          class="icon icon-enable"
        />
        警告按钮
      </el-button>
      <el-button
        class="mpl-warning--btn"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >
        <i
          v-if="visibleIcon && !loading"
          class="icon icon-enable"
        />
        警告边框
      </el-button>
      <el-button
        class="mpl-warning--btn"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >
        <i
          v-if="visibleIcon && !loading"
          class="icon icon-enable"
        />
        警告文本
      </el-button>
      <br>
      <br>
      <el-button
        class="mpl-text--btn"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >
        <i
          v-if="visibleIcon && !loading"
          class="icon icon-enable"
        />
        文本边框
      </el-button>
      <el-button
        class="mpl-text--btn"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >
        <i
          v-if="visibleIcon && !loading"
          class="icon icon-enable"
        />
        文本按钮
      </el-button>
    </div>
    <template #btn>
      <radioGroupBtn v-model="cardModel" />
      <el-button-group>
        <el-radio-group
          v-model="cardModel"
          size="small"
        >
          <el-radio-button value="setting">
            状态
          </el-radio-button>
          <el-radio-button value="connect">
            主题
          </el-radio-button>
          <el-radio-button value="code">
            源码
          </el-radio-button>
        </el-radio-group>
      </el-button-group>
    </template>

    <template #setting>
      <template v-if="cardModel === 'setting'">
        <div class="mpl-form-item">
          <div class="mpl-label">
            按钮尺寸
          </div>
          <el-radio-group v-model="size">
            <el-radio-button value="small">
              紧凑
            </el-radio-button>
            <el-radio-button value="medium">
              舒适
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            图标
          </div>
          <input type="checkbox" class="mpl-input" v-model="visibleIcon" />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            加载中
          </div>
          <input type="checkbox" class="mpl-input" v-model="loading" />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            禁用
          </div>
          <input type="checkbox" class="mpl-input" v-model="disabled" />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            按钮组
          </div>
          <input type="checkbox" class="mpl-input" v-model="isGroup" />
        </div>
      </template>
      <template v-else-if="cardModel === 'connect'">
        <h3 class="label">
          主要按钮
        </h3>
        <div class="mpl-form-item">
          <div class="mpl-label">
            背景色
          </div>
          <el-color-picker
            v-model="btnConfig.primary.backgroundColor"
            show-alpha
          />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            边框色
          </div>
          <el-color-picker
            v-model="btnConfig.primary.backgroundColor"
            show-alpha
          />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            字体色
          </div>
          <el-color-picker
            v-model="btnConfig.primary.backgroundColor"
            show-alpha
          />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            Hover 背景色
          </div>
          <el-color-picker
            v-model="btnConfig.primary.backgroundColor"
            show-alpha
          />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            Hover 边框色
          </div>
          <el-color-picker
            v-model="btnConfig.primary.backgroundColor"
            show-alpha
          />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            hover 字体色
          </div>
          <el-color-picker
            v-model="btnConfig.primary.backgroundColor"
            show-alpha
          />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            Focus 背景色
          </div>
          <el-color-picker
            v-model="btnConfig.primary.backgroundColor"
            show-alpha
          />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            Focus 边框色
          </div>
          <el-color-picker
            v-model="btnConfig.primary.backgroundColor"
            show-alpha
          />
        </div>
        <div class="mpl-form-item">
          <div class="mpl-label">
            Focus 字体色
          </div>
          <el-color-picker
            v-model="btnConfig.primary.backgroundColor"
            show-alpha
          />
        </div>
      </template>
      <template v-else>
        IDE
      </template>
    </template>
  </CardBox>
</template>
