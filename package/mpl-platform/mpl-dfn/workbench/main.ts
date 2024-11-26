import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { closeTopContextMenu } from '@mpl/node'
import mplCloudPlatform from './index.vue'
import '../../public/theme-var1.css'
import '../../public/theme.less'
import '../../public/layout.less'
import mplStore from '@mpl/store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function closeAllContextMenu() {
  closeTopContextMenu()
}

document.addEventListener('contextmenu', closeAllContextMenu)
document.addEventListener('click', closeAllContextMenu)
document.addEventListener('mousewheel', closeAllContextMenu)

const app = createApp(mplCloudPlatform)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
mplStore.initStore(app)


app.mount('#lcsWorkbenchDFN')
