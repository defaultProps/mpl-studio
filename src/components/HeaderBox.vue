<script setup lang="ts">
import ContextMenu from '@imengyu/vue3-context-menu'
import { projectStore } from '@mpl/store'
import themeSvg from '@/assets/svg/theme.svg'

const project = projectStore()
const headerPopoverList = [
  {
    label: '视图',
    children: () => [
      {
        label: '命令面板',
        icon: 'icon icon-document-copy',
        onClick: () => {
          console.log('命令面板')
          project.updateActiveFile({ title: '命令面板', id: 'commandPane', type: 'commandPane', pageInfo: {} }, true)
        }
      },
      {
        label: '面板反转',
        icon: 'icon icon-document-copy',
        onClick: () => {
          console.log('面板反转')
        }
      },
      {
        label: '主题',
        disabled: false,
        icon: 'icon icon-theme',
        // svgIcon: themeSvg,
        checked: false,
        children: [
          {
            label: '暗色主题',
            disabled: false,
            icon: document.body.classList.contains('dark-theme') ? 'icon icon-check' : '',
            onClick: () => {
              document.body.classList.remove('light-theme')
              document.body.classList.remove('blue-theme')
              document.body.classList.add('dark-theme')
              localStorage.setItem('theme', 'dark')
            }
          },
          {
            label: '深青主题',
            disabled: false,
            icon: document.body.classList.contains('light-theme') ? 'icon icon-check' : '',
            onClick: () => {
              document.body.classList.remove('dark-theme')
              document.body.classList.remove('blue-theme')
              document.body.classList.add('light-theme')
              localStorage.setItem('theme', 'light')
            }
          },
          {
            label: '深蓝主题',
            disabled: false,
            icon: document.body.classList.contains('blue-theme') ? 'icon icon-check' : '',
            onClick: () => {
              document.body.classList.remove('dark-theme')
              document.body.classList.remove('light-theme')
              document.body.classList.add('blue-theme')
              localStorage.setItem('theme', 'blue')
            }
          }
        ]
      },
      {
        label: '风格',
        disabled: false,
        checked: false,
        children: [
          {
            label: '硬朗工业风格',
            disabled: false,
            icon: document.body.classList.contains('hard-style') ? 'icon icon-check' : '',
            checked: false,
            onClick: () => {
              document.body.classList.remove('soft-style')
              document.body.classList.add('hard-style')
              localStorage.setItem('mpl-style', 'hardStyle')
            }
          },
          {
            label: '护眼柔和风格',
            disabled: false,
            icon: document.body.classList.contains('soft-style') ? 'icon icon-check' : '',
            checked: false,
            onClick: () => {
              document.body.classList.remove('hard-style')
              document.body.classList.add('soft-style')
              localStorage.setItem('mpl-style', 'softStyle')
            }
          }
        ]
      },
      {
        label: '自动保存',
        icon: 'icon icon-check',
        disabled: true,
        onClick: () => {
          console.log('自动保存')
        }
      },
    ]
  },
  {
    label: '帮助',
    children: () => [
      {
        label: '文档',
        disabled: false,
        checked: false
      },
      {
        label: '许可证',
        disabled: false,
        checked: false
      },
      {
        label: '建议提问',
        disabled: false,
        checked: false
      }
    ]
  },
  {
    label: '系统',
    children: () => [
      {
        label: '重置系统',
        disabled: false,
        checked: false
      },
      {
        label: '自动保存',
        disabled: false,
        checked: false
      },
      {
        label: '退出登录',
        disabled: false,
        checked: false
      }
    ]
  }
]

function handleHeaderMenu(event: MouseEvent, value: any) {
  if (!value.children) {
    value.onClick?.()
    return
  }

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  ContextMenu.showContextMenu({
    x: rect.left,
    y: 30,
    items: value.children()
  })
}

function clickTodo() {
  // 直接跳转 teambition 待办列表
  window.open('https://www.teambition.com/project/5ddfc33d6faa730018b2d52c/sprint/view/69c5f2f03bd76cf45c404c59', '_blank')
}
</script>

<template>
  <header class="mpl-header--line">
    <img src="/src/assets/logo.png" alt="logo">
    <div class="title">
      MPL Studio
    </div>
    <button v-for="subMenu in headerPopoverList" @click="handleHeaderMenu($event, subMenu)">
      {{ subMenu.label }}
    </button>
    <button class="todo-btn" style="margin: 0 10px 0 auto" @click="clickTodo">待办</button>
  </header>
</template>

<style lang="less">
.mpl-header--line .operation button.focus {
  background: #3333338a !important;

  &:hover,
  &:focus {
    background: #3333338a;
  }
}
</style>

<style lang="less" scoped>
.mpl-header--line {
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--primary-color);

  >.title {
    margin-left: 5px;
    font-weight: 600;
    font-size: 16px;
    height: 100%;
    line-height: 30px;
    user-select: none;
    font-style: oblique;
    color: #ffffff;
    margin: 0 10px 0 6px;
    position: relative;
    top: -1px;
  }

  img {
    height: 20px;
    width: auto;
    user-select: none;
    -webkit-user-drag: none;
    margin-left: 6px;
  }

  button {
    font-size: 12px;
    padding: 0 7px;
    height: 22px;
    line-height: 22px;
    border-radius: var(--radius-3);
    color: #ffffff;
    background: transparent;
    border: none;
    outline: none;
    user-select: none;
    cursor: pointer;

    &:hover {
      background-color: #505050c2;
    }
  }
  
}
</style>
