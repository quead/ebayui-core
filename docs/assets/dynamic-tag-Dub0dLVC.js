import{g as F}from"./_commonjsHelpers-Cpj98o6Y.js";import{c as G,C as K,a as P,_ as V}from"./registry-ZV7By7ZP.js";var x=G.NOOP,W=P,X=K,Y=V,c=X.R_,q=function(){return x},I=1,T=typeof document>"u",s=function l(_,a,C,f,r,E,i,R,d){if(a){a.default&&(a=a.default);var v=C&&C(),n=i&&i.r_;if(typeof a=="string")f?(_.bh_(a,v,R,i,j(i,d,E)),f(_),_.bi_()):_.bj_(a,v,R,i,j(i,d,E));else{v==null?v={renderBody:f}:typeof v=="object"&&(v=y(v),f&&(v.renderBody=f));var O=a._||(a.renderer?a.renderer.renderer||a.renderer:a.render),b=a&&a.renderBody||a;if(l.bk_&&(O=l.bk_(O,b,r)),O)_.c(i,R,d),O(v,_),_._X_=null;else{var e=typeof b=="function";if(e){var L=i?i.t_:0,w=L&I,h=b===x,J=T?w:h;if(_.bf(R,n,J),!h&&e){var N=c(_),S=N.n_,u=N.o_;N.n_=new W(n,S.id+"-"+S.aK_(R),u),b.toJSON=q,r?b.apply(null,[_].concat(r,v)):b(_,v),N.n_=S}_.ef()}else _.error("Invalid dynamic tag value")}}}else f&&(_.bf(R,n,T&&i&&i.t_&I),f(_),_.ef())};function y(l){var _={};for(var a in l)_[Y.bg_(a)]=l[a];return _}function j(l,_,a){var C=_?_.length:0;if(C===0)return a;for(var f=a||{},r,E=C;E--;)r=_[E],f["on"+r[0]]=l.d(r[0],r[1],r[2],r[3]);return f}const H=F(s);export{H as _};