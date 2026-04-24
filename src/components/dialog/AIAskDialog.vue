<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { viewStore } from '@mpl/store'
import ContextMenu from '@imengyu/vue3-context-menu'

const visible = defineModel<boolean>()
const view = viewStore()
const question = ref('')
const textareaRef = ref()
const currentHistory = ref([
  {
    role: 'user',
    description: '生成标准查询页面, 上下结构, 上层一个查询面板, 下层一个表格+分页'
  },
  {
    role: 'system',
    description: '你是一个专业的前端开发, 你好'
  }
])

interface Conversation {
  title: string
  id: string
}

const activeConversation = ref<Conversation | null>(null)
const conversationList = ref<Conversation[]>([
  {
    title: '生成一个登录页面',
    id: '1'
  },
  {
    title: '生成一个标准表格查询页面, 上下结构, 上层一个查询面板, 下层一个表格+分页',
    id: '2'
  },
  {
    title: '生成一个标准表格查询页面, 左侧目录. 右侧上下结构, 上层查询面板, 下层表格+分页',
    id: '3'
  },
  {
    title: '生成基础面板页面, 一行3个基础面板, 一共2行',
    id: '4'
  },
])

const defaultSuggestionList = ref([
  {
    title: '生成标准查询页面, 上下结构, 上层一个查询面板, 下层一个表格+分页',
    id: '1'
  },
  {
    title: '生成面板表单页面, 左侧面板表单, 右侧锚点目录关联面板节点',
    id: '2'
  },
  {
    title: '生成面板页面,一行4个面板, 一共2行. 第三行只有一个面板全宽. 第四行2个面',
    id: '3'
  }
])

function handleClose() {
  visible.value = false
  question.value = ''

  view.$patch({
    isOpenDialog: false
  })
}

function handleContextmenuMenu(event: MouseEvent, id: string) {
  event.preventDefault()

  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    items: [
      {
        label: '重命名',
        icon: 'icon icon-document-copy',
        disabled: false,
      },
      {
        label: '置顶',
        icon: 'icon icon-document-copy',
        disabled: false,
        onClick: () => { }
      },
      {
        label: '隐藏此对话',
        icon: 'icon icon-jianqie2',
        disabled: false
      },
      {
        label: '分享此对话',
        icon: 'icon icon-double-arrow-left',
        disabled: false,
        onClick: () => { }
      },
      {
        label: '批量管理',
        icon: 'icon icon-double-arro-right',
        disabled: false,
        onClick: () => { }
      },
      {
        label: '移动到分组',
        icon: 'icon icon-more',
        disabled: false,
        children: [
          {
            label: '分组1',
            icon: 'icon icon-pin2',
            disabled: false,
            onClick: () => { }
          },
          {
            label: '分组2',
            icon: 'icon icon-refresh',
            disabled: false
          },
          {
            label: '分组3',
            icon: 'icon icon-refresh',
            disabled: false
          }
        ]
      },
      {
        label: '导出对话',
        icon: 'icon icon-close1',
        disabled: false,
        onClick: () => { }
      },
      {
        label: '删除',
        icon: 'icon icon-close1',
        disabled: false,
        onClick: () => { }
      }
    ],
    zIndex: 2500
  });
}

function handleSelectQA(title: string) {
  question.value = title
  nextTick(() => {
    textareaRef.value?.focus()
  })
}

function handleKeydown(event) {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      // Shift+Enter 换行，不阻止默认行为
      return
    } else {
      // 只按 Enter 发送消息
      event.preventDefault()
      handleSubmit()
    }
  }
}

function handleSubmit() {
  if (!question.value.trim()) {
    return
  }
  console.log(question.value)
  alert('未完成等待后台AI接入')
}

function handleSelectConversation(item: Conversation) {
  activeConversation.value = item
  // currentHistory.value = []
  // 请求查看历史记录.
}
</script>

<template>
  <el-dialog v-if="visible" v-model="visible" draggable top="100px" title="AI提问" width="1300"
    class="mpl-dialog no-padding" :destroy-on-close="false" :before-close="handleClose" :close-on-press-escape="false"
    :close-on-click-modal="false">
    <div class="ai-ask--box">
      <div class="ai-ask-sidebar">
        <div class="header-new-conversation">
          <button class="new-conversation-btn">新建对话</button>
          <button title="临时私密对话, 不存储在服务器中" class="ml-5">
            <svg-icon name="secret" size="20" />
          </button>
        </div>
        <div class="menu-item" :class="{ 'is-active': activeConversation?.id === 'mySpace' }"
          @click="activeConversation = { title: '我的空间', id: 'mySpace' }">
          我的空间
        </div>
        <div class="menu-item" :class="{ 'is-active': activeConversation?.id === 'newGroup' }"
          @click="activeConversation = { title: '新分组', id: 'newGroup' }">
          新分组
        </div>
        <div class="sub-menu">历史对话</div>
        <div v-for="item in conversationList" :key="item.id" class="menu-item"
          :class="{ 'is-active': activeConversation?.id === item.id }" @click="handleSelectConversation(item)">
          <div class="menu-item-title" :title="item.title">{{ item.title }}</div>
          <button type="button" class="plaintext-btn mpl-btn icon icon-more-outline"
            @click.stop="handleContextmenuMenu($event, item.id)" />
        </div>
      </div>
      <div class="ai-ask-content">
        <div v-if="!activeConversation" class="init-conversation">
          <div class="ai-title">你好, 我是MPL-AI</div>
          <div class="usage-qa">
            <div v-for="(item, i) in defaultSuggestionList" :key="i" class="usage-qa-item" :class="`item-${item.id}`">
              <div class="label" @click="handleSelectQA(item.title)">{{ item.title }}</div>
            </div>
          </div>
          <div class="search-box">
            <textarea ref="textareaRef" v-model="question" rows="1" placeholder="请输入你的需求或问题" @keydown="handleKeydown" />
            <button class="img-btn icon icon-picture" title="导入图片,可根据图片生成相似页面" />
            <button class="file-btn icon icon-file" title="导入图片,可根据图片生成相似页面" />
            <button class="clear-btn" title="清除内容" @click="question = ''">
              <svg-icon name="clear" size="18" />
            </button>
            <button class="submit-btn" title="AI解析输入内容" :disabled="!question.trim()" @click="handleSubmit">
              <svg-icon name="submit" size="18" />
            </button>
          </div>
        </div>
        <template v-else>
          <div v-for="(item, i) in currentHistory" :key="i" class="conversation-node"
            :class="`conversation-node-${item.role}`">
            {{ item.description }}
          </div>
        </template>
      </div>
    </div>
  </el-dialog>
