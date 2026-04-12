import type { TableColumn, ColumnUIType } from './define'
import { newCid } from '@mpl/libs'

export const newColumn = (cid = newCid()): TableColumn => {
  return {
    renderNode: 'text',
    label: {
      text: '标题',
      icon: '',
      iconTheme: '',
      iconText: '',
      iconPos: 'l',
      customStrEvt: '',
      pos: 'l',
      align: 'l',
      width: '',
      sort: {
        visible: false,
        type: 'single'
      },
      filter: {
        visible: false,
        cid: '',
        customStr: ''
      }
    },
    cid: newCid('column'),
    prop: cid,
    formatterType: '',
    fixed: 'l',
    width: 120,
    showTip: true,
    minWidth: 'auto',
    classNameEvt: '',
    children: []
  }
}

export const initTableColumn = (): TableColumn[] => [
  {
    renderNode: 'text',
    label: {
      text: '姓名',
      icon: '',
      iconTheme: '',
      iconText: '',
      iconPos: 'l',
      customStrEvt: '',
      pos: 'l',
      align: 'l',
      width: '',
      sort: {
        visible: false,
        type: 'single'
      },
      filter: {
        visible: false,
        cid: '',
        customStr: ''
      }
    },
    cid: newCid('column'),
    prop: 'username',
    formatterType: '',
    fixed: 'l',
    width: 120,
    showTip: true,
    minWidth: 'auto',
    classNameEvt: '',
    children: []
  },
  {
    renderNode: 'text',
    label: {
      text: '工号',
      icon: '',
      iconTheme: '',
      iconText: '',
      iconPos: 'l',
      customStrEvt: '',
      pos: 'l',
      align: 'l',
      width: '',
      sort: {
        visible: false,
        type: 'single'
      },
      filter: {
        visible: true,
        cid: '',
        customStr: ''
      }
    },
    cid: newCid('column'),
    prop: 'workNumber',
    formatterType: '',
    fixed: 'l',
    width: 120,
    showTip: true,
    minWidth: 'auto',
    classNameEvt: '',
    children: []
  },
  {
    renderNode: 'text',
    label: {
      text: '邮箱',
      icon: '',
      iconTheme: '',
      iconText: '',
      iconPos: 'l',
      customStrEvt: '',
      pos: 'l',
      align: 'l',
      width: '',
      sort: {
        visible: false,
        type: 'single'
      },
      filter: {
        visible: false,
        cid: '',
        customStr: ''
      }
    },
    cid: newCid('column'),
    prop: 'email',
    formatterType: '',
    fixed: 'l',
    width: 120,
    showTip: true,
    minWidth: 'auto',
    classNameEvt: '',
    children: []
  },
  {
    renderNode: 'text',
    label: {
      text: '邮箱密码',
      icon: '',
      iconTheme: '',
      iconText: '',
      iconPos: 'l',
      customStrEvt: '',
      pos: 'l',
      align: 'l',
      width: '',
      sort: {
        visible: false,
        type: 'single'
      },
      filter: {
        visible: false,
        cid: '',
        customStr: ''
      }
    },
    cid: newCid('column'),
    prop: 'password',
    formatterType: '',
    fixed: 'l',
    width: 120,
    showTip: true,
    minWidth: 'auto',
    classNameEvt: '',
    children: []
  },
  {
    renderNode: 'text',
    label: {
      text: '司龄',
      icon: '',
      iconTheme: '',
      iconText: '',
      iconPos: 'l',
      customStrEvt: '',
      pos: 'l',
      align: 'l',
      width: '',
      sort: {
        visible: false,
        type: 'single'
      },
      filter: {
        visible: false,
        cid: '',
        customStr: ''
      }
    },
    cid: newCid('column'),
    prop: 'seniority',
    formatterType: '',
    fixed: 'l',
    width: 120,
    showTip: true,
    minWidth: 'auto',
    classNameEvt: '',
    children: []
  },
  {
    renderNode: 'text',
    label: {
      text: '年龄',
      icon: '',
      iconTheme: '',
      iconText: '',
      iconPos: 'l',
      customStrEvt: '',
      pos: 'l',
      align: 'l',
      width: '',
      sort: {
        visible: false,
        type: 'single'
      },
      filter: {
        visible: false,
        cid: '',
        customStr: ''
      }
    },
    cid: newCid('column'),
    prop: 'age',
    formatterType: '',
    fixed: 'l',
    width: 120,
    showTip: true,
    minWidth: 'auto',
    classNameEvt: '',
    children: []
  }
]

