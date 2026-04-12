import { SettingMap } from '@mpl/typings'

// base node
import baseSearchModule1 from './baseSearchModule1'
import qrCode from '../baseNode/qrCode'
import excelTable from './excelTable'

export * from './baseSearchModule1'
export * from '../baseNode/qrCode'
export * from './excelTable'

// 高级控件
export const seniorNodeSetting: Record<string, SettingMap> = {
  [baseSearchModule1.tag]: baseSearchModule1,
  [qrCode.tag]: qrCode,
  [excelTable.tag]: excelTable
}
