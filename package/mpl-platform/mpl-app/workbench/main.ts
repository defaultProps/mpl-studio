import { createApp } from 'vue'
import Vant from 'vant'
import 'element-plus/dist/index.css'
import { closeTopContextMenu } from '@mpl/node'
import mplCloudPlatform from './index.vue'
import '../../public/theme-var1.css'
import '../../public/theme.less'
import '../../public/layout.less'
import 'vant/lib/index.css'
import './vant4.less'
import mplStore from '@mpl/store'

function closeAllContextMenu() {
  closeTopContextMenu()
}

document.addEventListener('contextmenu', closeAllContextMenu)
document.addEventListener('click', closeAllContextMenu)
document.addEventListener('mousewheel', closeAllContextMenu)

const app = createApp(mplCloudPlatform)

app.use(Vant)
mplStore.initStore(app)

app.mount('#lcsWorkbenchDFN')