// 表格列UI展示类型 / 即：只读查看时的状态
export const getTableColumnUIOptions = (): { label: string, children: { label: string, value: ColumnUIType }[] }[] => [
  {
    label: '普通文本展示',
    children: [
      { label: '按钮', value: 'button' },
      { label: '链接', value: 'link' },
      { label: '图片', value: 'img' },
      { label: '图片列表', value: 'imgList' },
      { label: '附件', value: 'upload' },
      { label: '附件列表', value: 'uploadList' },
      { label: '文本', value: 'text' },
      { label: '多行文本', value: 'textarea' },
      { label: '密码', value: 'password' },
      { label: '页签', value: 'tabs' },
      { label: '进度条', value: 'progress' },
      { label: '金额', value: 'money' },
      { label: '地址', value: 'address' },
      { label: '邮箱', value: 'email' },
      { label: '电话', value: 'telephone' },
      { label: 'html格式', value: 'html' },
    ]
  },
  {
    label: '日期文本展示',
    children: [
      { label: '日期 2025', value: 'yyyy' },
      { label: '日期 2025-08', value: 'yyyy-MM' },
      { label: '日期 2025-08-12', value: 'yyyy-MM-dd' },
      { label: '日期 2025-08-12 12:05', value: 'yyyy-MM-dd hh:mm' },
      { label: '日期 2025-08-12 12:05:30', value: 'yyyy-MM-dd hh:mm:ss' },
      { label: '日期范围 2025 ~ 2028', value: 'yyyy ~ yyyy' },
      { label: '日期范围 2025-08 ~ 2025-08', value: 'yyyy-MM ~ yyyy-MM' },
      { label: '日期范围 2025-08-12 ~ 2025-08-12', value: 'yyyy-MM-dd ~ yyyy-MM-dd' },
      { label: '日期范围 2025-08-12 12:05 ~ 2025-08-12 12:05', value: 'yyyy-MM-dd hh:mm ~ yyyy-MM-dd hh:mm' },
      { label: '日期范围 2025-08-12 12:05:30 ~ 2025-08-12 12:05:30', value: 'yyyy-MM-dd hh:mm:ss ~ yyyy-MM-dd hh:mm:ss' },
    ]
  },
  {
    label: '复合展示',
    children: [
      { label: '自定义单节点', value: 'customSingleNode' },
      { label: '自定义循环节点', value: 'customLoopNode' }
    ]
  },
  {
    label: '表单输入组件',
    children: [
      { label: '基础输入', value: 'baseInput' },
      { label: '提及输入', value: 'mentionInput' },
      { label: '多行输入', value: 'textarea' },
      { label: '密码输入', value: 'passwordInput' },
      { label: '数字输入', value: 'numberInput' },
      { label: '数字范围', value: 'numberRange' },
      { label: '标签输入', value: 'tagInput' },
      { label: '单选框', value: 'radio' },
      { label: '多选框', value: 'checkbox' },
      { label: '下拉', value: 'select' },
      { label: '时间下拉', value: 'timeSelect' },
      { label: '虚拟下拉', value: 'virtualSelect' },
      { label: '树形下拉', value: 'treeSelect' },
      { label: '弹框选择', value: 'selectDialog' },
      { label: '附件上传', value: 'upload' },
      { label: '图片上传', value: 'imageUpload' },
      { label: '颜色选择', value: 'colorPicker' },
      { label: '日期选择', value: 'datePicker' },
      { label: '日期范围', value: 'dateRangePicker' },
    ]
  }
]

