import{d as k,g as p,m as y,r as i,o as l,c as _,w as a,e as t,n as m,u as c,h as C,b as n,F as v,f as V,l as x,t as f,k as N,D as B,i as D,p as q}from"./.pnpm-CFV4EdYx.js";import{f as P,l as S}from"./constant-BmPVFlnt.js";import{j as z}from"./index-CHDEKTv2.js";const E={class:"mpl-label"},F=["title"],T={key:0,class:"mpl-label-icon"},j={key:1,class:"service-dynamic"},U=k({__name:"ElementPlus",props:{node:{}},setup(b){const e=b,r=p(e.node.radio),d=p(e.node.radio.model);return y(()=>e.node.radio.model,u=>{d.value=u}),(u,s)=>{const h=i("el-radio"),w=i("el-radio-group"),g=i("el-form-item");return l(),_(g,{theme:"mpl",required:r.value.required,class:m(["mpl-form-item",[{"mpl-none":!e.node.label.show},c(S).get(e.node.label.pos)]]),cid:e.node.cid,"label-width":e.node.label.width===0?80:e.node.label.width},{label:a(()=>[N(t("div",E,[t("span",{title:e.node.label.text},f(e.node.label.text),9,F),e.node.label.icon?(l(),n("div",T,[t("i",{class:m(["mpl icon",[e.node.label.icon]]),style:B({color:e.node.label.iconTheme})},null,6)])):D("",!0)],512),[[q,e.node.label.show]])]),error:a(()=>s[1]||(s[1]=[t("div",{class:"mpl-form-item-error"}," 错误信息提示 ",-1)])),default:a(()=>[t("div",{class:m(["mpl-content",[c(P).get(r.value.pos)]])},[C(w,{modelValue:d.value,"onUpdate:modelValue":s[0]||(s[0]=o=>d.value=o),class:"ml-4"},{default:a(()=>[(l(!0),n(v,null,V(c(z)(),o=>(l(),n(v,{key:o.value},[r.value.service.mode==="static"?(l(),_(h,{key:0,value:o.value},{default:a(()=>[x(f(o.label),1)]),_:2},1032,["value"])):(l(),n("div",j," 动态数据，预览生效 "))],64))),128))]),_:1},8,["modelValue"])],2)]),_:1},8,["required","cid","class","label-width"])}}});export{U as default};