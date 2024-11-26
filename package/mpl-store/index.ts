import { viewStore } from './viewStore'
import { projectStore } from './projectStore'
import userStore from './userStore'
import { createPinia } from 'pinia'
import { workbenchStore } from './workbenchStore'

export * from './workbenchStore'
export * from './viewStore'
export * from './projectStore'

function initStore(vue: any) {
  vue.use(createPinia())
}

export default {
  viewStore,
  projectStore,
  workbenchStore,
  userStore,
  initStore
}