// init local indexedDB database.
// disable api with localStorage & sessionStorage & cookie.
import Dexie, { type IndexableType, type PromiseExtended, type Table } from 'dexie'
import { type ProjectNode, projectList, projectPageList } from '@mpl/const'
import { CoreView, Project } from '@mpl/typings'
import mplResource from './resource.data'

class ProjectSubClassDexie extends Dexie {
  projectList!: Table<Project, string>
  projectPage!: Table<ProjectNode, string>
  resourceList!: Table<any>
  systemConfig!: Table<CoreView, string>
  userTable!: any

  constructor() {
    super('mpl')
    this.version(1).stores({
      // platformListTable: 'id,title,description,version', // 应用挂载平台列表
      projectTable: 'id,title,description,type,platform', // 存储所有demo项目列表
      pageTable: 'id,title,parentId,projectId,nodes,evt,style,jsLinks,cssLinks,imgLinks,iconLinks', // 存储页面信息表
      resourceTable: 'id,type,projectId,value', // 项目中使用的第三方资源列表
      // viewTable: 'userId,view' // MPL平台的视图CoreView数据存储
    })

    this.clearStore()
  }

  clearStore() {
    this.table('projectTable').clear()
    this.table('pageTable').clear()
    this.table('resourceTable').clear()
    // this.table('viewTable').clear()
  }

  init(mode: 'local' | 'mock'): Promise<any> {
    if (mode === 'mock') {
      return Promise.all([
        this.bulkProjectList(),
        this.bulkProjectPage()
      ])
    }

    return Promise.all([])
  }

  bulkStaticResource(): PromiseExtended<IndexableType> {
    return this.table('resourceTable').bulkPut(Object.values([
      ...mplResource.jsResource,
      ...mplResource.styleResource,
      ...mplResource.imgResource,
      ...mplResource.iconResource
    ]))
  }

  bulkProjectList(): PromiseExtended<IndexableType> {
    return this.table('projectTable').bulkPut(projectList)
  }

  bulkProjectPage(): PromiseExtended<IndexableType> {
    return this.table('pageTable').bulkPut(projectPageList)
  }

  async getProjectCategoryTree(key: string): Promise<any[] | null> {
    const [project] = await this.table('projectTable').bulkGet([key])
    let result = []
    let pageList = []

    if (project) {
      pageList = await this.table('pageTable').where('projectId').equals(project.id).toArray()

      function arrayToTree(items: any[]) {
        const res = []
        const map: any = {}
        const getHasOwnProperty = (obj: any, property: any) => Object.prototype.hasOwnProperty.call(obj, property)

        for (const i of items) {
          map[i.id] = {
            ...i,
            children: getHasOwnProperty(map, i.id) ? map[i.id].children : []
          }
          const newItem = map[i.id]

          delete newItem.nodes
          delete newItem.evt
          delete newItem.style
          delete newItem.codeStr

          if (i.parentId === '') {
            res.push(newItem)
          }
          else {
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
}

const db = new ProjectSubClassDexie()

export const indexedDBService = {
  getLockedPage: async () => {
    return {
      code: 200,
      rows: []
    }
  },
  getProjectCategory: async ({ id }: { id: string }) => {
    const value = await db.getProjectCategoryTree(id)
    return {
      code: 200,
      rows: value
    }
  }
}

export default db
