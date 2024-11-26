import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import ElementPlus from 'unplugin-element-plus/vite'

function resolvePath(path: string) {
  return resolve(__dirname, path)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    ElementPlus({
      useSource: true
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  build: {
    target: 'es2015',
    minify: true,
    rollupOptions: {
      input: {
        main: resolvePath('index.html'),
        workbenchDFN: resolvePath('package/mpl-platform/mpl-dfn/workbench/index.html'),
        workbenchApp: resolvePath('package/mpl-platform/mpl-app/workbench/index.html'),
        workbenchSMS: resolvePath('package/mpl-platform/mpl-sms/workbench/index.html'),
        themePreview: resolvePath('src/iframe/theme/index.html'),
        docsIframe: resolvePath('src/iframe/docs/index.html'),
        iconPreview: resolvePath('src/iframe/icon/index.html'),
        mplImageIframe: resolvePath('src/iframe/image/index.html'),
        JSPackageIframe: resolvePath('src/iframe/javascriptPackage/index.html'),
        annotationIframe: resolvePath('src/iframe/annotation/index.html'),
        commentIframe: resolvePath('src/iframe/comment/index.html'),
        eventFlowIframe: resolvePath('src/iframe/eventFlow/index.html')
      },
      output: {
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 静态文件输出的文件夹名称
        chunkFileNames: 'js/[name]-[hash].js', // chunk包输出的文件夹名称
        entryFileNames: 'js/[name]-[hash].js', // 入口文件输出的文件夹名称
        compact: true,
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString() // 拆分多个vendors
          }
        }
      }
    },
    outDir: 'dist',
    assetsDir: 'static'
  },
  resolve: {
    alias: {
      '@': resolvePath('src')
    }
  }
})
