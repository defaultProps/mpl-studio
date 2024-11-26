import { createApp } from "vue";
import AppEntry from "./AppEntry.vue";
import router from "./router";
import "./assets/common.less";
import "./theme.less";
import "./utils/monacoWorker";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './wangeditor.css'
import mplStore from '@mpl/store'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import './style/index.less'
import ContextMenu from '@imengyu/vue3-context-menu'

// monaco editor worker initial
import i18n from "@mpl/i18n";

const app = createApp(AppEntry);

app.use(router);
app.use(i18n);
app.use(ContextMenu);
mplStore.initStore(app)
app.use(ElementPlus);
app.use(FloatingVue, {
  themes: {
    "info-tooltip": {
      distance: 24,
      delay: { show: 1000, hide: 0 },
    },
  },
});

app.mount("#app");
