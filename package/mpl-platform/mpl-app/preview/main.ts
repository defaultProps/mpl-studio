import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createPinia } from 'pinia'
import Vant from 'vant'
import App from './index.vue'
import 'vant/lib/index.css'
import './vant4.less'

const app = createApp(App)

app.use(Vant)
app.use(createPinia())

app.mount('#lcsWorkbenchMHS')
