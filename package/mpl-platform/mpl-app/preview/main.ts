import { createApp } from 'vue'
import Vant from 'vant'
import App from './index.vue'
import 'vant/lib/index.css'
import './vant4.less'

const app = createApp(App)

app.use(Vant)

app.mount('#lcsWorkbenchDFN')
