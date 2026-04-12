<script setup>
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@vue-flow/core'
import { computed } from 'vue'
import { inject, ref } from 'vue'

const insertNodeInEdge = inject('insertNodeInEdge')
const isDrop = ref(false)

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  markerEnd: {
    type: String,
    required: false,
    default: ''
  },
  style: {
    type: Object,
    required: false,
    default: () => ({})
  },
})

// const { removeEdges } = useVueFlow()

const path = computed(() => getBezierPath(props))

function drop(event, id) {
  isDrop.value = false
  insertNodeInEdge(event, id)
}

function dragenter() {
  isDrop.value = true
}

function dragleave() {
  isDrop.value = false
}
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <!-- You can use the `BaseEdge` component to create your own custom edge more easily -->
  <BaseEdge :id="id" :style="style" :path="path[0]" :marker-end="markerEnd" />

  <!-- Use the `EdgeLabelRenderer` to escape the SVG world of edges and render your own custom label in a `<div>` ctx -->
  <EdgeLabelRenderer>
    <div :style="{ transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)` }"
      style="position: absolute;pointer-events: all;">
      <button type="button" class="drop-flow-btn mpl-btn" :class="{ 'is-drop': isDrop }" @drop.stop.prevent="drop($event, id)"
        @dragenter.prevent="dragenter" @dragleave.prevent="dragleave">
        +
      </button>
    </div>
  </EdgeLabelRenderer>
</template>
