import{t as d,r as f,b as h,f as p,g as u,e as x,p as y,d as C}from"./registry-DcejNBCz.js";/* empty css              */import{_ as g,a as w,b as S,c as v}from"./index--F4JyeQF.js";import{_ as c}from"./render-tag-BBOJ9dEX.js";class $ extends Marko.Component{forwardEvent(e,s,a){const r=a||this.el.querySelector("input"),k=r.value,t=r.checked;this.emit(`${e}`,{originalEvent:s,value:k,checked:t})}}const n="QCRbkPsA",o=d(n),I=o;function E(){}f.r(n,()=>$);const _={};o._=h(function(l,e,s,a,r,k){const{class:t,style:m,size:i,iconStyle:A,...b}=l;l.toJSON=E,e.be("span",{class:p(["checkbox",t]),style:u(m)},"0",a,null,1),e.e("input",x(y(b),{class:"checkbox__control",type:"checkbox"}),"1",a,0,4,{onclick:s.d("click","forwardEvent",!1,["change"]),onfocus:s.d("focus","forwardEvent",!1,["focus"]),onkeydown:s.d("keydown","forwardEvent",!1,["keydown"])}),e.be("span",{class:"checkbox__icon",hidden:""},"2",a,null,0),i==="large"?(c(g,{class:"checkbox__unchecked",focusable:"false",noSkinClasses:!0},e,s,"3"),c(w,{class:"checkbox__checked",focusable:"false",noSkinClasses:!0},e,s,"4")):(c(S,{class:"checkbox__unchecked",focusable:"false",noSkinClasses:!0},e,s,"5"),c(v,{class:"checkbox__checked",focusable:"false",noSkinClasses:!0},e,s,"6")),e.ee(),e.ee()},{t:n,s:!0},_);o.Component=C(_,o._);export{I as _};