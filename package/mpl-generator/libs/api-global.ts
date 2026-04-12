/**
 * @description 重置表单 清除表单容器控件内输入型控件值及校验信息
 * @param {vModel} formName 表单容器名称 <el-form> 的 ref 名称
 * @param {any} context 上下文对象, 指向this
 */
function ClearFormNodeValueByName(formName, context: any) {
  if (!formName) {
    context.$refs.formData.resetFields()
    formName = 'formData'
  }
  context.$nextTick(() => {
    context.$refs.formData.clearValidate()
  })
}