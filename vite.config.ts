import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import VueDevTools from 'vite-plugin-vue-devtools'
import { default as monacoEditorPlugin } from 'vite-plugin-monaco-editor-esm'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

function resolvePath(path: string) {
  return resolve(__dirname, path)
}

function resolveIframe() {
  const iframes = ['docs', 'icon', 'image', 'javascriptPackage', 'annotation', 'comment', 'eventFlow', 'nodeUI']
}

export default defineConfig({
  base: './',
  define: {
    'process.env': {},
    global: 'globalThis'
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'element-plus'
    ],
    exclude: [
      '@xenova/transformers',
    ]
  },
  worker: {
    format: 'es'
  },
  plugins: [
    monacoEditorPlugin({
      languageWorkers: ['json', 'css', 'html', 'typescript'],
    }),
    vue(),
    vueJsx(),
    eslintPlugin({
      fix: true,
      lintOnStart: false,
      exclude: ['**/node_modules/**', 'pnpm-lock.yaml', 'tsconfig.tsbuildinfo', 'vite-env.d.ts'],
      failOnWarning: true,
      cache: true
    }),
    // VueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: {
        plugins: [
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false, // 关闭自动打开浏览器
    proxy: {
      '/api': {
        target: '127.0.0.0:3333/api',
        changeOrigin: true
      },
      // 将 /api 等前缀的请求代理到 LibreTranslate
      '/api/translate': {
        target: 'https://libretranslate.de',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // 可选：如果目标服务器需要特定 headers
        configure: (proxy, options) => {
          // 可在此添加日志或额外配置
        }
      }
    },
    hmr: false
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolvePath('index.html'),
        workbenchDFN: resolvePath('package/mpl-platform/mpl-dfn/workbench/index.html'),
        // workbenchApp: resolvePath('package/mpl-platform/mpl-app/workbench/index.html'),
        // workbenchSMS: resolvePath('package/mpl-platform/mpl-sms/workbench/index.html'),
        docsIframe: resolvePath('src/iframe/docs/index.html'),
        annotationIframe: resolvePath('src/iframe/annotation/index.html'),
        // iconPreview: resolvePath('src/iframe/icon/index.html'),
        // mplImageIframe: resolvePath('src/iframe/image/index.html'),
        // JSPackageIframe: resolvePath('src/iframe/javascriptPackage/index.html'),
        // nodeUI: resolvePath('src/iframe/nodeUI/index.html')
      },
      output: {
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        compact: true,
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus', '@element-plus/icons-vue'],
          'monaco-editor': ['monaco-editor'],
          'echarts': ['echarts'],
          'utils': ['lodash', 'axios', '@vueuse/core']
        }
      }
    },
    commonjsOptions: {
      esmExternals: true
    },
    outDir: 'dist',
    assetsDir: 'static',
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': resolvePath('src'),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }
})
