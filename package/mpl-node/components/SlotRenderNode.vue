<script setup lang="ts">
const props = defineProps<{ nodes: any[] }>()
</script>
<template>
  <template v-for="n in props.nodes">
    <el-button v-if="n.tag === 'btn'" :class="[n.icon, 'icon mr-5']" :type="n.metaInfo.ui">
      <component :is="n.metaInfo.icon" style="width: 14px" />
      {{ n.metaInfo.txt }}
    </el-button>
    <el-text v-else-if="n.tag === 'txt'" class="mx-1">
      {{ n.metaInfo.txt }}
    </el-text>
    <el-link v-else-if="n.tag === 'link'" underline="always" style="line-height: normal;">
      {{ n.metaInfo.txt }}
    </el-link>
    <el-input v-else-if="n.tag === 'input'" v-model="n.metaInfo.model" class="mr-5"
      :placeholder="n.metaInfo.placeholder" :clearable="n.metaInfo.clearable" />
    <component :is="n.metaInfo.icon" v-else-if="n.tag === 'icon'" style="margin-right: 5px"
      :style="{ color: n.metaInfo.iconColor }" />
  </template>
</template>