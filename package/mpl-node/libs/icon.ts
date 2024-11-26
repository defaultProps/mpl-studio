interface IconItem {
  label: string
  icon: string
}

// 常用图标 - 来源于系统图标 + 项目图标
export const commonIcons: IconItem[] = [
  { label: '提示', icon: 'icon-info-fill' },
  { label: '提示', icon: 'icon-info2' },
  { label: '标签', icon: 'icon-tag' },
  { label: '标签', icon: 'icon-tag1' },
  { label: '分割线减', icon: 'icon-line' },
  { label: '新增add加plus', icon: 'icon-plus' },
  { label: '图片', icon: 'icon-charutupian' },
  { label: '树Tree', icon: 'icon-tree2' },
  { label: '日期分割', icon: 'icon-riqifanwei2' },
  { label: '滑块', icon: 'icon-bx-slider' },
  { label: '缩放', icon: 'icon-suofang2' },
  { label: '收藏', icon: 'icon-shoucang' },
  { label: '选中', icon: 'icon-select5' },
  { label: '上', icon: 'icon-arrow-up-filling' },
  { label: '右', icon: 'icon-arrow-right-filling' },
  { label: '下', icon: 'icon-arrow-down-filling' },
  { label: '左', icon: 'icon-arrow-left-filling' },
  { label: '下拉', icon: 'icon-xiala3' },
  { label: '文件夹', icon: 'icon-wenjianjia5' },
  { label: '文件', icon: 'icon-rizhi' },
  { label: '保存', icon: 'icon-Save' },
  { label: '右对齐', icon: 'icon-youduiqi2' },
  { label: '左对齐', icon: 'icon-zuoduiqi1' },
  { label: '居中对齐', icon: 'icon-juzhongduiqi' },
  { label: '锁定lock', icon: 'icon-lock-fill' },
  { label: '解锁unlock', icon: 'icon-unlock-fill' },
  { label: '日期date时间', icon: 'icon-date2' },
  { label: '闹钟', icon: 'icon-shijian' },
  { label: '更多', icon: 'icon-more6' },
  { label: '更多', icon: 'icon-i-h-more' },
  { label: '更多', icon: 'icon-gengduomore13' },
  { label: '更多', icon: 'icon-MPIS-More' },
  { label: '新增', icon: 'icon-more3' },
  { label: '皮肤主题theme', icon: 'icon-theme' },
  { label: '皮肤主题theme', icon: 'icon-theme1' },
  { label: '用户', icon: 'icon-user' },
  { label: '刷新', icon: 'icon-shuaxin' },
  { label: '编辑', icon: 'icon-bianji' },
  { label: '文件移动', icon: 'icon-movegroup' },
  { label: '系统设置', icon: 'icon-xitongshezhi' },
  { label: '工具', icon: 'icon-xitongweihucopy' },
  { label: '系统设置', icon: 'icon-setting' },
  { label: 'PC电脑桌面', icon: 'icon-pc' },
  { label: '搜索', icon: 'icon-search' },
  { label: '同步', icon: 'icon-tongbu' },
  { label: '查看密码', icon: 'icon-chakanmima' },
  { label: '重启电脑', icon: 'icon-zhongqidianyuan' },
  { label: '筛选', icon: 'icon-shaixuan' },
  { label: '正确', icon: 'icon-enable' },
  { label: '关闭电源', icon: 'icon-guanbidianyuan' },
  { label: '拍照照片', icon: 'icon-kuaizhao' },
  { label: '禁止禁用', icon: 'icon-disabled' },
  { label: '播放', icon: 'icon-run1' },
]

// 项目上传的私有图标
export const projectIcons: IconItem[] = []

// 系统图标
export const systemIcons: IconItem[] = [
  { label: '提示', icon: 'icon-info-fill' },
  { label: '提示', icon: 'icon-info2' },
  { label: '标签', icon: 'icon-tag' },
  { label: '标签', icon: 'icon-tag1' },
  { label: '分割线减', icon: 'icon-line' },
  { label: '新增add加plus', icon: 'icon-plus' },
  { label: '图片', icon: 'icon-charutupian' },
  { label: '树Tree', icon: 'icon-tree2' },
  { label: '日期分割', icon: 'icon-riqifanwei2' },
  { label: '滑块', icon: 'icon-bx-slider' },
]

interface LayoutProps {
  label: string
  category: { label: string, value: string, img: string }[]
}

// 容器布局控件
export const layouts: LayoutProps[] = [
  {
    label: '基础布局',
    category: [
      { label: '1-1', value: '1-1', img: '' },
      { label: '1-2', value: '1-2', img: '' },
      { label: '1-3', value: '1-3', img: '' },
      { label: '1-4', value: '1-4', img: '' },
    ],
  },
  {
    label: '横向布局',
    category: [
      { label: '2-1', value: '2-1', img: '' },
      { label: '2-2', value: '2-2', img: '' },
      { label: '2-3', value: '2-3', img: '' },
      { label: '2-4', value: '2-4', img: '' },
    ],
  },
  {
    label: '纵向布局',
    category: [
      { label: '3-1', value: '3-1', img: '' },
      { label: '3-2', value: '3-2', img: '' },
      { label: '3-3', value: '3-3', img: '' },
      { label: '3-4', value: '3-4', img: '' },
    ],
  },
  {
    label: '排列布局',
    category: [
      { label: '4-1', value: '4-1', img: '' },
      { label: '4-2', value: '4-2', img: '' },
      { label: '4-3', value: '4-3', img: '' },
      { label: '4-4', value: '4-4', img: '' },
    ],
  },
  {
    label: '文章布局',
    category: [
      { label: '5-1', value: '5-1', img: '' },
      { label: '5-2', value: '5-2', img: '' },
      { label: '5-3', value: '5-3', img: '' },
      { label: '5-4', value: '5-4', img: '' },
    ],
  },
  {
    label: '坐标布局',
    category: [
      { label: '6-1', value: '6-1', img: '' },
      { label: '6-2', value: '6-2', img: '' },
      { label: '6-3', value: '6-3', img: '' },
      { label: '6-4', value: '6-4', img: '' },
      { label: '6-5', value: '6-5', img: '' },
      { label: '6-6', value: '6-6', img: '' },
      { label: '6-7', value: '6-7', img: '' },
      { label: '6-8', value: '6-8', img: '' },
    ],
  },
  {
    label: '反向布局',
    category: [
      { label: '7-1', value: '7-1', img: '' },
      { label: '7-2', value: '7-2', img: '' },
      { label: '7-3', value: '7-3', img: '' },
      { label: '7-4', value: '7-4', img: '' },
    ],
  },
  {
    label: '自适应布局',
    category: [
      { label: '8-1', value: '8-1', img: '' },
      { label: '8-2', value: '8-2', img: '' },
      { label: '8-3', value: '8-3', img: '' },
      { label: '8-4', value: '8-4', img: '' },
    ],
  },
]
