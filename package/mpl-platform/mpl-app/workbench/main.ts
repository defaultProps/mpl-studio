import { createApp } from 'vue'
import Vant from 'vant'
import 'element-plus/dist/index.css'
import { initEventBindCloseAllContextMenu } from '@mpl/node'
import mplCloudPlatform from './index.vue'
import '../../public/theme.less'
import '../../public/layout.less'
import 'vant/lib/index.css'
import './vant4.less'
import { initStore } from '@mpl/store'

initEventBindCloseAllContextMenu()

const app = createApp(mplCloudPlatform)

app.use(Vant)
initStore(app)

app.mount('#app')
