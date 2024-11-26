import { RESOURCE } from '@mpl/const'

// 根据平台使用选用的技术调用不同的技术
async function getTargetMiddleWare(resource: RESOURCE[]): Promise<any> {
  if (resource.includes(RESOURCE.ELEMENT_PLUS)) {
    return await import('@mpl/node')
  }

  else if (resource.includes(RESOURCE.VANT4)) {
    // return () => import('@mpl/vant4')
  }

  throw new Error('error resource mounted on mpl platform middleware.')
}

export {
  getTargetMiddleWare
}