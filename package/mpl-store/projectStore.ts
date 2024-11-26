import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import { serviceList, initPackageSourceTree, mplIframePostMessage } from '@mpl/const'
import mplDexie from '@mpl/dexie'
import { viewStore } from './viewStore'
import { workbenchStore } from './workbenchStore'
import http from '@mpl/http'
import type { CategorySourceTree, ProjectDir, File, UserRole, Project } from '@mpl/typings'
import { projectList } from "@mpl/const"

export interface ProjectDirectoryStore {
  openFileList: File[]
  activeFile: File | null
  lockedFileList: string[]
  projectTree: ProjectDir[]
  activeFileId: string
  serviceList: { title: string, value: string }[]
  packageSourceTree: CategorySourceTree[]
  activeProject: null | Project
  userName: string
  userRole: UserRole
  activeThemeId: string
  isDemoProject: boolean
}

export const projectStore =  defineStore('ProjectDirectory', {
  state: (): ProjectDirectoryStore => {
    return {
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
      userRole: '', // 用户角色
      isDemoProject: false // 是否为Demo项目
    }
  },
  actions: {
    getProjectCategoryAction(id: string): Promise<boolean> {
      return http.project.getProjectCategory(id).then((response: any) => {
        this.projectTree = response.rows

        return Promise.resolve(true)
      }).catch(() => {
        return Promise.resolve(false)
      })
    },
    // 获取项目源码目录
    getPackageSourceTree(projectId: string) {
      console.log(projectId)
    },
    // Demo演示项目
    async initDemoProject(id: string) {
      // 初始化本地数据库
      await mplDexie.init('mock')
      this.isDemoProject = true
      const workbench = workbenchStore()
      const activeProject = projectList.find(v => v.id === id)

      if (!activeProject) {
        return
      }

      this.activeProject = activeProject
      workbench.activePlatform = activeProject.platform.map(v => v.value)

      // 1、用户设置 MPL Studio UI的相关配置 `vscode.setting.json`
      // 2、获取用户角色信息、以及选中的项目信息
      // 3、项目相关的静态资源【图标图片主题脚本】、页面目录树、仓库源码
      // 4、获取系统级静态资源、主题、前端API、服务端API
      // 5、获取组件库：包含社区版和企业版控件
      // 6、获取iframe-挂载平台的对应的资源
      // 7、获取MPL相关的文档资源库
      Promise.all([
        this.getProjectCategoryAction(id),

      ]).then(() => {
        this.userName = '莱布尼茨'
        this.userRole = 'enterprise'
        this.packageSourceTree = initPackageSourceTree()
        // 
        if (this.activeProject?.platform.find(v => v.value.includes('MPL-DFN'))) {
          this.lockedFileList = ['xh2gh20e33reknak', 'm0syjb1wlct6u03s', 'xh2gh20e33reknak', 'do65boaoajsfb0a1', '1234565432sdfgdfhgfd', 'edfdsgdfgdrh345345', 'jhgfds2345yhb4ed345']

        } else {
          this.lockedFileList = ['qq2ee3tt5yy6uu8', 'br2nc3fq5ft', 'gn6ht7jt6ku8ky7', 'xi6qq7du5gt', 'cz6ep1rv4qy']

        }
        workbench.initStore()
      })

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
          viewStore().activeMainModel = 'initialPage'
        }
        else {
          // 自动跳到到前一个文件，不存在则跳转到后一个
          const autoFocusFile1 = this.openFileList[index - 1]
          const autoFocusFile2 = this.openFileList[index - 1]
          if (autoFocusFile1) {
            this.activeFile = autoFocusFile1 || null
            this.activeFileId = autoFocusFile1?.id || ''
          }
          else {
            this.activeFile = autoFocusFile2 || null
            this.activeFileId = this.activeFile?.id || ''
          }
          this.openFileList.splice(index, 1)
        }
      }
      else {
        this.openFileList.splice(index, 1)
      }

      if (!this.activeFile)
        viewStore().activeMainModel = 'initialPage'

      if (this.activeFile?.type === 'doc')
        mplIframePostMessage.docsIframe.updateDocs(this.activeFile.id)
    },
    closeLeftFile(fileId: string) {
      const index = this.openFileList.findIndex(p => p.id === fileId)

      if (index >= 0) {
        this.openFileList = this.openFileList.slice(
          index,
          this.openFileList.length
        )

        const _file = this.openFileList.find(p => p.id === this.activeFileId)

        if (!_file) {
          const newActiveFile = this.openFileList.find(p => p.id === fileId)
          newActiveFile && this.updateActiveFile(newActiveFile, false)
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
          newActiveFile && this.updateActiveFile(newActiveFile, false)
        }
      }

      if (this.openFileList.length === 0) {
        document.querySelectorAll(`.el-tree-node[data-key]`).forEach((dom) => {
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
      if (this.activeFile?.type === 'doc')
        mplIframePostMessage.docsIframe.updateDocs(this.activeFile.id)
    },
    updateActiveFile(file: File | null, isScrollIntoView: boolean) {
      this.activeFile = file

      if (!file)
        return

      this.activeFileId = file.id

      if (file.type === 'doc')
        mplIframePostMessage.docsIframe.updateDocs(file.id)

      const coreView = viewStore()
      coreView.updateActiveMainModel('workbench')
      const hasOpenList = this.openFileList.find(p => p.id === file.id)

      if (!hasOpenList)
        this.openFileList.push({ ...file })

      nextTick(() => {
        document
          .querySelector(`div[data-page-id="${file.id}"]`)
          ?.scrollIntoView(isScrollIntoView ? { inline: 'center' } : false)
      })
      mplIframePostMessage.workbench.updateActivePage(file.id)
    }
  }
})
