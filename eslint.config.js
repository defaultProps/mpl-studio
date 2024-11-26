import pluginVue from 'eslint-plugin-vue'

export default [
  // add more generic rule sets here, such as:
  ...pluginVue.configs['flat/strongly-recommended'],
  {
    rules: {
      "vue/max-attributes-per-line": 0
    }
  }
]