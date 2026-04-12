import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import { initEventBindCloseAllContextMenu } from '@mpl/node'
import mplCloudPlatform from './index.vue'
import '../../public/theme.less'
import '../../public/layout.less'
import { initStore } from '@mpl/store'

initEventBindCloseAllContextMenu()

const app = createApp(mplCloudPlatform)

app.use(ElementPlus)
initStore(app)

app.mount('#lcsPreview')
