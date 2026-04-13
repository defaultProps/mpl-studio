import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import { serviceList, initPackageSourceTree, mplIframePostMessage } from '@mpl/const'
import { viewStore } from './viewStore'
import { workbenchStore } from './workbenchStore'
import http from '@mpl/http'
import { CategorySourceTree, ProjectDir, Platform, File, FileDetailProp, Authority, Project, IconPackage } from '@mpl/typings'
import { projectList } from '@mpl/const'

export interface ProjectDirectoryStore {
  openFileList: File[] // 性能优化, 最多开启3个编辑页面 + 2个预览页面.
  activeFile: File | null
  i18n: { // 项目多语言配置
    open: boolean, // 是否开启多语言
    list: string[] // 多语言支持列表
  },
  lockedFileList: string[]
  projectTree: ProjectDir[]
  activeFileId: string
  serviceList: { title: string; value: string }[]
  packageSourceTree: CategorySourceTree[]
  activeProject: null | Project
  userName: string
  userRole: 'community' | 'enterprise' | ''
  activeThemeId: string
  systemPlatformList: Platform[]
  projectList: Project[]
  projectIcon: IconPackage[] // 项目使用的图标库, 默认自带自身项目图标库和系统图标库[地址都是固定的]
}

export const projectStore = defineStore('ProjectDirectory', {
  state: (): ProjectDirectoryStore => {
    return {
      i18n: { // 项目多语言配置
        open: true, // 是否开启多语言
        list: ['sc', 'tc', 'en', 'ja'] // 多语言支持列表
      },
      systemPlatformList: [], // 系统平台列表
      openFileList: [], // 打开的文件列表
      activeFile: null, // 当前选中的文件
      projectTree: [], // 当前项目目录tree
      activeFileId: '', // 当前选择的文件id
      activeThemeId: '', // 当前选择的主题Id
      lockedFileList: [], // 已解锁的页面
      serviceList, // 服务列表
      packageSourceTree: [], // 项目源码目录
      activeProject: null, // 项目信息
      userName: '', // 用户名称
      userRole: 'enterprise', // 用户角色
      projectList: [],
      projectIcon: [
        { label: '项目图标库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: 'MPL Studio 标准图标库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: 'element-plus图标库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '图片库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '公共方法库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '多语言库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '样式主题库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '模板库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '组件库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '业务组件库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '前端API库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '服务端API库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '文档库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
        { label: '服务端API库', url: '//at.alicdn.com/t/c/font_2784375_236yaj40exp.js' },
      ]
    }
  },
  actions: {
    updateProjectList(project: Project[]) {
      this.projectList = project
      console.log(project)
    },
    getProjectCategoryAction(id: string): Promise<boolean> {
      return http.project.getProjectCategory(id).then((response: any) => {
        this.projectTree = response.data.rows
        return Promise.resolve(true)
      })
        .catch(() => {
          this.projectTree = [
            {
              title: 'demo',
              id: '00oee3t098y6uu8',
              type: 'folder',
              children: [
                {
                  title: '物料查询页',
                  id: 'qq2ee3tt5yy6uu8',
                  type: 'basePage',
                  pageInfo: {
                    ideModel: 'flowMode'
                  }
                },
                {
                  title: '员工查询页',
                  id: 'pageSearchId',
                  type: 'basePage',
                  pageInfo: {
                    ideModel: 'flowMode'
                  }
                },
                {
                  title: '采购流程',
                  id: 'o4fe3g5gn532f0f8b',
                  type: 'basePage',
                  pageInfo: {
                    ideModel: 'flowMode'
                  }
                }
              ]
            }
          ]
          return Promise.resolve(false)
        })
    },
    getSystemPlatform(): Promise<boolean> {
      return http.platform.getSystemPlatform().then((response: { status: number; rows: Platform[] }) => {
        this.systemPlatformList = response.rows

        return Promise.resolve(true)
      })
        .catch(() => {
          return Promise.resolve(false)
        })
    },
    // 获取项目源码目录
    getPackageSourceTree(projectId: string) {
      console.log(projectId)
    },
    // Demo演示项目
    async initDemoProject(id: string) {
      const workbench = workbenchStore()

      const activeProject = projectList.find(v => v.id === id)

      if (!activeProject) {
        return
      }

      this.activeProject = activeProject
      workbench.activePlatform = activeProject.platformList.map(v => v.id)

      // 1、用户设置 MPL Studio UI的相关配置 `vscode.setting.json`
      // 2、获取用户角色信息、以及选中的项目信息
      // 3、项目相关的静态资源【图标图片主题脚本】、页面目录树、仓库源码
      // 4、获取系统级静态资源、主题、前端API、服务端API
      // 5、获取组件库：包含社区版和企业版控件
      // 6、获取iframe-挂载平台的对应的资源
      // 7、获取MPL相关的文档资源库
      this.lockedFileList = ['qq2ee3tt5yy6uu8', 'pageSearchId']
      this.userName = '莱布尼茨'
      this.userRole = 'enterprise'
      this.projectTree = [
        {
          title: '演示项目',
          id: '00oee3t098y6uu8',
          type: 'folder',
          children: [
            {
              title: '物料查询页面',
              id: 'qq2ee3tt5yy6uu8',
              type: 'basePage',
              pageInfo: {
                editModel: 'flowMode'
              }
            },
            {
              title: '员工查询页',
              id: 'pageSearchId',
              type: 'basePage',
              pageInfo: {
                editModel: 'flowMode'
              }
            },
            {
              title: '采购流程',
              id: 'o4fe3g5gn532f0f8b',
              type: 'basePage',
              pageInfo: {
                editModel: 'flowMode'
              }
            }
          ]
        }
      ]
      workbench.initWorkbench()

      // this.getSystemPlatform()
      // Promise.all([this.getProjectCategoryAction(id)]).then(() => {
      //   this.userName = '莱布尼茨'
      //   this.userRole = 'enterprise'
      //   this.packageSourceTree = initPackageSourceTree()
      //   if (this.activeProject?.platform.find(v => v.value.includes('MPL-DFN'))) {
      //     this.lockedFileList = [
      //       'qq2ee3tt5yy6uu8',
      //       'm0syjb1wlct6u03s',
      //       'xh2gh20e33reknak',
      //       'do65boaoajsfb0a1',
      //       '7l9o3gdf34dfg34',
      //       'edfdsgdfgdrh345345',
      //       'jhgfds2345yhb4ed345'
      //     ]
      //   } else {
      //     this.lockedFileList = ['qq2ee3tt5yy6uu8', 'br2nc3fq5ft', 'gn6ht7jt6ku8ky7', 'xi6qq7du5gt', 'cz6ep1rv4qy']
      //   }
      // })

      // Promise.all([
      //   http.staticResource.getCss(id),
      //   http.staticResource.getImage(id),
      //   http.staticResource.getScript(id),
      // ]).then((values: { data: PromiseValues }[]) => {
      //   values.forEach((t, i) => {
      //     if (i === 0)
      //       this.projectTree = t.data.rows
      //   })

      // 拦截所有请求、导入本地localforage存储数据
    },
    closeFile(id: string) {
      const index = this.openFileList.findIndex(p => p.id === id)
      const targetFile = this.openFileList.find(p => p.id === id)

      if (targetFile?.id === this.activeFileId) {
        if (this.openFileList.length === 1) {
          this.activeFile = null
          this.activeFileId = ''
          this.openFileList = []
        } else {
          // 自动跳到到前一个文件，不存在则跳转到后一个
          const autoFocusFile1 = this.openFileList[index - 1]
          const autoFocusFile2 = this.openFileList[index - 1]
          if (autoFocusFile1) {
            this.activeFile = autoFocusFile1 || null
            this.activeFileId = autoFocusFile1?.id || ''
          } else {
            this.activeFile = autoFocusFile2 || null
            this.activeFileId = this.activeFile?.id || ''
          }
          this.openFileList.splice(index, 1)
        }
      } else {
        this.openFileList.splice(index, 1)
      }

      if (!this.activeFile) viewStore().activeMainModel = 'initialPage'

      if (this.activeFile?.type === 'doc') mplIframePostMessage.docsIframe.updateDocs(this.activeFile.title)
    },
    closeLeftFile(fileId: string) {
      const index = this.openFileList.findIndex(p => p.id === fileId)

      if (index >= 0) {
        this.openFileList = this.openFileList.slice(index, this.openFileList.length)

        const _file = this.openFileList.find(p => p.id === this.activeFileId)

        if (!_file) {
          const newActiveFile: File | undefined = this.openFileList.find(p => p.id === fileId)

          if (newActiveFile) {
            this.updateActiveFile(newActiveFile, false)
          }
        }
      }
    },
    closeRightFile(fileId: string) {
      const index = this.openFileList.findIndex(p => p.id === fileId)

      if (index >= 0) {
        this.openFileList = this.openFileList.slice(0, index + 1)

        const _file = this.openFileList.find(p => p.id === this.activeFileId)

        if (!_file) {
          const newActiveFile = this.openFileList.find(p => p.id === fileId)

          if (newActiveFile) {
            this.updateActiveFile(newActiveFile, false)
          }
        }
      }

      if (this.openFileList.length === 0) {
        document.querySelectorAll(`.el-tree-node[data-key]`).forEach(dom => {
          dom.setAttribute('style', '')
        })
      }
    },
    closeOthersFile(fileId: string) {
      const file = this.openFileList.find(p => p.id === fileId)

      if (file) {
        this.openFileList = [file]
        this.activeFile = { ...file }
      }
      if (this.activeFile?.type === 'doc') mplIframePostMessage.docsIframe.updateDocs(this.activeFile.title)
    },
    // 跳转或打开新页签
    async updateActiveFile(file: File | null, isScrollIntoView: boolean) {
      // 重复点击无效
      if (this.activeFileId === file?.id) {
        return
      }

      const view = viewStore()
      const workbench = workbenchStore()
      const isLockFile = this.lockedFileList.includes(file?.id || '')

      view.$patch({
        subBoxSettingModel: '',
        subBoxSettingModelId: ''
      })

      this.activeFile = file
      this.activeFileId = file?.id || ''

      workbench.$patch({
        footerOperation: {
          size: isLockFile ? 600 : 0,
          visible: isLockFile
        }
      })

      if (!file) return

      if (file.type === 'doc') {
        mplIframePostMessage.docsIframe.updateDocs(file.title)
      }

      view.updateActiveMainModel('workbench')
      const hasOpenList = this.openFileList.find(p => p.id === file.id)

      if (!hasOpenList) {
        this.openFileList.push({ ...file })
      }

      if (isScrollIntoView) {
        nextTick(() => {
          document.querySelector(`div[data-page-id="${file.id}"]`)?.scrollIntoView({ inline: 'center' })
        })
      }
    }
  }
})
