import{_ as b}from"./FormItem.vue_vue_type_style_index_0_lang-unl56FD5.js";import{d as c,ai as _,g as f,m as g,j as h,aj as x,ak as y,o as i,b as v,h as d,u as p,al as C,am as w,ad as N,r as B,c as k,w as j,i as U,e as $}from"./.pnpm-CFV4EdYx.js";import{_ as R}from"./SliderNode.vue_vue_type_script_setup_true_lang-CyZ0sEg2.js";import"./index-CHDEKTv2.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const L={style:{border:"1px solid #ccc"}},M=c({__name:"RichTextNode",props:{modelValue:{}},emits:["update:modelValue","blur"],setup(u,{emit:m}){const a=_(),o=u,t=f(o.modelValue);g(()=>o.modelValue,()=>{t.value=o.modelValue}),h(()=>{setTimeout(()=>{t.value="<p>模拟 Ajax 异步设置内容</p>";const e=x.getToolbar(a.value),s=e==null?void 0:e.getConfig();console.log(s==null?void 0:s.toolbarKeys)},1500)});const n={excludeKeys:["blockquote","header1","header2","header3","through","codeBlock","undo","redo","|","fullScreen","justifyLeft","justifyRight","justifyCenter","insertVideo"]},l={placeholder:"请输入内容..."};y(()=>{var e;(e=a.value)==null||e.destroy()});const r=e=>{a.value=e};return(e,s)=>(i(),v("div",L,[d(p(C),{style:{"border-bottom":"1px solid #ccc"},editor:a.value,defaultConfig:n,mode:"simple"},null,8,["editor"]),d(p(w),{style:{height:"500px","overflow-y":"hidden"},modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=V=>t.value=V),defaultConfig:l,mode:"simple",onOnCreated:r},null,8,["modelValue"])]))}}),T={class:"right-bar-setting--box"},A=c({__name:"SettingBox",props:{value:{},isMobile:{type:Boolean}},emits:["changeNode"],setup(u,{emit:m}){const a=u,o=f(a.value),t=m;return N(o.value,n=>{t("changeNode",n)}),(n,l)=>{const r=B("NodeLabel");return i(),v("div",T,[a.isMobile?U("",!0):(i(),k(b,{key:0,label:`宽度比例 ${o.value.pos.pc.w}`},{default:j(()=>[d(R,{modelValue:o.value.pos.pc.w,"onUpdate:modelValue":l[0]||(l[0]=e=>o.value.pos.pc.w=e)},null,8,["modelValue"])]),_:1},8,["label"])),d(r,{modelValue:o.value.label,"onUpdate:modelValue":l[1]||(l[1]=e=>o.value.label=e)},null,8,["modelValue"]),l[3]||(l[3]=$("div",{class:"mpl-divider",label:"内容设置"},null,-1)),d(M,{modelValue:o.value.model,"onUpdate:modelValue":l[2]||(l[2]=e=>o.value.model=e)},null,8,["modelValue"])])}}});export{A as default};