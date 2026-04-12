import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import { initEventBindCloseAllContextMenu } from '@mpl/node'
import mplCloudPlatform from './index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { initStore } from '@mpl/store'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ModuleRegistry } from 'ag-grid-community'
import { AllEnterpriseModule, LicenseManager } from 'ag-grid-enterprise'
import { ClientSideRowModelModule, CsvExportModule } from 'ag-grid-community'
// 批量导入所有 Lucide Vue 图标
import * as LucideIcons from 'lucide-vue-next'
import '../../public/element-plus.css'
import '../../public/theme.less'
import '../../public/layout.less'
import '../../public/contextmenu.css'

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule, AllEnterpriseModule])

// 购买企业版许可证
// LicenseManager.setLicenseKey('')

initEventBindCloseAllContextMenu()
const app = createApp(mplCloudPlatform)

app.use(ElementPlus, {
  locale: zhCn as any,
})
initStore(app)

// ElementPlusIconsVue 和 LucideIcons 出现重名时优先使用 ElementPlusIconsVue
const allIconComponents = { ...LucideIcons, ...ElementPlusIconsVue }

// ElementPlusIconsVue 优先级高于 LucideIcons
for (const [key, component] of Object.entries(allIconComponents)) {
  app.component(key as any, component as any)
}

app.mount('#lcsWorkbenchDFN')
