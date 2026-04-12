import { SingleInputFormProp } from '../define'

export default (el: SingleInputFormProp): string => {
  return `
    <el-form-item 
      class="el-col-${el.pos.pc.w}" 
      v-if="mpl.${el.cid}.show"
      :rules="mpl.${el.cid}.rules"
      v-bind="mpl.${el.cid}.formItemProps">
      <el-input v-bind="mpl.${el.cid}.inputProps" v-model="mpl.${el.cid}.value" />
    </el-form-item>
  `
}
