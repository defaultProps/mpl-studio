import type { NodePos } from "@mpl/typings";

export interface ExcelTableNodeProp {}

function pos(): NodePos {
  return {
    w: 6,
    h: 4,
    minH: 5,
    maxH: 7,
    minW: 1,
    type: "w",
    mod: "formItem",
  };
}
