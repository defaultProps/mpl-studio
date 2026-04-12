import { createApp } from 'vue'
import index from './index.vue'
import '../common.less'
import '../../theme.less'

const app = createApp(index)

app.mount('#mplAnnotationRoot')
