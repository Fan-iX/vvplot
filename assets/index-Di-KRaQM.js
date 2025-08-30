(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();/**
* @vue/shared v3.5.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function Ko(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const we={},$n=[],At=()=>{},Mn=()=>!1,Ar=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Uo=e=>e.startsWith("onUpdate:"),Ve=Object.assign,Jo=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Tu=Object.prototype.hasOwnProperty,Te=(e,t)=>Tu.call(e,t),ce=Array.isArray,En=e=>_i(e)==="[object Map]",Lr=e=>_i(e)==="[object Set]",Ls=e=>_i(e)==="[object Date]",he=e=>typeof e=="function",$e=e=>typeof e=="string",wt=e=>typeof e=="symbol",Ce=e=>e!==null&&typeof e=="object",ta=e=>(Ce(e)||he(e))&&he(e.then)&&he(e.catch),na=Object.prototype.toString,_i=e=>na.call(e),Pu=e=>_i(e).slice(8,-1),ia=e=>_i(e)==="[object Object]",Zo=e=>$e(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,ri=Ko(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Mr=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Au=/-(\w)/g,ft=Mr(e=>e.replace(Au,(t,n)=>n?n.toUpperCase():"")),Lu=/\B([A-Z])/g,sn=Mr(e=>e.replace(Lu,"-$1").toLowerCase()),Cr=Mr(e=>e.charAt(0).toUpperCase()+e.slice(1)),Kr=Mr(e=>e?`on${Cr(e)}`:""),ot=(e,t)=>!Object.is(e,t),Bi=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},ra=(e,t,n,i=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:i,value:n})},oa=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Ms;const Wr=()=>Ms||(Ms=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ki(e){if(ce(e)){const t={};for(let n=0;n<e.length;n++){const i=e[n],r=$e(i)?Nu(i):ki(i);if(r)for(const o in r)t[o]=r[o]}return t}else if($e(e)||Ce(e))return e}const Mu=/;(?![^(]*\))/g,Cu=/:([^]+)/,Wu=/\/\*[^]*?\*\//g;function Nu(e){const t={};return e.replace(Wu,"").split(Mu).forEach(n=>{if(n){const i=n.split(Cu);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function wn(e){let t="";if($e(e))t=e;else if(ce(e))for(let n=0;n<e.length;n++){const i=wn(e[n]);i&&(t+=i+" ")}else if(Ce(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function Qo(e){if(!e)return null;let{class:t,style:n}=e;return t&&!$e(t)&&(e.class=wn(t)),n&&(e.style=ki(n)),e}const $u="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Eu=Ko($u);function sa(e){return!!e||e===""}function Iu(e,t){if(e.length!==t.length)return!1;let n=!0;for(let i=0;n&&i<e.length;i++)n=Nr(e[i],t[i]);return n}function Nr(e,t){if(e===t)return!0;let n=Ls(e),i=Ls(t);if(n||i)return n&&i?e.getTime()===t.getTime():!1;if(n=wt(e),i=wt(t),n||i)return e===t;if(n=ce(e),i=ce(t),n||i)return n&&i?Iu(e,t):!1;if(n=Ce(e),i=Ce(t),n||i){if(!n||!i)return!1;const r=Object.keys(e).length,o=Object.keys(t).length;if(r!==o)return!1;for(const s in e){const a=e.hasOwnProperty(s),l=t.hasOwnProperty(s);if(a&&!l||!a&&l||!Nr(e[s],t[s]))return!1}}return String(e)===String(t)}function Ou(e,t){return e.findIndex(n=>Nr(n,t))}const la=e=>!!(e&&e.__v_isRef===!0),Fe=e=>$e(e)?e:e==null?"":ce(e)||Ce(e)&&(e.toString===na||!he(e.toString))?la(e)?Fe(e.value):JSON.stringify(e,aa,2):String(e),aa=(e,t)=>la(t)?aa(e,t.value):En(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[i,r],o)=>(n[Ur(i,o)+" =>"]=r,n),{})}:Lr(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Ur(n))}:wt(t)?Ur(t):Ce(t)&&!ce(t)&&!ia(t)?String(t):t,Ur=(e,t="")=>{var n;return wt(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Xe;class Ru{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Xe,!t&&Xe&&(this.index=(Xe.scopes||(Xe.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=Xe;try{return Xe=this,t()}finally{Xe=n}}}on(){++this._on===1&&(this.prevScope=Xe,Xe=this)}off(){this._on>0&&--this._on===0&&(Xe=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,i=this.scopes.length;n<i;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function ca(){return Xe}function Fu(e,t=!1){Xe&&Xe.cleanups.push(e)}let Me;const Jr=new WeakSet;class ua{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Xe&&Xe.active&&Xe.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Jr.has(this)&&(Jr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||fa(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Cs(this),da(this);const t=Me,n=bt;Me=this,bt=!0;try{return this.fn()}finally{ma(this),Me=t,bt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)ns(t);this.deps=this.depsTail=void 0,Cs(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Jr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){xo(this)&&this.run()}get dirty(){return xo(this)}}let ha=0,oi,si;function fa(e,t=!1){if(e.flags|=8,t){e.next=si,si=e;return}e.next=oi,oi=e}function es(){ha++}function ts(){if(--ha>0)return;if(si){let t=si;for(si=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;oi;){let t=oi;for(oi=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){e||(e=i)}t=n}}if(e)throw e}function da(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function ma(e){let t,n=e.depsTail,i=n;for(;i;){const r=i.prevDep;i.version===-1?(i===n&&(n=r),ns(i),ju(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}e.deps=t,e.depsTail=n}function xo(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(ga(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function ga(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===hi)||(e.globalVersion=hi,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!xo(e))))return;e.flags|=2;const t=e.dep,n=Me,i=bt;Me=e,bt=!0;try{da(e);const r=e.fn(e._value);(t.version===0||ot(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{Me=n,bt=i,ma(e),e.flags&=-3}}function ns(e,t=!1){const{dep:n,prevSub:i,nextSub:r}=e;if(i&&(i.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=i,e.nextSub=void 0),n.subs===e&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let o=n.computed.deps;o;o=o.nextDep)ns(o,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function ju(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let bt=!0;const pa=[];function Ht(){pa.push(bt),bt=!1}function qt(){const e=pa.pop();bt=e===void 0?!0:e}function Cs(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=Me;Me=void 0;try{t()}finally{Me=n}}}let hi=0;class Du{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class $r{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Me||!bt||Me===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Me)n=this.activeLink=new Du(Me,this),Me.deps?(n.prevDep=Me.depsTail,Me.depsTail.nextDep=n,Me.depsTail=n):Me.deps=Me.depsTail=n,ya(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=Me.depsTail,n.nextDep=void 0,Me.depsTail.nextDep=n,Me.depsTail=n,Me.deps===n&&(Me.deps=i)}return n}trigger(t){this.version++,hi++,this.notify(t)}notify(t){es();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{ts()}}}function ya(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)ya(i)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const bo=new WeakMap,gn=Symbol(""),wo=Symbol(""),fi=Symbol("");function Ke(e,t,n){if(bt&&Me){let i=bo.get(e);i||bo.set(e,i=new Map);let r=i.get(n);r||(i.set(n,r=new $r),r.map=i,r.key=n),r.track()}}function Dt(e,t,n,i,r,o){const s=bo.get(e);if(!s){hi++;return}const a=l=>{l&&l.trigger()};if(es(),t==="clear")s.forEach(a);else{const l=ce(e),c=l&&Zo(n);if(l&&n==="length"){const u=Number(i);s.forEach((h,f)=>{(f==="length"||f===fi||!wt(f)&&f>=u)&&a(h)})}else switch((n!==void 0||s.has(void 0))&&a(s.get(n)),c&&a(s.get(fi)),t){case"add":l?c&&a(s.get("length")):(a(s.get(gn)),En(e)&&a(s.get(wo)));break;case"delete":l||(a(s.get(gn)),En(e)&&a(s.get(wo)));break;case"set":En(e)&&a(s.get(gn));break}}ts()}function kn(e){const t=ke(e);return t===e?t:(Ke(t,"iterate",fi),mt(e)?t:t.map(He))}function Er(e){return Ke(e=ke(e),"iterate",fi),e}const Vu={__proto__:null,[Symbol.iterator](){return Zr(this,Symbol.iterator,He)},concat(...e){return kn(this).concat(...e.map(t=>ce(t)?kn(t):t))},entries(){return Zr(this,"entries",e=>(e[1]=He(e[1]),e))},every(e,t){return Et(this,"every",e,t,void 0,arguments)},filter(e,t){return Et(this,"filter",e,t,n=>n.map(He),arguments)},find(e,t){return Et(this,"find",e,t,He,arguments)},findIndex(e,t){return Et(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Et(this,"findLast",e,t,He,arguments)},findLastIndex(e,t){return Et(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Et(this,"forEach",e,t,void 0,arguments)},includes(...e){return Qr(this,"includes",e)},indexOf(...e){return Qr(this,"indexOf",e)},join(e){return kn(this).join(e)},lastIndexOf(...e){return Qr(this,"lastIndexOf",e)},map(e,t){return Et(this,"map",e,t,void 0,arguments)},pop(){return Un(this,"pop")},push(...e){return Un(this,"push",e)},reduce(e,...t){return Ws(this,"reduce",e,t)},reduceRight(e,...t){return Ws(this,"reduceRight",e,t)},shift(){return Un(this,"shift")},some(e,t){return Et(this,"some",e,t,void 0,arguments)},splice(...e){return Un(this,"splice",e)},toReversed(){return kn(this).toReversed()},toSorted(e){return kn(this).toSorted(e)},toSpliced(...e){return kn(this).toSpliced(...e)},unshift(...e){return Un(this,"unshift",e)},values(){return Zr(this,"values",He)}};function Zr(e,t,n){const i=Er(e),r=i[t]();return i!==e&&!mt(e)&&(r._next=r.next,r.next=()=>{const o=r._next();return o.value&&(o.value=n(o.value)),o}),r}const zu=Array.prototype;function Et(e,t,n,i,r,o){const s=Er(e),a=s!==e&&!mt(e),l=s[t];if(l!==zu[t]){const h=l.apply(e,o);return a?He(h):h}let c=n;s!==e&&(a?c=function(h,f){return n.call(this,He(h),f,e)}:n.length>2&&(c=function(h,f){return n.call(this,h,f,e)}));const u=l.call(s,c,i);return a&&r?r(u):u}function Ws(e,t,n,i){const r=Er(e);let o=n;return r!==e&&(mt(e)?n.length>3&&(o=function(s,a,l){return n.call(this,s,a,l,e)}):o=function(s,a,l){return n.call(this,s,He(a),l,e)}),r[t](o,...i)}function Qr(e,t,n){const i=ke(e);Ke(i,"iterate",fi);const r=i[t](...n);return(r===-1||r===!1)&&os(n[0])?(n[0]=ke(n[0]),i[t](...n)):r}function Un(e,t,n=[]){Ht(),es();const i=ke(e)[t].apply(e,n);return ts(),qt(),i}const Bu=Ko("__proto__,__v_isRef,__isVue"),xa=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(wt));function Hu(e){wt(e)||(e=String(e));const t=ke(this);return Ke(t,"has",e),t.hasOwnProperty(e)}class ba{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,i){if(n==="__v_skip")return t.__v_skip;const r=this._isReadonly,o=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return o;if(n==="__v_raw")return i===(r?o?eh:_a:o?Sa:va).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const s=ce(t);if(!r){let l;if(s&&(l=Vu[n]))return l;if(n==="hasOwnProperty")return Hu}const a=Reflect.get(t,n,De(t)?t:i);return(wt(n)?xa.has(n):Bu(n))||(r||Ke(t,"get",n),o)?a:De(a)?s&&Zo(n)?a:a.value:Ce(a)?r?ka(a):di(a):a}}class wa extends ba{constructor(t=!1){super(!1,t)}set(t,n,i,r){let o=t[n];if(!this._isShallow){const l=on(o);if(!mt(i)&&!on(i)&&(o=ke(o),i=ke(i)),!ce(t)&&De(o)&&!De(i))return l||(o.value=i),!0}const s=ce(t)&&Zo(n)?Number(n)<t.length:Te(t,n),a=Reflect.set(t,n,i,De(t)?t:r);return t===ke(r)&&(s?ot(i,o)&&Dt(t,"set",n,i):Dt(t,"add",n,i)),a}deleteProperty(t,n){const i=Te(t,n);t[n];const r=Reflect.deleteProperty(t,n);return r&&i&&Dt(t,"delete",n,void 0),r}has(t,n){const i=Reflect.has(t,n);return(!wt(n)||!xa.has(n))&&Ke(t,"has",n),i}ownKeys(t){return Ke(t,"iterate",ce(t)?"length":gn),Reflect.ownKeys(t)}}class qu extends ba{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Gu=new wa,Xu=new qu,Yu=new wa(!0);const vo=e=>e,Mi=e=>Reflect.getPrototypeOf(e);function Ku(e,t,n){return function(...i){const r=this.__v_raw,o=ke(r),s=En(o),a=e==="entries"||e===Symbol.iterator&&s,l=e==="keys"&&s,c=r[e](...i),u=n?vo:t?tr:He;return!t&&Ke(o,"iterate",l?wo:gn),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function Ci(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Uu(e,t){const n={get(r){const o=this.__v_raw,s=ke(o),a=ke(r);e||(ot(r,a)&&Ke(s,"get",r),Ke(s,"get",a));const{has:l}=Mi(s),c=t?vo:e?tr:He;if(l.call(s,r))return c(o.get(r));if(l.call(s,a))return c(o.get(a));o!==s&&o.get(r)},get size(){const r=this.__v_raw;return!e&&Ke(ke(r),"iterate",gn),r.size},has(r){const o=this.__v_raw,s=ke(o),a=ke(r);return e||(ot(r,a)&&Ke(s,"has",r),Ke(s,"has",a)),r===a?o.has(r):o.has(r)||o.has(a)},forEach(r,o){const s=this,a=s.__v_raw,l=ke(a),c=t?vo:e?tr:He;return!e&&Ke(l,"iterate",gn),a.forEach((u,h)=>r.call(o,c(u),c(h),s))}};return Ve(n,e?{add:Ci("add"),set:Ci("set"),delete:Ci("delete"),clear:Ci("clear")}:{add(r){!t&&!mt(r)&&!on(r)&&(r=ke(r));const o=ke(this);return Mi(o).has.call(o,r)||(o.add(r),Dt(o,"add",r,r)),this},set(r,o){!t&&!mt(o)&&!on(o)&&(o=ke(o));const s=ke(this),{has:a,get:l}=Mi(s);let c=a.call(s,r);c||(r=ke(r),c=a.call(s,r));const u=l.call(s,r);return s.set(r,o),c?ot(o,u)&&Dt(s,"set",r,o):Dt(s,"add",r,o),this},delete(r){const o=ke(this),{has:s,get:a}=Mi(o);let l=s.call(o,r);l||(r=ke(r),l=s.call(o,r)),a&&a.call(o,r);const c=o.delete(r);return l&&Dt(o,"delete",r,void 0),c},clear(){const r=ke(this),o=r.size!==0,s=r.clear();return o&&Dt(r,"clear",void 0,void 0),s}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Ku(r,e,t)}),n}function is(e,t){const n=Uu(e,t);return(i,r,o)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?i:Reflect.get(Te(n,r)&&r in i?n:i,r,o)}const Ju={get:is(!1,!1)},Zu={get:is(!1,!0)},Qu={get:is(!0,!1)};const va=new WeakMap,Sa=new WeakMap,_a=new WeakMap,eh=new WeakMap;function th(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function nh(e){return e.__v_skip||!Object.isExtensible(e)?0:th(Pu(e))}function di(e){return on(e)?e:rs(e,!1,Gu,Ju,va)}function ih(e){return rs(e,!1,Yu,Zu,Sa)}function ka(e){return rs(e,!0,Xu,Qu,_a)}function rs(e,t,n,i,r){if(!Ce(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const o=nh(e);if(o===0)return e;const s=r.get(e);if(s)return s;const a=new Proxy(e,o===2?i:n);return r.set(e,a),a}function In(e){return on(e)?In(e.__v_raw):!!(e&&e.__v_isReactive)}function on(e){return!!(e&&e.__v_isReadonly)}function mt(e){return!!(e&&e.__v_isShallow)}function os(e){return e?!!e.__v_raw:!1}function ke(e){const t=e&&e.__v_raw;return t?ke(t):e}function rh(e){return!Te(e,"__v_skip")&&Object.isExtensible(e)&&ra(e,"__v_skip",!0),e}const He=e=>Ce(e)?di(e):e,tr=e=>Ce(e)?ka(e):e;function De(e){return e?e.__v_isRef===!0:!1}function Ir(e){return Ta(e,!1)}function nr(e){return Ta(e,!0)}function Ta(e,t){return De(e)?e:new oh(e,t)}class oh{constructor(t,n){this.dep=new $r,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:ke(t),this._value=n?t:He(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,i=this.__v_isShallow||mt(t)||on(t);t=i?t:ke(t),ot(t,n)&&(this._rawValue=t,this._value=i?t:He(t),this.dep.trigger())}}function V(e){return De(e)?e.value:e}function Pa(e){return he(e)?e():V(e)}const sh={get:(e,t,n)=>t==="__v_raw"?e:V(Reflect.get(e,t,n)),set:(e,t,n,i)=>{const r=e[t];return De(r)&&!De(n)?(r.value=n,!0):Reflect.set(e,t,n,i)}};function Aa(e){return In(e)?e:new Proxy(e,sh)}class lh{constructor(t){this.__v_isRef=!0,this._value=void 0;const n=this.dep=new $r,{get:i,set:r}=t(n.track.bind(n),n.trigger.bind(n));this._get=i,this._set=r}get value(){return this._value=this._get()}set value(t){this._set(t)}}function ah(e){return new lh(e)}class ch{constructor(t,n,i){this.fn=t,this.setter=n,this._value=void 0,this.dep=new $r(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=hi-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Me!==this)return fa(this,!0),!0}get value(){const t=this.dep.track();return ga(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function uh(e,t,n=!1){let i,r;return he(e)?i=e:(i=e.get,r=e.set),new ch(i,r,n)}const Wi={},ir=new WeakMap;let un;function hh(e,t=!1,n=un){if(n){let i=ir.get(n);i||ir.set(n,i=[]),i.push(e)}}function fh(e,t,n=we){const{immediate:i,deep:r,once:o,scheduler:s,augmentJob:a,call:l}=n,c=C=>r?C:mt(C)||r===!1||r===0?Vt(C,1):Vt(C);let u,h,f,d,x=!1,b=!1;if(De(e)?(h=()=>e.value,x=mt(e)):In(e)?(h=()=>c(e),x=!0):ce(e)?(b=!0,x=e.some(C=>In(C)||mt(C)),h=()=>e.map(C=>{if(De(C))return C.value;if(In(C))return c(C);if(he(C))return l?l(C,2):C()})):he(e)?t?h=l?()=>l(e,2):e:h=()=>{if(f){Ht();try{f()}finally{qt()}}const C=un;un=u;try{return l?l(e,3,[d]):e(d)}finally{un=C}}:h=At,t&&r){const C=h,m=r===!0?1/0:r;h=()=>Vt(C(),m)}const R=ca(),F=()=>{u.stop(),R&&R.active&&Jo(R.effects,u)};if(o&&t){const C=t;t=(...m)=>{C(...m),F()}}let E=b?new Array(e.length).fill(Wi):Wi;const M=C=>{if(!(!(u.flags&1)||!u.dirty&&!C))if(t){const m=u.run();if(r||x||(b?m.some((_,w)=>ot(_,E[w])):ot(m,E))){f&&f();const _=un;un=u;try{const w=[m,E===Wi?void 0:b&&E[0]===Wi?[]:E,d];E=m,l?l(t,3,w):t(...w)}finally{un=_}}}else u.run()};return a&&a(M),u=new ua(h),u.scheduler=s?()=>s(M,!1):M,d=C=>hh(C,!1,u),f=u.onStop=()=>{const C=ir.get(u);if(C){if(l)l(C,4);else for(const m of C)m();ir.delete(u)}},t?i?M(!0):E=u.run():s?s(M.bind(null,!0),!0):u.run(),F.pause=u.pause.bind(u),F.resume=u.resume.bind(u),F.stop=F,F}function Vt(e,t=1/0,n){if(t<=0||!Ce(e)||e.__v_skip||(n=n||new Set,n.has(e)))return e;if(n.add(e),t--,De(e))Vt(e.value,t,n);else if(ce(e))for(let i=0;i<e.length;i++)Vt(e[i],t,n);else if(Lr(e)||En(e))e.forEach(i=>{Vt(i,t,n)});else if(ia(e)){for(const i in e)Vt(e[i],t,n);for(const i of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,i)&&Vt(e[i],t,n)}return e}/**
* @vue/runtime-core v3.5.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ti(e,t,n,i){try{return i?e(...i):e()}catch(r){Or(r,t,n)}}function Ct(e,t,n,i){if(he(e)){const r=Ti(e,t,n,i);return r&&ta(r)&&r.catch(o=>{Or(o,t,n)}),r}if(ce(e)){const r=[];for(let o=0;o<e.length;o++)r.push(Ct(e[o],t,n,i));return r}}function Or(e,t,n,i=!0){const r=t?t.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=t&&t.appContext.config||we;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](e,l,c)===!1)return}a=a.parent}if(o){Ht(),Ti(o,null,10,[e,l,c]),qt();return}}dh(e,n,r,i,s)}function dh(e,t,n,i=!0,r=!1){if(r)throw e;console.error(e)}const nt=[];let Tt=-1;const On=[];let Qt=null,Ln=0;const La=Promise.resolve();let rr=null;function Rr(e){const t=rr||La;return e?t.then(this?e.bind(this):e):t}function mh(e){let t=Tt+1,n=nt.length;for(;t<n;){const i=t+n>>>1,r=nt[i],o=mi(r);o<e||o===e&&r.flags&2?t=i+1:n=i}return t}function ss(e){if(!(e.flags&1)){const t=mi(e),n=nt[nt.length-1];!n||!(e.flags&2)&&t>=mi(n)?nt.push(e):nt.splice(mh(t),0,e),e.flags|=1,Ma()}}function Ma(){rr||(rr=La.then(Wa))}function gh(e){ce(e)?On.push(...e):Qt&&e.id===-1?Qt.splice(Ln+1,0,e):e.flags&1||(On.push(e),e.flags|=1),Ma()}function Ns(e,t,n=Tt+1){for(;n<nt.length;n++){const i=nt[n];if(i&&i.flags&2){if(e&&i.id!==e.uid)continue;nt.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Ca(e){if(On.length){const t=[...new Set(On)].sort((n,i)=>mi(n)-mi(i));if(On.length=0,Qt){Qt.push(...t);return}for(Qt=t,Ln=0;Ln<Qt.length;Ln++){const n=Qt[Ln];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Qt=null,Ln=0}}const mi=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Wa(e){try{for(Tt=0;Tt<nt.length;Tt++){const t=nt[Tt];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Ti(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Tt<nt.length;Tt++){const t=nt[Tt];t&&(t.flags&=-2)}Tt=-1,nt.length=0,Ca(),rr=null,(nt.length||On.length)&&Wa()}}let qe=null,Na=null;function or(e){const t=qe;return qe=e,Na=e&&e.type.__scopeId||null,t}function je(e,t=qe,n){if(!t||e._n)return e;const i=(...r)=>{i._d&&qs(-1);const o=or(t);let s;try{s=e(...r)}finally{or(o),i._d&&qs(1)}return s};return i._n=!0,i._c=!0,i._d=!0,i}function $a(e,t){if(qe===null)return e;const n=Br(qe),i=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[o,s,a,l=we]=t[r];o&&(he(o)&&(o={mounted:o,updated:o}),o.deep&&Vt(s),i.push({dir:o,instance:n,value:s,oldValue:void 0,arg:a,modifiers:l}))}return e}function ln(e,t,n,i){const r=e.dirs,o=t&&t.dirs;for(let s=0;s<r.length;s++){const a=r[s];o&&(a.oldValue=o[s].value);let l=a.dir[i];l&&(Ht(),Ct(l,n,8,[e.el,a,e,t]),qt())}}const Ea=Symbol("_vte"),ph=e=>e.__isTeleport,li=e=>e&&(e.disabled||e.disabled===""),$s=e=>e&&(e.defer||e.defer===""),Es=e=>typeof SVGElement<"u"&&e instanceof SVGElement,Is=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,So=(e,t)=>{const n=e&&e.to;return $e(n)?t?t(n):null:n},Ia={name:"Teleport",__isTeleport:!0,process(e,t,n,i,r,o,s,a,l,c){const{mc:u,pc:h,pbc:f,o:{insert:d,querySelector:x,createText:b,createComment:R}}=c,F=li(t.props);let{shapeFlag:E,children:M,dynamicChildren:C}=t;if(e==null){const m=t.el=b(""),_=t.anchor=b("");d(m,n,i),d(_,n,i);const w=(L,X)=>{E&16&&(r&&r.isCE&&(r.ce._teleportTarget=L),u(M,L,X,r,o,s,a,l))},k=()=>{const L=t.target=So(t.props,x),X=Oa(L,t,b,d);L&&(s!=="svg"&&Es(L)?s="svg":s!=="mathml"&&Is(L)&&(s="mathml"),F||(w(L,X),Hi(t,!1)))};F&&(w(n,_),Hi(t,!0)),$s(t.props)?(t.el.__isMounted=!1,tt(()=>{k(),delete t.el.__isMounted},o)):k()}else{if($s(t.props)&&e.el.__isMounted===!1){tt(()=>{Ia.process(e,t,n,i,r,o,s,a,l,c)},o);return}t.el=e.el,t.targetStart=e.targetStart;const m=t.anchor=e.anchor,_=t.target=e.target,w=t.targetAnchor=e.targetAnchor,k=li(e.props),L=k?n:_,X=k?m:w;if(s==="svg"||Es(_)?s="svg":(s==="mathml"||Is(_))&&(s="mathml"),C?(f(e.dynamicChildren,C,L,r,o,s,a),hs(e,t,!0)):l||h(e,t,L,X,r,o,s,a,!1),F)k?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Ni(t,n,m,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const B=t.target=So(t.props,x);B&&Ni(t,B,null,c,0)}else k&&Ni(t,_,w,c,1);Hi(t,F)}},remove(e,t,n,{um:i,o:{remove:r}},o){const{shapeFlag:s,children:a,anchor:l,targetStart:c,targetAnchor:u,target:h,props:f}=e;if(h&&(r(c),r(u)),o&&r(l),s&16){const d=o||!li(f);for(let x=0;x<a.length;x++){const b=a[x];i(b,t,n,d,!!b.dynamicChildren)}}},move:Ni,hydrate:yh};function Ni(e,t,n,{o:{insert:i},m:r},o=2){o===0&&i(e.targetAnchor,t,n);const{el:s,anchor:a,shapeFlag:l,children:c,props:u}=e,h=o===2;if(h&&i(s,t,n),(!h||li(u))&&l&16)for(let f=0;f<c.length;f++)r(c[f],t,n,2);h&&i(a,t,n)}function yh(e,t,n,i,r,o,{o:{nextSibling:s,parentNode:a,querySelector:l,insert:c,createText:u}},h){const f=t.target=So(t.props,l);if(f){const d=li(t.props),x=f._lpa||f.firstChild;if(t.shapeFlag&16)if(d)t.anchor=h(s(e),t,a(e),n,i,r,o),t.targetStart=x,t.targetAnchor=x&&s(x);else{t.anchor=s(e);let b=x;for(;b;){if(b&&b.nodeType===8){if(b.data==="teleport start anchor")t.targetStart=b;else if(b.data==="teleport anchor"){t.targetAnchor=b,f._lpa=t.targetAnchor&&s(t.targetAnchor);break}}b=s(b)}t.targetAnchor||Oa(f,t,u,c),h(x&&s(x),t,f,n,i,r,o)}Hi(t,d)}return t.anchor&&s(t.anchor)}const xh=Ia;function Hi(e,t){const n=e.ctx;if(n&&n.ut){let i,r;for(t?(i=e.el,r=e.anchor):(i=e.targetStart,r=e.targetAnchor);i&&i!==r;)i.nodeType===1&&i.setAttribute("data-v-owner",n.uid),i=i.nextSibling;n.ut()}}function Oa(e,t,n,i){const r=t.targetStart=n(""),o=t.targetAnchor=n("");return r[Ea]=o,e&&(i(r,e),i(o,e)),o}const bh=Symbol("_leaveCb");function ls(e,t){e.shapeFlag&6&&e.component?(e.transition=t,ls(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function wh(){const e=vn();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function Ra(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function st(e){const t=vn(),n=nr(null);if(t){const r=t.refs===we?t.refs={}:t.refs;Object.defineProperty(r,e,{enumerable:!0,get:()=>n.value,set:o=>n.value=o})}return n}function ai(e,t,n,i,r=!1){if(ce(e)){e.forEach((x,b)=>ai(x,t&&(ce(t)?t[b]:t),n,i,r));return}if(Rn(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&ai(e,t,n,i.component.subTree);return}const o=i.shapeFlag&4?Br(i.component):i.el,s=r?null:o,{i:a,r:l}=e,c=t&&t.r,u=a.refs===we?a.refs={}:a.refs,h=a.setupState,f=ke(h),d=h===we?Mn:x=>Te(f,x);if(c!=null&&c!==l){if($e(c))u[c]=null,d(c)&&(h[c]=null);else if(De(c)){c.value=null;const x=t;x.k&&(u[x.k]=null)}}if(he(l))Ti(l,a,12,[s,u]);else{const x=$e(l),b=De(l);if(x||b){const R=()=>{if(e.f){const F=x?d(l)?h[l]:u[l]:l.value;if(r)ce(F)&&Jo(F,o);else if(ce(F))F.includes(o)||F.push(o);else if(x)u[l]=[o],d(l)&&(h[l]=u[l]);else{const E=[o];l.value=E,e.k&&(u[e.k]=E)}}else x?(u[l]=s,d(l)&&(h[l]=s)):b&&(l.value=s,e.k&&(u[e.k]=s))};s?(R.id=-1,tt(R,n)):R()}}}Wr().requestIdleCallback;Wr().cancelIdleCallback;const Rn=e=>!!e.type.__asyncLoader,Fa=e=>e.type.__isKeepAlive;function vh(e,t){ja(e,"a",t)}function Sh(e,t){ja(e,"da",t)}function ja(e,t,n=Ue){const i=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(Fr(t,i,n),n){let r=n.parent;for(;r&&r.parent;)Fa(r.parent.vnode)&&_h(i,t,n,r),r=r.parent}}function _h(e,t,n,i){const r=Fr(t,e,i,!0);Da(()=>{Jo(i[t],r)},n)}function Fr(e,t,n=Ue,i=!1){if(n){const r=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...s)=>{Ht();const a=Pi(n),l=Ct(t,n,e,s);return a(),qt(),l});return i?r.unshift(o):r.push(o),o}}const Yt=e=>(t,n=Ue)=>{(!pi||e==="sp")&&Fr(e,(...i)=>t(...i),n)},kh=Yt("bm"),jr=Yt("m"),Th=Yt("bu"),Ph=Yt("u"),Ah=Yt("bum"),Da=Yt("um"),Lh=Yt("sp"),Mh=Yt("rtg"),Ch=Yt("rtc");function Wh(e,t=Ue){Fr("ec",e,t)}const Nh="components",Va=Symbol.for("v-ndc");function as(e){return $e(e)?$h(Nh,e,!1)||e:e||Va}function $h(e,t,n=!0,i=!1){const r=qe||Ue;if(r){const o=r.type;{const a=bf(o,!1);if(a&&(a===t||a===ft(t)||a===Cr(ft(t))))return o}const s=Os(r[e]||o[e],t)||Os(r.appContext[e],t);return!s&&i?o:s}}function Os(e,t){return e&&(e[t]||e[ft(t)]||e[Cr(ft(t))])}function Le(e,t,n,i){let r;const o=n,s=ce(e);if(s||$e(e)){const a=s&&In(e);let l=!1,c=!1;a&&(l=!mt(e),c=on(e),e=Er(e)),r=new Array(e.length);for(let u=0,h=e.length;u<h;u++)r[u]=t(l?c?tr(He(e[u])):He(e[u]):e[u],u,void 0,o)}else if(typeof e=="number"){r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,o)}else if(Ce(e))if(e[Symbol.iterator])r=Array.from(e,(a,l)=>t(a,l,void 0,o));else{const a=Object.keys(e);r=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];r[l]=t(e[u],u,l,o)}}else r=[];return r}function Rs(e,t,n={},i,r){if(qe.ce||qe.parent&&Rn(qe.parent)&&qe.parent.ce)return t!=="default"&&(n.name=t),D(),ct(ue,null,[ne("slot",n,i)],64);let o=e[t];o&&o._c&&(o._d=!1),D();const s=o&&za(o(n)),a=n.key||s&&s.key,l=ct(ue,{key:(a&&!wt(a)?a:`_${t}`)+(!s&&i?"_fb":"")},s||[],s&&e._===1?64:-2);return l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),o&&o._c&&(o._d=!0),l}function za(e){return e.some(t=>ds(t)?!(t.type===Gt||t.type===ue&&!za(t.children)):!0)?e:null}const _o=e=>e?cc(e)?Br(e):_o(e.parent):null,ci=Ve(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>_o(e.parent),$root:e=>_o(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Ga(e),$forceUpdate:e=>e.f||(e.f=()=>{ss(e.update)}),$nextTick:e=>e.n||(e.n=Rr.bind(e.proxy)),$watch:e=>rf.bind(e)}),eo=(e,t)=>e!==we&&!e.__isScriptSetup&&Te(e,t),Eh={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:i,data:r,props:o,accessCache:s,type:a,appContext:l}=e;let c;if(t[0]!=="$"){const d=s[t];if(d!==void 0)switch(d){case 1:return i[t];case 2:return r[t];case 4:return n[t];case 3:return o[t]}else{if(eo(i,t))return s[t]=1,i[t];if(r!==we&&Te(r,t))return s[t]=2,r[t];if((c=e.propsOptions[0])&&Te(c,t))return s[t]=3,o[t];if(n!==we&&Te(n,t))return s[t]=4,n[t];ko&&(s[t]=0)}}const u=ci[t];let h,f;if(u)return t==="$attrs"&&Ke(e.attrs,"get",""),u(e);if((h=a.__cssModules)&&(h=h[t]))return h;if(n!==we&&Te(n,t))return s[t]=4,n[t];if(f=l.config.globalProperties,Te(f,t))return f[t]},set({_:e},t,n){const{data:i,setupState:r,ctx:o}=e;return eo(r,t)?(r[t]=n,!0):i!==we&&Te(i,t)?(i[t]=n,!0):Te(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:i,appContext:r,propsOptions:o,type:s}},a){let l,c;return!!(n[a]||e!==we&&a[0]!=="$"&&Te(e,a)||eo(t,a)||(l=o[0])&&Te(l,a)||Te(i,a)||Te(ci,a)||Te(r.config.globalProperties,a)||(c=s.__cssModules)&&c[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Te(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Ih(){return Ha().slots}function Ba(){return Ha().attrs}function Ha(e){const t=vn();return t.setupContext||(t.setupContext=hc(t))}function sr(e){return ce(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}function Wt(e,t){return!e||!t?e||t:ce(e)&&ce(t)?e.concat(t):Ve({},sr(e),sr(t))}let ko=!0;function Oh(e){const t=Ga(e),n=e.proxy,i=e.ctx;ko=!1,t.beforeCreate&&Fs(t.beforeCreate,e,"bc");const{data:r,computed:o,methods:s,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:x,activated:b,deactivated:R,beforeDestroy:F,beforeUnmount:E,destroyed:M,unmounted:C,render:m,renderTracked:_,renderTriggered:w,errorCaptured:k,serverPrefetch:L,expose:X,inheritAttrs:B,components:te,directives:U,filters:me}=t;if(c&&Rh(c,i,null),s)for(const S in s){const A=s[S];he(A)&&(i[S]=A.bind(n))}if(r){const S=r.call(n,n);Ce(S)&&(e.data=di(S))}if(ko=!0,o)for(const S in o){const A=o[S],O=he(A)?A.bind(n,n):he(A.get)?A.get.bind(n,n):At,Z=!he(A)&&he(A.set)?A.set.bind(n):At,oe=ie({get:O,set:Z});Object.defineProperty(i,S,{enumerable:!0,configurable:!0,get:()=>oe.value,set:be=>oe.value=be})}if(a)for(const S in a)qa(a[S],i,n,S);if(l){const S=he(l)?l.call(n):l;Reflect.ownKeys(S).forEach(A=>{Bh(A,S[A])})}u&&Fs(u,e,"c");function K(S,A){ce(A)?A.forEach(O=>S(O.bind(n))):A&&S(A.bind(n))}if(K(kh,h),K(jr,f),K(Th,d),K(Ph,x),K(vh,b),K(Sh,R),K(Wh,k),K(Ch,_),K(Mh,w),K(Ah,E),K(Da,C),K(Lh,L),ce(X))if(X.length){const S=e.exposed||(e.exposed={});X.forEach(A=>{Object.defineProperty(S,A,{get:()=>n[A],set:O=>n[A]=O,enumerable:!0})})}else e.exposed||(e.exposed={});m&&e.render===At&&(e.render=m),B!=null&&(e.inheritAttrs=B),te&&(e.components=te),U&&(e.directives=U),L&&Ra(e)}function Rh(e,t,n=At){ce(e)&&(e=To(e));for(const i in e){const r=e[i];let o;Ce(r)?"default"in r?o=qi(r.from||i,r.default,!0):o=qi(r.from||i):o=qi(r),De(o)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>o.value,set:s=>o.value=s}):t[i]=o}}function Fs(e,t,n){Ct(ce(e)?e.map(i=>i.bind(t.proxy)):e.bind(t.proxy),t,n)}function qa(e,t,n,i){let r=i.includes(".")?ic(n,i):()=>n[i];if($e(e)){const o=t[e];he(o)&&it(r,o)}else if(he(e))it(r,e.bind(n));else if(Ce(e))if(ce(e))e.forEach(o=>qa(o,t,n,i));else{const o=he(e.handler)?e.handler.bind(n):t[e.handler];he(o)&&it(r,o,e)}}function Ga(e){const t=e.type,{mixins:n,extends:i}=t,{mixins:r,optionsCache:o,config:{optionMergeStrategies:s}}=e.appContext,a=o.get(t);let l;return a?l=a:!r.length&&!n&&!i?l=t:(l={},r.length&&r.forEach(c=>lr(l,c,s,!0)),lr(l,t,s)),Ce(t)&&o.set(t,l),l}function lr(e,t,n,i=!1){const{mixins:r,extends:o}=t;o&&lr(e,o,n,!0),r&&r.forEach(s=>lr(e,s,n,!0));for(const s in t)if(!(i&&s==="expose")){const a=Fh[s]||n&&n[s];e[s]=a?a(e[s],t[s]):t[s]}return e}const Fh={data:js,props:Ds,emits:Ds,methods:ei,computed:ei,beforeCreate:et,created:et,beforeMount:et,mounted:et,beforeUpdate:et,updated:et,beforeDestroy:et,beforeUnmount:et,destroyed:et,unmounted:et,activated:et,deactivated:et,errorCaptured:et,serverPrefetch:et,components:ei,directives:ei,watch:Dh,provide:js,inject:jh};function js(e,t){return t?e?function(){return Ve(he(e)?e.call(this,this):e,he(t)?t.call(this,this):t)}:t:e}function jh(e,t){return ei(To(e),To(t))}function To(e){if(ce(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function et(e,t){return e?[...new Set([].concat(e,t))]:t}function ei(e,t){return e?Ve(Object.create(null),e,t):t}function Ds(e,t){return e?ce(e)&&ce(t)?[...new Set([...e,...t])]:Ve(Object.create(null),sr(e),sr(t??{})):t}function Dh(e,t){if(!e)return t;if(!t)return e;const n=Ve(Object.create(null),e);for(const i in t)n[i]=et(e[i],t[i]);return n}function Xa(){return{app:null,config:{isNativeTag:Mn,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Vh=0;function zh(e,t){return function(i,r=null){he(i)||(i=Ve({},i)),r!=null&&!Ce(r)&&(r=null);const o=Xa(),s=new WeakSet,a=[];let l=!1;const c=o.app={_uid:Vh++,_component:i,_props:r,_container:null,_context:o,_instance:null,version:vf,get config(){return o.config},set config(u){},use(u,...h){return s.has(u)||(u&&he(u.install)?(s.add(u),u.install(c,...h)):he(u)&&(s.add(u),u(c,...h))),c},mixin(u){return o.mixins.includes(u)||o.mixins.push(u),c},component(u,h){return h?(o.components[u]=h,c):o.components[u]},directive(u,h){return h?(o.directives[u]=h,c):o.directives[u]},mount(u,h,f){if(!l){const d=c._ceVNode||ne(i,r);return d.appContext=o,f===!0?f="svg":f===!1&&(f=void 0),e(d,u,f),l=!0,c._container=u,u.__vue_app__=c,Br(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Ct(a,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(u,h){return o.provides[u]=h,c},runWithContext(u){const h=Fn;Fn=c;try{return u()}finally{Fn=h}}};return c}}let Fn=null;function Bh(e,t){if(Ue){let n=Ue.provides;const i=Ue.parent&&Ue.parent.provides;i===n&&(n=Ue.provides=Object.create(i)),n[e]=t}}function qi(e,t,n=!1){const i=vn();if(i||Fn){let r=Fn?Fn._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&he(t)?t.call(i&&i.proxy):t}}const Ya={},Ka=()=>Object.create(Ya),Ua=e=>Object.getPrototypeOf(e)===Ya;function Hh(e,t,n,i=!1){const r={},o=Ka();e.propsDefaults=Object.create(null),Ja(e,t,r,o);for(const s in e.propsOptions[0])s in r||(r[s]=void 0);n?e.props=i?r:ih(r):e.type.props?e.props=r:e.props=o,e.attrs=o}function qh(e,t,n,i){const{props:r,attrs:o,vnode:{patchFlag:s}}=e,a=ke(r),[l]=e.propsOptions;let c=!1;if((i||s>0)&&!(s&16)){if(s&8){const u=e.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Dr(e.emitsOptions,f))continue;const d=t[f];if(l)if(Te(o,f))d!==o[f]&&(o[f]=d,c=!0);else{const x=ft(f);r[x]=Po(l,a,x,d,e,!1)}else d!==o[f]&&(o[f]=d,c=!0)}}}else{Ja(e,t,r,o)&&(c=!0);let u;for(const h in a)(!t||!Te(t,h)&&((u=sn(h))===h||!Te(t,u)))&&(l?n&&(n[h]!==void 0||n[u]!==void 0)&&(r[h]=Po(l,a,h,void 0,e,!0)):delete r[h]);if(o!==a)for(const h in o)(!t||!Te(t,h))&&(delete o[h],c=!0)}c&&Dt(e.attrs,"set","")}function Ja(e,t,n,i){const[r,o]=e.propsOptions;let s=!1,a;if(t)for(let l in t){if(ri(l))continue;const c=t[l];let u;r&&Te(r,u=ft(l))?!o||!o.includes(u)?n[u]=c:(a||(a={}))[u]=c:Dr(e.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,s=!0)}if(o){const l=ke(n),c=a||we;for(let u=0;u<o.length;u++){const h=o[u];n[h]=Po(r,l,h,c[h],e,!Te(c,h))}}return s}function Po(e,t,n,i,r,o){const s=e[n];if(s!=null){const a=Te(s,"default");if(a&&i===void 0){const l=s.default;if(s.type!==Function&&!s.skipFactory&&he(l)){const{propsDefaults:c}=r;if(n in c)i=c[n];else{const u=Pi(r);i=c[n]=l.call(null,t),u()}}else i=l;r.ce&&r.ce._setProp(n,i)}s[0]&&(o&&!a?i=!1:s[1]&&(i===""||i===sn(n))&&(i=!0))}return i}const Gh=new WeakMap;function Za(e,t,n=!1){const i=n?Gh:t.propsCache,r=i.get(e);if(r)return r;const o=e.props,s={},a=[];let l=!1;if(!he(e)){const u=h=>{l=!0;const[f,d]=Za(h,t,!0);Ve(s,f),d&&a.push(...d)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!o&&!l)return Ce(e)&&i.set(e,$n),$n;if(ce(o))for(let u=0;u<o.length;u++){const h=ft(o[u]);Vs(h)&&(s[h]=we)}else if(o)for(const u in o){const h=ft(u);if(Vs(h)){const f=o[u],d=s[h]=ce(f)||he(f)?{type:f}:Ve({},f),x=d.type;let b=!1,R=!0;if(ce(x))for(let F=0;F<x.length;++F){const E=x[F],M=he(E)&&E.name;if(M==="Boolean"){b=!0;break}else M==="String"&&(R=!1)}else b=he(x)&&x.name==="Boolean";d[0]=b,d[1]=R,(b||Te(d,"default"))&&a.push(h)}}const c=[s,a];return Ce(e)&&i.set(e,c),c}function Vs(e){return e[0]!=="$"&&!ri(e)}const cs=e=>e==="_"||e==="_ctx"||e==="$stable",us=e=>ce(e)?e.map(Pt):[Pt(e)],Xh=(e,t,n)=>{if(t._n)return t;const i=je((...r)=>us(t(...r)),n);return i._c=!1,i},Qa=(e,t,n)=>{const i=e._ctx;for(const r in e){if(cs(r))continue;const o=e[r];if(he(o))t[r]=Xh(r,o,i);else if(o!=null){const s=us(o);t[r]=()=>s}}},ec=(e,t)=>{const n=us(t);e.slots.default=()=>n},tc=(e,t,n)=>{for(const i in t)(n||!cs(i))&&(e[i]=t[i])},Yh=(e,t,n)=>{const i=e.slots=Ka();if(e.vnode.shapeFlag&32){const r=t._;r?(tc(i,t,n),n&&ra(i,"_",r,!0)):Qa(t,i)}else t&&ec(e,t)},Kh=(e,t,n)=>{const{vnode:i,slots:r}=e;let o=!0,s=we;if(i.shapeFlag&32){const a=t._;a?n&&a===1?o=!1:tc(r,t,n):(o=!t.$stable,Qa(t,r)),s=t}else t&&(ec(e,t),s={default:1});if(o)for(const a in r)!cs(a)&&s[a]==null&&delete r[a]},tt=uf;function Uh(e){return Jh(e)}function Jh(e,t){const n=Wr();n.__VUE__=!0;const{insert:i,remove:r,patchProp:o,createElement:s,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=At,insertStaticContent:x}=e,b=(p,v,W,z=null,j=null,g=null,y=void 0,T=null,N=!!v.dynamicChildren)=>{if(p===v)return;p&&!Jn(p,v)&&(z=xe(p),be(p,j,g,!0),p=null),v.patchFlag===-2&&(N=!1,v.dynamicChildren=null);const{type:P,ref:H,shapeFlag:I}=v;switch(P){case Vr:R(p,v,W,z);break;case Gt:F(p,v,W,z);break;case no:p==null&&E(v,W,z,y);break;case ue:te(p,v,W,z,j,g,y,T,N);break;default:I&1?m(p,v,W,z,j,g,y,T,N):I&6?U(p,v,W,z,j,g,y,T,N):(I&64||I&128)&&P.process(p,v,W,z,j,g,y,T,N,dt)}H!=null&&j?ai(H,p&&p.ref,g,v||p,!v):H==null&&p&&p.ref!=null&&ai(p.ref,null,g,p,!0)},R=(p,v,W,z)=>{if(p==null)i(v.el=a(v.children),W,z);else{const j=v.el=p.el;v.children!==p.children&&c(j,v.children)}},F=(p,v,W,z)=>{p==null?i(v.el=l(v.children||""),W,z):v.el=p.el},E=(p,v,W,z)=>{[p.el,p.anchor]=x(p.children,v,W,z,p.el,p.anchor)},M=({el:p,anchor:v},W,z)=>{let j;for(;p&&p!==v;)j=f(p),i(p,W,z),p=j;i(v,W,z)},C=({el:p,anchor:v})=>{let W;for(;p&&p!==v;)W=f(p),r(p),p=W;r(v)},m=(p,v,W,z,j,g,y,T,N)=>{v.type==="svg"?y="svg":v.type==="math"&&(y="mathml"),p==null?_(v,W,z,j,g,y,T,N):L(p,v,j,g,y,T,N)},_=(p,v,W,z,j,g,y,T)=>{let N,P;const{props:H,shapeFlag:I,transition:$,dirs:q}=p;if(N=p.el=s(p.type,g,H&&H.is,H),I&8?u(N,p.children):I&16&&k(p.children,N,null,z,j,to(p,g),y,T),q&&ln(p,null,z,"created"),w(N,p,p.scopeId,y,z),H){for(const le in H)le!=="value"&&!ri(le)&&o(N,le,null,H[le],g,z);"value"in H&&o(N,"value",null,H.value,g),(P=H.onVnodeBeforeMount)&&kt(P,z,p)}q&&ln(p,null,z,"beforeMount");const J=Zh(j,$);J&&$.beforeEnter(N),i(N,v,W),((P=H&&H.onVnodeMounted)||J||q)&&tt(()=>{P&&kt(P,z,p),J&&$.enter(N),q&&ln(p,null,z,"mounted")},j)},w=(p,v,W,z,j)=>{if(W&&d(p,W),z)for(let g=0;g<z.length;g++)d(p,z[g]);if(j){let g=j.subTree;if(v===g||sc(g.type)&&(g.ssContent===v||g.ssFallback===v)){const y=j.vnode;w(p,y,y.scopeId,y.slotScopeIds,j.parent)}}},k=(p,v,W,z,j,g,y,T,N=0)=>{for(let P=N;P<p.length;P++){const H=p[P]=T?en(p[P]):Pt(p[P]);b(null,H,v,W,z,j,g,y,T)}},L=(p,v,W,z,j,g,y)=>{const T=v.el=p.el;let{patchFlag:N,dynamicChildren:P,dirs:H}=v;N|=p.patchFlag&16;const I=p.props||we,$=v.props||we;let q;if(W&&an(W,!1),(q=$.onVnodeBeforeUpdate)&&kt(q,W,v,p),H&&ln(v,p,W,"beforeUpdate"),W&&an(W,!0),(I.innerHTML&&$.innerHTML==null||I.textContent&&$.textContent==null)&&u(T,""),P?X(p.dynamicChildren,P,T,W,z,to(v,j),g):y||A(p,v,T,null,W,z,to(v,j),g,!1),N>0){if(N&16)B(T,I,$,W,j);else if(N&2&&I.class!==$.class&&o(T,"class",null,$.class,j),N&4&&o(T,"style",I.style,$.style,j),N&8){const J=v.dynamicProps;for(let le=0;le<J.length;le++){const se=J[le],fe=I[se],ge=$[se];(ge!==fe||se==="value")&&o(T,se,fe,ge,j,W)}}N&1&&p.children!==v.children&&u(T,v.children)}else!y&&P==null&&B(T,I,$,W,j);((q=$.onVnodeUpdated)||H)&&tt(()=>{q&&kt(q,W,v,p),H&&ln(v,p,W,"updated")},z)},X=(p,v,W,z,j,g,y)=>{for(let T=0;T<v.length;T++){const N=p[T],P=v[T],H=N.el&&(N.type===ue||!Jn(N,P)||N.shapeFlag&198)?h(N.el):W;b(N,P,H,null,z,j,g,y,!0)}},B=(p,v,W,z,j)=>{if(v!==W){if(v!==we)for(const g in v)!ri(g)&&!(g in W)&&o(p,g,v[g],null,j,z);for(const g in W){if(ri(g))continue;const y=W[g],T=v[g];y!==T&&g!=="value"&&o(p,g,T,y,j,z)}"value"in W&&o(p,"value",v.value,W.value,j)}},te=(p,v,W,z,j,g,y,T,N)=>{const P=v.el=p?p.el:a(""),H=v.anchor=p?p.anchor:a("");let{patchFlag:I,dynamicChildren:$,slotScopeIds:q}=v;q&&(T=T?T.concat(q):q),p==null?(i(P,W,z),i(H,W,z),k(v.children||[],W,H,j,g,y,T,N)):I>0&&I&64&&$&&p.dynamicChildren?(X(p.dynamicChildren,$,W,j,g,y,T),(v.key!=null||j&&v===j.subTree)&&hs(p,v,!0)):A(p,v,W,H,j,g,y,T,N)},U=(p,v,W,z,j,g,y,T,N)=>{v.slotScopeIds=T,p==null?v.shapeFlag&512?j.ctx.activate(v,W,z,y,N):me(v,W,z,j,g,y,N):Y(p,v,N)},me=(p,v,W,z,j,g,y)=>{const T=p.component=gf(p,z,j);if(Fa(p)&&(T.ctx.renderer=dt),pf(T,!1,y),T.asyncDep){if(j&&j.registerDep(T,K,y),!p.el){const N=T.subTree=ne(Gt);F(null,N,v,W),p.placeholder=N.el}}else K(T,p,v,W,j,g,y)},Y=(p,v,W)=>{const z=v.component=p.component;if(af(p,v,W))if(z.asyncDep&&!z.asyncResolved){S(z,v,W);return}else z.next=v,z.update();else v.el=p.el,z.vnode=v},K=(p,v,W,z,j,g,y)=>{const T=()=>{if(p.isMounted){let{next:I,bu:$,u:q,parent:J,vnode:le}=p;{const pe=nc(p);if(pe){I&&(I.el=le.el,S(p,I,y)),pe.asyncDep.then(()=>{p.isUnmounted||T()});return}}let se=I,fe;an(p,!1),I?(I.el=le.el,S(p,I,y)):I=le,$&&Bi($),(fe=I.props&&I.props.onVnodeBeforeUpdate)&&kt(fe,J,I,le),an(p,!0);const ge=Bs(p),Ee=p.subTree;p.subTree=ge,b(Ee,ge,h(Ee.el),xe(Ee),p,j,g),I.el=ge.el,se===null&&cf(p,ge.el),q&&tt(q,j),(fe=I.props&&I.props.onVnodeUpdated)&&tt(()=>kt(fe,J,I,le),j)}else{let I;const{el:$,props:q}=v,{bm:J,m:le,parent:se,root:fe,type:ge}=p,Ee=Rn(v);an(p,!1),J&&Bi(J),!Ee&&(I=q&&q.onVnodeBeforeMount)&&kt(I,se,v),an(p,!0);{fe.ce&&fe.ce._def.shadowRoot!==!1&&fe.ce._injectChildStyle(ge);const pe=p.subTree=Bs(p);b(null,pe,W,z,p,j,g),v.el=pe.el}if(le&&tt(le,j),!Ee&&(I=q&&q.onVnodeMounted)){const pe=v;tt(()=>kt(I,se,pe),j)}(v.shapeFlag&256||se&&Rn(se.vnode)&&se.vnode.shapeFlag&256)&&p.a&&tt(p.a,j),p.isMounted=!0,v=W=z=null}};p.scope.on();const N=p.effect=new ua(T);p.scope.off();const P=p.update=N.run.bind(N),H=p.job=N.runIfDirty.bind(N);H.i=p,H.id=p.uid,N.scheduler=()=>ss(H),an(p,!0),P()},S=(p,v,W)=>{v.component=p;const z=p.vnode.props;p.vnode=v,p.next=null,qh(p,v.props,z,W),Kh(p,v.children,W),Ht(),Ns(p),qt()},A=(p,v,W,z,j,g,y,T,N=!1)=>{const P=p&&p.children,H=p?p.shapeFlag:0,I=v.children,{patchFlag:$,shapeFlag:q}=v;if($>0){if($&128){Z(P,I,W,z,j,g,y,T,N);return}else if($&256){O(P,I,W,z,j,g,y,T,N);return}}q&8?(H&16&&Ze(P,j,g),I!==P&&u(W,I)):H&16?q&16?Z(P,I,W,z,j,g,y,T,N):Ze(P,j,g,!0):(H&8&&u(W,""),q&16&&k(I,W,z,j,g,y,T,N))},O=(p,v,W,z,j,g,y,T,N)=>{p=p||$n,v=v||$n;const P=p.length,H=v.length,I=Math.min(P,H);let $;for($=0;$<I;$++){const q=v[$]=N?en(v[$]):Pt(v[$]);b(p[$],q,W,null,j,g,y,T,N)}P>H?Ze(p,j,g,!0,!1,I):k(v,W,z,j,g,y,T,N,I)},Z=(p,v,W,z,j,g,y,T,N)=>{let P=0;const H=v.length;let I=p.length-1,$=H-1;for(;P<=I&&P<=$;){const q=p[P],J=v[P]=N?en(v[P]):Pt(v[P]);if(Jn(q,J))b(q,J,W,null,j,g,y,T,N);else break;P++}for(;P<=I&&P<=$;){const q=p[I],J=v[$]=N?en(v[$]):Pt(v[$]);if(Jn(q,J))b(q,J,W,null,j,g,y,T,N);else break;I--,$--}if(P>I){if(P<=$){const q=$+1,J=q<H?v[q].el:z;for(;P<=$;)b(null,v[P]=N?en(v[P]):Pt(v[P]),W,J,j,g,y,T,N),P++}}else if(P>$)for(;P<=I;)be(p[P],j,g,!0),P++;else{const q=P,J=P,le=new Map;for(P=J;P<=$;P++){const Qe=v[P]=N?en(v[P]):Pt(v[P]);Qe.key!=null&&le.set(Qe.key,P)}let se,fe=0;const ge=$-J+1;let Ee=!1,pe=0;const gt=new Array(ge);for(P=0;P<ge;P++)gt[P]=0;for(P=q;P<=I;P++){const Qe=p[P];if(fe>=ge){be(Qe,j,g,!0);continue}let _t;if(Qe.key!=null)_t=le.get(Qe.key);else for(se=J;se<=$;se++)if(gt[se-J]===0&&Jn(Qe,v[se])){_t=se;break}_t===void 0?be(Qe,j,g,!0):(gt[_t-J]=P+1,_t>=pe?pe=_t:Ee=!0,b(Qe,v[_t],W,null,j,g,y,T,N),fe++)}const Kt=Ee?Qh(gt):$n;for(se=Kt.length-1,P=ge-1;P>=0;P--){const Qe=J+P,_t=v[Qe],Ps=v[Qe+1],As=Qe+1<H?Ps.el||Ps.placeholder:z;gt[P]===0?b(null,_t,W,As,j,g,y,T,N):Ee&&(se<0||P!==Kt[se]?oe(_t,W,As,2):se--)}}},oe=(p,v,W,z,j=null)=>{const{el:g,type:y,transition:T,children:N,shapeFlag:P}=p;if(P&6){oe(p.component.subTree,v,W,z);return}if(P&128){p.suspense.move(v,W,z);return}if(P&64){y.move(p,v,W,dt);return}if(y===ue){i(g,v,W);for(let I=0;I<N.length;I++)oe(N[I],v,W,z);i(p.anchor,v,W);return}if(y===no){M(p,v,W);return}if(z!==2&&P&1&&T)if(z===0)T.beforeEnter(g),i(g,v,W),tt(()=>T.enter(g),j);else{const{leave:I,delayLeave:$,afterLeave:q}=T,J=()=>{p.ctx.isUnmounted?r(g):i(g,v,W)},le=()=>{g._isLeaving&&g[bh](!0),I(g,()=>{J(),q&&q()})};$?$(g,J,le):le()}else i(g,v,W)},be=(p,v,W,z=!1,j=!1)=>{const{type:g,props:y,ref:T,children:N,dynamicChildren:P,shapeFlag:H,patchFlag:I,dirs:$,cacheIndex:q}=p;if(I===-2&&(j=!1),T!=null&&(Ht(),ai(T,null,W,p,!0),qt()),q!=null&&(v.renderCache[q]=void 0),H&256){v.ctx.deactivate(p);return}const J=H&1&&$,le=!Rn(p);let se;if(le&&(se=y&&y.onVnodeBeforeUnmount)&&kt(se,v,p),H&6)_e(p.component,W,z);else{if(H&128){p.suspense.unmount(W,z);return}J&&ln(p,null,v,"beforeUnmount"),H&64?p.type.remove(p,v,W,dt,z):P&&!P.hasOnce&&(g!==ue||I>0&&I&64)?Ze(P,v,W,!1,!0):(g===ue&&I&384||!j&&H&16)&&Ze(N,v,W),z&&re(p)}(le&&(se=y&&y.onVnodeUnmounted)||J)&&tt(()=>{se&&kt(se,v,p),J&&ln(p,null,v,"unmounted")},W)},re=p=>{const{type:v,el:W,anchor:z,transition:j}=p;if(v===ue){Ae(W,z);return}if(v===no){C(p);return}const g=()=>{r(W),j&&!j.persisted&&j.afterLeave&&j.afterLeave()};if(p.shapeFlag&1&&j&&!j.persisted){const{leave:y,delayLeave:T}=j,N=()=>y(W,g);T?T(p.el,g,N):N()}else g()},Ae=(p,v)=>{let W;for(;p!==v;)W=f(p),r(p),p=W;r(v)},_e=(p,v,W)=>{const{bum:z,scope:j,job:g,subTree:y,um:T,m:N,a:P}=p;zs(N),zs(P),z&&Bi(z),j.stop(),g&&(g.flags|=8,be(y,p,v,W)),T&&tt(T,v),tt(()=>{p.isUnmounted=!0},v)},Ze=(p,v,W,z=!1,j=!1,g=0)=>{for(let y=g;y<p.length;y++)be(p[y],v,W,z,j)},xe=p=>{if(p.shapeFlag&6)return xe(p.component.subTree);if(p.shapeFlag&128)return p.suspense.next();const v=f(p.anchor||p.el),W=v&&v[Ea];return W?f(W):v};let ve=!1;const $t=(p,v,W)=>{p==null?v._vnode&&be(v._vnode,null,null,!0):b(v._vnode||null,p,v,null,null,null,W),v._vnode=p,ve||(ve=!0,Ns(),Ca(),ve=!1)},dt={p:b,um:be,m:oe,r:re,mt:me,mc:k,pc:A,pbc:X,n:xe,o:e};return{render:$t,hydrate:void 0,createApp:zh($t)}}function to({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function an({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Zh(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function hs(e,t,n=!1){const i=e.children,r=t.children;if(ce(i)&&ce(r))for(let o=0;o<i.length;o++){const s=i[o];let a=r[o];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[o]=en(r[o]),a.el=s.el),!n&&a.patchFlag!==-2&&hs(s,a)),a.type===Vr&&a.patchFlag!==-1&&(a.el=s.el),a.type===Gt&&!a.el&&(a.el=s.el)}}function Qh(e){const t=e.slice(),n=[0];let i,r,o,s,a;const l=e.length;for(i=0;i<l;i++){const c=e[i];if(c!==0){if(r=n[n.length-1],e[r]<c){t[i]=r,n.push(i);continue}for(o=0,s=n.length-1;o<s;)a=o+s>>1,e[n[a]]<c?o=a+1:s=a;c<e[n[o]]&&(o>0&&(t[i]=n[o-1]),n[o]=i)}}for(o=n.length,s=n[o-1];o-- >0;)n[o]=s,s=t[s];return n}function nc(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:nc(t)}function zs(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const ef=Symbol.for("v-scx"),tf=()=>qi(ef);function nf(e,t){return fs(e,null,{flush:"sync"})}function it(e,t,n){return fs(e,t,n)}function fs(e,t,n=we){const{immediate:i,deep:r,flush:o,once:s}=n,a=Ve({},n),l=t&&i||!t&&o!=="post";let c;if(pi){if(o==="sync"){const d=tf();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=At,d.resume=At,d.pause=At,d}}const u=Ue;a.call=(d,x,b)=>Ct(d,u,x,b);let h=!1;o==="post"?a.scheduler=d=>{tt(d,u&&u.suspense)}:o!=="sync"&&(h=!0,a.scheduler=(d,x)=>{x?d():ss(d)}),a.augmentJob=d=>{t&&(d.flags|=4),h&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const f=fh(e,t,a);return pi&&(c?c.push(f):l&&f()),f}function rf(e,t,n){const i=this.proxy,r=$e(e)?e.includes(".")?ic(i,e):()=>i[e]:e.bind(i,i);let o;he(t)?o=t:(o=t.handler,n=t);const s=Pi(this),a=fs(r,o.bind(i),n);return s(),a}function ic(e,t){const n=t.split(".");return()=>{let i=e;for(let r=0;r<n.length&&i;r++)i=i[n[r]];return i}}function ze(e,t,n=we){const i=vn(),r=ft(t),o=sn(t),s=rc(e,r),a=ah((l,c)=>{let u,h=we,f;return nf(()=>{const d=e[r];ot(u,d)&&(u=d,c())}),{get(){return l(),n.get?n.get(u):u},set(d){const x=n.set?n.set(d):d;if(!ot(x,u)&&!(h!==we&&ot(d,h)))return;const b=i.vnode.props;b&&(t in b||r in b||o in b)&&(`onUpdate:${t}`in b||`onUpdate:${r}`in b||`onUpdate:${o}`in b)||(u=d,c()),i.emit(`update:${t}`,x),ot(d,x)&&ot(d,h)&&!ot(x,f)&&c(),h=d,f=x}}});return a[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?s||we:a,done:!1}:{done:!0}}}},a}const rc=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${ft(t)}Modifiers`]||e[`${sn(t)}Modifiers`];function of(e,t,...n){if(e.isUnmounted)return;const i=e.vnode.props||we;let r=n;const o=t.startsWith("update:"),s=o&&rc(i,t.slice(7));s&&(s.trim&&(r=n.map(u=>$e(u)?u.trim():u)),s.number&&(r=n.map(oa)));let a,l=i[a=Kr(t)]||i[a=Kr(ft(t))];!l&&o&&(l=i[a=Kr(sn(t))]),l&&Ct(l,e,6,r);const c=i[a+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,Ct(c,e,6,r)}}function oc(e,t,n=!1){const i=t.emitsCache,r=i.get(e);if(r!==void 0)return r;const o=e.emits;let s={},a=!1;if(!he(e)){const l=c=>{const u=oc(c,t,!0);u&&(a=!0,Ve(s,u))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!o&&!a?(Ce(e)&&i.set(e,null),null):(ce(o)?o.forEach(l=>s[l]=null):Ve(s,o),Ce(e)&&i.set(e,s),s)}function Dr(e,t){return!e||!Ar(t)?!1:(t=t.slice(2).replace(/Once$/,""),Te(e,t[0].toLowerCase()+t.slice(1))||Te(e,sn(t))||Te(e,t))}function Bs(e){const{type:t,vnode:n,proxy:i,withProxy:r,propsOptions:[o],slots:s,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:d,ctx:x,inheritAttrs:b}=e,R=or(e);let F,E;try{if(n.shapeFlag&4){const C=r||i,m=C;F=Pt(c.call(m,C,u,h,d,f,x)),E=a}else{const C=t;F=Pt(C.length>1?C(h,{attrs:a,slots:s,emit:l}):C(h,null)),E=t.props?a:sf(a)}}catch(C){ui.length=0,Or(C,e,1),F=ne(Gt)}let M=F;if(E&&b!==!1){const C=Object.keys(E),{shapeFlag:m}=M;C.length&&m&7&&(o&&C.some(Uo)&&(E=lf(E,o)),M=Bn(M,E,!1,!0))}return n.dirs&&(M=Bn(M,null,!1,!0),M.dirs=M.dirs?M.dirs.concat(n.dirs):n.dirs),n.transition&&ls(M,n.transition),F=M,or(R),F}const sf=e=>{let t;for(const n in e)(n==="class"||n==="style"||Ar(n))&&((t||(t={}))[n]=e[n]);return t},lf=(e,t)=>{const n={};for(const i in e)(!Uo(i)||!(i.slice(9)in t))&&(n[i]=e[i]);return n};function af(e,t,n){const{props:i,children:r,component:o}=e,{props:s,children:a,patchFlag:l}=t,c=o.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return i?Hs(i,s,c):!!s;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(s[f]!==i[f]&&!Dr(c,f))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===s?!1:i?s?Hs(i,s,c):!0:!!s;return!1}function Hs(e,t,n){const i=Object.keys(t);if(i.length!==Object.keys(e).length)return!0;for(let r=0;r<i.length;r++){const o=i[r];if(t[o]!==e[o]&&!Dr(n,o))return!0}return!1}function cf({vnode:e,parent:t},n){for(;t;){const i=t.subTree;if(i.suspense&&i.suspense.activeBranch===e&&(i.el=e.el),i===e)(e=t.vnode).el=n,t=t.parent;else break}}const sc=e=>e.__isSuspense;function uf(e,t){t&&t.pendingBranch?ce(e)?t.effects.push(...e):t.effects.push(e):gh(e)}const ue=Symbol.for("v-fgt"),Vr=Symbol.for("v-txt"),Gt=Symbol.for("v-cmt"),no=Symbol.for("v-stc"),ui=[];let ut=null;function D(e=!1){ui.push(ut=e?null:[])}function hf(){ui.pop(),ut=ui[ui.length-1]||null}let gi=1;function qs(e,t=!1){gi+=e,e<0&&ut&&t&&(ut.hasOnce=!0)}function lc(e){return e.dynamicChildren=gi>0?ut||$n:null,hf(),gi>0&&ut&&ut.push(e),e}function G(e,t,n,i,r,o){return lc(ae(e,t,n,i,r,o,!0))}function ct(e,t,n,i,r){return lc(ne(e,t,n,i,r,!0))}function ds(e){return e?e.__v_isVNode===!0:!1}function Jn(e,t){return e.type===t.type&&e.key===t.key}const ac=({key:e})=>e??null,Gi=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?$e(e)||De(e)||he(e)?{i:qe,r:e,k:t,f:!!n}:e:null);function ae(e,t=null,n=null,i=0,r=null,o=e===ue?0:1,s=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&ac(t),ref:t&&Gi(t),scopeId:Na,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:qe};return a?(ms(l,n),o&128&&e.normalize(l)):n&&(l.shapeFlag|=$e(n)?8:16),gi>0&&!s&&ut&&(l.patchFlag>0||o&6)&&l.patchFlag!==32&&ut.push(l),l}const ne=ff;function ff(e,t=null,n=null,i=0,r=null,o=!1){if((!e||e===Va)&&(e=Gt),ds(e)){const a=Bn(e,t,!0);return n&&ms(a,n),gi>0&&!o&&ut&&(a.shapeFlag&6?ut[ut.indexOf(e)]=a:ut.push(a)),a.patchFlag=-2,a}if(wf(e)&&(e=e.__vccOpts),t){t=zr(t);let{class:a,style:l}=t;a&&!$e(a)&&(t.class=wn(a)),Ce(l)&&(os(l)&&!ce(l)&&(l=Ve({},l)),t.style=ki(l))}const s=$e(e)?1:sc(e)?128:ph(e)?64:Ce(e)?4:he(e)?2:0;return ae(e,t,n,i,r,s,o,!0)}function zr(e){return e?os(e)||Ua(e)?Ve({},e):e:null}function Bn(e,t,n=!1,i=!1){const{props:r,ref:o,patchFlag:s,children:a,transition:l}=e,c=t?Pe(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&ac(c),ref:t&&t.ref?n&&o?ce(o)?o.concat(Gi(t)):[o,Gi(t)]:Gi(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ue?s===-1?16:s|16:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Bn(e.ssContent),ssFallback:e.ssFallback&&Bn(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&i&&ls(u,l.clone(u)),u}function Xn(e=" ",t=0){return ne(Vr,null,e,t)}function ht(e="",t=!1){return t?(D(),ct(Gt,null,e)):ne(Gt,null,e)}function Pt(e){return e==null||typeof e=="boolean"?ne(Gt):ce(e)?ne(ue,null,e.slice()):ds(e)?en(e):ne(Vr,null,String(e))}function en(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Bn(e)}function ms(e,t){let n=0;const{shapeFlag:i}=e;if(t==null)t=null;else if(ce(t))n=16;else if(typeof t=="object")if(i&65){const r=t.default;r&&(r._c&&(r._d=!1),ms(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!Ua(t)?t._ctx=qe:r===3&&qe&&(qe.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else he(t)?(t={default:t,_ctx:qe},n=32):(t=String(t),i&64?(n=16,t=[Xn(t)]):n=8);e.children=t,e.shapeFlag|=n}function Pe(...e){const t={};for(let n=0;n<e.length;n++){const i=e[n];for(const r in i)if(r==="class")t.class!==i.class&&(t.class=wn([t.class,i.class]));else if(r==="style")t.style=ki([t.style,i.style]);else if(Ar(r)){const o=t[r],s=i[r];s&&o!==s&&!(ce(o)&&o.includes(s))&&(t[r]=o?[].concat(o,s):s)}else r!==""&&(t[r]=i[r])}return t}function kt(e,t,n,i=null){Ct(e,t,7,[n,i])}const df=Xa();let mf=0;function gf(e,t,n){const i=e.type,r=(t?t.appContext:e.appContext)||df,o={uid:mf++,vnode:e,type:i,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ru(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Za(i,r),emitsOptions:oc(i,r),emit:null,emitted:null,propsDefaults:we,inheritAttrs:i.inheritAttrs,ctx:we,data:we,props:we,attrs:we,slots:we,refs:we,setupState:we,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=t?t.root:o,o.emit=of.bind(null,o),e.ce&&e.ce(o),o}let Ue=null;const vn=()=>Ue||qe;let ar,Ao;{const e=Wr(),t=(n,i)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(i),o=>{r.length>1?r.forEach(s=>s(o)):r[0](o)}};ar=t("__VUE_INSTANCE_SETTERS__",n=>Ue=n),Ao=t("__VUE_SSR_SETTERS__",n=>pi=n)}const Pi=e=>{const t=Ue;return ar(e),e.scope.on(),()=>{e.scope.off(),ar(t)}},Gs=()=>{Ue&&Ue.scope.off(),ar(null)};function cc(e){return e.vnode.shapeFlag&4}let pi=!1;function pf(e,t=!1,n=!1){t&&Ao(t);const{props:i,children:r}=e.vnode,o=cc(e);Hh(e,i,o,t),Yh(e,r,n||t);const s=o?yf(e,t):void 0;return t&&Ao(!1),s}function yf(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Eh);const{setup:i}=n;if(i){Ht();const r=e.setupContext=i.length>1?hc(e):null,o=Pi(e),s=Ti(i,e,0,[e.props,r]),a=ta(s);if(qt(),o(),(a||e.sp)&&!Rn(e)&&Ra(e),a){if(s.then(Gs,Gs),t)return s.then(l=>{Xs(e,l)}).catch(l=>{Or(l,e,0)});e.asyncDep=s}else Xs(e,s)}else uc(e)}function Xs(e,t,n){he(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Ce(t)&&(e.setupState=Aa(t)),uc(e)}function uc(e,t,n){const i=e.type;e.render||(e.render=i.render||At);{const r=Pi(e);Ht();try{Oh(e)}finally{qt(),r()}}}const xf={get(e,t){return Ke(e,"get",""),e[t]}};function hc(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,xf),slots:e.slots,emit:e.emit,expose:t}}function Br(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Aa(rh(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in ci)return ci[n](e)},has(t,n){return n in t||n in ci}})):e.proxy}function bf(e,t=!0){return he(e)?e.displayName||e.name:e.name||t&&e.__name}function wf(e){return he(e)&&"__vccOpts"in e}const ie=(e,t)=>uh(e,t,pi),vf="3.5.20";/**
* @vue/runtime-dom v3.5.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Lo;const Ys=typeof window<"u"&&window.trustedTypes;if(Ys)try{Lo=Ys.createPolicy("vue",{createHTML:e=>e})}catch{}const fc=Lo?e=>Lo.createHTML(e):e=>e,Sf="http://www.w3.org/2000/svg",_f="http://www.w3.org/1998/Math/MathML",jt=typeof document<"u"?document:null,Ks=jt&&jt.createElement("template"),kf={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,i)=>{const r=t==="svg"?jt.createElementNS(Sf,e):t==="mathml"?jt.createElementNS(_f,e):n?jt.createElement(e,{is:n}):jt.createElement(e);return e==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:e=>jt.createTextNode(e),createComment:e=>jt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>jt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,i,r,o){const s=n?n.previousSibling:t.lastChild;if(r&&(r===o||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===o||!(r=r.nextSibling)););else{Ks.innerHTML=fc(i==="svg"?`<svg>${e}</svg>`:i==="mathml"?`<math>${e}</math>`:e);const a=Ks.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Tf=Symbol("_vtc");function Pf(e,t,n){const i=e[Tf];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Us=Symbol("_vod"),Af=Symbol("_vsh"),Lf=Symbol(""),Mf=/(^|;)\s*display\s*:/;function Cf(e,t,n){const i=e.style,r=$e(n);let o=!1;if(n&&!r){if(t)if($e(t))for(const s of t.split(";")){const a=s.slice(0,s.indexOf(":")).trim();n[a]==null&&Xi(i,a,"")}else for(const s in t)n[s]==null&&Xi(i,s,"");for(const s in n)s==="display"&&(o=!0),Xi(i,s,n[s])}else if(r){if(t!==n){const s=i[Lf];s&&(n+=";"+s),i.cssText=n,o=Mf.test(n)}}else t&&e.removeAttribute("style");Us in e&&(e[Us]=o?i.display:"",e[Af]&&(i.display="none"))}const Js=/\s*!important$/;function Xi(e,t,n){if(ce(n))n.forEach(i=>Xi(e,t,i));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const i=Wf(e,t);Js.test(n)?e.setProperty(sn(i),n.replace(Js,""),"important"):e[i]=n}}const Zs=["Webkit","Moz","ms"],io={};function Wf(e,t){const n=io[t];if(n)return n;let i=ft(t);if(i!=="filter"&&i in e)return io[t]=i;i=Cr(i);for(let r=0;r<Zs.length;r++){const o=Zs[r]+i;if(o in e)return io[t]=o}return t}const Qs="http://www.w3.org/1999/xlink";function el(e,t,n,i,r,o=Eu(t)){i&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Qs,t.slice(6,t.length)):e.setAttributeNS(Qs,t,n):n==null||o&&!sa(n)?e.removeAttribute(t):e.setAttribute(t,o?"":wt(n)?String(n):n)}function tl(e,t,n,i,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?fc(n):n);return}const o=e.tagName;if(t==="value"&&o!=="PROGRESS"&&!o.includes("-")){const a=o==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let s=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=sa(n):n==null&&a==="string"?(n="",s=!0):a==="number"&&(n=0,s=!0)}try{e[t]=n}catch{}s&&e.removeAttribute(r||t)}function dc(e,t,n,i){e.addEventListener(t,n,i)}function Nf(e,t,n,i){e.removeEventListener(t,n,i)}const nl=Symbol("_vei");function $f(e,t,n,i,r=null){const o=e[nl]||(e[nl]={}),s=o[t];if(i&&s)s.value=i;else{const[a,l]=Ef(t);if(i){const c=o[t]=Rf(i,r);dc(e,a,c,l)}else s&&(Nf(e,a,s,l),o[t]=void 0)}}const il=/(?:Once|Passive|Capture)$/;function Ef(e){let t;if(il.test(e)){t={};let i;for(;i=e.match(il);)e=e.slice(0,e.length-i[0].length),t[i[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):sn(e.slice(2)),t]}let ro=0;const If=Promise.resolve(),Of=()=>ro||(If.then(()=>ro=0),ro=Date.now());function Rf(e,t){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;Ct(Ff(i,n.value),t,5,[i])};return n.value=e,n.attached=Of(),n}function Ff(e,t){if(ce(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(i=>r=>!r._stopped&&i&&i(r))}else return t}const rl=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,jf=(e,t,n,i,r,o)=>{const s=r==="svg";t==="class"?Pf(e,i,s):t==="style"?Cf(e,n,i):Ar(t)?Uo(t)||$f(e,t,n,i,o):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Df(e,t,i,s))?(tl(e,t,i),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&el(e,t,i,s,o,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!$e(i))?tl(e,ft(t),i,o,t):(t==="true-value"?e._trueValue=i:t==="false-value"&&(e._falseValue=i),el(e,t,i,s))};function Df(e,t,n,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in e&&rl(t)&&he(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return rl(t)&&$e(n)?!1:t in e}const ol=e=>{const t=e.props["onUpdate:modelValue"]||!1;return ce(t)?n=>Bi(t,n):t},oo=Symbol("_assign"),mc={deep:!0,created(e,{value:t,modifiers:{number:n}},i){const r=Lr(t);dc(e,"change",()=>{const o=Array.prototype.filter.call(e.options,s=>s.selected).map(s=>n?oa(cr(s)):cr(s));e[oo](e.multiple?r?new Set(o):o:o[0]),e._assigning=!0,Rr(()=>{e._assigning=!1})}),e[oo]=ol(i)},mounted(e,{value:t}){sl(e,t)},beforeUpdate(e,t,n){e[oo]=ol(n)},updated(e,{value:t}){e._assigning||sl(e,t)}};function sl(e,t){const n=e.multiple,i=ce(t);if(!(n&&!i&&!Lr(t))){for(let r=0,o=e.options.length;r<o;r++){const s=e.options[r],a=cr(s);if(n)if(i){const l=typeof a;l==="string"||l==="number"?s.selected=t.some(c=>String(c)===String(a)):s.selected=Ou(t,a)>-1}else s.selected=t.has(a);else if(Nr(cr(s),t)){e.selectedIndex!==r&&(e.selectedIndex=r);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function cr(e){return"_value"in e?e._value:e.value}const Vf=["ctrl","shift","alt","meta"],zf={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Vf.some(n=>e[`${n}Key`]&&!t.includes(n))},ll=(e,t)=>{const n=e._withMods||(e._withMods={}),i=t.join(".");return n[i]||(n[i]=((r,...o)=>{for(let s=0;s<t.length;s++){const a=zf[t[s]];if(a&&a(r,t))return}return e(r,...o)}))},Bf=Ve({patchProp:jf},kf);let al;function Hf(){return al||(al=Uh(Bf))}const qf=((...e)=>{const t=Hf().createApp(...e),{mount:n}=t;return t.mount=i=>{const r=Xf(i);if(!r)return;const o=t._component;!he(o)&&!o.render&&!o.template&&(o.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const s=n(r,!1,Gf(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),s},t});function Gf(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Xf(e){return $e(e)?document.querySelector(e):e}function Yf(e){return ca()?(Fu(e),!0):!1}function Kf(e){if(!De(e))return di(e);const t=new Proxy({},{get(n,i,r){return V(Reflect.get(e.value,i,r))},set(n,i,r){return De(e.value[i])&&!De(r)?e.value[i].value=r:e.value[i]=r,!0},deleteProperty(n,i){return Reflect.deleteProperty(e.value,i)},has(n,i){return Reflect.has(e.value,i)},ownKeys(){return Object.keys(e.value)},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}}});return di(t)}function pt(e){return Kf(ie(e))}const Uf=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;function Jf(e){return Array.isArray(e)?e:[e]}function Zf(e){return vn()}function Qf(e,t=!0,n){Zf()?jr(e,n):t?e():Rr(e)}const gc=Uf?window:void 0;function Cn(e){var t;const n=Pa(e);return(t=n?.$el)!=null?t:n}function e1(){const e=nr(!1),t=vn();return t&&jr(()=>{e.value=!0},t),e}function t1(e){const t=e1();return ie(()=>(t.value,!!e()))}function n1(e,t,n={}){const{window:i=gc,...r}=n;let o;const s=t1(()=>i&&"ResizeObserver"in i),a=()=>{o&&(o.disconnect(),o=void 0)},l=ie(()=>{const h=Pa(e);return Array.isArray(h)?h.map(f=>Cn(f)):[Cn(h)]}),c=it(l,h=>{if(a(),s.value&&i){o=new ResizeObserver(t);for(const f of h)f&&o.observe(f,r)}},{immediate:!0,flush:"post"}),u=()=>{a(),c()};return Yf(u),{isSupported:s,stop:u}}function pc(e,t={width:0,height:0},n={}){const{window:i=gc,box:r="content-box"}=n,o=ie(()=>{var h,f;return(f=(h=Cn(e))==null?void 0:h.namespaceURI)==null?void 0:f.includes("svg")}),s=nr(t.width),a=nr(t.height),{stop:l}=n1(e,([h])=>{const f=r==="border-box"?h.borderBoxSize:r==="content-box"?h.contentBoxSize:h.devicePixelContentBoxSize;if(i&&o.value){const d=Cn(e);if(d){const x=d.getBoundingClientRect();s.value=x.width,a.value=x.height}}else if(f){const d=Jf(f);s.value=d.reduce((x,{inlineSize:b})=>x+b,0),a.value=d.reduce((x,{blockSize:b})=>x+b,0)}else s.value=h.contentRect.width,a.value=h.contentRect.height},n);Qf(()=>{const h=Cn(e);h&&(s.value="offsetWidth"in h?h.offsetWidth:t.width,a.value="offsetHeight"in h?h.offsetHeight:t.height)});const c=it(()=>Cn(e),h=>{s.value=h?t.width:0,a.value=h?t.height:0});function u(){l(),c()}return{width:s,height:a,stop:u}}/**
* @vue/compiler-core v3.5.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const i1=Symbol(""),r1=Symbol(""),o1=Symbol(""),s1=Symbol(""),yc={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function l1(e,t=""){return{type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:yc}}function Mo(e,t=!1,n=yc,i=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:i}}const cl=new Uint8Array([123,123]),ul=new Uint8Array([125,125]);function hl(e){return e>=97&&e<=122||e>=65&&e<=90}function lt(e){return e===32||e===10||e===9||e===12||e===13}function Ut(e){return e===47||e===62||lt(e)}function ur(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}const Ge={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])};class a1{constructor(t,n){this.stack=t,this.cbs=n,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=cl,this.delimiterClose=ul,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return this.mode===2&&this.stack.length===0}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=cl,this.delimiterClose=ul}getPos(t){let n=1,i=t+1;for(let r=this.newlines.length-1;r>=0;r--){const o=this.newlines[r];if(t>o){n=r+2,i=t-o;break}}return{column:i,line:n,offset:t}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(t){t===60?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t))}stateInterpolationOpen(t){if(t===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){const n=this.index+1-this.delimiterOpen.length;n>this.sectionStart&&this.cbs.ontext(this.sectionStart,n),this.state=3,this.sectionStart=n}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(t)):(this.state=1,this.stateText(t))}stateInterpolation(t){t===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(t))}stateInterpolationClose(t){t===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(t))}stateSpecialStartSequence(t){const n=this.sequenceIndex===this.currentSequence.length;if(!(n?Ut(t):(t|32)===this.currentSequence[this.sequenceIndex]))this.inRCDATA=!1;else if(!n){this.sequenceIndex++;return}this.sequenceIndex=0,this.state=6,this.stateInTagName(t)}stateInRCDATA(t){if(this.sequenceIndex===this.currentSequence.length){if(t===62||lt(t)){const n=this.index-this.currentSequence.length;if(this.sectionStart<n){const i=this.index;this.index=n,this.cbs.ontext(this.sectionStart,n),this.index=i}this.sectionStart=n+2,this.stateInClosingTagName(t),this.inRCDATA=!1;return}this.sequenceIndex=0}(t|32)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:this.sequenceIndex===0?this.currentSequence===Ge.TitleEnd||this.currentSequence===Ge.TextareaEnd&&!this.inSFCRoot?!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=+(t===60)}stateCDATASequence(t){t===Ge.Cdata[this.sequenceIndex]?++this.sequenceIndex===Ge.Cdata.length&&(this.state=28,this.currentSequence=Ge.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(t))}fastForwardTo(t){for(;++this.index<this.buffer.length;){const n=this.buffer.charCodeAt(this.index);if(n===10&&this.newlines.push(this.index),n===t)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(t){t===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===Ge.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):this.sequenceIndex===0?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):t!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(t,n){this.enterRCDATA(t,n),this.state=31}enterRCDATA(t,n){this.inRCDATA=!0,this.currentSequence=t,this.sequenceIndex=n}stateBeforeTagName(t){t===33?(this.state=22,this.sectionStart=this.index+1):t===63?(this.state=24,this.sectionStart=this.index+1):hl(t)?(this.sectionStart=this.index,this.mode===0?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:t===116?this.state=30:this.state=t===115?29:6):t===47?this.state=8:(this.state=1,this.stateText(t))}stateInTagName(t){Ut(t)&&this.handleTagName(t)}stateInSFCRootTagName(t){if(Ut(t)){const n=this.buffer.slice(this.sectionStart,this.index);n!=="template"&&this.enterRCDATA(ur("</"+n),0),this.handleTagName(t)}}handleTagName(t){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)}stateBeforeClosingTagName(t){lt(t)||(t===62?(this.state=1,this.sectionStart=this.index+1):(this.state=hl(t)?9:27,this.sectionStart=this.index))}stateInClosingTagName(t){(t===62||lt(t))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(t))}stateAfterClosingTagName(t){t===62&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(t){t===62?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):t===47?this.state=7:t===60&&this.peek()===47?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):lt(t)||this.handleAttrStart(t)}handleAttrStart(t){t===118&&this.peek()===45?(this.state=13,this.sectionStart=this.index):t===46||t===58||t===64||t===35?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(t){t===62?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):lt(t)||(this.state=11,this.stateBeforeAttrName(t))}stateInAttrName(t){(t===61||Ut(t))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(t))}stateInDirName(t){t===61||Ut(t)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===58?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):t===46&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(t){t===61||Ut(t)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===91?this.state=15:t===46&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(t){t===93?this.state=14:(t===61||Ut(t))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(t))}stateInDirModifier(t){t===61||Ut(t)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===46&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(t){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(t)}stateAfterAttrName(t){t===61?this.state=18:t===47||t===62?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)):lt(t)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(t))}stateBeforeAttrValue(t){t===34?(this.state=19,this.sectionStart=this.index+1):t===39?(this.state=20,this.sectionStart=this.index+1):lt(t)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(t))}handleInAttrValue(t,n){(t===n||this.fastForwardTo(n))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(n===34?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(t){this.handleInAttrValue(t,34)}stateInAttrValueSingleQuotes(t){this.handleInAttrValue(t,39)}stateInAttrValueNoQuotes(t){lt(t)||t===62?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(t)):(t===39||t===60||t===61||t===96)&&this.cbs.onerr(18,this.index)}stateBeforeDeclaration(t){t===91?(this.state=26,this.sequenceIndex=0):this.state=t===45?25:23}stateInDeclaration(t){(t===62||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(t){(t===62||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(t){t===45?(this.state=28,this.currentSequence=Ge.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(t){(t===62||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(t){t===Ge.ScriptEnd[3]?this.startSpecial(Ge.ScriptEnd,4):t===Ge.StyleEnd[3]?this.startSpecial(Ge.StyleEnd,4):(this.state=6,this.stateInTagName(t))}stateBeforeSpecialT(t){t===Ge.TitleEnd[3]?this.startSpecial(Ge.TitleEnd,4):t===Ge.TextareaEnd[3]?this.startSpecial(Ge.TextareaEnd,4):(this.state=6,this.stateInTagName(t))}startEntity(){}stateInEntity(){}parse(t){for(this.buffer=t;this.index<this.buffer.length;){const n=this.buffer.charCodeAt(this.index);switch(n===10&&this.state!==33&&this.newlines.push(this.index),this.state){case 1:{this.stateText(n);break}case 2:{this.stateInterpolationOpen(n);break}case 3:{this.stateInterpolation(n);break}case 4:{this.stateInterpolationClose(n);break}case 31:{this.stateSpecialStartSequence(n);break}case 32:{this.stateInRCDATA(n);break}case 26:{this.stateCDATASequence(n);break}case 19:{this.stateInAttrValueDoubleQuotes(n);break}case 12:{this.stateInAttrName(n);break}case 13:{this.stateInDirName(n);break}case 14:{this.stateInDirArg(n);break}case 15:{this.stateInDynamicDirArg(n);break}case 16:{this.stateInDirModifier(n);break}case 28:{this.stateInCommentLike(n);break}case 27:{this.stateInSpecialComment(n);break}case 11:{this.stateBeforeAttrName(n);break}case 6:{this.stateInTagName(n);break}case 34:{this.stateInSFCRootTagName(n);break}case 9:{this.stateInClosingTagName(n);break}case 5:{this.stateBeforeTagName(n);break}case 17:{this.stateAfterAttrName(n);break}case 20:{this.stateInAttrValueSingleQuotes(n);break}case 18:{this.stateBeforeAttrValue(n);break}case 8:{this.stateBeforeClosingTagName(n);break}case 10:{this.stateAfterClosingTagName(n);break}case 29:{this.stateBeforeSpecialS(n);break}case 30:{this.stateBeforeSpecialT(n);break}case 21:{this.stateInAttrValueNoQuotes(n);break}case 7:{this.stateInSelfClosingTag(n);break}case 23:{this.stateInDeclaration(n);break}case 22:{this.stateBeforeDeclaration(n);break}case 25:{this.stateBeforeComment(n);break}case 24:{this.stateInProcessingInstruction(n);break}case 33:{this.stateInEntity();break}}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(this.state===1||this.state===32&&this.sequenceIndex===0?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(this.state===19||this.state===20||this.state===21)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){const t=this.buffer.length;this.sectionStart>=t||(this.state===28?this.currentSequence===Ge.CdataEnd?this.cbs.oncdata(this.sectionStart,t):this.cbs.oncomment(this.sectionStart,t):this.state===6||this.state===11||this.state===18||this.state===17||this.state===12||this.state===13||this.state===14||this.state===15||this.state===16||this.state===20||this.state===19||this.state===21||this.state===9||this.cbs.ontext(this.sectionStart,t))}emitCodePoint(t,n){}}function fl(e,{compatConfig:t}){const n=t&&t[e];return e==="MODE"?n||3:n}function xc(e,t){const n=fl("MODE",t),i=fl(e,t);return n===3?i===!0:i!==!1}function hr(e,t,n,...i){return xc(e,t)}function c1(e){throw e}function u1(e){}function h1(e,t,n,i){const r=`https://vuejs.org/error-reference/#compiler-${e}`,o=new SyntaxError(String(r));return o.code=e,o.loc=t,o}const f1=e=>e.type===4&&e.isStatic;function d1(e){switch(e){case"Teleport":case"teleport":return i1;case"Suspense":case"suspense":return r1;case"KeepAlive":case"keep-alive":return o1;case"BaseTransition":case"base-transition":return s1}}function m1(e,t){return!!(e&&f1(e)&&e.content===t)}function dl(e){return e.type===7&&e.name==="pre"}const g1=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/,bc={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:Mn,isPreTag:Mn,isIgnoreNewlineTag:Mn,isCustomElement:Mn,onError:c1,onWarn:u1,comments:!1,prefixIdentifiers:!1};let Se=bc,yi=null,Bt="",Ye=null,ye=null,rt="",Ft=-1,hn=-1,gs=0,tn=!1,Co=null;const Ne=[],Ie=new a1(Ne,{onerr:It,ontext(e,t){$i(Be(e,t),e,t)},ontextentity(e,t,n){$i(e,t,n)},oninterpolation(e,t){if(tn)return $i(Be(e,t),e,t);let n=e+Ie.delimiterOpen.length,i=t-Ie.delimiterClose.length;for(;lt(Bt.charCodeAt(n));)n++;for(;lt(Bt.charCodeAt(i-1));)i--;let r=Be(n,i);r.includes("&")&&(r=Se.decodeEntities(r,!1)),Wo({type:5,content:Ki(r,!1,Oe(n,i)),loc:Oe(e,t)})},onopentagname(e,t){const n=Be(e,t);Ye={type:1,tag:n,ns:Se.getNamespace(n,Ne[0],Se.ns),tagType:0,props:[],children:[],loc:Oe(e-1,t),codegenNode:void 0}},onopentagend(e){gl(e)},onclosetag(e,t){const n=Be(e,t);if(!Se.isVoidTag(n)){let i=!1;for(let r=0;r<Ne.length;r++)if(Ne[r].tag.toLowerCase()===n.toLowerCase()){i=!0,r>0&&It(24,Ne[0].loc.start.offset);for(let s=0;s<=r;s++){const a=Ne.shift();Yi(a,t,s<r)}break}i||It(23,wc(e,60))}},onselfclosingtag(e){const t=Ye.tag;Ye.isSelfClosing=!0,gl(e),Ne[0]&&Ne[0].tag===t&&Yi(Ne.shift(),e)},onattribname(e,t){ye={type:6,name:Be(e,t),nameLoc:Oe(e,t),value:void 0,loc:Oe(e)}},ondirname(e,t){const n=Be(e,t),i=n==="."||n===":"?"bind":n==="@"?"on":n==="#"?"slot":n.slice(2);if(!tn&&i===""&&It(26,e),tn||i==="")ye={type:6,name:n,nameLoc:Oe(e,t),value:void 0,loc:Oe(e)};else if(ye={type:7,name:i,rawName:n,exp:void 0,arg:void 0,modifiers:n==="."?[Mo("prop")]:[],loc:Oe(e)},i==="pre"){tn=Ie.inVPre=!0,Co=Ye;const r=Ye.props;for(let o=0;o<r.length;o++)r[o].type===7&&(r[o]=T1(r[o]))}},ondirarg(e,t){if(e===t)return;const n=Be(e,t);if(tn&&!dl(ye))ye.name+=n,dn(ye.nameLoc,t);else{const i=n[0]!=="[";ye.arg=Ki(i?n:n.slice(1,-1),i,Oe(e,t),i?3:0)}},ondirmodifier(e,t){const n=Be(e,t);if(tn&&!dl(ye))ye.name+="."+n,dn(ye.nameLoc,t);else if(ye.name==="slot"){const i=ye.arg;i&&(i.content+="."+n,dn(i.loc,t))}else{const i=Mo(n,!0,Oe(e,t));ye.modifiers.push(i)}},onattribdata(e,t){rt+=Be(e,t),Ft<0&&(Ft=e),hn=t},onattribentity(e,t,n){rt+=e,Ft<0&&(Ft=t),hn=n},onattribnameend(e){const t=ye.loc.start.offset,n=Be(t,e);ye.type===7&&(ye.rawName=n),Ye.props.some(i=>(i.type===7?i.rawName:i.name)===n)&&It(2,t)},onattribend(e,t){if(Ye&&ye){if(dn(ye.loc,t),e!==0)if(rt.includes("&")&&(rt=Se.decodeEntities(rt,!0)),ye.type===6)ye.name==="class"&&(rt=Sc(rt).trim()),e===1&&!rt&&It(13,t),ye.value={type:2,content:rt,loc:e===1?Oe(Ft,hn):Oe(Ft-1,hn+1)},Ie.inSFCRoot&&Ye.tag==="template"&&ye.name==="lang"&&rt&&rt!=="html"&&Ie.enterRCDATA(ur("</template"),0);else{let n=0;ye.exp=Ki(rt,!1,Oe(Ft,hn),0,n),ye.name==="for"&&(ye.forParseResult=y1(ye.exp));let i=-1;ye.name==="bind"&&(i=ye.modifiers.findIndex(r=>r.content==="sync"))>-1&&hr("COMPILER_V_BIND_SYNC",Se,ye.loc,ye.arg.loc.source)&&(ye.name="model",ye.modifiers.splice(i,1))}(ye.type!==7||ye.name!=="pre")&&Ye.props.push(ye)}rt="",Ft=hn=-1},oncomment(e,t){Se.comments&&Wo({type:3,content:Be(e,t),loc:Oe(e-4,t+3)})},onend(){const e=Bt.length;for(let t=0;t<Ne.length;t++)Yi(Ne[t],e-1),It(24,Ne[t].loc.start.offset)},oncdata(e,t){Ne[0].ns!==0?$i(Be(e,t),e,t):It(1,e-9)},onprocessinginstruction(e){(Ne[0]?Ne[0].ns:Se.ns)===0&&It(21,e-1)}}),ml=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,p1=/^\(|\)$/g;function y1(e){const t=e.loc,n=e.content,i=n.match(g1);if(!i)return;const[,r,o]=i,s=(h,f,d=!1)=>{const x=t.start.offset+f,b=x+h.length;return Ki(h,!1,Oe(x,b),0,d?1:0)},a={source:s(o.trim(),n.indexOf(o,r.length)),value:void 0,key:void 0,index:void 0,finalized:!1};let l=r.trim().replace(p1,"").trim();const c=r.indexOf(l),u=l.match(ml);if(u){l=l.replace(ml,"").trim();const h=u[1].trim();let f;if(h&&(f=n.indexOf(h,c+l.length),a.key=s(h,f,!0)),u[2]){const d=u[2].trim();d&&(a.index=s(d,n.indexOf(d,a.key?f+h.length:c+l.length),!0))}}return l&&(a.value=s(l,c,!0)),a}function Be(e,t){return Bt.slice(e,t)}function gl(e){Ie.inSFCRoot&&(Ye.innerLoc=Oe(e+1,e+1)),Wo(Ye);const{tag:t,ns:n}=Ye;n===0&&Se.isPreTag(t)&&gs++,Se.isVoidTag(t)?Yi(Ye,e):(Ne.unshift(Ye),(n===1||n===2)&&(Ie.inXML=!0)),Ye=null}function $i(e,t,n){{const o=Ne[0]&&Ne[0].tag;o!=="script"&&o!=="style"&&e.includes("&")&&(e=Se.decodeEntities(e,!1))}const i=Ne[0]||yi,r=i.children[i.children.length-1];r&&r.type===2?(r.content+=e,dn(r.loc,n)):i.children.push({type:2,content:e,loc:Oe(t,n)})}function Yi(e,t,n=!1){n?dn(e.loc,wc(t,60)):dn(e.loc,x1(t,62)+1),Ie.inSFCRoot&&(e.children.length?e.innerLoc.end=Ve({},e.children[e.children.length-1].loc.end):e.innerLoc.end=Ve({},e.innerLoc.start),e.innerLoc.source=Be(e.innerLoc.start.offset,e.innerLoc.end.offset));const{tag:i,ns:r,children:o}=e;if(tn||(i==="slot"?e.tagType=2:pl(e)?e.tagType=3:w1(e)&&(e.tagType=1)),Ie.inRCDATA||(e.children=vc(o)),r===0&&Se.isIgnoreNewlineTag(i)){const s=o[0];s&&s.type===2&&(s.content=s.content.replace(/^\r?\n/,""))}r===0&&Se.isPreTag(i)&&gs--,Co===e&&(tn=Ie.inVPre=!1,Co=null),Ie.inXML&&(Ne[0]?Ne[0].ns:Se.ns)===0&&(Ie.inXML=!1);{const s=e.props;if(!Ie.inSFCRoot&&xc("COMPILER_NATIVE_TEMPLATE",Se)&&e.tag==="template"&&!pl(e)){const l=Ne[0]||yi,c=l.children.indexOf(e);l.children.splice(c,1,...e.children)}const a=s.find(l=>l.type===6&&l.name==="inline-template");a&&hr("COMPILER_INLINE_TEMPLATE",Se,a.loc)&&e.children.length&&(a.value={type:2,content:Be(e.children[0].loc.start.offset,e.children[e.children.length-1].loc.end.offset),loc:a.loc})}}function x1(e,t){let n=e;for(;Bt.charCodeAt(n)!==t&&n<Bt.length-1;)n++;return n}function wc(e,t){let n=e;for(;Bt.charCodeAt(n)!==t&&n>=0;)n--;return n}const b1=new Set(["if","else","else-if","for","slot"]);function pl({tag:e,props:t}){if(e==="template"){for(let n=0;n<t.length;n++)if(t[n].type===7&&b1.has(t[n].name))return!0}return!1}function w1({tag:e,props:t}){if(Se.isCustomElement(e))return!1;if(e==="component"||v1(e.charCodeAt(0))||d1(e)||Se.isBuiltInComponent&&Se.isBuiltInComponent(e)||Se.isNativeTag&&!Se.isNativeTag(e))return!0;for(let n=0;n<t.length;n++){const i=t[n];if(i.type===6){if(i.name==="is"&&i.value){if(i.value.content.startsWith("vue:"))return!0;if(hr("COMPILER_IS_ON_ELEMENT",Se,i.loc))return!0}}else if(i.name==="bind"&&m1(i.arg,"is")&&hr("COMPILER_IS_ON_ELEMENT",Se,i.loc))return!0}return!1}function v1(e){return e>64&&e<91}const S1=/\r\n/g;function vc(e){const t=Se.whitespace!=="preserve";let n=!1;for(let i=0;i<e.length;i++){const r=e[i];if(r.type===2)if(gs)r.content=r.content.replace(S1,`
`);else if(_1(r.content)){const o=e[i-1]&&e[i-1].type,s=e[i+1]&&e[i+1].type;!o||!s||t&&(o===3&&(s===3||s===1)||o===1&&(s===3||s===1&&k1(r.content)))?(n=!0,e[i]=null):r.content=" "}else t&&(r.content=Sc(r.content))}return n?e.filter(Boolean):e}function _1(e){for(let t=0;t<e.length;t++)if(!lt(e.charCodeAt(t)))return!1;return!0}function k1(e){for(let t=0;t<e.length;t++){const n=e.charCodeAt(t);if(n===10||n===13)return!0}return!1}function Sc(e){let t="",n=!1;for(let i=0;i<e.length;i++)lt(e.charCodeAt(i))?n||(t+=" ",n=!0):(t+=e[i],n=!1);return t}function Wo(e){(Ne[0]||yi).children.push(e)}function Oe(e,t){return{start:Ie.getPos(e),end:t==null?t:Ie.getPos(t),source:t==null?t:Be(e,t)}}function dn(e,t){e.end=Ie.getPos(t),e.source=Be(e.start.offset,t)}function T1(e){const t={type:6,name:e.rawName,nameLoc:Oe(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){const n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n}}return t}function Ki(e,t=!1,n,i=0,r=0){return Mo(e,t,n,i)}function It(e,t,n){Se.onError(h1(e,Oe(t,t)))}function P1(){Ie.reset(),Ye=null,ye=null,rt="",Ft=-1,hn=-1,Ne.length=0}function A1(e,t){if(P1(),Bt=e,Se=Ve({},bc),t){let r;for(r in t)t[r]!=null&&(Se[r]=t[r])}Ie.mode=Se.parseMode==="html"?1:Se.parseMode==="sfc"?2:0,Ie.inXML=Se.ns===1||Se.ns===2;const n=t&&t.delimiters;n&&(Ie.delimiterOpen=ur(n[0]),Ie.delimiterClose=ur(n[1]));const i=yi=l1([],e);return Ie.parse(Bt),i.loc=Oe(0,e.length),i.children=vc(i.children),yi=null,i}new RegExp("\\b"+"arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b")+"\\b");const _c={axis_x:{line_orientation:"horizontal",title_offset:20},axis_y:{line_orientation:"vertical",title_offset:50,title_angle:90},axis_left:{ticks_position:"left",title_position:"left"},axis_right:{ticks_position:"right",title_position:"right"},axis_top:{ticks_position:"top",title_position:"top"},axis_bottom:{ticks_position:"bottom",title_position:"bottom"},plot:{margin:20,padding_x:50,padding_y:20}},kc={axis:{line_color:"black",line_width:1,ticks_color:"black",ticks_width:1,ticks_length:5,label_color:"black",label_size:12,title_color:"black",title_size:18},grid:{line_color:"#eeeeee",line_width_major:2,line_width_minor:1},legend:{spacing:4}},L1={axis:{line_color:"gray",line_width:1,ticks_color:"gray",ticks_width:1,ticks_length:5,label_color:"gray",label_size:12,title_color:"gray",title_size:18},grid:{line_color:"#eeeeee",line_width_major:2,line_width_minor:1},legend:{spacing:4}},M1={axis:{line_color:"black",line_width:1,ticks_color:"black",ticks_width:1,ticks_length:5,label_color:"black",label_size:12,title_color:"black",title_size:18},legend:{spacing:4}};function Tn(e){return e=e.filter(t=>t!==void 0),e=e.slice(e.findIndex(t=>t==null)+1),e.length==0?null:e.reduce((t,n)=>Object.assign(t,n),{})}function C1(...e){return{axis:{left:Tn(["axis","axis_y","axis_left"].flatMap(t=>e.map(n=>n?.[t]))),right:Tn(["axis","axis_y","axis_right"].flatMap(t=>e.map(n=>n?.[t]))),top:Tn(["axis","axis_x","axis_top"].flatMap(t=>e.map(n=>n?.[t]))),bottom:Tn(["axis","axis_x","axis_bottom"].flatMap(t=>e.map(n=>n?.[t])))},grid:{x:Tn(["grid","grid_x"].flatMap(t=>e.map(n=>n?.[t]))),y:Tn(["grid","grid_y"].flatMap(t=>e.map(n=>n?.[t])))},plot:{margin:{left:["margin","margin_x","margin_left"].flatMap(t=>e.map(n=>n?.plot?.[t])).findLast(t=>t!==void 0)??0,right:["margin","margin_x","margin_right"].flatMap(t=>e.map(n=>n?.plot?.[t])).findLast(t=>t!==void 0)??0,top:["margin","margin_y","margin_top"].flatMap(t=>e.map(n=>n?.plot?.[t])).findLast(t=>t!==void 0)??0,bottom:["margin","margin_y","margin_bottom"].flatMap(t=>e.map(n=>n?.plot?.[t])).findLast(t=>t!==void 0)??0},padding:{left:["padding","padding_x","padding_left"].flatMap(t=>e.map(n=>n?.plot?.[t])).findLast(t=>t!==void 0)??0,right:["padding","padding_x","padding_right"].flatMap(t=>e.map(n=>n?.plot?.[t])).findLast(t=>t!==void 0)??0,top:["padding","padding_y","padding_top"].flatMap(t=>e.map(n=>n?.plot?.[t])).findLast(t=>t!==void 0)??0,bottom:["padding","padding_y","padding_bottom"].flatMap(t=>e.map(n=>n?.plot?.[t])).findLast(t=>t!==void 0)??0}},legend:{spacing:e.map(t=>t?.legend?.spacing).findLast(t=>t!==void 0)??0}}}const yl={base:_c,default:kc,light:L1,classic:M1},fr={min(e,{na_rm:t=!0,infinity_rm:n=!0}={}){return t&&(e=e.filter(i=>typeof i=="number")),n&&(e=e.filter(i=>isFinite(i))),Array.from(e).reduce((i,r)=>i<r?i:r,1/0)},max(e,{na_rm:t=!0,infinity_rm:n=!0}={}){return t&&(e=e.filter(i=>typeof i=="number")),n&&(e=e.filter(i=>isFinite(i))),Array.from(e).reduce((i,r)=>i>r?i:r,-1/0)},extent(e,{na_rm:t=!0,infinity_rm:n=!0}={}){if(e.length==0)return[];t&&(e=e.filter(o=>typeof o=="number")),n&&(e=e.filter(o=>isFinite(o)));let i=Array.from(e).reduce((o,s)=>o<s?o:s,1/0),r=Array.from(e).reduce((o,s)=>o>s?o:s,-1/0);return{0:i,1:r,length:2,min:i,max:r}}},W1={sum(...e){if(e.some(i=>i==null))return null;if(e.some(i=>!Array.isArray(i)&&typeof i!="number"))throw new Error("Arguments must be numbers or arrays");let t=e.filter(i=>!Array.isArray(i)).reduce((i,r)=>i+r,0);if(e=e.filter(i=>Array.isArray(i)),e.length==0)return[t];if(e.some(i=>i.length==0))return[];let n=e[0].length;if(e.some(i=>i.length!=n))throw new Error("Arrays must have the same length");return Array.from({length:n},(i,r)=>e.reduce((o,s)=>o+s[r],t))}};function xl(){let e=Array.from(arguments);if(!e.some(t=>t===void 0))return e.some(t=>t===null)?null:e.join("")}function Ei(e){return e==null?[]:Array.from(new Set(e))}function No(e){return{shiftKey:e.shiftKey,ctrlKey:e.ctrlKey,altKey:e.altKey,metaKey:e.metaKey,button:e.button,buttons:e.buttons}}function Ii(...e){if(e.length==0)return null;let n=e.filter(o=>Array.isArray(o)).reduce((o,s)=>{if(Array.isArray(s)){if(o==null)return s.length;if(o!=s.length)throw new Error("Arrays must have the same length")}return o},null)??0,i=[],r=[];for(let o=0;o<n;o++){let s=e.map(l=>Array.isArray(l)?l[o]:l),a=i.findIndex(l=>l.every((c,u)=>c===s[u]));a===-1&&(i.push(s),a=i.length-1),r.push(a)}return r.categories=i,r}let We=W1.sum;const nn={point:{attrs:["color","size","stroke","alpha","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.x)??e.x,n),o=We(t.y?.apply?.(e.y)??e.y,i);return{x:r,y:o}},get_range(e,t){if(t=="x")return e.x??[];if(t=="y")return e.y??[]},validate(e){return isNaN(+e.x)||isNaN(+e.y)?null:e}},line:{attrs:["color","linewidth","linetype","alpha","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.x)??e.x,n),o=We(t.y?.apply?.(e.y)??e.y,i),s=We(t.x?.apply?.(e.xend)??e.xend,n),a=We(t.y?.apply?.(e.yend)??e.yend,i);return{x:r,y:o,xend:s,yend:a}},get_range(e,t){if(t=="x")return(e.x??[]).concat(e.xend??[]);if(t=="y")return(e.y??[]).concat(e.yend??[])},validate(e){return isNaN(+e.x)||isNaN(+e.y)||isNaN(+e.xend)||isNaN(+e.yend)?null:e}},stick:{attrs:["color","linewidth","linetype","alpha","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.x)??e.x,n),o=We(t.y?.apply?.(e.y)??e.y,i),s=We(r,e.dx,n),a=We(o,e.dy,i);return{x:r,y:o,xend:s,yend:a}},get_range(e,t){if(t=="x")return(e.x??[]).concat(e.xend??[]);if(t=="y")return(e.y??[]).concat(e.yend??[])},validate(e){return isNaN(+e.x)||isNaN(+e.y)||isNaN(+e.xend)||isNaN(+e.yend)?null:e}},tile:{attrs:["fill","color","linewidth","alpha","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=t.x?.apply?.(e.x)??e.x,o=t.y?.apply?.(e.y)??e.y,s=We(r,e.width?.map?.(u=>-u/2)??-.5,n),a=We(r,e.width?.map?.(u=>+u/2)??.5,n),l=We(o,e.height?.map?.(u=>-u/2)??-.5,i),c=We(o,e.height?.map?.(u=>+u/2)??.5,i);return{xmin:s,xmax:a,ymin:l,ymax:c}},get_values(e,t){if(t=="x")return e.x;if(t=="y")return e.y},get_range(e,t){if(t=="x"){let n=(e.x??[]).map((r,o)=>+r-e.width[o]/2),i=(e.x??[]).map((r,o)=>+r+e.width[o]/2);return n.concat(i)}if(t=="y"){let n=(e.y??[]).map((r,o)=>+r-e.height[o]/2),i=(e.y??[]).map((r,o)=>+r+e.height[o]/2);return n.concat(i)}},validate(e){return isNaN(+e.xmin)||isNaN(+e.ymin)||isNaN(+e.xmax)||isNaN(+e.ymax)?null:e}},rect:{attrs:["fill","color","linewidth","alpha","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.xmin)??e.xmin,n),o=We(t.x?.apply?.(e.xmax)??e.xmax,n),s=We(t.y?.apply?.(e.ymin)??e.ymin,i),a=We(t.y?.apply?.(e.ymax)??e.ymax,i);return{xmin:r,xmax:o,ymin:s,ymax:a}},get_range(e,t){if(t=="x")return(e.xmin??[]).concat(e.xmax??[]);if(t=="y")return(e.ymin??[]).concat(e.ymax??[])},validate(e){return isNaN(+e.xmin)||isNaN(+e.ymin)||isNaN(+e.xmax)||isNaN(+e.ymax)?null:e}},polygon:{attrs:["fill","color","linewidth","alpha","points","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge?.map(o=>+o),i=e.ynudge?.map(o=>+o);return{points:e.points.map((o,s)=>o.map(a=>{let l=n?.[s]??0,c=i?.[s]??0;return{x:+(t?.x?.[a.x]??a.x)+l,y:+(t?.y?.[a.y]??a.y)+c}}))}},get_range(e,t){if(t=="x")return(e.points??[]).flatMap(n=>n.map(i=>i.x));if(t=="y")return(e.points??[]).flatMap(n=>n.map(i=>i.y))},validate(e){return Array.isArray(e.points)?e:null}},text:{attrs:["color","size","stroke","linewidth","alpha","label","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.x)??e.x,n),o=We(t.y?.apply?.(e.y)??e.y,i);return{x:r,y:o}},get_range(e,t){if(t=="x")return e.x??[];if(t=="y")return e.y??[]},validate(e){return isNaN(+e.x)||isNaN(+e.y)?null:e}},textsegment:{attrs:["color","size","stroke","linewidth","alpha","label","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.x)??e.x,n),o=We(t.y?.apply?.(e.y)??e.y,i),s=We(t.x?.apply?.(e.xend)??e.xend,n),a=We(t.y?.apply?.(e.yend)??e.yend,i);return{x:r,y:o,xend:s,yend:a}},get_range(e,t){if(t=="x")return(e.x??[]).concat(e.xend??[]);if(t=="y")return(e.y??[]).concat(e.yend??[])},validate(e){return isNaN(+e.x)||isNaN(+e.xend)||isNaN(+e.y)||isNaN(+e.yend)?null:e}}},N1={line:Object.assign(function(e,{orientation:t="x"}={}){let n=["x","y"].filter(c=>e[c]==null);if(n.length>0)throw new Error(`Missing aesthetics for GeomLine: ${n}`);let i=e.group??new Array(e.x.length).fill(null),o=Object.values(i.reduce((c,u,h)=>(c[u]==null&&(c[u]=[]),c[u].push(h),c),{})).map(c=>c.map((u,h)=>[e[t][u],h]).sort((u,h)=>u[0]-h[0]).map((u,h)=>c[u[1]])),s=o.map(c=>c.slice(0,-1).concat(NaN)).reduce((c,u)=>c.concat(u),[]).filter(c=>!isNaN(c)),a=o.map(c=>c.slice(1).concat(NaN)).reduce((c,u)=>c.concat(u),[]).filter(c=>!isNaN(c)),l={};for(let c in e)l[c]=s.map(u=>e[c][u]);return l.xend=a.map(c=>e.x[c]),l.yend=a.map(c=>e.y[c]),l},{coord_attrs:["x","y","xnudge","ynudge"]}),linerange:Object.assign(function(e){if(e.x!=null){let t=["x","ymin","ymax"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomLinerange: ${t}`);return(({x:n,ymin:i,ymax:r,...o})=>({x:n,xend:n,y:i,yend:r,...o}))(e)}else if(e.y!=null){let t=["y","xmin","xmax"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomLinerange: ${t}`);return(({y:n,xmin:i,xmax:r,...o})=>({y:n,yend:n,x:i,xend:r,...o}))(e)}else throw new Error("Missing aesthetics for GeomLinerange: x,ymin,ymax or y,xmin,xmax")},{coord_attrs:["x","y","xmin","xmax","ymin","ymax","xnudge","ynudge"]}),path:Object.assign(function(e){let t=["x","y"].filter(l=>e[l]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomPath: ${t}`);let n=e.group??new Array(e.x.length).fill(null),r=Object.values(n.reduce((l,c,u)=>(l[c]==null&&(l[c]=[]),l[c].push(u),l),{})).map(l=>l.map((c,u)=>l[u])),o=r.map(l=>l.slice(0,-1).concat(NaN)).reduce((l,c)=>l.concat(c),[]).filter(l=>!isNaN(l)),s=r.map(l=>l.slice(1).concat(NaN)).reduce((l,c)=>l.concat(c),[]).filter(l=>!isNaN(l)),a={};for(let l in e)a[l]=o.map(c=>e[l][c]);return a.xend=s.map(l=>e.x[l]),a.yend=s.map(l=>e.y[l]),a},{coord_attrs:["x","y","xnudge","ynudge"]}),segment:Object.assign(function(e){e.xend==null&&(e.xend=e.x),e.yend==null&&(e.yend=e.y);let t=["x","y","xend","yend"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomLine: ${t}`);return e},{coord_attrs:["x","y","xend","yend","xnudge","ynudge"]}),stick:Object.assign(function(e){e.dx==null&&(e.dx=Array(e.x.length).fill(0)),e.dy==null&&(e.dy=Array(e.y.length).fill(0));let t=["x","y","dx","dy"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomStick: ${t}`);return e},{coord_attrs:["x","y","dx","dy","xnudge","ynudge"]}),point:Object.assign(function(e){let t=["x","y"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomPoint: ${t}`);return e},{coord_attrs:["x","y","xnudge","ynudge"]}),polygon:Object.assign(function(e){let t=["points"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomPolygon: ${t}`);return e},{coord_attrs:["points","xnudge","ynudge"]}),rect:Object.assign(function(e){let t=["xmin","xmax","ymin","ymax"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomRect: ${t}`);return e},{coord_attrs:["xmin","xmax","ymin","ymax","xnudge","ynudge"]}),tile:Object.assign(function(e){e.width==null&&e.x.some(n=>typeof n=="string")&&(e.width=Array(e.x.length).fill(1)),e.height==null&&e.y.some(n=>typeof n=="string")&&(e.height=Array(e.y.length).fill(1));let t=["x","y","width","height"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomTile: ${t}`);return e},{coord_attrs:["x","y","width","height","xnudge","ynudge"]}),text:Object.assign(function(e){let t=["x","y","label"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomText: ${t}`);return e},{coord_attrs:["x","y","xnudge","ynudge"]}),textsegment:Object.assign(function(e){e.xend==null&&(e.xend=e.x),e.yend==null&&(e.yend=e.y);let t=["x","y","xend","yend","label"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomTextsegment: ${t}`);return e},{coord_attrs:["x","y","xend","yend","xnudge","ynudge"]}),histogram:Object.assign(function(e,{bins:t=30,binwidth:n,breaks:i}={}){if(e.x!=null&&e.y!=null)throw new Error("Histogram only supports x or y, not both");let r=e.x??e.y;if(r==null)throw new Error("Missing aesthetics for GeomHistogram: x or y");if(r.some(h=>typeof h!="number"))throw new Error('"stat.histogram" requires a continuous aesthetic');if(i)i.sort((h,f)=>h-f);else{let{min:h,max:f}=fr.extent(r);n||(n=(f-h)/(t-1)),i=Array.from({length:t+1},(d,x)=>h+(x-.5)*n)}t=i.length-1;let o=Object.keys(e).filter(h=>!["x","y"].includes(h)&&!h.startsWith("$")),s=Ii(...o.map(h=>e[h])),a=Ii(s??0,r.map(h=>i.findLast(f=>f<=h)??i[0]),r.map(h=>i.find(f=>f>h)??i[t])),l=[],c=Object.groupBy(e.$raw,(h,f)=>a?.[f]);for(let h in c)l[h]=c[h];let u={$raw:l,count:l.map(h=>h.length),$group:l.map((h,f)=>a.categories[f][0]),upper:l.map((h,f)=>a.categories[f][1]),lower:l.map((h,f)=>a.categories[f][2])};for(let h in o)u[o[h]]=l.map((f,d)=>s.categories[a.categories[d][0]][h]);return e.x?(({upper:h,lower:f,count:d,ymin:x=l.map(()=>0),...b})=>({xmin:h,xmax:f,ymin:x,ymax:d,...b}))(u):(({upper:h,lower:f,count:d,xmin:x=l.map(()=>0),...b})=>({xmin:x,xmax:d,ymin:h,ymax:f,...b}))(u)},{coord_attrs:["x","y","xnudge","ynudge"]}),bar:Object.assign(function(e){if(e.x!=null&&e.y!=null)throw new Error("Bar only supports x or y, not both");let t=e.x??e.y;if(t==null)throw new Error("Missing aesthetics for GeomBar: x or y");if(t.some(l=>typeof l=="number"))throw new Error('"stat.bar" requires a discrete aesthetic');let n=Object.keys(e).filter(l=>!["x","y"].includes(l)&&!l.startsWith("$")),i=Ii(...n.map(l=>e[l])),r=Ii(i??0,t),o=[],s=Object.groupBy(e.$raw,(l,c)=>r?.[c]);for(let l in s)o[l]=s[l];let a={$raw:o,count:o.map(l=>l.length),$group:o.map((l,c)=>r.categories[c][0]),value:o.map((l,c)=>r.categories[c][1])};for(let l in n)a[n[l]]=o.map((c,u)=>i.categories[r.categories[u][0]][l]);return e.x?(({value:l,count:c,...u})=>({x:l,y:c.map(h=>h/2),height:c,...u}))(a):(({value:l,count:c,...u})=>({y:l,x:c.map(h=>h/2),width:c,...u}))(a)},{coord_attrs:["x","y","xnudge","ynudge"]})};function Ui(e,t){return e==null||t==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function $1(e,t){return e==null||t==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function Tc(e){let t,n,i;e.length!==2?(t=Ui,n=(a,l)=>Ui(e(a),l),i=(a,l)=>e(a)-l):(t=e===Ui||e===$1?e:E1,n=e,i=e);function r(a,l,c=0,u=a.length){if(c<u){if(t(l,l)!==0)return u;do{const h=c+u>>>1;n(a[h],l)<0?c=h+1:u=h}while(c<u)}return c}function o(a,l,c=0,u=a.length){if(c<u){if(t(l,l)!==0)return u;do{const h=c+u>>>1;n(a[h],l)<=0?c=h+1:u=h}while(c<u)}return c}function s(a,l,c=0,u=a.length){const h=r(a,l,c,u-1);return h>c&&i(a[h-1],l)>-i(a[h],l)?h-1:h}return{left:r,center:s,right:o}}function E1(){return 0}function I1(e){return e===null?NaN:+e}const O1=Tc(Ui),R1=O1.right;Tc(I1).center;const F1=Math.sqrt(50),j1=Math.sqrt(10),D1=Math.sqrt(2);function dr(e,t,n){const i=(t-e)/Math.max(0,n),r=Math.floor(Math.log10(i)),o=i/Math.pow(10,r),s=o>=F1?10:o>=j1?5:o>=D1?2:1;let a,l,c;return r<0?(c=Math.pow(10,-r)/s,a=Math.round(e*c),l=Math.round(t*c),a/c<e&&++a,l/c>t&&--l,c=-c):(c=Math.pow(10,r)*s,a=Math.round(e/c),l=Math.round(t/c),a*c<e&&++a,l*c>t&&--l),l<a&&.5<=n&&n<2?dr(e,t,n*2):[a,l,c]}function V1(e,t,n){if(t=+t,e=+e,n=+n,!(n>0))return[];if(e===t)return[e];const i=t<e,[r,o,s]=i?dr(t,e,n):dr(e,t,n);if(!(o>=r))return[];const a=o-r+1,l=new Array(a);if(i)if(s<0)for(let c=0;c<a;++c)l[c]=(o-c)/-s;else for(let c=0;c<a;++c)l[c]=(o-c)*s;else if(s<0)for(let c=0;c<a;++c)l[c]=(r+c)/-s;else for(let c=0;c<a;++c)l[c]=(r+c)*s;return l}function $o(e,t,n){return t=+t,e=+e,n=+n,dr(e,t,n)[2]}function z1(e,t,n){t=+t,e=+e,n=+n;const i=t<e,r=i?$o(t,e,n):$o(e,t,n);return(i?-1:1)*(r<0?1/-r:r)}var B1={value:()=>{}};function Pc(){for(var e=0,t=arguments.length,n={},i;e<t;++e){if(!(i=arguments[e]+"")||i in n||/[\s.]/.test(i))throw new Error("illegal type: "+i);n[i]=[]}return new Ji(n)}function Ji(e){this._=e}function H1(e,t){return e.trim().split(/^|\s+/).map(function(n){var i="",r=n.indexOf(".");if(r>=0&&(i=n.slice(r+1),n=n.slice(0,r)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:i}})}Ji.prototype=Pc.prototype={constructor:Ji,on:function(e,t){var n=this._,i=H1(e+"",n),r,o=-1,s=i.length;if(arguments.length<2){for(;++o<s;)if((r=(e=i[o]).type)&&(r=q1(n[r],e.name)))return r;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<s;)if(r=(e=i[o]).type)n[r]=bl(n[r],e.name,t);else if(t==null)for(r in n)n[r]=bl(n[r],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new Ji(e)},call:function(e,t){if((r=arguments.length-2)>0)for(var n=new Array(r),i=0,r,o;i<r;++i)n[i]=arguments[i+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],i=0,r=o.length;i<r;++i)o[i].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var i=this._[e],r=0,o=i.length;r<o;++r)i[r].value.apply(t,n)}};function q1(e,t){for(var n=0,i=e.length,r;n<i;++n)if((r=e[n]).name===t)return r.value}function bl(e,t,n){for(var i=0,r=e.length;i<r;++i)if(e[i].name===t){e[i]=B1,e=e.slice(0,i).concat(e.slice(i+1));break}return n!=null&&e.push({name:t,value:n}),e}var Eo="http://www.w3.org/1999/xhtml";const wl={svg:"http://www.w3.org/2000/svg",xhtml:Eo,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Hr(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),wl.hasOwnProperty(t)?{space:wl[t],local:e}:e}function G1(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Eo&&t.documentElement.namespaceURI===Eo?t.createElement(e):t.createElementNS(n,e)}}function X1(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Ac(e){var t=Hr(e);return(t.local?X1:G1)(t)}function Y1(){}function ps(e){return e==null?Y1:function(){return this.querySelector(e)}}function K1(e){typeof e!="function"&&(e=ps(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o=t[r],s=o.length,a=i[r]=new Array(s),l,c,u=0;u<s;++u)(l=o[u])&&(c=e.call(l,l.__data__,u,o))&&("__data__"in l&&(c.__data__=l.__data__),a[u]=c);return new vt(i,this._parents)}function U1(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function J1(){return[]}function Lc(e){return e==null?J1:function(){return this.querySelectorAll(e)}}function Z1(e){return function(){return U1(e.apply(this,arguments))}}function Q1(e){typeof e=="function"?e=Z1(e):e=Lc(e);for(var t=this._groups,n=t.length,i=[],r=[],o=0;o<n;++o)for(var s=t[o],a=s.length,l,c=0;c<a;++c)(l=s[c])&&(i.push(e.call(l,l.__data__,c,s)),r.push(l));return new vt(i,r)}function Mc(e){return function(){return this.matches(e)}}function Cc(e){return function(t){return t.matches(e)}}var ed=Array.prototype.find;function td(e){return function(){return ed.call(this.children,e)}}function nd(){return this.firstElementChild}function id(e){return this.select(e==null?nd:td(typeof e=="function"?e:Cc(e)))}var rd=Array.prototype.filter;function od(){return Array.from(this.children)}function sd(e){return function(){return rd.call(this.children,e)}}function ld(e){return this.selectAll(e==null?od:sd(typeof e=="function"?e:Cc(e)))}function ad(e){typeof e!="function"&&(e=Mc(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o=t[r],s=o.length,a=i[r]=[],l,c=0;c<s;++c)(l=o[c])&&e.call(l,l.__data__,c,o)&&a.push(l);return new vt(i,this._parents)}function Wc(e){return new Array(e.length)}function cd(){return new vt(this._enter||this._groups.map(Wc),this._parents)}function mr(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}mr.prototype={constructor:mr,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function ud(e){return function(){return e}}function hd(e,t,n,i,r,o){for(var s=0,a,l=t.length,c=o.length;s<c;++s)(a=t[s])?(a.__data__=o[s],i[s]=a):n[s]=new mr(e,o[s]);for(;s<l;++s)(a=t[s])&&(r[s]=a)}function fd(e,t,n,i,r,o,s){var a,l,c=new Map,u=t.length,h=o.length,f=new Array(u),d;for(a=0;a<u;++a)(l=t[a])&&(f[a]=d=s.call(l,l.__data__,a,t)+"",c.has(d)?r[a]=l:c.set(d,l));for(a=0;a<h;++a)d=s.call(e,o[a],a,o)+"",(l=c.get(d))?(i[a]=l,l.__data__=o[a],c.delete(d)):n[a]=new mr(e,o[a]);for(a=0;a<u;++a)(l=t[a])&&c.get(f[a])===l&&(r[a]=l)}function dd(e){return e.__data__}function md(e,t){if(!arguments.length)return Array.from(this,dd);var n=t?fd:hd,i=this._parents,r=this._groups;typeof e!="function"&&(e=ud(e));for(var o=r.length,s=new Array(o),a=new Array(o),l=new Array(o),c=0;c<o;++c){var u=i[c],h=r[c],f=h.length,d=gd(e.call(u,u&&u.__data__,c,i)),x=d.length,b=a[c]=new Array(x),R=s[c]=new Array(x),F=l[c]=new Array(f);n(u,h,b,R,F,d,t);for(var E=0,M=0,C,m;E<x;++E)if(C=b[E]){for(E>=M&&(M=E+1);!(m=R[M])&&++M<x;);C._next=m||null}}return s=new vt(s,i),s._enter=a,s._exit=l,s}function gd(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function pd(){return new vt(this._exit||this._groups.map(Wc),this._parents)}function yd(e,t,n){var i=this.enter(),r=this,o=this.exit();return typeof e=="function"?(i=e(i),i&&(i=i.selection())):i=i.append(e+""),t!=null&&(r=t(r),r&&(r=r.selection())),n==null?o.remove():n(o),i&&r?i.merge(r).order():r}function xd(e){for(var t=e.selection?e.selection():e,n=this._groups,i=t._groups,r=n.length,o=i.length,s=Math.min(r,o),a=new Array(r),l=0;l<s;++l)for(var c=n[l],u=i[l],h=c.length,f=a[l]=new Array(h),d,x=0;x<h;++x)(d=c[x]||u[x])&&(f[x]=d);for(;l<r;++l)a[l]=n[l];return new vt(a,this._parents)}function bd(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var i=e[t],r=i.length-1,o=i[r],s;--r>=0;)(s=i[r])&&(o&&s.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(s,o),o=s);return this}function wd(e){e||(e=vd);function t(h,f){return h&&f?e(h.__data__,f.__data__):!h-!f}for(var n=this._groups,i=n.length,r=new Array(i),o=0;o<i;++o){for(var s=n[o],a=s.length,l=r[o]=new Array(a),c,u=0;u<a;++u)(c=s[u])&&(l[u]=c);l.sort(t)}return new vt(r,this._parents).order()}function vd(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Sd(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function _d(){return Array.from(this)}function kd(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],r=0,o=i.length;r<o;++r){var s=i[r];if(s)return s}return null}function Td(){let e=0;for(const t of this)++e;return e}function Pd(){return!this.node()}function Ad(e){for(var t=this._groups,n=0,i=t.length;n<i;++n)for(var r=t[n],o=0,s=r.length,a;o<s;++o)(a=r[o])&&e.call(a,a.__data__,o,r);return this}function Ld(e){return function(){this.removeAttribute(e)}}function Md(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Cd(e,t){return function(){this.setAttribute(e,t)}}function Wd(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Nd(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function $d(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Ed(e,t){var n=Hr(e);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((t==null?n.local?Md:Ld:typeof t=="function"?n.local?$d:Nd:n.local?Wd:Cd)(n,t))}function Nc(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Id(e){return function(){this.style.removeProperty(e)}}function Od(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Rd(e,t,n){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(e):this.style.setProperty(e,i,n)}}function Fd(e,t,n){return arguments.length>1?this.each((t==null?Id:typeof t=="function"?Rd:Od)(e,t,n??"")):Hn(this.node(),e)}function Hn(e,t){return e.style.getPropertyValue(t)||Nc(e).getComputedStyle(e,null).getPropertyValue(t)}function jd(e){return function(){delete this[e]}}function Dd(e,t){return function(){this[e]=t}}function Vd(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function zd(e,t){return arguments.length>1?this.each((t==null?jd:typeof t=="function"?Vd:Dd)(e,t)):this.node()[e]}function $c(e){return e.trim().split(/^|\s+/)}function ys(e){return e.classList||new Ec(e)}function Ec(e){this._node=e,this._names=$c(e.getAttribute("class")||"")}Ec.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Ic(e,t){for(var n=ys(e),i=-1,r=t.length;++i<r;)n.add(t[i])}function Oc(e,t){for(var n=ys(e),i=-1,r=t.length;++i<r;)n.remove(t[i])}function Bd(e){return function(){Ic(this,e)}}function Hd(e){return function(){Oc(this,e)}}function qd(e,t){return function(){(t.apply(this,arguments)?Ic:Oc)(this,e)}}function Gd(e,t){var n=$c(e+"");if(arguments.length<2){for(var i=ys(this.node()),r=-1,o=n.length;++r<o;)if(!i.contains(n[r]))return!1;return!0}return this.each((typeof t=="function"?qd:t?Bd:Hd)(n,t))}function Xd(){this.textContent=""}function Yd(e){return function(){this.textContent=e}}function Kd(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Ud(e){return arguments.length?this.each(e==null?Xd:(typeof e=="function"?Kd:Yd)(e)):this.node().textContent}function Jd(){this.innerHTML=""}function Zd(e){return function(){this.innerHTML=e}}function Qd(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function e0(e){return arguments.length?this.each(e==null?Jd:(typeof e=="function"?Qd:Zd)(e)):this.node().innerHTML}function t0(){this.nextSibling&&this.parentNode.appendChild(this)}function n0(){return this.each(t0)}function i0(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function r0(){return this.each(i0)}function o0(e){var t=typeof e=="function"?e:Ac(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function s0(){return null}function l0(e,t){var n=typeof e=="function"?e:Ac(e),i=t==null?s0:typeof t=="function"?t:ps(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})}function a0(){var e=this.parentNode;e&&e.removeChild(this)}function c0(){return this.each(a0)}function u0(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function h0(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function f0(e){return this.select(e?h0:u0)}function d0(e){return arguments.length?this.property("__data__",e):this.node().__data__}function m0(e){return function(t){e.call(this,t,this.__data__)}}function g0(e){return e.trim().split(/^|\s+/).map(function(t){var n="",i=t.indexOf(".");return i>=0&&(n=t.slice(i+1),t=t.slice(0,i)),{type:t,name:n}})}function p0(e){return function(){var t=this.__on;if(t){for(var n=0,i=-1,r=t.length,o;n<r;++n)o=t[n],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++i]=o;++i?t.length=i:delete this.__on}}}function y0(e,t,n){return function(){var i=this.__on,r,o=m0(t);if(i){for(var s=0,a=i.length;s<a;++s)if((r=i[s]).type===e.type&&r.name===e.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=o,r.options=n),r.value=t;return}}this.addEventListener(e.type,o,n),r={type:e.type,name:e.name,value:t,listener:o,options:n},i?i.push(r):this.__on=[r]}}function x0(e,t,n){var i=g0(e+""),r,o=i.length,s;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,c=a.length,u;l<c;++l)for(r=0,u=a[l];r<o;++r)if((s=i[r]).type===u.type&&s.name===u.name)return u.value}return}for(a=t?y0:p0,r=0;r<o;++r)this.each(a(i[r],t,n));return this}function Rc(e,t,n){var i=Nc(e),r=i.CustomEvent;typeof r=="function"?r=new r(t,n):(r=i.document.createEvent("Event"),n?(r.initEvent(t,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(t,!1,!1)),e.dispatchEvent(r)}function b0(e,t){return function(){return Rc(this,e,t)}}function w0(e,t){return function(){return Rc(this,e,t.apply(this,arguments))}}function v0(e,t){return this.each((typeof t=="function"?w0:b0)(e,t))}function*S0(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],r=0,o=i.length,s;r<o;++r)(s=i[r])&&(yield s)}var _0=[null];function vt(e,t){this._groups=e,this._parents=t}function Ai(){return new vt([[document.documentElement]],_0)}function k0(){return this}vt.prototype=Ai.prototype={constructor:vt,select:K1,selectAll:Q1,selectChild:id,selectChildren:ld,filter:ad,data:md,enter:cd,exit:pd,join:yd,merge:xd,selection:k0,order:bd,sort:wd,call:Sd,nodes:_d,node:kd,size:Td,empty:Pd,each:Ad,attr:Ed,style:Fd,property:zd,classed:Gd,text:Ud,html:e0,raise:n0,lower:r0,append:o0,insert:l0,remove:c0,clone:f0,datum:d0,on:x0,dispatch:v0,[Symbol.iterator]:S0};function Li(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function qr(e,t){var n=Object.create(e.prototype);for(var i in t)n[i]=t[i];return n}function Sn(){}var xi=.7,gr=1/xi,jn="\\s*([+-]?\\d+)\\s*",bi="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Lt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",T0=/^#([0-9a-f]{3,8})$/,P0=new RegExp(`^rgb\\(${jn},${jn},${jn}\\)$`),A0=new RegExp(`^rgb\\(${Lt},${Lt},${Lt}\\)$`),L0=new RegExp(`^rgba\\(${jn},${jn},${jn},${bi}\\)$`),M0=new RegExp(`^rgba\\(${Lt},${Lt},${Lt},${bi}\\)$`),C0=new RegExp(`^hsl\\(${bi},${Lt},${Lt}\\)$`),W0=new RegExp(`^hsla\\(${bi},${Lt},${Lt},${bi}\\)$`),vl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Li(Sn,yn,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Sl,formatHex:Sl,formatHex8:N0,formatHsl:$0,formatRgb:_l,toString:_l});function Sl(){return this.rgb().formatHex()}function N0(){return this.rgb().formatHex8()}function $0(){return jc(this).formatHsl()}function _l(){return this.rgb().formatRgb()}function yn(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=T0.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?kl(t):n===3?new Je(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?Oi(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?Oi(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=P0.exec(e))?new Je(t[1],t[2],t[3],1):(t=A0.exec(e))?new Je(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=L0.exec(e))?Oi(t[1],t[2],t[3],t[4]):(t=M0.exec(e))?Oi(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=C0.exec(e))?Al(t[1],t[2]/100,t[3]/100,1):(t=W0.exec(e))?Al(t[1],t[2]/100,t[3]/100,t[4]):vl.hasOwnProperty(e)?kl(vl[e]):e==="transparent"?new Je(NaN,NaN,NaN,0):null}function kl(e){return new Je(e>>16&255,e>>8&255,e&255,1)}function Oi(e,t,n,i){return i<=0&&(e=t=n=NaN),new Je(e,t,n,i)}function Fc(e){return e instanceof Sn||(e=yn(e)),e?(e=e.rgb(),new Je(e.r,e.g,e.b,e.opacity)):new Je}function Io(e,t,n,i){return arguments.length===1?Fc(e):new Je(e,t,n,i??1)}function Je(e,t,n,i){this.r=+e,this.g=+t,this.b=+n,this.opacity=+i}Li(Je,Io,qr(Sn,{brighter(e){return e=e==null?gr:Math.pow(gr,e),new Je(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?xi:Math.pow(xi,e),new Je(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Je(pn(this.r),pn(this.g),pn(this.b),pr(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Tl,formatHex:Tl,formatHex8:E0,formatRgb:Pl,toString:Pl}));function Tl(){return`#${mn(this.r)}${mn(this.g)}${mn(this.b)}`}function E0(){return`#${mn(this.r)}${mn(this.g)}${mn(this.b)}${mn((isNaN(this.opacity)?1:this.opacity)*255)}`}function Pl(){const e=pr(this.opacity);return`${e===1?"rgb(":"rgba("}${pn(this.r)}, ${pn(this.g)}, ${pn(this.b)}${e===1?")":`, ${e})`}`}function pr(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function pn(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function mn(e){return e=pn(e),(e<16?"0":"")+e.toString(16)}function Al(e,t,n,i){return i<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new xt(e,t,n,i)}function jc(e){if(e instanceof xt)return new xt(e.h,e.s,e.l,e.opacity);if(e instanceof Sn||(e=yn(e)),!e)return new xt;if(e instanceof xt)return e;e=e.rgb();var t=e.r/255,n=e.g/255,i=e.b/255,r=Math.min(t,n,i),o=Math.max(t,n,i),s=NaN,a=o-r,l=(o+r)/2;return a?(t===o?s=(n-i)/a+(n<i)*6:n===o?s=(i-t)/a+2:s=(t-n)/a+4,a/=l<.5?o+r:2-o-r,s*=60):a=l>0&&l<1?0:s,new xt(s,a,l,e.opacity)}function I0(e,t,n,i){return arguments.length===1?jc(e):new xt(e,t,n,i??1)}function xt(e,t,n,i){this.h=+e,this.s=+t,this.l=+n,this.opacity=+i}Li(xt,I0,qr(Sn,{brighter(e){return e=e==null?gr:Math.pow(gr,e),new xt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?xi:Math.pow(xi,e),new xt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,i=n+(n<.5?n:1-n)*t,r=2*n-i;return new Je(so(e>=240?e-240:e+120,r,i),so(e,r,i),so(e<120?e+240:e-120,r,i),this.opacity)},clamp(){return new xt(Ll(this.h),Ri(this.s),Ri(this.l),pr(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=pr(this.opacity);return`${e===1?"hsl(":"hsla("}${Ll(this.h)}, ${Ri(this.s)*100}%, ${Ri(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Ll(e){return e=(e||0)%360,e<0?e+360:e}function Ri(e){return Math.max(0,Math.min(1,e||0))}function so(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const O0=Math.PI/180,R0=180/Math.PI,yr=18,Dc=.96422,Vc=1,zc=.82521,Bc=4/29,Dn=6/29,Hc=3*Dn*Dn,F0=Dn*Dn*Dn;function qc(e){if(e instanceof Mt)return new Mt(e.l,e.a,e.b,e.opacity);if(e instanceof zt)return Xc(e);e instanceof Je||(e=Fc(e));var t=uo(e.r),n=uo(e.g),i=uo(e.b),r=lo((.2225045*t+.7168786*n+.0606169*i)/Vc),o,s;return t===n&&n===i?o=s=r:(o=lo((.4360747*t+.3850649*n+.1430804*i)/Dc),s=lo((.0139322*t+.0971045*n+.7141733*i)/zc)),new Mt(116*r-16,500*(o-r),200*(r-s),e.opacity)}function Oo(e,t,n,i){return arguments.length===1?qc(e):new Mt(e,t,n,i??1)}function Mt(e,t,n,i){this.l=+e,this.a=+t,this.b=+n,this.opacity=+i}Li(Mt,Oo,qr(Sn,{brighter(e){return new Mt(this.l+yr*(e??1),this.a,this.b,this.opacity)},darker(e){return new Mt(this.l-yr*(e??1),this.a,this.b,this.opacity)},rgb(){var e=(this.l+16)/116,t=isNaN(this.a)?e:e+this.a/500,n=isNaN(this.b)?e:e-this.b/200;return t=Dc*ao(t),e=Vc*ao(e),n=zc*ao(n),new Je(co(3.1338561*t-1.6168667*e-.4906146*n),co(-.9787684*t+1.9161415*e+.033454*n),co(.0719453*t-.2289914*e+1.4052427*n),this.opacity)}}));function lo(e){return e>F0?Math.pow(e,1/3):e/Hc+Bc}function ao(e){return e>Dn?e*e*e:Hc*(e-Bc)}function co(e){return 255*(e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055)}function uo(e){return(e/=255)<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function j0(e){if(e instanceof zt)return new zt(e.h,e.c,e.l,e.opacity);if(e instanceof Mt||(e=qc(e)),e.a===0&&e.b===0)return new zt(NaN,0<e.l&&e.l<100?0:NaN,e.l,e.opacity);var t=Math.atan2(e.b,e.a)*R0;return new zt(t<0?t+360:t,Math.sqrt(e.a*e.a+e.b*e.b),e.l,e.opacity)}function Gc(e,t,n,i){return arguments.length===1?j0(e):new zt(e,t,n,i??1)}function zt(e,t,n,i){this.h=+e,this.c=+t,this.l=+n,this.opacity=+i}function Xc(e){if(isNaN(e.h))return new Mt(e.l,0,0,e.opacity);var t=e.h*O0;return new Mt(e.l,Math.cos(t)*e.c,Math.sin(t)*e.c,e.opacity)}Li(zt,Gc,qr(Sn,{brighter(e){return new zt(this.h,this.c,this.l+yr*(e??1),this.opacity)},darker(e){return new zt(this.h,this.c,this.l-yr*(e??1),this.opacity)},rgb(){return Xc(this).rgb()}}));const xs=e=>()=>e;function D0(e,t){return function(n){return e+n*t}}function V0(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(i){return Math.pow(e+i*t,n)}}function z0(e){return(e=+e)==1?Wn:function(t,n){return n-t?V0(t,n,e):xs(isNaN(t)?n:t)}}function Wn(e,t){var n=t-e;return n?D0(e,n):xs(isNaN(e)?t:e)}const xr=(function e(t){var n=z0(t);function i(r,o){var s=n((r=Io(r)).r,(o=Io(o)).r),a=n(r.g,o.g),l=n(r.b,o.b),c=Wn(r.opacity,o.opacity);return function(u){return r.r=s(u),r.g=a(u),r.b=l(u),r.opacity=c(u),r+""}}return i.gamma=e,i})(1);function B0(e,t){t||(t=[]);var n=e?Math.min(t.length,e.length):0,i=t.slice(),r;return function(o){for(r=0;r<n;++r)i[r]=e[r]*(1-o)+t[r]*o;return i}}function H0(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function q0(e,t){var n=t?t.length:0,i=e?Math.min(n,e.length):0,r=new Array(i),o=new Array(n),s;for(s=0;s<i;++s)r[s]=bs(e[s],t[s]);for(;s<n;++s)o[s]=t[s];return function(a){for(s=0;s<i;++s)o[s]=r[s](a);return o}}function G0(e,t){var n=new Date;return e=+e,t=+t,function(i){return n.setTime(e*(1-i)+t*i),n}}function yt(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}function X0(e,t){var n={},i={},r;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(r in t)r in e?n[r]=bs(e[r],t[r]):i[r]=t[r];return function(o){for(r in n)i[r]=n[r](o);return i}}var Ro=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ho=new RegExp(Ro.source,"g");function Y0(e){return function(){return e}}function K0(e){return function(t){return e(t)+""}}function Yc(e,t){var n=Ro.lastIndex=ho.lastIndex=0,i,r,o,s=-1,a=[],l=[];for(e=e+"",t=t+"";(i=Ro.exec(e))&&(r=ho.exec(t));)(o=r.index)>n&&(o=t.slice(n,o),a[s]?a[s]+=o:a[++s]=o),(i=i[0])===(r=r[0])?a[s]?a[s]+=r:a[++s]=r:(a[++s]=null,l.push({i:s,x:yt(i,r)})),n=ho.lastIndex;return n<t.length&&(o=t.slice(n),a[s]?a[s]+=o:a[++s]=o),a.length<2?l[0]?K0(l[0].x):Y0(t):(t=l.length,function(c){for(var u=0,h;u<t;++u)a[(h=l[u]).i]=h.x(c);return a.join("")})}function bs(e,t){var n=typeof t,i;return t==null||n==="boolean"?xs(t):(n==="number"?yt:n==="string"?(i=yn(t))?(t=i,xr):Yc:t instanceof yn?xr:t instanceof Date?G0:H0(t)?B0:Array.isArray(t)?q0:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?X0:yt)(e,t)}function U0(e,t){return e=+e,t=+t,function(n){return Math.round(e*(1-n)+t*n)}}var Ml=180/Math.PI,Fo={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Kc(e,t,n,i,r,o){var s,a,l;return(s=Math.sqrt(e*e+t*t))&&(e/=s,t/=s),(l=e*n+t*i)&&(n-=e*l,i-=t*l),(a=Math.sqrt(n*n+i*i))&&(n/=a,i/=a,l/=a),e*i<t*n&&(e=-e,t=-t,l=-l,s=-s),{translateX:r,translateY:o,rotate:Math.atan2(t,e)*Ml,skewX:Math.atan(l)*Ml,scaleX:s,scaleY:a}}var Fi;function J0(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Fo:Kc(t.a,t.b,t.c,t.d,t.e,t.f)}function Z0(e){return e==null||(Fi||(Fi=document.createElementNS("http://www.w3.org/2000/svg","g")),Fi.setAttribute("transform",e),!(e=Fi.transform.baseVal.consolidate()))?Fo:(e=e.matrix,Kc(e.a,e.b,e.c,e.d,e.e,e.f))}function Uc(e,t,n,i){function r(c){return c.length?c.pop()+" ":""}function o(c,u,h,f,d,x){if(c!==h||u!==f){var b=d.push("translate(",null,t,null,n);x.push({i:b-4,x:yt(c,h)},{i:b-2,x:yt(u,f)})}else(h||f)&&d.push("translate("+h+t+f+n)}function s(c,u,h,f){c!==u?(c-u>180?u+=360:u-c>180&&(c+=360),f.push({i:h.push(r(h)+"rotate(",null,i)-2,x:yt(c,u)})):u&&h.push(r(h)+"rotate("+u+i)}function a(c,u,h,f){c!==u?f.push({i:h.push(r(h)+"skewX(",null,i)-2,x:yt(c,u)}):u&&h.push(r(h)+"skewX("+u+i)}function l(c,u,h,f,d,x){if(c!==h||u!==f){var b=d.push(r(d)+"scale(",null,",",null,")");x.push({i:b-4,x:yt(c,h)},{i:b-2,x:yt(u,f)})}else(h!==1||f!==1)&&d.push(r(d)+"scale("+h+","+f+")")}return function(c,u){var h=[],f=[];return c=e(c),u=e(u),o(c.translateX,c.translateY,u.translateX,u.translateY,h,f),s(c.rotate,u.rotate,h,f),a(c.skewX,u.skewX,h,f),l(c.scaleX,c.scaleY,u.scaleX,u.scaleY,h,f),c=u=null,function(d){for(var x=-1,b=f.length,R;++x<b;)h[(R=f[x]).i]=R.x(d);return h.join("")}}}var Q0=Uc(J0,"px, ","px)","deg)"),em=Uc(Z0,", ",")",")");function jo(e,t){var n=Wn((e=Oo(e)).l,(t=Oo(t)).l),i=Wn(e.a,t.a),r=Wn(e.b,t.b),o=Wn(e.opacity,t.opacity);return function(s){return e.l=n(s),e.a=i(s),e.b=r(s),e.opacity=o(s),e+""}}var qn=0,ti=0,Zn=0,Jc=1e3,br,ni,wr=0,xn=0,Gr=0,wi=typeof performance=="object"&&performance.now?performance:Date,Zc=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function ws(){return xn||(Zc(tm),xn=wi.now()+Gr)}function tm(){xn=0}function vr(){this._call=this._time=this._next=null}vr.prototype=Qc.prototype={constructor:vr,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?ws():+n)+(t==null?0:+t),!this._next&&ni!==this&&(ni?ni._next=this:br=this,ni=this),this._call=e,this._time=n,Do()},stop:function(){this._call&&(this._call=null,this._time=1/0,Do())}};function Qc(e,t,n){var i=new vr;return i.restart(e,t,n),i}function nm(){ws(),++qn;for(var e=br,t;e;)(t=xn-e._time)>=0&&e._call.call(void 0,t),e=e._next;--qn}function Cl(){xn=(wr=wi.now())+Gr,qn=ti=0;try{nm()}finally{qn=0,rm(),xn=0}}function im(){var e=wi.now(),t=e-wr;t>Jc&&(Gr-=t,wr=e)}function rm(){for(var e,t=br,n,i=1/0;t;)t._call?(i>t._time&&(i=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:br=n);ni=e,Do(i)}function Do(e){if(!qn){ti&&(ti=clearTimeout(ti));var t=e-xn;t>24?(e<1/0&&(ti=setTimeout(Cl,e-wi.now()-Gr)),Zn&&(Zn=clearInterval(Zn))):(Zn||(wr=wi.now(),Zn=setInterval(im,Jc)),qn=1,Zc(Cl))}}function Wl(e,t,n){var i=new vr;return t=t==null?0:+t,i.restart(r=>{i.stop(),e(r+t)},t,n),i}var om=Pc("start","end","cancel","interrupt"),sm=[],eu=0,Nl=1,Vo=2,Zi=3,$l=4,zo=5,Qi=6;function Xr(e,t,n,i,r,o){var s=e.__transition;if(!s)e.__transition={};else if(n in s)return;lm(e,n,{name:t,index:i,group:r,on:om,tween:sm,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:eu})}function vs(e,t){var n=St(e,t);if(n.state>eu)throw new Error("too late; already scheduled");return n}function Nt(e,t){var n=St(e,t);if(n.state>Zi)throw new Error("too late; already running");return n}function St(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function lm(e,t,n){var i=e.__transition,r;i[t]=n,n.timer=Qc(o,0,n.time);function o(c){n.state=Nl,n.timer.restart(s,n.delay,n.time),n.delay<=c&&s(c-n.delay)}function s(c){var u,h,f,d;if(n.state!==Nl)return l();for(u in i)if(d=i[u],d.name===n.name){if(d.state===Zi)return Wl(s);d.state===$l?(d.state=Qi,d.timer.stop(),d.on.call("interrupt",e,e.__data__,d.index,d.group),delete i[u]):+u<t&&(d.state=Qi,d.timer.stop(),d.on.call("cancel",e,e.__data__,d.index,d.group),delete i[u])}if(Wl(function(){n.state===Zi&&(n.state=$l,n.timer.restart(a,n.delay,n.time),a(c))}),n.state=Vo,n.on.call("start",e,e.__data__,n.index,n.group),n.state===Vo){for(n.state=Zi,r=new Array(f=n.tween.length),u=0,h=-1;u<f;++u)(d=n.tween[u].value.call(e,e.__data__,n.index,n.group))&&(r[++h]=d);r.length=h+1}}function a(c){for(var u=c<n.duration?n.ease.call(null,c/n.duration):(n.timer.restart(l),n.state=zo,1),h=-1,f=r.length;++h<f;)r[h].call(e,u);n.state===zo&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){n.state=Qi,n.timer.stop(),delete i[t];for(var c in i)return;delete e.__transition}}function am(e,t){var n=e.__transition,i,r,o=!0,s;if(n){t=t==null?null:t+"";for(s in n){if((i=n[s]).name!==t){o=!1;continue}r=i.state>Vo&&i.state<zo,i.state=Qi,i.timer.stop(),i.on.call(r?"interrupt":"cancel",e,e.__data__,i.index,i.group),delete n[s]}o&&delete e.__transition}}function cm(e){return this.each(function(){am(this,e)})}function um(e,t){var n,i;return function(){var r=Nt(this,e),o=r.tween;if(o!==n){i=n=o;for(var s=0,a=i.length;s<a;++s)if(i[s].name===t){i=i.slice(),i.splice(s,1);break}}r.tween=i}}function hm(e,t,n){var i,r;if(typeof n!="function")throw new Error;return function(){var o=Nt(this,e),s=o.tween;if(s!==i){r=(i=s).slice();for(var a={name:t,value:n},l=0,c=r.length;l<c;++l)if(r[l].name===t){r[l]=a;break}l===c&&r.push(a)}o.tween=r}}function fm(e,t){var n=this._id;if(e+="",arguments.length<2){for(var i=St(this.node(),n).tween,r=0,o=i.length,s;r<o;++r)if((s=i[r]).name===e)return s.value;return null}return this.each((t==null?um:hm)(n,e,t))}function Ss(e,t,n){var i=e._id;return e.each(function(){var r=Nt(this,i);(r.value||(r.value={}))[t]=n.apply(this,arguments)}),function(r){return St(r,i).value[t]}}function tu(e,t){var n;return(typeof t=="number"?yt:t instanceof yn?xr:(n=yn(t))?(t=n,xr):Yc)(e,t)}function dm(e){return function(){this.removeAttribute(e)}}function mm(e){return function(){this.removeAttributeNS(e.space,e.local)}}function gm(e,t,n){var i,r=n+"",o;return function(){var s=this.getAttribute(e);return s===r?null:s===i?o:o=t(i=s,n)}}function pm(e,t,n){var i,r=n+"",o;return function(){var s=this.getAttributeNS(e.space,e.local);return s===r?null:s===i?o:o=t(i=s,n)}}function ym(e,t,n){var i,r,o;return function(){var s,a=n(this),l;return a==null?void this.removeAttribute(e):(s=this.getAttribute(e),l=a+"",s===l?null:s===i&&l===r?o:(r=l,o=t(i=s,a)))}}function xm(e,t,n){var i,r,o;return function(){var s,a=n(this),l;return a==null?void this.removeAttributeNS(e.space,e.local):(s=this.getAttributeNS(e.space,e.local),l=a+"",s===l?null:s===i&&l===r?o:(r=l,o=t(i=s,a)))}}function bm(e,t){var n=Hr(e),i=n==="transform"?em:tu;return this.attrTween(e,typeof t=="function"?(n.local?xm:ym)(n,i,Ss(this,"attr."+e,t)):t==null?(n.local?mm:dm)(n):(n.local?pm:gm)(n,i,t))}function wm(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function vm(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Sm(e,t){var n,i;function r(){var o=t.apply(this,arguments);return o!==i&&(n=(i=o)&&vm(e,o)),n}return r._value=t,r}function _m(e,t){var n,i;function r(){var o=t.apply(this,arguments);return o!==i&&(n=(i=o)&&wm(e,o)),n}return r._value=t,r}function km(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var i=Hr(e);return this.tween(n,(i.local?Sm:_m)(i,t))}function Tm(e,t){return function(){vs(this,e).delay=+t.apply(this,arguments)}}function Pm(e,t){return t=+t,function(){vs(this,e).delay=t}}function Am(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Tm:Pm)(t,e)):St(this.node(),t).delay}function Lm(e,t){return function(){Nt(this,e).duration=+t.apply(this,arguments)}}function Mm(e,t){return t=+t,function(){Nt(this,e).duration=t}}function Cm(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Lm:Mm)(t,e)):St(this.node(),t).duration}function Wm(e,t){if(typeof t!="function")throw new Error;return function(){Nt(this,e).ease=t}}function Nm(e){var t=this._id;return arguments.length?this.each(Wm(t,e)):St(this.node(),t).ease}function $m(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;Nt(this,e).ease=n}}function Em(e){if(typeof e!="function")throw new Error;return this.each($m(this._id,e))}function Im(e){typeof e!="function"&&(e=Mc(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o=t[r],s=o.length,a=i[r]=[],l,c=0;c<s;++c)(l=o[c])&&e.call(l,l.__data__,c,o)&&a.push(l);return new Xt(i,this._parents,this._name,this._id)}function Om(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,i=t.length,r=n.length,o=Math.min(i,r),s=new Array(i),a=0;a<o;++a)for(var l=t[a],c=n[a],u=l.length,h=s[a]=new Array(u),f,d=0;d<u;++d)(f=l[d]||c[d])&&(h[d]=f);for(;a<i;++a)s[a]=t[a];return new Xt(s,this._parents,this._name,this._id)}function Rm(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function Fm(e,t,n){var i,r,o=Rm(t)?vs:Nt;return function(){var s=o(this,e),a=s.on;a!==i&&(r=(i=a).copy()).on(t,n),s.on=r}}function jm(e,t){var n=this._id;return arguments.length<2?St(this.node(),n).on.on(e):this.each(Fm(n,e,t))}function Dm(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function Vm(){return this.on("end.remove",Dm(this._id))}function zm(e){var t=this._name,n=this._id;typeof e!="function"&&(e=ps(e));for(var i=this._groups,r=i.length,o=new Array(r),s=0;s<r;++s)for(var a=i[s],l=a.length,c=o[s]=new Array(l),u,h,f=0;f<l;++f)(u=a[f])&&(h=e.call(u,u.__data__,f,a))&&("__data__"in u&&(h.__data__=u.__data__),c[f]=h,Xr(c[f],t,n,f,c,St(u,n)));return new Xt(o,this._parents,t,n)}function Bm(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Lc(e));for(var i=this._groups,r=i.length,o=[],s=[],a=0;a<r;++a)for(var l=i[a],c=l.length,u,h=0;h<c;++h)if(u=l[h]){for(var f=e.call(u,u.__data__,h,l),d,x=St(u,n),b=0,R=f.length;b<R;++b)(d=f[b])&&Xr(d,t,n,b,f,x);o.push(f),s.push(u)}return new Xt(o,s,t,n)}var Hm=Ai.prototype.constructor;function qm(){return new Hm(this._groups,this._parents)}function Gm(e,t){var n,i,r;return function(){var o=Hn(this,e),s=(this.style.removeProperty(e),Hn(this,e));return o===s?null:o===n&&s===i?r:r=t(n=o,i=s)}}function nu(e){return function(){this.style.removeProperty(e)}}function Xm(e,t,n){var i,r=n+"",o;return function(){var s=Hn(this,e);return s===r?null:s===i?o:o=t(i=s,n)}}function Ym(e,t,n){var i,r,o;return function(){var s=Hn(this,e),a=n(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(e),Hn(this,e))),s===l?null:s===i&&l===r?o:(r=l,o=t(i=s,a))}}function Km(e,t){var n,i,r,o="style."+t,s="end."+o,a;return function(){var l=Nt(this,e),c=l.on,u=l.value[o]==null?a||(a=nu(t)):void 0;(c!==n||r!==u)&&(i=(n=c).copy()).on(s,r=u),l.on=i}}function Um(e,t,n){var i=(e+="")=="transform"?Q0:tu;return t==null?this.styleTween(e,Gm(e,i)).on("end.style."+e,nu(e)):typeof t=="function"?this.styleTween(e,Ym(e,i,Ss(this,"style."+e,t))).each(Km(this._id,e)):this.styleTween(e,Xm(e,i,t),n).on("end.style."+e,null)}function Jm(e,t,n){return function(i){this.style.setProperty(e,t.call(this,i),n)}}function Zm(e,t,n){var i,r;function o(){var s=t.apply(this,arguments);return s!==r&&(i=(r=s)&&Jm(e,s,n)),i}return o._value=t,o}function Qm(e,t,n){var i="style."+(e+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;return this.tween(i,Zm(e,t,n??""))}function e2(e){return function(){this.textContent=e}}function t2(e){return function(){var t=e(this);this.textContent=t??""}}function n2(e){return this.tween("text",typeof e=="function"?t2(Ss(this,"text",e)):e2(e==null?"":e+""))}function i2(e){return function(t){this.textContent=e.call(this,t)}}function r2(e){var t,n;function i(){var r=e.apply(this,arguments);return r!==n&&(t=(n=r)&&i2(r)),t}return i._value=e,i}function o2(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,r2(e))}function s2(){for(var e=this._name,t=this._id,n=iu(),i=this._groups,r=i.length,o=0;o<r;++o)for(var s=i[o],a=s.length,l,c=0;c<a;++c)if(l=s[c]){var u=St(l,t);Xr(l,e,n,c,s,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Xt(i,this._parents,e,n)}function l2(){var e,t,n=this,i=n._id,r=n.size();return new Promise(function(o,s){var a={value:s},l={value:function(){--r===0&&o()}};n.each(function(){var c=Nt(this,i),u=c.on;u!==e&&(t=(e=u).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(l)),c.on=t}),r===0&&o()})}var a2=0;function Xt(e,t,n,i){this._groups=e,this._parents=t,this._name=n,this._id=i}function iu(){return++a2}var Ot=Ai.prototype;Xt.prototype={constructor:Xt,select:zm,selectAll:Bm,selectChild:Ot.selectChild,selectChildren:Ot.selectChildren,filter:Im,merge:Om,selection:qm,transition:s2,call:Ot.call,nodes:Ot.nodes,node:Ot.node,size:Ot.size,empty:Ot.empty,each:Ot.each,on:jm,attr:bm,attrTween:km,style:Um,styleTween:Qm,text:n2,textTween:o2,remove:Vm,tween:fm,delay:Am,duration:Cm,ease:Nm,easeVarying:Em,end:l2,[Symbol.iterator]:Ot[Symbol.iterator]};function c2(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var u2={time:null,delay:0,duration:250,ease:c2};function h2(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function f2(e){var t,n;e instanceof Xt?(t=e._id,e=e._name):(t=iu(),(n=u2).time=ws(),e=e==null?null:e+"");for(var i=this._groups,r=i.length,o=0;o<r;++o)for(var s=i[o],a=s.length,l,c=0;c<a;++c)(l=s[c])&&Xr(l,e,t,c,s,n||h2(l,t));return new Xt(i,this._parents,e,t)}Ai.prototype.interrupt=cm;Ai.prototype.transition=f2;function d2(e){return Math.abs(e=Math.round(e))>=1e21?e.toLocaleString("en").replace(/,/g,""):e.toString(10)}function Sr(e,t){if((n=(e=t?e.toExponential(t-1):e.toExponential()).indexOf("e"))<0)return null;var n,i=e.slice(0,n);return[i.length>1?i[0]+i.slice(2):i,+e.slice(n+1)]}function Gn(e){return e=Sr(Math.abs(e)),e?e[1]:NaN}function m2(e,t){return function(n,i){for(var r=n.length,o=[],s=0,a=e[0],l=0;r>0&&a>0&&(l+a+1>i&&(a=Math.max(1,i-l)),o.push(n.substring(r-=a,r+a)),!((l+=a+1)>i));)a=e[s=(s+1)%e.length];return o.reverse().join(t)}}function g2(e){return function(t){return t.replace(/[0-9]/g,function(n){return e[+n]})}}var p2=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function _r(e){if(!(t=p2.exec(e)))throw new Error("invalid format: "+e);var t;return new _s({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}_r.prototype=_s.prototype;function _s(e){this.fill=e.fill===void 0?" ":e.fill+"",this.align=e.align===void 0?">":e.align+"",this.sign=e.sign===void 0?"-":e.sign+"",this.symbol=e.symbol===void 0?"":e.symbol+"",this.zero=!!e.zero,this.width=e.width===void 0?void 0:+e.width,this.comma=!!e.comma,this.precision=e.precision===void 0?void 0:+e.precision,this.trim=!!e.trim,this.type=e.type===void 0?"":e.type+""}_s.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function y2(e){e:for(var t=e.length,n=1,i=-1,r;n<t;++n)switch(e[n]){case".":i=r=n;break;case"0":i===0&&(i=n),r=n;break;default:if(!+e[n])break e;i>0&&(i=0);break}return i>0?e.slice(0,i)+e.slice(r+1):e}var ru;function x2(e,t){var n=Sr(e,t);if(!n)return e+"";var i=n[0],r=n[1],o=r-(ru=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,s=i.length;return o===s?i:o>s?i+new Array(o-s+1).join("0"):o>0?i.slice(0,o)+"."+i.slice(o):"0."+new Array(1-o).join("0")+Sr(e,Math.max(0,t+o-1))[0]}function El(e,t){var n=Sr(e,t);if(!n)return e+"";var i=n[0],r=n[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}const Il={"%":(e,t)=>(e*100).toFixed(t),b:e=>Math.round(e).toString(2),c:e=>e+"",d:d2,e:(e,t)=>e.toExponential(t),f:(e,t)=>e.toFixed(t),g:(e,t)=>e.toPrecision(t),o:e=>Math.round(e).toString(8),p:(e,t)=>El(e*100,t),r:El,s:x2,X:e=>Math.round(e).toString(16).toUpperCase(),x:e=>Math.round(e).toString(16)};function Ol(e){return e}var Rl=Array.prototype.map,Fl=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function b2(e){var t=e.grouping===void 0||e.thousands===void 0?Ol:m2(Rl.call(e.grouping,Number),e.thousands+""),n=e.currency===void 0?"":e.currency[0]+"",i=e.currency===void 0?"":e.currency[1]+"",r=e.decimal===void 0?".":e.decimal+"",o=e.numerals===void 0?Ol:g2(Rl.call(e.numerals,String)),s=e.percent===void 0?"%":e.percent+"",a=e.minus===void 0?"−":e.minus+"",l=e.nan===void 0?"NaN":e.nan+"";function c(h){h=_r(h);var f=h.fill,d=h.align,x=h.sign,b=h.symbol,R=h.zero,F=h.width,E=h.comma,M=h.precision,C=h.trim,m=h.type;m==="n"?(E=!0,m="g"):Il[m]||(M===void 0&&(M=12),C=!0,m="g"),(R||f==="0"&&d==="=")&&(R=!0,f="0",d="=");var _=b==="$"?n:b==="#"&&/[boxX]/.test(m)?"0"+m.toLowerCase():"",w=b==="$"?i:/[%p]/.test(m)?s:"",k=Il[m],L=/[defgprs%]/.test(m);M=M===void 0?6:/[gprs]/.test(m)?Math.max(1,Math.min(21,M)):Math.max(0,Math.min(20,M));function X(B){var te=_,U=w,me,Y,K;if(m==="c")U=k(B)+U,B="";else{B=+B;var S=B<0||1/B<0;if(B=isNaN(B)?l:k(Math.abs(B),M),C&&(B=y2(B)),S&&+B==0&&x!=="+"&&(S=!1),te=(S?x==="("?x:a:x==="-"||x==="("?"":x)+te,U=(m==="s"?Fl[8+ru/3]:"")+U+(S&&x==="("?")":""),L){for(me=-1,Y=B.length;++me<Y;)if(K=B.charCodeAt(me),48>K||K>57){U=(K===46?r+B.slice(me+1):B.slice(me))+U,B=B.slice(0,me);break}}}E&&!R&&(B=t(B,1/0));var A=te.length+B.length+U.length,O=A<F?new Array(F-A+1).join(f):"";switch(E&&R&&(B=t(O+B,O.length?F-U.length:1/0),O=""),d){case"<":B=te+B+U+O;break;case"=":B=te+O+B+U;break;case"^":B=O.slice(0,A=O.length>>1)+te+B+U+O.slice(A);break;default:B=O+te+B+U;break}return o(B)}return X.toString=function(){return h+""},X}function u(h,f){var d=c((h=_r(h),h.type="f",h)),x=Math.max(-8,Math.min(8,Math.floor(Gn(f)/3)))*3,b=Math.pow(10,-x),R=Fl[8+x/3];return function(F){return d(b*F)+R}}return{format:c,formatPrefix:u}}var ji,ou,su;w2({thousands:",",grouping:[3],currency:["$",""]});function w2(e){return ji=b2(e),ou=ji.format,su=ji.formatPrefix,ji}function v2(e){return Math.max(0,-Gn(Math.abs(e)))}function S2(e,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(Gn(t)/3)))*3-Gn(Math.abs(e)))}function _2(e,t){return e=Math.abs(e),t=Math.abs(t)-e,Math.max(0,Gn(t)-Gn(e))+1}function k2(e,t){switch(arguments.length){case 0:break;case 1:this.range(e);break;default:this.range(t).domain(e);break}return this}function T2(e){return function(){return e}}function P2(e){return+e}var jl=[0,1];function Nn(e){return e}function Bo(e,t){return(t-=e=+e)?function(n){return(n-e)/t}:T2(isNaN(t)?NaN:.5)}function A2(e,t){var n;return e>t&&(n=e,e=t,t=n),function(i){return Math.max(e,Math.min(t,i))}}function L2(e,t,n){var i=e[0],r=e[1],o=t[0],s=t[1];return r<i?(i=Bo(r,i),o=n(s,o)):(i=Bo(i,r),o=n(o,s)),function(a){return o(i(a))}}function M2(e,t,n){var i=Math.min(e.length,t.length)-1,r=new Array(i),o=new Array(i),s=-1;for(e[i]<e[0]&&(e=e.slice().reverse(),t=t.slice().reverse());++s<i;)r[s]=Bo(e[s],e[s+1]),o[s]=n(t[s],t[s+1]);return function(a){var l=R1(e,a,1,i)-1;return o[l](r[l](a))}}function C2(e,t){return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown())}function W2(){var e=jl,t=jl,n=bs,i,r,o,s=Nn,a,l,c;function u(){var f=Math.min(e.length,t.length);return s!==Nn&&(s=A2(e[0],e[f-1])),a=f>2?M2:L2,l=c=null,h}function h(f){return f==null||isNaN(f=+f)?o:(l||(l=a(e.map(i),t,n)))(i(s(f)))}return h.invert=function(f){return s(r((c||(c=a(t,e.map(i),yt)))(f)))},h.domain=function(f){return arguments.length?(e=Array.from(f,P2),u()):e.slice()},h.range=function(f){return arguments.length?(t=Array.from(f),u()):t.slice()},h.rangeRound=function(f){return t=Array.from(f),n=U0,u()},h.clamp=function(f){return arguments.length?(s=f?!0:Nn,u()):s!==Nn},h.interpolate=function(f){return arguments.length?(n=f,u()):n},h.unknown=function(f){return arguments.length?(o=f,h):o},function(f,d){return i=f,r=d,u()}}function N2(){return W2()(Nn,Nn)}function $2(e,t,n,i){var r=z1(e,t,n),o;switch(i=_r(i??",f"),i.type){case"s":{var s=Math.max(Math.abs(e),Math.abs(t));return i.precision==null&&!isNaN(o=S2(r,s))&&(i.precision=o),su(i,s)}case"":case"e":case"g":case"p":case"r":{i.precision==null&&!isNaN(o=_2(r,Math.max(Math.abs(e),Math.abs(t))))&&(i.precision=o-(i.type==="e"));break}case"f":case"%":{i.precision==null&&!isNaN(o=v2(r))&&(i.precision=o-(i.type==="%")*2);break}}return ou(i)}function E2(e){var t=e.domain;return e.ticks=function(n){var i=t();return V1(i[0],i[i.length-1],n??10)},e.tickFormat=function(n,i){var r=t();return $2(r[0],r[r.length-1],n??10,i)},e.nice=function(n){n==null&&(n=10);var i=t(),r=0,o=i.length-1,s=i[r],a=i[o],l,c,u=10;for(a<s&&(c=s,s=a,a=c,c=r,r=o,o=c);u-- >0;){if(c=$o(s,a,n),c===l)return i[r]=s,i[o]=a,t(i);if(c>0)s=Math.floor(s/c)*c,a=Math.ceil(a/c)*c;else if(c<0)s=Math.ceil(s*c)/c,a=Math.floor(a*c)/c;else break;l=c}return e},e}function lu(){var e=N2();return e.copy=function(){return C2(e,lu())},k2.apply(e,arguments),E2(e)}function ii(e,t,n){this.k=e,this.x=t,this.y=n}ii.prototype={constructor:ii,scale:function(e){return e===1?this:new ii(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new ii(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};ii.prototype;function kr({h:e=[15,375],c:t=100,l:n=65,h_start:i=0,direction:r=1,na_value:o="#7f7f7f",title:s}={}){return Object.assign(function(l){let c=l.extent[1]-l.extent[0];return l.map(u=>isNaN(u)?o:Gc(e[0]+i+(e[1]-e[0])*+u/c*r,t,n).toString())},{title:s})}function I2({values:e,na_value:t="#7f7f7f",title:n}={}){let i;return Array.isArray(e)?i=function(r){return r.map(o=>e[+o]??t)}:i=function(r){return r.map(o=>e[o]??t)},Object.assign(i,{title:n})}function Tr({low:e="#132B43",high:t="#56B1F7",limits:n=[null,null],na_value:i="#7f7f7f",title:r}={}){return Object.assign(function(s){let a=s.extent,l=jo(e,t);return s.map(c=>{if(isNaN(c))return i;let u=n[0]??a[0],h=n[1]??a[1];return u===h?l(.5):c>h?t:c<u?e:l((c-u)/(h-u))})},{title:r})}function O2({low:e="#832424",mid:t="white",high:n="#3A3A98",midpoint:i=0,limits:r=[null,null],na_value:o="#7f7f7f",title:s}={}){return Object.assign(function(l){let c=l.extent;return l.map(u=>{if(isNaN(u))return o;let h=r[0]??c[0],f=r[1]??c[1],d=i??(h+f)/2;return u<d?jo(e,t)((u-h)/(d-h)):jo(t,n)((u-d)/(f-d))})},{title:s})}function R2({colors:e=[],breaks:t,limits:n=[null,null],na_value:i="#7f7f7f",title:r}={}){return Object.assign(function(s){let a=s.extent;return s.map(l=>{if(isNaN(l))return i;let c=n[0]??a[0],u=n[1]??a[1],h=t||Array(e.length).fill(0).map((f,d)=>c+(u-c)*d/(e.length-1));return lu(h,e)(l)})},{title:r})}function Dl({title:e}={}){let t=kr(),n=Tr();return Object.assign(function(r){return r.level!=null?t(r):n(r)},{title:e})}function F2({discrete:e,continuous:t}={}){e==null&&(e=kr()),t==null&&(t=Tr());let n=function(r){return r.level!=null?e(r):t(r)},i=e.title??t.title;return Object.assign(n,{title:i})}const fo={identity:Ho,discrete:kr,hue:kr,manual:I2,continuous:Tr,gradient:Tr,gradient2:O2,gradientn:R2,dynamic:F2,auto:Dl,default:Dl};function mo({title:e}={}){return Object.assign(function(t){return t},{asis:!0,title:e})}function Vl({title:e}={}){return Object.assign(function(t){return t.map(n=>+n)},{title:e})}function Ho({title:e}={}){return Object.assign(function(t){return t.map(n=>String(n??""))},{title:e})}function zl({values:e,na_value:t=null,title:n}={}){let i;return Array.isArray(e)?i=function(r){return r.map(o=>e[+o]??t)}:i=function(r){return r.map(o=>e[o]??t)},Object.assign(i,{title:n})}function Pn({limits:e=[null,null],range:t=[0,1],na_value:n=null,null_value:i=null,title:r}={}){return Object.assign(function(s){let a=s.extent;return s.map(l=>{if(l===null)return i;if(isNaN(l))return n;let c=e[0]??a[0],u=e[1]??a[1];return(l-c)/(u-c)*(t[1]-t[0])+t[0]})},{title:r})}function Bl({title:e}={}){let t=["solid","22","42","44","13","1343","73","2262","12223242","F282","F4448444","224282F2","F1"];return Object.assign(function(i){return i.map(r=>t[+r])},{title:e})}const fn={color:fo,stroke:fo,fill:fo,alpha:{continuous:Pn,default:()=>Pn({range:[.1,1]})},size:{identity:Vl,continuous:Pn,default:()=>Pn({range:[1,6]})},linewidth:{identity:Vl,continuous:Pn,manual:zl,default:()=>Pn({range:[1,6]})},linetype:{identity:Ho,discrete:Bl,default:Bl},label:{default:mo},group:{default:mo},points:{default:mo},transform:{manual:zl,default:Ho},custom(e,{title:t}={}){return Object.assign(function(n){return n.map(e)},{title:t})}};function j2(e,t){return typeof e!="number"||typeof t!="number"?e.toString().localeCompare(t.toString()):e>t?1:e<t?-1:0}function D2(e,t){return typeof e!="number"||typeof t!="number"?e.toString().localeCompare(t.toString(),void 0,{numeric:!0}):e>t?1:e<t?-1:0}function V2(e,t){return e==null?{}:Object.fromEntries(Object.entries(e).map(([n,i])=>[n,t(n,i)]))}class z2{constructor(t,n,i){this.label=t,this.value=n,this.level=i}toString(){return this.label}valueOf(){return this.value}}class er{static from(t){if(t instanceof this)return t;if(t instanceof Set&&(t=Array.from(t)),Array.isArray(t)){let n=Array.from(new Set(t.map(i=>i.toString()))).sort(D2);return new this(n)}else if(typeof t=="object"){let n=Object.keys(t).map(i=>i.toString()).sort((i,r)=>j2(t[i],t[r]));return new this(n)}throw new Error(`Invalid level values: ${t}`)}constructor(t){if(t instanceof this.constructor)return t;if(t instanceof Set&&(t=Array.from(t)),!Array.isArray(t))throw new Error("level must be an array");let n=t.map(i=>i.toString()).map((i,r)=>new z2(i,r,this));this.level=n,this.mapping=Object.fromEntries(n.map(i=>[i,i])),this.length=n.length}[Symbol.iterator](){return this.level[Symbol.iterator]()}getItem(t){return typeof t=="number"||t instanceof Number?this.level[t]:this.mapping[t]}apply(t){let n=t.map(i=>this.mapping[i]);return n.level=this,n}}class B2{constructor(t,n){let{data:i=[],aes:r}=n,{geom:o,stat:s,data:a,aes:l,levels:c={},scales:u={},attrs:h,args:f,vBind:d}=t;if(!nn[o]){console.error(`Invalid geom "${o}"`,"in layer",t,", plot",n);return}let x=typeof s=="function"?s:N1[s];if(x==null){console.error(`Invalid stat "${s}"`,"in layer",t,", plot",n);return}this.geom=o,this.vBind=d,this.scales={},typeof a=="function"&&(a=a(i)),a==null&&(a=i),l={...r,...l};let b={},R={};for(const M in l)R[M]=String(l[M]),b[M]=a.map(l[M]);b.$raw=a;let F=x?.coord_attrs??["x","y","xnudge","ynudge"],E=a.length;E==0&&(E=F.map(M=>h[M]).filter(M=>M!=null).reduce((M,C)=>Math.max(Array.isArray(C)?C.length:1,M),0));for(const M in h)if(F.includes(M))if(Array.isArray(h[M])){if(h[M].length!=E)throw new Error(`Attribute "${M}" must have the same length as data (${E})`);b[M]=h[M]}else{if(h[M]==null)continue;b[M]=new Array(E).fill(h[M])}try{if(b=x(b,f||{}),b.$group=b.$group??b.group,b.$group==null){let M=Object.values(b)?.[0]?.length??0;b.$group=new Array(M).fill(null)}}catch(M){console.error("Error",M,"in layer",t,", plot",n);return}this.localScales=new Set([...Object.keys(c).filter(M=>c[M]!=null),...Object.keys(u).filter(M=>u[M]!=null)]),this.aes=new Set([...this.localScales,...nn[o]?.attrs??[]]),this.$data=b,this.data={...b};for(const M in b)if(u[M]!=null||nn[o]?.attrs?.includes?.(M)){let C=new Yr(u[M]??fn[M].default());C.aesthetics=M,C.title===void 0&&(C.title=R[M]);let m=this.$data[M];if(!m?.length)continue;c?.[M]!=null?C.level=c[M]:m.some(_=>typeof _=="string")?C.level=er.from(m):C.extent=fr.extent(m),this.applyScale(M,C)}for(const M in h)if(!F.includes(M))if(!Array.isArray(h[M]))h[M]!=null&&(this.data[M]=new Array(E).fill(h[M]));else{if(h[M].length!=E)throw new Error(`Attribute "${M}" must have the same length as data (${E})`);this.data[M]=h[M]}}applyScale(t,n){let i=this.$data[t];i!=null&&(n.level!=null&&(i=n.level.apply(i)),i.extent=n.extent,this.data[t]=n(i),this.scales[t]=n)}applyCoordScale(t){try{Object.assign(this.data,nn[this.geom]?.coord_scale?.(this.$data,t))}catch(n){console.error(n)}}}class H2{constructor(t,n){this.levels={},this.extents={},this.layers=[],this.coordScales={};for(let i in n)this.layers.push(new B2(n[i],t));this.layers=this.layers.filter(i=>i.$data!=null),this.aes=new Set(this.layers.flatMap(i=>Array.from(i.aes))),this.scales=new Map}useScales(t,n){this.scales=new Map;for(const i of this.aes){let r=this.layers.filter(o=>!o.localScales.has(i)).flatMap(o=>o.$data[i]??[]);if(r.length!=0){let o=new Yr(t?.[i]??fn[i].default());o.aesthetics=i,n?.[i]!=null?o.level=n[i]:r.some(s=>typeof s=="string")?o.level=er.from(r):o.asis||(o.extent=fr.extent(r));for(const s of this.layers)s.localScales.has(i)||s.applyScale(i,o)}for(const o of this.layers){let s=o.scales?.[i];s!=null&&(s.asis||(this.scales.has(s)||this.scales.set(s,new Set),this.scales.get(s).add(o.geom)))}}return this}useCoordLevels(t={}){for(const n of["x","y"])if(t[n])this.levels[n]=new er(t[n]);else{let i=this.layers.flatMap(r=>(nn[r.geom].get_values??nn[r.geom].get_range)?.(r.$data,n));i.some(r=>typeof r=="string")?this.levels[n]=er.from(i):(i=this.layers.flatMap(r=>nn[r.geom].get_range?.(r.$data,n)).filter(r=>!isNaN(r)),this.extents[n]=fr.extent(i))}for(const n of this.layers)n.applyCoordScale(this.levels);return this}getComputedLayers(){return this.layers.map(t=>({data:Object.values(Object.groupBy(t.data.$group.map((i,r)=>nn[t.geom].validate(V2(t.data,(o,s)=>s?.[r]))).filter(i=>i!=null),i=>i.$group)),geom:t.geom,vBind:t.vBind}))}getCoordScales(t,n,i){let r={};if(this._range=t,this.levels.x){let o=+(t?.xmin??-.5)-(n.x?.min??0),s=+(t?.xmax??this.levels.x.length-.5)+(n.x?.max??0);r.x=new vi(this.levels.x,{min:o,max:s})}else{let o=(t?.xmin??this.extents.x?.min??0)-(n.x?.min??0),s=(t?.xmax??this.extents.x?.max??0)+(n.x?.max??0),a=i?.x??1;s-o<a&&(t?.xmax==null&&t?.xmin!=null?s=o+a:(t?.xmax!=null&&t?.xmin==null||(s=(s+o)/2+a/2),o=s-a)),r.x=new Si({min:o,max:s})}if(this.levels.y){let o=+(t?.ymin??-.5)-(n.y?.min??0),s=+(t?.ymax??this.levels.y.length-.5)+(n.y?.max??0);r.y=new vi(this.levels.y,{min:o,max:s})}else{let o=(t?.ymin??this.extents.y?.min??0)-(n.y?.min??0),s=(t?.ymax??this.extents.y?.max??0)+(n.y?.max??0),a=i?.y??1;s-o<a&&(t?.ymax==null&&t?.ymin!=null?s=o+a:(t?.ymax!=null&&t?.ymin==null||(s=(s+o)/2+a/2),o=s-a)),r.y=new Si({min:o,max:s})}return r}getAxes(t,n,i={left:!0,bottom:!0}){t={x:t.x.expand(n?.x),y:t.y.expand(n?.y)};let r={x:{},y:{}};return i.left&&(r.y.left=new Di(i.left,t.y)),i.bottom&&(r.x.bottom=new Di(i.bottom,t.x)),i.right&&(r.y.right=new Di(i.right,t.y)),i.top&&(r.x.top=new Di(i.top,t.x)),r}render(t,n,i,r={left:!0,bottom:!0},o){let s=this.getCoordScales(t,n,o);return{layers:this.getComputedLayers(),axes:this.getAxes(s,i,r),coordScales:s,scales:this.scales}}}class Yr extends Function{constructor(t){let n=Object.assign(t.bind(),t);return Object.setPrototypeOf(n,Yr.prototype),n}set extent(t){this._extent=t}get extent(){if(this.level)return{0:0,1:this.level.length,length:2,min:0,max:this.level.length};if(this._extent)return this._extent}}class vi extends Function{constructor(t,{min:n,max:i}={}){const r=n==i?o=>0:o=>(+o-n)/(i-n);return r.range={min:n,max:i},r.level=t,r.invert=o=>o*(i-n)+n,r.padding={min:0,max:0},Object.setPrototypeOf(r,vi.prototype),r}expand({min:t=0,max:n=0}={}){let i=0,r=this.level.length,o=r,s=i-t*o,a=r+n*o;const l=s==a?u=>0:u=>(+u-s)/(a-s);l.invert=u=>h=>h*(a-s)+s,l.range=this.range,l.level=this.level,l.title=this.title;let c=a-s;return l.padding={min:c==0?0:(i-s)/c,max:c==0?0:(a-r)/c},Object.setPrototypeOf(l,vi.prototype),l}}class Si extends Function{constructor(t){let n=+t.min,i=+t.max;const r=n==i?o=>.5:o=>(+o-n)/(i-n);return r.range={min:n,max:i},r.limits={min:n,max:i},r.invert=o=>o*(i-n)+n,r.padding={min:0,max:0},Object.setPrototypeOf(r,Si.prototype),r}expand({min:t=0,max:n=0}={}){let{min:i,max:r}=this.limits,o=r-i,s=i-t*o,a=r+n*o,l=a-s;const c=s==a?u=>.5:u=>(+u-s)/(a-s);return c.invert=u=>u*(a-s)+s,c.range=this.range,c.level=this.level,c.title=this.title,c.limits={min:s,max:a},c.padding={min:l==0?0:(i-s)/l,max:l==0?0:(a-r)/l},Object.setPrototypeOf(c,Si.prototype),c}}function q2({min:e,max:t}={}){let n=t-e;if(!(n>0))return[];let i=10**Math.floor(Math.log10(n)-1),r=(n>50*i?20:n>25*i?10:5)*i,o=Math.ceil((e-n)/r),s=Math.floor((t+n)/r);return new Array(s-o+1).fill(null).map((a,l)=>(o+l)*r)}function G2({min:e,max:t}={}){let n=t-e;if(!(n>0))return[];let i=10**Math.floor(Math.log10(n)-1),r=(n>50*i?10:n>25*i?5:2.5)*i,o=Math.ceil((e-n)/r),s=Math.floor((t+n)/r);return new Array(s-o+1).fill(null).map((a,l)=>(o+l)*r)}class Di{constructor(t={},n){if(Object.assign(this,(({breaks:i,labels:r,minorBreaks:o,showGrid:s,...a})=>a)(t)),n.level){let i=n.level.level.sort((s,a)=>s-a),r=i.map(s=>+s),o;if(typeof t.labels=="function")o=i.map(t.labels);else if(Array.isArray(t.labels)){if(t.labels.length!=r.length)throw new Error("Length of labels must be the same as breaks");o=t.labels}else o=i.map(s=>s.toString());this.ticks=r.map((s,a)=>({position:s,label:o[a]})),this.majorBreaks=t.showGrid?r:[],this.minorBreaks=[]}else{let i=t.breaks??q2(n.limits),r=t.minorBreaks??G2(n.limits),o;if(typeof t.labels=="function")o=i.map(t.labels);else if(Array.isArray(t.labels)){if(t.labels.length!=i.length)throw new Error("Length of labels must be the same as breaks");o=t.labels}else if(Array.isArray(i)&&i.length>2){i=Array.from(i).sort((l,c)=>l-c);let s=i.slice(1).map((l,c)=>l-i[c]).reduce((l,c)=>l<c?l:c),a=Math.round(-Math.log10(s))+1;a<0&&(a=0),a>20&&(a=20),o=i.map(l=>+l.toFixed(a))}else Array.isArray(i)||(i=[]),o=i;this.ticks=i.map((s,a)=>({position:s,label:o[a]})).sort((s,a)=>s.position-a.position),this.majorBreaks=t.showGrid?i.sort():[],this.minorBreaks=t.showGrid?r.sort():[]}}}const X2=["x2"],Y2={key:0,class:"gb-interactive",fill:"transparent"},K2=["width"],U2={key:1,class:"gb-interactive",fill:"transparent"},J2=["x"],Z2={__name:"CoreAxisX",props:Wt({ticks:{type:Array,default:()=>[]},title:String,coord2pos:Function,pos2coord:Function,layout:Object,theme:{type:Object,default:()=>({})},action:{type:Object,default:()=>({})}},{translate:{type:Number,default:0},translateModifiers:{},transcale:{},transcaleModifiers:{}}),emits:Wt(["move","zoom","rescale","nudge"],["update:translate","update:transcale"]),setup(e,{emit:t}){const n=ie(()=>e.layout.width+e.layout.l+e.layout.r),i=ze(e,"translate"),r=ze(e,"transcale"),o=ie(()=>{let m=e.theme.ticks_position=="top";return{x:n.value/2,y:(m?-1:1)*(e.theme.title_offset??0),"text-anchor":"middle","alignment-baseline":m?"baseline":"hanging","font-size":e.theme.title_size,color:e.theme.title_color??"black",transform:e.theme.title_angle?`rotate(${e.theme.title_angle})`:""}}),s=ie(()=>({stroke:e.theme.line_color??"black","stroke-width":e.theme.line_width,"stroke-dasharray":e.theme.line_dasharray,style:e.theme.line_style})),a=ie(()=>{let m=[];for(let _ of e.ticks){typeof _=="number"&&(_={position:_});let w=e.coord2pos({x:_.position}).x+e.layout.l+i.value;if(r.value?.ratio!=null&&(w=w*r.value.ratio+(1-r.value.ratio)*(r.value.origin??.5)*n.value),w<0||w>n.value)continue;let k=(e.theme.ticks_position=="top"?-1:1)*(_.length??e.theme.ticks_length);m.push({bind:{y1:0,y2:k,x1:w,x2:w,stroke:_.color??e.theme.ticks_color??"black","stroke-width":_.width??e.theme.ticks_width}})}return m}),l=ie(()=>{let m=e.theme.ticks_position=="top",_=[];for(let w of e.ticks){typeof w=="number"&&(w={position:w,label:w});let k=e.coord2pos({x:w.position}).x+e.layout.l+i.value;if(r.value?.ratio!=null&&(k=k*r.value.ratio+(1-r.value.ratio)*(r.value.origin??.5)*n.value),k<0||k>n.value)continue;let L=(m?-1:1)*((w.length??e.theme.ticks_length)+3);_.push({bind:{y:L,x:k,"text-anchor":"middle","alignment-baseline":m?"baseline":"hanging","font-size":w.size??e.theme.label_size,color:w.color??e.theme.label_color??"black"},text:w.label})}return _});function c(m,_,w){return m<_?_:m>w?w:m}const u=st("i");function h(m){let _=u.value.getBoundingClientRect();return{x:m.pageX-_.left-e.layout.left,l:m.pageX-_.left-e.layout.left,r:_.left+e.layout.left+e.layout.width-m.pageX}}const f=t;function d(m){let _=e.action.find(X=>X.action=="move");if(!_)return;m.preventDefault(),m.stopPropagation(),m.target.style.cursor="grabbing";let w=e.coord2pos(_,{unlimited:!0}),k=w.xmin==null?1/0:-w.xmin,L=w.xmax==null?-1/0:e.layout.width-w.xmax;m.target.setPointerCapture(m.pointerId),m.target.onpointermove=X=>{i.value=c(i.value+X.movementX,L,k)},m.target.onpointerup=X=>{m.target.onpointermove=null,m.target.onpointerup=null,m.target.style.cursor=null,C(_,X)}}function x(m){let _=e.action.find(K=>K.action=="rescale");if(!_)return;m.preventDefault(),m.stopPropagation();let{xmin:w,xmax:k,"min-range-x":L=0}=_,{xmin:X,xmax:B}=e.pos2coord({xmin:e.layout.left,xmax:e.layout.left+e.layout.width}),{x:te}=h(m),U=e.layout.width/(e.layout.width-(e.coord2pos({xmin:w,xmax:k},{unlimited:!0}).xmin??1/0)),me=e.layout.width/Math.abs(e.layout.width-e.coord2pos({xmin:B-L,xmax:X+L}).xmin),Y=0;m.target.setPointerCapture(m.pointerId),m.target.onpointermove=K=>{Y+=K.movementX;let S=(e.layout.width-te-Y)/(e.layout.width-te);S<U&&(S=U),S>me&&(S=me),r.value={ratio:S,origin:(e.layout.left+e.layout.width)/n.value}},m.target.onpointerup=K=>{m.target.onpointermove=null,m.target.onpointerup=null,C(_,K)}}function b(m){let _=e.action.find(K=>K.action=="rescale");if(!_)return;m.preventDefault(),m.stopPropagation();let{xmin:w,xmax:k,"min-range-x":L=0}=_,{xmin:X,xmax:B}=e.pos2coord({xmin:e.layout.left,xmax:e.layout.left+e.layout.width}),{x:te}=h(m),U=e.layout.width/(e.coord2pos({xmin:w,xmax:k},{unlimited:!0}).xmax??1/0),me=e.layout.width/Math.abs(e.coord2pos({xmin:B-L,xmax:X+L}).xmax),Y=0;m.target.setPointerCapture(m.pointerId),m.target.onpointermove=K=>{Y+=K.movementX;let S=(te+Y)/te;S<U&&(S=U),S>me&&(S=me),r.value={ratio:S,origin:e.layout.left/n.value}},m.target.onpointerup=K=>{m.target.onpointermove=null,m.target.onpointerup=null,C(_,K)}}let R=0,F;function E(m){let _=e.action.find(w=>["zoom","nudge"].includes(w.action)&&["ctrlKey","shiftKey","altKey","metaKey"].every(k=>w[k]==m[k]));_&&(F=clearTimeout(F),m.preventDefault(),m.stopPropagation(),R+=m.deltaY,M(_,h(m),R),F=setTimeout(()=>{C(_,m),R=0},300))}function M(m,_,w){if(m.action=="zoom"){let{"min-range-x":k=0,sensitivity:L=1.25}=m;L=L**(w/100);let X=e.coord2pos(m,{unlimited:!0}),B=Math.max(_.l-_.l*L,X.xmin??-1/0),te=Math.min(_.l+_.r*L,X.xmax??1/0);if(L<1){let U=e.pos2coord({xmin:B,xmax:te}),me=U.xmax-U.xmin,Y=(U.xmax+U.xmin)/2;me<k&&(U.xmin=Y-k/2,U.xmax=Y+k/2),{xmin:B,xmax:te}=e.coord2pos(U)}Math.abs(e.layout.width-(te-B))>1&&(r.value={ratio:e.layout.width/(te-B),origin:(e.layout.l+B*e.layout.width/(e.layout.width-te+B))/n.value})}if(m.action=="nudge"){let{sensitivity:k=.1}=m,L=k*e.layout.width*(-w/120),X=e.coord2pos(m,{unlimited:!0}),B=X.xmin==null?1/0:-X.xmin,te=X.xmax==null?-1/0:e.layout.width-X.xmax;i.value=c(L,te,B)}}function C(m,_){if(r.value==null&&i.value==0)return;let w=0,k=e.layout.width;if(r.value){let L=r.value.ratio,X=r.value.origin*n.value-e.layout.l;w=w/L+(1-1/L)*X,k=k/L+(1-1/L)*X}i.value&&(w-=i.value,k-=i.value),f(m.action,e.pos2coord({xmin:w,xmax:k}),_),i.value=0,r.value=null}return(m,_)=>(D(),G("g",null,[ae("line",Pe({ref:"i",x1:0,x2:n.value,y1:0,y2:0},s.value),null,16,X2),(D(!0),G(ue,null,Le(a.value,w=>(D(),G("line",Pe({ref_for:!0},w.bind),null,16))),256)),(D(!0),G(ue,null,Le(l.value,w=>(D(),G("text",Pe({ref_for:!0},w.bind),[ae("title",null,Fe(w.text),1),Xn(" "+Fe(w.text),1)],16))),256)),e.action.some?.(w=>w.action=="move"||w.action=="zoom")?(D(),G("g",Y2,[ae("rect",{width:n.value,height:10,y:-5,class:wn({"cursor-grab":e.action.some?.(w=>w.action=="move")}),onPointerdown:d,onWheel:E},null,42,K2)])):ht("",!0),e.action.some?.(w=>w.action=="rescale")?(D(),G("g",U2,[ae("rect",{width:20,height:10,y:-5,class:"cursor-ew-resize",onPointerdown:x},null,32),ae("rect",{width:20,height:10,y:-5,x:n.value-20,class:"cursor-ew-resize",onPointerdown:b},null,40,J2)])):ht("",!0),ae("text",Qo(zr(o.value)),Fe(e.title),17)]))}},Q2=["y2"],eg={key:0,class:"gb-interactive",fill:"transparent"},tg=["height"],ng={key:1,class:"gb-interactive",fill:"transparent"},ig=["y"],rg={__name:"CoreAxisY",props:Wt({ticks:{type:Array,default:()=>[]},title:String,coord2pos:Function,pos2coord:Function,layout:Object,theme:{type:Object,default:()=>({})},action:{type:Object,default:()=>({})}},{translate:{type:Number,default:0},translateModifiers:{},transcale:{},transcaleModifiers:{}}),emits:Wt(["move","zoom","rescale","nudge"],["update:translate","update:transcale"]),setup(e,{emit:t}){const n=ie(()=>e.layout.height+e.layout.t+e.layout.b),i=ze(e,"translate"),r=ze(e,"transcale"),o=ie(()=>{let _=(e.theme.ticks_position=="right"?1:-1)*(e.theme.title_offset??0),w=n.value/2;return{x:_,y:w,"text-anchor":"middle","alignment-baseline":"central","font-size":e.theme.title_size,color:e.theme.title_color??"black",transform:e.theme.title_angle?`rotate(${e.theme.title_angle})`:"","transform-origin":_+" "+w}}),s=ie(()=>({stroke:e.theme.line_color??"black","stroke-width":e.theme.line_width,"stroke-dasharray":e.theme.line_dasharray,style:e.theme.line_style})),a=ie(()=>{let m=[];for(let _ of e.ticks){typeof _=="number"&&(_={position:_});let w=e.coord2pos({y:_.position}).y+e.layout.t+i.value;if(r.value?.ratio!=null&&(w=w*r.value.ratio+(1-r.value.ratio)*(r.value.origin??.5)*n.value),w<0||w>n.value)continue;let k=(e.theme.ticks_position=="right"?1:-1)*(_.length??e.theme.ticks_length);m.push({bind:{y1:w,y2:w,x1:0,x2:k,stroke:_.color??e.theme.ticks_color??"black","stroke-width":_.width??e.theme.ticks_width}})}return m}),l=ie(()=>{let m=e.theme.ticks_position=="right",_=[];for(let w of e.ticks){typeof w=="number"&&(w={position:w});let k=e.coord2pos({y:w.position}).y+e.layout.t+i.value;if(r.value?.ratio!=null&&(k=k*r.value.ratio+(1-r.value.ratio)*(r.value.origin??.5)*n.value),k<0||k>n.value)continue;let L=(m?1:-1)*((w.length??e.theme.ticks_length)+3);_.push({bind:{y:k,x:L,"text-anchor":m?"start":"end","alignment-baseline":"central","font-size":w.size??e.theme.label_size,color:w.color??e.theme.label_color??"black"},text:String(w.label)})}return _});function c(m,_,w){return m<_?_:m>w?w:m}const u=st("i");function h(m){let _=u.value.getBoundingClientRect();return{y:m.pageY-_.top-e.layout.top,t:m.pageY-_.top-e.layout.top,b:_.top+e.layout.top+e.layout.height-m.pageY}}const f=t;function d(m){let _=e.action.find(X=>X.action=="move");if(!_)return;m.preventDefault(),m.stopPropagation(),m.target.style.cursor="grabbing";let w=e.coord2pos(_,{unlimited:!0}),k=w.ymin==null?1/0:-w.ymin,L=w.ymax==null?-1/0:e.layout.height-w.ymax;m.target.setPointerCapture(m.pointerId),m.target.onpointermove=X=>{i.value=c(i.value+X.movementY,L,k)},m.target.onpointerup=X=>{m.target.onpointermove=null,m.target.onpointerup=null,m.target.style.cursor=null,C(_,X)}}function x(m){let _=e.action.find(K=>K.action=="rescale");if(!_)return;m.preventDefault(),m.stopPropagation();let{ymin:w,ymax:k,"min-range-y":L=0}=_,{ymin:X,ymax:B}=e.pos2coord({ymin:e.layout.top,ymax:e.layout.top+e.layout.height}),{y:te}=h(m),U=e.layout.height/(e.layout.height-(e.coord2pos({ymin:w,ymax:k},{unlimited:!0}).ymin??1/0)),me=e.layout.height/Math.abs(e.layout.height-e.coord2pos({ymin:B-L,ymax:X+L}).ymin),Y=0;m.target.setPointerCapture(m.pointerId),m.target.onpointermove=K=>{Y+=K.movementY;let S=(e.layout.height-te-Y)/(e.layout.height-te);S<U&&(S=U),S>me&&(S=me),r.value={ratio:S,origin:(e.layout.top+e.layout.height)/n.value}},m.target.onpointerup=K=>{m.target.onpointermove=null,m.target.onpointerup=null,C(_,K)}}function b(m){let _=e.action.find(K=>K.action=="rescale");if(!_)return;m.preventDefault(),m.stopPropagation();let{ymin:w,ymax:k,"min-range-y":L=0}=_,{ymin:X,ymax:B}=e.pos2coord({ymin:e.layout.top,ymax:e.layout.top+e.layout.height}),{y:te}=h(m),U=e.layout.height/(e.coord2pos({ymin:w,ymax:k},{unlimited:!0}).ymax??1/0),me=e.layout.height/Math.abs(e.coord2pos({ymin:B-L,ymax:X+L}).ymax),Y=0;m.target.setPointerCapture(m.pointerId),m.target.onpointermove=K=>{Y+=K.movementY;let S=(te+Y)/te;S<U&&(S=U),S>me&&(S=me),r.value={ratio:S,origin:e.layout.top/n.value}},m.target.onpointerup=K=>{m.target.onpointermove=null,m.target.onpointerup=null,C(_,K)}}let R=0,F;function E(m){let _=e.action.find(w=>["zoom","nudge"].includes(w.action)&&["ctrlKey","shiftKey","altKey","metaKey"].every(k=>w[k]==m[k]));_&&(F=clearTimeout(F),m.preventDefault(),m.stopPropagation(),R+=m.deltaY,M(_,h(m),R),F=setTimeout(()=>{C(_,m),R=0},300))}function M(m,_,w){if(m.action=="zoom"){let{"min-range-y":k=0,sensitivity:L=1.25}=m;L=L**(w/100);let X=e.coord2pos(m,{unlimited:!0}),B=Math.max(_.t-_.t*L,X.ymin??-1/0),te=Math.min(_.t+_.b*L,X.ymax??1/0);if(L<1){let U=e.pos2coord({ymin:B,ymax:te}),me=U.ymax-U.ymin,Y=(U.ymax+U.ymin)/2;me<k&&(U.ymin=Y-k/2,U.ymax=Y+k/2),{ymin:B,ymax:te}=e.coord2pos(U)}Math.abs(e.layout.height-(te-B))>1&&(r.value={ratio:e.layout.height/(te-B),origin:(e.layout.t+B*e.layout.height/(e.layout.height-te+B))/n.value})}if(m.action=="nudge"){let k=(m.ratio??.1)*e.layout.height*(w/120),L=e.coord2pos(m,{unlimited:!0}),X=L.ymin==null?1/0:-L.ymin,B=L.ymax==null?-1/0:e.layout.height-L.ymax;i.value=c(k,B,X)}}function C(m,_){if(r.value==null&&i.value==0)return;let w=0,k=e.layout.height;if(r.value){let L=r.value.ratio,X=r.value.origin*n.value-e.layout.t;w=w/L+(1-1/L)*X,k=k/L+(1-1/L)*X}i.value&&(w-=i.value,k-=i.value),f(m.action,e.pos2coord({ymin:w,ymax:k}),_),i.value=0,r.value=null}return(m,_)=>(D(),G("g",null,[ae("line",Pe({ref:"i",x1:0,x2:0,y1:0,y2:n.value},s.value),null,16,Q2),(D(!0),G(ue,null,Le(a.value,w=>(D(),G("line",Pe({ref_for:!0},w.bind),null,16))),256)),(D(!0),G(ue,null,Le(l.value,w=>(D(),G("text",Pe({ref_for:!0},w.bind),[ae("title",null,Fe(w.text),1),Xn(" "+Fe(w.text),1)],16))),256)),e.action.some?.(w=>w.action=="move"||w.action=="zoom")?(D(),G("g",eg,[ae("rect",{width:10,height:n.value,x:-5,class:wn({"cursor-grab":e.action.some?.(w=>w.action=="move")}),onPointerdown:d,onWheel:E},null,42,tg)])):ht("",!0),e.action.some?.(w=>w.action=="rescale")?(D(),G("g",ng,[ae("rect",{width:10,height:20,x:-5,class:"cursor-ns-resize",onPointerdown:x},null,32),ae("rect",{width:10,height:20,x:-5,y:n.value-20,class:"cursor-ns-resize",onPointerdown:b},null,40,ig)])):ht("",!0),ae("text",Qo(zr(o.value)),Fe(e.title),17)]))}},Hl={__name:"CoreAxis",props:{theme:{type:Object,default:()=>({})}},setup(e){const t={horizontal:Z2,vertical:rg},n=ie(()=>e.theme.line_orientation??"horizontal");return(i,r)=>(D(),ct(as(t[n.value]),{theme:e.theme},null,8,["theme"]))}},og={__name:"CoreGridX",props:{majorBreaks:{type:Array,default:()=>[]},minorBreaks:{type:Array,default:()=>[]},coord2pos:Function,pos2coord:Function,layout:Object,theme:{type:Object,default:()=>({})},action:{type:Object,default:()=>({})},translate:{type:Number,default:0},transcale:Object},setup(e){const t=ie(()=>e.layout.width+e.layout.l+e.layout.r),n=ie(()=>e.layout.height+e.layout.t+e.layout.b),i=ie(()=>{let o=[];for(let s of e.majorBreaks){typeof s=="number"&&(s={position:s});let a=e.coord2pos({x:s.position}).x+e.layout.l+e.translate;e.transcale?.ratio!=null&&(a=a*e.transcale.ratio+(1-e.transcale.ratio)*(e.transcale.origin??.5)*t.value),!(a<0||a>t.value)&&o.push({bind:{y1:0,y2:n.value,x1:a,x2:a,stroke:s.color??e.theme.line_color_major??e.theme.line_color??"black","stroke-width":s.width??e.theme.line_width_major??e.theme.line_width}})}return o}),r=ie(()=>{let o=[];for(let s of e.minorBreaks){typeof s=="number"&&(s={position:s});let a=e.coord2pos({x:s.position}).x+e.layout.l+e.translate;e.transcale?.ratio!=null&&(a=a*e.transcale.ratio+(1-e.transcale.ratio)*(e.transcale.origin??.5)*t.value),!(a<0||a>t.value)&&o.push({bind:{y1:0,y2:n.value,x1:a,x2:a,stroke:s.color??e.theme.line_color_minor??e.theme.line_color??"black","stroke-width":s.width??e.theme.line_width_minor??e.theme.line_width}})}return o});return(o,s)=>(D(),G("g",null,[(D(!0),G(ue,null,Le(i.value,a=>(D(),G("line",Pe({ref_for:!0},a.bind),null,16))),256)),(D(!0),G(ue,null,Le(r.value,a=>(D(),G("line",Pe({ref_for:!0},a.bind),null,16))),256))]))}},sg={__name:"CoreGridY",props:{majorBreaks:{type:Array,default:()=>[]},minorBreaks:{type:Array,default:()=>[]},coord2pos:Function,pos2coord:Function,layout:Object,theme:{type:Object,default:()=>({})},action:{type:Object,default:()=>({})},translate:{type:Number,default:0},transcale:Object},setup(e){const t=ie(()=>e.layout.width+e.layout.l+e.layout.r),n=ie(()=>e.layout.height+e.layout.t+e.layout.b),i=ie(()=>{let o=[];for(let s of e.majorBreaks){typeof s=="number"&&(s={position:s});let a=e.coord2pos({y:s.position}).y+e.layout.t+e.translate;e.transcale?.ratio!=null&&(a=a*e.transcale.ratio+(1-e.transcale.ratio)*(e.transcale.origin??.5)*n.value),!(a<0||a>n.value)&&o.push({bind:{x1:0,x2:t.value,y1:a,y2:a,stroke:s.color??e.theme.line_color_major??e.theme.line_color??"black","stroke-width":s.width??e.theme.line_width_major??e.theme.line_width}})}return o}),r=ie(()=>{let o=[];for(let s of e.minorBreaks){typeof s=="number"&&(s={position:s});let a=e.coord2pos({y:s.position}).y+e.layout.t+e.translate;e.transcale?.ratio!=null&&(a=a*e.transcale.ratio+(1-e.transcale.ratio)*(e.transcale.origin??.5)*n.value),!(a<0||a>n.value)&&o.push({bind:{x1:0,x2:t.value,y1:a,y2:a,stroke:s.color??e.theme.line_color_minor??e.theme.line_color??"black","stroke-width":s.width??e.theme.line_width_minor??e.theme.line_width}})}return o});return(o,s)=>(D(),G("g",null,[(D(!0),G(ue,null,Le(i.value,a=>(D(),G("line",Pe({ref_for:!0},a.bind),null,16))),256)),(D(!0),G(ue,null,Le(r.value,a=>(D(),G("line",Pe({ref_for:!0},a.bind),null,16))),256))]))}},lg={__name:"CoreCanvasPoint",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{expose:t,emit:n}){const i=n,r={triangle:l=>`M0-${l*2/3}L${l*.577},${l/3}L-${l*.577},${l/3}Z`,diamond:l=>`M0-${l*.707}L${l*.707},0L0,${l*.707}L-${l*.707},0Z`,square:l=>`M-${l/2}-${l/2}H${l/2}V${l/2}H-${l/2}Z`,plus:l=>`M-${l/10}-${l/2}V-${l/10}H-${l/2}V${l/10}H-${l/10}V${l/2}H${l/10}V${l/10}H${l/2}V-${l/10}H${l/10}V-${l/2}H-${l/10}Z`},o=ie(()=>({width:e.layout.fullWidth*(1+e.extendX*2),height:e.layout.fullHeight*(1+e.extendY*2),x:-e.layout.l-e.layout.fullWidth*e.extendX,y:-e.layout.t-e.layout.fullHeight*e.extendY})),s=st("container"),a=ie(()=>{if(s.value==null)return;const l=document.createElement("canvas");l.width=e.layout.fullWidth*(1+e.extendX*2),l.height=e.layout.fullHeight*(1+e.extendY*2);const c=l.getContext("2d");c.clearRect(0,0,l.width,l.height),c.translate(e.layout.l+e.layout.fullWidth*e.extendX,e.layout.t+e.layout.fullHeight*e.extendY);let u=new Map;for(const h of e.data)for(let{x:f,y:d,size:x=6,shape:b,color:R,stroke:F,linewidth:E,alpha:M,xtranslate:C=0,ytranslate:m=0,$raw:_}of h){const{x:w,y:k}=e.coord2pos({x:f,y:d}),L=new Path2D;String(b).startsWith("path:")?L.addPath(new Path2D(b.slice(5)),new DOMMatrix().translateSelf(w+C,k+m)):b in r?L.addPath(new Path2D(r[b](x)),new DOMMatrix().translate(w+C,k+m)):L.arc(w+C,k+m,x/2,0,Math.PI*2),u.set(L,_),c.lineWidth=E,c.globalAlpha=M,c.beginPath(),R!=="none"&&(c.fillStyle=R,c.fill(L)),F!=null&&(c.strokeStyle=F,c.stroke(L))}return l.onclick=function(h){const f=l.getBoundingClientRect(),d=h.clientX-f.left,x=h.clientY-f.top;for(const[b,R]of u)if(c.isPointInPath(b,d,x)){i("click",h,R);break}},l});return it(a,l=>s.value.replaceChildren(l)),t({dispatchEvent:l=>a.value?.dispatchEvent?.(l)}),(l,c)=>(D(),G("foreignObject",Pe(o.value,{ref:"container",class:"pointer-events-none"}),null,16))}},ql={__name:"CoreCanvasLine",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{expose:t,emit:n}){const i=n,r=ie(()=>({width:e.layout.fullWidth*(1+e.extendX*2),height:e.layout.fullHeight*(1+e.extendY*2),x:-e.layout.l-e.layout.fullWidth*e.extendX,y:-e.layout.t-e.layout.fullHeight*e.extendY})),o=st("container"),s=ie(()=>{if(o.value==null)return;const l=document.createElement("canvas");l.width=e.layout.fullWidth*(1+e.extendX*2),l.height=e.layout.fullHeight*(1+e.extendY*2);const c=l.getContext("2d");c.clearRect(0,0,l.width,l.height),c.translate(e.layout.l+e.layout.fullWidth*e.extendX,e.layout.t+e.layout.fullHeight*e.extendY);let u=new Map;for(const h of e.data)for(let{x:f,y:d,xend:x,yend:b,color:R,linewidth:F,alpha:E,linetype:M,xtranslate:C=0,ytranslate:m=0,$raw:_}of h){if(R==="transparent")continue;const{x:w,y:k}=e.coord2pos({x:f,y:d}),{x:L,y:X}=e.coord2pos({x,y:b}),B=new Path2D;B.moveTo(w+C,k+m),B.lineTo(L+C,X+m),u.set(B,_),c.lineWidth=F,c.globalAlpha=E,c.setLineDash(a(M)),R!=="none"&&(c.strokeStyle=R,c.stroke(B))}return l.onclick=function(h){const f=l.getBoundingClientRect(),d=h.clientX-f.left,x=h.clientY-f.top;for(const[b,R]of u)if(c.isPointInPath(b,d,x)){i("click",h,R);break}},l});it(s,l=>o.value.replaceChildren(l)),t({dispatchEvent:l=>s.value?.dispatchEvent?.(l)});function a(l){return l==null?[]:Array.isArray(l)?l:l==="solid"?[]:l==="dashed"?[4,4]:l==="dotted"?[1,3]:l==="dotdash"?[1,3,4,3]:l==="longdash"?[8,4]:l==="twodash"?[2,2,6,2]:l.includes(" ")?l:l.split("").map(c=>+("0x"+c))}return(l,c)=>(D(),G("foreignObject",Pe(r.value,{ref:"container",class:"pointer-events-none"}),null,16))}},Gl={__name:"CoreCanvasRect",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{expose:t,emit:n}){const i=n,r=ie(()=>({width:e.layout.fullWidth*(1+e.extendX*2),height:e.layout.fullHeight*(1+e.extendY*2),x:-e.layout.l-e.layout.fullWidth*e.extendX,y:-e.layout.t-e.layout.fullHeight*e.extendY})),o=st("container"),s=ie(()=>{if(o.value==null)return;const l=document.createElement("canvas");l.width=e.layout.fullWidth*(1+e.extendX*2),l.height=e.layout.fullHeight*(1+e.extendY*2);const c=l.getContext("2d");c.clearRect(0,0,l.width,l.height),c.translate(e.layout.l+e.layout.fullWidth*e.extendX,e.layout.t+e.layout.fullHeight*e.extendY);let u=new Map;for(const h of e.data)for(let{xmin:f,xmax:d,ymin:x,ymax:b,fill:R,color:F,linewidth:E,linetype:M,alpha:C,xtranslate:m=0,ytranslate:_=0,$raw:w}of h){const{x:k,y:L}=e.coord2pos({x:f,y:x}),{x:X,y:B}=e.coord2pos({x:d,y:b}),te=new Path2D;te.rect(k+m,L+_,X-k,B-L),u.set(te,w),c.lineWidth=E,c.globalAlpha=C,c.setLineDash(a(M)),R!=="none"&&(c.fillStyle=R,c.fill(te)),F!=null&&(c.strokeStyle=F,c.stroke(te))}return l.onclick=function(h){const f=l.getBoundingClientRect(),d=h.clientX-f.left,x=h.clientY-f.top;for(const[b,R]of u)if(c.isPointInPath(b,d,x)){i("click",h,R);break}},l});it(s,l=>o.value.replaceChildren(l)),t({dispatchEvent:l=>s.value?.dispatchEvent?.(l)});function a(l){return l==null?[]:Array.isArray(l)?l:l==="solid"?[]:l==="dashed"?[4,4]:l==="dotted"?[1,3]:l==="dotdash"?[1,3,4,3]:l==="longdash"?[8,4]:l==="twodash"?[2,2,6,2]:l.includes(" ")?l:l.split("").map(c=>+("0x"+c))}return(l,c)=>(D(),G("foreignObject",Pe(r.value,{ref:"container",class:"pointer-events-none"}),null,16))}},ag={__name:"CoreCanvasText",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{expose:t,emit:n}){const i=n,r=ie(()=>({width:e.layout.fullWidth*(1+e.extendX*2),height:e.layout.fullHeight*(1+e.extendY*2),x:-e.layout.l-e.layout.fullWidth*e.extendX,y:-e.layout.t-e.layout.fullHeight*e.extendY})),o=st("container"),s=ie(()=>{if(o.value==null)return;const l=document.createElement("canvas");l.width=e.layout.fullWidth*(1+e.extendX*2),l.height=e.layout.fullHeight*(1+e.extendY*2);const c=l.getContext("2d");c.clearRect(0,0,l.width,l.height),c.translate(e.layout.l+e.layout.fullWidth*e.extendX,e.layout.t+e.layout.fullHeight*e.extendY);let u=new Map;for(const h of e.data)for(let{x:f,y:d,color:x,size:b=4,label:R,stroke:F,linewidth:E,linetype:M,alpha:C,xtranslate:m=0,ytranslate:_=0,$raw:w}of h){const{x:k,y:L}=e.coord2pos({x:f,y:d});c.textAlign="center",c.textBaseline="middle",c.lineWidth=E,c.globalAlpha=C,c.font=`${b*4}px sans-serif`,c.setLineDash(a(M)),x!=="none"&&(c.fillStyle=x,c.fillText(R,k+m,L+_)),F!=null&&(c.strokeStyle=F,c.strokeText(R,k+m,L+_))}return l.onclick=function(h){const f=l.getBoundingClientRect(),d=h.clientX-f.left,x=h.clientY-f.top;for(const[b,R]of u)if(c.isPointInPath(b,d,x)){i("click",h,R);break}},l});it(s,l=>o.value.replaceChildren(l)),t({dispatchEvent:l=>s.value?.dispatchEvent?.(l)});function a(l){return l==null?[]:Array.isArray(l)?l:l==="solid"?[]:l==="dashed"?[4,4]:l==="dotted"?[1,3]:l==="dotdash"?[1,3,4,3]:l==="longdash"?[8,4]:l==="twodash"?[2,2,6,2]:l.includes(" ")?l:l.split("").map(c=>+("0x"+c))}return(l,c)=>(D(),G("foreignObject",Pe(r.value,{ref:"container",class:"pointer-events-none"}),null,16))}},cg={__name:"CoreCanvasPolygon",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{expose:t,emit:n}){const i=n,r=ie(()=>({width:e.layout.fullWidth*(1+e.extendX*2),height:e.layout.fullHeight*(1+e.extendY*2),x:-e.layout.l-e.layout.fullWidth*e.extendX,y:-e.layout.t-e.layout.fullHeight*e.extendY})),o=st("container"),s=ie(()=>{if(o.value==null)return;const l=document.createElement("canvas");l.width=e.layout.fullWidth*(1+e.extendX*2),l.height=e.layout.fullHeight*(1+e.extendY*2);const c=l.getContext("2d");c.clearRect(0,0,l.width,l.height),c.translate(e.layout.l+e.layout.fullWidth*e.extendX,e.layout.t+e.layout.fullHeight*e.extendY);let u=new Map;for(const h of e.data)for(let{points:f,fill:d,color:x,linewidth:b,linetype:R,alpha:F,xtranslate:E=0,ytranslate:M=0,$raw:C}of h){if(f=f.map(_=>e.coord2pos(_)).filter(_=>_.x!=null&&_.y!=null),f.length===0)continue;const m=new Path2D;m.moveTo(f[0].x+E,f[0].y+M);for(let _=1;_<f.length;_++)m.lineTo(f[_].x+E,f[_].y+M);m.closePath(),u.set(m,C),c.lineWidth=b,c.globalAlpha=F,c.setLineDash(a(R)),d!=="none"&&(c.fillStyle=d,c.fill(m)),x!=null&&(c.strokeStyle=x,c.stroke(m))}return l.onclick=function(h){const f=l.getBoundingClientRect(),d=h.clientX-f.left,x=h.clientY-f.top;for(const[b,R]of u)if(c.isPointInPath(b,d,x)){i("click",h,R);break}},l});it(s,l=>o.value.replaceChildren(l)),t({dispatchEvent:l=>s.value?.dispatchEvent?.(l)});function a(l){return l==null?[]:Array.isArray(l)?l:l==="solid"?[]:l==="dashed"?[4,4]:l==="dotted"?[1,3]:l==="dotdash"?[1,3,4,3]:l==="longdash"?[8,4]:l==="twodash"?[2,2,6,2]:l.includes(" ")?l:l.split("").map(c=>+("0x"+c))}return(l,c)=>(D(),G("foreignObject",Pe(r.value,{ref:"container",class:"pointer-events-none"}),null,16))}},ug=Object.freeze(Object.defineProperty({__proto__:null,line:ql,point:lg,polygon:cg,rect:Gl,stick:ql,text:ag,tile:Gl},Symbol.toStringTag,{value:"Module"})),hg={__name:"CoreSvgPoint",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i={triangle:o=>`M0-${o*2/3}L${o*.577},${o/3}L-${o*.577},${o/3}Z`,diamond:o=>`M0-${o*.707}L${o*.707},0L0,${o*.707}L-${o*.707},0Z`,square:o=>`M-${o/2}-${o/2}H${o/2}V${o/2}H-${o/2}Z`,plus:o=>`M-${o/10}-${o/2}V-${o/10}H-${o/2}V${o/10}H-${o/10}V${o/2}H${o/10}V${o/10}H${o/2}V-${o/10}H${o/10}V-${o/2}H-${o/10}Z`},r=ie(()=>{let o=-e.layout.fullWidth*e.extendX-e.layout.l,s=e.layout.fullWidth*(1+e.extendX)-e.layout.l,a=-e.layout.fullHeight*e.extendY-e.layout.t,l=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(c=>c.map(({x:u,y:h,size:f=6,shape:d,color:x,stroke:b,linewidth:R,alpha:F,xtranslate:E=0,ytranslate:M=0,$raw:C})=>{let{x:m,y:_}=e.coord2pos({x:u,y:h});if(m<o||m>s||_<a||_>l)return null;let w={fill:x,stroke:b,"stroke-width":R,"fill-opacity":F,"stroke-opacity":F,transform:E||M?`translate(${E}, ${M})`:null,onClick:k=>n("click",k,C),onContextmenu:k=>n("contextmenu",k,C),onPointerover:k=>n("pointerover",k,C),onPointerout:k=>n("pointerout",k,C),onPointerenter:k=>n("pointerenter",k,C),onPointerleave:k=>n("pointerleave",k,C),onPointerdown:k=>n("pointerdown",k,C),onPointerup:k=>n("pointerup",k,C),onPointermove:k=>n("pointermove",k,C)};return String(d).startsWith("path:")?(w.transform=`translate(${m},${_}) scale(${f})`,w.d=d.slice(5)):d in i?(w.transform=`translate(${m},${_})`,w.d=i[d](f)):(w.cx=m,w.cy=_,w.r=f/2),w}).filter(u=>u!=null))});return(o,s)=>(D(),G("g",null,[(D(!0),G(ue,null,Le(r.value,a=>(D(),G("g",null,[(D(!0),G(ue,null,Le(a,l=>(D(),G(ue,null,[l.d?(D(),G("path",Pe({key:0,ref_for:!0},l),null,16)):(D(),G("circle",Pe({key:1,ref_for:!0},l),null,16))],64))),256))]))),256))]))}},Xl={__name:"CoreSvgLine",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i=ie(()=>{let o=-e.layout.fullWidth*e.extendX-e.layout.l,s=e.layout.fullWidth*(1+e.extendX)-e.layout.l,a=-e.layout.fullHeight*e.extendY-e.layout.t,l=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(c=>c.map(({x:u,y:h,xend:f,yend:d,color:x="black",linewidth:b,alpha:R,linetype:F,xtranslate:E=0,ytranslate:M=0,$raw:C})=>{let{x:m,y:_}=e.coord2pos({x:u,y:h}),{x:w,y:k}=e.coord2pos({x:f,y:d});return m<o&&w<o||m>s&&w>s||_<a&&k<a||_>l&&k>l?null:{x1:m,x2:w,y1:_,y2:k,stroke:x,"stroke-width":b,"stroke-opacity":R,"stroke-dasharray":r(F),transform:E||M?`translate(${E}, ${M})`:null,onClick:X=>n("click",X,C),onContextmenu:X=>n("contextmenu",X,C),onPointerover:X=>n("pointerover",X,C),onPointerout:X=>n("pointerout",X,C),onPointerenter:X=>n("pointerenter",X,C),onPointerleave:X=>n("pointerleave",X,C),onPointerdown:X=>n("pointerdown",X,C),onPointerup:X=>n("pointerup",X,C),onPointermove:X=>n("pointermove",X,C)}}).filter(u=>u!=null))});function r(o){return o==null?null:Array.isArray(o)?o.join(" "):o==="solid"?null:o==="dashed"?"4 4":o==="dotted"?"1 3":o==="dotdash"?"1 3 4 3":o==="longdash"?"8 4":o==="twodash"?"2 2 6 2":o.includes(" ")?o:o.split("").map(s=>+("0x"+s)).join(" ")}return(o,s)=>(D(),G("g",null,[(D(!0),G(ue,null,Le(i.value,a=>(D(),G("g",null,[(D(!0),G(ue,null,Le(a,l=>(D(),G("line",Pe({ref_for:!0},l),null,16))),256))]))),256))]))}},Yl={__name:"CoreSvgRect",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i=ie(()=>{let o=-e.layout.fullWidth*e.extendX-e.layout.l,s=e.layout.fullWidth*(1+e.extendX)-e.layout.l,a=-e.layout.fullHeight*e.extendY-e.layout.t,l=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(c=>c.map(({xmin:u,xmax:h,ymin:f,ymax:d,fill:x="black",color:b,linewidth:R,linetype:F,alpha:E,xtranslate:M=0,ytranslate:C=0,$raw:m})=>({xmin:u,xmax:h,ymin:f,ymax:d}=e.coord2pos({xmin:u,xmax:h,ymin:f,ymax:d}),u<o&&h<o||u>s&&h>s||f<a&&d<a||f>l&&d>l?null:{x:u,width:h-u,y:f,height:d-f,fill:x,stroke:b,"stroke-width":R,"stroke-dasharray":r(F),"fill-opacity":E,"stroke-opacity":E,transform:M||C?`translate(${M}, ${C})`:null,onClick:w=>n("click",w,m),onContextmenu:w=>n("contextmenu",w,m),onPointerover:w=>n("pointerover",w,m),onPointerout:w=>n("pointerout",w,m),onPointerenter:w=>n("pointerenter",w,m),onPointerleave:w=>n("pointerleave",w,m),onPointerdown:w=>n("pointerdown",w,m),onPointerup:w=>n("pointerup",w,m),onPointermove:w=>n("pointermove",w,m)})).filter(u=>u!=null))});function r(o){return o==null||o==="solid"?null:o==="dashed"?"4 4":o==="dotted"?"1 3":o==="dotdash"?"1 3 4 3":o==="longdash"?"8 4":o==="twodash"?"2 2 6 2":o.includes(" ")?o:o.split("").map(s=>+("0x"+s)).join(" ")}return(o,s)=>(D(),G("g",null,[(D(!0),G(ue,null,Le(i.value,a=>(D(),G("g",null,[(D(!0),G(ue,null,Le(a,l=>(D(),G("rect",Pe({ref_for:!0},l),null,16))),256))]))),256))]))}},fg={__name:"CoreSvgText",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i=ie(()=>{let o=-e.layout.fullWidth*e.extendX-e.layout.l,s=e.layout.fullWidth*(1+e.extendX)-e.layout.l,a=-e.layout.fullHeight*e.extendY-e.layout.t,l=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(c=>c.map(({x:u,y:h,color:f,size:d=4,label:x,stroke:b,linewidth:R,linetype:F,alpha:E,xtranslate:M=0,ytranslate:C=0,$raw:m})=>{let{x:_,y:w}=e.coord2pos({x:u,y:h});return _<o||_>s||w<a||w>l?null:{x:_,y:w,fill:f,label:x,"font-size":d*4,stroke:b,"stroke-width":R,"stroke-dasharray":r(F),"fill-opacity":E,"stroke-opacity":E,"text-anchor":"middle","alignment-baseline":"central",transform:M||C?`translate(${M}, ${C})`:null,onClick:L=>n("click",L,m),onContextmenu:L=>n("contextmenu",L,m),onPointerover:L=>n("pointerover",L,m),onPointerout:L=>n("pointerout",L,m),onPointerenter:L=>n("pointerenter",L,m),onPointerleave:L=>n("pointerleave",L,m),onPointerdown:L=>n("pointerdown",L,m),onPointerup:L=>n("pointerup",L,m),onPointermove:L=>n("pointermove",L,m)}}).filter(u=>u!=null))});function r(o){return o==null||o==="solid"?null:o==="dashed"?"4 4":o==="dotted"?"1 3":o==="dotdash"?"1 3 4 3":o==="longdash"?"8 4":o==="twodash"?"2 2 6 2":o.includes(" ")?o:o.split("").map(s=>+("0x"+s)).join(" ")}return(o,s)=>(D(),G("g",null,[(D(!0),G(ue,null,Le(i.value,a=>(D(),G("g",null,[(D(!0),G(ue,null,Le(a,l=>(D(),G(ue,null,[l.label?(D(),G("text",Pe({key:0,ref_for:!0},l),Fe(l.label),17)):ht("",!0)],64))),256))]))),256))]))}},dg={__name:"CoreSvgTextsegment",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i=ie(()=>{let o=-e.layout.fullWidth*e.extendX-e.layout.l,s=e.layout.fullWidth*(1+e.extendX)-e.layout.l,a=-e.layout.fullHeight*e.extendY-e.layout.t,l=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(c=>c.map(({x:u,xend:h,y:f,yend:d,color:x,size:b=4,label:R,stroke:F,linewidth:E,linetype:M,alpha:C,xtranslate:m=0,ytranslate:_=0,$raw:w})=>{let k=r(String(R)),L=(h-u)/(k.length-1||1),X=(d-f)/(k.length-1||1),{x:B,y:te}=e.coord2pos({x:u,y:f}),{x:U,y:me}=e.coord2pos({x:h,y:d});return B<o&&U<o||B>s&&U>s||te<a&&me<a||te>l&&me>l?null:{content:k.map((S,A)=>{let{x:O,y:Z}=e.coord2pos({x:u+A*L,y:f+A*X});return{bind:{x:O,y:Z,"text-anchor":"middle","alignment-baseline":"central"},label:S}}),fill:x,"font-size":b*4,stroke:F,"stroke-width":E,"stroke-dasharray":M,"fill-opacity":C,"stroke-opacity":C,transform:m||_?`translate(${m}, ${_})`:null,onClick:S=>n("click",S,w),onContextmenu:S=>n("contextmenu",S,w),onPointerover:S=>n("pointerover",S,w),onPointerout:S=>n("pointerout",S,w),onPointerenter:S=>n("pointerenter",S,w),onPointerleave:S=>n("pointerleave",S,w),onPointerdown:S=>n("pointerdown",S,w),onPointerup:S=>n("pointerup",S,w),onPointermove:S=>n("pointermove",S,w)}}).filter(u=>u!=null))});function r(o){let s=[];for(let a=0;a<o.length;a++)if(o[a]==""){let l=a+1;for(;l<o.length&&o[l]!="";)l++;s.push(o.slice(a+1,l)),a=l}else s.push(o[a]);return s}return(o,s)=>(D(),G("g",null,[(D(!0),G(ue,null,Le(i.value,a=>(D(),G("g",null,[(D(!0),G(ue,null,Le(a,l=>(D(),G("text",Pe({ref_for:!0},{...l,content:null}),[(D(!0),G(ue,null,Le(l.content,c=>(D(),G(ue,null,[c.label?(D(),G("tspan",Pe({key:0,ref_for:!0},c.bind),Fe(c.label),17)):ht("",!0)],64))),256))],16))),256))]))),256))]))}},mg={__name:"CoreSvgPolygon",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i=ie(()=>{let r=-e.layout.fullWidth*e.extendX-e.layout.l,o=e.layout.fullWidth*(1+e.extendX)-e.layout.l,s=-e.layout.fullHeight*e.extendY-e.layout.t,a=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(l=>l.map(({points:c,fill:u,color:h,linewidth:f,alpha:d,xtranslate:x=0,ytranslate:b=0,$raw:R})=>(c=c.map(E=>e.coord2pos(E)),c.every(E=>E.x<r)||c.every(E=>E.x>o)||c.every(E=>E.y<s)||c.every(E=>E.y>a)?null:{points:c.map(E=>`${E.x},${E.y}`).join(" "),fill:u||"black",stroke:h,"stroke-width":f,"fill-opacity":d,"stroke-opacity":d,transform:x||b?`translate(${x}, ${b})`:null,onClick:E=>n("click",E,R),onContextmenu:E=>n("contextmenu",E,R),onPointerover:E=>n("pointerover",E,R),onPointerout:E=>n("pointerout",E,R),onPointerenter:E=>n("pointerenter",E,R),onPointerleave:E=>n("pointerleave",E,R),onPointerdown:E=>n("pointerdown",E,R),onPointerup:E=>n("pointerup",E,R),onPointermove:E=>n("pointermove",E,R)})).filter(c=>c!=null))});return(r,o)=>(D(),G("g",null,[(D(!0),G(ue,null,Le(i.value,s=>(D(),G("g",null,[(D(!0),G(ue,null,Le(s,a=>(D(),G("polygon",Pe({ref_for:!0},a),null,16))),256))]))),256))]))}},gg=Object.freeze(Object.defineProperty({__proto__:null,line:Xl,point:hg,polygon:mg,rect:Yl,stick:Xl,text:fg,textsegment:dg,tile:Yl},Symbol.toStringTag,{value:"Module"})),ks="-",pg=e=>{const t=xg(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:i}=e;return{getClassGroupId:s=>{const a=s.split(ks);return a[0]===""&&a.length!==1&&a.shift(),au(a,t)||yg(s)},getConflictingClassGroupIds:(s,a)=>{const l=n[s]||[];return a&&i[s]?[...l,...i[s]]:l}}},au=(e,t)=>{if(e.length===0)return t.classGroupId;const n=e[0],i=t.nextPart.get(n),r=i?au(e.slice(1),i):void 0;if(r)return r;if(t.validators.length===0)return;const o=e.join(ks);return t.validators.find(({validator:s})=>s(o))?.classGroupId},Kl=/^\[(.+)\]$/,yg=e=>{if(Kl.test(e)){const t=Kl.exec(e)[1],n=t?.substring(0,t.indexOf(":"));if(n)return"arbitrary.."+n}},xg=e=>{const{theme:t,classGroups:n}=e,i={nextPart:new Map,validators:[]};for(const r in n)qo(n[r],i,r,t);return i},qo=(e,t,n,i)=>{e.forEach(r=>{if(typeof r=="string"){const o=r===""?t:Ul(t,r);o.classGroupId=n;return}if(typeof r=="function"){if(bg(r)){qo(r(i),t,n,i);return}t.validators.push({validator:r,classGroupId:n});return}Object.entries(r).forEach(([o,s])=>{qo(s,Ul(t,o),n,i)})})},Ul=(e,t)=>{let n=e;return t.split(ks).forEach(i=>{n.nextPart.has(i)||n.nextPart.set(i,{nextPart:new Map,validators:[]}),n=n.nextPart.get(i)}),n},bg=e=>e.isThemeGetter,wg=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,n=new Map,i=new Map;const r=(o,s)=>{n.set(o,s),t++,t>e&&(t=0,i=n,n=new Map)};return{get(o){let s=n.get(o);if(s!==void 0)return s;if((s=i.get(o))!==void 0)return r(o,s),s},set(o,s){n.has(o)?n.set(o,s):r(o,s)}}},Go="!",Xo=":",vg=Xo.length,Sg=e=>{const{prefix:t,experimentalParseClassName:n}=e;let i=r=>{const o=[];let s=0,a=0,l=0,c;for(let x=0;x<r.length;x++){let b=r[x];if(s===0&&a===0){if(b===Xo){o.push(r.slice(l,x)),l=x+vg;continue}if(b==="/"){c=x;continue}}b==="["?s++:b==="]"?s--:b==="("?a++:b===")"&&a--}const u=o.length===0?r:r.substring(l),h=_g(u),f=h!==u,d=c&&c>l?c-l:void 0;return{modifiers:o,hasImportantModifier:f,baseClassName:h,maybePostfixModifierPosition:d}};if(t){const r=t+Xo,o=i;i=s=>s.startsWith(r)?o(s.substring(r.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:s,maybePostfixModifierPosition:void 0}}if(n){const r=i;i=o=>n({className:o,parseClassName:r})}return i},_g=e=>e.endsWith(Go)?e.substring(0,e.length-1):e.startsWith(Go)?e.substring(1):e,kg=e=>{const t=Object.fromEntries(e.orderSensitiveModifiers.map(i=>[i,!0]));return i=>{if(i.length<=1)return i;const r=[];let o=[];return i.forEach(s=>{s[0]==="["||t[s]?(r.push(...o.sort(),s),o=[]):o.push(s)}),r.push(...o.sort()),r}},Tg=e=>({cache:wg(e.cacheSize),parseClassName:Sg(e),sortModifiers:kg(e),...pg(e)}),Pg=/\s+/,Ag=(e,t)=>{const{parseClassName:n,getClassGroupId:i,getConflictingClassGroupIds:r,sortModifiers:o}=t,s=[],a=e.trim().split(Pg);let l="";for(let c=a.length-1;c>=0;c-=1){const u=a[c],{isExternal:h,modifiers:f,hasImportantModifier:d,baseClassName:x,maybePostfixModifierPosition:b}=n(u);if(h){l=u+(l.length>0?" "+l:l);continue}let R=!!b,F=i(R?x.substring(0,b):x);if(!F){if(!R){l=u+(l.length>0?" "+l:l);continue}if(F=i(x),!F){l=u+(l.length>0?" "+l:l);continue}R=!1}const E=o(f).join(":"),M=d?E+Go:E,C=M+F;if(s.includes(C))continue;s.push(C);const m=r(F,R);for(let _=0;_<m.length;++_){const w=m[_];s.push(M+w)}l=u+(l.length>0?" "+l:l)}return l};function Lg(){let e=0,t,n,i="";for(;e<arguments.length;)(t=arguments[e++])&&(n=cu(t))&&(i&&(i+=" "),i+=n);return i}const cu=e=>{if(typeof e=="string")return e;let t,n="";for(let i=0;i<e.length;i++)e[i]&&(t=cu(e[i]))&&(n&&(n+=" "),n+=t);return n};function Mg(e,...t){let n,i,r,o=s;function s(l){const c=t.reduce((u,h)=>h(u),e());return n=Tg(c),i=n.cache.get,r=n.cache.set,o=a,a(l)}function a(l){const c=i(l);if(c)return c;const u=Ag(l,n);return r(l,u),u}return function(){return o(Lg.apply(null,arguments))}}const Re=e=>{const t=n=>n[e]||[];return t.isThemeGetter=!0,t},uu=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,hu=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Cg=/^\d+\/\d+$/,Wg=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Ng=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,$g=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,Eg=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Ig=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,An=e=>Cg.test(e),de=e=>!!e&&!Number.isNaN(Number(e)),Jt=e=>!!e&&Number.isInteger(Number(e)),go=e=>e.endsWith("%")&&de(e.slice(0,-1)),Rt=e=>Wg.test(e),Og=()=>!0,Rg=e=>Ng.test(e)&&!$g.test(e),fu=()=>!1,Fg=e=>Eg.test(e),jg=e=>Ig.test(e),Dg=e=>!Q(e)&&!ee(e),Vg=e=>Yn(e,gu,fu),Q=e=>uu.test(e),cn=e=>Yn(e,pu,Rg),po=e=>Yn(e,Gg,de),Jl=e=>Yn(e,du,fu),zg=e=>Yn(e,mu,jg),Vi=e=>Yn(e,yu,Fg),ee=e=>hu.test(e),Qn=e=>Kn(e,pu),Bg=e=>Kn(e,Xg),Zl=e=>Kn(e,du),Hg=e=>Kn(e,gu),qg=e=>Kn(e,mu),zi=e=>Kn(e,yu,!0),Yn=(e,t,n)=>{const i=uu.exec(e);return i?i[1]?t(i[1]):n(i[2]):!1},Kn=(e,t,n=!1)=>{const i=hu.exec(e);return i?i[1]?t(i[1]):n:!1},du=e=>e==="position"||e==="percentage",mu=e=>e==="image"||e==="url",gu=e=>e==="length"||e==="size"||e==="bg-size",pu=e=>e==="length",Gg=e=>e==="number",Xg=e=>e==="family-name",yu=e=>e==="shadow",Yg=()=>{const e=Re("color"),t=Re("font"),n=Re("text"),i=Re("font-weight"),r=Re("tracking"),o=Re("leading"),s=Re("breakpoint"),a=Re("container"),l=Re("spacing"),c=Re("radius"),u=Re("shadow"),h=Re("inset-shadow"),f=Re("text-shadow"),d=Re("drop-shadow"),x=Re("blur"),b=Re("perspective"),R=Re("aspect"),F=Re("ease"),E=Re("animate"),M=()=>["auto","avoid","all","avoid-page","page","left","right","column"],C=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],m=()=>[...C(),ee,Q],_=()=>["auto","hidden","clip","visible","scroll"],w=()=>["auto","contain","none"],k=()=>[ee,Q,l],L=()=>[An,"full","auto",...k()],X=()=>[Jt,"none","subgrid",ee,Q],B=()=>["auto",{span:["full",Jt,ee,Q]},Jt,ee,Q],te=()=>[Jt,"auto",ee,Q],U=()=>["auto","min","max","fr",ee,Q],me=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],Y=()=>["start","end","center","stretch","center-safe","end-safe"],K=()=>["auto",...k()],S=()=>[An,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...k()],A=()=>[e,ee,Q],O=()=>[...C(),Zl,Jl,{position:[ee,Q]}],Z=()=>["no-repeat",{repeat:["","x","y","space","round"]}],oe=()=>["auto","cover","contain",Hg,Vg,{size:[ee,Q]}],be=()=>[go,Qn,cn],re=()=>["","none","full",c,ee,Q],Ae=()=>["",de,Qn,cn],_e=()=>["solid","dashed","dotted","double"],Ze=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],xe=()=>[de,go,Zl,Jl],ve=()=>["","none",x,ee,Q],$t=()=>["none",de,ee,Q],dt=()=>["none",de,ee,Q],_n=()=>[de,ee,Q],p=()=>[An,"full",...k()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Rt],breakpoint:[Rt],color:[Og],container:[Rt],"drop-shadow":[Rt],ease:["in","out","in-out"],font:[Dg],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Rt],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Rt],shadow:[Rt],spacing:["px",de],text:[Rt],"text-shadow":[Rt],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",An,Q,ee,R]}],container:["container"],columns:[{columns:[de,Q,ee,a]}],"break-after":[{"break-after":M()}],"break-before":[{"break-before":M()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:m()}],overflow:[{overflow:_()}],"overflow-x":[{"overflow-x":_()}],"overflow-y":[{"overflow-y":_()}],overscroll:[{overscroll:w()}],"overscroll-x":[{"overscroll-x":w()}],"overscroll-y":[{"overscroll-y":w()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:L()}],"inset-x":[{"inset-x":L()}],"inset-y":[{"inset-y":L()}],start:[{start:L()}],end:[{end:L()}],top:[{top:L()}],right:[{right:L()}],bottom:[{bottom:L()}],left:[{left:L()}],visibility:["visible","invisible","collapse"],z:[{z:[Jt,"auto",ee,Q]}],basis:[{basis:[An,"full","auto",a,...k()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[de,An,"auto","initial","none",Q]}],grow:[{grow:["",de,ee,Q]}],shrink:[{shrink:["",de,ee,Q]}],order:[{order:[Jt,"first","last","none",ee,Q]}],"grid-cols":[{"grid-cols":X()}],"col-start-end":[{col:B()}],"col-start":[{"col-start":te()}],"col-end":[{"col-end":te()}],"grid-rows":[{"grid-rows":X()}],"row-start-end":[{row:B()}],"row-start":[{"row-start":te()}],"row-end":[{"row-end":te()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":U()}],"auto-rows":[{"auto-rows":U()}],gap:[{gap:k()}],"gap-x":[{"gap-x":k()}],"gap-y":[{"gap-y":k()}],"justify-content":[{justify:[...me(),"normal"]}],"justify-items":[{"justify-items":[...Y(),"normal"]}],"justify-self":[{"justify-self":["auto",...Y()]}],"align-content":[{content:["normal",...me()]}],"align-items":[{items:[...Y(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...Y(),{baseline:["","last"]}]}],"place-content":[{"place-content":me()}],"place-items":[{"place-items":[...Y(),"baseline"]}],"place-self":[{"place-self":["auto",...Y()]}],p:[{p:k()}],px:[{px:k()}],py:[{py:k()}],ps:[{ps:k()}],pe:[{pe:k()}],pt:[{pt:k()}],pr:[{pr:k()}],pb:[{pb:k()}],pl:[{pl:k()}],m:[{m:K()}],mx:[{mx:K()}],my:[{my:K()}],ms:[{ms:K()}],me:[{me:K()}],mt:[{mt:K()}],mr:[{mr:K()}],mb:[{mb:K()}],ml:[{ml:K()}],"space-x":[{"space-x":k()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":k()}],"space-y-reverse":["space-y-reverse"],size:[{size:S()}],w:[{w:[a,"screen",...S()]}],"min-w":[{"min-w":[a,"screen","none",...S()]}],"max-w":[{"max-w":[a,"screen","none","prose",{screen:[s]},...S()]}],h:[{h:["screen","lh",...S()]}],"min-h":[{"min-h":["screen","lh","none",...S()]}],"max-h":[{"max-h":["screen","lh",...S()]}],"font-size":[{text:["base",n,Qn,cn]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[i,ee,po]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",go,Q]}],"font-family":[{font:[Bg,Q,t]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[r,ee,Q]}],"line-clamp":[{"line-clamp":[de,"none",ee,po]}],leading:[{leading:[o,...k()]}],"list-image":[{"list-image":["none",ee,Q]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",ee,Q]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:A()}],"text-color":[{text:A()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[..._e(),"wavy"]}],"text-decoration-thickness":[{decoration:[de,"from-font","auto",ee,cn]}],"text-decoration-color":[{decoration:A()}],"underline-offset":[{"underline-offset":[de,"auto",ee,Q]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:k()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",ee,Q]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",ee,Q]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:O()}],"bg-repeat":[{bg:Z()}],"bg-size":[{bg:oe()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},Jt,ee,Q],radial:["",ee,Q],conic:[Jt,ee,Q]},qg,zg]}],"bg-color":[{bg:A()}],"gradient-from-pos":[{from:be()}],"gradient-via-pos":[{via:be()}],"gradient-to-pos":[{to:be()}],"gradient-from":[{from:A()}],"gradient-via":[{via:A()}],"gradient-to":[{to:A()}],rounded:[{rounded:re()}],"rounded-s":[{"rounded-s":re()}],"rounded-e":[{"rounded-e":re()}],"rounded-t":[{"rounded-t":re()}],"rounded-r":[{"rounded-r":re()}],"rounded-b":[{"rounded-b":re()}],"rounded-l":[{"rounded-l":re()}],"rounded-ss":[{"rounded-ss":re()}],"rounded-se":[{"rounded-se":re()}],"rounded-ee":[{"rounded-ee":re()}],"rounded-es":[{"rounded-es":re()}],"rounded-tl":[{"rounded-tl":re()}],"rounded-tr":[{"rounded-tr":re()}],"rounded-br":[{"rounded-br":re()}],"rounded-bl":[{"rounded-bl":re()}],"border-w":[{border:Ae()}],"border-w-x":[{"border-x":Ae()}],"border-w-y":[{"border-y":Ae()}],"border-w-s":[{"border-s":Ae()}],"border-w-e":[{"border-e":Ae()}],"border-w-t":[{"border-t":Ae()}],"border-w-r":[{"border-r":Ae()}],"border-w-b":[{"border-b":Ae()}],"border-w-l":[{"border-l":Ae()}],"divide-x":[{"divide-x":Ae()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":Ae()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[..._e(),"hidden","none"]}],"divide-style":[{divide:[..._e(),"hidden","none"]}],"border-color":[{border:A()}],"border-color-x":[{"border-x":A()}],"border-color-y":[{"border-y":A()}],"border-color-s":[{"border-s":A()}],"border-color-e":[{"border-e":A()}],"border-color-t":[{"border-t":A()}],"border-color-r":[{"border-r":A()}],"border-color-b":[{"border-b":A()}],"border-color-l":[{"border-l":A()}],"divide-color":[{divide:A()}],"outline-style":[{outline:[..._e(),"none","hidden"]}],"outline-offset":[{"outline-offset":[de,ee,Q]}],"outline-w":[{outline:["",de,Qn,cn]}],"outline-color":[{outline:A()}],shadow:[{shadow:["","none",u,zi,Vi]}],"shadow-color":[{shadow:A()}],"inset-shadow":[{"inset-shadow":["none",h,zi,Vi]}],"inset-shadow-color":[{"inset-shadow":A()}],"ring-w":[{ring:Ae()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:A()}],"ring-offset-w":[{"ring-offset":[de,cn]}],"ring-offset-color":[{"ring-offset":A()}],"inset-ring-w":[{"inset-ring":Ae()}],"inset-ring-color":[{"inset-ring":A()}],"text-shadow":[{"text-shadow":["none",f,zi,Vi]}],"text-shadow-color":[{"text-shadow":A()}],opacity:[{opacity:[de,ee,Q]}],"mix-blend":[{"mix-blend":[...Ze(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":Ze()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[de]}],"mask-image-linear-from-pos":[{"mask-linear-from":xe()}],"mask-image-linear-to-pos":[{"mask-linear-to":xe()}],"mask-image-linear-from-color":[{"mask-linear-from":A()}],"mask-image-linear-to-color":[{"mask-linear-to":A()}],"mask-image-t-from-pos":[{"mask-t-from":xe()}],"mask-image-t-to-pos":[{"mask-t-to":xe()}],"mask-image-t-from-color":[{"mask-t-from":A()}],"mask-image-t-to-color":[{"mask-t-to":A()}],"mask-image-r-from-pos":[{"mask-r-from":xe()}],"mask-image-r-to-pos":[{"mask-r-to":xe()}],"mask-image-r-from-color":[{"mask-r-from":A()}],"mask-image-r-to-color":[{"mask-r-to":A()}],"mask-image-b-from-pos":[{"mask-b-from":xe()}],"mask-image-b-to-pos":[{"mask-b-to":xe()}],"mask-image-b-from-color":[{"mask-b-from":A()}],"mask-image-b-to-color":[{"mask-b-to":A()}],"mask-image-l-from-pos":[{"mask-l-from":xe()}],"mask-image-l-to-pos":[{"mask-l-to":xe()}],"mask-image-l-from-color":[{"mask-l-from":A()}],"mask-image-l-to-color":[{"mask-l-to":A()}],"mask-image-x-from-pos":[{"mask-x-from":xe()}],"mask-image-x-to-pos":[{"mask-x-to":xe()}],"mask-image-x-from-color":[{"mask-x-from":A()}],"mask-image-x-to-color":[{"mask-x-to":A()}],"mask-image-y-from-pos":[{"mask-y-from":xe()}],"mask-image-y-to-pos":[{"mask-y-to":xe()}],"mask-image-y-from-color":[{"mask-y-from":A()}],"mask-image-y-to-color":[{"mask-y-to":A()}],"mask-image-radial":[{"mask-radial":[ee,Q]}],"mask-image-radial-from-pos":[{"mask-radial-from":xe()}],"mask-image-radial-to-pos":[{"mask-radial-to":xe()}],"mask-image-radial-from-color":[{"mask-radial-from":A()}],"mask-image-radial-to-color":[{"mask-radial-to":A()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":C()}],"mask-image-conic-pos":[{"mask-conic":[de]}],"mask-image-conic-from-pos":[{"mask-conic-from":xe()}],"mask-image-conic-to-pos":[{"mask-conic-to":xe()}],"mask-image-conic-from-color":[{"mask-conic-from":A()}],"mask-image-conic-to-color":[{"mask-conic-to":A()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:O()}],"mask-repeat":[{mask:Z()}],"mask-size":[{mask:oe()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",ee,Q]}],filter:[{filter:["","none",ee,Q]}],blur:[{blur:ve()}],brightness:[{brightness:[de,ee,Q]}],contrast:[{contrast:[de,ee,Q]}],"drop-shadow":[{"drop-shadow":["","none",d,zi,Vi]}],"drop-shadow-color":[{"drop-shadow":A()}],grayscale:[{grayscale:["",de,ee,Q]}],"hue-rotate":[{"hue-rotate":[de,ee,Q]}],invert:[{invert:["",de,ee,Q]}],saturate:[{saturate:[de,ee,Q]}],sepia:[{sepia:["",de,ee,Q]}],"backdrop-filter":[{"backdrop-filter":["","none",ee,Q]}],"backdrop-blur":[{"backdrop-blur":ve()}],"backdrop-brightness":[{"backdrop-brightness":[de,ee,Q]}],"backdrop-contrast":[{"backdrop-contrast":[de,ee,Q]}],"backdrop-grayscale":[{"backdrop-grayscale":["",de,ee,Q]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[de,ee,Q]}],"backdrop-invert":[{"backdrop-invert":["",de,ee,Q]}],"backdrop-opacity":[{"backdrop-opacity":[de,ee,Q]}],"backdrop-saturate":[{"backdrop-saturate":[de,ee,Q]}],"backdrop-sepia":[{"backdrop-sepia":["",de,ee,Q]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":k()}],"border-spacing-x":[{"border-spacing-x":k()}],"border-spacing-y":[{"border-spacing-y":k()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",ee,Q]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[de,"initial",ee,Q]}],ease:[{ease:["linear","initial",F,ee,Q]}],delay:[{delay:[de,ee,Q]}],animate:[{animate:["none",E,ee,Q]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[b,ee,Q]}],"perspective-origin":[{"perspective-origin":m()}],rotate:[{rotate:$t()}],"rotate-x":[{"rotate-x":$t()}],"rotate-y":[{"rotate-y":$t()}],"rotate-z":[{"rotate-z":$t()}],scale:[{scale:dt()}],"scale-x":[{"scale-x":dt()}],"scale-y":[{"scale-y":dt()}],"scale-z":[{"scale-z":dt()}],"scale-3d":["scale-3d"],skew:[{skew:_n()}],"skew-x":[{"skew-x":_n()}],"skew-y":[{"skew-y":_n()}],transform:[{transform:[ee,Q,"","none","gpu","cpu"]}],"transform-origin":[{origin:m()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:p()}],"translate-x":[{"translate-x":p()}],"translate-y":[{"translate-y":p()}],"translate-z":[{"translate-z":p()}],"translate-none":["translate-none"],accent:[{accent:A()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:A()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",ee,Q]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":k()}],"scroll-mx":[{"scroll-mx":k()}],"scroll-my":[{"scroll-my":k()}],"scroll-ms":[{"scroll-ms":k()}],"scroll-me":[{"scroll-me":k()}],"scroll-mt":[{"scroll-mt":k()}],"scroll-mr":[{"scroll-mr":k()}],"scroll-mb":[{"scroll-mb":k()}],"scroll-ml":[{"scroll-ml":k()}],"scroll-p":[{"scroll-p":k()}],"scroll-px":[{"scroll-px":k()}],"scroll-py":[{"scroll-py":k()}],"scroll-ps":[{"scroll-ps":k()}],"scroll-pe":[{"scroll-pe":k()}],"scroll-pt":[{"scroll-pt":k()}],"scroll-pr":[{"scroll-pr":k()}],"scroll-pb":[{"scroll-pb":k()}],"scroll-pl":[{"scroll-pl":k()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",ee,Q]}],fill:[{fill:["none",...A()]}],"stroke-w":[{stroke:[de,Qn,cn,po]}],stroke:[{stroke:["none",...A()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},Kg=Mg(Yg),Ug={__name:"CoreLayer",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object,geom:String,render:{type:String,default:"auto"},class:{type:String,default:""}},setup(e,{expose:t}){const n={svg:gg,canvas:ug},i=ie(()=>e.render=="auto"?e.data.map(a=>a.length).reduce((a,l)=>a+l,0)>1e3?"canvas":"svg":n[e.render][e.geom]!=null?e.render:"svg"),r=ie(()=>Kg(e.class,i.value=="canvas"?"cursor-default":"")),o=st("layer");return t({dispatchEvent:s=>o.value?.dispatchEvent?.(s)}),(s,a)=>(D(),ct(as(n[i.value][e.geom]),{ref_key:"layer",ref:o,data:e.data,coord2pos:e.coord2pos,"extend-x":e.extendX,"extend-y":e.extendY,layout:e.layout,class:wn(r.value)},null,8,["data","coord2pos","extend-x","extend-y","layout","class"]))}},Jg={class:"gb-interactive"},Zg=["onPointerdown"],Ql={__name:"CoreSelection",props:Wt({coord2pos:Function,pos2coord:Function,layout:Object,action:Array},{selection:{},selectionModifiers:{}}),emits:Wt(["select","selecting"],["update:selection"]),setup(e,{emit:t}){const n=ze(e,"selection"),i=ie(()=>{if(n.value==null||n.value.hidden)return{};if(["xmin","xmax","ymin","ymax"].every(b=>n.value?.[b]==null))return{};let s=10,{xmin:a,xmax:l,ymin:c,ymax:u}=e.coord2pos(n.value),h=e.coord2pos(n.value,{unlimited:!0});a!=null&&l!=null&&([a,l]=[a,l].sort((b,R)=>b-R)),c!=null&&u!=null&&([c,u]=[c,u].sort((b,R)=>b-R));let f=l-a,d=u-c,x={"":{x:a,y:c,width:f,height:d,fill:"black","fill-opacity":.1,class:"pointer-events-none"}};return e.action==null||(h.xmin!=null&&(x.l={x:a-s/2,y:c,width:s,height:d,class:"cursor-ew-resize"}),h.xmax!=null&&(x.r={x:l-s/2,y:c,width:s,height:d,class:"cursor-ew-resize"}),h.ymin!=null&&(x.t={x:a,y:c-s/2,width:f,height:s,class:"cursor-ns-resize"}),h.ymax!=null&&(x.b={x:a,y:u-s/2,width:f,height:s,class:"cursor-ns-resize"}),h.xmin!=null&&h.ymin!=null&&(x.tl={x:a-s/2,y:c-s/2,width:s,height:s,class:"cursor-nwse-resize"}),h.xmax!=null&&h.ymin!=null&&(x.tr={x:l-s/2,y:c-s/2,width:s,height:s,class:"cursor-nesw-resize"}),h.xmin!=null&&h.ymax!=null&&(x.bl={x:a-s/2,y:u-s/2,width:s,height:s,class:"cursor-nesw-resize"}),h.xmax!=null&&h.ymax!=null&&(x.br={x:l-s/2,y:u-s/2,width:s,height:s,class:"cursor-nwse-resize"})),x}),r=t;function o(s,a){if(!e.action.find(x=>x.action=="select"&&["buttons","ctrlKey","shiftKey","altKey","metaKey"].every(b=>x[b]==s[b])))return;s.stopPropagation(),s.preventDefault(),s.target.setPointerCapture(s.pointerId);let c=e.coord2pos(n.value,{unlimited:!0}),{xmin:u,xmax:h,ymin:f,ymax:d}=c;s.target.onpointermove=x=>{a.includes("l")&&u!=null&&(u+=x.movementX),a.includes("r")&&h!=null&&(h+=x.movementX),a.includes("t")&&f!=null&&(f+=x.movementY),a.includes("b")&&d!=null&&(d+=x.movementY);let[b,R]=u>h?[h,u]:[u,h],[F,E]=f>d?[d,f]:[f,d],M={xmin:b,xmax:R,ymin:F,ymax:E};r("selecting",e.pos2coord(M))},s.target.onpointerup=x=>{s.target.onpointermove=null,s.target.onpointerup=null;let[b,R]=u>h?[h,u]:[u,h],[F,E]=f>d?[d,f]:[f,d],M={xmin:b,xmax:R,ymin:F,ymax:E},C=e.pos2coord(M);n.value=C;let m=No(x);m.type="resize",Object.assign(m,C),r("selecting",null),r("select",m)}}return(s,a)=>(D(),G("g",Jg,[(D(!0),G(ue,null,Le(i.value,(l,c)=>(D(),G("rect",Pe({fill:"transparent"},{ref_for:!0},l,{onPointerdown:u=>o(u,c)}),null,16,Zg))),256))]))}},Qg=["id"],ep=["width","height"],tp=["transform"],np=["transform","clip-path"],ip=["transform"],rp={__name:"CorePlot",props:Wt({schema:Object,layers:Array,coordScale:Object,coordDisplay:Object,coordLevels:Object,levels:Object,scales:Object,axes:Object,theme:Object,action:{type:Array,default:()=>[]}},{range:{},rangeModifiers:{},selection:{},selectionModifiers:{},activeSelection:{},activeSelectionModifiers:{},translateX:{type:Number,default:0},translateXModifiers:{},translateY:{type:Number,default:0},translateYModifiers:{},transcaleX:{},transcaleXModifiers:{},transcaleY:{},transcaleYModifiers:{}}),emits:Wt(["click","dblclick","contextmenu","pointerdown","pointerup","pointerover","pointerout","pointerenter","pointerleave","pointermove","wheel","select","move","zoom","rescale","nudge","rangechange"],["update:range","update:selection","update:activeSelection","update:translateX","update:translateY","update:transcaleX","update:transcaleY"]),setup(e,{expose:t,emit:n}){const i=wh(),r=e,o=ze(e,"range"),s=ze(e,"selection"),a=n,l=pt(()=>r.axes??{}),c=pt(()=>r.theme),u=Ir(r.coordScale?.expandAdd||{});it(()=>r.coordScale,g=>{o.value=g.range,u.value=g.expandAdd},{immediate:!0});const h=ze(e,"activeSelection"),f=ze(e,"translateX"),d=ze(e,"translateY"),x=ze(e,"transcaleX"),b=ze(e,"transcaleY"),R=pt(()=>{let g=u.value.x??0;Array.isArray(g)?g={min:g[0],max:g[1]}:typeof g=="number"&&(g={min:g,max:g});let y=u.value.y??0;return Array.isArray(y)?y={min:y[0],max:y[1]}:typeof y=="number"&&(y={min:y,max:y}),{x:g,y}}),F=pt(()=>{let g=r.coordDisplay?.expandMult?.x??0;Array.isArray(g)?g={min:g[0],max:g[1]}:typeof g=="number"&&(g={min:g,max:g});let y=r.coordDisplay?.expandMult?.y??0;return Array.isArray(y)?y={min:y[0],max:y[1]}:typeof y=="number"&&(y={min:y,max:y}),{x:g,y}}),E=pt(()=>({x:r.coordDisplay?.reverse?.x??!1,y:r.coordDisplay?.reverse?.y??!1})),M=pt(()=>r.action),C=st("svg"),m=st("layers"),{width:_,height:w}=pc(C),k=ie(()=>new H2(r.schema,r.layers)),L=pt(()=>{let g=c.plot.margin.left+(l.left==null?0:c.plot.padding.left),y=c.plot.margin.right+(l.right==null?0:c.plot.padding.right),T=c.plot.margin.top+(l.top==null?0:c.plot.padding.top),N=c.plot.margin.bottom+(l.bottom==null?0:c.plot.padding.bottom);return T+N>w.value&&(T=w.value*(T/(T+N)),N=w.value-T),g+y>_.value&&(g=_.value*(g/(g+y)),y=_.value-g),{l:g,r:y,t:T,b:N,left:g,right:_.value-y,top:T,bottom:w.value-N,width:_.value-g-y,height:w.value-T-N}}),X=ie(()=>{let g=`translate(${f.value+Y.left}, ${d.value+Y.top})`,y="",T=null;return(x.value?.ratio!=null||b.value?.ratio!=null)&&(y=`scale(${x.value?.ratio??1}, ${b.value?.ratio??1})`,T=`${(x.value?.origin??.5)*L.width-Y.left} ${(b.value?.origin??.5)*L.height-Y.top}`),{transform:`${g} ${y}`,"transform-origin":T}}),B=ie(()=>k.value.useScales(r.scales,r.levels).useCoordLevels(r.coordLevels).render(o.value,R,F,l,r.coordScale.minRange));t({vplot:B});function te({x:g,y,xmin:T,xmax:N,ymin:P,ymax:H}={}){let I=B.value.coordScales,{width:$,height:q}=Y,J={};return g!=null&&(J.x=I.x.invert(E.x?1-g/$:g/$)),y!=null&&(J.y=I.y.invert(E.y?y/q:1-y/q)),E.x?(N!=null&&(J.xmin=I.x.invert(1-N/$)),T!=null&&(J.xmax=I.x.invert(1-T/$))):(T!=null&&(J.xmin=I.x.invert(T/$)),N!=null&&(J.xmax=I.x.invert(N/$))),E.y?(H!=null&&(J.ymax=I.y.invert(H/q)),P!=null&&(J.ymin=I.y.invert(P/q))):(P!=null&&(J.ymax=I.y.invert(1-P/q)),H!=null&&(J.ymin=I.y.invert(1-H/q))),J}function U({x:g,y,xmin:T,xmax:N,ymin:P,ymax:H}={},{unlimited:I=!1,oob:$=Z}={}){let q=B.value.coordScales,{l:J,r:le,t:se,b:fe,width:ge,height:Ee}=Y,pe={},gt={min:-J,max:ge+le},Kt={min:-se,max:Ee+fe};return g!=null&&(pe.x=$(ge*(E.x?1-q.x(g):q.x(g)),gt)),y!=null&&(pe.y=$(Ee*(E.y?q.y(y):1-q.y(y)),Kt)),[T,N,P,H].every(Qe=>Qe==null)||(E.x?(N!=null&&(pe.xmin=$(ge*(1-q.x(N)),gt)),T!=null&&(pe.xmax=$(ge*(1-q.x(T)),gt))):(T!=null&&(pe.xmin=$(ge*q.x(T),gt)),N!=null&&(pe.xmax=$(ge*q.x(N),gt))),E.y?(P!=null&&(pe.ymin=$(Ee*q.y(P),Kt)),H!=null&&(pe.ymax=$(Ee*q.y(H),Kt))):(H!=null&&(pe.ymin=$(Ee*(1-q.y(H)),Kt)),P!=null&&(pe.ymax=$(Ee*(1-q.y(P)),Kt))),I||(pe.xmin==null&&(pe.xmin=-J),pe.xmax==null&&(pe.xmax=ge+le),pe.ymin==null&&(pe.ymin=-se),pe.ymax==null&&(pe.ymax=Ee+fe))),pe}function me({min:g,max:y}={},{min:T=0,max:N=0}={}){let P=y-g,H=g-T*P,I=y+N*P,$=I-H;return{min:$==0?0:(g-H)/$,max:$==0?0:(I-y)/$}}const Y=pt(()=>{let g=B.value.coordScales,y=F,{min:T,max:N}=me(g.x.range,y.x),{min:P,max:H}=me(g.y.range,y.y),{width:I,height:$}=L;return{left:I*T||0,right:I*(1-N)||0,top:$*H||0,bottom:$*(1-P)||0,l:I*T||0,r:I*N||0,t:$*H||0,b:$*P||0,width:I*(1-T-N),height:$*(1-H-P),fullWidth:I,fullHeight:$}});function K(g,y){y=y||g.currentTarget;let T=y.getBoundingClientRect();return te({x:g.clientX-(T.left+L.left+Y.left),y:g.clientY-(T.top+L.top+Y.top)})}function S(g,y){y=y||g.currentTarget;let T=y.getBoundingClientRect();return{l:g.clientX-(T.left+L.left+Y.left),t:g.clientY-(T.top+L.top+Y.top),r:T.left+L.left+Y.right-g.clientX,b:T.top+L.top+Y.bottom-g.clientY}}function A(g){let y=C.value.getBoundingClientRect();return g.clientX>y.left+L.l&&g.clientX<y.right-L.r&&g.clientY>y.top+L.t&&g.clientY<y.bottom-L.b}function O(g,{min:y,max:T}){return g<y?y:g>T?T:g}function Z(g,{min:y,max:T}){return g==-1/0?y:g==1/0?T:g}let oe;function be(g){if(!A(g))return;let y=K(g);a("pointerdown",g,y);let T=g.currentTarget,N=!1;function P($){N=N||Math.abs($.screenX-g.screenX)>3||Math.abs($.screenY-g.screenY)>3}function H($){$.preventDefault(),g.target.removeEventListener("pointermove",P),g.target.removeEventListener("pointerup",H),N||($.button==2&&a("contextmenu",$,K($)),$.button==0&&(a("click",$,K($)),A(g)&&m.value.forEach(q=>q.dispatchEvent(new PointerEvent("click",$))))),T.style.userSelect=null}g.target.addEventListener("pointermove",P,{passive:!0}),g.target.addEventListener("pointerup",H);let I=r.action.find($=>["move","select"].includes($.action)&&["buttons","ctrlKey","shiftKey","altKey","metaKey"].every(q=>$[q]==g[q]));if(I){if(T.style.userSelect="none",g.target.setPointerCapture(g.pointerId),I.action=="select")g.target.onpointermove=$=>{let{x:q=!1,y:J=!1}=I,le=K($,T);(q||J)&&(h.value={xmin:q?Math.min(y.x,le.x):void 0,xmax:q?Math.max(y.x,le.x):void 0,ymin:J?Math.min(y.y,le.y):void 0,ymax:J?Math.max(y.y,le.y):void 0})},g.target.onpointerup=$=>{$.currentTarget.onpointerup=null,$.currentTarget.onpointermove=null;let{x:q=!1,y:J=!1,once:le=!1}=I;if(h.value=null,N&&(q||J)){let se=K($,T),fe=No($);fe.type="select",q&&(fe.xstart=y.x,fe.xend=se.x,fe.xmin=Math.min(y.x,se.x),fe.xmax=Math.max(y.x,se.x)),J&&(fe.ystart=y.y,fe.yend=se.y,fe.ymin=Math.min(y.y,se.y),fe.ymax=Math.max(y.y,se.y)),le||(s.value={xmin:fe.xmin,xmax:fe.xmax,ymin:fe.ymin,ymax:fe.ymax}),a("select",fe)}if(!N&&I.dismissible){s.value={};let se=No($);se.type="cancel",a("select",se)}};else if(I.action=="move"){oe=clearTimeout(oe);let $=U(I,{unlimited:!0}),q={min:$.xmax==null?-1/0:Y.width-$.xmax,max:$.xmin==null?1/0:-$.xmin},J={min:$.ymax==null?-1/0:Y.height-$.ymax,max:$.ymin==null?1/0:-$.ymin};g.target.onpointermove=le=>{let{x:se=!1,y:fe=!1}=I;se&&(f.value=O(f.value+le.movementX,q)),fe&&(d.value=O(d.value+le.movementY,J))},g.target.onpointerup=le=>{le.currentTarget.onpointerup=null,le.currentTarget.onpointermove=null,oe=setTimeout(()=>re(I,le),300)}}}}function re(g,y){if(x.value!=null||f.value!=0||b.value!=null||b.value!=0){let T,N,P,H;if(g.x){if(T=0,P=Y.width,x.value){let I=x.value.ratio,$=x.value.origin*L.width-Y.l;T=T/I+(1-1/I)*$,P=P/I+(1-1/I)*$}f.value&&(T-=f.value,P-=f.value)}if(g.y){if(N=0,H=Y.height,b.value){let I=b.value.ratio,$=b.value.origin*L.height-Y.t;N=N/I+(1-1/I)*$,H=H/I+(1-1/I)*$}d.value&&(N-=d.value,H-=d.value)}W(te({xmin:T,xmax:P,ymin:N,ymax:H}),g.action,y)}f.value=d.value=0,x.value=b.value=null}let Ae=0,_e;function Ze(g){if(!A(g))return;let y=M.find(T=>["zoom","nudge"].includes(T.action)&&["ctrlKey","shiftKey","altKey","metaKey"].every(N=>T[N]==g[N]));!y||!y.x&&!y.y||(_e=clearTimeout(_e),g.preventDefault(),a("wheel",g,K(g)),Ae+=g.deltaY,xe(y,S(g),Ae),_e=setTimeout(()=>{re(y,g),Ae=0},300))}function xe(g,y,T){if(g.action=="zoom"){let{x:N=!1,y:P=!1,"min-range-x":H=0,"min-range-y":I=0,sensitivity:$=1.25}=g;$=$**(Ae/100);let q=U(g,{unlimited:!0}),J,le,se,fe;if(N){if(J=Math.max(y.l-y.l*$,q.xmin??-1/0),le=Math.min(y.l+y.r*$,q.xmax??1/0),$<1){let ge=te({xmin:J,xmax:le}),Ee=ge.xmax-ge.xmin,pe=(ge.xmax+ge.xmin)/2;Ee<H&&(ge.xmin=pe-H/2,ge.xmax=pe+H/2),{xmin:J,xmax:le}=U(ge)}Math.abs(Y.width-(le-J))>1&&(x.value={ratio:Y.width/(le-J),origin:(Y.l+J*Y.width/(Y.width-le+J))/L.width})}if(P){if(se=Math.max(y.t-y.t*$,q.ymin??-1/0),fe=Math.min(y.t+y.b*$,q.ymax??1/0),$<1){let ge=te({ymin:se,ymax:fe}),Ee=ge.ymax-ge.ymin,pe=(ge.ymax+ge.ymin)/2;Ee<I&&(ge.ymin=pe-I/2,ge.ymax=pe+I/2),{ymin:se,ymax:fe}=U(ge)}Math.abs(Y.height-(fe-se))>1&&(b.value={ratio:Y.height/(fe-se),origin:(Y.t+se*Y.height/(Y.height-fe+se))/L.height})}}if(g.action=="nudge"){let{x:N=!1,y:P=!1,sensitivity:H=.1}=g,I=U(g,{unlimited:!0});if(N){let $=H*Y.width*(-T/120),q={min:I.xmax==null?-1/0:Y.width-I.xmax,max:I.xmin==null?1/0:-I.xmin};f.value=O($,q)}if(P){let $=H*Y.height*(-T/120),q={min:I.ymax==null?-1/0:Y.height-I.ymax,max:I.ymin==null?1/0:-I.ymin};d.value=O($,q)}}}function ve(g){a("pointerup",g,K(g))}function $t(g){a("pointerover",g,K(g))}function dt(g){a("pointerout",g,K(g))}function _n(g){a("pointerenter",g,K(g))}function p(g){a("pointerleave",g,K(g))}function v(g){a("dblclick",g,K(g))}function W(g,y="rescale",T){let N=!1,P={};for(const H of["xmin","xmax","ymin","ymax"])g[H]==null?P[H]=o.value[H]:(P[H]=g[H],P[H]!=o.value[H]&&(N=!0));N&&(u.value={x:0,y:0},o.value=P,a(y,g,T),a("rangechange",P))}const z=ie(()=>({right:`translate(${L.width}, 0)`,bottom:`translate(0, ${L.height})`})),j=ie(()=>{let g=B.value.axes;return{x:{majorBreaks:Ei(Object.values(g.x).flatMap(y=>y.majorBreaks)),minorBreaks:Ei(Object.values(g.x).flatMap(y=>y.minorBreaks))},y:{majorBreaks:Ei(Object.values(g.y).flatMap(y=>y.majorBreaks)),minorBreaks:Ei(Object.values(g.y).flatMap(y=>y.minorBreaks))}}});return(g,y)=>(D(),G("svg",{ref:"svg",width:"100%",height:"100%",onWheel:Ze,onPointerdown:be,onPointerup:ve,onPointerover:$t,onPointerout:dt,onPointerenter:_n,onPointerleave:p,onDblclick:v,onClick:y[16]||(y[16]=(...T)=>g.svgClick&&g.svgClick(...T)),onDragstart:y[17]||(y[17]=ll(()=>{},["prevent"])),onContextmenu:y[18]||(y[18]=ll(()=>{},["prevent"]))},[ae("defs",null,[ae("clipPath",{id:`${V(i)}-plot-clip`},[ae("rect",{x:"0",y:"0",width:V(L).width,height:V(L).height},null,8,ep)],8,Qg)]),ae("g",{transform:`translate(${V(L).left}, ${V(L).top})`},[V(c).grid.x?(D(),ct(og,Pe({key:0},j.value.x,{layout:V(Y),theme:V(c).grid.x,translate:f.value,transcale:x.value,coord2pos:U}),null,16,["layout","theme","translate","transcale"])):ht("",!0),V(c).grid.y?(D(),ct(sg,Pe({key:1},j.value.y,{layout:V(Y),theme:V(c).grid.y,translate:d.value,transcale:b.value,coord2pos:U}),null,16,["layout","theme","translate","transcale"])):ht("",!0)],8,tp),ae("g",{transform:`translate(${V(L).left}, ${V(L).top})`,"clip-path":`url(#${V(i)}-plot-clip)`},[ae("g",Qo(zr(X.value)),[(D(!0),G(ue,null,Le(B.value.layers,T=>(D(),ct(Ug,Pe({ref_for:!0,ref_key:"layers",ref:m,data:T.data},{ref_for:!0},T.vBind,{layout:V(Y),geom:T.geom,coord2pos:U}),null,16,["data","layout","geom"]))),256)),ne(Ql,{selection:s.value,"onUpdate:selection":y[0]||(y[0]=T=>s.value=T),coord2pos:U,pos2coord:te,layout:V(Y),onSelect:y[1]||(y[1]=T=>a("select",T)),onSelecting:y[2]||(y[2]=T=>h.value=T),action:r.action},null,8,["selection","layout","action"]),ne(Ql,{selection:h.value,"onUpdate:selection":y[3]||(y[3]=T=>h.value=T),coord2pos:U,pos2coord:te,layout:V(Y)},null,8,["selection","layout"])],16)],8,np),ae("g",{transform:`translate(${V(L).left}, ${V(L).top})`},[(D(!0),G(ue,null,Le(B.value.axes.x,(T,N)=>(D(),ct(Hl,{title:T.title,ticks:T.ticks,layout:V(Y),theme:V(c).axis[N],transform:z.value[N],action:T.action,translate:f.value,"onUpdate:translate":y[4]||(y[4]=P=>f.value=P),transcale:x.value,"onUpdate:transcale":y[5]||(y[5]=P=>x.value=P),coord2pos:U,pos2coord:te,onZoom:y[6]||(y[6]=P=>W(P,"zoom")),onMove:y[7]||(y[7]=P=>W(P,"move")),onRescale:y[8]||(y[8]=P=>W(P,"rescale")),onNudge:y[9]||(y[9]=P=>W(P,"nudge"))},null,8,["title","ticks","layout","theme","transform","action","translate","transcale"]))),256)),(D(!0),G(ue,null,Le(B.value.axes.y,(T,N)=>(D(),ct(Hl,{title:T.title,ticks:T.ticks,layout:V(Y),theme:V(c).axis[N],transform:z.value[N],action:T.action,translate:d.value,"onUpdate:translate":y[10]||(y[10]=P=>d.value=P),transcale:b.value,"onUpdate:transcale":y[11]||(y[11]=P=>b.value=P),coord2pos:U,pos2coord:te,onZoom:y[12]||(y[12]=P=>W(P,"zoom")),onMove:y[13]||(y[13]=P=>W(P,"move")),onRescale:y[14]||(y[14]=P=>W(P,"rescale")),onNudge:y[15]||(y[15]=P=>W(P,"nudge"))},null,8,["title","ticks","layout","theme","transform","action","translate","transcale"]))),256))],8,ip)],544))}},op=["height","width"],sp=["transform"],lp=["fill"],ap=["stroke","stroke-width","stroke-opacity","stroke-dasharray"],cp=["r","fill","stroke","stroke-width","stroke-opacity","fill-opacity"],up=["fill","stroke","stroke-width","stroke-opacity","fill-opacity"],hp={x:"20",y:"10","alignment-baseline":"central"},fp=Object.assign({inheritAttrs:!1},{__name:"CoreLegend",props:{scale:Function,geom:{type:Array,default:()=>[]},breaks:Array},setup(e){const t=ie(()=>{if(e.scale==null)return[];if(e.scale.level){let l=Array.from(e.scale.level);return l.level=e.scale.level,l.extent=e.scale.extent,l}else{let l=5,c=new Array(l).fill(0).map((u,h)=>(e.scale.extent.max-e.scale.extent.min)*h/l+e.scale.extent.min);return c.extent=e.scale.extent,c}}),n=ie(()=>e.scale(t.value).map((l,c)=>({[e.scale.aesthetics]:l,label:String(t.value[c])}))),i=ie(()=>({text:["text"].some(l=>e.geom.includes(l)),line:["line","linerange"].some(l=>e.geom.includes(l)),circle:["point"].some(l=>e.geom.includes(l)),rect:["rect","tile","polygon"].some(l=>e.geom.includes(l))}));function r(l){return l==null||l==="solid"?null:l==="dashed"?"4 4":l==="dotted"?"1 3":l==="dotdash"?"1 3 4 3":l==="longdash"?"8 4":l==="twodash"?"2 2 6 2":l.includes(" ")?l:l.split("").map(c=>+("0x"+c)).join(" ")}const o=Ba();ie(()=>Object.fromEntries(Object.entries(o).filter(([l,c])=>l.startsWith("on"))));const s=Ir(0),a=st("svg");return it(n,async()=>{await Rr();let l=a.value?.getBBox?.();l&&(s.value=l.width+l.x)},{immediate:!0}),(l,c)=>(D(),G(ue,null,[Xn(Fe(e.scale.title)+" ",1),(D(),G("svg",{height:n.value.length*20,width:s.value,ref:"svg"},[(D(!0),G(ue,null,Le(n.value,(u,h)=>(D(),G("g",{transform:`translate(0, ${h*20})`},[i.value.text?(D(),G("text",{key:0,x:"10",y:"10",fill:u.color,"alignment-baseline":"central","text-anchor":"middle"},"a",8,lp)):ht("",!0),i.value.line?(D(),G("line",{key:1,stroke:u.color??"black",x1:5,x2:15,y1:10,y2:10,"stroke-width":u.linewidth??1,"stroke-opacity":u.alpha,"stroke-dasharray":r(u.linetype)},null,8,ap)):ht("",!0),i.value.circle?(D(),G("circle",{key:2,cx:"10",cy:"10",r:(u.size??6)/2,fill:u.color??"none",stroke:u.stroke,"stroke-width":u.linewidth,"stroke-opacity":u.alpha,"fill-opacity":u.alpha},null,8,cp)):ht("",!0),i.value.rect?(D(),G("rect",{key:3,x:"5",y:"5",width:"10",height:"10",fill:u.fill,stroke:u.color,"stroke-width":u.linewidth,"stroke-opacity":u.alpha,"fill-opacity":u.alpha},null,8,up)):ht("",!0),ae("text",hp,Fe(u.label),1)],8,sp))),256))],8,op))],64))}}),Zt={$_type:"action",$_props:{}},dp={$_type:"layer"},xu={$_props:{geom:"tile",stat:"bar"},$_type:"layer"},bu={$_props:{geom:"rect",stat:"histogram"},$_type:"layer",$_argnames:["bins","binwidth","breaks"]},Pr={$_props:{geom:"line",stat:"line"},$_type:"layer",$_argnames:["orientation"]},mp={$_props:{geom:"line",stat:"linerange"},$_type:"layer"},wu={$_props:{geom:"line",stat:"path"},$_type:"layer"},Vn={$_props:{geom:"point",stat:"point"},$_type:"layer"},vu={$_props:{geom:"polygon",stat:"polygon"},$_type:"layer"},gp={$_props:{geom:"rect",stat:"rect"},$_type:"layer"},Su={$_props:{geom:"line",stat:"segment"},$_type:"layer"},pp={$_props:{geom:"stick",stat:"stick"},$_type:"layer"},Yo={$_props:{geom:"text",stat:"text"},$_type:"layer"},yp={$_props:{geom:"textsegment",stat:"textsegment"},$_type:"layer"},_u={$_props:{geom:"tile",stat:"tile"},$_type:"layer"},xp=Object.freeze(Object.defineProperty({__proto__:null,VVGeom:dp,VVGeomBar:xu,VVGeomHistogram:bu,VVGeomLine:Pr,VVGeomLinerange:mp,VVGeomPath:wu,VVGeomPoint:Vn,VVGeomPolygon:vu,VVGeomRect:gp,VVGeomSegment:Su,VVGeomStick:pp,VVGeomText:Yo,VVGeomTextsegment:yp,VVGeomTile:_u},Symbol.toStringTag,{value:"Module"})),bp={$_type:"axis",$_props:{}},bn={$_type:"axis",$_props:{type:"x",position:"bottom"}},rn={$_type:"axis",$_props:{type:"y",position:"left"}},wp=Object.freeze(Object.defineProperty({__proto__:null,VVAxis:bp,VVAxisX:bn,VVAxisY:rn},Symbol.toStringTag,{value:"Module"})),vp={class:"absolute right-4 top-4 flex flex-row"},at=Object.assign({inheritAttrs:!1},{__name:"Plot",props:Wt({width:Number,height:Number,data:Array,scales:Object,aes:Object,axes:Object,expandAdd:Object,expandMult:Object,levels:Object,range:Object,theme:{type:Object,default:()=>kc},resize:null,legendTeleport:null},{selection:{},selectionModifiers:{},activeSelection:{},activeSelectionModifiers:{},translateX:{},translateXModifiers:{},translateY:{},translateYModifiers:{},transcaleX:{},transcaleXModifiers:{},transcaleY:{},transcaleYModifiers:{}}),emits:Wt(["resize"],["update:selection","update:activeSelection","update:translateX","update:translateY","update:transcaleX","update:transcaleY"]),setup(e,{emit:t}){const n={...xp,...wp,VVAction:Zt},i=t,r=e;function o(S){return S==null?[]:S.flatMap(A=>A.type==ue?o(A.children):A.type=="template"?o(A.children).map(O=>(O.props={...O.props,...A.props},O)):A)}function s(S){return{props:Object.fromEntries(S.props.map(O=>{try{if(O.type==7)return[O.arg.content,new Function("return "+O.exp.content)()];if(O.type==6)return[O.name,O.value?.content??""]}catch{}}).filter(O=>O!=null)),children:S.children.map(O=>()=>[s(O)]),type:n[S.tag]}}const a=Ih(),l=Ba(),c=pt(()=>{let S=Object.keys(a).filter(O=>O!="toolbar").flatMap(O=>o(a[O]())).flatMap(O=>O.type?.template?A1(O.type.template,{decodeEntities:!0}).children.map(oe=>s(oe)):O).filter(O=>O!=null),A=Object.groupBy(S.filter(O=>O.type.$_type!=null),O=>O.type.$_type);return A.axis=A.axis??[],A.layer=A.layer??[],A.action=A.action??[],A}),u=ie(()=>{let S={},A={};for(let Z in l)typeof l[Z]=="function"&&Z.startsWith("on")?Array.isArray(S[Z])?S[Z].push(l[Z]):S[Z]=[l[Z]]:A[Z]=l[Z];let O=c.axis.filter(Z=>Z.children).flatMap(Z=>Object.keys(Z.children).filter(oe=>typeof Z.children[oe]=="function").flatMap(oe=>o(Z.children[oe]()))).concat(c.axis).concat(c.action);for(let Z of O)for(let oe in Z.props)typeof Z.props[oe]=="function"&&oe.startsWith("on")&&(Array.isArray(S[oe])?S[oe].push(Z.props[oe]):S[oe]=[Z.props[oe]]);return{plot:S,wrapper:A}}),h=pt(()=>{let S=c.axis.map(A=>({...A.type.$_props,...A.props}));return{x:S.find(A=>A.type==="x"&&!("secondary"in A)),y:S.find(A=>A.type==="y"&&!("secondary"in A))}}),f=ze(e,"selection"),d=ze(e,"activeSelection"),x=ze(e,"translateX"),b=ze(e,"translateY"),R=ze(e,"transcaleX"),F=ze(e,"transcaleY"),E=ie(()=>({data:r.data,aes:r.aes})),M=ie(()=>c.layer.map(S=>{let{geom:A,stat:O,scales:Z,data:oe,...be}={...S.type.$_props,...S.props},re=S.type.$_argnames||[],Ae={},_e={},Ze={},xe={};for(let ve in be)ve!="key"&&(re.includes(ve)?_e[ve]=be[ve]:typeof be[ve]=="function"?ve.startsWith("on")?xe[ve]==null?xe[ve]=be[ve]:Array.isArray(xe[ve])?xe[ve].push(_e[ve]):xe[ve]=[xe[ve],_e[ve]]:Ae[ve]=be[ve]:["class","style","render","extend-x","extend-y"].includes(ve)?xe[ve]=be[ve]:Ze[ve]=be[ve]);return{geom:A,stat:O,data:oe,aes:Ae,attrs:Ze,scales:Z,args:_e,vBind:xe}})),C=ie(()=>(({x:S,y:A,...O})=>({...O}))(r.levels??{})),m=ie(()=>{let S={};for(let A of["x","y"])if(h[A]){let O=h[A];S[A]=O.levels??r.levels?.[A]}return S}),_=ie(()=>{let S={},A={x:0,y:0},O={x:1,y:1};for(let Z of["x","y"])if(h[Z]){let oe=h[Z];S[Z+"min"]=oe.min??oe.limits?.min??oe.limits?.[0],S[Z+"max"]=oe.max??oe.limits?.max??oe.limits?.[1],Number.isNaN(S[Z+"min"])&&(S[Z+"min"]=null),Number.isNaN(S[Z+"max"])&&(S[Z+"max"]=null);let be=m.value[Z];be!=null&&(S[Z+"min"]=(S[Z+"min"]??0)-.5,S[Z+"max"]=(S[Z+"max"]??be.length??Math.max(Object.values(be)))-.5),A[Z]=oe["expand-add"]??0,O[Z]=oe["min-range"]??1}return{range:{...r.range,...S},minRange:{...r.minRange,...O},expandAdd:{...r.expandAdd,...A}}}),w=ie(()=>{let S={x:.05,y:.05},A={x:!1,y:!1};for(let O of["x","y"])if(h[O]){let Z=h[O];A[O]=Z.reverse===""||Z.reverse==!0,S[O]=Z["expand-mult"]??.05}return{reverse:{...r.reverse,...A},expandMult:{...r.expandMult,...S}}}),k={left:1,right:2,middle:4,X1:8,X2:16},L=ie(()=>{let S={},A={},O={x:!1,y:!1};for(let Z of c.axis){let oe={...Z.type.$_props,...Z.props};if(!(oe.type in O)){console.warn(`Axis type ${oe.type} not found in axes prop`);continue}if(O[oe.type]=!0,oe.position=="none")continue;let be=(({title:re,breaks:Ae,labels:_e,"minor-breaks":Ze})=>({title:re,breaks:Ae,labels:_e,minorBreaks:Ze}))(oe);be.showGrid=oe["show-grid"]!==!1,Z.children&&(be.action=Object.keys(Z.children).filter(re=>typeof Z.children[re]=="function").flatMap(re=>o(Z.children[re]())).map(re=>({...re.type.$_props,...re.props})).flatMap(re=>{let Ae=[];for(let _e of["move","nudge","zoom","rescale"])!re[_e]&&re[_e]!=""||Ae.push({action:_e,[oe.type+"min"]:re[_e].min??re.min,[oe.type+"max"]:re[_e].max??re.max,["min-range-"+oe.type]:re[_e]["min-range"]??re["min-range"],ctrlKey:!!(re[_e].ctrl??(re.ctrl||re.ctrl==="")),shiftKey:!!(re[_e].shift??(re.shift||re.shift==="")),altKey:!!(re[_e].alt??(re.alt||re.alt==="")),metaKey:!!(re[_e].meta??(re.meta||re.meta==="")),buttons:re[_e].buttons??k[re[_e].button]??re.buttons??k[re.button]??1});return Ae})),oe.type=="x"&&(S[oe.position??"bottom"]=be),oe.type=="y"&&(A[oe.position??"left"]=be)}return O.x||(S.bottom={showGrid:!0}),O.y||(A.left={showGrid:!0}),{...r.axes,...S,...A}}),X=ie(()=>c.action.map(S=>({...S.type.$_props,...S.props})).flatMap(S=>{let A=[];for(let O of["select","move","nudge","zoom"])!S[O]&&S[O]!=""||A.push({action:O,once:S[O].once??S.once,dismissible:(S[O].dismissible??S.dismissible)!==!1,x:!!(S[O].x??(S.x||S.x==="")),y:!!(S[O].y??(S.y||S.y==="")),xmin:S[O].xmin??S.xmin,xmax:S[O].xmax??S.xmax,ymin:S[O].ymin??S.ymin,ymax:S[O].ymax??S.ymax,"min-range-x":S[O]["min-range-x"]??S["min-range-x"],"min-range-y":S[O]["min-range-y"]??S["min-range-y"],ctrlKey:!!(S[O].ctrl??(S.ctrl||S.ctrl==="")),shiftKey:!!(S[O].shift??(S.shift||S.shift==="")),altKey:!!(S[O].alt??(S.alt||S.alt==="")),metaKey:!!(S[O].meta??(S.meta||S.meta==="")),buttons:S[O].buttons??k[S[O].button]??S.buttons??k[S.button]??1});return A})),B=pt(()=>C1(_c,r.theme)),te=st("wrapper"),U=st("plot");jr(()=>{it(()=>r.width,S=>{te.value.style.width=xl(S,"px")},{immediate:!0}),it(()=>r.height,S=>{te.value.style.height=xl(S,"px")},{immediate:!0})});const{width:me,height:Y}=pc(U);it([me,Y],([S,A])=>{S>0&&A>0&&i("resize",{width:S,height:A})});const K=ie(()=>r.resize=="x"?["resize-x","overflow-auto"]:r.resize=="y"?["resize-y","overflow-auto"]:r.resize==!0||r.resize=="both"||r.resize==""?["resize","overflow-auto"]:[]);return(S,A)=>(D(),G("div",Pe({ref:"wrapper",class:["vvplot relative overflow-hidden",K.value]},u.value.wrapper),[ne(rp,Pe({ref:"plot",schema:E.value,layers:M.value,"coord-scale":_.value,"coord-display":w.value,"coord-levels":m.value,levels:C.value,scales:r.scales,axes:L.value,theme:V(B),selection:f.value,"onUpdate:selection":A[0]||(A[0]=O=>f.value=O),"active-selection":d.value,"onUpdate:activeSelection":A[1]||(A[1]=O=>d.value=O),"transcale-x":R.value,"onUpdate:transcaleX":A[2]||(A[2]=O=>R.value=O),"transcale-y":F.value,"onUpdate:transcaleY":A[3]||(A[3]=O=>F.value=O),"translate-x":x.value,"onUpdate:translateX":A[4]||(A[4]=O=>x.value=O),"translate-y":b.value,"onUpdate:translateY":A[5]||(A[5]=O=>b.value=O)},u.value.plot,{action:X.value}),null,16,["schema","layers","coord-scale","coord-display","coord-levels","levels","scales","axes","theme","selection","active-selection","transcale-x","transcale-y","translate-x","translate-y","action"]),ae("div",vp,[Rs(S.$slots,"toolbar")]),Rs(S.$slots,"tooltip"),e.legendTeleport?(D(),ct(xh,{key:0,to:e.legendTeleport},[ae("div",{class:"flex flex-col",style:ki({gap:V(B).legend.spacing+"px"})},[(D(!0),G(ue,null,Le(U.value?.vplot?.scales,([O,Z])=>(D(),ct(fp,{geom:Array.from(Z),scale:O},null,8,["geom","scale"]))),256))],4)],8,["to"])):ht("",!0)],16))}}),zn=JSON.parse('[{"Sepal_Length":5.1,"Sepal_Width":3.5,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.7,"Sepal_Width":3.2,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.6,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.9,"Petal_Length":1.7,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.4,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.4,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.4,"Sepal_Width":2.9,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3.4,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3,"Petal_Length":1.4,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":4.3,"Sepal_Width":3,"Petal_Length":1.1,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":5.8,"Sepal_Width":4,"Petal_Length":1.2,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.7,"Sepal_Width":4.4,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.9,"Petal_Length":1.3,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.5,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.7,"Sepal_Width":3.8,"Petal_Length":1.7,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.8,"Petal_Length":1.5,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.4,"Petal_Length":1.7,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.6,"Petal_Length":1,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.3,"Petal_Length":1.7,"Petal_Width":0.5,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3.4,"Petal_Length":1.9,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.4,"Petal_Length":1.6,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.2,"Sepal_Width":3.5,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.2,"Sepal_Width":3.4,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.7,"Sepal_Width":3.2,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3.1,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.4,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.2,"Sepal_Width":4.1,"Petal_Length":1.5,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":5.5,"Sepal_Width":4.2,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.2,"Petal_Length":1.2,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.5,"Sepal_Width":3.5,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3.6,"Petal_Length":1.4,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":4.4,"Sepal_Width":3,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.4,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.5,"Petal_Length":1.3,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":4.5,"Sepal_Width":2.3,"Petal_Length":1.3,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":4.4,"Sepal_Width":3.2,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.5,"Petal_Length":1.6,"Petal_Width":0.6,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.8,"Petal_Length":1.9,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.8,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.2,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.3,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.3,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":7,"Sepal_Width":3.2,"Petal_Length":4.7,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":6.4,"Sepal_Width":3.2,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6.9,"Sepal_Width":3.1,"Petal_Length":4.9,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.3,"Petal_Length":4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.5,"Sepal_Width":2.8,"Petal_Length":4.6,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.8,"Petal_Length":4.5,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":3.3,"Petal_Length":4.7,"Petal_Width":1.6,"Species":"versicolor"},{"Sepal_Length":4.9,"Sepal_Width":2.4,"Petal_Length":3.3,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":6.6,"Sepal_Width":2.9,"Petal_Length":4.6,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.2,"Sepal_Width":2.7,"Petal_Length":3.9,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5,"Sepal_Width":2,"Petal_Length":3.5,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.9,"Sepal_Width":3,"Petal_Length":4.2,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":2.2,"Petal_Length":4,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":2.9,"Petal_Length":4.7,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":2.9,"Petal_Length":3.6,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.7,"Sepal_Width":3.1,"Petal_Length":4.4,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":3,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":4.1,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":6.2,"Sepal_Width":2.2,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":2.5,"Petal_Length":3.9,"Petal_Width":1.1,"Species":"versicolor"},{"Sepal_Length":5.9,"Sepal_Width":3.2,"Petal_Length":4.8,"Petal_Width":1.8,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":2.8,"Petal_Length":4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":2.5,"Petal_Length":4.9,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":2.8,"Petal_Length":4.7,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":6.4,"Sepal_Width":2.9,"Petal_Length":4.3,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.6,"Sepal_Width":3,"Petal_Length":4.4,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":6.8,"Sepal_Width":2.8,"Petal_Length":4.8,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":6.7,"Sepal_Width":3,"Petal_Length":5,"Petal_Width":1.7,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":2.9,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.6,"Petal_Length":3.5,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.4,"Petal_Length":3.8,"Petal_Width":1.1,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.4,"Petal_Length":3.7,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":3.9,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":2.7,"Petal_Length":5.1,"Petal_Width":1.6,"Species":"versicolor"},{"Sepal_Length":5.4,"Sepal_Width":3,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":3.4,"Petal_Length":4.5,"Petal_Width":1.6,"Species":"versicolor"},{"Sepal_Length":6.7,"Sepal_Width":3.1,"Petal_Length":4.7,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":2.3,"Petal_Length":4.4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":3,"Petal_Length":4.1,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.5,"Petal_Length":4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.6,"Petal_Length":4.4,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":3,"Petal_Length":4.6,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5.8,"Sepal_Width":2.6,"Petal_Length":4,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":5,"Sepal_Width":2.3,"Petal_Length":3.3,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":2.7,"Petal_Length":4.2,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":3,"Petal_Length":4.2,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.9,"Petal_Length":4.2,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.2,"Sepal_Width":2.9,"Petal_Length":4.3,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.1,"Sepal_Width":2.5,"Petal_Length":3,"Petal_Width":1.1,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.8,"Petal_Length":4.1,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":3.3,"Petal_Length":6,"Petal_Width":2.5,"Species":"virginica"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":5.1,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":7.1,"Sepal_Width":3,"Petal_Length":5.9,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.9,"Petal_Length":5.6,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3,"Petal_Length":5.8,"Petal_Width":2.2,"Species":"virginica"},{"Sepal_Length":7.6,"Sepal_Width":3,"Petal_Length":6.6,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":4.9,"Sepal_Width":2.5,"Petal_Length":4.5,"Petal_Width":1.7,"Species":"virginica"},{"Sepal_Length":7.3,"Sepal_Width":2.9,"Petal_Length":6.3,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":2.5,"Petal_Length":5.8,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":7.2,"Sepal_Width":3.6,"Petal_Length":6.1,"Petal_Width":2.5,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3.2,"Petal_Length":5.1,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":2.7,"Petal_Length":5.3,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":6.8,"Sepal_Width":3,"Petal_Length":5.5,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":5.7,"Sepal_Width":2.5,"Petal_Length":5,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":5.8,"Sepal_Width":2.8,"Petal_Length":5.1,"Petal_Width":2.4,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":3.2,"Petal_Length":5.3,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3,"Petal_Length":5.5,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":3.8,"Petal_Length":6.7,"Petal_Width":2.2,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":2.6,"Petal_Length":6.9,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6,"Sepal_Width":2.2,"Petal_Length":5,"Petal_Width":1.5,"Species":"virginica"},{"Sepal_Length":6.9,"Sepal_Width":3.2,"Petal_Length":5.7,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":5.6,"Sepal_Width":2.8,"Petal_Length":4.9,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":2.8,"Petal_Length":6.7,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.7,"Petal_Length":4.9,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3.3,"Petal_Length":5.7,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":7.2,"Sepal_Width":3.2,"Petal_Length":6,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.2,"Sepal_Width":2.8,"Petal_Length":4.8,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.1,"Sepal_Width":3,"Petal_Length":4.9,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":2.8,"Petal_Length":5.6,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":7.2,"Sepal_Width":3,"Petal_Length":5.8,"Petal_Width":1.6,"Species":"virginica"},{"Sepal_Length":7.4,"Sepal_Width":2.8,"Petal_Length":6.1,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":7.9,"Sepal_Width":3.8,"Petal_Length":6.4,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":2.8,"Petal_Length":5.6,"Petal_Width":2.2,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.8,"Petal_Length":5.1,"Petal_Width":1.5,"Species":"virginica"},{"Sepal_Length":6.1,"Sepal_Width":2.6,"Petal_Length":5.6,"Petal_Width":1.4,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":3,"Petal_Length":6.1,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":3.4,"Petal_Length":5.6,"Petal_Width":2.4,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":3.1,"Petal_Length":5.5,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6,"Sepal_Width":3,"Petal_Length":4.8,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.9,"Sepal_Width":3.1,"Petal_Length":5.4,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3.1,"Petal_Length":5.6,"Petal_Width":2.4,"Species":"virginica"},{"Sepal_Length":6.9,"Sepal_Width":3.1,"Petal_Length":5.1,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":5.1,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":6.8,"Sepal_Width":3.2,"Petal_Length":5.9,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3.3,"Petal_Length":5.7,"Petal_Width":2.5,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3,"Petal_Length":5.2,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.5,"Petal_Length":5,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3,"Petal_Length":5.2,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.2,"Sepal_Width":3.4,"Petal_Length":5.4,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":5.9,"Sepal_Width":3,"Petal_Length":5.1,"Petal_Width":1.8,"Species":"virginica"}]'),Sp=[{Admit:"Admitted",Gender:"Male",Dept:"A",Freq:512},{Admit:"Rejected",Gender:"Male",Dept:"A",Freq:313},{Admit:"Admitted",Gender:"Female",Dept:"A",Freq:89},{Admit:"Rejected",Gender:"Female",Dept:"A",Freq:19},{Admit:"Admitted",Gender:"Male",Dept:"B",Freq:353},{Admit:"Rejected",Gender:"Male",Dept:"B",Freq:207},{Admit:"Admitted",Gender:"Female",Dept:"B",Freq:17},{Admit:"Rejected",Gender:"Female",Dept:"B",Freq:8},{Admit:"Admitted",Gender:"Male",Dept:"C",Freq:120},{Admit:"Rejected",Gender:"Male",Dept:"C",Freq:205},{Admit:"Admitted",Gender:"Female",Dept:"C",Freq:202},{Admit:"Rejected",Gender:"Female",Dept:"C",Freq:391},{Admit:"Admitted",Gender:"Male",Dept:"D",Freq:138},{Admit:"Rejected",Gender:"Male",Dept:"D",Freq:279},{Admit:"Admitted",Gender:"Female",Dept:"D",Freq:131},{Admit:"Rejected",Gender:"Female",Dept:"D",Freq:244},{Admit:"Admitted",Gender:"Male",Dept:"E",Freq:53},{Admit:"Rejected",Gender:"Male",Dept:"E",Freq:138},{Admit:"Admitted",Gender:"Female",Dept:"E",Freq:94},{Admit:"Rejected",Gender:"Female",Dept:"E",Freq:299},{Admit:"Admitted",Gender:"Male",Dept:"F",Freq:22},{Admit:"Rejected",Gender:"Male",Dept:"F",Freq:351},{Admit:"Admitted",Gender:"Female",Dept:"F",Freq:24},{Admit:"Rejected",Gender:"Female",Dept:"F",Freq:317}],_p=`The birch canoe slid on the smooth planks.
Glue the sheet to the dark blue background.
It's easy to tell the depth of a well.
These days a chicken leg is a rare dish.
Rice is often served in round bowls.
The juice of lemons makes fine punch.
The box was thrown beside the parked truck.
The hogs were fed chopped corn and garbage.
Four hours of steady work faced us.
Large size in stockings is hard to sell.
The boy was there when the sun rose.
A rod is used to catch pink salmon.
The source of the huge river is the clear spring.
Kick the ball straight and follow through.
Help the woman get back to her feet.
A pot of tea helps to pass the evening.
Smoky fires lack flame and heat.
The soft cushion broke the man's fall.
The salt breeze came across from the sea.
The girl at the booth sold fifty bonds.
The small pup gnawed a hole in the sock.
The fish twisted and turned on the bent hook.
Press the pants and sew a button on the vest.
The swan dive was far short of perfect.
The beauty of the view stunned the young boy.
Two blue fish swam in the tank.
Her purse was full of useless trash.
The colt reared and threw the tall rider.
It snowed, rained, and hailed the same morning.
Read verse out loud for pleasure.
Hoist the load to your left shoulder.
Take the winding path to reach the lake.
Note closely the size of the gas tank.
Wipe the grease off his dirty face.
Mend the coat before you go out.
The wrist was badly strained and hung limp.
The stray cat gave birth to kittens.
The young girl gave no clear response.
The meal was cooked before the bell rang.
What joy there is in living.
A king ruled the state in the early days.
The ship was torn apart on the sharp reef.
Sickness kept him home the third week.
The wide road shimmered in the hot sun.
The lazy cow lay in the cool grass.
Lift the square stone over the fence.
The rope will bind the seven books at once.
Hop over the fence and plunge in.
The friendly gang left the drug store.
Mesh mire keeps chicks inside.
The frosty air passed through the coat.
The crooked maze failed to fool the mouse.
Adding fast leads to wrong sums.
The show was a flop from the very start.
A saw is a tool used for making boards.
The wagon moved on well oiled wheels.
March the soldiers past the next hill.
A cup of sugar makes sweet fudge.
Place a rosebush near the porch steps.
Both lost their lives in the raging storm.
We talked of the slide show in the circus.
Use a pencil to write the first draft.
He ran half way to the hardware store.
The clock struck to mark the third period.
A small creek cut across the field.
Cars and busses stalled in snow drifts.
The set of china hit, the floor with a crash.
This is a grand season for hikes on the road.
The dune rose from the edge of the water.
Those words were the cue for the actor to leave.
A yacht slid around the point into the bay.
The two met while playing on the sand.
The ink stain dried on the finished page.
The walled town was seized without a fight.
The lease ran out in sixteen weeks.
A tame squirrel makes a nice pet.
The horn of the car woke the sleeping cop.
The heart beat strongly and with firm strokes.
The pearl was worn in a thin silver ring.
The fruit peel was cut in thick slices.
The Navy attacked the big task force.
See the cat glaring at the scared mouse.
There are more than two factors here.
The hat brim was wide and too droopy.
The lawyer tried to lose his case.
The grass curled around the fence post.
Cut the pie into large parts.
Men strive but seldom get rich.
Always close the barn door tight.
He lay prone and hardly moved a limb.
The slush lay deep along the street.
A wisp of cloud hung in the blue air.
A pound of sugar costs more than eggs.
The fin was sharp and cut the clear water.
The play seems dull and quite stupid.
Bail the boat, to stop it from sinking.
The term ended in late June that year.
A tusk is used to make costly gifts.
Ten pins were set in order.
The bill as paid every third week.
Oak is strong and also gives shade.
Cats and dogs each hate the other.
The pipe began to rust while new.
Open the crate but don't break the glass.
Add the sum to the product of these three.
Thieves who rob friends deserve jail.
The ripe taste of cheese improves with age.
Act on these orders with great speed.
The hog crawled under the high fence.
Move the vat over the hot fire.
The bark of the pine tree was shiny and dark.
Leaves turn brown and yellow in the fall.
The pennant waved when the wind blew.
Split the log with a quick, sharp blow.
Burn peat after the logs give out.
He ordered peach pie with ice cream.
Weave the carpet on the right hand side.
Hemp is a weed found in parts of the tropics.
A lame back kept his score low.
We find joy in the simplest things.
Type out three lists of orders.
The harder he tried the less he got done.
The boss ran the show with a watchful eye.
The cup cracked and spilled its contents.
Paste can cleanse the most dirty brass.
The slang word for raw whiskey is booze.
It caught its hind paw in a rusty trap.
The wharf could be seen at the farther shore.
Feel the heat of the weak dying flame.
The tiny girl took off her hat.
A cramp is no small danger on a swim.
He said the same phrase thirty times.
Pluck the bright rose without leaves.
Two plus seven is less than ten.
The glow deepened in the eyes of the sweet girl.
Bring your problems to the wise chief.
Write a fond note to the friend you cherish.
Clothes and lodging are free to new men.
We frown when events take a bad turn.
Port is a strong wine with s smoky taste.
The young kid jumped the rusty gate.
Guess the results from the first scores.
A salt pickle tastes fine with ham.
The just claim got the right verdict.
These thistles bend in a high wind.
Pure bred poodles have curls.
The tree top waved in a graceful way.
The spot on the blotter was made by green ink.
Mud was spattered on the front of his white shirt.
The cigar burned a hole in the desk top.
The empty flask stood on the tin tray.
A speedy man can beat this track mark.
He broke a new shoelace that day.
The coffee stand is too high for the couch.
The urge to write short stories is rare.
The pencils have all been used.
The pirates seized the crew of the lost ship.
We tried to replace the coin but failed.
She sewed the torn coat quite neatly.
The sofa cushion is red and of light weight.
The jacket hung on the back of the wide chair.
At that high level the air is pure.
Drop the two when you add the figures.
A filing case is now hard to buy.
An abrupt start does not win the prize.
Wood is best for making toys and blocks.
The office paint was a dull sad tan.
He knew the skill of the great young actress.
A rag will soak up spilled water.
A shower of dirt fell from the hot pipes.
Steam hissed from the broken valve.
The child almost hurt the small dog.
There was a sound of dry leaves outside.
The sky that morning was clear and bright blue.
Torn scraps littered the stone floor.
Sunday is the best part of the week.
The doctor cured him with these pills.
The new girl was fired today at noon.
They felt gay when the ship arrived in port.
Add the store's account to the last cent.
Acid burns holes in wool cloth.
Fairy tales should be fun to write.
Eight miles of woodland burned to waste.
The third act was dull and tired the players.
A young child should not suffer fright.
Add the column and put the sum here.
We admire and love a good cook.
There the flood mark is ten inches.
He carved a head from the round block of marble.
She has st smart way of wearing clothes.
The fruit of a fig tree is apple-shaped.
Corn cobs can be used to kindle a fire.
Where were they when the noise started.
The paper box is full of thumb tacks.
Sell your gift to a buyer at a good gain.
The tongs lay beside the ice pail.
The petals fall with the next puff of wind.
Bring your best compass to the third class.
They could laugh although they were sad.
Farmers came in to thresh the oat crop.
The brown house was on fire to the attic.
The lure is used to catch trout and flounder.
Float the soap on top of the bath water.
A blue crane is a tall wading bird.
A fresh start will work such wonders.
The club rented the rink for the fifth night.
After the dance they went straight home.
The hostess taught the new maid to serve.
He wrote his last novel there at the inn.
Even the worst will beat his low score.
The cement had dried when he moved it.
The loss of the second ship was hard to take.
The fly made its way along the wall.
Do that with a wooden stick.
Lire wires should be kept covered.
The large house had hot water taps.
It is hard to erase blue or red ink.
Write at once or you may forget it.
The doorknob was made of bright clean brass.
The wreck occurred by the bank on Main Street.
A pencil with black lead writes best.
Coax a young calf to drink from a bucket.
Schools for ladies teach charm and grace.
The lamp shone with a steady green flame.
They took the axe and the saw to the forest.
The ancient coin was quite dull and worn.
The shaky barn fell with a loud crash.
Jazz and swing fans like fast music.
Rake the rubbish up and then burn it.
Slash the gold cloth into fine ribbons.
Try to have the court decide the case.
They are pushed back each time they attack.
He broke his ties with groups of former friends.
They floated on the raft to sun their white backs.
The map had an X that meant nothing.
Whitings are small fish caught in nets.
Some ads serve to cheat buyers.
Jerk the rope and the bell rings weakly.
A waxed floor makes us lose balance.
Madam, this is the best brand of corn.
On the islands the sea breeze is soft and mild.
The play began as soon as we sat down.
This will lead the world to more sound and fury
Add salt before you fry the egg.
The rush for funds reached its peak Tuesday.
The birch looked stark white and lonesome.
The box is held by a bright red snapper.
To make pure ice, you freeze water.
The first worm gets snapped early.
Jump the fence and hurry up the bank.
Yell and clap as the curtain slides back.
They are men nho walk the middle of the road.
Both brothers wear the same size.
In some forin or other we need fun.
The prince ordered his head chopped off.
The houses are built of red clay bricks.
Ducks fly north but lack a compass.
Fruit flavors are used in fizz drinks.
These pills do less good than others.
Canned pears lack full flavor.
The dark pot hung in the front closet.
Carry the pail to the wall and spill it there.
The train brought our hero to the big town.
We are sure that one war is enough.
Gray paint stretched for miles around.
The rude laugh filled the empty room.
High seats are best for football fans.
Tea served from the brown jug is tasty.
A dash of pepper spoils beef stew.
A zestful food is the hot-cross bun.
The horse trotted around the field at a brisk pace.
Find the twin who stole the pearl necklace.
Cut the cord that binds the box tightly.
The red tape bound the smuggled food.
Look in the corner to find the tan shirt.
The cold drizzle will halt the bond drive.
Nine men were hired to dig the ruins.
The junk yard had a mouldy smell.
The flint sputtered and lit a pine torch.
Soak the cloth and drown the sharp odor.
The shelves were bare of both jam or crackers.
A joy to every child is the swan boat.
All sat frozen and watched the screen.
ii cloud of dust stung his tender eyes.
To reach the end he needs much courage.
Shape the clay gently into block form.
The ridge on a smooth surface is a bump or flaw.
Hedge apples may stain your hands green.
Quench your thirst, then eat the crackers.
Tight curls get limp on rainy days.
The mute muffled the high tones of the horn.
The gold ring fits only a pierced ear.
The old pan was covered with hard fudge.
Watch the log float in the wide river.
The node on the stalk of wheat grew daily.
The heap of fallen leaves was set on fire.
Write fast, if you want to finish early.
His shirt was clean but one button was gone.
The barrel of beer was a brew of malt and hops.
Tin cans are absent from store shelves.
Slide the box into that empty space.
The plant grew large and green in the window.
The beam dropped down on the workmen's head.
Pink clouds floated JTith the breeze.
She danced like a swan, tall and graceful.
The tube was blown and the tire flat and useless.
It is late morning on the old wall clock.
Let's all join as we sing the last chorus.
The last switch cannot be turned off.
The fight will end in just six minutes.
The store walls were lined with colored frocks.
The peace league met to discuss their plans.
The rise to fame of a person takes luck.
Paper is scarce, so write with much care.
The quick fox jumped on the sleeping cat.
The nozzle of the fire hose was bright brass.
Screw the round cap on as tight as needed.
Time brings us many changes.
The purple tie was ten years old.
Men think and plan and sometimes act.
Fill the ink jar with sticky glue.
He smoke a big pipe with strong contents.
We need grain to keep our mules healthy.
Pack the records in a neat thin case.
The crunch of feet in the snow was the only sound.
The copper bowl shone in the sun's rays.
Boards will warp unless kept dry.
The plush chair leaned against the wall.
Glass will clink when struck by metal.
Bathe and relax in the cool green grass.
Nine rows of soldiers stood in line.
The beach is dry and shallow at low tide.
The idea is to sew both edges straight.
The kitten chased the dog down the street.
Pages bound in cloth make a book.
Try to trace the fine lines of the painting.
Women form less than half of the group.
The zones merge in the central part of town.
A gem in the rough needs work to polish.
Code is used when secrets are sent.
Most of the new is easy for us to hear.
He used the lathe to make brass objects.
The vane on top of the pole revolved in the wind.
Mince pie is a dish served to children.
The clan gathered on each dull night.
Let it burn, it gives us warmth and comfort.
A castle built from sand fails to endure.
A child's wit saved the day for us.
Tack the strip of carpet to the worn floor.
Next Tuesday we must vote.
Pour the stew from the pot into the plate.
Each penny shone like new.
The man went to the woods to gather sticks.
The dirt piles were lines along the road.
The logs fell and tumbled into the clear stream.
Just hoist it up and take it away,
A ripe plum is fit for a king's palate.
Our plans right now are hazy.
Brass rings are sold by these natives.
It takes a good trap to capture a bear.
Feed the white mouse some flower seeds.
The thaw came early and freed the stream.
He took the lead and kept it the whole distance.
The key you designed will fit the lock.
Plead to the council to free the poor thief.
Better hash is made of rare beef.
This plank was made for walking on.
The lake sparkled in the red hot sun.
He crawled with care along the ledge.
Tend the sheep while the dog wanders.
It takes a lot of help to finish these.
Mark the spot with a sign painted red.
Take two shares as a fair profit.
The fur of cats goes by many names.
North winds bring colds and fevers.
He asks no person to vouch for him.
Go now and come here later.
A sash of gold silk will trim her dress.
Soap can wash most dirt away.
That move means the game is over.
He wrote down a long list of items.
A siege will crack the strong defense.
Grape juice and water mix well.
Roads are paved with sticky tar.
Fake &ones shine but cost little.
The drip of the rain made a pleasant sound.
Smoke poured out of every crack.
Serve the hot rum to the tired heroes.
Much of the story makes good sense.
The sun came up to light the eastern sky.
Heave the line over the port side.
A lathe cuts and trims any wood.
It's a dense crowd in two distinct ways.
His hip struck the knee of the next player.
The stale smell of old beer lingers.
The desk was firm on the shaky floor.
It takes heat to bring out the odor.
Beef is scarcer than some lamb.
Raise the sail and steer the ship northward.
The cone costs five cents on Mondays.
A pod is what peas always grow in.
Jerk the dart from the cork target.
No cement will hold hard wood.
We now have a new base for shipping.
The list of names is carved around the base.
The sheep were led home by a dog.
Three for a dime, the young peddler cried.
The sense of smell is better than that of touch.
No hardship seemed to keep him sad.
Grace makes up for lack of beauty.
Nudge gently but wake her now.
The news struck doubt into restless minds.
Once we stood beside the shore.
A chink in the wall allowed a draft to blow.
Fasten two pins on each side.
A cold dip restores health and zest.
He takes the oath of office each March.
The sand drifts over the sill of the old house.
The point of the steel pen was bent and twisted.
There is a lag between thought and act.
Seed is needed to plant the spring corn.
Draw the chart with heavy black lines.
The boy owed his pal thirty cents.
The chap slipped into the crowd and was lost.
Hats are worn to tea and not to dinner.
The ramp led up to the wide highway.
Beat the dust from the rug onto the lawn.
Say it slow!y but make it ring clear.
The straw nest housed five robins.
Screen the porch with woven straw mats.
This horse will nose his way to the finish.
The dry wax protects the deep scratch.
He picked up the dice for a second roll.
These coins will be needed to pay his debt.
The nag pulled the frail cart along.
Twist the valve and release hot steam.
The vamp of the shoe had a gold buckle.
The smell of burned rags itches my nose.
Xew pants lack cuffs and pockets.
The marsh will freeze when cold enough.
They slice the sausage thin with a knife.
The bloom of the rose lasts a few days.
A gray mare walked before the colt.
Breakfast buns are fine with a hot drink.
Bottles hold four kinds of rum.
The man wore a feather in his felt hat.
He wheeled the bike past. the winding road.
Drop the ashes on the worn old rug.
The desk and both chairs were painted tan.
Throw out the used paper cup and plate.
A clean neck means a neat collar.
The couch cover and hall drapes were blue.
The stems of the tall glasses cracked and broke.
The wall phone rang loud and often.
The clothes dried on a thin wooden rack.
Turn on the lantern which gives us light.
The cleat sank deeply into the soft turf.
The bills were mailed promptly on the tenth of the month.
To have is better than to wait and hope.
The price is fair for a good antique clock.
The music played on while they talked.
Dispense with a vest on a day like this.
The bunch of grapes was pressed into wine.
He sent the figs, but kept the ripe cherries.
The hinge on the door creaked with old age.
The screen before the fire kept in the sparks.
Fly by night, and you waste little time.
Thick glasses helped him read the print.
Birth and death mark the limits of life.
The chair looked strong but had no bottom.
The kite flew wildly in the high wind.
A fur muff is stylish once more.
The tin box held priceless stones.
We need an end of all such matter.
The case was puzzling to the old and wise.
The bright lanterns were gay on the dark lawn.
We don't get much money but we have fun.
The youth drove with zest, but little skill.
Five years he lived with a shaggy dog.
A fence cuts through the corner lot.
The way to save money is not to spend much.
Shut the hatch before the waves push it in.
The odor of spring makes young hearts jump.
Crack the walnut with your sharp side teeth.
He offered proof in the form of a lsrge chart.
Send the stuff in a thick paper bag.
A quart of milk is water for the most part.
They told wild tales to frighten him.
The three story house was built of stone.
In the rear of the ground floor was a large passage.
A man in a blue sweater sat at the desk.
Oats are a food eaten by horse and man.
Their eyelids droop for want. of sleep.
The sip of tea revives his tired friend.
There are many ways to do these things.
Tuck the sheet under the edge of the mat.
A force equal to that would move the earth.
We like to see clear weather.
The work of the tailor is seen on each side.
Take a chance and win a china doll.
Shake the dust from your shoes, stranger.
She was kind to sick old people.
The dusty bench stood by the stone wall.
The square wooden crate was packed to be shipped.
We dress to suit the weather of most days.
Smile when you say nasty words.
A bowl of rice is free with chicken stew.
The water in this well is a source of good health.
Take shelter in this tent, but keep still.
That guy is the writer of a few banned books.
The little tales they tell are false.
The door was barred, locked, and bolted as well.
Ripe pears are fit for a queen's table.
A big wet stain was on the round carpet.
The kite dipped and swayed, but stayed aloft.
The pleasant hours fly by much too soon.
The room was crowded with a wild mob.
This strong arm shall shield your honor.
She blushed when he gave her a white orchid.
The beetle droned in the hot June sun.
Press the pedal with your left foot.
Neat plans fail without luck.
The black trunk fell from the landing.
The bank pressed for payment of the debt.
The theft of the pearl pin was kept secret.
Shake hands with this friendly child.
The vast space stretched into the far distance.
A rich farm is rare in this sandy waste.
His wide grin earned many friends.
Flax makes a fine brand of paper.
Hurdle the pit with the aid of a long pole.
A strong bid may scare your partner stiff.
Even a just cause needs power to win.
Peep under the tent and see the clowns.
The leaf drifts along with a slow spin.
Cheap clothes are flashy but don??????t last.
A thing of small note can cause despair.
Flood the mails with requests for this book.
A thick coat of black paint covered all.
The pencil was cut to be sharp at both ends.
Those last words were a strong statement.
He wrote his name boldly at the top of tile sheet.
Dill pickles are sour but taste fine.
Down that road is the way to the grain farmer.
Either mud or dust are found at all times.
The best method is to fix it in place with clips.
If you mumble your speech will be lost.
At night the alarm roused him from a deep sleep.
Read just what the meter says.
Fill your pack with bright trinkets for the poor.
The small red neon lamp went out.
Clams are small, round, soft, and tasty.
The fan whirled its round blades softly.
The line where the edges join was clean.
Breathe deep and smell the piny air.
It matters not if he reads these words or those.
A brown leather bag hung from its strap.
A toad and a frog are hard to tell apart.
A white silk jacket goes with any shoes.
A break in the dam almost caused a flood.
Paint the sockets in the wall dull green.
The child crawled into the dense grass.
Bribes fail where honest men work.
Trample the spark, else the flames will spread.
The hilt. of the sword was carved with fine designs.
A round hole was drilled through the thin board.
Footprints showed the path he took up the beach.
She was waiting at my front lawn.
A vent near the edge brought in fresh air.
Prod the old mule with a crooked stick.
It is a band of steel three inches wide.
The pipe ran almost the length of the ditch.
It was hidden from sight by a mass of leaves and shrubs.
The weight. of the package was seen on the high scale.
Wake and rise, and step into the green outdoors.
The green light in the brown box flickered.
The brass tube circled the high wall.
The lobes of her ears were pierced to hold rings.
Hold the hammer near the end to drive the nail.
Next Sunday is the twelfth of the month.
Every word and phrase he speaks is true.
He put his last cartridge into the gun and fired.
They took their kids from the public school.
Drive the screw straight into the wood.
Keep the hatch tight and the watch constant.
Sever the twine with a quick snip of the knife.
Paper will dry out when wet.
Slide the catch back and open the desk.
Help the weak to preserve their strength.
A sullen smile gets few friends.
Stop whistling and watch the boys march.
Jerk the cord, and out tumbles the gold.
Slidc the tray across the glass top.
The cloud moved in a stately way and was gone.
Light maple makes for a swell room.
Set the piece here and say nothing.
Dull stories make her laugh.
A stiff cord will do to fasten your shoe.
Get the trust fund to the bank early.
Choose between the high road and the low.
A plea for funds seems to come again.
He lent his coat to the tall gaunt stranger.
There is a strong chance it will happen once more.
The duke left the park in a silver coach.
Greet the new guests and leave quickly.
When the frost has come it is time for turkey.
Sweet words work better than fierce.
A thin stripe runs down the middle.
A six comes up more often than a ten.
Lush fern grow on the lofty rocks.
The ram scared the school children off.
The team with the best timing looks good.
The farmer swapped his horse for a brown ox.
Sit on the perch and tell the others what to do.
A steep trail is painful for our feet.
The early phase of life moves fast.
Green moss grows on the northern side.
Tea in thin china has a sweet taste.
Pitch the straw through the door of the stable.
The latch on the beck gate needed a nail.
The goose was brought straight from the old market.
The sink is the thing in which we pile dishes.
A whiff of it will cure the most stubborn cold.
The facts dont always show who is right.
She flaps her cape as she parades the street.
The loss of the cruiser was a blow to the fleet.
Loop the braid to the left and then over.
Plead with the lawyer to drop the lost cause.
Calves thrive on tender spring grass.
Post no bills on this office wall.
Tear a thin sheet from the yellow pad.
A cruise in warm waters in a sleek yacht is fun.
A streak of color ran down the left edge.
It was done before the boy could see it.
Crouch before you jump or miss the mark.
Pack the kits and dont forget the salt.
The square peg will settle in the round hole.
Fine soap saves tender skin.
Poached eggs and tea must suffice.
Bad nerves are jangled by a door slam.
Ship maps are different from those for planes.
Dimes showered down from all sides.
They sang the same tunes at each party.
The sky in the west is tinged with orange red.
The pods of peas ferment in bare fields.
The horse balked and threw the tall rider.
The hitch between the horse and cart broke.
Pile the coal high in the shed corner.
The gold vase is both rare and costly.
The knife was hung inside its bright sheath.
The rarest spice comes from the far East.
The roof should be tilted at a sharp slant.
A smatter of French is worse than none.
The mule trod the treadmill day and night.
The aim of the contest is to raise a great fund.
To send it. now in large amounts is bad.
There is a fine hard tang in salty air.
Cod is the main business of the north shore.
The slab was hewn from heavy blocks of slate.
Dunk the stale biscuits into strong drink.
Hang tinsel from both branches.
Cap the jar with a tight brass cover.
The poor boy missed the boat again.
Be sure to set the lamp firmly in the hole.
Pick a card and slip it. under the pack.
A round mat will cover the dull spot.
The first part of the plan needs changing.
The good book informs of what we ought to know.
The mail comes in three batches per day.
You cannot brew tea in a cold pot.
Dots of light betrayed the black cat.
Put the chart on the mantel and tack it down.
The night shift men rate extra pay.
The red paper brightened the dim stage.
See the player scoot to third base.
Slide the bill between the two leaves.
Many hands help get the job done.
We don't like to admit our small faults.
No doubt about the way the wind blows.
Dig deep in the earth for pirate's gold.
The steady drip is worse than a drenching rain.
A flat pack takes less luggage space.
Green ice frosted the punch bowl.
A stuffed chair slipped from the moving van.
The stitch will serve but needs to be shortened.
A thin book fits in the side pocket.
The gloss on top made it unfit to read.
The hail pattered on the burnt brown grass.
Seven seals were stamped on great sheets.
Our troops are set to strike heavy blows.
The store was jammed before the sale could start.
It was a bad error on the part of the new judge.
One step more and the board will collapse.
Take the match and strike it against your shoe.
The pot boiled, but the contents failed to jell.
The baby puts his right foot in his mouth.
The bombs left most of the town in ruins.
Stop and stare at the hard working man.
The streets are narrow and full of sharp turns.
The pup jerked the leash as he saw a feline shape.
Open your book to the first page.
Fish evade the net, and swim off.
Dip the pail once and let it settle.
Will you please answer that phone.
The big red apple fell to the ground.
The curtain rose and the show was on.
The young prince became heir to the throne.
He sent the boy on a short errand.
Leave now and you will arrive on time.
The corner store was robbed last night.
A gold ring will please most any girl.
The long journey home took a year.
She saw a cat in the neighbor's house.
A pink shell was found on the sandy beach.
Small children came to see him.
The grass and bushes were wet with dew.
The blind man counted his old coins.
A severe storm tore down the barn.
She called his name many times.
When you hear the bell, come quickly.
`,kp={mpg:18.1,cyl:6,disp:225,hp:105,drat:2.76,wt:3.46,qsec:20.22,vs:1,am:0,gear:3,carb:1},Tp={"Mazda RX4":{mpg:21,cyl:6,disp:160,hp:110,drat:3.9,wt:2.62,qsec:16.46,vs:0,am:1,gear:4,carb:4},"Mazda RX4 Wag":{mpg:21,cyl:6,disp:160,hp:110,drat:3.9,wt:2.875,qsec:17.02,vs:0,am:1,gear:4,carb:4},"Datsun 710":{mpg:22.8,cyl:4,disp:108,hp:93,drat:3.85,wt:2.32,qsec:18.61,vs:1,am:1,gear:4,carb:1},"Hornet 4 Drive":{mpg:21.4,cyl:6,disp:258,hp:110,drat:3.08,wt:3.215,qsec:19.44,vs:1,am:0,gear:3,carb:1},"Hornet Sportabout":{mpg:18.7,cyl:8,disp:360,hp:175,drat:3.15,wt:3.44,qsec:17.02,vs:0,am:0,gear:3,carb:2},Valiant:kp,"Duster 360":{mpg:14.3,cyl:8,disp:360,hp:245,drat:3.21,wt:3.57,qsec:15.84,vs:0,am:0,gear:3,carb:4},"Merc 240D":{mpg:24.4,cyl:4,disp:146.7,hp:62,drat:3.69,wt:3.19,qsec:20,vs:1,am:0,gear:4,carb:2},"Merc 230":{mpg:22.8,cyl:4,disp:140.8,hp:95,drat:3.92,wt:3.15,qsec:22.9,vs:1,am:0,gear:4,carb:2},"Merc 280":{mpg:19.2,cyl:6,disp:167.6,hp:123,drat:3.92,wt:3.44,qsec:18.3,vs:1,am:0,gear:4,carb:4},"Merc 280C":{mpg:17.8,cyl:6,disp:167.6,hp:123,drat:3.92,wt:3.44,qsec:18.9,vs:1,am:0,gear:4,carb:4},"Merc 450SE":{mpg:16.4,cyl:8,disp:275.8,hp:180,drat:3.07,wt:4.07,qsec:17.4,vs:0,am:0,gear:3,carb:3},"Merc 450SL":{mpg:17.3,cyl:8,disp:275.8,hp:180,drat:3.07,wt:3.73,qsec:17.6,vs:0,am:0,gear:3,carb:3},"Merc 450SLC":{mpg:15.2,cyl:8,disp:275.8,hp:180,drat:3.07,wt:3.78,qsec:18,vs:0,am:0,gear:3,carb:3},"Cadillac Fleetwood":{mpg:10.4,cyl:8,disp:472,hp:205,drat:2.93,wt:5.25,qsec:17.98,vs:0,am:0,gear:3,carb:4},"Lincoln Continental":{mpg:10.4,cyl:8,disp:460,hp:215,drat:3,wt:5.424,qsec:17.82,vs:0,am:0,gear:3,carb:4},"Chrysler Imperial":{mpg:14.7,cyl:8,disp:440,hp:230,drat:3.23,wt:5.345,qsec:17.42,vs:0,am:0,gear:3,carb:4},"Fiat 128":{mpg:32.4,cyl:4,disp:78.7,hp:66,drat:4.08,wt:2.2,qsec:19.47,vs:1,am:1,gear:4,carb:1},"Honda Civic":{mpg:30.4,cyl:4,disp:75.7,hp:52,drat:4.93,wt:1.615,qsec:18.52,vs:1,am:1,gear:4,carb:2},"Toyota Corolla":{mpg:33.9,cyl:4,disp:71.1,hp:65,drat:4.22,wt:1.835,qsec:19.9,vs:1,am:1,gear:4,carb:1},"Toyota Corona":{mpg:21.5,cyl:4,disp:120.1,hp:97,drat:3.7,wt:2.465,qsec:20.01,vs:1,am:0,gear:3,carb:1},"Dodge Challenger":{mpg:15.5,cyl:8,disp:318,hp:150,drat:2.76,wt:3.52,qsec:16.87,vs:0,am:0,gear:3,carb:2},"AMC Javelin":{mpg:15.2,cyl:8,disp:304,hp:150,drat:3.15,wt:3.435,qsec:17.3,vs:0,am:0,gear:3,carb:2},"Camaro Z28":{mpg:13.3,cyl:8,disp:350,hp:245,drat:3.73,wt:3.84,qsec:15.41,vs:0,am:0,gear:3,carb:4},"Pontiac Firebird":{mpg:19.2,cyl:8,disp:400,hp:175,drat:3.08,wt:3.845,qsec:17.05,vs:0,am:0,gear:3,carb:2},"Fiat X1-9":{mpg:27.3,cyl:4,disp:79,hp:66,drat:4.08,wt:1.935,qsec:18.9,vs:1,am:1,gear:4,carb:1},"Porsche 914-2":{mpg:26,cyl:4,disp:120.3,hp:91,drat:4.43,wt:2.14,qsec:16.7,vs:0,am:1,gear:5,carb:2},"Lotus Europa":{mpg:30.4,cyl:4,disp:95.1,hp:113,drat:3.77,wt:1.513,qsec:16.9,vs:1,am:1,gear:5,carb:2},"Ford Pantera L":{mpg:15.8,cyl:8,disp:351,hp:264,drat:4.22,wt:3.17,qsec:14.5,vs:0,am:1,gear:5,carb:4},"Ferrari Dino":{mpg:19.7,cyl:6,disp:145,hp:175,drat:3.62,wt:2.77,qsec:15.5,vs:0,am:1,gear:5,carb:6},"Maserati Bora":{mpg:15,cyl:8,disp:301,hp:335,drat:3.54,wt:3.57,qsec:14.6,vs:0,am:1,gear:5,carb:8},"Volvo 142E":{mpg:21.4,cyl:4,disp:121,hp:109,drat:4.11,wt:2.78,qsec:18.6,vs:1,am:1,gear:4,carb:2}},ku=`date,pce,pop,psavert,uempmed,unemploy
1967-07-01,506.7,198712,12.6,4.5,2944
1967-08-01,509.8,198911,12.6,4.7,2945
1967-09-01,515.6,199113,11.9,4.6,2958
1967-10-01,512.2,199311,12.9,4.9,3143
1967-11-01,517.4,199498,12.8,4.7,3066
1967-12-01,525.1,199657,11.8,4.8,3018
1968-01-01,530.9,199808,11.7,5.1,2878
1968-02-01,533.6,199920,12.3,4.5,3001
1968-03-01,544.3,200056,11.7,4.1,2877
1968-04-01,544,200208,12.3,4.6,2709
1968-05-01,549.8,200361,12,4.4,2740
1968-06-01,556.3,200536,11.7,4.4,2938
1968-07-01,563.2,200706,10.7,4.5,2883
1968-08-01,567,200898,10.5,4.2,2768
1968-09-01,568.2,201095,10.6,4.6,2686
1968-10-01,571.6,201290,10.8,4.8,2689
1968-11-01,576.7,201466,10.6,4.4,2715
1968-12-01,576.5,201621,11.1,4.4,2685
1969-01-01,583.5,201760,10.3,4.4,2718
1969-02-01,588.7,201881,9.7,4.9,2692
1969-03-01,588.9,202023,10.2,4,2712
1969-04-01,593.9,202161,9.7,4,2758
1969-05-01,600.3,202331,10.1,4.2,2713
1969-06-01,600.9,202507,11.1,4.4,2816
1969-07-01,602.7,202677,11.8,4.4,2868
1969-08-01,609.9,202877,11.5,4.4,2856
1969-09-01,613.2,203090,11.6,4.7,3040
1969-10-01,618.5,203302,11.4,4.5,3049
1969-11-01,620.5,203500,11.6,4.8,2856
1969-12-01,622.8,203675,11.8,4.6,2884
1970-01-01,628.7,203849,11.8,4.6,3201
1970-02-01,634,204008,11.7,4.5,3453
1970-03-01,632.3,204156,12.4,4.6,3635
1970-04-01,636,204401,13.3,4.1,3797
1970-05-01,642.4,204607,12.4,4.7,3919
1970-06-01,646.3,204830,12.3,4.9,4071
1970-07-01,648.5,205052,13.5,5.1,4175
1970-08-01,652.9,205295,13.4,5.4,4256
1970-09-01,659.1,205540,12.9,5.2,4456
1970-10-01,658.3,205788,13.1,5.2,4591
1970-11-01,656.6,206024,13.6,5.6,4898
1970-12-01,665.6,206238,13.2,5.9,5076
1971-01-01,676.1,206466,13.3,6.2,4986
1971-02-01,679.4,206668,13.3,6.3,4903
1971-03-01,682,206855,13.5,6.4,4987
1971-04-01,688.8,207065,13.2,6.5,4959
1971-05-01,691.1,207260,13.6,6.7,4996
1971-06-01,699.8,207462,14.7,5.7,4949
1971-07-01,698.9,207661,13.8,6.2,5035
1971-08-01,704.9,207881,13.6,6.4,5134
1971-09-01,713,208114,13.3,5.8,5042
1971-10-01,715.8,208345,13.3,6.5,4954
1971-11-01,720.9,208555,13.1,6.4,5161
1971-12-01,728.4,208740,13,6.2,5154
1972-01-01,731.5,208917,12.5,6.2,5019
1972-02-01,736.2,209061,12.8,6.6,4928
1972-03-01,749.2,209212,11.8,6.6,5038
1972-04-01,752.5,209386,11.5,6.7,4959
1972-05-01,758,209545,11.7,6.6,4922
1972-06-01,761.6,209725,11.7,5.4,4923
1972-07-01,769.9,209896,11.7,6.1,4913
1972-08-01,776.3,210075,12,6,4939
1972-09-01,781.1,210278,12.2,5.6,4849
1972-10-01,794.9,210479,13,5.7,4875
1972-11-01,800.5,210656,13.6,5.7,4602
1972-12-01,806.1,210821,13.7,6.1,4543
1973-01-01,816.5,210985,12.4,5.7,4326
1973-02-01,825.8,211120,12.5,5.2,4452
1973-03-01,832.8,211254,12.7,5.5,4394
1973-04-01,835.7,211420,13.2,5,4459
1973-05-01,841.6,211577,13.2,4.9,4329
1973-06-01,844.3,211746,13.6,5,4363
1973-07-01,854.1,211909,13.2,5.2,4305
1973-08-01,853.3,212092,13.9,4.9,4305
1973-09-01,869.2,212289,13.1,5.4,4350
1973-10-01,868.2,212475,14.4,5.5,4144
1973-11-01,876.9,212634,14.4,5.1,4396
1973-12-01,876.6,212785,14.8,4.7,4489
1974-01-01,884.5,212932,14.3,5,4644
1974-02-01,889.7,213074,14.2,5.1,4731
1974-03-01,901.4,213211,13.4,4.8,4634
1974-04-01,910.8,213361,13.1,5,4618
1974-05-01,922.4,213513,12.8,4.6,4705
1974-06-01,928,213686,12.8,5.3,4927
1974-07-01,937.9,213854,12.8,5.7,5063
1974-08-01,954.8,214042,12.1,5,5022
1974-09-01,955.1,214246,12.9,5.3,5437
1974-10-01,959.2,214451,13.4,5.5,5523
1974-11-01,956.2,214625,13.8,5.2,6140
1974-12-01,961.8,214782,14,5.7,6636
1975-01-01,975.6,214931,13.2,6.3,7501
1975-02-01,989.4,215065,12.5,7.1,7520
1975-03-01,990.6,215198,12.7,7.2,7978
1975-04-01,995,215353,14.2,8.7,8210
1975-05-01,1018.9,215523,17.3,9.4,8433
1975-06-01,1026.8,215768,14.3,8.8,8220
1975-07-01,1039.8,215973,12.6,8.6,8127
1975-08-01,1047,216195,13,9.2,7928
1975-09-01,1054.8,216393,13,9.2,7923
1975-10-01,1060.9,216587,13.4,8.6,7897
1975-11-01,1075.8,216771,12.7,9.5,7794
1975-12-01,1092.1,216931,12,9,7744
1976-01-01,1107.1,217095,11.7,9,7534
1976-02-01,1107.7,217249,12.3,8.2,7326
1976-03-01,1114.9,217381,12.2,8.7,7230
1976-04-01,1125.4,217528,11.7,8.2,7330
1976-05-01,1122.7,217685,12.3,8.3,7053
1976-06-01,1140.5,217861,11.4,7.8,7322
1976-07-01,1149.6,218035,11.7,7.7,7490
1976-08-01,1158,218233,11.7,7.9,7518
1976-09-01,1168.8,218440,11.4,7.8,7380
1976-10-01,1176.8,218644,11.1,7.7,7430
1976-11-01,1189,218834,11.4,8.4,7620
1976-12-01,1211.5,219006,10.6,8,7545
1977-01-01,1215,219179,10.6,7.5,7280
1977-02-01,1231.3,219344,9.3,7.2,7443
1977-03-01,1238.3,219504,10.5,7.2,7307
1977-04-01,1247.3,219684,10.5,7.3,7059
1977-05-01,1257.1,219859,10.3,7.9,6911
1977-06-01,1263.6,220046,10.6,6.2,7134
1977-07-01,1280.5,220239,10.5,7.1,6829
1977-08-01,1285.7,220458,10.9,7,6925
1977-09-01,1294.5,220688,11.1,6.7,6751
1977-10-01,1311.4,220904,11,6.9,6763
1977-11-01,1327,221109,11.2,7,6815
1977-12-01,1336,221303,11.4,6.8,6386
1978-01-01,1329.5,221477,11.9,6.5,6489
1978-02-01,1355.1,221629,11.1,6.7,6318
1978-03-01,1377.5,221792,11,6.2,6337
1978-04-01,1396.4,221991,10.8,6.1,6180
1978-05-01,1412,222176,10.3,5.7,6127
1978-06-01,1425.8,222379,10,6,6028
1978-07-01,1426.8,222585,10.9,5.8,6309
1978-08-01,1447,222805,10.5,5.8,6080
1978-09-01,1452.9,223053,10.6,5.6,6125
1978-10-01,1466.9,223271,10.7,5.9,5947
1978-11-01,1480.6,223477,10.5,5.5,6077
1978-12-01,1496.5,223670,10.4,5.6,6228
1979-01-01,1502.4,223865,11.1,5.9,6109
1979-02-01,1517.8,224053,11.1,5.9,6173
1979-03-01,1531.2,224235,11.2,5.9,6109
1979-04-01,1538.4,224438,11,5.4,6069
1979-05-01,1558.8,224632,10.3,5.6,5840
1979-06-01,1575.7,224843,9.9,5.6,5959
1979-07-01,1586.1,225055,10.6,5.9,5996
1979-08-01,1615.6,225295,9.7,4.8,6320
1979-09-01,1633.9,225547,9.4,5.5,6190
1979-10-01,1641.6,225801,9.7,5.5,6296
1979-11-01,1657.3,226027,9.7,5.3,6238
1979-12-01,1666.3,226243,10.1,5.7,6325
1980-01-01,1697.3,226451,9.9,5.3,6683
1980-02-01,1701.4,226656,10.1,5.8,6702
1980-03-01,1708.2,226849,10.2,6,6729
1980-04-01,1695.2,227061,11.3,5.8,7358
1980-05-01,1700.1,227251,11.4,5.7,7984
1980-06-01,1718.8,227522,11.2,6.4,8098
1980-07-01,1747.1,227726,11.3,7,8363
1980-08-01,1763.8,227953,11.3,7.5,8281
1980-09-01,1780.5,228186,11.7,7.7,8021
1980-10-01,1817.1,228417,11.3,7.5,8088
1980-11-01,1826.8,228612,11.6,7.7,8023
1980-12-01,1851.7,228779,11.4,7.5,7718
1981-01-01,1870,228937,10.9,7.4,8071
1981-02-01,1884.2,229071,10.8,7.1,8051
1981-03-01,1902.9,229224,10.8,7.1,7982
1981-04-01,1904.4,229403,10.9,7.4,7869
1981-05-01,1913.8,229575,11,6.9,8174
1981-06-01,1934.5,229761,10.8,6.6,8098
1981-07-01,1942.1,229966,12.3,7.1,7863
1981-08-01,1966.6,230187,12,7.2,8036
1981-09-01,1965.5,230412,12.4,6.8,8230
1981-10-01,1963.9,230641,13,6.8,8646
1981-11-01,1970.6,230822,13.2,6.9,9029
1981-12-01,1988.8,230989,12.5,6.9,9267
1982-01-01,1997.1,231157,12.7,7.1,9397
1982-02-01,2021.2,231313,12.1,7.5,9705
1982-03-01,2024.1,231470,12.2,7.7,9895
1982-04-01,2026.3,231645,12.9,8.1,10244
1982-05-01,2044.5,231809,12.3,8.5,10335
1982-06-01,2048.1,231992,12.3,9.5,10538
1982-07-01,2072.2,232188,12.5,8.5,10849
1982-08-01,2080.1,232392,12.6,8.7,10881
1982-09-01,2104.6,232599,11.8,9.5,11217
1982-10-01,2125.8,232816,11.3,9.7,11529
1982-11-01,2149.3,232993,10.9,10,11938
1982-12-01,2161.6,233160,10.9,10.2,12051
1983-01-01,2174,233322,11.1,11.1,11534
1983-02-01,2177,233473,11.1,9.8,11545
1983-03-01,2202.8,233613,10.6,10.4,11408
1983-04-01,2226.4,233781,10.3,10.9,11268
1983-05-01,2245.9,233922,9.9,12.3,11154
1983-06-01,2276,234118,9.1,11.3,11246
1983-07-01,2304.4,234307,9.6,10.1,10548
1983-08-01,2320.4,234501,9.2,9.3,10623
1983-09-01,2334.9,234701,9.6,9.3,10282
1983-10-01,2357.6,234907,9.7,9.4,9887
1983-11-01,2366.3,235078,10.3,9.3,9499
1983-12-01,2393.6,235235,10.1,8.7,9331
1984-01-01,2419.4,235385,10,9.1,9008
1984-02-01,2403.5,235527,11.7,8.3,8791
1984-03-01,2431.6,235675,11.5,8.3,8746
1984-04-01,2457.5,235839,11.5,8.2,8762
1984-05-01,2474.5,235993,11.1,9.1,8456
1984-06-01,2495.6,236160,11.1,7.5,8226
1984-07-01,2494.6,236348,11.6,7.5,8537
1984-08-01,2512.2,236549,11.8,7.3,8519
1984-09-01,2533.8,236760,11.8,7.6,8367
1984-10-01,2531.3,236976,11.7,7.2,8381
1984-11-01,2571.4,237159,10.9,7.2,8198
1984-12-01,2582.6,237316,11.2,7.3,8358
1985-01-01,2618.8,237468,10.3,6.8,8423
1985-02-01,2640.8,237602,9.1,7.1,8321
1985-03-01,2648.5,237732,8.7,7.1,8339
1985-04-01,2659.5,237900,9.9,6.9,8395
1985-05-01,2696.4,238074,11.1,6.9,8302
1985-06-01,2689.4,238270,9.6,6.6,8460
1985-07-01,2715.7,238466,9.1,6.9,8513
1985-08-01,2752.1,238679,8.2,7.1,8196
1985-09-01,2794.7,238898,7.3,6.9,8248
1985-10-01,2755.8,239113,9.1,7.1,8298
1985-11-01,2771.1,239307,9,7,8128
1985-12-01,2811.3,239477,8.6,6.8,8138
1986-01-01,2827.1,239638,8.6,6.7,7795
1986-02-01,2820.2,239788,9.3,6.9,8402
1986-03-01,2823.6,239928,9.9,6.8,8383
1986-04-01,2835.2,240094,9.7,6.7,8364
1986-05-01,2857.5,240271,9.3,6.8,8439
1986-06-01,2861.7,240459,9.4,7,8508
1986-07-01,2881.2,240651,9.3,6.9,8319
1986-08-01,2898.6,240854,9,7.1,8135
1986-09-01,2971.8,241068,7.2,7.4,8310
1986-10-01,2932.9,241274,8.4,7,8243
1986-11-01,2928.4,241467,8.8,7.1,8159
1986-12-01,2997.1,241620,7,7.1,7883
1987-01-01,2935.5,241784,9.7,6.9,7892
1987-02-01,3001.7,241930,8.5,6.6,7865
1987-03-01,3013.3,242079,8.5,6.6,7862
1987-04-01,3038.8,242252,4.5,7.1,7542
1987-05-01,3048.4,242423,8.2,6.6,7574
1987-06-01,3072.8,242608,7.7,6.5,7398
1987-07-01,3094.7,242804,7.5,6.5,7268
1987-08-01,3130.8,243012,7.2,6.4,7261
1987-09-01,3126.5,243223,7.6,6,7102
1987-10-01,3134.5,243446,8.3,6.3,7227
1987-11-01,3144.2,243639,8.5,6.2,7035
1987-12-01,3174.1,243809,8.7,6,6936
1988-01-01,3213.7,243981,8.1,6.2,6953
1988-02-01,3221.4,244131,8.6,6.3,6929
1988-03-01,3260.5,244279,8.2,6.4,6876
1988-04-01,3263,244445,8.8,5.9,6601
1988-05-01,3293.6,244610,8.4,5.9,6779
1988-06-01,3318.5,244806,8.4,5.8,6546
1988-07-01,3342.7,245021,8.6,6.1,6605
1988-08-01,3368,245240,8.4,5.9,6843
1988-09-01,3375,245464,8.9,5.7,6604
1988-10-01,3413.7,245693,8.6,5.6,6568
1988-11-01,3430.2,245884,8.4,5.7,6537
1988-12-01,3459.7,246056,8.3,5.9,6518
1989-01-01,3483.7,246224,8.5,5.6,6682
1989-02-01,3488,246378,9,5.4,6359
1989-03-01,3498.8,246530,9.5,5.4,6205
1989-04-01,3543,246721,8.4,5.4,6468
1989-05-01,3551.8,246906,8.1,5.3,6375
1989-06-01,3566.6,247114,8.2,5.4,6577
1989-07-01,3585.7,247342,8.2,5.6,6495
1989-08-01,3620.6,247573,7.6,5,6511
1989-09-01,3621.9,247816,8.1,4.9,6590
1989-10-01,3633.6,248067,8.5,4.9,6630
1989-11-01,3643.3,248281,8.6,4.8,6725
1989-12-01,3684.2,248479,7.8,4.9,6667
1990-01-01,3730.7,248659,8,5.1,6752
1990-02-01,3728.2,248827,8.6,5.3,6651
1990-03-01,3754.9,249012,8.3,5.1,6598
1990-04-01,3770,249306,8.8,4.8,6797
1990-05-01,3775.8,249565,8.7,5.2,6742
1990-06-01,3804.5,249849,8.6,5.2,6590
1990-07-01,3821.7,250132,8.7,5.4,6922
1990-08-01,3848.3,250439,8.1,5.4,7188
1990-09-01,3870.1,250751,8.1,5.6,7368
1990-10-01,3870.6,251057,7.8,5.8,7459
1990-11-01,3871.9,251346,7.9,5.7,7764
1990-12-01,3861.3,251626,8.8,5.9,7901
1991-01-01,3841,251889,9.3,6,8015
1991-02-01,3866.7,252135,8.8,6.2,8265
1991-03-01,3913,252372,8,6.7,8586
1991-04-01,3907.1,252643,8.6,6.6,8439
1991-05-01,3933.2,252913,8.4,6.4,8736
1991-06-01,3940.5,253207,8.9,6.9,8692
1991-07-01,3966,253493,8.2,7,8586
1991-08-01,3969.1,253807,8.6,7.3,8666
1991-09-01,3984.7,254126,8.8,6.8,8722
1991-10-01,3976,254435,9.3,7.2,8842
1991-11-01,4003.6,254718,9,7.5,8931
1991-12-01,4020.5,254964,9.7,7.8,9198
1992-01-01,4084.7,255214,9.4,8.1,9283
1992-02-01,4099.5,255448,9.8,8.2,9454
1992-03-01,4117,255703,9.7,8.3,9460
1992-04-01,4131.5,255992,9.9,8.5,9415
1992-05-01,4158.4,256285,9.9,8.8,9744
1992-06-01,4177.1,256589,10.1,8.7,10040
1992-07-01,4204.8,256894,9.6,8.6,9850
1992-08-01,4220.9,257232,9.7,8.8,9787
1992-09-01,4255.3,257548,8.7,8.6,9781
1992-10-01,4284.7,257861,8,9,9398
1992-11-01,4300.5,258147,8,9,9565
1992-12-01,4336.4,258413,10.6,9.3,9557
1993-01-01,4340.7,258679,8.6,8.6,9325
1993-02-01,4355.3,258919,8.9,8.5,9183
1993-03-01,4352.5,259152,8.9,8.5,9056
1993-04-01,4393.4,259414,8.7,8.4,9110
1993-05-01,4422.4,259680,8.3,8.1,9149
1993-06-01,4440,259963,7.8,8.3,9121
1993-07-01,4468.9,260255,7.6,8.2,8930
1993-08-01,4481.1,260566,7.7,8.2,8763
1993-09-01,4511.5,260867,6.9,8.3,8714
1993-10-01,4532.8,261163,6.3,8,8750
1993-11-01,4554.1,261425,6.3,8.3,8542
1993-12-01,4571.1,261674,9.1,8.3,8477
1994-01-01,4585.1,261919,7.1,8.6,8630
1994-02-01,4632.6,262123,6.5,9.2,8583
1994-03-01,4646,262352,6.8,9.3,8470
1994-04-01,4671.1,262631,6.4,9.1,8331
1994-05-01,4669.5,262877,7.6,9.2,7915
1994-06-01,4708.9,263152,6.9,9.3,7927
1994-07-01,4720.6,263436,7,9,7946
1994-08-01,4762.6,263724,6.5,8.9,7933
1994-09-01,4775,264017,6.8,9.2,7734
1994-10-01,4812.9,264301,7.1,10,7632
1994-11-01,4825.6,264559,7,9,7375
1994-12-01,4841.6,264804,7.2,8.7,7230
1995-01-01,4851.2,265044,7.5,8,7375
1995-02-01,4850.8,265270,7.8,8.1,7187
1995-03-01,4885.4,265495,7.5,8.3,7153
1995-04-01,4890.2,265755,6.9,8.3,7645
1995-05-01,4933.1,265998,7.1,9.1,7430
1995-06-01,4977.5,266270,6.7,7.9,7427
1995-07-01,4970.2,266557,7.1,8.5,7527
1995-08-01,5005.3,266843,6.7,8.3,7484
1995-09-01,5020.5,267152,6.8,7.9,7478
1995-10-01,5013.9,267456,7.1,8.2,7328
1995-11-01,5055.6,267715,6.6,8,7426
1995-12-01,5097.5,267943,6.1,8.3,7423
1996-01-01,5085.7,268151,6.7,8.3,7491
1996-02-01,5132.8,268364,6.7,7.8,7313
1996-03-01,5173.3,268595,6.6,8.3,7318
1996-04-01,5208,268853,5.7,8.6,7415
1996-05-01,5223.8,269108,6.7,8.6,7423
1996-06-01,5229.8,269386,7.1,8.3,7095
1996-07-01,5251.9,269667,6.7,8.3,7337
1996-08-01,5275,269976,6.6,8.4,6882
1996-09-01,5296.6,270284,6.7,8.5,6979
1996-10-01,5328.5,270581,6.4,8.3,7031
1996-11-01,5351.2,270878,6.4,7.7,7236
1996-12-01,5378.6,271125,6.4,7.8,7253
1997-01-01,5411.1,271360,6.2,7.8,7158
1997-02-01,5434,271585,6.2,8.1,7102
1997-03-01,5454.2,271821,6.4,7.9,7000
1997-04-01,5459.3,272083,6.5,8.3,6873
1997-05-01,5460.2,272342,6.8,8,6655
1997-06-01,5494.2,272622,6.6,8,6799
1997-07-01,5548.8,272912,6.1,8.3,6655
1997-08-01,5587,273237,6,7.8,6608
1997-09-01,5601.7,273553,6.2,8.2,6656
1997-10-01,5637.7,273852,6.2,7.7,6454
1997-11-01,5661.1,274126,6.4,7.6,6308
1997-12-01,5692.1,274372,6.4,7.5,6476
1998-01-01,5689.9,274626,7.4,7.4,6368
1998-02-01,5723.8,274838,7.4,7,6306
1998-03-01,5750.3,275047,7.5,6.8,6422
1998-04-01,5788.1,275304,7.2,6.7,5941
1998-05-01,5837.9,275564,6.9,6,6047
1998-06-01,5871.7,275836,6.8,6.9,6212
1998-07-01,5890,276115,6.9,6.7,6259
1998-08-01,5925,276418,6.8,6.8,6179
1998-09-01,5965.6,276714,6.4,6.7,6300
1998-10-01,5998.8,277003,6.2,5.8,6280
1998-11-01,6015.4,277277,6.3,6.6,6100
1998-12-01,6070.5,277526,5.8,6.8,6032
1999-01-01,6072.9,277790,6.4,6.9,5976
1999-02-01,6101.8,277992,6.2,6.8,6111
1999-03-01,6132.9,278198,5.9,6.8,5783
1999-04-01,6196.2,278451,5.2,6.2,6004
1999-05-01,6225.7,278717,4.9,6.5,5796
1999-06-01,6254,279001,4.8,6.3,5951
1999-07-01,6281.5,279295,4.8,5.8,6025
1999-08-01,6326.5,279602,4.7,6.5,5838
1999-09-01,6378.8,279903,4.2,6,5915
1999-10-01,6402.1,280203,4.6,6.1,5778
1999-11-01,6437.9,280471,4.8,6.2,5716
1999-12-01,6538.7,280716,4.4,5.8,5653
2000-01-01,6535.3,280976,5.4,5.8,5708
2000-02-01,6619.7,281190,4.8,6.1,5858
2000-03-01,6685.8,281409,4.5,6,5733
2000-04-01,6671.1,281653,5,6.1,5481
2000-05-01,6707.6,281877,4.9,5.8,5758
2000-06-01,6743.9,282126,4.9,5.7,5651
2000-07-01,6764.1,282385,5.2,6,5747
2000-08-01,6799.1,282653,5.2,6.3,5853
2000-09-01,6882.9,282932,4.5,5.2,5625
2000-10-01,6888.2,283201,4.6,6.1,5534
2000-11-01,6902.4,283453,4.5,6.1,5639
2000-12-01,6945.7,283696,4.2,6,5634
2001-01-01,6977,283920,4.8,5.8,6023
2001-02-01,6995.8,284137,4.9,6.1,6089
2001-03-01,6987.9,284350,5.3,6.6,6141
2001-04-01,7001.2,284581,5,5.9,6271
2001-05-01,7047.1,284810,4.5,6.3,6226
2001-06-01,7060.7,285062,4.5,6,6484
2001-07-01,7072.2,285309,5.6,6.8,6583
2001-08-01,7108.9,285570,6.8,6.9,7042
2001-09-01,7012.8,285843,7,7.2,7142
2001-10-01,7208.4,286098,3.4,7.3,7694
2001-11-01,7167.9,286341,4.1,7.7,8003
2001-12-01,7147.7,286570,4.5,8.2,8258
2002-01-01,7174.3,286788,6.1,8.4,8182
2002-02-01,7218.3,286994,5.8,8.3,8215
2002-03-01,7237.2,287190,5.9,8.4,8304
2002-04-01,7305.4,287397,5.8,8.9,8599
2002-05-01,7282.7,287623,6.5,9.5,8399
2002-06-01,7318.2,287864,6.4,11,8393
2002-07-01,7380.4,288105,5.5,8.9,8390
2002-08-01,7401.5,288360,5.4,9,8304
2002-09-01,7391,288618,5.7,9.5,8251
2002-10-01,7430.7,288870,5.7,9.6,8307
2002-11-01,7459.7,289106,5.7,9.3,8520
2002-12-01,7512.8,289313,5.5,9.6,8640
2003-01-01,7533.1,289518,5.5,9.6,8520
2003-02-01,7535.9,289714,5.6,9.5,8618
2003-03-01,7598.4,289911,5.3,9.7,8588
2003-04-01,7621,290125,5.3,10.2,8842
2003-05-01,7628.1,290346,5.8,9.9,8957
2003-06-01,7678.6,290584,5.6,11.5,9266
2003-07-01,7738.2,290820,6.3,10.3,9011
2003-08-01,7834.5,291072,6,10.1,8896
2003-09-01,7835,291321,5.2,10.2,8921
2003-10-01,7845.7,291574,5.3,10.4,8732
2003-11-01,7899.6,291807,5.4,10.3,8576
2003-12-01,7929.2,292008,5.4,10.4,8317
2004-01-01,7987.4,292192,5,10.6,8370
2004-02-01,8019.8,292368,5,10.2,8167
2004-03-01,8076,292561,4.9,10.2,8491
2004-04-01,8088.6,292779,5.3,9.5,8170
2004-05-01,8163.2,292997,5.3,9.9,8212
2004-06-01,8147.2,293223,5.8,11,8286
2004-07-01,8218.9,293463,5.3,8.9,8136
2004-08-01,8253.1,293719,5.2,9.2,7990
2004-09-01,8321.1,293971,4.6,9.6,7927
2004-10-01,8374.6,294230,4.5,9.5,8061
2004-11-01,8420.6,294466,4.1,9.7,7932
2004-12-01,8481.5,294694,6.9,9.5,7934
2005-01-01,8470.2,294914,3.7,9.4,7784
2005-02-01,8529.2,295105,3.4,9.2,7980
2005-03-01,8569.5,295287,3.6,9.3,7737
2005-04-01,8645.6,295490,3.1,9,7672
2005-05-01,8643.9,295704,3.5,9.1,7651
2005-06-01,8724.8,295936,2.9,9,7524
2005-07-01,8829.5,296186,2.2,8.8,7406
2005-08-01,8832.4,296440,2.7,9.2,7345
2005-09-01,8885.8,296707,2.7,8.4,7553
2005-10-01,8926.6,296972,3.1,8.6,7453
2005-11-01,8938.5,297207,3.5,8.5,7566
2005-12-01,8969.6,297431,3.7,8.7,7279
2006-01-01,9059.8,297647,4.2,8.6,7064
2006-02-01,9090.1,297854,4.2,9.1,7184
2006-03-01,9122.1,298060,4.2,8.7,7072
2006-04-01,9174.8,298281,4,8.4,7120
2006-05-01,9215.1,298496,3.8,8.5,6980
2006-06-01,9240.8,298739,4,7.3,7001
2006-07-01,9322.6,298996,3.4,8,7175
2006-08-01,9321.8,299263,3.6,8.4,7091
2006-09-01,9354.7,299554,3.6,8,6847
2006-10-01,9373.2,299835,3.6,7.9,6727
2006-11-01,9380.2,300094,3.9,8.3,6872
2006-12-01,9469,300340,3.7,7.5,6762
2007-01-01,9516.3,300574,3.7,8.3,7116
2007-02-01,9546.8,300802,4.1,8.5,6927
2007-03-01,9585.1,301021,4.4,9.1,6731
2007-04-01,9615.7,301254,4.2,8.6,6850
2007-05-01,9651.3,301483,4,8.2,6766
2007-06-01,9667.3,301739,3.8,7.7,6979
2007-07-01,9709.6,302004,3.7,8.7,7149
2007-08-01,9753.9,302267,3.4,8.8,7067
2007-09-01,9797.9,302546,3.5,8.7,7170
2007-10-01,9827,302807,3.4,8.4,7237
2007-11-01,9897.8,303054,3.1,8.6,7240
2007-12-01,9908.4,303287,3.6,8.4,7645
2008-01-01,9930,303506,3.7,9,7685
2008-02-01,9913.4,303711,4.1,8.7,7497
2008-03-01,9959.4,303907,4,8.7,7822
2008-04-01,9996.8,304117,3.4,9.4,7637
2008-05-01,10053.8,304323,7.8,7.9,8395
2008-06-01,10107.9,304556,5.5,9,8575
2008-07-01,10104.7,304798,4.4,9.7,8937
2008-08-01,10094.7,305045,3.8,9.7,9438
2008-09-01,10043.5,305309,4.7,10.2,9494
2008-10-01,9960.3,305554,5.5,10.4,10074
2008-11-01,9820.8,305786,6.4,9.8,10538
2008-12-01,9730.7,306004,6.4,10.5,11286
2009-01-01,9783.8,306208,6.2,10.7,12058
2009-02-01,9766,306402,5.5,11.7,12898
2009-03-01,9718.5,306588,5.9,12.3,13426
2009-04-01,9724.8,306787,6.8,13.1,13853
2009-05-01,9748.9,306984,8.2,14.2,14499
2009-06-01,9806.9,307206,6.7,17.2,14707
2009-07-01,9841.7,307439,6,16,14601
2009-08-01,9961,307685,4.9,16.3,14814
2009-09-01,9883.4,307946,5.9,17.8,15009
2009-10-01,9931.9,308189,5.4,18.9,15352
2009-11-01,9940.5,308418,5.9,19.8,15219
2009-12-01,9998.9,308633,5.9,20.1,15098
2010-01-01,10001.8,308833,6.1,20,15046
2010-02-01,10030.6,309027,5.8,19.9,15113
2010-03-01,10089.1,309212,5.7,20.4,15202
2010-04-01,10112.9,309191.211,6.4,22.1,15325
2010-05-01,10131,309369.053,7,22.3,14849
2010-06-01,10151.4,309548.502,6.9,25.2,14474
2010-07-01,10184.7,309745.698,6.8,22.3,14512
2010-08-01,10228.2,309957.775,6.9,21,14648
2010-09-01,10249,310176.466,6.7,20.3,14579
2010-10-01,10304.7,310399.958,6.6,21.2,14516
2010-11-01,10354.7,310595.764,6.6,21,15081
2010-12-01,10392.1,310781.705,7.1,21.9,14348
2011-01-01,10435.5,310960.74,7.4,21.5,14013
2011-02-01,10470.1,311113.376,7.6,21.1,13820
2011-03-01,10550.5,311265.404,7,21.5,13737
2011-04-01,10587.6,311436.238,6.9,20.9,13957
2011-05-01,10612,311607.08,6.9,21.6,13855
2011-06-01,10636.8,311791.223,7.2,22.4,13962
2011-07-01,10677.5,311997.049,7.3,22,13763
2011-08-01,10700.6,312205.367,7.2,22.4,13818
2011-09-01,10738.1,312429.118,6.8,22,13948
2011-10-01,10753.1,312644.159,6.8,20.6,13594
2011-11-01,10759.5,312829.523,7,20.8,13302
2011-12-01,10772.2,313009.712,7.8,20.5,13093
2012-01-01,10862.1,313183.179,8,20.8,12797
2012-02-01,10953.5,313338.977,8,19.7,12813
2012-03-01,10951.8,313499.369,8.5,19.2,12713
2012-04-01,10979.7,313667.127,8.7,19.1,12646
2012-05-01,10968.6,313830.53,8.8,19.9,12660
2012-06-01,10946.3,314017.594,9.1,20.4,12692
2012-07-01,10977.2,314210.786,8.2,17.5,12656
2012-08-01,11004.1,314422.341,8,18.4,12471
2012-09-01,11061.5,314646.749,8.2,18.8,12115
2012-10-01,11099.8,314853.978,8.8,19.9,12124
2012-11-01,11136.8,315053.863,9.7,18.6,12005
2012-12-01,11140.5,315232.752,12,17.7,12298
2013-01-01,11202.8,315389.595,6.3,15.8,12471
2013-02-01,11239.6,315520.143,5.8,17.2,11950
2013-03-01,11227.1,315662.224,5.9,17.6,11689
2013-04-01,11205.4,315817.855,6.4,17.1,11760
2013-05-01,11244.6,315983.654,6.7,17.1,11654
2013-06-01,11268.8,316171.042,6.8,17,11751
2013-07-01,11296.7,316358.778,6.6,16.2,11335
2013-08-01,11329.2,316580.327,6.7,16.5,11279
2013-09-01,11366.9,316806.125,6.8,16.5,11270
2013-10-01,11419.8,317022.27,6.3,16.3,11136
2013-11-01,11487.6,317228.026,6.2,17.1,10787
2013-12-01,11517.9,317411.551,6.4,17.3,10404
2014-01-01,11512.5,317593.923,7.1,15.4,10202
2014-02-01,11566.2,317753.883,7.3,15.9,10349
2014-03-01,11643,317917.203,7.4,15.8,10380
2014-04-01,11702.6,318089.218,7.4,15.7,9702
2014-05-01,11748.4,318269.505,7.4,14.6,9859
2014-06-01,11817,318464.152,7.4,13.8,9460
2014-07-01,11860.5,318662.368,7.5,13.1,9608
2014-08-01,11944.3,318893.786,7.2,12.9,9599
2014-09-01,11957.4,319125.296,7.4,13.4,9262
2014-10-01,12023,319353.734,7.2,13.6,8990
2014-11-01,12051.4,319564.209,7.3,13,9090
2014-12-01,12062,319746.157,7.6,12.9,8717
2015-01-01,12046,319928.646,7.7,13.2,8903
2015-02-01,12082.4,320074.511,7.9,12.9,8610
2015-03-01,12158.3,320230.786,7.4,12,8504
2015-04-01,12193.8,320402.295,7.6,11.5,8526
`,Pp=`wave_length,chlorophyll_a,chlorophyll_b,beta_carotene
300,17585,36334,31887
301,17746,28789,28383
302,17921,28983,23951
303,18230,29194,22136
304,18037,29369,21911
305,17898,29545,19150
306,19027,29689,20245
307,19211,29760,16808
308,19247,29821,17605
309,19151,29770,16218
310,19448,29677,19488
311,20087,29598,12223
312,20229,29388,15633
313,20289,29115,15457
314,20458,28886,14421
315,20774,28629,13471
316,21325,28386,17722
317,20683,28215,13444
318,21443,28092,14142
319,21159,28056,15398
320,20719,28111,15561
321,20623,28247,11989
322,20571,28499,12133
323,21028,28764,14687
324,20767,29128,12457
325,20423,29536,13309
326,21204,29939,12120
327,20485,30389,11822
328,20497,30771,12624
329,19660,31065,13106
330,19952,31294,14421
331,19712,31411,13691
332,19457,31487,14903
333,19858,31475,14660
334,19972,31440,13655
335,19737,31311,14272
336,19792,31146,13565
337,20016,30964,13975
338,19879,30757,12939
339,19609,30507,16245
340,19788,30215,13791
341,19864,29915,15889
342,20312,29586,13854
343,20431,29202,15475
344,20194,28792,14056
345,20822,28410,13953
346,21160,27930,14944
347,21729,27522,15281
348,21787,27143,15565
349,22780,26832,14002
350,22942,26563,15786
351,23657,26339,15020
352,24150,26191,16236
353,23931,26077,15254
354,25319,26042,13822
355,25709,25962,16583
356,26062,25920,15380
357,27068,25840,17934
358,27828,25783,15781
359,28334,25642,15664
360,29121,25342,15412
361,29660,24913,17907
362,30685,24414,16673
363,31303,23886,17646
364,32139,23453,16786
365,33467,23281,17686
366,33981,23286,19529
367,34644,23099,19776
368,35574,22822,18574
369,36503,22437,20028
370,37075,22153,21609
371,37709,21855,21555
372,38688,21598,23641
373,38988,21490,25019
374,39844,21330,25361
375,40550,21231,26555
376,41269,21114,26451
377,41776,20963,27451
378,42151,20687,28577
379,43604,20242,29928
380,44338,19822,29757
381,44940,19245,32432
382,45822,18562,31068
383,46769,17758,31968
384,48197,16924,34923
385,49328,16043,35004
386,50688,15221,35626
387,52296,14484,37833
388,54796,13812,38454
389,56507,13319,40003
390,58651,12947,41850
391,60792,12660,43976
392,63313,12542,45904
393,65459,12509,46849
394,68156,12671,50925
395,69779,12860,50151
396,71287,13167,51624
397,72727,13546,55420
398,74188,13899,56407
399,75184,14267,59213
400,75612,14676,58312
401,76400,15115,61185
402,77603,15452,62302
403,78597,15765,62919
404,79430,16163,63627
405,81178,16479,66126
406,82318,16865,66631
407,84311,17382,68117
408,86913,17918,68189
409,89837,18616,70135
410,92894,19507,73202
411,96554,20512,75463
412,99818,21799,76634
413,102794,23352,78692
414,105342,25144,80426
415,108519,27244,82223
416,110236,29668,86389
417,110856,32328,88259
418,110933,35254,91672
419,110466,38325,94789
420,107236,41559,97374
421,104360,44667,99496
422,99829,47522,100442
423,94412,49952,103176
424,88638,52112,103338
425,82013,53870,105923
426,74992,55180,106094
427,68132,56021,105774
428,60767,56518,106824
429,53623,56702,107216
430,47221,56572,106824
431,41267,56358,107571
432,35707,56072,109040
433,31136,55696,109801
434,26830,55601,110003
435,22958,55941,111436
436,19753,56650,113197
437,17175,58078,114129
438,15126,60342,116147
439,13722,63471,117944
440,12069,67693,120966
441,11033,73210,123367
442,9946,79374,126781
443,9012,86748,127835
444,8475,95091,130510
445,7909,104228,132086
446,7064,113968,135095
447,6572,123449,135383
448,5994,132779,136270
449,5469,141291,136698
450,5207,148843,138730
451,4901,154236,139500
452,4591,157923,137401
453,4331,159100,137572
454,4104,158187,135550
455,3871,155008,133122
456,3641,149978,130983
457,3487,143136,129478
458,3481,134862,126808
459,3265,125822,124367
460,3269,116543,121173
461,3077,106810,118336
462,3074,96978,116273
463,3222,86967,113535
464,3287,77317,112332
465,3227,68661,110148
466,3213,60691,110161
467,3260,53141,107995
468,3249,45617,108432
469,3078,39375,107607
470,3176,33586,108427
471,3338,28349,109283
472,3184,23809,109197
473,3355,19963,110148
474,3227,16880,111409
475,3214,14215,112395
476,3353,12042,111765
477,3408,10306,110404
478,3179,8826,112368
479,3495,7650,110711
480,3433,6707,110769
481,3560,5972,108409
482,3356,5430,106765
483,3440,4983,104356
484,3352,4589,100162
485,3509,4184,96757
486,3734,3919,95114
487,3661,4150,89497
488,3655,3927,85047
489,3946,3764,80611
490,4137,3737,76107
491,4311,3707,70999
492,4308,3704,66887
493,4472,3676,62996
494,4651,3663,58560
495,4864,3634,52736
496,5124,3646,49926
497,5194,3689,45332
498,5405,3737,40458
499,5534,3668,36337
500,5772,3720,32662
501,5828,3715,29933
502,5967,3718,26257
503,6052,3727,24686
504,6235,3718,20673
505,6281,3734,19186
506,6209,3717,16867
507,6327,3699,15434
508,6299,3705,13286
509,6175,3737,11259
510,6097,3746,10985
511,6060,3765,9890
512,5802,3725,8039
513,5717,3780,7994
514,5700,3824,7147
515,5801,3889,6539
516,5826,3908,4963
517,5717,3923,4585
518,5728,4016,4350
519,5549,4053,4589
520,5811,4131,3386
521,5795,4223,4305
522,6091,4325,4188
523,6195,4371,2670
524,6233,4524,1621
525,6360,4625,2026
526,6487,4716,1806
527,6738,4836,319
528,6879,5018,1999
529,7142,5197,3026
530,7459,5365,2229
531,7508,5504,1562
532,7656,5689,1810
533,7716,5835,1801
534,8109,6041,540
535,8127,6152,454
536,8064,6366,1184
537,7918,6422,986
538,7859,6537,-405
539,7433,6682,2062
540,7336,6775,2143
541,7098,6848,909
542,6840,6896,1157
543,6648,6978,1229
544,6311,7026,571
545,6119,7078,702
546,5899,7101,963
547,5756,7106,1923
548,5610,7117,1292
549,5696,7130,900
550,5629,7126,1369
551,5519,7124,1675
552,5508,7108,-495
553,5619,7119,621
554,5727,7175,234
555,5852,7201,747
556,5758,7260,13
557,5835,7294,1490
558,5965,7365,459
559,6059,7474,1026
560,6171,7553,-1184
561,6199,7637,801
562,6237,7686,1112
563,6279,7733,-211
564,6253,7775,-481
565,6269,7821,1585
566,6246,7841,1252
567,6171,7838,-198
568,6187,7840,-423
569,6257,7813,193
570,6054,7790,653
571,6182,7770,1216
572,5859,7750,175
573,5542,7750,472
574,5743,7711,1026
575,5437,7760,972
576,5408,7757,1116
577,5242,7816,1576
578,5142,7912,175
579,5058,8116,684
580,4913,8284,833
581,4995,8543,1189
582,4770,8759,481
583,4777,9102,657
584,4849,9406,319
585,5029,9670,1107
586,5171,10005,1445
587,5192,10269,355
588,5365,10511,1175
589,5757,10758,1490
590,5755,10928,103
591,5944,11100,-193
592,6321,11223,891
593,6573,11237,626
594,6912,11284,558
595,7315,11239,1022
596,7436,11173,1391
597,7765,11004,346
598,8081,10779,36
599,8407,10469,630
600,8506,10223,734
601,8773,9917,81
602,8620,9607,-603
603,8874,9300,635
604,9108,9070,936
605,9029,8872,680
606,8974,8713,1238
607,9090,8676,792
608,9062,8614,-144
609,8932,8588,891
610,8720,8581,1630
611,8696,8579,1130
612,8471,8543,441
613,8252,8482,1693
614,7958,8396,698
615,8003,8294,684
616,7867,8221,-139
617,7498,8134,463
618,7477,8033,1067
619,7225,8046,603
620,6861,8099,1743
621,6876,8269,1026
622,6865,8498,432
623,6641,8880,662
624,6574,9409,869
625,6513,10115,1779
626,6453,10987,346
627,6427,12092,1202
628,6651,13425,1977
629,6726,15014,1914
630,6695,16858,535
631,6690,19057,571
632,7037,21721,1981
633,7034,24723,837
634,7407,28346,738
635,8073,32389,1684
636,8349,36755,1071
637,8919,41277,1688
638,9367,45732,1234
639,9925,49740,1589
640,10991,53160,936
641,11695,55667,720
642,12802,56996,1603
643,14031,57050,585
644,15496,55818,1634
645,16814,53177,346
646,18416,49572,1909
647,19916,45155,1837
648,21270,40327,621
649,22803,35250,1022
650,24413,30267,553
651,25795,25543,297
652,27265,21326,562
653,29075,17654,400
654,30001,14590,1472
655,30695,11576,1094
656,31691,9248,666
657,32093,8660,1594
658,32522,7115,914
659,32625,5874,36
660,32635,5093,454
661,32342,4386,1504
662,31973,3871,-67
663,31642,3459,306
664,30685,3055,1040
665,29915,2724,666
666,28587,2435,544
667,27242,2247,378
668,26030,2065,562
669,24230,1897,-486
670,22450,1748,1409
671,20745,1657,283
672,18560,1548,387
673,16761,1486,-175
674,14453,1417,945
675,12682,1355,234
676,11167,1329,414
677,9519,1266,639
678,8451,1229,-153
679,7366,1163,941
680,6440,1101,472
681,5405,1041,684
682,4754,982,-54
683,4347,932,-135
684,3797,863,72
685,3253,813,513
686,2847,763,675
687,2578,715,-310
688,2531,671,810
689,2246,653,720
690,2043,621,599
691,1977,576,54
692,1769,570,486
693,1482,537,171
694,1513,524,157
695,1252,502,-58
696,1182,501,-171
697,916,495,743
698,1099,482,409
699,1018,459,252
700,865,460,1436
`,Ts=(e,t)=>{const n=e.__vccOpts||e;for(const[i,r]of t)n[i]=r;return n},Ap={class:"plot-container"},Lp={__name:"geom",setup(e){const t=_p.toLowerCase().replace(/[^a-z]/g,"").split(""),n=Object.entries(Tp).map(([a,l])=>({model:a,...l})),i=o(ku),r=o(Pp).flatMap(({wave_length:a,...l})=>Object.entries(l).map(([c,u])=>({wave_length:a,pigment:c,molar_extinction:u})));function o(a){function l(h){if(!isNaN(h))return+h;if(/^\d{4}-\d{1,2}-\d{1,2}$/.test(h)){let[f,d,x]=h.split("-").map(b=>+b);return Date.UTC(f,d-1,x)}return h}let[c,...u]=a.replace(/\r/g,"").split(`
`).filter(h=>h);return c=c.split(","),u.map(h=>Object.fromEntries(h.split(",").map((f,d)=>[c[d],l(f)])))}const s=Ir("canvas");return(a,l)=>(D(),G(ue,null,[ae("div",null,[l[2]||(l[2]=Xn(" render: ",-1)),$a(ae("select",{"onUpdate:modelValue":l[0]||(l[0]=c=>s.value=c)},[...l[1]||(l[1]=[ae("option",{value:"svg"},"svg",-1),ae("option",{value:"canvas"},"canvas",-1)])],512),[[mc,s.value]])]),ae("div",Ap,[l[3]||(l[3]=ae("pre",{class:"code"},Fe(`<VVPlot :data="mtcars">
    <VVGeomPoint :x="d => d.wt" :y="d => d.mpg" shape="triangle" />
    <VVGeomText :x="d => d.wt" :y="d => d.mpg" :label="d => d.model" :alpha="0.5" />
    <VVGeomSegment :x="d => d.x1" :y="d => d.y1" :xend="d => d.x2" :yend="d => d.y2"
        :data="[{ x1: 2.62, x2: 3.57, y1: 21, y2: 15 }]" color="red" />
</VVPlot>`),-1)),ne(V(at),{data:V(n)},{default:je(()=>[ne(V(Vn),{x:c=>c.wt,y:c=>c.mpg,shape:"triangle",render:s.value},null,8,["x","y","render"]),ne(V(Yo),{x:c=>c.wt,y:c=>c.mpg,label:c=>c.model,alpha:.5,render:s.value},null,8,["x","y","label","render"]),ne(V(Su),{x:c=>c.x1,y:c=>c.y1,xend:c=>c.x2,yend:c=>c.y2,data:[{x1:2.62,x2:3.57,y1:21,y2:15}],color:"red",render:s.value},null,8,["x","y","xend","yend","render"])]),_:1},8,["data"]),l[4]||(l[4]=ae("hr",null,null,-1)),l[5]||(l[5]=ae("pre",{class:"code"},Fe(`<VVPlot :data="UCBAdmissions">
    <VVAxisX title="type" />
    <VVAxisY position="right" title="class" />
    <VVGeomTile :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :fill="d => d.Freq" :width="0.8"
        :height="0.8" :scales="{ fill: vvscale.color.gradient2({ midpoint: null }) }" :render />
    <VVGeomText :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :color="d => d.Freq" :label="d => d.Freq"
        :render />
</VVPlot>`),-1)),ne(V(at),{data:V(Sp)},{default:je(()=>[ne(V(bn),{title:"type"}),ne(V(rn),{position:"right",title:"class"}),ne(V(_u),{x:c=>c.Gender+"_"+c.Admit,y:c=>c.Dept,fill:c=>c.Freq,width:.8,height:.8,scales:{fill:V(fn).color.gradient2({midpoint:null})},render:s.value},null,8,["x","y","fill","scales","render"]),ne(V(Yo),{x:c=>c.Gender+"_"+c.Admit,y:c=>c.Dept,color:c=>c.Freq,label:c=>c.Freq,render:s.value},null,8,["x","y","color","label","render"])]),_:1},8,["data"]),l[6]||(l[6]=ae("hr",null,null,-1)),l[7]||(l[7]=ae("pre",{class:"code"},Fe(`<VVPlot :data="economics">
    <VVAxisX title="unemployment rate" :min-range="0" />
    <VVAxisY title="personal savings rate" />
    <VVGeomPath :x="d => d.unemploy / d.pop" :y="d => d.psavert" :color="(d, i) => i"
        :scales="{ color: vvscale.color.hue() }" />
</VVPlot>`),-1)),ne(V(at),{data:V(i)},{default:je(()=>[ne(V(bn),{title:"unemployment rate","min-range":0}),ne(V(rn),{title:"personal savings rate"}),ne(V(wu),{x:c=>c.unemploy/c.pop,y:c=>c.psavert,color:(c,u)=>u,scales:{color:V(fn).color.hue()},render:s.value},null,8,["x","y","color","scales","render"])]),_:1},8,["data"]),l[8]||(l[8]=ae("hr",null,null,-1)),l[9]||(l[9]=ae("pre",{class:"code"},Fe(`<VVPlot :data="letters">
    <VVAxisY :min="0" :expand-mult="0" />
    <VVGeomBar :x="d => d" :fill="d => d" :scales="{ fill: vvscale.custom((v) => ['blue', 'gold'][v % 2]) }" />
</VVPlot>`),-1)),ne(V(at),{data:V(t)},{default:je(()=>[ne(V(rn),{min:0,"expand-mult":0}),ne(V(xu),{x:c=>c,fill:c=>c,scales:{fill:V(fn).custom(c=>["blue","gold"][c%2])},render:s.value},null,8,["x","fill","scales","render"])]),_:1},8,["data"]),l[10]||(l[10]=ae("hr",null,null,-1)),l[11]||(l[11]=ae("pre",{class:"code"},Fe(`<VVPlot :data="iris">
    <VVGeomHistogram :x="d => d.Petal_Width" :color="d => d.Species" :fill="d => d.Species" :alpha="0.5" :scales="{ color: vvscale.color.hue({ l: 45 }) }" />
</VVPlot>`),-1)),ne(V(at),{data:V(zn)},{default:je(()=>[ne(V(bu),{x:c=>c.Petal_Width,color:c=>c.Species,fill:c=>c.Species,render:s.value,alpha:.5,scales:{color:V(fn).color.hue({l:45})}},null,8,["x","color","fill","render","scales"])]),_:1},8,["data"]),l[12]||(l[12]=ae("hr",null,null,-1)),l[13]||(l[13]=ae("pre",{class:"code"},Fe(`<VVPlot :data="pigments">
    <VVGeomLine :x="d => d.wave_length" :y="d => d.molar_extinction" :color="d => d.pigment" :group="d => d.pigment"
        :scales="{ color: vvscale.color.manual({ values: { beta_carotene: 'orangered', chlorophyll_a: 'limegreen', chlorophyll_b: 'royalblue' } }) }" />
</VVPlot>`),-1)),ne(V(at),{data:V(r)},{default:je(()=>[ne(V(Pr),{x:c=>c.wave_length,y:c=>c.molar_extinction,color:c=>c.pigment,group:c=>c.pigment,render:s.value,scales:{color:V(fn).color.manual({values:{beta_carotene:"orangered",chlorophyll_a:"limegreen",chlorophyll_b:"royalblue"}})}},null,8,["x","y","color","group","render","scales"])]),_:1},8,["data"]),l[14]||(l[14]=ae("hr",null,null,-1)),l[15]||(l[15]=ae("pre",{class:"code"},Fe(`<VVPlot :data="iris">
    <VVGeomPolygon :points="d => [
        { x: d.Petal_Width - 0.1, y: d.Sepal_Length },
        { x: d.Petal_Width, y: d.Sepal_Length - 0.1 },
        { x: d.Petal_Width + 0.1, y: d.Sepal_Length },
        { x: d.Petal_Width, y: d.Sepal_Length + 0.1 },
    ]" :color="d => d.Species" :fill="d => d.Species" :render />
</VVPlot>`),-1)),ne(V(at),{data:V(zn)},{default:je(()=>[ne(V(vu),{points:c=>[{x:c.Petal_Width-.1,y:c.Sepal_Length},{x:c.Petal_Width,y:c.Sepal_Length-.1},{x:c.Petal_Width+.1,y:c.Sepal_Length},{x:c.Petal_Width,y:c.Sepal_Length+.1}],color:c=>c.Species,fill:c=>c.Species,render:s.value},null,8,["points","color","fill","render"])]),_:1},8,["data"]),l[16]||(l[16]=ae("hr",null,null,-1))])],64))}},Mp=Ts(Lp,[["__scopeId","data-v-c830b263"]]),Cp={class:"plot-container"},Wp={__name:"theme",setup(e){return(t,n)=>(D(),G("div",Cp,[n[0]||(n[0]=ae("h4",null,"default",-1)),ne(V(at),{data:V(zn)},{default:je(()=>[ne(V(Vn),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data"]),n[1]||(n[1]=ae("h4",null,"light",-1)),ne(V(at),{data:V(zn),theme:V(yl).light},{default:je(()=>[ne(V(Vn),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data","theme"]),n[2]||(n[2]=ae("h4",null,"classic",-1)),ne(V(at),{data:V(zn),theme:V(yl).classic},{default:je(()=>[ne(V(Vn),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data","theme"])]))}},Np=Ts(Wp,[["__scopeId","data-v-05226fb3"]]),$p={default:{"":1,k:1e3,M:1e6,G:1e9,T:1e12,P:1e15,E:1e18,Z:1e21,Y:1e24}};function Ep(){return function(e,t,n){let i=Array.from(n).sort((s,a)=>s-a),r=i.slice(1).map((s,a)=>s-i[a]).reduce((s,a)=>s<a?s:a),o=Math.round(-Math.log10(r))+1;return o<0&&(o=0),o>20&&(o=20),String(+e.toFixed(o))}}function ea({accuracy:e,scale:t=1,prefix:n="",suffix:i="",big_mark:r=" ",style_positive:o="none",style_negative:s="hyphen",scale_cut:a={"":1}}={}){let l={plus:"+",space:" "}[o]??"",c={hyphen:"-",minus:"−",parens:"("}[s]??"";return function(u,h,f=[u]){let d;if(e)d=e;else if(f.length>1){let M=f.filter(m=>isFinite(m)).sort((m,_)=>m-_);d=M.slice(1).map((m,_)=>m-M[_]).reduce((m,_)=>m<_?m:_)*t}else d=u||1;let x=Object.entries(a).sort((M,C)=>C[1]-M[1]).find(M=>M[1]<=d)?.[0]??"",b=(x==""?"":" ")+x+i;d=d/(a[x]??1);let R=Math.max(0,Math.ceil(-Math.log10(d))),F=Math.round(u*t/(a[x]??1)/d)*d,E=n+(F>0?l:F<0?c:"");return F<0&&s=="parens"&&(b=")"+b),F=Math.abs(F).toFixed(R).replace(new RegExp("(?<!\\..*)(\\d)(?=(?:\\d{3})+(?:\\.|$))","g"),"$1"+r),E+F+b}}function Ip(){return function(e,t,n){return new Date(e).toISOString().replace("T"," ").replace("Z","")}}const yo={number:ea,auto:Ep,timestamp:Ip,default:function(e){return ea({scale_cut:$p.default,...e})}},Op={class:"plot-container"},Rp={__name:"label",setup(e){const t=n(ku);function n(i){function r(a){if(!isNaN(a))return+a;if(/^\d{4}-\d{1,2}-\d{1,2}$/.test(a)){let[l,c,u]=a.split("-").map(h=>+h);return Date.UTC(l,c-1,u)}return a}let[o,...s]=i.replace(/\r/g,"").split(`
`).filter(a=>a);return o=o.split(","),s.map(a=>Object.fromEntries(a.split(",").map((l,c)=>[o[c],r(l)])))}return(i,r)=>(D(),G("div",Op,[ne(V(at),{data:V(t)},{default:je(()=>[ne(V(bn),{labels:V(yo).timestamp()},null,8,["labels"]),ne(V(Pr),{x:o=>o.date,y:o=>o.pop},null,8,["x","y"])]),_:1},8,["data"]),ne(V(at),{data:V(t)},{default:je(()=>[ne(V(bn),{labels:V(yo).timestamp()},null,8,["labels"]),ne(V(rn),{labels:V(yo).default(),min:0},null,8,["labels"]),ne(V(Pr),{x:o=>o.date,y:o=>o.unemploy},null,8,["x","y"])]),_:1},8,["data"])]))}},Fp=Ts(Rp,[["__scopeId","data-v-a9e28f67"]]),jp={class:"flex p-4"},Dp={__name:"action",setup(e){const t=st("legend");return(n,i)=>(D(),G("div",jp,[ne(V(at),{data:V(zn),width:600,height:400,resize:"","legend-teleport":t.value},{"y-axis":je(()=>[ne(V(rn),{position:"none",min:0,max:8,reverse:""}),ne(V(rn),{position:"left",secondary:""},{default:je(()=>[ne(V(Zt),{zoom:{max:10,min:-2},move:{min:-2},rescale:{max:10}})]),_:1}),ne(V(rn),{position:"right",secondary:""})]),"x-axis":je(()=>[ne(V(bn),{position:"none",min:0,max:8,"expand-add":1}),ne(V(bn),{position:"bottom",secondary:""},{default:je(()=>[ne(V(Zt),{move:"",nudge:{shift:!0},min:-2,max:10}),ne(V(Zt),{zoom:{max:10},rescale:{max:10},"min-range":4})]),_:1})]),action:je(()=>[ne(V(Zt),{select:"",x:"",y:""}),ne(V(Zt),{nudge:"",shift:"",x:"",y:""}),ne(V(Zt),{move:{button:"right"},x:"",y:"",xmin:-2,xmax:10,ymin:-2}),ne(V(Zt),{zoom:"",x:"",y:"",xmax:10,ymin:-2,ymax:10})]),default:je(()=>[ne(V(Vn),{x:r=>r.Petal_Width,y:r=>r.Sepal_Length,color:r=>r.Species},null,8,["x","y","color"])]),_:1},8,["data","legend-teleport"]),ae("div",{ref_key:"legend",ref:t},null,512)]))}},Vp={class:"content"},zp=["value"],Bp={__name:"index",setup(e){const t=Ir("geom"),n={geom:Mp,theme:Np,label:Fp,action:Dp};return(i,r)=>(D(),G("div",Vp,[ae("div",null,[r[1]||(r[1]=Xn(" example: ",-1)),$a(ae("select",{"onUpdate:modelValue":r[0]||(r[0]=o=>t.value=o)},[(D(),G(ue,null,Le(n,(o,s)=>ae("option",{key:s,value:s},Fe(s),9,zp)),64))],512),[[mc,t.value]])]),(D(),ct(as(n[t.value])))]))}};qf(Bp).mount("#app");
