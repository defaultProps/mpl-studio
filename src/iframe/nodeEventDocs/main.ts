import { createApp } from 'vue'
import docsApp from './docsApp.vue'
import '../common.less'

const app = createApp(docsApp)

app.mount('#MPLStudioDocs')
