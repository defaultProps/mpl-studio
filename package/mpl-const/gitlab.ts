import MPL from '@mpl/typings'

// 项目仓库源码。从gitlab中拉取的数据
// vue3模板
export function initPackageSourceTree(): MPL.CategorySourceTree[] {
  return [
    {
      title: 'HarmonyOS设置',
      id: self.crypto.randomUUID(),
      isModified: false,
      type: 'folder',
      authority: ['readonly'],
      children: [
        {
          title: '静态资源',
          id: self.crypto.randomUUID(),
          isModified: false,
          type: 'folder',
          authority: ['readonly'],
          children: [
            {
              title: '图片',
              id: self.crypto.randomUUID(),
              isModified: false,
              type: 'folder',
              authority: ['readonly'],
              children: [
                {
                  title: 'mpl-divider-20221205120405.png',
                  id: self.crypto.randomUUID(),
                  isModified: false,
                  type: 'image',
                  authority: ['delete', 'rename', 'editable'],
                },
                {
                  title: 'mpl-stop.png',
                  id: self.crypto.randomUUID(),
                  isModified: false,
                  type: 'image',
                  authority: ['delete', 'rename', 'editable'],
                }
              ]
            },
            {
              title: '样式主题',
              id: self.crypto.randomUUID(),
              isModified: false,
              type: 'folder',
              authority: ['readonly'],
              children: [
                {
                  title: 'table1.less',
                  id: self.crypto.randomUUID(),
                  isModified: true,
                  type: 'css',
                  authority: ['delete', 'rename', 'editable'],
                },
                {
                  title: 'table1.less',
                  id: self.crypto.randomUUID(),
                  isModified: true,
                  type: 'css',
                  authority: ['delete', 'rename', 'editable'],
                },
                {
                  title: 'table2.less',
                  id: self.crypto.randomUUID(),
                  isModified: true,
                  type: 'css',
                  authority: ['delete', 'rename', 'editable'],
                },
                {
                  title: 'table3.css',
                  id: self.crypto.randomUUID(),
                  isModified: true,
                  type: 'css',
                  authority: ['delete', 'rename', 'editable'],
                }
              ]
            },
            {
              title: '脚本',
              id: self.crypto.randomUUID(),
              isModified: false,
              type: 'folder',
              authority: ['readonly'],
              children: [
                {
                  title: 'mpl-divider-20221205120405.png',
                  id: self.crypto.randomUUID(),
                  isModified: false,
                  type: 'file',
                  authority: ['delete', 'rename', 'editable'],
                },
                {
                  title: 'mpl-stop.png',
                  id: self.crypto.randomUUID(),
                  isModified: false,
                  type: 'image',
                  authority: ['delete', 'rename', 'editable'],
                }
              ]
            }
          ]
        },
        {
          title: '国际化',
          id: self.crypto.randomUUID(),
          isModified: false,
          type: 'folder',
          authority: ['readonly'],
          children: [
            {
              title: 'mpl.json',
              id: self.crypto.randomUUID(),
              isModified: false,
              type: 'json',
              authority: ['readonly'],
            },
            {
              title: 'i18n.json',
              id: self.crypto.randomUUID(),
              isModified: false,
              type: 'json',
              authority: ['rename', 'editable'],
            }
          ]
        }
      ]
    },
    {
      title: 'README.md',
      id: self.crypto.randomUUID(),
      isModified: true,
      type: 'doc',
      authority: ['delete', 'rename', 'editable'],
    }
  ]
}
