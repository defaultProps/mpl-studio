<template>
  <div class="list-item" v-for="(treeNode, index) in data" :key="index">
    <div class="tree-node">
      <i class="icon icon-info"></i>
      {{ treeNode.title }}
    </div>
    <template v-if="Array.isArray(treeNode.children)">
      <mplTree :list="treeNode.children" />
    </template>

  </div>
</template>
<script>
export default {
  name: "mplTree",
  data() {
    return {
      checkedCities: []
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  }
};
</script>