</template>
<style lang="less" scoped>
@keyframes anim-div1 {
  0% {
    transform: translateY(0);
  }

  16.6666% {
    transform: translateY(0);
  }

  33.3332% {
    transform: translateY(-30px);
  }

  33.3333% {
    transform: translateY(60px);
  }

  50% {
    transform: translateY(60px);
  }

  66.6666% {
    transform: translateY(30px);
  }

  83.3333% {
    transform: translateY(30px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes anim-div2 {
  0% {
    transform: translateY(30px);
  }

  16.6666% {
    transform: translateY(30px);
  }

  33.3333% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(0);
  }

  66.6665% {
    transform: translateY(-30px);
  }

  66.6666% {
    transform: translateY(60px);
  }

  83.3333% {
    transform: translateY(60px);
  }

  100% {
    transform: translateY(30px);
  }
}

@keyframes anim-div3 {
  0% {
    transform: translateY(60px);
  }

  16.6666% {
    transform: translateY(60px);
  }

  33.3333% {
    transform: translateY(30px);
  }

  50% {
    transform: translateY(30px);
  }

  66.6665% {
    transform: translateY(0);
  }

  83.3333% {
    transform: translateY(0);
  }

  99.9998% {
    transform: translateY(-30px);
  }

  99.9999% {
    transform: translateY(60px);
  }

  100% {
    transform: translateY(60px);
  }
}

.ai-ask--box {
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
  font-size: 14px;

  .ai-ask-sidebar {
    height: 100%;
    width: 230px;
    overflow: hidden;
    padding: 7px;
    border-right: 1px solid #ccc;
    background-color: #f6f8fa;

    .header-new-conversation {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      margin-bottom: 10px;

      .new-conversation-btn {
        flex: 1;
      }

      button {
        width: 35px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .menu-item {
      height: 32px;
      line-height: 32px;
      border-radius: var(--radius-5);
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      padding: 0 5px;


      &:hover {
        button {
          display: inline-block;
        }
      }

      >button {
        display: none;

        &:hover,
        &.is-active {
          display: inline-block;
          background-color: #e6e6e6;
          border: 1px solid #ccc;
        }
      }

      >.menu-item-title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;

        white-space: nowrap;
      }

      &:hover,
      &.focus {
        background-color: #ebebeb;
      }
    }

    .sub-menu {
      color: #999;
      height: 42px;
      line-height: 42px;
    }
  }

  .ai-ask-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;

    .init-conversation {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-bottom: 60px;

      >.ai-title {
        font-size: 27px;
        margin-bottom: 22px;
      }

      .usage-qa {
        font-size: 12px;
        display: inline-block;
        font-size: 14px;
        width: 700px;
        position: relative;
        height: 60px;
        overflow: hidden;

        &:hover .usage-qa-item {
          animation-play-state: paused;
        }

        .usage-qa-item {
          display: block;
          padding: 3px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;

          left: 0;
          width: 100%;
          font-size: 12px;
          color: #333;
          position: absolute;

          .label {
            border: 1px solid #333;
            border-radius: 2px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding: 2px;
            background: #ebebeb;
            cursor: pointer;
            user-select: none;

            &:hover {
              background-color: #ddd;
            }
          }
        }

        .item-1 {
          transform: translateY(0);
          animation: anim-div1 10s linear infinite;
        }

        .item-2 {
          transform: translateY(30px);
          animation: anim-div2 10s linear infinite;
        }

        .item-3 {
          transform: translateY(60px);
          animation: anim-div3 10s linear infinite;
        }
      }

      .search-box {
        min-height: 100px;
        width: 700px;
        border-radius: 2px;
        border: 1px solid #ccc;
        background: #f6f8fa;
        margin-top: 5px;
        position: relative;

        textarea {
          height: 80px; // 不出现滚动条， 动态监测内容高度.
          width: 100%;
          appearance: none;
          resize: none;
          outline: none;
          background: #f6f8fa;
          box-sizing: border-box;
          padding: 5px;
          border: none;
          max-height: 380px;
        }

        button {
          display: inline-block;
          padding: 4px 6px;
          position: absolute;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          bottom: 5px;

          &.img-btn {
            left: 5px;
          }

          &.file-btn {
            left: 42px;
          }

          &.clear-btn {
            right: 48px;
          }

          &.submit-btn {
            right: 5px;

            &[disabled] {
              cursor: not-allowed;
            }
          }
        }
      }
    }
    .conversation-node {
      margin: 0 10px;
      border: 1px solid red;
    }
  }
}
</style>