<script setup lang="ts">
import { ref } from 'vue'
import mplStore from '@mpl/store'

const loading = ref<boolean>(true)
const projectStore = mplStore.projectStore()

function loadIframe() {
  loading.value = false
  const mplDocIframe = window.frames.mplDocIframe

  if (mplDocIframe) {
    mplDocIframe.postMessage(
      {
        type: 'LOAD_IFRAME_DOCS',
        payload: {
          assetsFilePath: projectStore.activeFileId ? `./markdown/${projectStore.activeFileId}.md` : ''
        }
      },
      '*'
    )
  }
}
</script>

<template>
  <div class="mpl-doc--container">
    <div
      v-show="loading"
      class="iframe-loading"
    >
      <svg viewBox="25 25 50 50">
        <circle
          cx="50"
          cy="50"
          r="20"
        />
      </svg>
      loading
    </div>
    <iframe
      src="/src/iframe/docs/index.html"
      name="mplDocIframe"
      frameborder="0"
      class="mpl-doc-iframe"
      @load="loadIframe"
    />
  </div>
</template>

<style scoped lang="less">
.mpl-doc--container {
  width: 100%;
  height: 100%;
  position: relative;
  .iframe-loading {
    position: absolute;
    background-color: var(--color-7);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    svg {
      width: 30px;
      transform-origin: center;
      animation: rotate 2s linear infinite;
      margin-right: 10px;
    }

    circle {
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 2;
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dashoffset: -125px;
      }
    }
  }
  iframe {
    border: 0;
    width: 100%;
    height: 100%;
    user-select: none;
  }
}
</style>
