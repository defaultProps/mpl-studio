import{w,n as V}from"./index-CHDEKTv2.js";import{d as E,af as y,g as R,o as i,b as c,c as x,w as m,F as N,f as I,e as v,n as B,h as n,u as G,H as M,i as k,ag as F}from"./.pnpm-CFV4EdYx.js";import{_ as r}from"./FormItem.vue_vue_type_style_index_0_lang-unl56FD5.js";import{_ as p}from"./InputNode.vue_vue_type_script_setup_true_lang-D32v1gQu.js";import{_ as z}from"./_plugin-vue_export-helper-DlAUqK2U.js";const A=["onClick"],H=["onClick"],L={key:1,class:"slot-btn-setting"},P=E({__name:"SlotBtnGroup",props:F({cid:{}},{modelValue:{default:[]},modelModifiers:{}}),emits:["update:modelValue"],setup(b){const t=y(b,"modelValue"),s=w(),e=R(null);function _(o){return{title:"标题",icon:"",visibleName:`visible_${b.cid}_${o}`,disabledName:`disabled_${b.cid}_${o}`,clickName:`onclick_${b.cid}_${o}`,theme:"",cid:o,className:""}}function C(){e.value=_(V()),t.value.push(e.value)}function $(){e.value&&(s.singleEventReduce(e.value.clickName),e.value.clickName="")}function g(o,a){var l;if(a.cid===((l=e.value)==null?void 0:l.cid)){const{disabledName:f,visibleName:d,clickName:u}=e.value;f&&s.singleEventReduce(f),d&&s.singleEventReduce(d),u&&s.singleEventReduce(u),e.value=null}t.value.splice(o,1)}function S(o){if(!o.clickName){const a=`mplBaseInputSlotBtnClick_${V()}`;o.clickName=a,s.singleEventPlus({name:a,code:"",type:"code",desc:"基础输入 - 辅助按钮 - 点击事件"})}}function U(o){e.value=o}return(o,a)=>(i(),c(N,null,[t.value?(i(),x(G(M),{key:0,ref:"el",modelValue:t.value,"onUpdate:modelValue":a[0]||(a[0]=l=>t.value=l),handle:".mpl-baseInput-slotBtn-sort-handler"},{default:m(()=>[(i(!0),c(N,null,I(t.value,(l,f)=>{var d;return i(),c("div",{key:l.cid,class:"slot-btn-line"},[v("button",{class:B(["mpl-btn mr-5 icon icon-edit5",{"is-active":((d=e.value)==null?void 0:d.cid)===l.cid}]),onClick:u=>U(l)},null,10,A),a[7]||(a[7]=v("button",{class:"mpl-btn mr-5 icon icon-drag mpl-baseInput-slotBtn-sort-handler"},null,-1)),n(p,{modelValue:l.title,"onUpdate:modelValue":u=>l.title=u},null,8,["modelValue","onUpdate:modelValue"]),v("button",{class:"mpl-btn del-btn ml-5 icon icon-close1",onClick:u=>g(f,l)},null,8,H)])}),128))]),_:1},8,["modelValue"])):k("",!0),v("button",{class:"mpl-btn plus-btn icon icon-plus",onClick:C},"添加按钮"),e.value?(i(),c("div",L,[n(r,{modelValue:e.value.icon,"onUpdate:modelValue":a[1]||(a[1]=l=>e.value.icon=l),label:"图标",icon:""},null,8,["modelValue"]),n(r,{label:"点击事件"},{default:m(()=>[n(p,{modelValue:e.value.clickName,"onUpdate:modelValue":a[2]||(a[2]=l=>e.value.clickName=l),disabled:""},null,8,["modelValue"]),e.value.clickName?(i(),c("button",{key:0,class:"mpl-btn del-btn ml-5 icon icon-close1",onClick:$})):k("",!0),v("button",{class:B(["mpl-btn ml-5 icon",[e.value.clickName?"icon-select5":"icon-add"]]),onClick:a[3]||(a[3]=l=>S(e.value))},null,2)]),_:1}),n(r,{label:"显示/隐藏",var:e.value.visibleName},{default:m(()=>[n(p,{modelValue:e.value.visibleName,"onUpdate:modelValue":a[4]||(a[4]=l=>e.value.visibleName=l),disabled:""},null,8,["modelValue"])]),_:1},8,["var"]),n(r,{label:"禁用变量",var:e.value.disabledName},{default:m(()=>[n(p,{modelValue:e.value.disabledName,"onUpdate:modelValue":a[5]||(a[5]=l=>e.value.disabledName=l),disabled:""},null,8,["modelValue"])]),_:1},8,["var"]),n(r,{label:"唯一标识",var:e.value.cid},{default:m(()=>[n(p,{modelValue:e.value.cid,"onUpdate:modelValue":a[6]||(a[6]=l=>e.value.cid=l),disabled:""},null,8,["modelValue"])]),_:1},8,["var"])])):k("",!0)],64))}}),O=z(P,[["__scopeId","data-v-c592a61d"]]);export{O as S};