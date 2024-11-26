import App from './App.vue'

export const mplIframe = App
export default {
  install(vue: any) {
    vue.component('mpl-iframe', App)
  }
}

