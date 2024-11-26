import antDesign from './generator/AntDesign'
import antDesignMobile from './generator/AntDesignMobile'
import elementPlus from './generator/ElementPlus'
import vant4 from './generator/Vant4'
import { UploadInputFormProp } from './define'
import { RESOURCE } from '@mpl/const'

export default (node: UploadInputFormProp, type: RESOURCE): string => {
  if (type === RESOURCE.ANT_DESIGN) {
    return antDesign(node)
  }
  else if (type === RESOURCE.ANT_DESIGN_MOBILE) {
    return antDesignMobile(node)
  }
  else if (type === RESOURCE.ELEMENT_PLUS) {
    return elementPlus(node)
  }

  return vant4(node)
}