// 表格列 -数据格式化【都是使用API调用，可通过IDE删除或者修改，提高扩展性】 仅展示常用API
export const tableColumnValueFormatOptions = [
  { label: '默认', value: '', title: '不处理数据，直接展示' },
  { label: '人民币金额', value: 'mony', title: '以三位分隔逗号、保留小数点后2位、人民币图标前置' },
  // { label: '数字金额转简体中文', value: 'moneyToSimplified', title: '显示中文金额简体且保留小数点后2位' },
  { label: '数字金额转繁体中文(1688.99 = 壹仟陆佰捌拾捌元玖角玖分)', value: 'moneyToTraditional', title: '显示中文金额繁体且保留小数点后2位' },
  { label: '日期（年月日）1985-08-13', value: 'yyyy-MM-dd', title: '日期格式化，仅支持毫秒数格式化展示' },
  { label: '日期（年月日时分）1985-08-13 12:05', value: 'yyyy-MM-dd hh:mm', title: '日期格式化，仅支持毫秒数格式化展示' },
  { label: '日期（年月日时分秒）1985-08-13 12:05:45', value: 'yyyy-MM-dd hh:mm:ss', title: '日期格式化，仅支持毫秒数格式化展示' },
  { label: '日期范围（年月日）1985-08-13 - 1997-06-05', value: 'yyyy-MM-dd - yyyy-MM-dd', title: '日期格式化，仅支持毫秒数格式化展示' },
  { label: '日期范围（年月日时分）1985-08-13 12:05 - 1997-06-05 12:05', value: 'yyyy-MM-dd - yyyy-MM-dd hh:mm', title: '日期格式化，仅支持毫秒数组格式化展示' },
  { label: '日期范围（年月日时分秒）1985-08-13 12:05:45 - 1997-06-05 12:05:45', value: 'yyyy-MM-dd - yyyy-MM-dd hh:mm:ss', title: '日期格式化，仅支持毫秒数组格式化展示' },
  { label: '选项格式', value: 'selectMap', title: '常规映射格式化 key => value 提供用户 值展示关系' },
  { label: '反转格式', value: 'triggerStatus', title: '内置点击事件 切换状态。仅支持俩种状态格式化' },
  { label: 'HTML格式嵌入', value: 'html', title: '注意XSS攻击' },
  { label: '大写字母', value: 'upperStr', title: '字母转大写字母' },
  { label: '简体中文', value: 'simplified', title: '繁体中文转简体中文' },
  { label: '繁体中文', value: 'traditional', title: '简体中文转繁体中文' }
]

export const initTableData = () => [
  {
    username: '竹浩然',
    workNumber: '08456',
    email: 'zuhaoran@tx.com',
    password: 'j/2y)f=z',
    seniority: 7,
    age: 27
  },
  {
    username: '易依',
    workNumber: '00457',
    email: 'yiyi@tx.com',
    password: 'j/2y)f=z',
    seniority: 7,
    age: 27
  },
  {
    username: '叶婷',
    workNumber: '04275',
    email: 'zuhaoran@tx.com',
    password: 'j/2y)f=z',
    seniority: 7,
    age: 27
  },
  {
    username: '高彨',
    workNumber: '09148',
    email: 'zuhaoran@tx.com',
    password: 'j/2y)f=z',
    seniority: 7,
    age: 27
  },
  {
    username: '方学海',
    workNumber: '01877',
    email: 'zuhaoran@tx.com',
    password: 'j/2y)f=z',
    seniority: 7,
    age: 27
  },
  {
    username: '邓俊哲',
    workNumber: '00448',
    email: 'zuhaoran@tx.com',
    password: 'j/2y)f=z',
    seniority: 7,
    age: 27
  }
]
