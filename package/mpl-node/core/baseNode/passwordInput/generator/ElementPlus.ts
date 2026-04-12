import { PasswordInputFormProp } from '../define'

export default (el: PasswordInputFormProp): string => {
  return `
    <el-form-item
      class="el-col-${el.pos.pc.w}" 
      v-if="mpl.${el.cid}.show"
      :rules="mpl.${el.cid}.rules"
      v-bind="mpl.${el.cid}.formItemProps">
      <el-input v-bind="mpl.${el.cid}.inputProps" type="password" v-model="mpl.${el.cid}.value" />
    </el-form-item>
  `
}
