import globals from "globals";
import pluginJs from "@eslint/js";
import testLint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import parserVue from "vue-eslint-parser";

export default [
  // eslint 默认推荐规则
  pluginJs.configs.recommended,
  // ts 默认推荐规则
  ...testLint.configs.recommended,
  // vue3 基础推荐规则
  ...pluginVue.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      ecmaVersion: 2020,
      parser: parserVue,
      parserOptions: {
        parser: testLint.parser,
      },
    },
    rules: {
      'vue/singleline-html-element-content-newline': 'off',
      "vue/html-indent": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": 0,
      "vue/require-v-for-key": "off", // 关闭vue v-for必须绑定key属性
      "vue/multi-word-component-names": "off", // 关闭组件名称必须满足俩个单词且驼峰命名
      "@typescript-eslint/no-unused-expressions": 0, // 允许 disabled && a() 写法
      "vue/first-attribute-linebreak": 0,
      "vue/valid-v-for": "off",
      "vue/no-unused-components": "off",
      "vue/no-unused-vars": "off",
      "vue/no-v-html": "off",
      "no-unused-vars": 0,
      "@typescript-eslint/no-unused-vars": 0,
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/max-attributes-per-line": 'off',
      "vue/no-mutating-props": "off",
      'max-len': 'off'
    },
  },
];
