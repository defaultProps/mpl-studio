import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

/**
 * 编辑器聚焦时在最后一行行尾展示提示信息
 * @param editorInstance 编辑器实例
 * @param info 提示文本
 */
export function showLineHintOnFocus(
  editorInstance: monaco.editor.IStandaloneCodeEditor,
  info: string
) {
  let decorationCollection: monaco.editor.IEditorDecorationsCollection | undefined;
  const model = editorInstance.getModel();
  if (!model) return;

  const renderHint = () => {
    clearHint();
    const lineCount = model.getLineCount();
    // 获取行内容长度
    const lineContent = model.getLineContent(lineCount);
    const endCol = lineContent.length + 1;

    const decoration: monaco.editor.IModelDeltaDecoration = {
      range: new monaco.Range(lineCount, endCol, lineCount, endCol),
      options: {
        after: {
          content: info || '错误信息',
          inlineClassName: 'monaco-line-end-hint',
        },
        isWholeLine: false,
      },
    };
    console.log('decoration')
    decorationCollection = editorInstance.createDecorationsCollection([decoration]);
  };

  const clearHint = () => {
    // decorationCollection?.clear();
    // decorationCollection = undefined;
  };

  // 监听编辑器内容变化，同步更新提示
  editorInstance.onDidChangeModelContent(() => {
    if (editorInstance.hasTextFocus()) {
      // clearHint();
    }
  });

  // 聚焦失焦监听
  editorInstance.onDidFocusEditorWidget(renderHint);
  // editorInstance.onDidBlurEditorWidget(clearHint);
}