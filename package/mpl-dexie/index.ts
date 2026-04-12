// init local indexedDB database.
// disable api with localStorage & sessionStorage & cookie.
import Dexie, { type IndexableType, type PromiseExtended, type Table } from 'dexie'
import { projectList, projectPageList, systemPlatformList, fileDetailList } from '@mpl/const'
import {
  Project, Platform, ProjectNode, ProjectDir,
  FileDetailProp
} from '@mpl/typings'
import mplResource from './resource.data'

class mplDatabase extends Dexie {
  projectList!: Table<Project, string>
  projectPage!: Table<ProjectNode, string>
  resourceList!: Table<any>
  systemConfig!: Table<Platform, string>

  constructor() {
    super('mpl')
    this.version(2).stores({
      projectTable: 'id,title,description,type,platform', // 存储所有demo项目列表
      pageTable: 'id,title,parentId,projectId,type', // 存储页面基础信息表
      fileDetailTable: 'id,title,type,nodes,events,styles,codeStr,value,size', // 存储页面详情信息表
      resourceTable: 'id,type,projectId,value', // 项目中使用的第三方资源列表
      platformTable: 'id,title,description,version' // mpl内置标准平台列表
      // viewTable: 'userId,view' // MPL平台的视图CoreView数据存储
    })
  }
  initStore() {
    this.clearStore()
  }

  clearStore() {
    this.table('projectTable').clear()
    this.table('pageTable').clear()
    this.table('fileDetailTable').clear()
    this.table('resourceTable').clear()
    this.table('platformTable').clear()
    // this.table('viewTable').clear()
  }

  init(): Promise<any> {
    this.initStore()
    return Promise.all([
      this.bulkProjectTable(),
      this.bulkFileDetailTable(),
      this.bulkProjectCategoryTable(),
      this.bulkPlatformTable()
    ])
  }

  updatePage(pageId: string, obj: Partial<ProjectNode>) {
    this.table('pageTable').update(pageId, obj)
  }

  bulkStaticResource(): PromiseExtended<IndexableType> {
    return this.table('resourceTable').bulkPut(
      Object.values([...mplResource.jsResource, ...mplResource.styleResource, ...mplResource.imgResource, ...mplResource.iconResource])
    )
  }

  bulkProjectTable(): PromiseExtended<IndexableType> {
    return this.table('projectTable').bulkPut(projectList)
  }

  bulkPlatformTable(): PromiseExtended<IndexableType> {
    return this.table('platformTable').bulkPut(systemPlatformList)
  }

  bulkProjectCategoryTable(): PromiseExtended<IndexableType> {
    return this.table('pageTable').bulkPut(projectPageList)
  }

  bulkFileDetailTable(): PromiseExtended<IndexableType> {
    return this.table('fileDetailTable').bulkPut(fileDetailList)
  }

  async getFileDetail(fileId: string) {
    const [obj] = await this.table('fileDetailTable').bulkGet([fileId]) as [FileDetailProp | null]

    if (!obj) {
      console.log('未查询到此页面')
    }

    return this.table('fileDetailTable').bulkGet([fileId])
  }

  async getProjectCategoryTree(key: string): Promise<ProjectDir[] | null> {
    const [project] = await this.table('projectTable').bulkGet([key])
    let result: any[] = []
    let pageList: ProjectDir[] = []

    if (project) {
      pageList = await this.table('pageTable').where('projectId').equals(project.id).toArray()

      function arrayToTree(items: any[]): any[] {
        const res: ProjectDir[] = []
        const map: any = {}
        const getHasOwnProperty = (obj: any, property: any) => Object.prototype.hasOwnProperty.call(obj, property)

        for (const i of items) {
          map[i.id] = {
            ...i,
            children: getHasOwnProperty(map, i.id) ? map[i.id].children : []
          }
          const newItem: any = map[i.id]

          delete newItem.nodes
          delete newItem.evt
          delete newItem.style
          delete newItem.codeStr

          if (i.parentId === '') {
            res.push(newItem)
          } else {
            if (!getHasOwnProperty(map, i.parentId)) {
              map[i.parentId] = {
                children: []
              }
            }
            map[i.parentId].children.push(newItem)
          }
        }
        return res
      }

      result = arrayToTree(pageList)
    }

    return result || null
  }

  async getSystemPlatform(): Promise<Platform[]> {
    return this.table('platformTable').toArray()
  }
}

const db = new mplDatabase()

export const indexedDBService = {
  // 获取已解锁的页面列表
  getLockedPage: async () => {
    return {
      code: 200,
      rows: []
    }
  },
  // 获取MPL默认平台
  getSystemPlatform: async () => {
    const value = await db.getSystemPlatform()
    return {
      code: 200,
      rows: value
    }
  },
  // 获取项目中页面详情
  getFileDetail: async ({ id }: { id: string }) => {
    const value = await db.getFileDetail(id)
    return {
      code: 200,
      rows: value
    }
  },
  // 获取项目目录
  getProjectCategory: async ({ id }: { id: string }) => {
    const value = await db.getProjectCategoryTree(id)

    return {
      code: 200,
      rows: value
    }
  },
  // 更新页面信息
  updatePageInfo: async ({ id, params }: { id: string; params: Partial<ProjectNode> }) => {
    const value = await db.updatePage(id, params)
    return {
      code: 200,
      rows: value
    }
  }
}

db.init()

export default db
