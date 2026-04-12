import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { initEventBindCloseAllContextMenu } from '@mpl/node'
import mplCloudPlatform from './index.vue'
import '../../public/theme.less'
import { initStore } from '@mpl/store'
import '../../public/element-plus.css'

initEventBindCloseAllContextMenu()

const app = createApp(mplCloudPlatform)

app.use(ElementPlus)
initStore(app)

app.mount('#lcsPreviewDFN')
