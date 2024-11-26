import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ThemeCaseUE from './ThemeCaseUE.vue'
import '../common.less'

const app = createApp(ThemeCaseUE)

app.use(ElementPlus)
app.mount('#lcsThemePreview')
