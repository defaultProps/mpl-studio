import { SingleInputFormProp } from '../define'

export default (el: SingleInputFormProp): any => ({
  [el.cid]: {
    show: true,
    value: el.input.model,
    inputProps: {
      required: false,
      disabled: false,
      readonly: false,
    },
    formItemProps: {
      label: el.label.text,
      prop: el.input.prop,
      labelWidth: el.label.width,
      required: el.input.required,
    },
    variables: el.variables,
    rule: []
  },
})