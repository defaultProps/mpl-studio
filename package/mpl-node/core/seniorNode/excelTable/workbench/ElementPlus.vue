<script lang="ts" setup>
import type { ExcelTableProp } from '../define'
import { inject, ref } from 'vue'
import { AgGridVue } from "ag-grid-vue3"
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community"

ModuleRegistry.registerModules([AllCommunityModule])

const theme = themeQuartz.withParams({
  borderColor: "#cccccc",
  wrapperBorder: true,
  headerRowBorder: true,
  rowBorder: { style: 'solid' },
  columnBorder: { style: 'solid' },
  headerHeight: "42px",
  headerTextColor: "#333",
  headerBackgroundColor: "#e6e6e6",
});

const props = defineProps<{ node: ExcelTableProp }>()
const updateNodeProp = inject('updateNodeProp') as any
const activeNode = ref<ExcelTableProp>(props.node)

const rowData = ref([
  { make: "Tesla", username: '张三', pinyin: 'zhang san', avatar: 'https://img.yzcdn.cn/vant/ipad.png', sex: 'Male', tel: '13800138000', job: '工程师', jobNumber: '123456', email: 'zhangsan@example.com', department: '研发部', entryTime: '2021-01-01', officeAddress: '北京市海淀区' },
  { make: "Ford", username: '李四', pinyin: 'li si', avatar: 'https://img.yzcdn.cn/vant/ipad.png', sex: 'Female', tel: '13800138001', job: '设计师', jobNumber: '123457', email: 'lisi@example.com', department: '设计部', entryTime: '2021-01-02', officeAddress: '北京市朝阳区' },
  { make: "Toyota", username: '王五', pinyin: 'wang wu', avatar: 'https://img.yzcdn.cn/vant/ipad.png', sex: 'Male', tel: '13800138002', job: '经理', jobNumber: '123458', email: 'wangwu@example.com', department: '管理部', entryTime: '2021-01-03', officeAddress: '北京市昌平区' },
])

class GenderRenderer {
  eGui: any;
  init(params: any) {
    this.eGui = document.createElement('span');
    if (params.value) {
      const icon = params.value === 'Male' ? 'fa-male' : 'fa-female';
      this.eGui.innerHTML = `<i class="fa ${icon}"></i> ${params.value}`;
    }
  }

  getGui() {
    return this.eGui;
  }
  refresh() {
    return false;
  }
}

const colDefs = ref([
  {
    headerName: "姓名",
    field: "username",
    suppressFiltersToolPanel: false
  },
  {
    headerName: "拼音",
    field: "pinyin"
  },
  {
    headerName: "头像",
    field: "avatar",
  },
  {
    headerName: "性别",
    field: "sex",
    cellRenderer: GenderRenderer,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      cellRenderer: GenderRenderer,
      values: ["Male", "Female"],
      valueListGap: 10
    },
  },
  {
    headerName: "电话号码",
    field: "tel"
  },
  {
    headerName: "职位",
    field: "job"
  },
  {
    headerName: "工号",
    field: "jobNumber"
  },
  {
    headerName: "邮箱",
    field: "email"
  },
  {
    headerName: "部门",
    field: "department"
  },
  {
    headerName: "入职时间",
    field: "entryTime"
  },
  {
    headerName: "办公地点",
    field: "officeAddress"
  },
]);

</script>

<template>
  <div class="mpl-ag-grid-table is-workbench" draggable="false" style="width: 100%;height: 100%">
    <AgGridVue :row-data="rowData" :column-defs="colDefs" :theme="theme" style="width: 100%;height: 100%" />
    <!-- <mplPagination :node="activeNode.pagination" /> -->
    <!-- 遮罩层 - 禁止操作表格 -->
    <!-- <div class="mask-table-workbench" /> -->
  </div>
</template>