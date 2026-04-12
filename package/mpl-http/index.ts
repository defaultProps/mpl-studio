import Axios from 'axios'
import { Authority, FileDetailProp } from '@mpl/typings'
// import { indexedDBService } from '@mpl/dexie'

export const domain = 'http://localhost:3333'

const service = Axios.create({
  timeout: 1000 * 5,
  headers: {
    'Cache-control': 'no-cache'
  }
})

export const httpUrls = {
  getProjectDetail: '/api/page/detail.do',
  getProjectCategory: '/api/project/list.do',

  getLockedPageByProjectCategory: '/api/project/getLockedPage',
  getDocList: '/api/doc/getList',
  updateDoc: 'doc/update',
  getTemplateList: '/api/template/getList',
  getClientAPIList: '/api/api/getClientAPIList',
  getServiceAPIList: 'api/getServiceAPIList',
  getThemeList: '/api/theme/getList',
  getThemeDetail: '/api/theme/detail',
  getResourceCss: '/api/staticResource/css',
  getResourceScript: '/api/staticResource/script',
  getResourceImage: '/api/staticResource/image',
  getSystemPlatform: '/api/system/platform',
  updatePageInfo: '/api/page/updateInfo',
  getPageDetail: '/api/page/getPageDetail.do'
}

// 拦截所有请求。判断请求环境：test、dev、mpl-mock
export const requestHOC = {
  get: ({ url, params, metaInfo }: { url: string; params: any; metaInfo?: any }): any => {
    return service({
      url: domain + url,
      method: 'get',
      params,
      ...metaInfo
    })
  },

  post: ({ url, data, metaInfo }: { url: string; data: any; metaInfo?: any }): any =>
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
    getProjectDetail: (id: string | string[]) => requestHOC.get({ url: httpUrls.getProjectDetail, params: { id } }),
    // 获取项目列表tree
    getProjectCategory: (userId: string) => requestHOC.get({ url: httpUrls.getProjectCategory, params: { userId } }),
    // 获取项目中该用户已锁定的文件
    getLockedPageByProjectCategory: (id: string) => requestHOC.get({ url: httpUrls.getLockedPageByProjectCategory, params: { id } })
  },
  platform: {
    // 获取系统默认平台列表
    getSystemPlatform: () => requestHOC.get({ url: httpUrls.getSystemPlatform, params: {} })
  },
  page: {
    getPageDetail: (id: string) => requestHOC.get({ url: httpUrls.getPageDetail, params: { id } }),
    // 更新页面信息
    updatePageInfo: (id: string, params: Partial<FileDetailProp>) => requestHOC.get({ url: httpUrls.updatePageInfo, params: { id, params } })
  },
  user: {
    // 获取用户信息
    getInfo: (id: string, role: Authority) => requestHOC.get({ url: '', params: { id, role } })
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
