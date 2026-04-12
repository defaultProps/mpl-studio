import TableHeaderSortCell from './components/TableHeaderSortCell.vue'
import { App } from 'vue'

export default {
  install(app: App) {
    app.component('MplTableHeaderSortCell', TableHeaderSortCell)
  }
}