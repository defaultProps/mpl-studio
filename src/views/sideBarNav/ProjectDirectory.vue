<script lang="ts" setup>
import { projectStore } from '@mpl/store'
import ContextMenu from '@imengyu/vue3-context-menu'
import { File } from '@mpl/typings'

const project = projectStore()

function clickTreeNode(node: any) {
  if (node.type !== 'folder') {
    project.updateActiveFile(node, false)
  }
}

function pageTitle(obj: any) {
  const title = `🗂️标题：${obj.title}\n`
  const user = `👨‍🌾当前用户：许丽\n`
  const saveUsersName = `👨‍🌾参与用户[12]：张琳、林芝、许丽、赵倩、孙超然、李谈...\n`
  const description = `📧页面描述：页面描述信息\n`
  const lastUpdateTime = `🍗最新更新：2023-12-12 09:23`

  return `${title}${user}${saveUsersName}${description}${lastUpdateTime}`
}

function handleNodeContextmenu(event: any, data: any) {
  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    items: [
      {
        label: "锁定编辑",
        icon: 'icon-lock-fill icon',
        onClick: () => { }
      },
      {
        label: "导入模板文件",
        icon: 'icon-upload2 icon',
        onClick: () => { }
      },
      {
        label: "新建文件夹"
      },
      {
        label: "新建页面",
        divided: true
      },
      {
        label: "查找",
        children: [
          { label: "文件内查找" },
          { label: "文件夹内查找" },
        ]
      },
      {
        label: '预览',
        children: [
          { label: "事件预览" },
          { label: "节点预览" },
          { label: "展开项目" },
        ],
        divided: true
      },
      {
        label: '复制页面'
      },
      {
        label: '复制地址'
      },
      {
        label: '剪切'
      },
      {
        label: '粘贴',
        divided: true
      },
      {
        label: "查看",
        children: [
          { label: "配置信息" }, // 展示页面中所有组件, 事件, 节点, 样式, 主题, 前端API, 服务API, 三方资源, 混入, 图标库, 绑定服务接口等汇总信息
          { label: "历史记录" }, // 展示用户,编辑时间范围,保存次数,编辑内容
          { label: "折叠项目" }, // 页面较多时，一键折叠
          { label: "展开项目" }, // 页面较多时，一键展开
        ],
        divided: true
      },
      {
        label: '重命名',
        divided: true
      },
      {
        label: '删除'
      }
    ]
  });
}

function handleContextmenu(event: MouseEvent) {
  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    items: [
      {
        label: "新建页面"
      },
      {
        label: "新建路由文件夹"
      },
      {
        label: '粘贴'
      },
      {
        label: '同步到平台页面'
      },
      {
        label: "查找",
        children: [
          { label: "文件内查找" },
          { label: "文件夹内查找" },
        ]
      },
      {
        label: "查看",
        children: [
          { label: "项目信息" },
          { label: "折叠项目" },
          { label: "展开项目" }
        ]
      }
    ]
  })
}

function handleProjectDetail() {
  const newProjectFile: File = {
    title: '项目详情',
    id: 'projectDetail',
    type: 'projectDetail',
    pageInfo: {}
  }
  project.updateActiveFile(newProjectFile, true)
}

</script>

<template>
  <div class="mpl-project--container mpl-scroll-none" @contextmenu.prevent="handleContextmenu">
    <div class="project-title" :title="project.activeProject?.name || ''" @contextmenu.prevent.stop
      @click="handleProjectDetail">
      {{ project.activeProject?.name }}
    </div>
    <div class="search-box" @contextmenu.prevent.stop>
      <input type="text" placeholder="查询页面">
      <button type="button" class="mpl-btn ml-5">
        <img src="@/assets/expand.svg" alt="">
      </button>
    </div>
    <el-tree :data="project.projectTree" highlight-current @node-click="clickTreeNode"
      @node-contextmenu="handleNodeContextmenu">
      <template #default="{ data }">
        <div class="mpl-tree-line-node" :title="pageTitle(data)">
          <img v-if="data.type === 'folder'" src="@/assets/file.png" alt="">
          <img v-else src="@/assets/page.svg" alt="logo">
          <span class="tree-node--title">
            {{ data.title }}
          </span>
        </div>
      </template>
    </el-tree>
  </div>
</template>
<style lang="less" scoped>
/* 穿透 scoped 样式，覆盖 Tree 动画（关键） */
// :deep(.el-tree-node__children) {
  /* 禁用过渡动画 */
  // transition: none !important;
  /* 移除动画相关的高度计算（可选，避免残留动画效果） */
  // height: auto !important;
// }

/* 可选：禁用节点展开/折叠图标的旋转动画 */
// :deep(.el-tree-node__expand-icon) {
//   transition: none !important;
// }

.mpl-project--container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  height: 100%;

  .project-title {
    color: var(--primary-color);
    text-align: center;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 9px 5px;
    text-decoration: underline;

    &:hover {
      text-decoration-thickness: 2px;
    }
  }

  .search-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    
    overflow: inherit;
    margin-bottom: 10px;

    input {
      border: 1px solid #ccc;
      height: 26px;
      width: 100%;
      border-radius: var(--radius-2);
      font-size: 12px;
      background: #efefef;
      text-indent: 4px;
    }

    button {
      min-width: 30px;
      min-height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
