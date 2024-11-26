import type Node from 'element-plus/es/components/tree/src/model/node'
import mplStore from '@mpl/store'
import type { ProjectDir, File } from '@mpl/typings'

export const project = {
  clickNode: (data: ProjectDir) => {
    if (data.type === 'folder')
      return
    mplStore.projectStore().updateActiveFile(data, false)
  }
}

export const service = {
  clickNode: (data: File, treeNode: Node) => {
    if (treeNode.childNodes.length)
      return


    const file: File = {
      title: data.title,
      id: data.id,
      type: 'resource'
    }

    mplStore.projectStore().updateActiveFile(file, true)
  }
}
