import { createApp } from 'vue'
import AppEntry from './AppEntry.vue'
import router from './router'
import './assets/common.less'
import './theme.less'
import FloatingVue from 'floating-vue'
import { initStore } from '@mpl/store'
// import localforage from 'localforage'
// import uploader from 'vue-simple-uploader'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './style/element-plus.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import './style/contextmenu.css'
import './style/common.less'
import 'virtual:svg-icons-register'
import i18n from '@mpl/i18n'
import './style/floating.css'
import SvgIcon from '@/components/SvgIcon.vue'

// localforage.config({
//   driver: localforage.INDEXEDDB,
//   name: 'mplStudio',
//   // storeName: 'mpl',
//   description: "mpl middle platform studio website local Storage by indexdb."
// })

// localforage.clear()

const app = createApp(AppEntry)

app.use(router)
app.use(i18n)
// app.use(uploader)
initStore(app)
app.use(ElementPlus, {
  locale: zhCn as any,
})
app.use(ContextMenu)
app.component('SvgIcon', SvgIcon)

app.use(FloatingVue, {
  themes: {
    'info-tooltip': {
      distance: 24,
      delay: { show: 1000, hide: 0 }
    }
  }
})

app.mount('#app')
