<script setup lang="ts">
import ContextMenu from '@imengyu/vue3-context-menu'
import i18nInstance from '@mpl/i18n'

interface HeaderMenuProp {
  onclick?: () => unknown
  divider: boolean
  disabled: boolean
  label: string
  value: string
  checked: boolean
}

interface HeaderTag {
  label: string
  value: string
  children: HeaderMenuProp[]
}

const headerPopoverList: HeaderTag[] = [
  {
    label: i18nInstance.global.t('headerTool.view'),
    value: 'view',
    children: [
      {
        label: i18nInstance.global.t('headerTool.commandPane'),
        value: 'commandPane',
        disabled: false,
        divider: false,
        checked: false
      },
      {
        label: '面板反转',
        value: 'workbenchReverse',
        disabled: false,
        divider: false,
        checked: false
      },
      {
        label: i18nInstance.global.t('headerTool.theme'),
        value: 'theme',
        disabled: false,
        divider: false,
        checked: false
      }
    ]
  },
  {
    label: i18nInstance.global.t('headerTool.help'),
    value: 'help',
    children: [
      {
        label: i18nInstance.global.t('headerTool.docs'),
        value: 'docs',
        disabled: false,
        divider: false,
        checked: false
      },
      {
        label: i18nInstance.global.t('headerTool.license'),
        value: 'license',
        disabled: false,
        divider: false,
        checked: false
      },
      {
        label: i18nInstance.global.t('headerTool.reportIssue'),
        value: 'reportIssue',
        disabled: false,
        divider: false,
        checked: false
      }
    ]
  },
  {
    label: i18nInstance.global.t('headerTool.system'),
    value: 'system',
    children: [
      {
        label: i18nInstance.global.t('headerTool.resetSystem'),
        value: 'resetSystem',
        disabled: false,
        divider: false,
        checked: false
      },
      {
        label: i18nInstance.global.t('headerTool.autoSave'),
        value: 'autoSave',
        disabled: false,
        divider: false,
        checked: false
      },
      {
        label: i18nInstance.global.t('headerTool.logout'),
        value: 'logout',
        disabled: false,
        divider: true,
        checked: false
      }
    ]
  }
]

function handleHeaderMenu(e: MouseEvent & { target: { offsetLeft: number } }, tag: HeaderTag) {
  e.stopPropagation()
  // visibleHeaderMenu.value = true
  // selectPopoverList.value = tag.children
  // complexContextmenuByHeaderArea(e, tag.children, tag.value)

  ContextMenu.showContextMenu({
    x: e.target.offsetLeft,
    y: 28,
    items: tag.children,
    direction: 'br',
    theme: 'mac',
    minWidth: 200,
    iconFontClass: 'icon'
  });
}

</script>

<template>
  <header class="mpl-header">
    <img src="@/assets/logo.png" alt="logo">
    <div class="title">
      MPL Studio
    </div>
    <div class="operation">
      <button v-for="tag in headerPopoverList" :key="tag.value" :class="tag.value"
        @click="handleHeaderMenu($event as any, tag)">
        {{ tag.label }}
      </button>
    </div>
  </header>
</template>

<style lang="less">
.mpl-header .operation button.focus {
  background: #3333338a !important;

  &:hover,
  &:focus {
    background: #3333338a;
  }
}
</style>

<style lang="less" scoped>
.mpl-header {
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  background-color: var(--primary-color);
  color: var(--color-7);
  flex-shrink: 0;
  flex-grow: 0;

  >.title {
    margin-left: 5px;
    font-weight: 600;
    font-size: 16px;
    height: 100%;
    line-height: 30px;
    user-select: none;
  }

  img {
    height: 20px;
    width: auto;
    user-select: none;
    -webkit-user-drag: none;
    margin-left: 6px;
  }

  .operation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    height: 100%;

    button {
      padding: 0 7px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 22px;
      font-size: 12px;
      border-radius: 3px;
      cursor: pointer;
      font-weight: normal;
      color: var(--color-7);
      background-color: transparent;
      border: none;
      outline: none;

      &:hover {
        background: #3333338a;
      }
    }
  }
}
</style>
