import{d as b,g as d,m as f,r as i,o as c,c as k,w as r,e as l,n as o,u as m,h as v,k as w,t as g,b as C,D as P,i as V,p as x}from"./.pnpm-CFV4EdYx.js";import{f as y,l as N}from"./constant-BmPVFlnt.js";const R={class:"mpl-label"},B=["title"],q={key:0,class:"mpl-label-icon"},z=b({__name:"ElementPlus",props:{node:{}},setup(p){const e=p,t=d(e.node.dateRangePicker),a=d(e.node.dateRangePicker.model);return f(()=>e.node.dateRangePicker.model,n=>{a.value=n}),(n,s)=>{const u=i("el-date-picker"),_=i("el-form-item");return c(),k(_,{theme:"mpl",required:t.value.required,class:o(["mpl-form-item",[{"mpl-none":!e.node.label.show},m(N).get(e.node.label.pos)]]),cid:e.node.cid,"label-width":e.node.label.width===0?80:e.node.label.width},{label:r(()=>[w(l("div",R,[l("span",{title:e.node.label.text},g(e.node.label.text),9,B),e.node.label.icon?(c(),C("div",q,[l("i",{class:o(["mpl icon",[e.node.label.icon]]),style:P({color:e.node.label.iconTheme})},null,6)])):V("",!0)],512),[[x,e.node.label.show]])]),default:r(()=>[l("div",{class:o(["mpl-content",[m(y).get(t.value.pos)]])},[v(u,{modelValue:a.value,"onUpdate:modelValue":s[0]||(s[0]=h=>a.value=h),type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])],2)]),_:1},8,["required","cid","class","label-width"])}}});export{z as default};