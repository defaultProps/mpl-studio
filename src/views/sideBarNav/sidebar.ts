import { projectStore } from '@mpl/store'
import type { File } from '@mpl/typings'

export const service = {
  clickNode: (data: File, treeNode: any) => {
    if (treeNode.childNodes.length) return

    const file: File = {
      title: data.title,
      id: data.id,
      type: 'resource',
      pageInfo: {}
    }

    projectStore().updateActiveFile(file, true)
  }
}
