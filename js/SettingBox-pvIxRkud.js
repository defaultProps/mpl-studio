import{d as r,g as v,o as i,b as f,h as u,w as t,e as n,c as V,u as b,i as x,k as p,N as m}from"./.pnpm-CFV4EdYx.js";import{_ as o,a as U}from"./FormItem.vue_vue_type_style_index_0_lang-unl56FD5.js";import{_ as g,a as _}from"./NodeFormLabel.vue_vue_type_script_setup_true_lang-CcatV0mh.js";import{t as w}from"./constant-BmPVFlnt.js";import{_ as B}from"./SliderNode.vue_vue_type_script_setup_true_lang-CyZ0sEg2.js";import{_ as d}from"./InputNode.vue_vue_type_script_setup_true_lang-D32v1gQu.js";import{S as k}from"./SlotBtnGroup-DDPnlRQY.js";import{_ as $}from"./BaseRuleGroup.vue_vue_type_script_setup_true_lang-DElJ6483.js";import{_ as I}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-CHDEKTv2.js";import"./rule-CulUxyYZ.js";const N={class:"right-bar-setting--box"},c=r({__name:"SettingBox",props:{value:{}},setup(s){const l=v(s.value);return(S,e)=>(i(),f("div",N,[u(o,{label:`宽度比例 ${l.value.pos.pc.w}`},{default:t(()=>[u(B,{modelValue:l.value.pos.pc.w,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value.pos.pc.w=a)},null,8,["modelValue"])]),_:1},8,["label"]),u(g,{modelValue:l.value.label,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.label=a)},null,8,["modelValue"]),e[13]||(e[13]=n("div",{class:"mpl-divider",label:"数字框配置"},null,-1)),u(o,{var:"mpl.rg5fv6.input.text",label:"初始值"},{default:t(()=>[u(d,{modelValue:l.value.input.model,"onUpdate:modelValue":e[2]||(e[2]=a=>l.value.input.model=a)},null,8,["modelValue"])]),_:1}),u(o,{label:"输入宽度"},{default:t(()=>[u(d,{modelValue:l.value.input.width,"onUpdate:modelValue":e[3]||(e[3]=a=>l.value.input.width=a)},null,8,["modelValue"])]),_:1}),l.value.input.width?(i(),V(o,{key:0,label:"输入位置"},{default:t(()=>[u(U,{modelValue:l.value.input.pos,"onUpdate:modelValue":e[4]||(e[4]=a=>l.value.input.pos=a),option:b(w)},null,8,["modelValue","option"])]),_:1})):x("",!0),u(o,{label:"提示信息",var:"mpl.rg5fv6.input.placeholder"},{default:t(()=>[u(d,{modelValue:l.value.input.placeholder,"onUpdate:modelValue":e[5]||(e[5]=a=>l.value.input.placeholder=a)},null,8,["modelValue"])]),_:1}),u(o,{label:"最大长度"},{default:t(()=>[u(_,{modelValue:l.value.input.maxlength,"onUpdate:modelValue":e[6]||(e[6]=a=>l.value.input.maxlength=a)},null,8,["modelValue"])]),_:1}),u(o,{modelValue:l.value.input.prefixIcon,"onUpdate:modelValue":e[7]||(e[7]=a=>l.value.input.prefixIcon=a),var:"activeNode.input.prefixIcon",label:"前置图标",icon:""},null,8,["modelValue"]),u(o,{modelValue:l.value.input.suffixIcon,"onUpdate:modelValue":e[8]||(e[8]=a=>l.value.input.suffixIcon=a),var:"activeNode.input.suffixIcon",label:"后置图标",icon:""},null,8,["modelValue"]),u(o,{label:"可清空",var:"mpl.rg5fv6.input.clearable"},{default:t(()=>[p(n("input",{type:"checkbox",class:"mpl-input","onUpdate:modelValue":e[9]||(e[9]=a=>l.value.input.clearable=a)},null,512),[[m,l.value.input.clearable]])]),_:1}),u(o,{label:"必填"},{default:t(()=>[p(n("input",{type:"checkbox",class:"mpl-input","onUpdate:modelValue":e[10]||(e[10]=a=>l.value.input.required=a)},null,512),[[m,l.value.input.required]])]),_:1}),e[14]||(e[14]=n("div",{class:"mpl-divider",label:"数字框规则"},null,-1)),u($,{modelValue:l.value.input.rules,"onUpdate:modelValue":e[11]||(e[11]=a=>l.value.input.rules=a),cid:l.value.cid},null,8,["modelValue","cid"]),u(k,{modelValue:l.value.slotBtn,"onUpdate:modelValue":e[12]||(e[12]=a=>l.value.slotBtn=a),cid:l.value.cid},null,8,["modelValue","cid"])]))}}),H=I(c,[["__scopeId","data-v-d8cc63d6"]]);export{H as default};