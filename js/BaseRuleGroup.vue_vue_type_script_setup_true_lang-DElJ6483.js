import{d as k,af as h,o as e,b as o,F as d,f as c,h as a,w as s,u as p,c as C,k as U,s as B,i as x,e as u}from"./.pnpm-CFV4EdYx.js";import{s as y}from"./rule-CulUxyYZ.js";import{a as f,_ as i}from"./FormItem.vue_vue_type_style_index_0_lang-unl56FD5.js";import{r as R,a as w}from"./constant-BmPVFlnt.js";const M={class:"form-block"},N=["onUpdate:modelValue"],O=["label","value","title"],$=["onClick"],G=k({__name:"BaseRuleGroup",props:{modelValue:{default:[]},modelModifiers:{}},emits:["update:modelValue"],setup(_){const r=h(_,"modelValue");function V(){r.value.push({mod:"system",trigger:["blur"],option:[{value:"required",message:"请输入"}],message:""})}function v(b){r.value.splice(b,1)}return(b,m)=>(e(),o(d,null,[(e(!0),o(d,null,c(r.value,(t,g)=>(e(),o("div",M,[a(i,{label:"规则类型"},{default:s(()=>[a(f,{option:p(R),modelValue:t.mod,"onUpdate:modelValue":l=>t.mod=l},null,8,["option","modelValue","onUpdate:modelValue"])]),_:2},1024),t.mod==="system"?(e(),C(i,{key:0,label:"规则"},{default:s(()=>[(e(!0),o(d,null,c(t.option,l=>U((e(),o("select",{"onUpdate:modelValue":n=>l.value=n,class:"mpl-select"},[(e(!0),o(d,null,c(p(y),n=>(e(),o("option",{label:n.label,value:n.value,title:n.message},null,8,O))),256))],8,N)),[[B,l.value]])),256))]),_:2},1024)):x("",!0),a(i,{label:"错误提示"},{default:s(()=>m[0]||(m[0]=[u("input",{class:"mpl-input",placeholder:"默认显示为：请输入"},null,-1),u("button",{class:"icon-in1 icon mpl-btn ml-5"},null,-1)])),_:1}),a(i,{label:"触发条件"},{default:s(()=>[a(f,{option:p(w),checkbox:"",modelValue:t.trigger,"onUpdate:modelValue":l=>t.trigger=l},null,8,["option","modelValue","onUpdate:modelValue"])]),_:2},1024),a(i,{label:"操作"},{default:s(()=>[u("button",{class:"mpl-btn del-btn icon icon-close1",onClick:l=>v(g)},null,8,$),m[1]||(m[1]=u("button",{class:"mpl-btn ml-5 icon icon-select5"},null,-1))]),_:2},1024)]))),256)),u("button",{class:"mpl-btn plus-btn icon icon-plus",onClick:V},"添加规则")],64))}});export{G as _};