import { themeQuartz } from "ag-grid-community"

// 获取默认的ag-grid主题
export const getDefaultAgGridTheme = () => themeQuartz.withParams({
  borderColor: "#cccccc",
  wrapperBorder: true,
  headerRowBorder: true,
  rowBorder: { style: 'solid' },
  columnBorder: { style: 'solid' },
  headerHeight: "42px",
  headerTextColor: "#333",
  headerBackgroundColor: "#e6e6e6",
})