import zh from "./zh-CN"
import en from "./en-US"
import ja from "./ja-JP"
import { createI18n } from 'vue-i18n'

export default createI18n({
  locale: 'zh', // zh en
  fallbackLocale: 'zh',
  messages: {
    zh,
    en,
    ja
  }
})
