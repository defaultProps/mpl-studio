<script setup lang="ts">
import * as Vue from 'vue'
import { loadModule } from 'vue3-sfc-loader/dist/vue3-sfc-loader.esm.js'
import { defineAsyncComponent, onMounted } from 'vue'
import { createApp } from 'vue'
Vue.onMounted(() => {
  // postMessage 查看是否更新页面数据
})

const options = {
  moduleCache: {
    vue: Vue
  },
  async getFile() {
    return '<template><van-button type="primary">主要按钮</van-button><div>212</div></template>'
  },
  addStyle() {
    /* unused here */
  },
}
const asyncComponent = defineAsyncComponent(() => loadModule('v3test.vue', options))

onMounted(() => {
  createApp({
    data() {
      return {
        mpl: {
          fb4ht6: {
            input: {
              vModel: '124',
              placeholder: '请输入'
            },
            label: {
              text: '1345'
            }
          }
        }
      }
    },
    components: {
      asyncComponent: defineAsyncComponent(() => loadModule('v3test1.vue', options))
    },
    template: '<asyncComponent />'
  }).mount("#ffff")
})

</script>

<template>
  <div>
    <component :is="asyncComponent" v-bind="$attrs" />
  </div>
</template>