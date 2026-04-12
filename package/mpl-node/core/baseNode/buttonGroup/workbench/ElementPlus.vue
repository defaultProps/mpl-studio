<script lang="ts" setup>
import SlotRenderNode from '../../../../components/SlotRenderNode.vue'
import type { ButtonGroupProp } from '../define'

const props = defineProps<{ node: ButtonGroupProp }>()
</script>
<template>
  <SlotRenderNode :nodes="props.node.slotNodes.filter(v => v.pos === 'l')" />
  <el-button-group>
    <el-button>
      标题1
    </el-button>
    <el-button>
      标题2
    </el-button>
    <el-button>
      标题3
    </el-button>
  </el-button-group>
  <SlotRenderNode :nodes="props.node.slotNodes.filter(v => v.pos === 'r')" />
</template>

<style lang="less" scoped>
.el-button-group {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;
}

button.note-btn {
  height: 32px;
  line-height: 32px;
  user-select: none;

  &.mpl-primary-btn {
    position: relative;
    pointer-events: none;
    width: calc(100% - 10px);

    span {
      overflow: hidden;
    }
  }
}
</style>
