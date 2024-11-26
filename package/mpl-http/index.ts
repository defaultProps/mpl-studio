import Axios from 'axios'
import mplStore from '@mpl/store'
import type { UserRole } from '@mpl/typings'
import { indexedDBService } from '@mpl/dexie'

export const domain = 'https://mpl-code'

const service = Axios.create({
  timeout: 1000 * 5,
  headers: {
    'Cache-control': 'no-cache'
  }
})

export const httpUrls = {
  getFileDetail: '/project/page/getDetail',
  getProjectCategory: '/project/getCategory',
  getLockedPageByProjectCategory: '/project/getLockedPage',
  getDocList: '/doc/getList',
  updateDoc: 'doc/update',
  getTemplateList: '/template/getList',
  getClientAPIList: '/api/getClientAPIList',
  getServiceAPIList: 'api/getServiceAPIList',
  getThemeList: '/theme/getList',
  getThemeDetail: '/theme/detail',
  getResourceCss: '/staticResource/css',
  getResourceScript: '/staticResource/script',
  getResourceImage: '/staticResource/image'
}

export const requestHOC = {
  get: ({ url, params, metaInfo }: { url: string, params: any, metaInfo?: any }): any => {
    const project = mplStore.projectStore()

    function getPropertyValue(person: any, key: string) {
      return person[key]
    }

    if (project.isDemoProject) {
      const key = Object.entries(httpUrls).find(t => t[1] === url)?.[0] as any

      return getPropertyValue(indexedDBService, key)(params)
    }

    return service({
      url: domain + url,
      method: 'get',
      params,
      ...metaInfo
    })
  },

  post: ({ url, data, metaInfo }: { url: string, data: any, metaInfo?: any }): any =>
    service({
      url: domain + url,
      method: 'post',
      data,
      ...metaInfo
    })
}

export default {
  project: {
    // 获取项目中页面的详情
    getFileDetail: (id: string | string[]) => requestHOC.get({ url: httpUrls.getFileDetail, params: { id } }),
    // 获取项目列表tree
    getProjectCategory: (id: string) => requestHOC.get({ url: httpUrls.getProjectCategory, params: { id } }),
    // 获取项目中该用户已锁定的文件
    getLockedPageByProjectCategory: (id: string) => requestHOC.get({ url: httpUrls.getLockedPageByProjectCategory, params: { id } }),
  },
  user: {
    // 获取用户信息
    getInfo: (id: string, role: UserRole) => requestHOC.get({ url: '', params: { id, role } })
    // 获取用户权限

  },
  doc: {
    // 获取文档列表
    getDocList: (id: string) => requestHOC.get({ url: httpUrls.getDocList, params: { id } }),
    // 保存文档
    updateDoc: (id: string, doc: string) => requestHOC.get({ url: httpUrls.updateDoc, params: { id, doc } }),
    // 删除文档
    deleteDoc: (id: string) => requestHOC.get({ url: httpUrls.updateDoc, params: { id } })
  },
  template: {
    // 获取组件相关的模板列表 - 【推荐列表】
    getTemplateList: (params: any) => requestHOC.get({ url: httpUrls.getTemplateList, params }),
    // 获取模板模板商城列表
    getMarketTemplateList: () => requestHOC.get({ url: httpUrls.getTemplateList, params: {} })
  },
  api: {
    // 获取前端API列表
    getClientAPIList: (params: any) => requestHOC.get({ url: httpUrls.getClientAPIList, params }),
    // 获取服务端API列表
    getServiceAPIList: (params: any) => requestHOC.get({ url: httpUrls.getServiceAPIList, params })
  },
  theme: {
    // 获取所有主题列表
    getThemeList: (params: any) => requestHOC.get({ url: httpUrls.getThemeList, params }),
    // 获取主题详情
    detail: (params: any) => requestHOC.get({ url: httpUrls.getThemeDetail, params })
  },
  staticResource: {
    // 获取项目的静态资源样式文件
    getCss: (id: string) => requestHOC.get({ url: httpUrls.getResourceCss, params: { id } }),
    // 获取项目的静态资源脚本文件
    getScript: (id: string) => requestHOC.get({ url: httpUrls.getResourceScript, params: { id } }),
    // 获取项目的静态资源图片
    getImage: (id: string) => requestHOC.get({ url: httpUrls.getResourceImage, params: { id } })
  }
}
