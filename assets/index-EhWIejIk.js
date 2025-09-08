(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ns(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const be={},In=[],$t=()=>{},Wn=()=>!1,Er=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),is=e=>e.startsWith("onUpdate:"),je=Object.assign,rs=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Cu=Object.prototype.hasOwnProperty,_e=(e,t)=>Cu.call(e,t),ce=Array.isArray,On=e=>Ti(e)==="[object Map]",Ir=e=>Ti(e)==="[object Set]",Is=e=>Ti(e)==="[object Date]",he=e=>typeof e=="function",Ne=e=>typeof e=="string",kt=e=>typeof e=="symbol",Ce=e=>e!==null&&typeof e=="object",la=e=>(Ce(e)||he(e))&&he(e.then)&&he(e.catch),aa=Object.prototype.toString,Ti=e=>aa.call(e),Wu=e=>Ti(e).slice(8,-1),ca=e=>Ti(e)==="[object Object]",os=e=>Ne(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,si=ns(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Or=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},$u=/-\w/g,dt=Or(e=>e.replace($u,t=>t.slice(1).toUpperCase())),Nu=/\B([A-Z])/g,cn=Or(e=>e.replace(Nu,"-$1").toLowerCase()),Vr=Or(e=>e.charAt(0).toUpperCase()+e.slice(1)),qi=Or(e=>e?`on${Vr(e)}`:""),st=(e,t)=>!Object.is(e,t),Gi=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},ua=(e,t,n,i=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:i,value:n})},ha=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Os;const Dr=()=>Os||(Os=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Pi(e){if(ce(e)){const t={};for(let n=0;n<e.length;n++){const i=e[n],r=Ne(i)?Vu(i):Pi(i);if(r)for(const o in r)t[o]=r[o]}return t}else if(Ne(e)||Ce(e))return e}const Eu=/;(?![^(]*\))/g,Iu=/:([^]+)/,Ou=/\/\*[^]*?\*\//g;function Vu(e){const t={};return e.replace(Ou,"").split(Eu).forEach(n=>{if(n){const i=n.split(Iu);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Sn(e){let t="";if(Ne(e))t=e;else if(ce(e))for(let n=0;n<e.length;n++){const i=Sn(e[n]);i&&(t+=i+" ")}else if(Ce(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function ss(e){if(!e)return null;let{class:t,style:n}=e;return t&&!Ne(t)&&(e.class=Sn(t)),n&&(e.style=Pi(n)),e}const Du="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ru=ns(Du);function fa(e){return!!e||e===""}function Fu(e,t){if(e.length!==t.length)return!1;let n=!0;for(let i=0;n&&i<e.length;i++)n=Rr(e[i],t[i]);return n}function Rr(e,t){if(e===t)return!0;let n=Is(e),i=Is(t);if(n||i)return n&&i?e.getTime()===t.getTime():!1;if(n=kt(e),i=kt(t),n||i)return e===t;if(n=ce(e),i=ce(t),n||i)return n&&i?Fu(e,t):!1;if(n=Ce(e),i=Ce(t),n||i){if(!n||!i)return!1;const r=Object.keys(e).length,o=Object.keys(t).length;if(r!==o)return!1;for(const s in e){const a=e.hasOwnProperty(s),l=t.hasOwnProperty(s);if(a&&!l||!a&&l||!Rr(e[s],t[s]))return!1}}return String(e)===String(t)}function ju(e,t){return e.findIndex(n=>Rr(n,t))}const da=e=>!!(e&&e.__v_isRef===!0),Ee=e=>Ne(e)?e:e==null?"":ce(e)||Ce(e)&&(e.toString===aa||!he(e.toString))?da(e)?Ee(e.value):JSON.stringify(e,ma,2):String(e),ma=(e,t)=>da(t)?ma(e,t.value):On(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[i,r],o)=>(n[no(i,o)+" =>"]=r,n),{})}:Ir(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>no(n))}:kt(t)?no(t):Ce(t)&&!ce(t)&&!ca(t)?String(t):t,no=(e,t="")=>{var n;return kt(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ge;class zu{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Ge,!t&&Ge&&(this.index=(Ge.scopes||(Ge.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=Ge;try{return Ge=this,t()}finally{Ge=n}}}on(){++this._on===1&&(this.prevScope=Ge,Ge=this)}off(){this._on>0&&--this._on===0&&(Ge=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,i=this.scopes.length;n<i;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function ga(){return Ge}function Hu(e,t=!1){Ge&&Ge.cleanups.push(e)}let Me;const io=new WeakSet;class pa{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ge&&Ge.active&&Ge.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,io.has(this)&&(io.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||xa(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Vs(this),ba(this);const t=Me,n=_t;Me=this,_t=!0;try{return this.fn()}finally{wa(this),Me=t,_t=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)cs(t);this.deps=this.depsTail=void 0,Vs(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?io.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){_o(this)&&this.run()}get dirty(){return _o(this)}}let ya=0,li,ai;function xa(e,t=!1){if(e.flags|=8,t){e.next=ai,ai=e;return}e.next=li,li=e}function ls(){ya++}function as(){if(--ya>0)return;if(ai){let t=ai;for(ai=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;li;){let t=li;for(li=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){e||(e=i)}t=n}}if(e)throw e}function ba(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function wa(e){let t,n=e.depsTail,i=n;for(;i;){const r=i.prevDep;i.version===-1?(i===n&&(n=r),cs(i),Bu(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}e.deps=t,e.depsTail=n}function _o(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(va(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function va(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===gi)||(e.globalVersion=gi,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!_o(e))))return;e.flags|=2;const t=e.dep,n=Me,i=_t;Me=e,_t=!0;try{ba(e);const r=e.fn(e._value);(t.version===0||st(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{Me=n,_t=i,wa(e),e.flags&=-3}}function cs(e,t=!1){const{dep:n,prevSub:i,nextSub:r}=e;if(i&&(i.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=i,e.nextSub=void 0),n.subs===e&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let o=n.computed.deps;o;o=o.nextDep)cs(o,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Bu(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let _t=!0;const Sa=[];function Ut(){Sa.push(_t),_t=!1}function Kt(){const e=Sa.pop();_t=e===void 0?!0:e}function Vs(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=Me;Me=void 0;try{t()}finally{Me=n}}}let gi=0;class Xu{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Fr{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Me||!_t||Me===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Me)n=this.activeLink=new Xu(Me,this),Me.deps?(n.prevDep=Me.depsTail,Me.depsTail.nextDep=n,Me.depsTail=n):Me.deps=Me.depsTail=n,_a(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=Me.depsTail,n.nextDep=void 0,Me.depsTail.nextDep=n,Me.depsTail=n,Me.deps===n&&(Me.deps=i)}return n}trigger(t){this.version++,gi++,this.notify(t)}notify(t){ls();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{as()}}}function _a(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)_a(i)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const ko=new WeakMap,xn=Symbol(""),To=Symbol(""),pi=Symbol("");function Ke(e,t,n){if(_t&&Me){let i=ko.get(e);i||ko.set(e,i=new Map);let r=i.get(n);r||(i.set(n,r=new Fr),r.map=i,r.key=n),r.track()}}function Bt(e,t,n,i,r,o){const s=ko.get(e);if(!s){gi++;return}const a=l=>{l&&l.trigger()};if(ls(),t==="clear")s.forEach(a);else{const l=ce(e),c=l&&os(n);if(l&&n==="length"){const u=Number(i);s.forEach((h,f)=>{(f==="length"||f===pi||!kt(f)&&f>=u)&&a(h)})}else switch((n!==void 0||s.has(void 0))&&a(s.get(n)),c&&a(s.get(pi)),t){case"add":l?c&&a(s.get("length")):(a(s.get(xn)),On(e)&&a(s.get(To)));break;case"delete":l||(a(s.get(xn)),On(e)&&a(s.get(To)));break;case"set":On(e)&&a(s.get(xn));break}}as()}function Pn(e){const t=Se(e);return t===e?t:(Ke(t,"iterate",pi),yt(e)?t:t.map(Be))}function jr(e){return Ke(e=Se(e),"iterate",pi),e}const Yu={__proto__:null,[Symbol.iterator](){return ro(this,Symbol.iterator,Be)},concat(...e){return Pn(this).concat(...e.map(t=>ce(t)?Pn(t):t))},entries(){return ro(this,"entries",e=>(e[1]=Be(e[1]),e))},every(e,t){return Dt(this,"every",e,t,void 0,arguments)},filter(e,t){return Dt(this,"filter",e,t,n=>n.map(Be),arguments)},find(e,t){return Dt(this,"find",e,t,Be,arguments)},findIndex(e,t){return Dt(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Dt(this,"findLast",e,t,Be,arguments)},findLastIndex(e,t){return Dt(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Dt(this,"forEach",e,t,void 0,arguments)},includes(...e){return oo(this,"includes",e)},indexOf(...e){return oo(this,"indexOf",e)},join(e){return Pn(this).join(e)},lastIndexOf(...e){return oo(this,"lastIndexOf",e)},map(e,t){return Dt(this,"map",e,t,void 0,arguments)},pop(){return Zn(this,"pop")},push(...e){return Zn(this,"push",e)},reduce(e,...t){return Ds(this,"reduce",e,t)},reduceRight(e,...t){return Ds(this,"reduceRight",e,t)},shift(){return Zn(this,"shift")},some(e,t){return Dt(this,"some",e,t,void 0,arguments)},splice(...e){return Zn(this,"splice",e)},toReversed(){return Pn(this).toReversed()},toSorted(e){return Pn(this).toSorted(e)},toSpliced(...e){return Pn(this).toSpliced(...e)},unshift(...e){return Zn(this,"unshift",e)},values(){return ro(this,"values",Be)}};function ro(e,t,n){const i=jr(e),r=i[t]();return i!==e&&!yt(e)&&(r._next=r.next,r.next=()=>{const o=r._next();return o.value&&(o.value=n(o.value)),o}),r}const qu=Array.prototype;function Dt(e,t,n,i,r,o){const s=jr(e),a=s!==e&&!yt(e),l=s[t];if(l!==qu[t]){const h=l.apply(e,o);return a?Be(h):h}let c=n;s!==e&&(a?c=function(h,f){return n.call(this,Be(h),f,e)}:n.length>2&&(c=function(h,f){return n.call(this,h,f,e)}));const u=l.call(s,c,i);return a&&r?r(u):u}function Ds(e,t,n,i){const r=jr(e);let o=n;return r!==e&&(yt(e)?n.length>3&&(o=function(s,a,l){return n.call(this,s,a,l,e)}):o=function(s,a,l){return n.call(this,s,Be(a),l,e)}),r[t](o,...i)}function oo(e,t,n){const i=Se(e);Ke(i,"iterate",pi);const r=i[t](...n);return(r===-1||r===!1)&&fs(n[0])?(n[0]=Se(n[0]),i[t](...n)):r}function Zn(e,t,n=[]){Ut(),ls();const i=Se(e)[t].apply(e,n);return as(),Kt(),i}const Gu=ns("__proto__,__v_isRef,__isVue"),ka=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(kt));function Uu(e){kt(e)||(e=String(e));const t=Se(this);return Ke(t,"has",e),t.hasOwnProperty(e)}class Ta{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,i){if(n==="__v_skip")return t.__v_skip;const r=this._isReadonly,o=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return o;if(n==="__v_raw")return i===(r?o?oh:Ma:o?La:Aa).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const s=ce(t);if(!r){let l;if(s&&(l=Yu[n]))return l;if(n==="hasOwnProperty")return Uu}const a=Reflect.get(t,n,Fe(t)?t:i);return(kt(n)?ka.has(n):Gu(n))||(r||Ke(t,"get",n),o)?a:Fe(a)?s&&os(n)?a:a.value:Ce(a)?r?Ca(a):Hn(a):a}}class Pa extends Ta{constructor(t=!1){super(!1,t)}set(t,n,i,r){let o=t[n];if(!this._isShallow){const l=an(o);if(!yt(i)&&!an(i)&&(o=Se(o),i=Se(i)),!ce(t)&&Fe(o)&&!Fe(i))return l||(o.value=i),!0}const s=ce(t)&&os(n)?Number(n)<t.length:_e(t,n),a=Reflect.set(t,n,i,Fe(t)?t:r);return t===Se(r)&&(s?st(i,o)&&Bt(t,"set",n,i):Bt(t,"add",n,i)),a}deleteProperty(t,n){const i=_e(t,n);t[n];const r=Reflect.deleteProperty(t,n);return r&&i&&Bt(t,"delete",n,void 0),r}has(t,n){const i=Reflect.has(t,n);return(!kt(n)||!ka.has(n))&&Ke(t,"has",n),i}ownKeys(t){return Ke(t,"iterate",ce(t)?"length":xn),Reflect.ownKeys(t)}}class Ku extends Ta{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Ju=new Pa,Zu=new Ku,Qu=new Pa(!0);const Po=e=>e,Ei=e=>Reflect.getPrototypeOf(e);function eh(e,t,n){return function(...i){const r=this.__v_raw,o=Se(r),s=On(o),a=e==="entries"||e===Symbol.iterator&&s,l=e==="keys"&&s,c=r[e](...i),u=n?Po:t?lr:Be;return!t&&Ke(o,"iterate",l?To:xn),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function Ii(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function th(e,t){const n={get(r){const o=this.__v_raw,s=Se(o),a=Se(r);e||(st(r,a)&&Ke(s,"get",r),Ke(s,"get",a));const{has:l}=Ei(s),c=t?Po:e?lr:Be;if(l.call(s,r))return c(o.get(r));if(l.call(s,a))return c(o.get(a));o!==s&&o.get(r)},get size(){const r=this.__v_raw;return!e&&Ke(Se(r),"iterate",xn),r.size},has(r){const o=this.__v_raw,s=Se(o),a=Se(r);return e||(st(r,a)&&Ke(s,"has",r),Ke(s,"has",a)),r===a?o.has(r):o.has(r)||o.has(a)},forEach(r,o){const s=this,a=s.__v_raw,l=Se(a),c=t?Po:e?lr:Be;return!e&&Ke(l,"iterate",xn),a.forEach((u,h)=>r.call(o,c(u),c(h),s))}};return je(n,e?{add:Ii("add"),set:Ii("set"),delete:Ii("delete"),clear:Ii("clear")}:{add(r){!t&&!yt(r)&&!an(r)&&(r=Se(r));const o=Se(this);return Ei(o).has.call(o,r)||(o.add(r),Bt(o,"add",r,r)),this},set(r,o){!t&&!yt(o)&&!an(o)&&(o=Se(o));const s=Se(this),{has:a,get:l}=Ei(s);let c=a.call(s,r);c||(r=Se(r),c=a.call(s,r));const u=l.call(s,r);return s.set(r,o),c?st(o,u)&&Bt(s,"set",r,o):Bt(s,"add",r,o),this},delete(r){const o=Se(this),{has:s,get:a}=Ei(o);let l=s.call(o,r);l||(r=Se(r),l=s.call(o,r)),a&&a.call(o,r);const c=o.delete(r);return l&&Bt(o,"delete",r,void 0),c},clear(){const r=Se(this),o=r.size!==0,s=r.clear();return o&&Bt(r,"clear",void 0,void 0),s}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=eh(r,e,t)}),n}function us(e,t){const n=th(e,t);return(i,r,o)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?i:Reflect.get(_e(n,r)&&r in i?n:i,r,o)}const nh={get:us(!1,!1)},ih={get:us(!1,!0)},rh={get:us(!0,!1)};const Aa=new WeakMap,La=new WeakMap,Ma=new WeakMap,oh=new WeakMap;function sh(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function lh(e){return e.__v_skip||!Object.isExtensible(e)?0:sh(Wu(e))}function Hn(e){return an(e)?e:hs(e,!1,Ju,nh,Aa)}function ah(e){return hs(e,!1,Qu,ih,La)}function Ca(e){return hs(e,!0,Zu,rh,Ma)}function hs(e,t,n,i,r){if(!Ce(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const o=lh(e);if(o===0)return e;const s=r.get(e);if(s)return s;const a=new Proxy(e,o===2?i:n);return r.set(e,a),a}function Vn(e){return an(e)?Vn(e.__v_raw):!!(e&&e.__v_isReactive)}function an(e){return!!(e&&e.__v_isReadonly)}function yt(e){return!!(e&&e.__v_isShallow)}function fs(e){return e?!!e.__v_raw:!1}function Se(e){const t=e&&e.__v_raw;return t?Se(t):e}function ch(e){return!_e(e,"__v_skip")&&Object.isExtensible(e)&&ua(e,"__v_skip",!0),e}const Be=e=>Ce(e)?Hn(e):e,lr=e=>Ce(e)?Ca(e):e;function Fe(e){return e?e.__v_isRef===!0:!1}function zr(e){return Wa(e,!1)}function ar(e){return Wa(e,!0)}function Wa(e,t){return Fe(e)?e:new uh(e,t)}class uh{constructor(t,n){this.dep=new Fr,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Se(t),this._value=n?t:Be(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,i=this.__v_isShallow||yt(t)||an(t);t=i?t:Se(t),st(t,n)&&(this._rawValue=t,this._value=i?t:Be(t),this.dep.trigger())}}function C(e){return Fe(e)?e.value:e}function $a(e){return he(e)?e():C(e)}const hh={get:(e,t,n)=>t==="__v_raw"?e:C(Reflect.get(e,t,n)),set:(e,t,n,i)=>{const r=e[t];return Fe(r)&&!Fe(n)?(r.value=n,!0):Reflect.set(e,t,n,i)}};function Na(e){return Vn(e)?e:new Proxy(e,hh)}class fh{constructor(t){this.__v_isRef=!0,this._value=void 0;const n=this.dep=new Fr,{get:i,set:r}=t(n.track.bind(n),n.trigger.bind(n));this._get=i,this._set=r}get value(){return this._value=this._get()}set value(t){this._set(t)}}function dh(e){return new fh(e)}class mh{constructor(t,n,i){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Fr(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=gi-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Me!==this)return xa(this,!0),!0}get value(){const t=this.dep.track();return va(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function gh(e,t,n=!1){let i,r;return he(e)?i=e:(i=e.get,r=e.set),new mh(i,r,n)}const Oi={},cr=new WeakMap;let dn;function ph(e,t=!1,n=dn){if(n){let i=cr.get(n);i||cr.set(n,i=[]),i.push(e)}}function yh(e,t,n=be){const{immediate:i,deep:r,once:o,scheduler:s,augmentJob:a,call:l}=n,c=V=>r?V:yt(V)||r===!1||r===0?Xt(V,1):Xt(V);let u,h,f,d,g=!1,b=!1;if(Fe(e)?(h=()=>e.value,g=yt(e)):Vn(e)?(h=()=>c(e),g=!0):ce(e)?(b=!0,g=e.some(V=>Vn(V)||yt(V)),h=()=>e.map(V=>{if(Fe(V))return V.value;if(Vn(V))return c(V);if(he(V))return l?l(V,2):V()})):he(e)?t?h=l?()=>l(e,2):e:h=()=>{if(f){Ut();try{f()}finally{Kt()}}const V=dn;dn=u;try{return l?l(e,3,[d]):e(d)}finally{dn=V}}:h=$t,t&&r){const V=h,$=r===!0?1/0:r;h=()=>Xt(V(),$)}const O=ga(),F=()=>{u.stop(),O&&O.active&&rs(O.effects,u)};if(o&&t){const V=t;t=(...$)=>{V(...$),F()}}let D=b?new Array(e.length).fill(Oi):Oi;const z=V=>{if(!(!(u.flags&1)||!u.dirty&&!V))if(t){const $=u.run();if(r||g||(b?$.some((U,W)=>st(U,D[W])):st($,D))){f&&f();const U=dn;dn=u;try{const W=[$,D===Oi?void 0:b&&D[0]===Oi?[]:D,d];D=$,l?l(t,3,W):t(...W)}finally{dn=U}}}else u.run()};return a&&a(z),u=new pa(h),u.scheduler=s?()=>s(z,!1):z,d=V=>ph(V,!1,u),f=u.onStop=()=>{const V=cr.get(u);if(V){if(l)l(V,4);else for(const $ of V)$();cr.delete(u)}},t?i?z(!0):D=u.run():s?s(z.bind(null,!0),!0):u.run(),F.pause=u.pause.bind(u),F.resume=u.resume.bind(u),F.stop=F,F}function Xt(e,t=1/0,n){if(t<=0||!Ce(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Fe(e))Xt(e.value,t,n);else if(ce(e))for(let i=0;i<e.length;i++)Xt(e[i],t,n);else if(Ir(e)||On(e))e.forEach(i=>{Xt(i,t,n)});else if(ca(e)){for(const i in e)Xt(e[i],t,n);for(const i of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,i)&&Xt(e[i],t,n)}return e}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ai(e,t,n,i){try{return i?e(...i):e()}catch(r){Hr(r,t,n)}}function It(e,t,n,i){if(he(e)){const r=Ai(e,t,n,i);return r&&la(r)&&r.catch(o=>{Hr(o,t,n)}),r}if(ce(e)){const r=[];for(let o=0;o<e.length;o++)r.push(It(e[o],t,n,i));return r}}function Hr(e,t,n,i=!0){const r=t?t.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=t&&t.appContext.config||be;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](e,l,c)===!1)return}a=a.parent}if(o){Ut(),Ai(o,null,10,[e,l,c]),Kt();return}}xh(e,n,r,i,s)}function xh(e,t,n,i=!0,r=!1){if(r)throw e;console.error(e)}const it=[];let Mt=-1;const Dn=[];let rn=null,Cn=0;const Ea=Promise.resolve();let ur=null;function Li(e){const t=ur||Ea;return e?t.then(this?e.bind(this):e):t}function bh(e){let t=Mt+1,n=it.length;for(;t<n;){const i=t+n>>>1,r=it[i],o=yi(r);o<e||o===e&&r.flags&2?t=i+1:n=i}return t}function ds(e){if(!(e.flags&1)){const t=yi(e),n=it[it.length-1];!n||!(e.flags&2)&&t>=yi(n)?it.push(e):it.splice(bh(t),0,e),e.flags|=1,Ia()}}function Ia(){ur||(ur=Ea.then(Va))}function wh(e){ce(e)?Dn.push(...e):rn&&e.id===-1?rn.splice(Cn+1,0,e):e.flags&1||(Dn.push(e),e.flags|=1),Ia()}function Rs(e,t,n=Mt+1){for(;n<it.length;n++){const i=it[n];if(i&&i.flags&2){if(e&&i.id!==e.uid)continue;it.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Oa(e){if(Dn.length){const t=[...new Set(Dn)].sort((n,i)=>yi(n)-yi(i));if(Dn.length=0,rn){rn.push(...t);return}for(rn=t,Cn=0;Cn<rn.length;Cn++){const n=rn[Cn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}rn=null,Cn=0}}const yi=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Va(e){try{for(Mt=0;Mt<it.length;Mt++){const t=it[Mt];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Ai(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Mt<it.length;Mt++){const t=it[Mt];t&&(t.flags&=-2)}Mt=-1,it.length=0,Oa(),ur=null,(it.length||Dn.length)&&Va()}}let Xe=null,Da=null;function hr(e){const t=Xe;return Xe=e,Da=e&&e.type.__scopeId||null,t}function Te(e,t=Xe,n){if(!t||e._n)return e;const i=(...r)=>{i._d&&Zs(-1);const o=hr(t);let s;try{s=e(...r)}finally{hr(o),i._d&&Zs(1)}return s};return i._n=!0,i._c=!0,i._d=!0,i}function Ra(e,t){if(Xe===null)return e;const n=Ur(Xe),i=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[o,s,a,l=be]=t[r];o&&(he(o)&&(o={mounted:o,updated:o}),o.deep&&Xt(s),i.push({dir:o,instance:n,value:s,oldValue:void 0,arg:a,modifiers:l}))}return e}function un(e,t,n,i){const r=e.dirs,o=t&&t.dirs;for(let s=0;s<r.length;s++){const a=r[s];o&&(a.oldValue=o[s].value);let l=a.dir[i];l&&(Ut(),It(l,n,8,[e.el,a,e,t]),Kt())}}const Fa=Symbol("_vte"),vh=e=>e.__isTeleport,ci=e=>e&&(e.disabled||e.disabled===""),Fs=e=>e&&(e.defer||e.defer===""),js=e=>typeof SVGElement<"u"&&e instanceof SVGElement,zs=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,Ao=(e,t)=>{const n=e&&e.to;return Ne(n)?t?t(n):null:n},ja={name:"Teleport",__isTeleport:!0,process(e,t,n,i,r,o,s,a,l,c){const{mc:u,pc:h,pbc:f,o:{insert:d,querySelector:g,createText:b,createComment:O}}=c,F=ci(t.props);let{shapeFlag:D,children:z,dynamicChildren:V}=t;if(e==null){const $=t.el=b(""),U=t.anchor=b("");d($,n,i),d(U,n,i);const W=(x,T)=>{D&16&&(r&&r.isCE&&(r.ce._teleportTarget=x),u(z,x,T,r,o,s,a,l))},A=()=>{const x=t.target=Ao(t.props,g),T=za(x,t,b,d);x&&(s!=="svg"&&js(x)?s="svg":s!=="mathml"&&zs(x)&&(s="mathml"),F||(W(x,T),Ui(t,!1)))};F&&(W(n,U),Ui(t,!0)),Fs(t.props)?(t.el.__isMounted=!1,nt(()=>{A(),delete t.el.__isMounted},o)):A()}else{if(Fs(t.props)&&e.el.__isMounted===!1){nt(()=>{ja.process(e,t,n,i,r,o,s,a,l,c)},o);return}t.el=e.el,t.targetStart=e.targetStart;const $=t.anchor=e.anchor,U=t.target=e.target,W=t.targetAnchor=e.targetAnchor,A=ci(e.props),x=A?n:U,T=A?$:W;if(s==="svg"||js(U)?s="svg":(s==="mathml"||zs(U))&&(s="mathml"),V?(f(e.dynamicChildren,V,x,r,o,s,a),xs(e,t,!0)):l||h(e,t,x,T,r,o,s,a,!1),F)A?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Vi(t,n,$,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const v=t.target=Ao(t.props,g);v&&Vi(t,v,null,c,0)}else A&&Vi(t,U,W,c,1);Ui(t,F)}},remove(e,t,n,{um:i,o:{remove:r}},o){const{shapeFlag:s,children:a,anchor:l,targetStart:c,targetAnchor:u,target:h,props:f}=e;if(h&&(r(c),r(u)),o&&r(l),s&16){const d=o||!ci(f);for(let g=0;g<a.length;g++){const b=a[g];i(b,t,n,d,!!b.dynamicChildren)}}},move:Vi,hydrate:Sh};function Vi(e,t,n,{o:{insert:i},m:r},o=2){o===0&&i(e.targetAnchor,t,n);const{el:s,anchor:a,shapeFlag:l,children:c,props:u}=e,h=o===2;if(h&&i(s,t,n),(!h||ci(u))&&l&16)for(let f=0;f<c.length;f++)r(c[f],t,n,2);h&&i(a,t,n)}function Sh(e,t,n,i,r,o,{o:{nextSibling:s,parentNode:a,querySelector:l,insert:c,createText:u}},h){function f(b,O,F,D){O.anchor=h(s(b),O,a(b),n,i,r,o),O.targetStart=F,O.targetAnchor=D}const d=t.target=Ao(t.props,l),g=ci(t.props);if(d){const b=d._lpa||d.firstChild;if(t.shapeFlag&16)if(g)f(e,t,b,b&&s(b));else{t.anchor=s(e);let O=b;for(;O;){if(O&&O.nodeType===8){if(O.data==="teleport start anchor")t.targetStart=O;else if(O.data==="teleport anchor"){t.targetAnchor=O,d._lpa=t.targetAnchor&&s(t.targetAnchor);break}}O=s(O)}t.targetAnchor||za(d,t,u,c),h(b&&s(b),t,d,n,i,r,o)}Ui(t,g)}else g&&t.shapeFlag&16&&f(e,t,e,s(e));return t.anchor&&s(t.anchor)}const _h=ja;function Ui(e,t){const n=e.ctx;if(n&&n.ut){let i,r;for(t?(i=e.el,r=e.anchor):(i=e.targetStart,r=e.targetAnchor);i&&i!==r;)i.nodeType===1&&i.setAttribute("data-v-owner",n.uid),i=i.nextSibling;n.ut()}}function za(e,t,n,i){const r=t.targetStart=n(""),o=t.targetAnchor=n("");return r[Fa]=o,e&&(i(r,e),i(o,e)),o}const kh=Symbol("_leaveCb");function ms(e,t){e.shapeFlag&6&&e.component?(e.transition=t,ms(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Th(){const e=_n();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function Ha(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function at(e){const t=_n(),n=ar(null);if(t){const r=t.refs===be?t.refs={}:t.refs;Object.defineProperty(r,e,{enumerable:!0,get:()=>n.value,set:o=>n.value=o})}return n}const fr=new WeakMap;function ui(e,t,n,i,r=!1){if(ce(e)){e.forEach((g,b)=>ui(g,t&&(ce(t)?t[b]:t),n,i,r));return}if(Rn(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&ui(e,t,n,i.component.subTree);return}const o=i.shapeFlag&4?Ur(i.component):i.el,s=r?null:o,{i:a,r:l}=e,c=t&&t.r,u=a.refs===be?a.refs={}:a.refs,h=a.setupState,f=Se(h),d=h===be?Wn:g=>_e(f,g);if(c!=null&&c!==l){if(Hs(t),Ne(c))u[c]=null,d(c)&&(h[c]=null);else if(Fe(c)){c.value=null;const g=t;g.k&&(u[g.k]=null)}}if(he(l))Ai(l,a,12,[s,u]);else{const g=Ne(l),b=Fe(l);if(g||b){const O=()=>{if(e.f){const F=g?d(l)?h[l]:u[l]:l.value;if(r)ce(F)&&rs(F,o);else if(ce(F))F.includes(o)||F.push(o);else if(g)u[l]=[o],d(l)&&(h[l]=u[l]);else{const D=[o];l.value=D,e.k&&(u[e.k]=D)}}else g?(u[l]=s,d(l)&&(h[l]=s)):b&&(l.value=s,e.k&&(u[e.k]=s))};if(s){const F=()=>{O(),fr.delete(e)};F.id=-1,fr.set(e,F),nt(F,n)}else Hs(e),O()}}}function Hs(e){const t=fr.get(e);t&&(t.flags|=8,fr.delete(e))}Dr().requestIdleCallback;Dr().cancelIdleCallback;const Rn=e=>!!e.type.__asyncLoader,Ba=e=>e.type.__isKeepAlive;function Ph(e,t){Xa(e,"a",t)}function Ah(e,t){Xa(e,"da",t)}function Xa(e,t,n=Je){const i=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(Br(t,i,n),n){let r=n.parent;for(;r&&r.parent;)Ba(r.parent.vnode)&&Lh(i,t,n,r),r=r.parent}}function Lh(e,t,n,i){const r=Br(t,e,i,!0);Ya(()=>{rs(i[t],r)},n)}function Br(e,t,n=Je,i=!1){if(n){const r=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...s)=>{Ut();const a=Ci(n),l=It(t,n,e,s);return a(),Kt(),l});return i?r.unshift(o):r.push(o),o}}const Qt=e=>(t,n=Je)=>{(!bi||e==="sp")&&Br(e,(...i)=>t(...i),n)},Mh=Qt("bm"),Xr=Qt("m"),Ch=Qt("bu"),Wh=Qt("u"),$h=Qt("bum"),Ya=Qt("um"),Nh=Qt("sp"),Eh=Qt("rtg"),Ih=Qt("rtc");function Oh(e,t=Je){Br("ec",e,t)}const Vh="components",qa=Symbol.for("v-ndc");function gs(e){return Ne(e)?Dh(Vh,e,!1)||e:e||qa}function Dh(e,t,n=!0,i=!1){const r=Xe||Je;if(r){const o=r.type;{const a=Pf(o,!1);if(a&&(a===t||a===dt(t)||a===Vr(dt(t))))return o}const s=Bs(r[e]||o[e],t)||Bs(r.appContext[e],t);return!s&&i?o:s}}function Bs(e,t){return e&&(e[t]||e[dt(t)]||e[Vr(dt(t))])}function Le(e,t,n,i){let r;const o=n,s=ce(e);if(s||Ne(e)){const a=s&&Vn(e);let l=!1,c=!1;a&&(l=!yt(e),c=an(e),e=jr(e)),r=new Array(e.length);for(let u=0,h=e.length;u<h;u++)r[u]=t(l?c?lr(Be(e[u])):Be(e[u]):e[u],u,void 0,o)}else if(typeof e=="number"){r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,o)}else if(Ce(e))if(e[Symbol.iterator])r=Array.from(e,(a,l)=>t(a,l,void 0,o));else{const a=Object.keys(e);r=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];r[l]=t(e[u],u,l,o)}}else r=[];return r}function Lo(e,t,n={},i,r){if(Xe.ce||Xe.parent&&Rn(Xe.parent)&&Xe.parent.ce)return t!=="default"&&(n.name=t),X(),lt(ue,null,[K("slot",n,i&&i())],64);let o=e[t];o&&o._c&&(o._d=!1),X();const s=o&&Ga(o(n)),a=n.key||s&&s.key,l=lt(ue,{key:(a&&!kt(a)?a:`_${t}`)+(!s&&i?"_fb":"")},s||(i?i():[]),s&&e._===1?64:-2);return l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),o&&o._c&&(o._d=!0),l}function Ga(e){return e.some(t=>ws(t)?!(t.type===Jt||t.type===ue&&!Ga(t.children)):!0)?e:null}function Rh(e,t){const n={};for(const i in e)n[qi(i)]=e[i];return n}const Mo=e=>e?gc(e)?Ur(e):Mo(e.parent):null,hi=je(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Mo(e.parent),$root:e=>Mo(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Za(e),$forceUpdate:e=>e.f||(e.f=()=>{ds(e.update)}),$nextTick:e=>e.n||(e.n=Li.bind(e.proxy)),$watch:e=>uf.bind(e)}),so=(e,t)=>e!==be&&!e.__isScriptSetup&&_e(e,t),Fh={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:i,data:r,props:o,accessCache:s,type:a,appContext:l}=e;let c;if(t[0]!=="$"){const d=s[t];if(d!==void 0)switch(d){case 1:return i[t];case 2:return r[t];case 4:return n[t];case 3:return o[t]}else{if(so(i,t))return s[t]=1,i[t];if(r!==be&&_e(r,t))return s[t]=2,r[t];if((c=e.propsOptions[0])&&_e(c,t))return s[t]=3,o[t];if(n!==be&&_e(n,t))return s[t]=4,n[t];Co&&(s[t]=0)}}const u=hi[t];let h,f;if(u)return t==="$attrs"&&Ke(e.attrs,"get",""),u(e);if((h=a.__cssModules)&&(h=h[t]))return h;if(n!==be&&_e(n,t))return s[t]=4,n[t];if(f=l.config.globalProperties,_e(f,t))return f[t]},set({_:e},t,n){const{data:i,setupState:r,ctx:o}=e;return so(r,t)?(r[t]=n,!0):i!==be&&_e(i,t)?(i[t]=n,!0):_e(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:i,appContext:r,propsOptions:o,type:s}},a){let l,c;return!!(n[a]||e!==be&&a[0]!=="$"&&_e(e,a)||so(t,a)||(l=o[0])&&_e(l,a)||_e(i,a)||_e(hi,a)||_e(r.config.globalProperties,a)||(c=s.__cssModules)&&c[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:_e(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function jh(){return Ka().slots}function Ua(){return Ka().attrs}function Ka(e){const t=_n();return t.setupContext||(t.setupContext=yc(t))}function dr(e){return ce(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}function Ot(e,t){return!e||!t?e||t:ce(e)&&ce(t)?e.concat(t):je({},dr(e),dr(t))}let Co=!0;function zh(e){const t=Za(e),n=e.proxy,i=e.ctx;Co=!1,t.beforeCreate&&Xs(t.beforeCreate,e,"bc");const{data:r,computed:o,methods:s,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:g,activated:b,deactivated:O,beforeDestroy:F,beforeUnmount:D,destroyed:z,unmounted:V,render:$,renderTracked:U,renderTriggered:W,errorCaptured:A,serverPrefetch:x,expose:T,inheritAttrs:v,components:H,directives:Z,filters:B}=t;if(c&&Hh(c,i,null),s)for(const S in s){const _=s[S];he(_)&&(i[S]=_.bind(n))}if(r){const S=r.call(n,n);Ce(S)&&(e.data=Hn(S))}if(Co=!0,o)for(const S in o){const _=o[S],R=he(_)?_.bind(n,n):he(_.get)?_.get.bind(n,n):$t,N=!he(_)&&he(_.set)?_.set.bind(n):$t,Y=ee({get:R,set:N});Object.defineProperty(i,S,{enumerable:!0,configurable:!0,get:()=>Y.value,set:Pe=>Y.value=Pe})}if(a)for(const S in a)Ja(a[S],i,n,S);if(l){const S=he(l)?l.call(n):l;Reflect.ownKeys(S).forEach(_=>{Uh(_,S[_])})}u&&Xs(u,e,"c");function re(S,_){ce(_)?_.forEach(R=>S(R.bind(n))):_&&S(_.bind(n))}if(re(Mh,h),re(Xr,f),re(Ch,d),re(Wh,g),re(Ph,b),re(Ah,O),re(Oh,A),re(Ih,U),re(Eh,W),re($h,D),re(Ya,V),re(Nh,x),ce(T))if(T.length){const S=e.exposed||(e.exposed={});T.forEach(_=>{Object.defineProperty(S,_,{get:()=>n[_],set:R=>n[_]=R,enumerable:!0})})}else e.exposed||(e.exposed={});$&&e.render===$t&&(e.render=$),v!=null&&(e.inheritAttrs=v),H&&(e.components=H),Z&&(e.directives=Z),x&&Ha(e)}function Hh(e,t,n=$t){ce(e)&&(e=Wo(e));for(const i in e){const r=e[i];let o;Ce(r)?"default"in r?o=Ki(r.from||i,r.default,!0):o=Ki(r.from||i):o=Ki(r),Fe(o)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>o.value,set:s=>o.value=s}):t[i]=o}}function Xs(e,t,n){It(ce(e)?e.map(i=>i.bind(t.proxy)):e.bind(t.proxy),t,n)}function Ja(e,t,n,i){let r=i.includes(".")?cc(n,i):()=>n[i];if(Ne(e)){const o=t[e];he(o)&&Qe(r,o)}else if(he(e))Qe(r,e.bind(n));else if(Ce(e))if(ce(e))e.forEach(o=>Ja(o,t,n,i));else{const o=he(e.handler)?e.handler.bind(n):t[e.handler];he(o)&&Qe(r,o,e)}}function Za(e){const t=e.type,{mixins:n,extends:i}=t,{mixins:r,optionsCache:o,config:{optionMergeStrategies:s}}=e.appContext,a=o.get(t);let l;return a?l=a:!r.length&&!n&&!i?l=t:(l={},r.length&&r.forEach(c=>mr(l,c,s,!0)),mr(l,t,s)),Ce(t)&&o.set(t,l),l}function mr(e,t,n,i=!1){const{mixins:r,extends:o}=t;o&&mr(e,o,n,!0),r&&r.forEach(s=>mr(e,s,n,!0));for(const s in t)if(!(i&&s==="expose")){const a=Bh[s]||n&&n[s];e[s]=a?a(e[s],t[s]):t[s]}return e}const Bh={data:Ys,props:qs,emits:qs,methods:ni,computed:ni,beforeCreate:tt,created:tt,beforeMount:tt,mounted:tt,beforeUpdate:tt,updated:tt,beforeDestroy:tt,beforeUnmount:tt,destroyed:tt,unmounted:tt,activated:tt,deactivated:tt,errorCaptured:tt,serverPrefetch:tt,components:ni,directives:ni,watch:Yh,provide:Ys,inject:Xh};function Ys(e,t){return t?e?function(){return je(he(e)?e.call(this,this):e,he(t)?t.call(this,this):t)}:t:e}function Xh(e,t){return ni(Wo(e),Wo(t))}function Wo(e){if(ce(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function tt(e,t){return e?[...new Set([].concat(e,t))]:t}function ni(e,t){return e?je(Object.create(null),e,t):t}function qs(e,t){return e?ce(e)&&ce(t)?[...new Set([...e,...t])]:je(Object.create(null),dr(e),dr(t??{})):t}function Yh(e,t){if(!e)return t;if(!t)return e;const n=je(Object.create(null),e);for(const i in t)n[i]=tt(e[i],t[i]);return n}function Qa(){return{app:null,config:{isNativeTag:Wn,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let qh=0;function Gh(e,t){return function(i,r=null){he(i)||(i=je({},i)),r!=null&&!Ce(r)&&(r=null);const o=Qa(),s=new WeakSet,a=[];let l=!1;const c=o.app={_uid:qh++,_component:i,_props:r,_container:null,_context:o,_instance:null,version:Lf,get config(){return o.config},set config(u){},use(u,...h){return s.has(u)||(u&&he(u.install)?(s.add(u),u.install(c,...h)):he(u)&&(s.add(u),u(c,...h))),c},mixin(u){return o.mixins.includes(u)||o.mixins.push(u),c},component(u,h){return h?(o.components[u]=h,c):o.components[u]},directive(u,h){return h?(o.directives[u]=h,c):o.directives[u]},mount(u,h,f){if(!l){const d=c._ceVNode||K(i,r);return d.appContext=o,f===!0?f="svg":f===!1&&(f=void 0),e(d,u,f),l=!0,c._container=u,u.__vue_app__=c,Ur(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(It(a,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(u,h){return o.provides[u]=h,c},runWithContext(u){const h=Fn;Fn=c;try{return u()}finally{Fn=h}}};return c}}let Fn=null;function Uh(e,t){if(Je){let n=Je.provides;const i=Je.parent&&Je.parent.provides;i===n&&(n=Je.provides=Object.create(i)),n[e]=t}}function Ki(e,t,n=!1){const i=_n();if(i||Fn){let r=Fn?Fn._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&he(t)?t.call(i&&i.proxy):t}}const ec={},tc=()=>Object.create(ec),nc=e=>Object.getPrototypeOf(e)===ec;function Kh(e,t,n,i=!1){const r={},o=tc();e.propsDefaults=Object.create(null),ic(e,t,r,o);for(const s in e.propsOptions[0])s in r||(r[s]=void 0);n?e.props=i?r:ah(r):e.type.props?e.props=r:e.props=o,e.attrs=o}function Jh(e,t,n,i){const{props:r,attrs:o,vnode:{patchFlag:s}}=e,a=Se(r),[l]=e.propsOptions;let c=!1;if((i||s>0)&&!(s&16)){if(s&8){const u=e.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Yr(e.emitsOptions,f))continue;const d=t[f];if(l)if(_e(o,f))d!==o[f]&&(o[f]=d,c=!0);else{const g=dt(f);r[g]=$o(l,a,g,d,e,!1)}else d!==o[f]&&(o[f]=d,c=!0)}}}else{ic(e,t,r,o)&&(c=!0);let u;for(const h in a)(!t||!_e(t,h)&&((u=cn(h))===h||!_e(t,u)))&&(l?n&&(n[h]!==void 0||n[u]!==void 0)&&(r[h]=$o(l,a,h,void 0,e,!0)):delete r[h]);if(o!==a)for(const h in o)(!t||!_e(t,h))&&(delete o[h],c=!0)}c&&Bt(e.attrs,"set","")}function ic(e,t,n,i){const[r,o]=e.propsOptions;let s=!1,a;if(t)for(let l in t){if(si(l))continue;const c=t[l];let u;r&&_e(r,u=dt(l))?!o||!o.includes(u)?n[u]=c:(a||(a={}))[u]=c:Yr(e.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,s=!0)}if(o){const l=Se(n),c=a||be;for(let u=0;u<o.length;u++){const h=o[u];n[h]=$o(r,l,h,c[h],e,!_e(c,h))}}return s}function $o(e,t,n,i,r,o){const s=e[n];if(s!=null){const a=_e(s,"default");if(a&&i===void 0){const l=s.default;if(s.type!==Function&&!s.skipFactory&&he(l)){const{propsDefaults:c}=r;if(n in c)i=c[n];else{const u=Ci(r);i=c[n]=l.call(null,t),u()}}else i=l;r.ce&&r.ce._setProp(n,i)}s[0]&&(o&&!a?i=!1:s[1]&&(i===""||i===cn(n))&&(i=!0))}return i}const Zh=new WeakMap;function rc(e,t,n=!1){const i=n?Zh:t.propsCache,r=i.get(e);if(r)return r;const o=e.props,s={},a=[];let l=!1;if(!he(e)){const u=h=>{l=!0;const[f,d]=rc(h,t,!0);je(s,f),d&&a.push(...d)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!o&&!l)return Ce(e)&&i.set(e,In),In;if(ce(o))for(let u=0;u<o.length;u++){const h=dt(o[u]);Gs(h)&&(s[h]=be)}else if(o)for(const u in o){const h=dt(u);if(Gs(h)){const f=o[u],d=s[h]=ce(f)||he(f)?{type:f}:je({},f),g=d.type;let b=!1,O=!0;if(ce(g))for(let F=0;F<g.length;++F){const D=g[F],z=he(D)&&D.name;if(z==="Boolean"){b=!0;break}else z==="String"&&(O=!1)}else b=he(g)&&g.name==="Boolean";d[0]=b,d[1]=O,(b||_e(d,"default"))&&a.push(h)}}const c=[s,a];return Ce(e)&&i.set(e,c),c}function Gs(e){return e[0]!=="$"&&!si(e)}const ps=e=>e==="_"||e==="_ctx"||e==="$stable",ys=e=>ce(e)?e.map(Wt):[Wt(e)],Qh=(e,t,n)=>{if(t._n)return t;const i=Te((...r)=>ys(t(...r)),n);return i._c=!1,i},oc=(e,t,n)=>{const i=e._ctx;for(const r in e){if(ps(r))continue;const o=e[r];if(he(o))t[r]=Qh(r,o,i);else if(o!=null){const s=ys(o);t[r]=()=>s}}},sc=(e,t)=>{const n=ys(t);e.slots.default=()=>n},lc=(e,t,n)=>{for(const i in t)(n||!ps(i))&&(e[i]=t[i])},ef=(e,t,n)=>{const i=e.slots=tc();if(e.vnode.shapeFlag&32){const r=t._;r?(lc(i,t,n),n&&ua(i,"_",r,!0)):oc(t,i)}else t&&sc(e,t)},tf=(e,t,n)=>{const{vnode:i,slots:r}=e;let o=!0,s=be;if(i.shapeFlag&32){const a=t._;a?n&&a===1?o=!1:lc(r,t,n):(o=!t.$stable,oc(t,r)),s=t}else t&&(sc(e,t),s={default:1});if(o)for(const a in r)!ps(a)&&s[a]==null&&delete r[a]},nt=yf;function nf(e){return rf(e)}function rf(e,t){const n=Dr();n.__VUE__=!0;const{insert:i,remove:r,patchProp:o,createElement:s,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=$t,insertStaticContent:g}=e,b=(p,w,I,G=null,m=null,y=null,k=void 0,M=null,E=!!w.dynamicChildren)=>{if(p===w)return;p&&!Qn(p,w)&&(G=xe(p),Pe(p,m,y,!0),p=null),w.patchFlag===-2&&(E=!1,w.dynamicChildren=null);const{type:L,ref:j,shapeFlag:P}=w;switch(L){case qr:O(p,w,I,G);break;case Jt:F(p,w,I,G);break;case ao:p==null&&D(w,I,G,k);break;case ue:H(p,w,I,G,m,y,k,M,E);break;default:P&1?$(p,w,I,G,m,y,k,M,E):P&6?Z(p,w,I,G,m,y,k,M,E):(P&64||P&128)&&L.process(p,w,I,G,m,y,k,M,E,ye)}j!=null&&m?ui(j,p&&p.ref,y,w||p,!w):j==null&&p&&p.ref!=null&&ui(p.ref,null,y,p,!0)},O=(p,w,I,G)=>{if(p==null)i(w.el=a(w.children),I,G);else{const m=w.el=p.el;w.children!==p.children&&c(m,w.children)}},F=(p,w,I,G)=>{p==null?i(w.el=l(w.children||""),I,G):w.el=p.el},D=(p,w,I,G)=>{[p.el,p.anchor]=g(p.children,w,I,G,p.el,p.anchor)},z=({el:p,anchor:w},I,G)=>{let m;for(;p&&p!==w;)m=f(p),i(p,I,G),p=m;i(w,I,G)},V=({el:p,anchor:w})=>{let I;for(;p&&p!==w;)I=f(p),r(p),p=I;r(w)},$=(p,w,I,G,m,y,k,M,E)=>{w.type==="svg"?k="svg":w.type==="math"&&(k="mathml"),p==null?U(w,I,G,m,y,k,M,E):x(p,w,m,y,k,M,E)},U=(p,w,I,G,m,y,k,M)=>{let E,L;const{props:j,shapeFlag:P,transition:q,dirs:Q}=p;if(E=p.el=s(p.type,y,j&&j.is,j),P&8?u(E,p.children):P&16&&A(p.children,E,null,G,m,lo(p,y),k,M),Q&&un(p,null,G,"created"),W(E,p,p.scopeId,k,G),j){for(const ae in j)ae!=="value"&&!si(ae)&&o(E,ae,null,j[ae],y,G);"value"in j&&o(E,"value",null,j.value,y),(L=j.onVnodeBeforeMount)&&Lt(L,G,p)}Q&&un(p,null,G,"beforeMount");const oe=of(m,q);oe&&q.beforeEnter(E),i(E,w,I),((L=j&&j.onVnodeMounted)||oe||Q)&&nt(()=>{L&&Lt(L,G,p),oe&&q.enter(E),Q&&un(p,null,G,"mounted")},m)},W=(p,w,I,G,m)=>{if(I&&d(p,I),G)for(let y=0;y<G.length;y++)d(p,G[y]);if(m){let y=m.subTree;if(w===y||fc(y.type)&&(y.ssContent===w||y.ssFallback===w)){const k=m.vnode;W(p,k,k.scopeId,k.slotScopeIds,m.parent)}}},A=(p,w,I,G,m,y,k,M,E=0)=>{for(let L=E;L<p.length;L++){const j=p[L]=M?on(p[L]):Wt(p[L]);b(null,j,w,I,G,m,y,k,M)}},x=(p,w,I,G,m,y,k)=>{const M=w.el=p.el;let{patchFlag:E,dynamicChildren:L,dirs:j}=w;E|=p.patchFlag&16;const P=p.props||be,q=w.props||be;let Q;if(I&&hn(I,!1),(Q=q.onVnodeBeforeUpdate)&&Lt(Q,I,w,p),j&&un(w,p,I,"beforeUpdate"),I&&hn(I,!0),(P.innerHTML&&q.innerHTML==null||P.textContent&&q.textContent==null)&&u(M,""),L?T(p.dynamicChildren,L,M,I,G,lo(w,m),y):k||_(p,w,M,null,I,G,lo(w,m),y,!1),E>0){if(E&16)v(M,P,q,I,m);else if(E&2&&P.class!==q.class&&o(M,"class",null,q.class,m),E&4&&o(M,"style",P.style,q.style,m),E&8){const oe=w.dynamicProps;for(let ae=0;ae<oe.length;ae++){const se=oe[ae],me=P[se],Ae=q[se];(Ae!==me||se==="value")&&o(M,se,me,Ae,m,I)}}E&1&&p.children!==w.children&&u(M,w.children)}else!k&&L==null&&v(M,P,q,I,m);((Q=q.onVnodeUpdated)||j)&&nt(()=>{Q&&Lt(Q,I,w,p),j&&un(w,p,I,"updated")},G)},T=(p,w,I,G,m,y,k)=>{for(let M=0;M<w.length;M++){const E=p[M],L=w[M],j=E.el&&(E.type===ue||!Qn(E,L)||E.shapeFlag&198)?h(E.el):I;b(E,L,j,null,G,m,y,k,!0)}},v=(p,w,I,G,m)=>{if(w!==I){if(w!==be)for(const y in w)!si(y)&&!(y in I)&&o(p,y,w[y],null,m,G);for(const y in I){if(si(y))continue;const k=I[y],M=w[y];k!==M&&y!=="value"&&o(p,y,M,k,m,G)}"value"in I&&o(p,"value",w.value,I.value,m)}},H=(p,w,I,G,m,y,k,M,E)=>{const L=w.el=p?p.el:a(""),j=w.anchor=p?p.anchor:a("");let{patchFlag:P,dynamicChildren:q,slotScopeIds:Q}=w;Q&&(M=M?M.concat(Q):Q),p==null?(i(L,I,G),i(j,I,G),A(w.children||[],I,j,m,y,k,M,E)):P>0&&P&64&&q&&p.dynamicChildren?(T(p.dynamicChildren,q,I,m,y,k,M),(w.key!=null||m&&w===m.subTree)&&xs(p,w,!0)):_(p,w,I,j,m,y,k,M,E)},Z=(p,w,I,G,m,y,k,M,E)=>{w.slotScopeIds=M,p==null?w.shapeFlag&512?m.ctx.activate(w,I,G,k,E):B(w,I,G,m,y,k,E):le(p,w,E)},B=(p,w,I,G,m,y,k)=>{const M=p.component=Sf(p,G,m);if(Ba(p)&&(M.ctx.renderer=ye),_f(M,!1,k),M.asyncDep){if(m&&m.registerDep(M,re,k),!p.el){const E=M.subTree=K(Jt);F(null,E,w,I),p.placeholder=E.el}}else re(M,p,w,I,m,y,k)},le=(p,w,I)=>{const G=w.component=p.component;if(gf(p,w,I))if(G.asyncDep&&!G.asyncResolved){S(G,w,I);return}else G.next=w,G.update();else w.el=p.el,G.vnode=w},re=(p,w,I,G,m,y,k)=>{const M=()=>{if(p.isMounted){let{next:P,bu:q,u:Q,parent:oe,vnode:ae}=p;{const Ye=ac(p);if(Ye){P&&(P.el=ae.el,S(p,P,k)),Ye.asyncDep.then(()=>{p.isUnmounted||M()});return}}let se=P,me;hn(p,!1),P?(P.el=ae.el,S(p,P,k)):P=ae,q&&Gi(q),(me=P.props&&P.props.onVnodeBeforeUpdate)&&Lt(me,oe,P,ae),hn(p,!0);const Ae=Ks(p),ge=p.subTree;p.subTree=Ae,b(ge,Ae,h(ge.el),xe(ge),p,m,y),P.el=Ae.el,se===null&&pf(p,Ae.el),Q&&nt(Q,m),(me=P.props&&P.props.onVnodeUpdated)&&nt(()=>Lt(me,oe,P,ae),m)}else{let P;const{el:q,props:Q}=w,{bm:oe,m:ae,parent:se,root:me,type:Ae}=p,ge=Rn(w);hn(p,!1),oe&&Gi(oe),!ge&&(P=Q&&Q.onVnodeBeforeMount)&&Lt(P,se,w),hn(p,!0);{me.ce&&me.ce._def.shadowRoot!==!1&&me.ce._injectChildStyle(Ae);const Ye=p.subTree=Ks(p);b(null,Ye,I,G,p,m,y),w.el=Ye.el}if(ae&&nt(ae,m),!ge&&(P=Q&&Q.onVnodeMounted)){const Ye=w;nt(()=>Lt(P,se,Ye),m)}(w.shapeFlag&256||se&&Rn(se.vnode)&&se.vnode.shapeFlag&256)&&p.a&&nt(p.a,m),p.isMounted=!0,w=I=G=null}};p.scope.on();const E=p.effect=new pa(M);p.scope.off();const L=p.update=E.run.bind(E),j=p.job=E.runIfDirty.bind(E);j.i=p,j.id=p.uid,E.scheduler=()=>ds(j),hn(p,!0),L()},S=(p,w,I)=>{w.component=p;const G=p.vnode.props;p.vnode=w,p.next=null,Jh(p,w.props,G,I),tf(p,w.children,I),Ut(),Rs(p),Kt()},_=(p,w,I,G,m,y,k,M,E=!1)=>{const L=p&&p.children,j=p?p.shapeFlag:0,P=w.children,{patchFlag:q,shapeFlag:Q}=w;if(q>0){if(q&128){N(L,P,I,G,m,y,k,M,E);return}else if(q&256){R(L,P,I,G,m,y,k,M,E);return}}Q&8?(j&16&&et(L,m,y),P!==L&&u(I,P)):j&16?Q&16?N(L,P,I,G,m,y,k,M,E):et(L,m,y,!0):(j&8&&u(I,""),Q&16&&A(P,I,G,m,y,k,M,E))},R=(p,w,I,G,m,y,k,M,E)=>{p=p||In,w=w||In;const L=p.length,j=w.length,P=Math.min(L,j);let q;for(q=0;q<P;q++){const Q=w[q]=E?on(w[q]):Wt(w[q]);b(p[q],Q,I,null,m,y,k,M,E)}L>j?et(p,m,y,!0,!1,P):A(w,I,G,m,y,k,M,E,P)},N=(p,w,I,G,m,y,k,M,E)=>{let L=0;const j=w.length;let P=p.length-1,q=j-1;for(;L<=P&&L<=q;){const Q=p[L],oe=w[L]=E?on(w[L]):Wt(w[L]);if(Qn(Q,oe))b(Q,oe,I,null,m,y,k,M,E);else break;L++}for(;L<=P&&L<=q;){const Q=p[P],oe=w[q]=E?on(w[q]):Wt(w[q]);if(Qn(Q,oe))b(Q,oe,I,null,m,y,k,M,E);else break;P--,q--}if(L>P){if(L<=q){const Q=q+1,oe=Q<j?w[Q].el:G;for(;L<=q;)b(null,w[L]=E?on(w[L]):Wt(w[L]),I,oe,m,y,k,M,E),L++}}else if(L>q)for(;L<=P;)Pe(p[L],m,y,!0),L++;else{const Q=L,oe=L,ae=new Map;for(L=oe;L<=q;L++){const ut=w[L]=E?on(w[L]):Wt(w[L]);ut.key!=null&&ae.set(ut.key,L)}let se,me=0;const Ae=q-oe+1;let ge=!1,Ye=0;const xt=new Array(Ae);for(L=0;L<Ae;L++)xt[L]=0;for(L=Q;L<=P;L++){const ut=p[L];if(me>=Ae){Pe(ut,m,y,!0);continue}let At;if(ut.key!=null)At=ae.get(ut.key);else for(se=oe;se<=q;se++)if(xt[se-oe]===0&&Qn(ut,w[se])){At=se;break}At===void 0?Pe(ut,m,y,!0):(xt[At-oe]=L+1,At>=Ye?Ye=At:ge=!0,b(ut,w[At],I,null,m,y,k,M,E),me++)}const Ni=ge?sf(xt):In;for(se=Ni.length-1,L=Ae-1;L>=0;L--){const ut=oe+L,At=w[ut],Ns=w[ut+1],Es=ut+1<j?Ns.el||Ns.placeholder:G;xt[L]===0?b(null,At,I,Es,m,y,k,M,E):ge&&(se<0||L!==Ni[se]?Y(At,I,Es,2):se--)}}},Y=(p,w,I,G,m=null)=>{const{el:y,type:k,transition:M,children:E,shapeFlag:L}=p;if(L&6){Y(p.component.subTree,w,I,G);return}if(L&128){p.suspense.move(w,I,G);return}if(L&64){k.move(p,w,I,ye);return}if(k===ue){i(y,w,I);for(let P=0;P<E.length;P++)Y(E[P],w,I,G);i(p.anchor,w,I);return}if(k===ao){z(p,w,I);return}if(G!==2&&L&1&&M)if(G===0)M.beforeEnter(y),i(y,w,I),nt(()=>M.enter(y),m);else{const{leave:P,delayLeave:q,afterLeave:Q}=M,oe=()=>{p.ctx.isUnmounted?r(y):i(y,w,I)},ae=()=>{y._isLeaving&&y[kh](!0),P(y,()=>{oe(),Q&&Q()})};q?q(y,oe,ae):ae()}else i(y,w,I)},Pe=(p,w,I,G=!1,m=!1)=>{const{type:y,props:k,ref:M,children:E,dynamicChildren:L,shapeFlag:j,patchFlag:P,dirs:q,cacheIndex:Q}=p;if(P===-2&&(m=!1),M!=null&&(Ut(),ui(M,null,I,p,!0),Kt()),Q!=null&&(w.renderCache[Q]=void 0),j&256){w.ctx.deactivate(p);return}const oe=j&1&&q,ae=!Rn(p);let se;if(ae&&(se=k&&k.onVnodeBeforeUnmount)&&Lt(se,w,p),j&6)mt(p.component,I,G);else{if(j&128){p.suspense.unmount(I,G);return}oe&&un(p,null,w,"beforeUnmount"),j&64?p.type.remove(p,w,I,ye,G):L&&!L.hasOnce&&(y!==ue||P>0&&P&64)?et(L,w,I,!1,!0):(y===ue&&P&384||!m&&j&16)&&et(E,w,I),G&&fe(p)}(ae&&(se=k&&k.onVnodeUnmounted)||oe)&&nt(()=>{se&&Lt(se,w,p),oe&&un(p,null,w,"unmounted")},I)},fe=p=>{const{type:w,el:I,anchor:G,transition:m}=p;if(w===ue){ke(I,G);return}if(w===ao){V(p);return}const y=()=>{r(I),m&&!m.persisted&&m.afterLeave&&m.afterLeave()};if(p.shapeFlag&1&&m&&!m.persisted){const{leave:k,delayLeave:M}=m,E=()=>k(I,y);M?M(p.el,y,E):E()}else y()},ke=(p,w)=>{let I;for(;p!==w;)I=f(p),r(p),p=I;r(w)},mt=(p,w,I)=>{const{bum:G,scope:m,job:y,subTree:k,um:M,m:E,a:L}=p;Us(E),Us(L),G&&Gi(G),m.stop(),y&&(y.flags|=8,Pe(k,p,w,I)),M&&nt(M,w),nt(()=>{p.isUnmounted=!0},w)},et=(p,w,I,G=!1,m=!1,y=0)=>{for(let k=y;k<p.length;k++)Pe(p[k],w,I,G,m)},xe=p=>{if(p.shapeFlag&6)return xe(p.component.subTree);if(p.shapeFlag&128)return p.suspense.next();const w=f(p.anchor||p.el),I=w&&w[Fa];return I?f(I):w};let ct=!1;const ze=(p,w,I)=>{p==null?w._vnode&&Pe(w._vnode,null,null,!0):b(w._vnode||null,p,w,null,null,null,I),w._vnode=p,ct||(ct=!0,Rs(),Oa(),ct=!1)},ye={p:b,um:Pe,m:Y,r:fe,mt:B,mc:A,pc:_,pbc:T,n:xe,o:e};return{render:ze,hydrate:void 0,createApp:Gh(ze)}}function lo({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function hn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function of(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function xs(e,t,n=!1){const i=e.children,r=t.children;if(ce(i)&&ce(r))for(let o=0;o<i.length;o++){const s=i[o];let a=r[o];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[o]=on(r[o]),a.el=s.el),!n&&a.patchFlag!==-2&&xs(s,a)),a.type===qr&&a.patchFlag!==-1&&(a.el=s.el),a.type===Jt&&!a.el&&(a.el=s.el)}}function sf(e){const t=e.slice(),n=[0];let i,r,o,s,a;const l=e.length;for(i=0;i<l;i++){const c=e[i];if(c!==0){if(r=n[n.length-1],e[r]<c){t[i]=r,n.push(i);continue}for(o=0,s=n.length-1;o<s;)a=o+s>>1,e[n[a]]<c?o=a+1:s=a;c<e[n[o]]&&(o>0&&(t[i]=n[o-1]),n[o]=i)}}for(o=n.length,s=n[o-1];o-- >0;)n[o]=s,s=t[s];return n}function ac(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ac(t)}function Us(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const lf=Symbol.for("v-scx"),af=()=>Ki(lf);function cf(e,t){return bs(e,null,{flush:"sync"})}function Qe(e,t,n){return bs(e,t,n)}function bs(e,t,n=be){const{immediate:i,deep:r,flush:o,once:s}=n,a=je({},n),l=t&&i||!t&&o!=="post";let c;if(bi){if(o==="sync"){const d=af();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=$t,d.resume=$t,d.pause=$t,d}}const u=Je;a.call=(d,g,b)=>It(d,u,g,b);let h=!1;o==="post"?a.scheduler=d=>{nt(d,u&&u.suspense)}:o!=="sync"&&(h=!0,a.scheduler=(d,g)=>{g?d():ds(d)}),a.augmentJob=d=>{t&&(d.flags|=4),h&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const f=yh(e,t,a);return bi&&(c?c.push(f):l&&f()),f}function uf(e,t,n){const i=this.proxy,r=Ne(e)?e.includes(".")?cc(i,e):()=>i[e]:e.bind(i,i);let o;he(t)?o=t:(o=t.handler,n=t);const s=Ci(this),a=bs(r,o.bind(i),n);return s(),a}function cc(e,t){const n=t.split(".");return()=>{let i=e;for(let r=0;r<n.length&&i;r++)i=i[n[r]];return i}}function Ie(e,t,n=be){const i=_n(),r=dt(t),o=cn(t),s=uc(e,r),a=dh((l,c)=>{let u,h=be,f;return cf(()=>{const d=e[r];st(u,d)&&(u=d,c())}),{get(){return l(),n.get?n.get(u):u},set(d){const g=n.set?n.set(d):d;if(!st(g,u)&&!(h!==be&&st(d,h)))return;const b=i.vnode.props;b&&(t in b||r in b||o in b)&&(`onUpdate:${t}`in b||`onUpdate:${r}`in b||`onUpdate:${o}`in b)||(u=d,c()),i.emit(`update:${t}`,g),st(d,g)&&st(d,h)&&!st(g,f)&&c(),h=d,f=g}}});return a[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?s||be:a,done:!1}:{done:!0}}}},a}const uc=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${dt(t)}Modifiers`]||e[`${cn(t)}Modifiers`];function hf(e,t,...n){if(e.isUnmounted)return;const i=e.vnode.props||be;let r=n;const o=t.startsWith("update:"),s=o&&uc(i,t.slice(7));s&&(s.trim&&(r=n.map(u=>Ne(u)?u.trim():u)),s.number&&(r=n.map(ha)));let a,l=i[a=qi(t)]||i[a=qi(dt(t))];!l&&o&&(l=i[a=qi(cn(t))]),l&&It(l,e,6,r);const c=i[a+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,It(c,e,6,r)}}const ff=new WeakMap;function hc(e,t,n=!1){const i=n?ff:t.emitsCache,r=i.get(e);if(r!==void 0)return r;const o=e.emits;let s={},a=!1;if(!he(e)){const l=c=>{const u=hc(c,t,!0);u&&(a=!0,je(s,u))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!o&&!a?(Ce(e)&&i.set(e,null),null):(ce(o)?o.forEach(l=>s[l]=null):je(s,o),Ce(e)&&i.set(e,s),s)}function Yr(e,t){return!e||!Er(t)?!1:(t=t.slice(2).replace(/Once$/,""),_e(e,t[0].toLowerCase()+t.slice(1))||_e(e,cn(t))||_e(e,t))}function Ks(e){const{type:t,vnode:n,proxy:i,withProxy:r,propsOptions:[o],slots:s,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:d,ctx:g,inheritAttrs:b}=e,O=hr(e);let F,D;try{if(n.shapeFlag&4){const V=r||i,$=V;F=Wt(c.call($,V,u,h,d,f,g)),D=a}else{const V=t;F=Wt(V.length>1?V(h,{attrs:a,slots:s,emit:l}):V(h,null)),D=t.props?a:df(a)}}catch(V){fi.length=0,Hr(V,e,1),F=K(Jt)}let z=F;if(D&&b!==!1){const V=Object.keys(D),{shapeFlag:$}=z;V.length&&$&7&&(o&&V.some(is)&&(D=mf(D,o)),z=Bn(z,D,!1,!0))}return n.dirs&&(z=Bn(z,null,!1,!0),z.dirs=z.dirs?z.dirs.concat(n.dirs):n.dirs),n.transition&&ms(z,n.transition),F=z,hr(O),F}const df=e=>{let t;for(const n in e)(n==="class"||n==="style"||Er(n))&&((t||(t={}))[n]=e[n]);return t},mf=(e,t)=>{const n={};for(const i in e)(!is(i)||!(i.slice(9)in t))&&(n[i]=e[i]);return n};function gf(e,t,n){const{props:i,children:r,component:o}=e,{props:s,children:a,patchFlag:l}=t,c=o.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return i?Js(i,s,c):!!s;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(s[f]!==i[f]&&!Yr(c,f))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===s?!1:i?s?Js(i,s,c):!0:!!s;return!1}function Js(e,t,n){const i=Object.keys(t);if(i.length!==Object.keys(e).length)return!0;for(let r=0;r<i.length;r++){const o=i[r];if(t[o]!==e[o]&&!Yr(n,o))return!0}return!1}function pf({vnode:e,parent:t},n){for(;t;){const i=t.subTree;if(i.suspense&&i.suspense.activeBranch===e&&(i.el=e.el),i===e)(e=t.vnode).el=n,t=t.parent;else break}}const fc=e=>e.__isSuspense;function yf(e,t){t&&t.pendingBranch?ce(e)?t.effects.push(...e):t.effects.push(e):wh(e)}const ue=Symbol.for("v-fgt"),qr=Symbol.for("v-txt"),Jt=Symbol.for("v-cmt"),ao=Symbol.for("v-stc"),fi=[];let ft=null;function X(e=!1){fi.push(ft=e?null:[])}function xf(){fi.pop(),ft=fi[fi.length-1]||null}let xi=1;function Zs(e,t=!1){xi+=e,e<0&&ft&&t&&(ft.hasOnce=!0)}function dc(e){return e.dynamicChildren=xi>0?ft||In:null,xf(),xi>0&&ft&&ft.push(e),e}function J(e,t,n,i,r,o){return dc(ie(e,t,n,i,r,o,!0))}function lt(e,t,n,i,r){return dc(K(e,t,n,i,r,!0))}function ws(e){return e?e.__v_isVNode===!0:!1}function Qn(e,t){return e.type===t.type&&e.key===t.key}const mc=({key:e})=>e??null,Ji=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?Ne(e)||Fe(e)||he(e)?{i:Xe,r:e,k:t,f:!!n}:e:null);function ie(e,t=null,n=null,i=0,r=null,o=e===ue?0:1,s=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&mc(t),ref:t&&Ji(t),scopeId:Da,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Xe};return a?(vs(l,n),o&128&&e.normalize(l)):n&&(l.shapeFlag|=Ne(n)?8:16),xi>0&&!s&&ft&&(l.patchFlag>0||o&6)&&l.patchFlag!==32&&ft.push(l),l}const K=bf;function bf(e,t=null,n=null,i=0,r=null,o=!1){if((!e||e===qa)&&(e=Jt),ws(e)){const a=Bn(e,t,!0);return n&&vs(a,n),xi>0&&!o&&ft&&(a.shapeFlag&6?ft[ft.indexOf(e)]=a:ft.push(a)),a.patchFlag=-2,a}if(Af(e)&&(e=e.__vccOpts),t){t=Gr(t);let{class:a,style:l}=t;a&&!Ne(a)&&(t.class=Sn(a)),Ce(l)&&(fs(l)&&!ce(l)&&(l=je({},l)),t.style=Pi(l))}const s=Ne(e)?1:fc(e)?128:vh(e)?64:Ce(e)?4:he(e)?2:0;return ie(e,t,n,i,r,s,o,!0)}function Gr(e){return e?fs(e)||nc(e)?je({},e):e:null}function Bn(e,t,n=!1,i=!1){const{props:r,ref:o,patchFlag:s,children:a,transition:l}=e,c=t?we(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&mc(c),ref:t&&t.ref?n&&o?ce(o)?o.concat(Ji(t)):[o,Ji(t)]:Ji(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ue?s===-1?16:s|16:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Bn(e.ssContent),ssFallback:e.ssFallback&&Bn(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&i&&ms(u,l.clone(u)),u}function Mi(e=" ",t=0){return K(qr,null,e,t)}function rt(e="",t=!1){return t?(X(),lt(Jt,null,e)):K(Jt,null,e)}function Wt(e){return e==null||typeof e=="boolean"?K(Jt):ce(e)?K(ue,null,e.slice()):ws(e)?on(e):K(qr,null,String(e))}function on(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Bn(e)}function vs(e,t){let n=0;const{shapeFlag:i}=e;if(t==null)t=null;else if(ce(t))n=16;else if(typeof t=="object")if(i&65){const r=t.default;r&&(r._c&&(r._d=!1),vs(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!nc(t)?t._ctx=Xe:r===3&&Xe&&(Xe.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else he(t)?(t={default:t,_ctx:Xe},n=32):(t=String(t),i&64?(n=16,t=[Mi(t)]):n=8);e.children=t,e.shapeFlag|=n}function we(...e){const t={};for(let n=0;n<e.length;n++){const i=e[n];for(const r in i)if(r==="class")t.class!==i.class&&(t.class=Sn([t.class,i.class]));else if(r==="style")t.style=Pi([t.style,i.style]);else if(Er(r)){const o=t[r],s=i[r];s&&o!==s&&!(ce(o)&&o.includes(s))&&(t[r]=o?[].concat(o,s):s)}else r!==""&&(t[r]=i[r])}return t}function Lt(e,t,n,i=null){It(e,t,7,[n,i])}const wf=Qa();let vf=0;function Sf(e,t,n){const i=e.type,r=(t?t.appContext:e.appContext)||wf,o={uid:vf++,vnode:e,type:i,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new zu(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:rc(i,r),emitsOptions:hc(i,r),emit:null,emitted:null,propsDefaults:be,inheritAttrs:i.inheritAttrs,ctx:be,data:be,props:be,attrs:be,slots:be,refs:be,setupState:be,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=t?t.root:o,o.emit=hf.bind(null,o),e.ce&&e.ce(o),o}let Je=null;const _n=()=>Je||Xe;let gr,No;{const e=Dr(),t=(n,i)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(i),o=>{r.length>1?r.forEach(s=>s(o)):r[0](o)}};gr=t("__VUE_INSTANCE_SETTERS__",n=>Je=n),No=t("__VUE_SSR_SETTERS__",n=>bi=n)}const Ci=e=>{const t=Je;return gr(e),e.scope.on(),()=>{e.scope.off(),gr(t)}},Qs=()=>{Je&&Je.scope.off(),gr(null)};function gc(e){return e.vnode.shapeFlag&4}let bi=!1;function _f(e,t=!1,n=!1){t&&No(t);const{props:i,children:r}=e.vnode,o=gc(e);Kh(e,i,o,t),ef(e,r,n||t);const s=o?kf(e,t):void 0;return t&&No(!1),s}function kf(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Fh);const{setup:i}=n;if(i){Ut();const r=e.setupContext=i.length>1?yc(e):null,o=Ci(e),s=Ai(i,e,0,[e.props,r]),a=la(s);if(Kt(),o(),(a||e.sp)&&!Rn(e)&&Ha(e),a){if(s.then(Qs,Qs),t)return s.then(l=>{el(e,l)}).catch(l=>{Hr(l,e,0)});e.asyncDep=s}else el(e,s)}else pc(e)}function el(e,t,n){he(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Ce(t)&&(e.setupState=Na(t)),pc(e)}function pc(e,t,n){const i=e.type;e.render||(e.render=i.render||$t);{const r=Ci(e);Ut();try{zh(e)}finally{Kt(),r()}}}const Tf={get(e,t){return Ke(e,"get",""),e[t]}};function yc(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,Tf),slots:e.slots,emit:e.emit,expose:t}}function Ur(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Na(ch(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in hi)return hi[n](e)},has(t,n){return n in t||n in hi}})):e.proxy}function Pf(e,t=!0){return he(e)?e.displayName||e.name:e.name||t&&e.__name}function Af(e){return he(e)&&"__vccOpts"in e}const ee=(e,t)=>gh(e,t,bi),Lf="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Eo;const tl=typeof window<"u"&&window.trustedTypes;if(tl)try{Eo=tl.createPolicy("vue",{createHTML:e=>e})}catch{}const xc=Eo?e=>Eo.createHTML(e):e=>e,Mf="http://www.w3.org/2000/svg",Cf="http://www.w3.org/1998/Math/MathML",Ht=typeof document<"u"?document:null,nl=Ht&&Ht.createElement("template"),Wf={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,i)=>{const r=t==="svg"?Ht.createElementNS(Mf,e):t==="mathml"?Ht.createElementNS(Cf,e):n?Ht.createElement(e,{is:n}):Ht.createElement(e);return e==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:e=>Ht.createTextNode(e),createComment:e=>Ht.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Ht.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,i,r,o){const s=n?n.previousSibling:t.lastChild;if(r&&(r===o||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===o||!(r=r.nextSibling)););else{nl.innerHTML=xc(i==="svg"?`<svg>${e}</svg>`:i==="mathml"?`<math>${e}</math>`:e);const a=nl.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},$f=Symbol("_vtc");function Nf(e,t,n){const i=e[$f];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const il=Symbol("_vod"),Ef=Symbol("_vsh"),If=Symbol(""),Of=/(?:^|;)\s*display\s*:/;function Vf(e,t,n){const i=e.style,r=Ne(n);let o=!1;if(n&&!r){if(t)if(Ne(t))for(const s of t.split(";")){const a=s.slice(0,s.indexOf(":")).trim();n[a]==null&&Zi(i,a,"")}else for(const s in t)n[s]==null&&Zi(i,s,"");for(const s in n)s==="display"&&(o=!0),Zi(i,s,n[s])}else if(r){if(t!==n){const s=i[If];s&&(n+=";"+s),i.cssText=n,o=Of.test(n)}}else t&&e.removeAttribute("style");il in e&&(e[il]=o?i.display:"",e[Ef]&&(i.display="none"))}const rl=/\s*!important$/;function Zi(e,t,n){if(ce(n))n.forEach(i=>Zi(e,t,i));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const i=Df(e,t);rl.test(n)?e.setProperty(cn(i),n.replace(rl,""),"important"):e[i]=n}}const ol=["Webkit","Moz","ms"],co={};function Df(e,t){const n=co[t];if(n)return n;let i=dt(t);if(i!=="filter"&&i in e)return co[t]=i;i=Vr(i);for(let r=0;r<ol.length;r++){const o=ol[r]+i;if(o in e)return co[t]=o}return t}const sl="http://www.w3.org/1999/xlink";function ll(e,t,n,i,r,o=Ru(t)){i&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(sl,t.slice(6,t.length)):e.setAttributeNS(sl,t,n):n==null||o&&!fa(n)?e.removeAttribute(t):e.setAttribute(t,o?"":kt(n)?String(n):n)}function al(e,t,n,i,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?xc(n):n);return}const o=e.tagName;if(t==="value"&&o!=="PROGRESS"&&!o.includes("-")){const a=o==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let s=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=fa(n):n==null&&a==="string"?(n="",s=!0):a==="number"&&(n=0,s=!0)}try{e[t]=n}catch{}s&&e.removeAttribute(r||t)}function bc(e,t,n,i){e.addEventListener(t,n,i)}function Rf(e,t,n,i){e.removeEventListener(t,n,i)}const cl=Symbol("_vei");function Ff(e,t,n,i,r=null){const o=e[cl]||(e[cl]={}),s=o[t];if(i&&s)s.value=i;else{const[a,l]=jf(t);if(i){const c=o[t]=Bf(i,r);bc(e,a,c,l)}else s&&(Rf(e,a,s,l),o[t]=void 0)}}const ul=/(?:Once|Passive|Capture)$/;function jf(e){let t;if(ul.test(e)){t={};let i;for(;i=e.match(ul);)e=e.slice(0,e.length-i[0].length),t[i[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):cn(e.slice(2)),t]}let uo=0;const zf=Promise.resolve(),Hf=()=>uo||(zf.then(()=>uo=0),uo=Date.now());function Bf(e,t){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;It(Xf(i,n.value),t,5,[i])};return n.value=e,n.attached=Hf(),n}function Xf(e,t){if(ce(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(i=>r=>!r._stopped&&i&&i(r))}else return t}const hl=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Yf=(e,t,n,i,r,o)=>{const s=r==="svg";t==="class"?Nf(e,i,s):t==="style"?Vf(e,n,i):Er(t)?is(t)||Ff(e,t,n,i,o):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):qf(e,t,i,s))?(al(e,t,i),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&ll(e,t,i,s,o,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!Ne(i))?al(e,dt(t),i,o,t):(t==="true-value"?e._trueValue=i:t==="false-value"&&(e._falseValue=i),ll(e,t,i,s))};function qf(e,t,n,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in e&&hl(t)&&he(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return hl(t)&&Ne(n)?!1:t in e}const fl=e=>{const t=e.props["onUpdate:modelValue"]||!1;return ce(t)?n=>Gi(t,n):t},ho=Symbol("_assign"),wc={deep:!0,created(e,{value:t,modifiers:{number:n}},i){const r=Ir(t);bc(e,"change",()=>{const o=Array.prototype.filter.call(e.options,s=>s.selected).map(s=>n?ha(pr(s)):pr(s));e[ho](e.multiple?r?new Set(o):o:o[0]),e._assigning=!0,Li(()=>{e._assigning=!1})}),e[ho]=fl(i)},mounted(e,{value:t}){dl(e,t)},beforeUpdate(e,t,n){e[ho]=fl(n)},updated(e,{value:t}){e._assigning||dl(e,t)}};function dl(e,t){const n=e.multiple,i=ce(t);if(!(n&&!i&&!Ir(t))){for(let r=0,o=e.options.length;r<o;r++){const s=e.options[r],a=pr(s);if(n)if(i){const l=typeof a;l==="string"||l==="number"?s.selected=t.some(c=>String(c)===String(a)):s.selected=ju(t,a)>-1}else s.selected=t.has(a);else if(Rr(pr(s),t)){e.selectedIndex!==r&&(e.selectedIndex=r);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function pr(e){return"_value"in e?e._value:e.value}const Gf=["ctrl","shift","alt","meta"],Uf={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Gf.some(n=>e[`${n}Key`]&&!t.includes(n))},ml=(e,t)=>{const n=e._withMods||(e._withMods={}),i=t.join(".");return n[i]||(n[i]=((r,...o)=>{for(let s=0;s<t.length;s++){const a=Uf[t[s]];if(a&&a(r,t))return}return e(r,...o)}))},Kf=je({patchProp:Yf},Wf);let gl;function Jf(){return gl||(gl=nf(Kf))}const Zf=((...e)=>{const t=Jf().createApp(...e),{mount:n}=t;return t.mount=i=>{const r=ed(i);if(!r)return;const o=t._component;!he(o)&&!o.render&&!o.template&&(o.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const s=n(r,!1,Qf(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),s},t});function Qf(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function ed(e){return Ne(e)?document.querySelector(e):e}function td(e){return ga()?(Hu(e),!0):!1}function nd(e){if(!Fe(e))return Hn(e);const t=new Proxy({},{get(n,i,r){return C(Reflect.get(e.value,i,r))},set(n,i,r){return Fe(e.value[i])&&!Fe(r)?e.value[i].value=r:e.value[i]=r,!0},deleteProperty(n,i){return Reflect.deleteProperty(e.value,i)},has(n,i){return Reflect.has(e.value,i)},ownKeys(){return Object.keys(e.value)},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}}});return Hn(t)}function Ct(e){return nd(ee(e))}const id=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;function rd(e){return Array.isArray(e)?e:[e]}function od(e){return _n()}function sd(e,t=!0,n){od()?Xr(e,n):t?e():Li(e)}const vc=id?window:void 0;function $n(e){var t;const n=$a(e);return(t=n?.$el)!=null?t:n}function ld(){const e=ar(!1),t=_n();return t&&Xr(()=>{e.value=!0},t),e}function ad(e){const t=ld();return ee(()=>(t.value,!!e()))}function cd(e,t,n={}){const{window:i=vc,...r}=n;let o;const s=ad(()=>i&&"ResizeObserver"in i),a=()=>{o&&(o.disconnect(),o=void 0)},l=ee(()=>{const h=$a(e);return Array.isArray(h)?h.map(f=>$n(f)):[$n(h)]}),c=Qe(l,h=>{if(a(),s.value&&i){o=new ResizeObserver(t);for(const f of h)f&&o.observe(f,r)}},{immediate:!0,flush:"post"}),u=()=>{a(),c()};return td(u),{isSupported:s,stop:u}}function Sc(e,t={width:0,height:0},n={}){const{window:i=vc,box:r="content-box"}=n,o=ee(()=>{var h,f;return(f=(h=$n(e))==null?void 0:h.namespaceURI)==null?void 0:f.includes("svg")}),s=ar(t.width),a=ar(t.height),{stop:l}=cd(e,([h])=>{const f=r==="border-box"?h.borderBoxSize:r==="content-box"?h.contentBoxSize:h.devicePixelContentBoxSize;if(i&&o.value){const d=$n(e);if(d){const g=d.getBoundingClientRect();s.value=g.width,a.value=g.height}}else if(f){const d=rd(f);s.value=d.reduce((g,{inlineSize:b})=>g+b,0),a.value=d.reduce((g,{blockSize:b})=>g+b,0)}else s.value=h.contentRect.width,a.value=h.contentRect.height},n);sd(()=>{const h=$n(e);h&&(s.value="offsetWidth"in h?h.offsetWidth:t.width,a.value="offsetHeight"in h?h.offsetHeight:t.height)});const c=Qe(()=>$n(e),h=>{s.value=h?t.width:0,a.value=h?t.height:0});function u(){l(),c()}return{width:s,height:a,stop:u}}/**
* @vue/compiler-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const ud=Symbol(""),hd=Symbol(""),fd=Symbol(""),dd=Symbol(""),_c={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function md(e,t=""){return{type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:_c}}function Io(e,t=!1,n=_c,i=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:i}}const pl=new Uint8Array([123,123]),yl=new Uint8Array([125,125]);function xl(e){return e>=97&&e<=122||e>=65&&e<=90}function ht(e){return e===32||e===10||e===9||e===12||e===13}function en(e){return e===47||e===62||ht(e)}function yr(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}const qe={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])};class gd{constructor(t,n){this.stack=t,this.cbs=n,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=pl,this.delimiterClose=yl,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return this.mode===2&&this.stack.length===0}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=pl,this.delimiterClose=yl}getPos(t){let n=1,i=t+1;for(let r=this.newlines.length-1;r>=0;r--){const o=this.newlines[r];if(t>o){n=r+2,i=t-o;break}}return{column:i,line:n,offset:t}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(t){t===60?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t))}stateInterpolationOpen(t){if(t===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){const n=this.index+1-this.delimiterOpen.length;n>this.sectionStart&&this.cbs.ontext(this.sectionStart,n),this.state=3,this.sectionStart=n}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(t)):(this.state=1,this.stateText(t))}stateInterpolation(t){t===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(t))}stateInterpolationClose(t){t===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(t))}stateSpecialStartSequence(t){const n=this.sequenceIndex===this.currentSequence.length;if(!(n?en(t):(t|32)===this.currentSequence[this.sequenceIndex]))this.inRCDATA=!1;else if(!n){this.sequenceIndex++;return}this.sequenceIndex=0,this.state=6,this.stateInTagName(t)}stateInRCDATA(t){if(this.sequenceIndex===this.currentSequence.length){if(t===62||ht(t)){const n=this.index-this.currentSequence.length;if(this.sectionStart<n){const i=this.index;this.index=n,this.cbs.ontext(this.sectionStart,n),this.index=i}this.sectionStart=n+2,this.stateInClosingTagName(t),this.inRCDATA=!1;return}this.sequenceIndex=0}(t|32)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:this.sequenceIndex===0?this.currentSequence===qe.TitleEnd||this.currentSequence===qe.TextareaEnd&&!this.inSFCRoot?!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=+(t===60)}stateCDATASequence(t){t===qe.Cdata[this.sequenceIndex]?++this.sequenceIndex===qe.Cdata.length&&(this.state=28,this.currentSequence=qe.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(t))}fastForwardTo(t){for(;++this.index<this.buffer.length;){const n=this.buffer.charCodeAt(this.index);if(n===10&&this.newlines.push(this.index),n===t)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(t){t===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===qe.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):this.sequenceIndex===0?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):t!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(t,n){this.enterRCDATA(t,n),this.state=31}enterRCDATA(t,n){this.inRCDATA=!0,this.currentSequence=t,this.sequenceIndex=n}stateBeforeTagName(t){t===33?(this.state=22,this.sectionStart=this.index+1):t===63?(this.state=24,this.sectionStart=this.index+1):xl(t)?(this.sectionStart=this.index,this.mode===0?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:t===116?this.state=30:this.state=t===115?29:6):t===47?this.state=8:(this.state=1,this.stateText(t))}stateInTagName(t){en(t)&&this.handleTagName(t)}stateInSFCRootTagName(t){if(en(t)){const n=this.buffer.slice(this.sectionStart,this.index);n!=="template"&&this.enterRCDATA(yr("</"+n),0),this.handleTagName(t)}}handleTagName(t){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)}stateBeforeClosingTagName(t){ht(t)||(t===62?(this.state=1,this.sectionStart=this.index+1):(this.state=xl(t)?9:27,this.sectionStart=this.index))}stateInClosingTagName(t){(t===62||ht(t))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(t))}stateAfterClosingTagName(t){t===62&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(t){t===62?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):t===47?this.state=7:t===60&&this.peek()===47?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):ht(t)||this.handleAttrStart(t)}handleAttrStart(t){t===118&&this.peek()===45?(this.state=13,this.sectionStart=this.index):t===46||t===58||t===64||t===35?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(t){t===62?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):ht(t)||(this.state=11,this.stateBeforeAttrName(t))}stateInAttrName(t){(t===61||en(t))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(t))}stateInDirName(t){t===61||en(t)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===58?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):t===46&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(t){t===61||en(t)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===91?this.state=15:t===46&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(t){t===93?this.state=14:(t===61||en(t))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(t))}stateInDirModifier(t){t===61||en(t)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===46&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(t){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(t)}stateAfterAttrName(t){t===61?this.state=18:t===47||t===62?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)):ht(t)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(t))}stateBeforeAttrValue(t){t===34?(this.state=19,this.sectionStart=this.index+1):t===39?(this.state=20,this.sectionStart=this.index+1):ht(t)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(t))}handleInAttrValue(t,n){(t===n||this.fastForwardTo(n))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(n===34?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(t){this.handleInAttrValue(t,34)}stateInAttrValueSingleQuotes(t){this.handleInAttrValue(t,39)}stateInAttrValueNoQuotes(t){ht(t)||t===62?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(t)):(t===39||t===60||t===61||t===96)&&this.cbs.onerr(18,this.index)}stateBeforeDeclaration(t){t===91?(this.state=26,this.sequenceIndex=0):this.state=t===45?25:23}stateInDeclaration(t){(t===62||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(t){(t===62||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(t){t===45?(this.state=28,this.currentSequence=qe.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(t){(t===62||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(t){t===qe.ScriptEnd[3]?this.startSpecial(qe.ScriptEnd,4):t===qe.StyleEnd[3]?this.startSpecial(qe.StyleEnd,4):(this.state=6,this.stateInTagName(t))}stateBeforeSpecialT(t){t===qe.TitleEnd[3]?this.startSpecial(qe.TitleEnd,4):t===qe.TextareaEnd[3]?this.startSpecial(qe.TextareaEnd,4):(this.state=6,this.stateInTagName(t))}startEntity(){}stateInEntity(){}parse(t){for(this.buffer=t;this.index<this.buffer.length;){const n=this.buffer.charCodeAt(this.index);switch(n===10&&this.state!==33&&this.newlines.push(this.index),this.state){case 1:{this.stateText(n);break}case 2:{this.stateInterpolationOpen(n);break}case 3:{this.stateInterpolation(n);break}case 4:{this.stateInterpolationClose(n);break}case 31:{this.stateSpecialStartSequence(n);break}case 32:{this.stateInRCDATA(n);break}case 26:{this.stateCDATASequence(n);break}case 19:{this.stateInAttrValueDoubleQuotes(n);break}case 12:{this.stateInAttrName(n);break}case 13:{this.stateInDirName(n);break}case 14:{this.stateInDirArg(n);break}case 15:{this.stateInDynamicDirArg(n);break}case 16:{this.stateInDirModifier(n);break}case 28:{this.stateInCommentLike(n);break}case 27:{this.stateInSpecialComment(n);break}case 11:{this.stateBeforeAttrName(n);break}case 6:{this.stateInTagName(n);break}case 34:{this.stateInSFCRootTagName(n);break}case 9:{this.stateInClosingTagName(n);break}case 5:{this.stateBeforeTagName(n);break}case 17:{this.stateAfterAttrName(n);break}case 20:{this.stateInAttrValueSingleQuotes(n);break}case 18:{this.stateBeforeAttrValue(n);break}case 8:{this.stateBeforeClosingTagName(n);break}case 10:{this.stateAfterClosingTagName(n);break}case 29:{this.stateBeforeSpecialS(n);break}case 30:{this.stateBeforeSpecialT(n);break}case 21:{this.stateInAttrValueNoQuotes(n);break}case 7:{this.stateInSelfClosingTag(n);break}case 23:{this.stateInDeclaration(n);break}case 22:{this.stateBeforeDeclaration(n);break}case 25:{this.stateBeforeComment(n);break}case 24:{this.stateInProcessingInstruction(n);break}case 33:{this.stateInEntity();break}}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(this.state===1||this.state===32&&this.sequenceIndex===0?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(this.state===19||this.state===20||this.state===21)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){const t=this.buffer.length;this.sectionStart>=t||(this.state===28?this.currentSequence===qe.CdataEnd?this.cbs.oncdata(this.sectionStart,t):this.cbs.oncomment(this.sectionStart,t):this.state===6||this.state===11||this.state===18||this.state===17||this.state===12||this.state===13||this.state===14||this.state===15||this.state===16||this.state===20||this.state===19||this.state===21||this.state===9||this.cbs.ontext(this.sectionStart,t))}emitCodePoint(t,n){}}function bl(e,{compatConfig:t}){const n=t&&t[e];return e==="MODE"?n||3:n}function kc(e,t){const n=bl("MODE",t),i=bl(e,t);return n===3?i===!0:i!==!1}function xr(e,t,n,...i){return kc(e,t)}function pd(e){throw e}function yd(e){}function xd(e,t,n,i){const r=`https://vuejs.org/error-reference/#compiler-${e}`,o=new SyntaxError(String(r));return o.code=e,o.loc=t,o}const bd=e=>e.type===4&&e.isStatic;function wd(e){switch(e){case"Teleport":case"teleport":return ud;case"Suspense":case"suspense":return hd;case"KeepAlive":case"keep-alive":return fd;case"BaseTransition":case"base-transition":return dd}}function vd(e,t){return!!(e&&bd(e)&&e.content===t)}function wl(e){return e.type===7&&e.name==="pre"}const Sd=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/,Tc={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:Wn,isPreTag:Wn,isIgnoreNewlineTag:Wn,isCustomElement:Wn,onError:pd,onWarn:yd,comments:!1,prefixIdentifiers:!1};let ve=Tc,wi=null,Gt="",Ue=null,pe=null,ot="",zt=-1,mn=-1,Ss=0,sn=!1,Oo=null;const $e=[],Oe=new gd($e,{onerr:Rt,ontext(e,t){Di(He(e,t),e,t)},ontextentity(e,t,n){Di(e,t,n)},oninterpolation(e,t){if(sn)return Di(He(e,t),e,t);let n=e+Oe.delimiterOpen.length,i=t-Oe.delimiterClose.length;for(;ht(Gt.charCodeAt(n));)n++;for(;ht(Gt.charCodeAt(i-1));)i--;let r=He(n,i);r.includes("&")&&(r=ve.decodeEntities(r,!1)),Vo({type:5,content:er(r,!1,De(n,i)),loc:De(e,t)})},onopentagname(e,t){const n=He(e,t);Ue={type:1,tag:n,ns:ve.getNamespace(n,$e[0],ve.ns),tagType:0,props:[],children:[],loc:De(e-1,t),codegenNode:void 0}},onopentagend(e){Sl(e)},onclosetag(e,t){const n=He(e,t);if(!ve.isVoidTag(n)){let i=!1;for(let r=0;r<$e.length;r++)if($e[r].tag.toLowerCase()===n.toLowerCase()){i=!0,r>0&&Rt(24,$e[0].loc.start.offset);for(let s=0;s<=r;s++){const a=$e.shift();Qi(a,t,s<r)}break}i||Rt(23,Pc(e,60))}},onselfclosingtag(e){const t=Ue.tag;Ue.isSelfClosing=!0,Sl(e),$e[0]&&$e[0].tag===t&&Qi($e.shift(),e)},onattribname(e,t){pe={type:6,name:He(e,t),nameLoc:De(e,t),value:void 0,loc:De(e)}},ondirname(e,t){const n=He(e,t),i=n==="."||n===":"?"bind":n==="@"?"on":n==="#"?"slot":n.slice(2);if(!sn&&i===""&&Rt(26,e),sn||i==="")pe={type:6,name:n,nameLoc:De(e,t),value:void 0,loc:De(e)};else if(pe={type:7,name:i,rawName:n,exp:void 0,arg:void 0,modifiers:n==="."?[Io("prop")]:[],loc:De(e)},i==="pre"){sn=Oe.inVPre=!0,Oo=Ue;const r=Ue.props;for(let o=0;o<r.length;o++)r[o].type===7&&(r[o]=$d(r[o]))}},ondirarg(e,t){if(e===t)return;const n=He(e,t);if(sn&&!wl(pe))pe.name+=n,pn(pe.nameLoc,t);else{const i=n[0]!=="[";pe.arg=er(i?n:n.slice(1,-1),i,De(e,t),i?3:0)}},ondirmodifier(e,t){const n=He(e,t);if(sn&&!wl(pe))pe.name+="."+n,pn(pe.nameLoc,t);else if(pe.name==="slot"){const i=pe.arg;i&&(i.content+="."+n,pn(i.loc,t))}else{const i=Io(n,!0,De(e,t));pe.modifiers.push(i)}},onattribdata(e,t){ot+=He(e,t),zt<0&&(zt=e),mn=t},onattribentity(e,t,n){ot+=e,zt<0&&(zt=t),mn=n},onattribnameend(e){const t=pe.loc.start.offset,n=He(t,e);pe.type===7&&(pe.rawName=n),Ue.props.some(i=>(i.type===7?i.rawName:i.name)===n)&&Rt(2,t)},onattribend(e,t){if(Ue&&pe){if(pn(pe.loc,t),e!==0)if(ot.includes("&")&&(ot=ve.decodeEntities(ot,!0)),pe.type===6)pe.name==="class"&&(ot=Lc(ot).trim()),e===1&&!ot&&Rt(13,t),pe.value={type:2,content:ot,loc:e===1?De(zt,mn):De(zt-1,mn+1)},Oe.inSFCRoot&&Ue.tag==="template"&&pe.name==="lang"&&ot&&ot!=="html"&&Oe.enterRCDATA(yr("</template"),0);else{let n=0;pe.exp=er(ot,!1,De(zt,mn),0,n),pe.name==="for"&&(pe.forParseResult=kd(pe.exp));let i=-1;pe.name==="bind"&&(i=pe.modifiers.findIndex(r=>r.content==="sync"))>-1&&xr("COMPILER_V_BIND_SYNC",ve,pe.loc,pe.arg.loc.source)&&(pe.name="model",pe.modifiers.splice(i,1))}(pe.type!==7||pe.name!=="pre")&&Ue.props.push(pe)}ot="",zt=mn=-1},oncomment(e,t){ve.comments&&Vo({type:3,content:He(e,t),loc:De(e-4,t+3)})},onend(){const e=Gt.length;for(let t=0;t<$e.length;t++)Qi($e[t],e-1),Rt(24,$e[t].loc.start.offset)},oncdata(e,t){$e[0].ns!==0?Di(He(e,t),e,t):Rt(1,e-9)},onprocessinginstruction(e){($e[0]?$e[0].ns:ve.ns)===0&&Rt(21,e-1)}}),vl=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,_d=/^\(|\)$/g;function kd(e){const t=e.loc,n=e.content,i=n.match(Sd);if(!i)return;const[,r,o]=i,s=(h,f,d=!1)=>{const g=t.start.offset+f,b=g+h.length;return er(h,!1,De(g,b),0,d?1:0)},a={source:s(o.trim(),n.indexOf(o,r.length)),value:void 0,key:void 0,index:void 0,finalized:!1};let l=r.trim().replace(_d,"").trim();const c=r.indexOf(l),u=l.match(vl);if(u){l=l.replace(vl,"").trim();const h=u[1].trim();let f;if(h&&(f=n.indexOf(h,c+l.length),a.key=s(h,f,!0)),u[2]){const d=u[2].trim();d&&(a.index=s(d,n.indexOf(d,a.key?f+h.length:c+l.length),!0))}}return l&&(a.value=s(l,c,!0)),a}function He(e,t){return Gt.slice(e,t)}function Sl(e){Oe.inSFCRoot&&(Ue.innerLoc=De(e+1,e+1)),Vo(Ue);const{tag:t,ns:n}=Ue;n===0&&ve.isPreTag(t)&&Ss++,ve.isVoidTag(t)?Qi(Ue,e):($e.unshift(Ue),(n===1||n===2)&&(Oe.inXML=!0)),Ue=null}function Di(e,t,n){{const o=$e[0]&&$e[0].tag;o!=="script"&&o!=="style"&&e.includes("&")&&(e=ve.decodeEntities(e,!1))}const i=$e[0]||wi,r=i.children[i.children.length-1];r&&r.type===2?(r.content+=e,pn(r.loc,n)):i.children.push({type:2,content:e,loc:De(t,n)})}function Qi(e,t,n=!1){n?pn(e.loc,Pc(t,60)):pn(e.loc,Td(t,62)+1),Oe.inSFCRoot&&(e.children.length?e.innerLoc.end=je({},e.children[e.children.length-1].loc.end):e.innerLoc.end=je({},e.innerLoc.start),e.innerLoc.source=He(e.innerLoc.start.offset,e.innerLoc.end.offset));const{tag:i,ns:r,children:o}=e;if(sn||(i==="slot"?e.tagType=2:_l(e)?e.tagType=3:Ad(e)&&(e.tagType=1)),Oe.inRCDATA||(e.children=Ac(o)),r===0&&ve.isIgnoreNewlineTag(i)){const s=o[0];s&&s.type===2&&(s.content=s.content.replace(/^\r?\n/,""))}r===0&&ve.isPreTag(i)&&Ss--,Oo===e&&(sn=Oe.inVPre=!1,Oo=null),Oe.inXML&&($e[0]?$e[0].ns:ve.ns)===0&&(Oe.inXML=!1);{const s=e.props;if(!Oe.inSFCRoot&&kc("COMPILER_NATIVE_TEMPLATE",ve)&&e.tag==="template"&&!_l(e)){const l=$e[0]||wi,c=l.children.indexOf(e);l.children.splice(c,1,...e.children)}const a=s.find(l=>l.type===6&&l.name==="inline-template");a&&xr("COMPILER_INLINE_TEMPLATE",ve,a.loc)&&e.children.length&&(a.value={type:2,content:He(e.children[0].loc.start.offset,e.children[e.children.length-1].loc.end.offset),loc:a.loc})}}function Td(e,t){let n=e;for(;Gt.charCodeAt(n)!==t&&n<Gt.length-1;)n++;return n}function Pc(e,t){let n=e;for(;Gt.charCodeAt(n)!==t&&n>=0;)n--;return n}const Pd=new Set(["if","else","else-if","for","slot"]);function _l({tag:e,props:t}){if(e==="template"){for(let n=0;n<t.length;n++)if(t[n].type===7&&Pd.has(t[n].name))return!0}return!1}function Ad({tag:e,props:t}){if(ve.isCustomElement(e))return!1;if(e==="component"||Ld(e.charCodeAt(0))||wd(e)||ve.isBuiltInComponent&&ve.isBuiltInComponent(e)||ve.isNativeTag&&!ve.isNativeTag(e))return!0;for(let n=0;n<t.length;n++){const i=t[n];if(i.type===6){if(i.name==="is"&&i.value){if(i.value.content.startsWith("vue:"))return!0;if(xr("COMPILER_IS_ON_ELEMENT",ve,i.loc))return!0}}else if(i.name==="bind"&&vd(i.arg,"is")&&xr("COMPILER_IS_ON_ELEMENT",ve,i.loc))return!0}return!1}function Ld(e){return e>64&&e<91}const Md=/\r\n/g;function Ac(e){const t=ve.whitespace!=="preserve";let n=!1;for(let i=0;i<e.length;i++){const r=e[i];if(r.type===2)if(Ss)r.content=r.content.replace(Md,`
`);else if(Cd(r.content)){const o=e[i-1]&&e[i-1].type,s=e[i+1]&&e[i+1].type;!o||!s||t&&(o===3&&(s===3||s===1)||o===1&&(s===3||s===1&&Wd(r.content)))?(n=!0,e[i]=null):r.content=" "}else t&&(r.content=Lc(r.content))}return n?e.filter(Boolean):e}function Cd(e){for(let t=0;t<e.length;t++)if(!ht(e.charCodeAt(t)))return!1;return!0}function Wd(e){for(let t=0;t<e.length;t++){const n=e.charCodeAt(t);if(n===10||n===13)return!0}return!1}function Lc(e){let t="",n=!1;for(let i=0;i<e.length;i++)ht(e.charCodeAt(i))?n||(t+=" ",n=!0):(t+=e[i],n=!1);return t}function Vo(e){($e[0]||wi).children.push(e)}function De(e,t){return{start:Oe.getPos(e),end:t==null?t:Oe.getPos(t),source:t==null?t:He(e,t)}}function pn(e,t){e.end=Oe.getPos(t),e.source=He(e.start.offset,t)}function $d(e){const t={type:6,name:e.rawName,nameLoc:De(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){const n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n}}return t}function er(e,t=!1,n,i=0,r=0){return Io(e,t,n,i)}function Rt(e,t,n){ve.onError(xd(e,De(t,t)))}function Nd(){Oe.reset(),Ue=null,pe=null,ot="",zt=-1,mn=-1,$e.length=0}function Ed(e,t){if(Nd(),Gt=e,ve=je({},Tc),t){let r;for(r in t)t[r]!=null&&(ve[r]=t[r])}Oe.mode=ve.parseMode==="html"?1:ve.parseMode==="sfc"?2:0,Oe.inXML=ve.ns===1||ve.ns===2;const n=t&&t.delimiters;n&&(Oe.delimiterOpen=yr(n[0]),Oe.delimiterClose=yr(n[1]));const i=wi=md([],e);return Oe.parse(Gt),i.loc=De(0,e.length),i.children=Ac(i.children),wi=null,i}new RegExp("\\b"+"arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b")+"\\b");const Mc={axis:{line_width:1,ticks_width:1,ticks_length:5,label_size:12,title_size:18},axis_x:{line_orientation:"horizontal",title_offset:20},axis_y:{line_orientation:"vertical",title_offset:30,title_angle:90},axis_left:{ticks_position:"left",title_position:"left"},axis_right:{ticks_position:"right",title_position:"right"},axis_top:{ticks_position:"top",title_position:"top"},axis_bottom:{ticks_position:"bottom",title_position:"bottom"},grid:{line_width_major:2,line_width_minor:1},plot:{margin:20,padding_x:50,padding_y:20},legend:{spacing:4}},Do={axis:{line_color:"black",ticks_color:"black",label_color:"black",title_color:"black"},grid:{line_color:"#eeeeee"}},Id={axis:{line_color:"gray",ticks_color:"gray",label_color:"gray",title_color:"gray"},grid:{line_color:"#eeeeee"}},Od={axis:{ticks_color:"black",label_color:"black",title_color:"black"},grid:{line_color:"white"},plot:{background:"#eeeeee"}},Vd={axis:{ticks_color:"#333333",label_color:"#555555",title_color:"black"},grid:{line_color:"#666666"},plot:{background:"#888888"}},Dd={axis:{line_color:"black",ticks_color:"black",label_color:"black",title_color:"black"},grid:{line_color:"black",line_width_major:1,line_width_minor:.5}},Rd={axis:{line_color:"black",ticks_color:"black",label_color:"black",title_color:"black"},grid:null},Fd={axis:null,grid:null};function tn(e){return e=e.filter(t=>t!==void 0),e=e.slice(e.findIndex(t=>t==null)+1),e.length==0?null:e.reduce((t,n)=>Object.assign(t,n),{})}function jd(...e){return e.reduce((t,n)=>{for(let i in n)n[i]===null?t[i]=null:t[i]=Object.assign(t[i]||{},n[i]);return t},{})}function zd(e){return{axis:{x:tn(["axis","axis_x"].map(t=>e?.[t])),y:tn(["axis","axis_y"].map(t=>e?.[t])),left:tn(["axis","axis_y","axis_left"].map(t=>e?.[t])),right:tn(["axis","axis_y","axis_right"].map(t=>e?.[t])),top:tn(["axis","axis_x","axis_top"].map(t=>e?.[t])),bottom:tn(["axis","axis_x","axis_bottom"].map(t=>e?.[t]))},grid:{x:tn(["grid","grid_x"].map(t=>e?.[t])),y:tn(["grid","grid_y"].map(t=>e?.[t]))},plot:{margin:{left:["margin","margin_x","margin_left"].map(t=>e?.plot?.[t]).findLast(t=>t!==void 0)??0,right:["margin","margin_x","margin_right"].map(t=>e?.plot?.[t]).findLast(t=>t!==void 0)??0,top:["margin","margin_y","margin_top"].map(t=>e?.plot?.[t]).findLast(t=>t!==void 0)??0,bottom:["margin","margin_y","margin_bottom"].map(t=>e?.plot?.[t]).findLast(t=>t!==void 0)??0},padding:{left:["padding","padding_x","padding_left"].map(t=>e?.plot?.[t]).findLast(t=>t!==void 0)??0,right:["padding","padding_x","padding_right"].map(t=>e?.plot?.[t]).findLast(t=>t!==void 0)??0,top:["padding","padding_y","padding_top"].map(t=>e?.plot?.[t]).findLast(t=>t!==void 0)??0,bottom:["padding","padding_y","padding_bottom"].map(t=>e?.plot?.[t]).findLast(t=>t!==void 0)??0},background:e?.plot?.background??"none"},legend:{spacing:e?.legend?.spacing??0}}}const An={base:Mc,default:Do,light:Id,classic:Rd,gray:Od,dark:Vd,linedraw:Dd,void:Fd},br={min(e,{na_rm:t=!0,infinity_rm:n=!0}={}){return t&&(e=e.filter(i=>typeof i=="number"||i instanceof Date)),n&&(e=e.filter(i=>isFinite(i))),Array.from(e).reduce((i,r)=>i<r?i:r,1/0)},max(e,{na_rm:t=!0,infinity_rm:n=!0}={}){return t&&(e=e.filter(i=>typeof i=="number"||i instanceof Date)),n&&(e=e.filter(i=>isFinite(i))),Array.from(e).reduce((i,r)=>i>r?i:r,-1/0)},extent(e,{na_rm:t=!0,infinity_rm:n=!0}={}){if(e.length==0)return[];t&&(e=e.filter(o=>typeof o=="number"||o instanceof Date)),n&&(e=e.filter(o=>isFinite(o)));let i=Array.from(e).reduce((o,s)=>o<s?o:s,1/0),r=Array.from(e).reduce((o,s)=>o>s?o:s,-1/0);return{0:i,1:r,length:2,min:i,max:r}}},Hd={sum(...e){if(e.some(i=>i==null))return null;if(e.some(i=>!Array.isArray(i)&&typeof i!="number"))throw new Error("Arguments must be numbers or arrays");let t=e.filter(i=>!Array.isArray(i)).reduce((i,r)=>+r+i,0);if(e=e.filter(i=>Array.isArray(i)),e.length==0)return[t];if(e.some(i=>i.length==0))return[];let n=e[0].length;if(e.some(i=>i.length!=n))throw new Error("Arrays must have the same length");return Array.from({length:n},(i,r)=>e.reduce((o,s)=>+s[r]+o,t))}};function kl(){let e=Array.from(arguments);if(!e.some(t=>t===void 0))return e.some(t=>t===null)?null:e.join("")}function Ri(e){return e==null?[]:Array.from(new Set(e))}function Ro(e){return{shiftKey:e.shiftKey,ctrlKey:e.ctrlKey,altKey:e.altKey,metaKey:e.metaKey,button:e.button,buttons:e.buttons}}function Fi(...e){if(e.length==0)return null;let n=e.filter(o=>Array.isArray(o)).reduce((o,s)=>{if(Array.isArray(s)){if(o==null)return s.length;if(o!=s.length)throw new Error("Arrays must have the same length")}return o},null)??0,i=[],r=[];for(let o=0;o<n;o++){let s=e.map(l=>Array.isArray(l)?l[o]:l),a=i.findIndex(l=>l.every((c,u)=>c===s[u]));a===-1&&(i.push(s),a=i.length-1),r.push(a)}return r.categories=i,r}let We=Hd.sum;const ln={point:{attrs:["color","size","stroke","alpha","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.x)??e.x,n),o=We(t.y?.apply?.(e.y)??e.y,i);return{x:r,y:o}},get_range(e,t){if(t=="x")return e.x??[];if(t=="y")return e.y??[]},validate(e){return isNaN(+e.x)||isNaN(+e.y)?null:e}},line:{attrs:["color","linewidth","linetype","alpha","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.x)??e.x,n),o=We(t.y?.apply?.(e.y)??e.y,i),s=We(t.x?.apply?.(e.xend)??e.xend,n),a=We(t.y?.apply?.(e.yend)??e.yend,i);return{x:r,y:o,xend:s,yend:a}},get_range(e,t){if(t=="x")return(e.x??[]).concat(e.xend??[]);if(t=="y")return(e.y??[]).concat(e.yend??[])},validate(e){return isNaN(+e.x)||isNaN(+e.y)||isNaN(+e.xend)||isNaN(+e.yend)?null:e}},stick:{attrs:["color","linewidth","linetype","alpha","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.x)??e.x,n),o=We(t.y?.apply?.(e.y)??e.y,i),s=We(r,e.dx,n),a=We(o,e.dy,i);return{x:r,y:o,xend:s,yend:a}},get_range(e,t){if(t=="x")return(e.x??[]).concat(e.xend??[]);if(t=="y")return(e.y??[]).concat(e.yend??[])},validate(e){return isNaN(+e.x)||isNaN(+e.y)||isNaN(+e.xend)||isNaN(+e.yend)?null:e}},tile:{attrs:["fill","color","linewidth","alpha","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=t.x?.apply?.(e.x)??e.x,o=t.y?.apply?.(e.y)??e.y,s=We(r,e.width?.map?.(u=>-u/2)??-.5,n),a=We(r,e.width?.map?.(u=>+u/2)??.5,n),l=We(o,e.height?.map?.(u=>-u/2)??-.5,i),c=We(o,e.height?.map?.(u=>+u/2)??.5,i);return{xmin:s,xmax:a,ymin:l,ymax:c}},get_values(e,t){if(t=="x")return e.x;if(t=="y")return e.y},get_range(e,t){if(t=="x"){let n=(e.x??[]).map((r,o)=>+r-e.width[o]/2),i=(e.x??[]).map((r,o)=>+r+e.width[o]/2);return n.concat(i)}if(t=="y"){let n=(e.y??[]).map((r,o)=>+r-e.height[o]/2),i=(e.y??[]).map((r,o)=>+r+e.height[o]/2);return n.concat(i)}},validate(e){return isNaN(+e.xmin)||isNaN(+e.ymin)||isNaN(+e.xmax)||isNaN(+e.ymax)?null:e}},rect:{attrs:["fill","color","linewidth","alpha","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.xmin)??e.xmin,n),o=We(t.x?.apply?.(e.xmax)??e.xmax,n),s=We(t.y?.apply?.(e.ymin)??e.ymin,i),a=We(t.y?.apply?.(e.ymax)??e.ymax,i);return{xmin:r,xmax:o,ymin:s,ymax:a}},get_range(e,t){if(t=="x")return(e.xmin??[]).concat(e.xmax??[]);if(t=="y")return(e.ymin??[]).concat(e.ymax??[])},validate(e){return isNaN(+e.xmin)||isNaN(+e.ymin)||isNaN(+e.xmax)||isNaN(+e.ymax)?null:e}},polygon:{attrs:["fill","color","linewidth","alpha","points","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge?.map(o=>+o),i=e.ynudge?.map(o=>+o);return{points:e.points.map((o,s)=>o.map(a=>{let l=n?.[s]??0,c=i?.[s]??0;return{x:+(t?.x?.[a.x]??a.x)+l,y:+(t?.y?.[a.y]??a.y)+c}}))}},get_range(e,t){if(t=="x")return(e.points??[]).flatMap(n=>n.map(i=>i.x));if(t=="y")return(e.points??[]).flatMap(n=>n.map(i=>i.y))},validate(e){return Array.isArray(e.points)?e:null}},text:{attrs:["color","size","stroke","linewidth","alpha","label","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.x)??e.x,n),o=We(t.y?.apply?.(e.y)??e.y,i);return{x:r,y:o}},get_range(e,t){if(t=="x")return e.x??[];if(t=="y")return e.y??[]},validate(e){return isNaN(+e.x)||isNaN(+e.y)?null:e}},textsegment:{attrs:["color","size","stroke","linewidth","alpha","label","xtranslate","ytranslate"],coord_scale(e,t){let n=e.xnudge??0,i=e.ynudge??0,r=We(t.x?.apply?.(e.x)??e.x,n),o=We(t.y?.apply?.(e.y)??e.y,i),s=We(t.x?.apply?.(e.xend)??e.xend,n),a=We(t.y?.apply?.(e.yend)??e.yend,i);return{x:r,y:o,xend:s,yend:a}},get_range(e,t){if(t=="x")return(e.x??[]).concat(e.xend??[]);if(t=="y")return(e.y??[]).concat(e.yend??[])},validate(e){return isNaN(+e.x)||isNaN(+e.xend)||isNaN(+e.y)||isNaN(+e.yend)?null:e}}},Bd={line:Object.assign(function(e,{orientation:t="x"}={}){let n=["x","y"].filter(c=>e[c]==null);if(n.length>0)throw new Error(`Missing aesthetics for GeomLine: ${n}`);let i=e.group??new Array(e.x.length).fill(null),o=Object.values(i.reduce((c,u,h)=>(c[u]==null&&(c[u]=[]),c[u].push(h),c),{})).map(c=>c.map((u,h)=>[e[t][u],h]).sort((u,h)=>u[0]-h[0]).map((u,h)=>c[u[1]])),s=o.map(c=>c.slice(0,-1).concat(NaN)).reduce((c,u)=>c.concat(u),[]).filter(c=>!isNaN(c)),a=o.map(c=>c.slice(1).concat(NaN)).reduce((c,u)=>c.concat(u),[]).filter(c=>!isNaN(c)),l={};for(let c in e)l[c]=s.map(u=>e[c][u]);return l.xend=a.map(c=>e.x[c]),l.yend=a.map(c=>e.y[c]),l},{coord_attrs:["x","y","xnudge","ynudge"]}),linerange:Object.assign(function(e){if(e.x!=null){let t=["x","ymin","ymax"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomLinerange: ${t}`);return(({x:n,ymin:i,ymax:r,...o})=>({x:n,xend:n,y:i,yend:r,...o}))(e)}else if(e.y!=null){let t=["y","xmin","xmax"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomLinerange: ${t}`);return(({y:n,xmin:i,xmax:r,...o})=>({y:n,yend:n,x:i,xend:r,...o}))(e)}else throw new Error("Missing aesthetics for GeomLinerange: x,ymin,ymax or y,xmin,xmax")},{coord_attrs:["x","y","xmin","xmax","ymin","ymax","xnudge","ynudge"]}),path:Object.assign(function(e){let t=["x","y"].filter(l=>e[l]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomPath: ${t}`);let n=e.group??new Array(e.x.length).fill(null),r=Object.values(n.reduce((l,c,u)=>(l[c]==null&&(l[c]=[]),l[c].push(u),l),{})).map(l=>l.map((c,u)=>l[u])),o=r.map(l=>l.slice(0,-1).concat(NaN)).reduce((l,c)=>l.concat(c),[]).filter(l=>!isNaN(l)),s=r.map(l=>l.slice(1).concat(NaN)).reduce((l,c)=>l.concat(c),[]).filter(l=>!isNaN(l)),a={};for(let l in e)a[l]=o.map(c=>e[l][c]);return a.xend=s.map(l=>e.x[l]),a.yend=s.map(l=>e.y[l]),a},{coord_attrs:["x","y","xnudge","ynudge"]}),segment:Object.assign(function(e){e.xend==null&&(e.xend=e.x),e.yend==null&&(e.yend=e.y);let t=["x","y","xend","yend"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomLine: ${t}`);return e},{coord_attrs:["x","y","xend","yend","xnudge","ynudge"]}),stick:Object.assign(function(e){e.dx==null&&(e.dx=Array(e.x.length).fill(0)),e.dy==null&&(e.dy=Array(e.y.length).fill(0));let t=["x","y","dx","dy"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomStick: ${t}`);return e},{coord_attrs:["x","y","dx","dy","xnudge","ynudge"]}),point:Object.assign(function(e){let t=["x","y"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomPoint: ${t}`);return e},{coord_attrs:["x","y","xnudge","ynudge"]}),polygon:Object.assign(function(e){let t=["points"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomPolygon: ${t}`);return e},{coord_attrs:["points","xnudge","ynudge"]}),rect:Object.assign(function(e){let t=["xmin","xmax","ymin","ymax"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomRect: ${t}`);return e},{coord_attrs:["xmin","xmax","ymin","ymax","xnudge","ynudge"]}),tile:Object.assign(function(e){e.width==null&&e.x.some(n=>typeof n=="string")&&(e.width=Array(e.x.length).fill(1)),e.height==null&&e.y.some(n=>typeof n=="string")&&(e.height=Array(e.y.length).fill(1));let t=["x","y","width","height"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomTile: ${t}`);return e},{coord_attrs:["x","y","width","height","xnudge","ynudge"]}),text:Object.assign(function(e){let t=["x","y","label"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomText: ${t}`);return e},{coord_attrs:["x","y","xnudge","ynudge"]}),textsegment:Object.assign(function(e){e.xend==null&&(e.xend=e.x),e.yend==null&&(e.yend=e.y);let t=["x","y","xend","yend","label"].filter(n=>e[n]==null);if(t.length>0)throw new Error(`Missing aesthetics for GeomTextsegment: ${t}`);return e},{coord_attrs:["x","y","xend","yend","xnudge","ynudge"]}),histogram:Object.assign(function(e,{bins:t=30,binwidth:n,breaks:i}={}){if(e.x!=null&&e.y!=null)throw new Error("Histogram only supports x or y, not both");let r=e.x??e.y;if(r==null)throw new Error("Missing aesthetics for GeomHistogram: x or y");if(r.some(h=>typeof h!="number"))throw new Error('"stat.histogram" requires a continuous aesthetic');if(i)i.sort((h,f)=>h-f);else{let{min:h,max:f}=br.extent(r);n||(n=(f-h)/(t-1)),i=Array.from({length:t+1},(d,g)=>h+(g-.5)*n)}t=i.length-1;let o=Object.keys(e).filter(h=>!["x","y"].includes(h)&&!h.startsWith("$")),s=Fi(...o.map(h=>e[h])),a=Fi(s??0,r.map(h=>i.findLast(f=>f<=h)??i[0]),r.map(h=>i.find(f=>f>h)??i[t])),l=[],c=Object.groupBy(e.$raw,(h,f)=>a?.[f]);for(let h in c)l[h]=c[h];let u={$raw:l,count:l.map(h=>h.length),$group:l.map((h,f)=>a.categories[f][0]),upper:l.map((h,f)=>a.categories[f][1]),lower:l.map((h,f)=>a.categories[f][2])};for(let h in o)u[o[h]]=l.map((f,d)=>s.categories[a.categories[d][0]][h]);return e.x?(({upper:h,lower:f,count:d,ymin:g=l.map(()=>0),...b})=>({xmin:h,xmax:f,ymin:g,ymax:d,...b}))(u):(({upper:h,lower:f,count:d,xmin:g=l.map(()=>0),...b})=>({xmin:g,xmax:d,ymin:h,ymax:f,...b}))(u)},{coord_attrs:["x","y","xnudge","ynudge"]}),bar:Object.assign(function(e){if(e.x!=null&&e.y!=null)throw new Error("Bar only supports x or y, not both");let t=e.x??e.y;if(t==null)throw new Error("Missing aesthetics for GeomBar: x or y");if(t.some(l=>typeof l=="number"))throw new Error('"stat.bar" requires a discrete aesthetic');let n=Object.keys(e).filter(l=>!["x","y"].includes(l)&&!l.startsWith("$")),i=Fi(...n.map(l=>e[l])),r=Fi(i??0,t),o=[],s=Object.groupBy(e.$raw,(l,c)=>r?.[c]);for(let l in s)o[l]=s[l];let a={$raw:o,count:o.map(l=>l.length),$group:o.map((l,c)=>r.categories[c][0]),value:o.map((l,c)=>r.categories[c][1])};for(let l in n)a[n[l]]=o.map((c,u)=>i.categories[r.categories[u][0]][l]);return e.x?(({value:l,count:c,...u})=>({x:l,y:c.map(h=>h/2),height:c,...u}))(a):(({value:l,count:c,...u})=>({y:l,x:c.map(h=>h/2),width:c,...u}))(a)},{coord_attrs:["x","y","xnudge","ynudge"]})};function tr(e,t){return e==null||t==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function Xd(e,t){return e==null||t==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function Cc(e){let t,n,i;e.length!==2?(t=tr,n=(a,l)=>tr(e(a),l),i=(a,l)=>e(a)-l):(t=e===tr||e===Xd?e:Yd,n=e,i=e);function r(a,l,c=0,u=a.length){if(c<u){if(t(l,l)!==0)return u;do{const h=c+u>>>1;n(a[h],l)<0?c=h+1:u=h}while(c<u)}return c}function o(a,l,c=0,u=a.length){if(c<u){if(t(l,l)!==0)return u;do{const h=c+u>>>1;n(a[h],l)<=0?c=h+1:u=h}while(c<u)}return c}function s(a,l,c=0,u=a.length){const h=r(a,l,c,u-1);return h>c&&i(a[h-1],l)>-i(a[h],l)?h-1:h}return{left:r,center:s,right:o}}function Yd(){return 0}function qd(e){return e===null?NaN:+e}const Gd=Cc(tr),Ud=Gd.right;Cc(qd).center;const Kd=Math.sqrt(50),Jd=Math.sqrt(10),Zd=Math.sqrt(2);function wr(e,t,n){const i=(t-e)/Math.max(0,n),r=Math.floor(Math.log10(i)),o=i/Math.pow(10,r),s=o>=Kd?10:o>=Jd?5:o>=Zd?2:1;let a,l,c;return r<0?(c=Math.pow(10,-r)/s,a=Math.round(e*c),l=Math.round(t*c),a/c<e&&++a,l/c>t&&--l,c=-c):(c=Math.pow(10,r)*s,a=Math.round(e/c),l=Math.round(t/c),a*c<e&&++a,l*c>t&&--l),l<a&&.5<=n&&n<2?wr(e,t,n*2):[a,l,c]}function Qd(e,t,n){if(t=+t,e=+e,n=+n,!(n>0))return[];if(e===t)return[e];const i=t<e,[r,o,s]=i?wr(t,e,n):wr(e,t,n);if(!(o>=r))return[];const a=o-r+1,l=new Array(a);if(i)if(s<0)for(let c=0;c<a;++c)l[c]=(o-c)/-s;else for(let c=0;c<a;++c)l[c]=(o-c)*s;else if(s<0)for(let c=0;c<a;++c)l[c]=(r+c)/-s;else for(let c=0;c<a;++c)l[c]=(r+c)*s;return l}function Fo(e,t,n){return t=+t,e=+e,n=+n,wr(e,t,n)[2]}function e1(e,t,n){t=+t,e=+e,n=+n;const i=t<e,r=i?Fo(t,e,n):Fo(e,t,n);return(i?-1:1)*(r<0?1/-r:r)}var t1={value:()=>{}};function Wc(){for(var e=0,t=arguments.length,n={},i;e<t;++e){if(!(i=arguments[e]+"")||i in n||/[\s.]/.test(i))throw new Error("illegal type: "+i);n[i]=[]}return new nr(n)}function nr(e){this._=e}function n1(e,t){return e.trim().split(/^|\s+/).map(function(n){var i="",r=n.indexOf(".");if(r>=0&&(i=n.slice(r+1),n=n.slice(0,r)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:i}})}nr.prototype=Wc.prototype={constructor:nr,on:function(e,t){var n=this._,i=n1(e+"",n),r,o=-1,s=i.length;if(arguments.length<2){for(;++o<s;)if((r=(e=i[o]).type)&&(r=i1(n[r],e.name)))return r;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<s;)if(r=(e=i[o]).type)n[r]=Tl(n[r],e.name,t);else if(t==null)for(r in n)n[r]=Tl(n[r],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new nr(e)},call:function(e,t){if((r=arguments.length-2)>0)for(var n=new Array(r),i=0,r,o;i<r;++i)n[i]=arguments[i+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],i=0,r=o.length;i<r;++i)o[i].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var i=this._[e],r=0,o=i.length;r<o;++r)i[r].value.apply(t,n)}};function i1(e,t){for(var n=0,i=e.length,r;n<i;++n)if((r=e[n]).name===t)return r.value}function Tl(e,t,n){for(var i=0,r=e.length;i<r;++i)if(e[i].name===t){e[i]=t1,e=e.slice(0,i).concat(e.slice(i+1));break}return n!=null&&e.push({name:t,value:n}),e}var jo="http://www.w3.org/1999/xhtml";const Pl={svg:"http://www.w3.org/2000/svg",xhtml:jo,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Kr(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),Pl.hasOwnProperty(t)?{space:Pl[t],local:e}:e}function r1(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===jo&&t.documentElement.namespaceURI===jo?t.createElement(e):t.createElementNS(n,e)}}function o1(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function $c(e){var t=Kr(e);return(t.local?o1:r1)(t)}function s1(){}function _s(e){return e==null?s1:function(){return this.querySelector(e)}}function l1(e){typeof e!="function"&&(e=_s(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o=t[r],s=o.length,a=i[r]=new Array(s),l,c,u=0;u<s;++u)(l=o[u])&&(c=e.call(l,l.__data__,u,o))&&("__data__"in l&&(c.__data__=l.__data__),a[u]=c);return new Tt(i,this._parents)}function a1(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function c1(){return[]}function Nc(e){return e==null?c1:function(){return this.querySelectorAll(e)}}function u1(e){return function(){return a1(e.apply(this,arguments))}}function h1(e){typeof e=="function"?e=u1(e):e=Nc(e);for(var t=this._groups,n=t.length,i=[],r=[],o=0;o<n;++o)for(var s=t[o],a=s.length,l,c=0;c<a;++c)(l=s[c])&&(i.push(e.call(l,l.__data__,c,s)),r.push(l));return new Tt(i,r)}function Ec(e){return function(){return this.matches(e)}}function Ic(e){return function(t){return t.matches(e)}}var f1=Array.prototype.find;function d1(e){return function(){return f1.call(this.children,e)}}function m1(){return this.firstElementChild}function g1(e){return this.select(e==null?m1:d1(typeof e=="function"?e:Ic(e)))}var p1=Array.prototype.filter;function y1(){return Array.from(this.children)}function x1(e){return function(){return p1.call(this.children,e)}}function b1(e){return this.selectAll(e==null?y1:x1(typeof e=="function"?e:Ic(e)))}function w1(e){typeof e!="function"&&(e=Ec(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o=t[r],s=o.length,a=i[r]=[],l,c=0;c<s;++c)(l=o[c])&&e.call(l,l.__data__,c,o)&&a.push(l);return new Tt(i,this._parents)}function Oc(e){return new Array(e.length)}function v1(){return new Tt(this._enter||this._groups.map(Oc),this._parents)}function vr(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}vr.prototype={constructor:vr,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function S1(e){return function(){return e}}function _1(e,t,n,i,r,o){for(var s=0,a,l=t.length,c=o.length;s<c;++s)(a=t[s])?(a.__data__=o[s],i[s]=a):n[s]=new vr(e,o[s]);for(;s<l;++s)(a=t[s])&&(r[s]=a)}function k1(e,t,n,i,r,o,s){var a,l,c=new Map,u=t.length,h=o.length,f=new Array(u),d;for(a=0;a<u;++a)(l=t[a])&&(f[a]=d=s.call(l,l.__data__,a,t)+"",c.has(d)?r[a]=l:c.set(d,l));for(a=0;a<h;++a)d=s.call(e,o[a],a,o)+"",(l=c.get(d))?(i[a]=l,l.__data__=o[a],c.delete(d)):n[a]=new vr(e,o[a]);for(a=0;a<u;++a)(l=t[a])&&c.get(f[a])===l&&(r[a]=l)}function T1(e){return e.__data__}function P1(e,t){if(!arguments.length)return Array.from(this,T1);var n=t?k1:_1,i=this._parents,r=this._groups;typeof e!="function"&&(e=S1(e));for(var o=r.length,s=new Array(o),a=new Array(o),l=new Array(o),c=0;c<o;++c){var u=i[c],h=r[c],f=h.length,d=A1(e.call(u,u&&u.__data__,c,i)),g=d.length,b=a[c]=new Array(g),O=s[c]=new Array(g),F=l[c]=new Array(f);n(u,h,b,O,F,d,t);for(var D=0,z=0,V,$;D<g;++D)if(V=b[D]){for(D>=z&&(z=D+1);!($=O[z])&&++z<g;);V._next=$||null}}return s=new Tt(s,i),s._enter=a,s._exit=l,s}function A1(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function L1(){return new Tt(this._exit||this._groups.map(Oc),this._parents)}function M1(e,t,n){var i=this.enter(),r=this,o=this.exit();return typeof e=="function"?(i=e(i),i&&(i=i.selection())):i=i.append(e+""),t!=null&&(r=t(r),r&&(r=r.selection())),n==null?o.remove():n(o),i&&r?i.merge(r).order():r}function C1(e){for(var t=e.selection?e.selection():e,n=this._groups,i=t._groups,r=n.length,o=i.length,s=Math.min(r,o),a=new Array(r),l=0;l<s;++l)for(var c=n[l],u=i[l],h=c.length,f=a[l]=new Array(h),d,g=0;g<h;++g)(d=c[g]||u[g])&&(f[g]=d);for(;l<r;++l)a[l]=n[l];return new Tt(a,this._parents)}function W1(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var i=e[t],r=i.length-1,o=i[r],s;--r>=0;)(s=i[r])&&(o&&s.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(s,o),o=s);return this}function $1(e){e||(e=N1);function t(h,f){return h&&f?e(h.__data__,f.__data__):!h-!f}for(var n=this._groups,i=n.length,r=new Array(i),o=0;o<i;++o){for(var s=n[o],a=s.length,l=r[o]=new Array(a),c,u=0;u<a;++u)(c=s[u])&&(l[u]=c);l.sort(t)}return new Tt(r,this._parents).order()}function N1(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function E1(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function I1(){return Array.from(this)}function O1(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],r=0,o=i.length;r<o;++r){var s=i[r];if(s)return s}return null}function V1(){let e=0;for(const t of this)++e;return e}function D1(){return!this.node()}function R1(e){for(var t=this._groups,n=0,i=t.length;n<i;++n)for(var r=t[n],o=0,s=r.length,a;o<s;++o)(a=r[o])&&e.call(a,a.__data__,o,r);return this}function F1(e){return function(){this.removeAttribute(e)}}function j1(e){return function(){this.removeAttributeNS(e.space,e.local)}}function z1(e,t){return function(){this.setAttribute(e,t)}}function H1(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function B1(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function X1(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Y1(e,t){var n=Kr(e);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((t==null?n.local?j1:F1:typeof t=="function"?n.local?X1:B1:n.local?H1:z1)(n,t))}function Vc(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function q1(e){return function(){this.style.removeProperty(e)}}function G1(e,t,n){return function(){this.style.setProperty(e,t,n)}}function U1(e,t,n){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(e):this.style.setProperty(e,i,n)}}function K1(e,t,n){return arguments.length>1?this.each((t==null?q1:typeof t=="function"?U1:G1)(e,t,n??"")):Xn(this.node(),e)}function Xn(e,t){return e.style.getPropertyValue(t)||Vc(e).getComputedStyle(e,null).getPropertyValue(t)}function J1(e){return function(){delete this[e]}}function Z1(e,t){return function(){this[e]=t}}function Q1(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function e0(e,t){return arguments.length>1?this.each((t==null?J1:typeof t=="function"?Q1:Z1)(e,t)):this.node()[e]}function Dc(e){return e.trim().split(/^|\s+/)}function ks(e){return e.classList||new Rc(e)}function Rc(e){this._node=e,this._names=Dc(e.getAttribute("class")||"")}Rc.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Fc(e,t){for(var n=ks(e),i=-1,r=t.length;++i<r;)n.add(t[i])}function jc(e,t){for(var n=ks(e),i=-1,r=t.length;++i<r;)n.remove(t[i])}function t0(e){return function(){Fc(this,e)}}function n0(e){return function(){jc(this,e)}}function i0(e,t){return function(){(t.apply(this,arguments)?Fc:jc)(this,e)}}function r0(e,t){var n=Dc(e+"");if(arguments.length<2){for(var i=ks(this.node()),r=-1,o=n.length;++r<o;)if(!i.contains(n[r]))return!1;return!0}return this.each((typeof t=="function"?i0:t?t0:n0)(n,t))}function o0(){this.textContent=""}function s0(e){return function(){this.textContent=e}}function l0(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function a0(e){return arguments.length?this.each(e==null?o0:(typeof e=="function"?l0:s0)(e)):this.node().textContent}function c0(){this.innerHTML=""}function u0(e){return function(){this.innerHTML=e}}function h0(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function f0(e){return arguments.length?this.each(e==null?c0:(typeof e=="function"?h0:u0)(e)):this.node().innerHTML}function d0(){this.nextSibling&&this.parentNode.appendChild(this)}function m0(){return this.each(d0)}function g0(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function p0(){return this.each(g0)}function y0(e){var t=typeof e=="function"?e:$c(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function x0(){return null}function b0(e,t){var n=typeof e=="function"?e:$c(e),i=t==null?x0:typeof t=="function"?t:_s(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})}function w0(){var e=this.parentNode;e&&e.removeChild(this)}function v0(){return this.each(w0)}function S0(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function _0(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function k0(e){return this.select(e?_0:S0)}function T0(e){return arguments.length?this.property("__data__",e):this.node().__data__}function P0(e){return function(t){e.call(this,t,this.__data__)}}function A0(e){return e.trim().split(/^|\s+/).map(function(t){var n="",i=t.indexOf(".");return i>=0&&(n=t.slice(i+1),t=t.slice(0,i)),{type:t,name:n}})}function L0(e){return function(){var t=this.__on;if(t){for(var n=0,i=-1,r=t.length,o;n<r;++n)o=t[n],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++i]=o;++i?t.length=i:delete this.__on}}}function M0(e,t,n){return function(){var i=this.__on,r,o=P0(t);if(i){for(var s=0,a=i.length;s<a;++s)if((r=i[s]).type===e.type&&r.name===e.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=o,r.options=n),r.value=t;return}}this.addEventListener(e.type,o,n),r={type:e.type,name:e.name,value:t,listener:o,options:n},i?i.push(r):this.__on=[r]}}function C0(e,t,n){var i=A0(e+""),r,o=i.length,s;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,c=a.length,u;l<c;++l)for(r=0,u=a[l];r<o;++r)if((s=i[r]).type===u.type&&s.name===u.name)return u.value}return}for(a=t?M0:L0,r=0;r<o;++r)this.each(a(i[r],t,n));return this}function zc(e,t,n){var i=Vc(e),r=i.CustomEvent;typeof r=="function"?r=new r(t,n):(r=i.document.createEvent("Event"),n?(r.initEvent(t,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(t,!1,!1)),e.dispatchEvent(r)}function W0(e,t){return function(){return zc(this,e,t)}}function $0(e,t){return function(){return zc(this,e,t.apply(this,arguments))}}function N0(e,t){return this.each((typeof t=="function"?$0:W0)(e,t))}function*E0(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],r=0,o=i.length,s;r<o;++r)(s=i[r])&&(yield s)}var I0=[null];function Tt(e,t){this._groups=e,this._parents=t}function Wi(){return new Tt([[document.documentElement]],I0)}function O0(){return this}Tt.prototype=Wi.prototype={constructor:Tt,select:l1,selectAll:h1,selectChild:g1,selectChildren:b1,filter:w1,data:P1,enter:v1,exit:L1,join:M1,merge:C1,selection:O0,order:W1,sort:$1,call:E1,nodes:I1,node:O1,size:V1,empty:D1,each:R1,attr:Y1,style:K1,property:e0,classed:r0,text:a0,html:f0,raise:m0,lower:p0,append:y0,insert:b0,remove:v0,clone:k0,datum:T0,on:C0,dispatch:N0,[Symbol.iterator]:E0};function $i(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Jr(e,t){var n=Object.create(e.prototype);for(var i in t)n[i]=t[i];return n}function kn(){}var vi=.7,Sr=1/vi,jn="\\s*([+-]?\\d+)\\s*",Si="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Nt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",V0=/^#([0-9a-f]{3,8})$/,D0=new RegExp(`^rgb\\(${jn},${jn},${jn}\\)$`),R0=new RegExp(`^rgb\\(${Nt},${Nt},${Nt}\\)$`),F0=new RegExp(`^rgba\\(${jn},${jn},${jn},${Si}\\)$`),j0=new RegExp(`^rgba\\(${Nt},${Nt},${Nt},${Si}\\)$`),z0=new RegExp(`^hsl\\(${Si},${Nt},${Nt}\\)$`),H0=new RegExp(`^hsla\\(${Si},${Nt},${Nt},${Si}\\)$`),Al={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};$i(kn,wn,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Ll,formatHex:Ll,formatHex8:B0,formatHsl:X0,formatRgb:Ml,toString:Ml});function Ll(){return this.rgb().formatHex()}function B0(){return this.rgb().formatHex8()}function X0(){return Bc(this).formatHsl()}function Ml(){return this.rgb().formatRgb()}function wn(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=V0.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?Cl(t):n===3?new Ze(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?ji(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?ji(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=D0.exec(e))?new Ze(t[1],t[2],t[3],1):(t=R0.exec(e))?new Ze(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=F0.exec(e))?ji(t[1],t[2],t[3],t[4]):(t=j0.exec(e))?ji(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=z0.exec(e))?Nl(t[1],t[2]/100,t[3]/100,1):(t=H0.exec(e))?Nl(t[1],t[2]/100,t[3]/100,t[4]):Al.hasOwnProperty(e)?Cl(Al[e]):e==="transparent"?new Ze(NaN,NaN,NaN,0):null}function Cl(e){return new Ze(e>>16&255,e>>8&255,e&255,1)}function ji(e,t,n,i){return i<=0&&(e=t=n=NaN),new Ze(e,t,n,i)}function Hc(e){return e instanceof kn||(e=wn(e)),e?(e=e.rgb(),new Ze(e.r,e.g,e.b,e.opacity)):new Ze}function zo(e,t,n,i){return arguments.length===1?Hc(e):new Ze(e,t,n,i??1)}function Ze(e,t,n,i){this.r=+e,this.g=+t,this.b=+n,this.opacity=+i}$i(Ze,zo,Jr(kn,{brighter(e){return e=e==null?Sr:Math.pow(Sr,e),new Ze(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?vi:Math.pow(vi,e),new Ze(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Ze(bn(this.r),bn(this.g),bn(this.b),_r(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Wl,formatHex:Wl,formatHex8:Y0,formatRgb:$l,toString:$l}));function Wl(){return`#${yn(this.r)}${yn(this.g)}${yn(this.b)}`}function Y0(){return`#${yn(this.r)}${yn(this.g)}${yn(this.b)}${yn((isNaN(this.opacity)?1:this.opacity)*255)}`}function $l(){const e=_r(this.opacity);return`${e===1?"rgb(":"rgba("}${bn(this.r)}, ${bn(this.g)}, ${bn(this.b)}${e===1?")":`, ${e})`}`}function _r(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function bn(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function yn(e){return e=bn(e),(e<16?"0":"")+e.toString(16)}function Nl(e,t,n,i){return i<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new St(e,t,n,i)}function Bc(e){if(e instanceof St)return new St(e.h,e.s,e.l,e.opacity);if(e instanceof kn||(e=wn(e)),!e)return new St;if(e instanceof St)return e;e=e.rgb();var t=e.r/255,n=e.g/255,i=e.b/255,r=Math.min(t,n,i),o=Math.max(t,n,i),s=NaN,a=o-r,l=(o+r)/2;return a?(t===o?s=(n-i)/a+(n<i)*6:n===o?s=(i-t)/a+2:s=(t-n)/a+4,a/=l<.5?o+r:2-o-r,s*=60):a=l>0&&l<1?0:s,new St(s,a,l,e.opacity)}function q0(e,t,n,i){return arguments.length===1?Bc(e):new St(e,t,n,i??1)}function St(e,t,n,i){this.h=+e,this.s=+t,this.l=+n,this.opacity=+i}$i(St,q0,Jr(kn,{brighter(e){return e=e==null?Sr:Math.pow(Sr,e),new St(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?vi:Math.pow(vi,e),new St(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,i=n+(n<.5?n:1-n)*t,r=2*n-i;return new Ze(fo(e>=240?e-240:e+120,r,i),fo(e,r,i),fo(e<120?e+240:e-120,r,i),this.opacity)},clamp(){return new St(El(this.h),zi(this.s),zi(this.l),_r(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=_r(this.opacity);return`${e===1?"hsl(":"hsla("}${El(this.h)}, ${zi(this.s)*100}%, ${zi(this.l)*100}%${e===1?")":`, ${e})`}`}}));function El(e){return e=(e||0)%360,e<0?e+360:e}function zi(e){return Math.max(0,Math.min(1,e||0))}function fo(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const G0=Math.PI/180,U0=180/Math.PI,kr=18,Xc=.96422,Yc=1,qc=.82521,Gc=4/29,zn=6/29,Uc=3*zn*zn,K0=zn*zn*zn;function Kc(e){if(e instanceof Et)return new Et(e.l,e.a,e.b,e.opacity);if(e instanceof qt)return Zc(e);e instanceof Ze||(e=Hc(e));var t=yo(e.r),n=yo(e.g),i=yo(e.b),r=mo((.2225045*t+.7168786*n+.0606169*i)/Yc),o,s;return t===n&&n===i?o=s=r:(o=mo((.4360747*t+.3850649*n+.1430804*i)/Xc),s=mo((.0139322*t+.0971045*n+.7141733*i)/qc)),new Et(116*r-16,500*(o-r),200*(r-s),e.opacity)}function Ho(e,t,n,i){return arguments.length===1?Kc(e):new Et(e,t,n,i??1)}function Et(e,t,n,i){this.l=+e,this.a=+t,this.b=+n,this.opacity=+i}$i(Et,Ho,Jr(kn,{brighter(e){return new Et(this.l+kr*(e??1),this.a,this.b,this.opacity)},darker(e){return new Et(this.l-kr*(e??1),this.a,this.b,this.opacity)},rgb(){var e=(this.l+16)/116,t=isNaN(this.a)?e:e+this.a/500,n=isNaN(this.b)?e:e-this.b/200;return t=Xc*go(t),e=Yc*go(e),n=qc*go(n),new Ze(po(3.1338561*t-1.6168667*e-.4906146*n),po(-.9787684*t+1.9161415*e+.033454*n),po(.0719453*t-.2289914*e+1.4052427*n),this.opacity)}}));function mo(e){return e>K0?Math.pow(e,1/3):e/Uc+Gc}function go(e){return e>zn?e*e*e:Uc*(e-Gc)}function po(e){return 255*(e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055)}function yo(e){return(e/=255)<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function J0(e){if(e instanceof qt)return new qt(e.h,e.c,e.l,e.opacity);if(e instanceof Et||(e=Kc(e)),e.a===0&&e.b===0)return new qt(NaN,0<e.l&&e.l<100?0:NaN,e.l,e.opacity);var t=Math.atan2(e.b,e.a)*U0;return new qt(t<0?t+360:t,Math.sqrt(e.a*e.a+e.b*e.b),e.l,e.opacity)}function Jc(e,t,n,i){return arguments.length===1?J0(e):new qt(e,t,n,i??1)}function qt(e,t,n,i){this.h=+e,this.c=+t,this.l=+n,this.opacity=+i}function Zc(e){if(isNaN(e.h))return new Et(e.l,0,0,e.opacity);var t=e.h*G0;return new Et(e.l,Math.cos(t)*e.c,Math.sin(t)*e.c,e.opacity)}$i(qt,Jc,Jr(kn,{brighter(e){return new qt(this.h,this.c,this.l+kr*(e??1),this.opacity)},darker(e){return new qt(this.h,this.c,this.l-kr*(e??1),this.opacity)},rgb(){return Zc(this).rgb()}}));const Ts=e=>()=>e;function Z0(e,t){return function(n){return e+n*t}}function Q0(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(i){return Math.pow(e+i*t,n)}}function em(e){return(e=+e)==1?Nn:function(t,n){return n-t?Q0(t,n,e):Ts(isNaN(t)?n:t)}}function Nn(e,t){var n=t-e;return n?Z0(e,n):Ts(isNaN(e)?t:e)}const Tr=(function e(t){var n=em(t);function i(r,o){var s=n((r=zo(r)).r,(o=zo(o)).r),a=n(r.g,o.g),l=n(r.b,o.b),c=Nn(r.opacity,o.opacity);return function(u){return r.r=s(u),r.g=a(u),r.b=l(u),r.opacity=c(u),r+""}}return i.gamma=e,i})(1);function tm(e,t){t||(t=[]);var n=e?Math.min(t.length,e.length):0,i=t.slice(),r;return function(o){for(r=0;r<n;++r)i[r]=e[r]*(1-o)+t[r]*o;return i}}function nm(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function im(e,t){var n=t?t.length:0,i=e?Math.min(n,e.length):0,r=new Array(i),o=new Array(n),s;for(s=0;s<i;++s)r[s]=Ps(e[s],t[s]);for(;s<n;++s)o[s]=t[s];return function(a){for(s=0;s<i;++s)o[s]=r[s](a);return o}}function rm(e,t){var n=new Date;return e=+e,t=+t,function(i){return n.setTime(e*(1-i)+t*i),n}}function wt(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}function om(e,t){var n={},i={},r;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(r in t)r in e?n[r]=Ps(e[r],t[r]):i[r]=t[r];return function(o){for(r in n)i[r]=n[r](o);return i}}var Bo=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,xo=new RegExp(Bo.source,"g");function sm(e){return function(){return e}}function lm(e){return function(t){return e(t)+""}}function Qc(e,t){var n=Bo.lastIndex=xo.lastIndex=0,i,r,o,s=-1,a=[],l=[];for(e=e+"",t=t+"";(i=Bo.exec(e))&&(r=xo.exec(t));)(o=r.index)>n&&(o=t.slice(n,o),a[s]?a[s]+=o:a[++s]=o),(i=i[0])===(r=r[0])?a[s]?a[s]+=r:a[++s]=r:(a[++s]=null,l.push({i:s,x:wt(i,r)})),n=xo.lastIndex;return n<t.length&&(o=t.slice(n),a[s]?a[s]+=o:a[++s]=o),a.length<2?l[0]?lm(l[0].x):sm(t):(t=l.length,function(c){for(var u=0,h;u<t;++u)a[(h=l[u]).i]=h.x(c);return a.join("")})}function Ps(e,t){var n=typeof t,i;return t==null||n==="boolean"?Ts(t):(n==="number"?wt:n==="string"?(i=wn(t))?(t=i,Tr):Qc:t instanceof wn?Tr:t instanceof Date?rm:nm(t)?tm:Array.isArray(t)?im:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?om:wt)(e,t)}function am(e,t){return e=+e,t=+t,function(n){return Math.round(e*(1-n)+t*n)}}var Il=180/Math.PI,Xo={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function eu(e,t,n,i,r,o){var s,a,l;return(s=Math.sqrt(e*e+t*t))&&(e/=s,t/=s),(l=e*n+t*i)&&(n-=e*l,i-=t*l),(a=Math.sqrt(n*n+i*i))&&(n/=a,i/=a,l/=a),e*i<t*n&&(e=-e,t=-t,l=-l,s=-s),{translateX:r,translateY:o,rotate:Math.atan2(t,e)*Il,skewX:Math.atan(l)*Il,scaleX:s,scaleY:a}}var Hi;function cm(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Xo:eu(t.a,t.b,t.c,t.d,t.e,t.f)}function um(e){return e==null||(Hi||(Hi=document.createElementNS("http://www.w3.org/2000/svg","g")),Hi.setAttribute("transform",e),!(e=Hi.transform.baseVal.consolidate()))?Xo:(e=e.matrix,eu(e.a,e.b,e.c,e.d,e.e,e.f))}function tu(e,t,n,i){function r(c){return c.length?c.pop()+" ":""}function o(c,u,h,f,d,g){if(c!==h||u!==f){var b=d.push("translate(",null,t,null,n);g.push({i:b-4,x:wt(c,h)},{i:b-2,x:wt(u,f)})}else(h||f)&&d.push("translate("+h+t+f+n)}function s(c,u,h,f){c!==u?(c-u>180?u+=360:u-c>180&&(c+=360),f.push({i:h.push(r(h)+"rotate(",null,i)-2,x:wt(c,u)})):u&&h.push(r(h)+"rotate("+u+i)}function a(c,u,h,f){c!==u?f.push({i:h.push(r(h)+"skewX(",null,i)-2,x:wt(c,u)}):u&&h.push(r(h)+"skewX("+u+i)}function l(c,u,h,f,d,g){if(c!==h||u!==f){var b=d.push(r(d)+"scale(",null,",",null,")");g.push({i:b-4,x:wt(c,h)},{i:b-2,x:wt(u,f)})}else(h!==1||f!==1)&&d.push(r(d)+"scale("+h+","+f+")")}return function(c,u){var h=[],f=[];return c=e(c),u=e(u),o(c.translateX,c.translateY,u.translateX,u.translateY,h,f),s(c.rotate,u.rotate,h,f),a(c.skewX,u.skewX,h,f),l(c.scaleX,c.scaleY,u.scaleX,u.scaleY,h,f),c=u=null,function(d){for(var g=-1,b=f.length,O;++g<b;)h[(O=f[g]).i]=O.x(d);return h.join("")}}}var hm=tu(cm,"px, ","px)","deg)"),fm=tu(um,", ",")",")");function Yo(e,t){var n=Nn((e=Ho(e)).l,(t=Ho(t)).l),i=Nn(e.a,t.a),r=Nn(e.b,t.b),o=Nn(e.opacity,t.opacity);return function(s){return e.l=n(s),e.a=i(s),e.b=r(s),e.opacity=o(s),e+""}}var Yn=0,ii=0,ei=0,nu=1e3,Pr,ri,Ar=0,vn=0,Zr=0,_i=typeof performance=="object"&&performance.now?performance:Date,iu=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function As(){return vn||(iu(dm),vn=_i.now()+Zr)}function dm(){vn=0}function Lr(){this._call=this._time=this._next=null}Lr.prototype=ru.prototype={constructor:Lr,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?As():+n)+(t==null?0:+t),!this._next&&ri!==this&&(ri?ri._next=this:Pr=this,ri=this),this._call=e,this._time=n,qo()},stop:function(){this._call&&(this._call=null,this._time=1/0,qo())}};function ru(e,t,n){var i=new Lr;return i.restart(e,t,n),i}function mm(){As(),++Yn;for(var e=Pr,t;e;)(t=vn-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Yn}function Ol(){vn=(Ar=_i.now())+Zr,Yn=ii=0;try{mm()}finally{Yn=0,pm(),vn=0}}function gm(){var e=_i.now(),t=e-Ar;t>nu&&(Zr-=t,Ar=e)}function pm(){for(var e,t=Pr,n,i=1/0;t;)t._call?(i>t._time&&(i=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:Pr=n);ri=e,qo(i)}function qo(e){if(!Yn){ii&&(ii=clearTimeout(ii));var t=e-vn;t>24?(e<1/0&&(ii=setTimeout(Ol,e-_i.now()-Zr)),ei&&(ei=clearInterval(ei))):(ei||(Ar=_i.now(),ei=setInterval(gm,nu)),Yn=1,iu(Ol))}}function Vl(e,t,n){var i=new Lr;return t=t==null?0:+t,i.restart(r=>{i.stop(),e(r+t)},t,n),i}var ym=Wc("start","end","cancel","interrupt"),xm=[],ou=0,Dl=1,Go=2,ir=3,Rl=4,Uo=5,rr=6;function Qr(e,t,n,i,r,o){var s=e.__transition;if(!s)e.__transition={};else if(n in s)return;bm(e,n,{name:t,index:i,group:r,on:ym,tween:xm,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:ou})}function Ls(e,t){var n=Pt(e,t);if(n.state>ou)throw new Error("too late; already scheduled");return n}function Vt(e,t){var n=Pt(e,t);if(n.state>ir)throw new Error("too late; already running");return n}function Pt(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function bm(e,t,n){var i=e.__transition,r;i[t]=n,n.timer=ru(o,0,n.time);function o(c){n.state=Dl,n.timer.restart(s,n.delay,n.time),n.delay<=c&&s(c-n.delay)}function s(c){var u,h,f,d;if(n.state!==Dl)return l();for(u in i)if(d=i[u],d.name===n.name){if(d.state===ir)return Vl(s);d.state===Rl?(d.state=rr,d.timer.stop(),d.on.call("interrupt",e,e.__data__,d.index,d.group),delete i[u]):+u<t&&(d.state=rr,d.timer.stop(),d.on.call("cancel",e,e.__data__,d.index,d.group),delete i[u])}if(Vl(function(){n.state===ir&&(n.state=Rl,n.timer.restart(a,n.delay,n.time),a(c))}),n.state=Go,n.on.call("start",e,e.__data__,n.index,n.group),n.state===Go){for(n.state=ir,r=new Array(f=n.tween.length),u=0,h=-1;u<f;++u)(d=n.tween[u].value.call(e,e.__data__,n.index,n.group))&&(r[++h]=d);r.length=h+1}}function a(c){for(var u=c<n.duration?n.ease.call(null,c/n.duration):(n.timer.restart(l),n.state=Uo,1),h=-1,f=r.length;++h<f;)r[h].call(e,u);n.state===Uo&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){n.state=rr,n.timer.stop(),delete i[t];for(var c in i)return;delete e.__transition}}function wm(e,t){var n=e.__transition,i,r,o=!0,s;if(n){t=t==null?null:t+"";for(s in n){if((i=n[s]).name!==t){o=!1;continue}r=i.state>Go&&i.state<Uo,i.state=rr,i.timer.stop(),i.on.call(r?"interrupt":"cancel",e,e.__data__,i.index,i.group),delete n[s]}o&&delete e.__transition}}function vm(e){return this.each(function(){wm(this,e)})}function Sm(e,t){var n,i;return function(){var r=Vt(this,e),o=r.tween;if(o!==n){i=n=o;for(var s=0,a=i.length;s<a;++s)if(i[s].name===t){i=i.slice(),i.splice(s,1);break}}r.tween=i}}function _m(e,t,n){var i,r;if(typeof n!="function")throw new Error;return function(){var o=Vt(this,e),s=o.tween;if(s!==i){r=(i=s).slice();for(var a={name:t,value:n},l=0,c=r.length;l<c;++l)if(r[l].name===t){r[l]=a;break}l===c&&r.push(a)}o.tween=r}}function km(e,t){var n=this._id;if(e+="",arguments.length<2){for(var i=Pt(this.node(),n).tween,r=0,o=i.length,s;r<o;++r)if((s=i[r]).name===e)return s.value;return null}return this.each((t==null?Sm:_m)(n,e,t))}function Ms(e,t,n){var i=e._id;return e.each(function(){var r=Vt(this,i);(r.value||(r.value={}))[t]=n.apply(this,arguments)}),function(r){return Pt(r,i).value[t]}}function su(e,t){var n;return(typeof t=="number"?wt:t instanceof wn?Tr:(n=wn(t))?(t=n,Tr):Qc)(e,t)}function Tm(e){return function(){this.removeAttribute(e)}}function Pm(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Am(e,t,n){var i,r=n+"",o;return function(){var s=this.getAttribute(e);return s===r?null:s===i?o:o=t(i=s,n)}}function Lm(e,t,n){var i,r=n+"",o;return function(){var s=this.getAttributeNS(e.space,e.local);return s===r?null:s===i?o:o=t(i=s,n)}}function Mm(e,t,n){var i,r,o;return function(){var s,a=n(this),l;return a==null?void this.removeAttribute(e):(s=this.getAttribute(e),l=a+"",s===l?null:s===i&&l===r?o:(r=l,o=t(i=s,a)))}}function Cm(e,t,n){var i,r,o;return function(){var s,a=n(this),l;return a==null?void this.removeAttributeNS(e.space,e.local):(s=this.getAttributeNS(e.space,e.local),l=a+"",s===l?null:s===i&&l===r?o:(r=l,o=t(i=s,a)))}}function Wm(e,t){var n=Kr(e),i=n==="transform"?fm:su;return this.attrTween(e,typeof t=="function"?(n.local?Cm:Mm)(n,i,Ms(this,"attr."+e,t)):t==null?(n.local?Pm:Tm)(n):(n.local?Lm:Am)(n,i,t))}function $m(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function Nm(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Em(e,t){var n,i;function r(){var o=t.apply(this,arguments);return o!==i&&(n=(i=o)&&Nm(e,o)),n}return r._value=t,r}function Im(e,t){var n,i;function r(){var o=t.apply(this,arguments);return o!==i&&(n=(i=o)&&$m(e,o)),n}return r._value=t,r}function Om(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var i=Kr(e);return this.tween(n,(i.local?Em:Im)(i,t))}function Vm(e,t){return function(){Ls(this,e).delay=+t.apply(this,arguments)}}function Dm(e,t){return t=+t,function(){Ls(this,e).delay=t}}function Rm(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Vm:Dm)(t,e)):Pt(this.node(),t).delay}function Fm(e,t){return function(){Vt(this,e).duration=+t.apply(this,arguments)}}function jm(e,t){return t=+t,function(){Vt(this,e).duration=t}}function zm(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Fm:jm)(t,e)):Pt(this.node(),t).duration}function Hm(e,t){if(typeof t!="function")throw new Error;return function(){Vt(this,e).ease=t}}function Bm(e){var t=this._id;return arguments.length?this.each(Hm(t,e)):Pt(this.node(),t).ease}function Xm(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;Vt(this,e).ease=n}}function Ym(e){if(typeof e!="function")throw new Error;return this.each(Xm(this._id,e))}function qm(e){typeof e!="function"&&(e=Ec(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o=t[r],s=o.length,a=i[r]=[],l,c=0;c<s;++c)(l=o[c])&&e.call(l,l.__data__,c,o)&&a.push(l);return new Zt(i,this._parents,this._name,this._id)}function Gm(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,i=t.length,r=n.length,o=Math.min(i,r),s=new Array(i),a=0;a<o;++a)for(var l=t[a],c=n[a],u=l.length,h=s[a]=new Array(u),f,d=0;d<u;++d)(f=l[d]||c[d])&&(h[d]=f);for(;a<i;++a)s[a]=t[a];return new Zt(s,this._parents,this._name,this._id)}function Um(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function Km(e,t,n){var i,r,o=Um(t)?Ls:Vt;return function(){var s=o(this,e),a=s.on;a!==i&&(r=(i=a).copy()).on(t,n),s.on=r}}function Jm(e,t){var n=this._id;return arguments.length<2?Pt(this.node(),n).on.on(e):this.each(Km(n,e,t))}function Zm(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function Qm(){return this.on("end.remove",Zm(this._id))}function e2(e){var t=this._name,n=this._id;typeof e!="function"&&(e=_s(e));for(var i=this._groups,r=i.length,o=new Array(r),s=0;s<r;++s)for(var a=i[s],l=a.length,c=o[s]=new Array(l),u,h,f=0;f<l;++f)(u=a[f])&&(h=e.call(u,u.__data__,f,a))&&("__data__"in u&&(h.__data__=u.__data__),c[f]=h,Qr(c[f],t,n,f,c,Pt(u,n)));return new Zt(o,this._parents,t,n)}function t2(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Nc(e));for(var i=this._groups,r=i.length,o=[],s=[],a=0;a<r;++a)for(var l=i[a],c=l.length,u,h=0;h<c;++h)if(u=l[h]){for(var f=e.call(u,u.__data__,h,l),d,g=Pt(u,n),b=0,O=f.length;b<O;++b)(d=f[b])&&Qr(d,t,n,b,f,g);o.push(f),s.push(u)}return new Zt(o,s,t,n)}var n2=Wi.prototype.constructor;function i2(){return new n2(this._groups,this._parents)}function r2(e,t){var n,i,r;return function(){var o=Xn(this,e),s=(this.style.removeProperty(e),Xn(this,e));return o===s?null:o===n&&s===i?r:r=t(n=o,i=s)}}function lu(e){return function(){this.style.removeProperty(e)}}function o2(e,t,n){var i,r=n+"",o;return function(){var s=Xn(this,e);return s===r?null:s===i?o:o=t(i=s,n)}}function s2(e,t,n){var i,r,o;return function(){var s=Xn(this,e),a=n(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(e),Xn(this,e))),s===l?null:s===i&&l===r?o:(r=l,o=t(i=s,a))}}function l2(e,t){var n,i,r,o="style."+t,s="end."+o,a;return function(){var l=Vt(this,e),c=l.on,u=l.value[o]==null?a||(a=lu(t)):void 0;(c!==n||r!==u)&&(i=(n=c).copy()).on(s,r=u),l.on=i}}function a2(e,t,n){var i=(e+="")=="transform"?hm:su;return t==null?this.styleTween(e,r2(e,i)).on("end.style."+e,lu(e)):typeof t=="function"?this.styleTween(e,s2(e,i,Ms(this,"style."+e,t))).each(l2(this._id,e)):this.styleTween(e,o2(e,i,t),n).on("end.style."+e,null)}function c2(e,t,n){return function(i){this.style.setProperty(e,t.call(this,i),n)}}function u2(e,t,n){var i,r;function o(){var s=t.apply(this,arguments);return s!==r&&(i=(r=s)&&c2(e,s,n)),i}return o._value=t,o}function h2(e,t,n){var i="style."+(e+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;return this.tween(i,u2(e,t,n??""))}function f2(e){return function(){this.textContent=e}}function d2(e){return function(){var t=e(this);this.textContent=t??""}}function m2(e){return this.tween("text",typeof e=="function"?d2(Ms(this,"text",e)):f2(e==null?"":e+""))}function g2(e){return function(t){this.textContent=e.call(this,t)}}function p2(e){var t,n;function i(){var r=e.apply(this,arguments);return r!==n&&(t=(n=r)&&g2(r)),t}return i._value=e,i}function y2(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,p2(e))}function x2(){for(var e=this._name,t=this._id,n=au(),i=this._groups,r=i.length,o=0;o<r;++o)for(var s=i[o],a=s.length,l,c=0;c<a;++c)if(l=s[c]){var u=Pt(l,t);Qr(l,e,n,c,s,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Zt(i,this._parents,e,n)}function b2(){var e,t,n=this,i=n._id,r=n.size();return new Promise(function(o,s){var a={value:s},l={value:function(){--r===0&&o()}};n.each(function(){var c=Vt(this,i),u=c.on;u!==e&&(t=(e=u).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(l)),c.on=t}),r===0&&o()})}var w2=0;function Zt(e,t,n,i){this._groups=e,this._parents=t,this._name=n,this._id=i}function au(){return++w2}var Ft=Wi.prototype;Zt.prototype={constructor:Zt,select:e2,selectAll:t2,selectChild:Ft.selectChild,selectChildren:Ft.selectChildren,filter:qm,merge:Gm,selection:i2,transition:x2,call:Ft.call,nodes:Ft.nodes,node:Ft.node,size:Ft.size,empty:Ft.empty,each:Ft.each,on:Jm,attr:Wm,attrTween:Om,style:a2,styleTween:h2,text:m2,textTween:y2,remove:Qm,tween:km,delay:Rm,duration:zm,ease:Bm,easeVarying:Ym,end:b2,[Symbol.iterator]:Ft[Symbol.iterator]};function v2(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var S2={time:null,delay:0,duration:250,ease:v2};function _2(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function k2(e){var t,n;e instanceof Zt?(t=e._id,e=e._name):(t=au(),(n=S2).time=As(),e=e==null?null:e+"");for(var i=this._groups,r=i.length,o=0;o<r;++o)for(var s=i[o],a=s.length,l,c=0;c<a;++c)(l=s[c])&&Qr(l,e,t,c,s,n||_2(l,t));return new Zt(i,this._parents,e,t)}Wi.prototype.interrupt=vm;Wi.prototype.transition=k2;function T2(e){return Math.abs(e=Math.round(e))>=1e21?e.toLocaleString("en").replace(/,/g,""):e.toString(10)}function Mr(e,t){if((n=(e=t?e.toExponential(t-1):e.toExponential()).indexOf("e"))<0)return null;var n,i=e.slice(0,n);return[i.length>1?i[0]+i.slice(2):i,+e.slice(n+1)]}function qn(e){return e=Mr(Math.abs(e)),e?e[1]:NaN}function P2(e,t){return function(n,i){for(var r=n.length,o=[],s=0,a=e[0],l=0;r>0&&a>0&&(l+a+1>i&&(a=Math.max(1,i-l)),o.push(n.substring(r-=a,r+a)),!((l+=a+1)>i));)a=e[s=(s+1)%e.length];return o.reverse().join(t)}}function A2(e){return function(t){return t.replace(/[0-9]/g,function(n){return e[+n]})}}var L2=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function Cr(e){if(!(t=L2.exec(e)))throw new Error("invalid format: "+e);var t;return new Cs({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}Cr.prototype=Cs.prototype;function Cs(e){this.fill=e.fill===void 0?" ":e.fill+"",this.align=e.align===void 0?">":e.align+"",this.sign=e.sign===void 0?"-":e.sign+"",this.symbol=e.symbol===void 0?"":e.symbol+"",this.zero=!!e.zero,this.width=e.width===void 0?void 0:+e.width,this.comma=!!e.comma,this.precision=e.precision===void 0?void 0:+e.precision,this.trim=!!e.trim,this.type=e.type===void 0?"":e.type+""}Cs.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function M2(e){e:for(var t=e.length,n=1,i=-1,r;n<t;++n)switch(e[n]){case".":i=r=n;break;case"0":i===0&&(i=n),r=n;break;default:if(!+e[n])break e;i>0&&(i=0);break}return i>0?e.slice(0,i)+e.slice(r+1):e}var cu;function C2(e,t){var n=Mr(e,t);if(!n)return e+"";var i=n[0],r=n[1],o=r-(cu=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,s=i.length;return o===s?i:o>s?i+new Array(o-s+1).join("0"):o>0?i.slice(0,o)+"."+i.slice(o):"0."+new Array(1-o).join("0")+Mr(e,Math.max(0,t+o-1))[0]}function Fl(e,t){var n=Mr(e,t);if(!n)return e+"";var i=n[0],r=n[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}const jl={"%":(e,t)=>(e*100).toFixed(t),b:e=>Math.round(e).toString(2),c:e=>e+"",d:T2,e:(e,t)=>e.toExponential(t),f:(e,t)=>e.toFixed(t),g:(e,t)=>e.toPrecision(t),o:e=>Math.round(e).toString(8),p:(e,t)=>Fl(e*100,t),r:Fl,s:C2,X:e=>Math.round(e).toString(16).toUpperCase(),x:e=>Math.round(e).toString(16)};function zl(e){return e}var Hl=Array.prototype.map,Bl=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function W2(e){var t=e.grouping===void 0||e.thousands===void 0?zl:P2(Hl.call(e.grouping,Number),e.thousands+""),n=e.currency===void 0?"":e.currency[0]+"",i=e.currency===void 0?"":e.currency[1]+"",r=e.decimal===void 0?".":e.decimal+"",o=e.numerals===void 0?zl:A2(Hl.call(e.numerals,String)),s=e.percent===void 0?"%":e.percent+"",a=e.minus===void 0?"−":e.minus+"",l=e.nan===void 0?"NaN":e.nan+"";function c(h){h=Cr(h);var f=h.fill,d=h.align,g=h.sign,b=h.symbol,O=h.zero,F=h.width,D=h.comma,z=h.precision,V=h.trim,$=h.type;$==="n"?(D=!0,$="g"):jl[$]||(z===void 0&&(z=12),V=!0,$="g"),(O||f==="0"&&d==="=")&&(O=!0,f="0",d="=");var U=b==="$"?n:b==="#"&&/[boxX]/.test($)?"0"+$.toLowerCase():"",W=b==="$"?i:/[%p]/.test($)?s:"",A=jl[$],x=/[defgprs%]/.test($);z=z===void 0?6:/[gprs]/.test($)?Math.max(1,Math.min(21,z)):Math.max(0,Math.min(20,z));function T(v){var H=U,Z=W,B,le,re;if($==="c")Z=A(v)+Z,v="";else{v=+v;var S=v<0||1/v<0;if(v=isNaN(v)?l:A(Math.abs(v),z),V&&(v=M2(v)),S&&+v==0&&g!=="+"&&(S=!1),H=(S?g==="("?g:a:g==="-"||g==="("?"":g)+H,Z=($==="s"?Bl[8+cu/3]:"")+Z+(S&&g==="("?")":""),x){for(B=-1,le=v.length;++B<le;)if(re=v.charCodeAt(B),48>re||re>57){Z=(re===46?r+v.slice(B+1):v.slice(B))+Z,v=v.slice(0,B);break}}}D&&!O&&(v=t(v,1/0));var _=H.length+v.length+Z.length,R=_<F?new Array(F-_+1).join(f):"";switch(D&&O&&(v=t(R+v,R.length?F-Z.length:1/0),R=""),d){case"<":v=H+v+Z+R;break;case"=":v=H+R+v+Z;break;case"^":v=R.slice(0,_=R.length>>1)+H+v+Z+R.slice(_);break;default:v=R+H+v+Z;break}return o(v)}return T.toString=function(){return h+""},T}function u(h,f){var d=c((h=Cr(h),h.type="f",h)),g=Math.max(-8,Math.min(8,Math.floor(qn(f)/3)))*3,b=Math.pow(10,-g),O=Bl[8+g/3];return function(F){return d(b*F)+O}}return{format:c,formatPrefix:u}}var Bi,uu,hu;$2({thousands:",",grouping:[3],currency:["$",""]});function $2(e){return Bi=W2(e),uu=Bi.format,hu=Bi.formatPrefix,Bi}function N2(e){return Math.max(0,-qn(Math.abs(e)))}function E2(e,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(qn(t)/3)))*3-qn(Math.abs(e)))}function I2(e,t){return e=Math.abs(e),t=Math.abs(t)-e,Math.max(0,qn(t)-qn(e))+1}function O2(e,t){switch(arguments.length){case 0:break;case 1:this.range(e);break;default:this.range(t).domain(e);break}return this}function V2(e){return function(){return e}}function D2(e){return+e}var Xl=[0,1];function En(e){return e}function Ko(e,t){return(t-=e=+e)?function(n){return(n-e)/t}:V2(isNaN(t)?NaN:.5)}function R2(e,t){var n;return e>t&&(n=e,e=t,t=n),function(i){return Math.max(e,Math.min(t,i))}}function F2(e,t,n){var i=e[0],r=e[1],o=t[0],s=t[1];return r<i?(i=Ko(r,i),o=n(s,o)):(i=Ko(i,r),o=n(o,s)),function(a){return o(i(a))}}function j2(e,t,n){var i=Math.min(e.length,t.length)-1,r=new Array(i),o=new Array(i),s=-1;for(e[i]<e[0]&&(e=e.slice().reverse(),t=t.slice().reverse());++s<i;)r[s]=Ko(e[s],e[s+1]),o[s]=n(t[s],t[s+1]);return function(a){var l=Ud(e,a,1,i)-1;return o[l](r[l](a))}}function z2(e,t){return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown())}function H2(){var e=Xl,t=Xl,n=Ps,i,r,o,s=En,a,l,c;function u(){var f=Math.min(e.length,t.length);return s!==En&&(s=R2(e[0],e[f-1])),a=f>2?j2:F2,l=c=null,h}function h(f){return f==null||isNaN(f=+f)?o:(l||(l=a(e.map(i),t,n)))(i(s(f)))}return h.invert=function(f){return s(r((c||(c=a(t,e.map(i),wt)))(f)))},h.domain=function(f){return arguments.length?(e=Array.from(f,D2),u()):e.slice()},h.range=function(f){return arguments.length?(t=Array.from(f),u()):t.slice()},h.rangeRound=function(f){return t=Array.from(f),n=am,u()},h.clamp=function(f){return arguments.length?(s=f?!0:En,u()):s!==En},h.interpolate=function(f){return arguments.length?(n=f,u()):n},h.unknown=function(f){return arguments.length?(o=f,h):o},function(f,d){return i=f,r=d,u()}}function B2(){return H2()(En,En)}function X2(e,t,n,i){var r=e1(e,t,n),o;switch(i=Cr(i??",f"),i.type){case"s":{var s=Math.max(Math.abs(e),Math.abs(t));return i.precision==null&&!isNaN(o=E2(r,s))&&(i.precision=o),hu(i,s)}case"":case"e":case"g":case"p":case"r":{i.precision==null&&!isNaN(o=I2(r,Math.max(Math.abs(e),Math.abs(t))))&&(i.precision=o-(i.type==="e"));break}case"f":case"%":{i.precision==null&&!isNaN(o=N2(r))&&(i.precision=o-(i.type==="%")*2);break}}return uu(i)}function Y2(e){var t=e.domain;return e.ticks=function(n){var i=t();return Qd(i[0],i[i.length-1],n??10)},e.tickFormat=function(n,i){var r=t();return X2(r[0],r[r.length-1],n??10,i)},e.nice=function(n){n==null&&(n=10);var i=t(),r=0,o=i.length-1,s=i[r],a=i[o],l,c,u=10;for(a<s&&(c=s,s=a,a=c,c=r,r=o,o=c);u-- >0;){if(c=Fo(s,a,n),c===l)return i[r]=s,i[o]=a,t(i);if(c>0)s=Math.floor(s/c)*c,a=Math.ceil(a/c)*c;else if(c<0)s=Math.ceil(s*c)/c,a=Math.floor(a*c)/c;else break;l=c}return e},e}function fu(){var e=B2();return e.copy=function(){return z2(e,fu())},O2.apply(e,arguments),Y2(e)}function oi(e,t,n){this.k=e,this.x=t,this.y=n}oi.prototype={constructor:oi,scale:function(e){return e===1?this:new oi(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new oi(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};oi.prototype;function Wr({h:e=[15,375],c:t=100,l:n=65,h_start:i=0,direction:r=1,na_value:o="#7f7f7f",title:s}={}){return Object.assign(function(l){let c=l.extent[1]-l.extent[0];return l.map(u=>isNaN(u)?o:Jc(e[0]+i+(e[1]-e[0])*+u/c*r,t,n).toString())},{title:s})}function q2({values:e,na_value:t="#7f7f7f",title:n}={}){let i;return Array.isArray(e)?i=function(r){return r.map(o=>e[+o]??t)}:i=function(r){return r.map(o=>e[o]??t)},Object.assign(i,{title:n})}function $r({low:e="#132B43",high:t="#56B1F7",limits:n=[null,null],na_value:i="#7f7f7f",title:r}={}){return Object.assign(function(s){let a=s.extent,l=Yo(e,t);return s.map(c=>{if(isNaN(c))return i;let u=n[0]??a[0],h=n[1]??a[1];return u===h?l(.5):c>h?t:c<u?e:l((c-u)/(h-u))})},{title:r})}function G2({low:e="#832424",mid:t="white",high:n="#3A3A98",midpoint:i=0,limits:r=[null,null],na_value:o="#7f7f7f",title:s}={}){return Object.assign(function(l){let c=l.extent;return l.map(u=>{if(isNaN(u))return o;let h=r[0]??c[0],f=r[1]??c[1],d=i??(h+f)/2;return u<d?Yo(e,t)((u-h)/(d-h)):Yo(t,n)((u-d)/(f-d))})},{title:s})}function U2({colors:e=[],breaks:t,limits:n=[null,null],na_value:i="#7f7f7f",title:r}={}){return Object.assign(function(s){let a=s.extent;return s.map(l=>{if(isNaN(l))return i;let c=n[0]??a[0],u=n[1]??a[1],h=t||Array(e.length).fill(0).map((f,d)=>c+(u-c)*d/(e.length-1));return fu(h,e)(l)})},{title:r})}function Yl({title:e}={}){let t=Wr(),n=$r();return Object.assign(function(r){return r.level!=null?t(r):n(r)},{title:e})}function K2({discrete:e,continuous:t}={}){e==null&&(e=Wr()),t==null&&(t=$r());let n=function(r){return r.level!=null?e(r):t(r)},i=e.title??t.title;return Object.assign(n,{title:i})}const bo={identity:Jo,discrete:Wr,hue:Wr,manual:q2,continuous:$r,gradient:$r,gradient2:G2,gradientn:U2,dynamic:K2,auto:Yl,default:Yl};function wo({title:e}={}){return Object.assign(function(t){return t},{asis:!0,title:e})}function ql({title:e}={}){return Object.assign(function(t){return t.map(n=>+n)},{title:e})}function Jo({title:e}={}){return Object.assign(function(t){return t.map(n=>String(n??""))},{title:e})}function Gl({values:e,na_value:t=null,title:n}={}){let i;return Array.isArray(e)?i=function(r){return r.map(o=>e[+o]??t)}:i=function(r){return r.map(o=>e[o]??t)},Object.assign(i,{title:n})}function Ln({limits:e=[null,null],range:t=[0,1],na_value:n=null,null_value:i=null,title:r}={}){return Object.assign(function(s){let a=s.extent;return s.map(l=>{if(l===null)return i;if(isNaN(l))return n;let c=e[0]??a[0],u=e[1]??a[1];return(l-c)/(u-c)*(t[1]-t[0])+t[0]})},{title:r})}function Ul({title:e}={}){let t=["solid","22","42","44","13","1343","73","2262","12223242","F282","F4448444","224282F2","F1"];return Object.assign(function(i){return i.map(r=>t[+r])},{title:e})}const gn={color:bo,stroke:bo,fill:bo,alpha:{continuous:Ln,default:()=>Ln({range:[.1,1]})},size:{identity:ql,continuous:Ln,default:()=>Ln({range:[1,6]})},linewidth:{identity:ql,continuous:Ln,manual:Gl,default:()=>Ln({range:[1,6]})},linetype:{identity:Jo,discrete:Ul,default:Ul},label:{default:wo},group:{default:wo},points:{default:wo},transform:{manual:Gl,default:Jo},custom(e,{title:t}={}){return Object.assign(function(n){return n.map(e)},{title:t})}};function J2({extend:e=0,step:t,minor:n=!1}={}){return function({min:i,max:r}={}){let o=r-i;if(o<0)return[];if(o==0)return[i];i-=o*e,r+=o*e;let s=10**Math.floor(Math.log10(o)-1),a=o/s;t==null&&(t=([5,10,20].find(u=>u*5>a)??20)*s),n&&(t/=2);let l=Math.ceil(i/t),c=Math.floor(r/t);return new Array(c-l+1).fill(null).map((u,h)=>(l+h)*t)}}function Z2({extend:e=0}={}){return function({min:t,max:n}={}){let i=n-t;if(i<0)return[];if(i==0)return[new Date(t)];let r=new Date(t-i*e),o=new Date(n+i*e),s=r.getUTCFullYear(),a=r.getUTCMonth(),l=r.getUTCDate(),c=r.getUTCHours(),u=r.getUTCMinutes(),h=r.getUTCSeconds(),f=[];if(i>3*31536e6){let d=i/31536e6,g=10**Math.floor(Math.log10(d)-1),b=d/g,O=Math.max((b>50?10:b>25?5:2)*g,1);r=new Date(Date.UTC(Math.ceil(s/O)*O));do f.push(new Date(r));while(r.setUTCFullYear(r.getUTCFullYear()+O)<o)}else if(i>3*2592e6){let d=i/2592e6,g=[2,3,6].findLast(b=>b*3<=d)||1;r=new Date(Date.UTC(s,Math.ceil(a/g)*g));do f.push(new Date(r));while(r.setUTCMonth(r.getUTCMonth()+g)<o)}else if(i>21*864e5){r=new Date(Date.UTC(s,a,l+(7-r.getUTCDay())%7));do f.push(new Date(r));while(r.setUTCDate(r.getUTCDate()+7)<o)}else if(i>3*864e5){let d=i/864e5,g=[2,3].findLast(b=>b*3<=d)||1;r=new Date(Date.UTC(s,a,Math.ceil(l)));do f.push(new Date(r));while(r.setUTCDate(r.getUTCDate()+g)<o)}else if(i>3*36e5){let d=i/36e5,g=[2,3,6].findLast(b=>b*3<=d)||1;r=new Date(Date.UTC(s,a,l,Math.ceil(c/g)*g));do f.push(new Date(r));while(r.setUTCHours(r.getUTCHours()+g)<o)}else if(i>3*6e4){let d=i/6e4,g=[2,5,10,30].findLast(b=>b*3<=d)||1;r=new Date(Date.UTC(s,a,l,c,Math.ceil(u/g)*g));do f.push(new Date(r));while(r.setUTCMinutes(r.getUTCMinutes()+g)<o)}else if(i>3e3){let d=i/1e3,g=[2,5,10,30].findLast(b=>b*3<=d)||1;r=new Date(Date.UTC(s,a,l,c,u,Math.ceil(h/g)*g));do f.push(new Date(r));while(r.setUTCSeconds(r.getUTCSeconds()+g)<o)}else{let d=10**Math.floor(Math.log10(i)-1),g=i/d,b=(g>50?20:g>25?10:5)*d,O=Math.ceil(t/b),F=Math.floor(n/b);return new Array(F-O+1).fill(null).map((D,z)=>(O+z)*b)}return f}}const or={number:J2,datetime:Z2},Q2={default:{"":1,k:1e3,M:1e6,G:1e9,T:1e12,P:1e15,E:1e18,Z:1e21,Y:1e24}};function Kl({accuracy:e,scale:t=1,prefix:n="",suffix:i="",big_mark:r=" ",style_positive:o="none",style_negative:s="hyphen",scale_cut:a={"":1}}={}){let l={plus:"+",space:" "}[o]??"",c={hyphen:"-",minus:"−",parens:"("}[s]??"";return function(u,h,f=[u]){let d;if(e)d=e;else if(f.length>1){let z=f.filter($=>isFinite($)).sort(($,U)=>$-U);d=z.slice(1).map(($,U)=>$-z[U]).reduce(($,U)=>$<U?$:U)*t}else d=u||1;let g=Object.entries(a).sort((z,V)=>V[1]-z[1]).find(z=>z[1]<=d)?.[0]??"",b=(g==""?"":" ")+g+i;d=d/(a[g]??1);let O=Math.max(0,Math.ceil(-Math.log10(d))),F=Math.round(u*t/(a[g]??1)/d)*d,D=n+(F>0?l:F<0?c:"");return F<0&&s=="parens"&&(b=")"+b),F=Math.abs(F).toFixed(O).replace(new RegExp("(?<!\\..*)(\\d)(?=(?:\\d{3})+(?:\\.|$))","g"),"$1"+r),D+F+b}}function Jl({format:e}={}){let t={y:s=>s.getUTCFullYear(),M:s=>s.getUTCMonth()+1,d:s=>s.getUTCDate(),h:s=>s.getUTCHours(),m:s=>s.getUTCMinutes(),s:s=>s.getUTCSeconds()},n={y:31536e3,M:2678400,d:86400,h:3600,m:60,s:1};function i(s,a){return a.replace(/(y|M|d|h|m|s)\1*/g,(l,c)=>{let u=String(t[c](s)),h=l.length;return c=="y"?u.slice(-h):u.padStart(h,"0")})}let r={y:0,M:5,d:8,h:11,m:14,s:17},o={y:4,M:7,d:10,h:13,m:16,s:19};return function(s,a,l=[s]){if(l.length<=1)return i(new Date(s),e??"yyyy-MM-dd hh:mm:ss");if(e==null){let c=Array.from(l).sort((g,b)=>g-b),u=c.slice(1).map((g,b)=>g-c[b]).reduce((g,b)=>g<b?g:b)/1e3,h=(c[c.length-1]-c[0])/1e3,f=["y","M","d","m","s"].find(g=>n[g]<=u),d=h>2678400?"y":h>86400?"M":"h";e="yyyy-MM-dd hh:mm:ss".slice(r[d],o[f])}return i(new Date(s),e)}}const di={number:Kl,datetime:Jl,timestamp:Jl,default:function(e){return Kl({scale_cut:Q2.default,...e})}};function eg(e,t){return typeof e!="number"||typeof t!="number"?e.toString().localeCompare(t.toString()):e>t?1:e<t?-1:0}function tg(e,t){return typeof e!="number"||typeof t!="number"?e.toString().localeCompare(t.toString(),void 0,{numeric:!0}):e>t?1:e<t?-1:0}function ng(e,t){return e==null?{}:Object.fromEntries(Object.entries(e).map(([n,i])=>[n,t(n,i)]))}class ig{constructor(t,n,i){this.label=t,this.value=n,this.level=i}toString(){return this.label}valueOf(){return this.value}}class sr{static from(t){if(t instanceof this)return t;if(t instanceof Set&&(t=Array.from(t)),Array.isArray(t)){let n=Array.from(new Set(t.map(i=>i.toString()))).sort(tg);return new this(n)}else if(typeof t=="object"){let n=Object.keys(t).map(i=>i.toString()).sort((i,r)=>eg(t[i],t[r]));return new this(n)}throw new Error(`Invalid level values: ${t}`)}constructor(t){if(t instanceof this.constructor)return t;if(t instanceof Set&&(t=Array.from(t)),!Array.isArray(t))throw new Error("level must be an array");let n=t.map(i=>i.toString()).map((i,r)=>new ig(i,r,this));this.level=n,this.mapping=Object.fromEntries(n.map(i=>[i,i])),this.length=n.length}[Symbol.iterator](){return this.level[Symbol.iterator]()}getItem(t){return typeof t=="number"||t instanceof Number?this.level[t]:this.mapping[t]}apply(t){let n=t.map(i=>this.mapping[i]);return n.level=this,n}}class rg{constructor(t,n){let{data:i=[],aes:r,extendX:o,extendY:s}=n,{geom:a,stat:l,data:c,aes:u,levels:h={},scales:f={},attrs:d,args:g,vBind:b,extendX:O,extendY:F}=t;if(!ln[a]){console.error(`Invalid geom "${a}"`,"in layer",t,", plot",n);return}let D=typeof l=="function"?l:Bd[l];if(D==null){console.error(`Invalid stat "${l}"`,"in layer",t,", plot",n);return}this.geom=a,this.vBind=Object.assign(b,{extendX:O??o??0,extendY:F??s??0}),this.scales={},typeof c=="function"&&(c=c(i)),c==null&&(c=i),u={...r,...u};let z={},V={};for(const W in u)V[W]=String(u[W]),z[W]=c.map(u[W]);z.$raw=c;let $=D?.coord_attrs??["x","y","xnudge","ynudge"],U=c.length;U==0&&(U=$.map(W=>d[W]).filter(W=>W!=null).reduce((W,A)=>Math.max(Array.isArray(A)?A.length:1,W),0));for(const W in d)if($.includes(W))if(Array.isArray(d[W])){if(d[W].length!=U)throw new Error(`Attribute "${W}" must have the same length as data (${U})`);z[W]=d[W]}else{if(d[W]==null)continue;z[W]=new Array(U).fill(d[W])}try{if(z=D(z,g||{}),z.$group=z.$group??z.group,z.$group==null){let W=Object.values(z)?.[0]?.length??0;z.$group=new Array(W).fill(null)}}catch(W){console.error("Error",W,"in layer",t,", plot",n);return}this.localScales=new Set([...Object.keys(h).filter(W=>h[W]!=null),...Object.keys(f).filter(W=>f[W]!=null)]),this.aes=new Set([...this.localScales,...ln[a]?.attrs??[]]),this.$data=z,this.data={...z};for(const W in z)if(f[W]!=null||ln[a]?.attrs?.includes?.(W)){let A=new eo(f[W]??gn[W].default());A.aesthetics=W,A.title===void 0&&(A.title=V[W]);let x=this.$data[W];if(!x?.length)continue;h?.[W]!=null?A.level=h[W]:x.some(T=>typeof T=="string")?A.level=sr.from(x):A.extent=br.extent(x),this.applyScale(W,A)}for(const W in d)if(!$.includes(W))if(!Array.isArray(d[W]))d[W]!=null&&(this.data[W]=new Array(U).fill(d[W]));else{if(d[W].length!=U)throw new Error(`Attribute "${W}" must have the same length as data (${U})`);this.data[W]=d[W]}}applyScale(t,n){let i=this.$data[t];i!=null&&(n.level!=null&&(i=n.level.apply(i)),i.extent=n.extent,this.data[t]=n(i),this.scales[t]=n)}applyCoordScale(t){try{Object.assign(this.data,ln[this.geom]?.coord_scale?.(this.$data,t))}catch(n){console.error(n)}}}class og{constructor(t,n){this.levels={},this.extents={},this.layers=[],this.coordScales={};for(let i in n)this.layers.push(new rg(n[i],t));this.layers=this.layers.filter(i=>i.$data!=null),this.aes=new Set(this.layers.flatMap(i=>Array.from(i.aes))),this.scales=new Map}useScales(t,n){this.scales=new Map;for(const i of this.aes){let r=this.layers.filter(o=>!o.localScales.has(i)).flatMap(o=>o.$data[i]??[]);if(r.length!=0){let o=new eo(t?.[i]??gn[i].default());o.aesthetics=i,n?.[i]!=null?o.level=n[i]:r.some(s=>typeof s=="string")?o.level=sr.from(r):o.asis||(o.extent=br.extent(r));for(const s of this.layers)s.localScales.has(i)||s.applyScale(i,o)}for(const o of this.layers){let s=o.scales?.[i];s!=null&&(s.asis||(this.scales.has(s)||this.scales.set(s,new Set),this.scales.get(s).add(o.geom)))}}return this}useCoordLevels(t={}){for(const n of["x","y"])if(t[n])this.levels[n]=new sr(t[n]);else{let i=this.layers.flatMap(r=>(ln[r.geom].get_values??ln[r.geom].get_range)?.(r.$data,n));i.some(r=>typeof r=="string")?this.levels[n]=sr.from(i):(i=this.layers.flatMap(r=>ln[r.geom].get_range?.(r.$data,n)).filter(r=>!isNaN(r)),this.extents[n]=br.extent(i))}for(const n of this.layers)n.applyCoordScale(this.levels);return this}getComputedLayers(){return this.layers.map(t=>({data:Object.values(Object.groupBy(t.data.$group.map((i,r)=>ln[t.geom].validate(ng(t.data,(o,s)=>s?.[r]))).filter(i=>i!=null),i=>i.$group)),geom:t.geom,vBind:t.vBind}))}getCoordScales(t,n,i){let r={};if(this._range=t,this.levels.x){let o=+(t?.xmin??-.5)-(n.x?.min??0),s=+(t?.xmax??this.levels.x.length-.5)+(n.x?.max??0);r.x=new ki(this.levels.x,{min:o,max:s})}else{let o=t?.xmin??this.extents.x?.min??0,s=t?.xmax??this.extents.x?.max??0,a=+o-(n.x?.min??0),l=+s+(n.x?.max??0),c=i?.x??1;l-a<c&&(t?.xmax==null&&t?.xmin!=null?l=a+c:(t?.xmax!=null&&t?.xmin==null||(l=(l+a)/2+c/2),a=l-c)),o instanceof Date||s instanceof Date?r.x=new Un({min:a,max:l}):r.x=new Gn({min:a,max:l})}if(this.levels.y){let o=+(t?.ymin??-.5)-(n.y?.min??0),s=+(t?.ymax??this.levels.y.length-.5)+(n.y?.max??0);r.y=new ki(this.levels.y,{min:o,max:s})}else{let o=t?.ymin??this.extents.y?.min??0,s=t?.ymax??this.extents.y?.max??0,a=+o-(n.y?.min??0),l=+s+(n.y?.max??0),c=i?.y??1;l-a<c&&(t?.ymax==null&&t?.ymin!=null?l=a+c:(t?.ymax!=null&&t?.ymin==null||(l=(l+a)/2+c/2),a=l-c)),o instanceof Date||s instanceof Date?r.y=new Un({min:a,max:l}):r.y=new Gn({min:a,max:l})}return r}getAxes(t,n,i=[]){return t={x:t.x.expand(n?.x),y:t.y.expand(n?.y)},i.filter(r=>r.type in t).map(r=>new sg(r,t[r.type]))}render(t,n,i,r,o){let s=this.getCoordScales(t,n,o);return{layers:this.getComputedLayers(),axes:this.getAxes(s,i,r),coordScales:s,scales:this.scales}}}class eo extends Function{constructor(t){let n=Object.assign(t.bind(),t);return Object.setPrototypeOf(n,eo.prototype),n}set extent(t){this._extent=t}get extent(){if(this.level)return{0:0,1:this.level.length,length:2,min:0,max:this.level.length};if(this._extent)return this._extent}}class ki extends Function{constructor(t,{min:n,max:i}={}){const r=n==i?o=>0:o=>(+o-n)/(i-n);return r.range={min:n,max:i},r.level=t,r.invert=o=>o*(i-n)+n,r.padding={min:0,max:0},Object.setPrototypeOf(r,ki.prototype),r}expand({min:t=0,max:n=0}={}){let i=0,r=this.level.length,o=r,s=i-t*o,a=r+n*o;const l=s==a?u=>0:u=>(+u-s)/(a-s);l.invert=u=>h=>h*(a-s)+s,l.range=this.range,l.level=this.level,l.title=this.title;let c=a-s;return l.padding={min:c==0?0:(i-s)/c,max:c==0?0:(a-r)/c},Object.setPrototypeOf(l,ki.prototype),l}}class Gn extends Function{constructor(t){let n=+t.min,i=+t.max;const r=n==i?o=>.5:o=>(+o-n)/(i-n);return r.range={min:n,max:i},r.limits={min:n,max:i},r.invert=o=>o*(i-n)+n,r.padding={min:0,max:0},Object.setPrototypeOf(r,Gn.prototype),r}expand({min:t=0,max:n=0}={}){let{min:i,max:r}=this.limits,o=r-i,s=i-t*o,a=r+n*o,l=a-s;const c=s==a?u=>.5:u=>(+u-s)/(a-s);return c.invert=u=>u*(a-s)+s,c.range=this.range,c.level=this.level,c.title=this.title,c.limits={min:s,max:a},c.padding={min:l==0?0:(i-s)/l,max:l==0?0:(a-r)/l},Object.setPrototypeOf(c,Gn.prototype),c}}class Un extends Gn{constructor(t){let n=super(t),{min:i,max:r}=n.limits;return n.invert=o=>new Date(o*(r-i)+i),Object.setPrototypeOf(n,Un.prototype),n}expand({min:t=0,max:n=0}={}){let i=super.expand({min:t,max:n}),{min:r,max:o}=i.limits;return i.invert=s=>new Date(s*(o-r)+r),Object.setPrototypeOf(i,Un.prototype),i}}class sg{constructor(t={},n){let{breaks:i,extend:r,labels:o,minorBreaks:s,showGrid:a,...l}=t;if(Object.assign(this,l),n.level){let c=n.level.level.sort((u,h)=>u-h);if(i=i??c.map(u=>+u)??[],typeof i=="function"&&(i=i(c)),Array.isArray(o)){if(o.length!=i.length)throw new Error("Length of labels must be the same as breaks")}else typeof o=="function"?o=c.map(o):o=c.map(u=>String(u));this.ticks=i.map((u,h)=>({position:u,label:o[h]})),this.majorBreaks=a?i:[],this.minorBreaks=[]}else if(n instanceof Un){if(i=i??or.datetime({extend:r})??[],typeof i=="function"&&(i=i(n.limits)),o=o??di.datetime(),Array.isArray(i)||(i=[]),Array.isArray(o)){if(o.length!=i.length)throw new Error("Length of labels must be the same as breaks")}else typeof o=="function"?o=i.map(o):o=i.map(u=>String(u));let c=i.map(u=>new Date(u).toISOString());this.ticks=i.map((u,h)=>({position:u,label:o[h],title:c[h]})).sort((u,h)=>u.position-h.position),this.majorBreaks=a?i.sort():[],this.minorBreaks=[]}else{if(i=i??or.number({extend:r})??[],typeof i=="function"&&(i=i(n.limits)),s=s??or.number({extend:r,minor:!0})??[],typeof s=="function"&&(s=s(n.limits)),o=o??di.number(),Array.isArray(i)||(i=[]),Array.isArray(o)){if(o.length!=i.length)throw new Error("Length of labels must be the same as breaks")}else typeof o=="function"?o=i.map(o):o=i.map(c=>String(c));this.ticks=i.map((c,u)=>({position:c,label:o[u]})).sort((c,u)=>c.position-u.position),this.majorBreaks=a?i.sort():[],this.minorBreaks=a?s.sort():[]}}}const lg=["x","y","transform-origin","font-size"],ag={key:0},Nr={__name:"CoreText",props:{x:{type:Number,default:0},y:{type:Number,default:0},text:String,title:String,angle:{type:Number,default:0},anchorX:{default:.5},anchorY:{default:.5},fontSize:{type:Number,default:12}},setup(e){const t=at("ele"),n=Hn({});return Qe([t,()=>e.angle,()=>e.anchorX,()=>e.anchorY,()=>e.fontSize,()=>e.text],async([i])=>{if(!i)return;await Li();let{width:r,height:o}=i.getBBox(),s={left:0,center:.5,right:1}[e.anchorX]??+e.anchorX,a={bottom:0,center:.5,top:1}[e.anchorY]??+e.anchorY;isNaN(s)&&(s=.5),isNaN(a)&&(a=.5);let l=r*Math.abs(Math.cos(e.angle*Math.PI/180))+o*Math.abs(Math.sin(e.angle*Math.PI/180)),c=r*Math.abs(Math.sin(e.angle*Math.PI/180))+o*Math.abs(Math.cos(e.angle*Math.PI/180));n.transform=`translate(${l*(.5-s)},${c*(a-.5)}) rotate(${e.angle})`}),(i,r)=>(X(),J("text",we({ref_key:"ele",ref:t,x:e.x,y:e.y,"transform-origin":`${e.x} ${e.y}`,"text-anchor":"middle","dominant-baseline":"central","font-size":e.fontSize},n),[Lo(i.$slots,"default",{},()=>[e.title??e.text?(X(),J("title",ag,Ee(e.title??e.text),1)):rt("",!0),Mi(" "+Ee(e.text),1)])],16,lg))}},cg=["transform"],ug=["x2"],hg={key:0,class:"vv-interactive",fill:"transparent"},fg=["width"],dg={key:1,class:"vv-interactive",fill:"transparent"},mg=["x"],gg={__name:"CoreAxisX",props:Ot({ticks:{type:Array,default:()=>[]},title:String,coord2pos:Function,pos2coord:Function,layout:Object,theme:{type:Object,default:()=>({})},action:{type:Object,default:()=>({})},position:null},{translateX:{type:Number,default:0},translateXModifiers:{},translateY:{type:Number,default:0},translateYModifiers:{},transcaleX:{},transcaleXModifiers:{},transcaleY:{},transcaleYModifiers:{}}),emits:Ot(["move","zoom","rescale","nudge"],["update:translateX","update:translateY","update:transcaleX","update:transcaleY"]),setup(e,{emit:t}){const n=ee(()=>e.layout.width+e.layout.l+e.layout.r),i=ee(()=>e.layout.height+e.layout.t+e.layout.b),r=Ie(e,"translateX"),o=Ie(e,"translateY"),s=Ie(e,"transcaleX"),a=Ie(e,"transcaleY"),l=ee(()=>{let x=0,T={bottom:"0%",center:"50%",top:"100%"}[e.position]??e.position;return typeof T=="string"&&T.endsWith("%")?x=i.value*(1-T.slice(0,-1)/100):(x=o.value+e.coord2pos({y:+T}).y+e.layout.top,a.value?.ratio!=null&&(x=x*a.value.ratio+(1-a.value.ratio)*(a.value.origin??.5)*i.value)),`translate(0, ${x})`}),c=ee(()=>{let x=e.theme.title_position??e.theme.ticks_position,T=x,v=e.theme.title_anchor_x,H=e.theme.title_anchor_y;typeof x!="number"&&(T={left:0,bottom:.5,top:.5,right:1}[x]??.5,v=v??{left:1,right:0}[x]??.5,H=H??{top:0,bottom:1}[x]??.5);let Z=n.value*T,B=(H*2-1)*(e.theme.title_offset??0);return{x:Z,y:B,angle:e.theme.title_angle,anchorX:v,anchorY:H,fontSize:e.theme.title_size,text:e.title,fill:e.theme.title_color,...e.theme.title_style}}),u=ee(()=>({stroke:e.theme.line_color,"stroke-width":e.theme.line_width,"stroke-dasharray":e.theme.line_dasharray,style:e.theme.line_style})),h=ee(()=>{let x=[];for(let T of e.ticks){typeof T=="number"&&(T={position:T});let v=e.coord2pos({x:T.position}).x+e.layout.l+r.value;if(s.value?.ratio!=null&&(v=v*s.value.ratio+(1-s.value.ratio)*(s.value.origin??.5)*n.value),v<0||v>n.value)continue;let H=(e.theme.ticks_position=="top"?-1:1)*(T.length??e.theme.ticks_length);x.push({y1:0,y2:H,x1:v,x2:v,stroke:T.color??e.theme.ticks_color,"stroke-width":T.width??e.theme.ticks_width})}return x.filter(T=>T.stroke!=null)}),f=ee(()=>{let x=e.theme.ticks_position=="top",T=[];for(let v of e.ticks){typeof v=="number"&&(v={position:v,label:v});let H=e.coord2pos({x:v.position}).x+e.layout.l+r.value;if(s.value?.ratio!=null&&(H=H*s.value.ratio+(1-s.value.ratio)*(s.value.origin??.5)*n.value),H<0||H>n.value)continue;let Z=(x?-1:1)*((v.length??e.theme.ticks_length)+3);T.push({x:H,y:Z,angle:e.theme.text_angle,anchorX:e.theme.ticks_anchor_x??.5,anchorY:e.theme.ticks_anchor_y??(x?0:1),text:v.label,title:v.title??v.label,fontSize:v.size??e.theme.label_size,fill:v.color??e.theme.label_color})}return T.filter(v=>v.fill!=null)});function d(x,T,v){return x<T?T:x>v?v:x}const g=at("i");function b(x){let T=g.value.getBoundingClientRect();return{x:x.clientX-T.left-e.layout.left,l:x.clientX-T.left-e.layout.left,r:T.left+e.layout.left+e.layout.width-x.clientX}}const O=t;function F(x){let T=e.action.find(B=>B.action=="move");if(!T)return;x.preventDefault(),x.stopPropagation(),x.target.style.cursor="grabbing";let v=e.coord2pos(T,{unlimited:!0}),H=v.xmin==null?1/0:-v.xmin,Z=v.xmax==null?-1/0:e.layout.width-v.xmax;x.target.setPointerCapture(x.pointerId),x.target.onpointermove=B=>{r.value=d(r.value+B.movementX,Z,H)},x.target.onpointerup=B=>{x.target.onpointermove=null,x.target.onpointerup=null,x.target.style.cursor=null,A(T,B)}}function D(x){let T=e.action.find(N=>N.action=="rescale");if(!T)return;x.preventDefault(),x.stopPropagation();let{xmin:v,xmax:H,"min-range-x":Z=0}=T,{xmin:B,xmax:le}=e.pos2coord({xmin:e.layout.left,xmax:e.layout.left+e.layout.width}),{x:re}=b(x),S=e.layout.width/(e.layout.width-(e.coord2pos({xmin:v,xmax:H},{unlimited:!0}).xmin??1/0)),_=e.layout.width/Math.abs(e.layout.width-e.coord2pos({xmin:le-Z,xmax:B+Z}).xmin),R=0;x.target.setPointerCapture(x.pointerId),x.target.onpointermove=N=>{R+=N.movementX;let Y=(e.layout.width-re-R)/(e.layout.width-re);Y<S&&(Y=S),Y>_&&(Y=_),s.value={ratio:Y,origin:(e.layout.left+e.layout.width)/n.value}},x.target.onpointerup=N=>{x.target.onpointermove=null,x.target.onpointerup=null,A(T,N)}}function z(x){let T=e.action.find(N=>N.action=="rescale");if(!T)return;x.preventDefault(),x.stopPropagation();let{xmin:v,xmax:H,"min-range-x":Z=0}=T,{xmin:B,xmax:le}=e.pos2coord({xmin:e.layout.left,xmax:e.layout.left+e.layout.width}),{x:re}=b(x),S=e.layout.width/(e.coord2pos({xmin:v,xmax:H},{unlimited:!0}).xmax??1/0),_=e.layout.width/Math.abs(e.coord2pos({xmin:le-Z,xmax:B+Z}).xmax),R=0;x.target.setPointerCapture(x.pointerId),x.target.onpointermove=N=>{R+=N.movementX;let Y=(re+R)/re;Y<S&&(Y=S),Y>_&&(Y=_),s.value={ratio:Y,origin:e.layout.left/n.value}},x.target.onpointerup=N=>{x.target.onpointermove=null,x.target.onpointerup=null,A(T,N)}}let V=0,$;function U(x){let T=e.action.find(v=>["zoom","nudge"].includes(v.action)&&["ctrlKey","shiftKey","altKey","metaKey"].every(H=>v[H]==x[H]));T&&($=clearTimeout($),x.preventDefault(),x.stopPropagation(),V+=x.deltaY,W(T,b(x),V),$=setTimeout(()=>{A(T,x),V=0},300))}function W(x,T,v){if(x.action=="zoom"){let{"min-range-x":H=0,sensitivity:Z=1.25}=x;Z=Z**(v/100);let B=e.coord2pos(x,{unlimited:!0}),le=Math.max(T.l-T.l*Z,B.xmin??-1/0),re=Math.min(T.l+T.r*Z,B.xmax??1/0);if(Z<1){let S=e.pos2coord({xmin:le,xmax:re}),_=S.xmax-S.xmin,R=(S.xmax+S.xmin)/2;_>0&&(_<H&&(S.xmin=R-H/2,S.xmax=R+H/2),{xmin:le,xmax:re}=e.coord2pos(S))}Math.abs(e.layout.width-(re-le))>1&&(s.value={ratio:e.layout.width/(re-le),origin:(e.layout.l+le*e.layout.width/(e.layout.width-re+le))/n.value})}if(x.action=="nudge"){let{sensitivity:H=.1}=x,Z=H*e.layout.width*(-v/120),B=e.coord2pos(x,{unlimited:!0}),le=B.xmin==null?1/0:-B.xmin,re=B.xmax==null?-1/0:e.layout.width-B.xmax;r.value=d(Z,re,le)}}function A(x,T){if(s.value==null&&r.value==0)return;let v=0,H=e.layout.width;if(s.value){let Z=s.value.ratio,B=s.value.origin*n.value-e.layout.l;v=v/Z+(1-1/Z)*B,H=H/Z+(1-1/Z)*B}r.value&&(v-=r.value,H-=r.value),O(x.action,e.pos2coord({xmin:v,xmax:H}),T),r.value=0,s.value=null}return(x,T)=>(X(),J("g",{transform:l.value},[ie("line",we({ref:"i",x1:0,x2:n.value,y1:0,y2:0},u.value),null,16,ug),(X(!0),J(ue,null,Le(h.value,v=>(X(),J("line",we({ref_for:!0},v),null,16))),256)),(X(!0),J(ue,null,Le(f.value,v=>(X(),lt(Nr,we({ref_for:!0},v),null,16))),256)),e.action.some?.(v=>v.action=="move"||v.action=="zoom")?(X(),J("g",hg,[ie("rect",{width:n.value,height:10,y:-5,class:Sn({"cursor-grab":e.action.some?.(v=>v.action=="move")}),onPointerdown:F,onWheel:U},null,42,fg)])):rt("",!0),e.action.some?.(v=>v.action=="rescale")?(X(),J("g",dg,[ie("rect",{width:20,height:10,y:-5,class:"cursor-ew-resize",onPointerdown:D},null,32),ie("rect",{width:20,height:10,y:-5,x:n.value-20,class:"cursor-ew-resize",onPointerdown:z},null,40,mg)])):rt("",!0),K(Nr,ss(Gr(c.value)),null,16)],8,cg))}},pg=["transform"],yg=["y2"],xg={key:0,class:"vv-interactive",fill:"transparent"},bg=["height"],wg={key:1,class:"vv-interactive",fill:"transparent"},vg=["y"],Sg={__name:"CoreAxisY",props:Ot({ticks:{type:Array,default:()=>[]},title:String,coord2pos:Function,pos2coord:Function,layout:Object,theme:{type:Object,default:()=>({})},action:{type:Object,default:()=>({})},position:null},{translateX:{type:Number,default:0},translateXModifiers:{},translateY:{type:Number,default:0},translateYModifiers:{},transcaleX:{},transcaleXModifiers:{},transcaleY:{},transcaleYModifiers:{}}),emits:Ot(["move","zoom","rescale","nudge"],["update:translateX","update:translateY","update:transcaleX","update:transcaleY"]),setup(e,{emit:t}){const n=ee(()=>e.layout.width+e.layout.l+e.layout.r),i=ee(()=>e.layout.height+e.layout.t+e.layout.b),r=Ie(e,"translateX"),o=Ie(e,"translateY"),s=Ie(e,"transcaleX"),a=Ie(e,"transcaleY"),l=ee(()=>{let x=0,T={left:"0%",center:"50%",right:"100%"}[e.position]??e.position;return typeof T=="string"&&T.endsWith("%")?x=n.value*T.slice(0,-1)/100:(x=r.value+e.coord2pos({x:+T}).x+e.layout.left,s.value?.ratio!=null&&(x=x*s.value.ratio+(1-s.value.ratio)*(s.value.origin??.5)*n.value)),`translate(${x}, 0)`}),c=ee(()=>{let x=e.theme.title_position??e.theme.ticks_position,T=x,v=e.theme.title_anchor_x,H=e.theme.title_anchor_y;typeof x!="number"&&(T={bottom:0,left:.5,right:.5,top:1}[x]??.5,v=v??{left:1,right:0}[x]??.5,H=H??{top:0,bottom:1}[x]??.5);let Z=(1-v*2)*(e.theme.title_offset??0),B=i.value*(1-T);return{x:Z,y:B,angle:e.theme.title_angle,anchorX:v,anchorY:H,fontSize:e.theme.title_size,text:e.title,fill:e.theme.title_color,...e.theme.title_style}}),u=ee(()=>({stroke:e.theme.line_color,"stroke-width":e.theme.line_width,"stroke-dasharray":e.theme.line_dasharray,style:e.theme.line_style})),h=ee(()=>{let x=[];for(let T of e.ticks){typeof T=="number"&&(T={position:T});let v=e.coord2pos({y:T.position}).y+e.layout.t+o.value;if(a.value?.ratio!=null&&(v=v*a.value.ratio+(1-a.value.ratio)*(a.value.origin??.5)*i.value),v<0||v>i.value)continue;let H=(e.theme.ticks_position=="right"?1:-1)*(T.length??e.theme.ticks_length);x.push({y1:v,y2:v,x1:0,x2:H,stroke:T.color??e.theme.ticks_color,"stroke-width":T.width??e.theme.ticks_width})}return x.filter(T=>T.stroke!=null)}),f=ee(()=>{let x=e.theme.ticks_position=="right",T=[];for(let v of e.ticks){typeof v=="number"&&(v={position:v});let H=e.coord2pos({y:v.position}).y+e.layout.t+o.value;if(a.value?.ratio!=null&&(H=H*a.value.ratio+(1-a.value.ratio)*(a.value.origin??.5)*i.value),H<0||H>i.value)continue;let Z=(x?1:-1)*((v.length??e.theme.ticks_length)+3);T.push({y:H,x:Z,angle:e.theme.text_angle,anchorX:e.theme.ticks_anchor_x??(x?0:1),anchorY:e.theme.ticks_anchor_y??.5,text:v.label,title:v.title??v.label,fontSize:v.size??e.theme.label_size,fill:v.color??e.theme.label_color})}return T.filter(v=>v.fill!=null)});function d(x,T,v){return x<T?T:x>v?v:x}const g=at("i");function b(x){let T=g.value.getBoundingClientRect();return{y:x.clientY-T.top-e.layout.top,t:x.clientY-T.top-e.layout.top,b:T.top+e.layout.top+e.layout.height-x.clientY}}const O=t;function F(x){let T=e.action.find(B=>B.action=="move");if(!T)return;x.preventDefault(),x.stopPropagation(),x.target.style.cursor="grabbing";let v=e.coord2pos(T,{unlimited:!0}),H=v.ymin==null?1/0:-v.ymin,Z=v.ymax==null?-1/0:e.layout.height-v.ymax;x.target.setPointerCapture(x.pointerId),x.target.onpointermove=B=>{o.value=d(o.value+B.movementY,Z,H)},x.target.onpointerup=B=>{x.target.onpointermove=null,x.target.onpointerup=null,x.target.style.cursor=null,A(T,B)}}function D(x){let T=e.action.find(N=>N.action=="rescale");if(!T)return;x.preventDefault(),x.stopPropagation();let{ymin:v,ymax:H,"min-range-y":Z=0}=T,{ymin:B,ymax:le}=e.pos2coord({ymin:e.layout.top,ymax:e.layout.top+e.layout.height}),{y:re}=b(x),S=e.layout.height/(e.layout.height-(e.coord2pos({ymin:v,ymax:H},{unlimited:!0}).ymin??1/0)),_=e.layout.height/Math.abs(e.layout.height-e.coord2pos({ymin:le-Z,ymax:B+Z}).ymin),R=0;x.target.setPointerCapture(x.pointerId),x.target.onpointermove=N=>{R+=N.movementY;let Y=(e.layout.height-re-R)/(e.layout.height-re);Y<S&&(Y=S),Y>_&&(Y=_),a.value={ratio:Y,origin:(e.layout.top+e.layout.height)/i.value}},x.target.onpointerup=N=>{x.target.onpointermove=null,x.target.onpointerup=null,A(T,N)}}function z(x){let T=e.action.find(N=>N.action=="rescale");if(!T)return;x.preventDefault(),x.stopPropagation();let{ymin:v,ymax:H,"min-range-y":Z=0}=T,{ymin:B,ymax:le}=e.pos2coord({ymin:e.layout.top,ymax:e.layout.top+e.layout.height}),{y:re}=b(x),S=e.layout.height/(e.coord2pos({ymin:v,ymax:H},{unlimited:!0}).ymax??1/0),_=e.layout.height/Math.abs(e.coord2pos({ymin:le-Z,ymax:B+Z}).ymax),R=0;x.target.setPointerCapture(x.pointerId),x.target.onpointermove=N=>{R+=N.movementY;let Y=(re+R)/re;Y<S&&(Y=S),Y>_&&(Y=_),a.value={ratio:Y,origin:e.layout.top/i.value}},x.target.onpointerup=N=>{x.target.onpointermove=null,x.target.onpointerup=null,A(T,N)}}let V=0,$;function U(x){let T=e.action.find(v=>["zoom","nudge"].includes(v.action)&&["ctrlKey","shiftKey","altKey","metaKey"].every(H=>v[H]==x[H]));T&&($=clearTimeout($),x.preventDefault(),x.stopPropagation(),V+=x.deltaY,W(T,b(x),V),$=setTimeout(()=>{A(T,x),V=0},300))}function W(x,T,v){if(x.action=="zoom"){let{"min-range-y":H=0,sensitivity:Z=1.25}=x;Z=Z**(v/100);let B=e.coord2pos(x,{unlimited:!0}),le=Math.max(T.t-T.t*Z,B.ymin??-1/0),re=Math.min(T.t+T.b*Z,B.ymax??1/0);if(Z<1){let S=e.pos2coord({ymin:le,ymax:re}),_=S.ymax-S.ymin,R=(S.ymax+S.ymin)/2;_>0&&(_<H&&(S.ymin=R-H/2,S.ymax=R+H/2),{ymin:le,ymax:re}=e.coord2pos(S))}Math.abs(e.layout.height-(re-le))>1&&(a.value={ratio:e.layout.height/(re-le),origin:(e.layout.t+le*e.layout.height/(e.layout.height-re+le))/i.value})}if(x.action=="nudge"){let H=(x.ratio??.1)*e.layout.height*(v/120),Z=e.coord2pos(x,{unlimited:!0}),B=Z.ymin==null?1/0:-Z.ymin,le=Z.ymax==null?-1/0:e.layout.height-Z.ymax;o.value=d(H,le,B)}}function A(x,T){if(a.value==null&&o.value==0)return;let v=0,H=e.layout.height;if(a.value){let Z=a.value.ratio,B=a.value.origin*i.value-e.layout.t;v=v/Z+(1-1/Z)*B,H=H/Z+(1-1/Z)*B}o.value&&(v-=o.value,H-=o.value),O(x.action,e.pos2coord({ymin:v,ymax:H}),T),o.value=0,a.value=null}return(x,T)=>(X(),J("g",{transform:l.value},[ie("line",we({ref:"i",x1:0,x2:0,y1:0,y2:i.value},u.value),null,16,yg),(X(!0),J(ue,null,Le(h.value,v=>(X(),J("line",we({ref_for:!0},v),null,16))),256)),(X(!0),J(ue,null,Le(f.value,v=>(X(),lt(Nr,we({ref_for:!0},v),null,16))),256)),e.action.some?.(v=>v.action=="move"||v.action=="zoom")?(X(),J("g",xg,[ie("rect",{width:10,height:i.value,x:-5,class:Sn({"cursor-grab":e.action.some?.(v=>v.action=="move")}),onPointerdown:F,onWheel:U},null,42,bg)])):rt("",!0),e.action.some?.(v=>v.action=="rescale")?(X(),J("g",wg,[ie("rect",{width:10,height:20,x:-5,class:"cursor-ns-resize",onPointerdown:D},null,32),ie("rect",{width:10,height:20,x:-5,y:i.value-20,class:"cursor-ns-resize",onPointerdown:z},null,40,vg)])):rt("",!0),K(Nr,ss(Gr(c.value)),null,16)],8,pg))}},_g={__name:"CoreAxis",props:{theme:{type:Object,default:()=>({})},position:null},setup(e){const t={horizontal:gg,vertical:Sg},n=ee(()=>e.theme.line_orientation??"horizontal");return(i,r)=>e.position!="none"?(X(),lt(gs(t[n.value]),{key:0,theme:e.theme,position:e.position},null,8,["theme","position"])):rt("",!0)}},kg={__name:"CoreGridX",props:{majorBreaks:{type:Array,default:()=>[]},minorBreaks:{type:Array,default:()=>[]},coord2pos:Function,pos2coord:Function,layout:Object,theme:{type:Object,default:()=>({})},action:{type:Object,default:()=>({})},translate:{type:Number,default:0},transcale:Object},setup(e){const t=ee(()=>e.layout.width+e.layout.l+e.layout.r),n=ee(()=>e.layout.height+e.layout.t+e.layout.b),i=ee(()=>{let o=[];for(let s of e.majorBreaks){s?.position==null&&(s={position:+s});let a=e.coord2pos({x:s.position}).x+e.layout.l+e.translate;e.transcale?.ratio!=null&&(a=a*e.transcale.ratio+(1-e.transcale.ratio)*(e.transcale.origin??.5)*t.value),!(a<0||a>t.value)&&o.push({y1:0,y2:n.value,x1:a,x2:a,stroke:s.color??e.theme.line_color_major??e.theme.line_color,"stroke-width":s.width??e.theme.line_width_major??e.theme.line_width})}return o.filter(s=>s.stroke!==null)}),r=ee(()=>{let o=[];for(let s of e.minorBreaks){s?.position==null&&(s={position:+s});let a=e.coord2pos({x:s.position}).x+e.layout.l+e.translate;e.transcale?.ratio!=null&&(a=a*e.transcale.ratio+(1-e.transcale.ratio)*(e.transcale.origin??.5)*t.value),!(a<0||a>t.value)&&o.push({y1:0,y2:n.value,x1:a,x2:a,stroke:s.color??e.theme.line_color_minor??e.theme.line_color,"stroke-width":s.width??e.theme.line_width_minor??e.theme.line_width})}return o.filter(s=>s.stroke!==null)});return(o,s)=>(X(),J("g",null,[(X(!0),J(ue,null,Le(i.value,a=>(X(),J("line",we({ref_for:!0},a),null,16))),256)),(X(!0),J(ue,null,Le(r.value,a=>(X(),J("line",we({ref_for:!0},a),null,16))),256))]))}},Tg={__name:"CoreGridY",props:{majorBreaks:{type:Array,default:()=>[]},minorBreaks:{type:Array,default:()=>[]},coord2pos:Function,pos2coord:Function,layout:Object,theme:{type:Object,default:()=>({})},action:{type:Object,default:()=>({})},translate:{type:Number,default:0},transcale:Object},setup(e){const t=ee(()=>e.layout.width+e.layout.l+e.layout.r),n=ee(()=>e.layout.height+e.layout.t+e.layout.b),i=ee(()=>{let o=[];for(let s of e.majorBreaks){s?.position==null&&(s={position:+s});let a=e.coord2pos({y:s.position}).y+e.layout.t+e.translate;e.transcale?.ratio!=null&&(a=a*e.transcale.ratio+(1-e.transcale.ratio)*(e.transcale.origin??.5)*n.value),!(a<0||a>n.value)&&o.push({x1:0,x2:t.value,y1:a,y2:a,stroke:s.color??e.theme.line_color_major??e.theme.line_color,"stroke-width":s.width??e.theme.line_width_major??e.theme.line_width})}return o.filter(s=>s.stroke!==null)}),r=ee(()=>{let o=[];for(let s of e.minorBreaks){s?.position==null&&(s={position:+s});let a=e.coord2pos({y:s.position}).y+e.layout.t+e.translate;e.transcale?.ratio!=null&&(a=a*e.transcale.ratio+(1-e.transcale.ratio)*(e.transcale.origin??.5)*n.value),!(a<0||a>n.value)&&o.push({x1:0,x2:t.value,y1:a,y2:a,stroke:s.color??e.theme.line_color_minor??e.theme.line_color,"stroke-width":s.width??e.theme.line_width_minor??e.theme.line_width})}return o.filter(s=>s.stroke!==null)});return(o,s)=>(X(),J("g",null,[(X(!0),J(ue,null,Le(i.value,a=>(X(),J("line",we({ref_for:!0},a),null,16))),256)),(X(!0),J(ue,null,Le(r.value,a=>(X(),J("line",we({ref_for:!0},a),null,16))),256))]))}},Pg={__name:"CoreCanvasPoint",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{expose:t,emit:n}){const i=n,r={triangle:l=>`M0-${l*2/3}L${l*.577},${l/3}L-${l*.577},${l/3}Z`,diamond:l=>`M0-${l*.707}L${l*.707},0L0,${l*.707}L-${l*.707},0Z`,square:l=>`M-${l/2}-${l/2}H${l/2}V${l/2}H-${l/2}Z`,plus:l=>`M-${l/10}-${l/2}V-${l/10}H-${l/2}V${l/10}H-${l/10}V${l/2}H${l/10}V${l/10}H${l/2}V-${l/10}H${l/10}V-${l/2}H-${l/10}Z`},o=ee(()=>({width:e.layout.fullWidth*(1+e.extendX*2),height:e.layout.fullHeight*(1+e.extendY*2),x:-e.layout.l-e.layout.fullWidth*e.extendX,y:-e.layout.t-e.layout.fullHeight*e.extendY})),s=at("container"),a=ee(()=>{if(s.value==null)return;const l=document.createElement("canvas");l.width=e.layout.fullWidth*(1+e.extendX*2),l.height=e.layout.fullHeight*(1+e.extendY*2);const c=l.getContext("2d");c.clearRect(0,0,l.width,l.height),c.translate(e.layout.l+e.layout.fullWidth*e.extendX,e.layout.t+e.layout.fullHeight*e.extendY);let u=new Map;for(const h of e.data)for(let{x:f,y:d,size:g=6,shape:b,color:O,stroke:F,linewidth:D,alpha:z,xtranslate:V=0,ytranslate:$=0,$raw:U}of h){const{x:W,y:A}=e.coord2pos({x:f,y:d}),x=new Path2D;String(b).startsWith("path:")?x.addPath(new Path2D(b.slice(5)),new DOMMatrix().translateSelf(W+V,A+$)):b in r?x.addPath(new Path2D(r[b](g)),new DOMMatrix().translate(W+V,A+$)):x.arc(W+V,A+$,g/2,0,Math.PI*2),u.set(x,U),c.lineWidth=D,c.globalAlpha=z,c.beginPath(),O!=="none"&&(c.fillStyle=O,c.fill(x)),F!=null&&(c.strokeStyle=F,c.stroke(x))}return l.onclick=function(h){const f=l.getBoundingClientRect(),d=h.clientX-f.left,g=h.clientY-f.top;for(const[b,O]of u)if(c.isPointInPath(b,d,g)){i("click",h,O);break}},l});return Qe(a,l=>s.value.replaceChildren(l)),t({dispatchEvent:l=>a.value?.dispatchEvent?.(l)}),(l,c)=>(X(),J("foreignObject",we(o.value,{ref:"container",class:"pointer-events-none"}),null,16))}},Zl={__name:"CoreCanvasLine",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{expose:t,emit:n}){const i=n,r=ee(()=>({width:e.layout.fullWidth*(1+e.extendX*2),height:e.layout.fullHeight*(1+e.extendY*2),x:-e.layout.l-e.layout.fullWidth*e.extendX,y:-e.layout.t-e.layout.fullHeight*e.extendY})),o=at("container"),s=ee(()=>{if(o.value==null)return;const l=document.createElement("canvas");l.width=e.layout.fullWidth*(1+e.extendX*2),l.height=e.layout.fullHeight*(1+e.extendY*2);const c=l.getContext("2d");c.clearRect(0,0,l.width,l.height),c.translate(e.layout.l+e.layout.fullWidth*e.extendX,e.layout.t+e.layout.fullHeight*e.extendY);let u=new Map;for(const h of e.data)for(let{x:f,y:d,xend:g,yend:b,color:O,linewidth:F,alpha:D,linetype:z,xtranslate:V=0,ytranslate:$=0,$raw:U}of h){if(O==="transparent")continue;const{x:W,y:A}=e.coord2pos({x:f,y:d}),{x,y:T}=e.coord2pos({x:g,y:b}),v=new Path2D;v.moveTo(W+V,A+$),v.lineTo(x+V,T+$),u.set(v,U),c.lineWidth=F,c.globalAlpha=D,c.setLineDash(a(z)),O!=="none"&&(c.strokeStyle=O,c.stroke(v))}return l.onclick=function(h){const f=l.getBoundingClientRect(),d=h.clientX-f.left,g=h.clientY-f.top;for(const[b,O]of u)if(c.isPointInPath(b,d,g)){i("click",h,O);break}},l});Qe(s,l=>o.value.replaceChildren(l)),t({dispatchEvent:l=>s.value?.dispatchEvent?.(l)});function a(l){return l==null?[]:Array.isArray(l)?l:l==="solid"?[]:l==="dashed"?[4,4]:l==="dotted"?[1,3]:l==="dotdash"?[1,3,4,3]:l==="longdash"?[8,4]:l==="twodash"?[2,2,6,2]:l.includes(" ")?l:l.split("").map(c=>+("0x"+c))}return(l,c)=>(X(),J("foreignObject",we(r.value,{ref:"container",class:"pointer-events-none"}),null,16))}},Ql={__name:"CoreCanvasRect",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{expose:t,emit:n}){const i=n,r=ee(()=>({width:e.layout.fullWidth*(1+e.extendX*2),height:e.layout.fullHeight*(1+e.extendY*2),x:-e.layout.l-e.layout.fullWidth*e.extendX,y:-e.layout.t-e.layout.fullHeight*e.extendY})),o=at("container"),s=ee(()=>{if(o.value==null)return;const l=document.createElement("canvas");l.width=e.layout.fullWidth*(1+e.extendX*2),l.height=e.layout.fullHeight*(1+e.extendY*2);const c=l.getContext("2d");c.clearRect(0,0,l.width,l.height),c.translate(e.layout.l+e.layout.fullWidth*e.extendX,e.layout.t+e.layout.fullHeight*e.extendY);let u=new Map;for(const h of e.data)for(let{xmin:f,xmax:d,ymin:g,ymax:b,fill:O,color:F,linewidth:D,linetype:z,alpha:V,xtranslate:$=0,ytranslate:U=0,$raw:W}of h){const{x:A,y:x}=e.coord2pos({x:f,y:g}),{x:T,y:v}=e.coord2pos({x:d,y:b}),H=new Path2D;H.rect(A+$,x+U,T-A,v-x),u.set(H,W),c.lineWidth=D,c.globalAlpha=V,c.setLineDash(a(z)),O!=="none"&&(c.fillStyle=O,c.fill(H)),F!=null&&(c.strokeStyle=F,c.stroke(H))}return l.onclick=function(h){const f=l.getBoundingClientRect(),d=h.clientX-f.left,g=h.clientY-f.top;for(const[b,O]of u)if(c.isPointInPath(b,d,g)){i("click",h,O);break}},l});Qe(s,l=>o.value.replaceChildren(l)),t({dispatchEvent:l=>s.value?.dispatchEvent?.(l)});function a(l){return l==null?[]:Array.isArray(l)?l:l==="solid"?[]:l==="dashed"?[4,4]:l==="dotted"?[1,3]:l==="dotdash"?[1,3,4,3]:l==="longdash"?[8,4]:l==="twodash"?[2,2,6,2]:l.includes(" ")?l:l.split("").map(c=>+("0x"+c))}return(l,c)=>(X(),J("foreignObject",we(r.value,{ref:"container",class:"pointer-events-none"}),null,16))}},Ag={__name:"CoreCanvasText",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{expose:t,emit:n}){const i=n,r=ee(()=>({width:e.layout.fullWidth*(1+e.extendX*2),height:e.layout.fullHeight*(1+e.extendY*2),x:-e.layout.l-e.layout.fullWidth*e.extendX,y:-e.layout.t-e.layout.fullHeight*e.extendY})),o=at("container"),s=ee(()=>{if(o.value==null)return;const l=document.createElement("canvas");l.width=e.layout.fullWidth*(1+e.extendX*2),l.height=e.layout.fullHeight*(1+e.extendY*2);const c=l.getContext("2d");c.clearRect(0,0,l.width,l.height),c.translate(e.layout.l+e.layout.fullWidth*e.extendX,e.layout.t+e.layout.fullHeight*e.extendY);let u=new Map;for(const h of e.data)for(let{x:f,y:d,color:g,size:b=4,label:O,stroke:F,linewidth:D,linetype:z,alpha:V,xtranslate:$=0,ytranslate:U=0,$raw:W}of h){const{x:A,y:x}=e.coord2pos({x:f,y:d});c.textAlign="center",c.textBaseline="middle",c.lineWidth=D,c.globalAlpha=V,c.font=`${b*4}px sans-serif`,c.setLineDash(a(z)),g!=="none"&&(c.fillStyle=g,c.fillText(O,A+$,x+U)),F!=null&&(c.strokeStyle=F,c.strokeText(O,A+$,x+U))}return l.onclick=function(h){const f=l.getBoundingClientRect(),d=h.clientX-f.left,g=h.clientY-f.top;for(const[b,O]of u)if(c.isPointInPath(b,d,g)){i("click",h,O);break}},l});Qe(s,l=>o.value.replaceChildren(l)),t({dispatchEvent:l=>s.value?.dispatchEvent?.(l)});function a(l){return l==null?[]:Array.isArray(l)?l:l==="solid"?[]:l==="dashed"?[4,4]:l==="dotted"?[1,3]:l==="dotdash"?[1,3,4,3]:l==="longdash"?[8,4]:l==="twodash"?[2,2,6,2]:l.includes(" ")?l:l.split("").map(c=>+("0x"+c))}return(l,c)=>(X(),J("foreignObject",we(r.value,{ref:"container",class:"pointer-events-none"}),null,16))}},Lg={__name:"CoreCanvasPolygon",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{expose:t,emit:n}){const i=n,r=ee(()=>({width:e.layout.fullWidth*(1+e.extendX*2),height:e.layout.fullHeight*(1+e.extendY*2),x:-e.layout.l-e.layout.fullWidth*e.extendX,y:-e.layout.t-e.layout.fullHeight*e.extendY})),o=at("container"),s=ee(()=>{if(o.value==null)return;const l=document.createElement("canvas");l.width=e.layout.fullWidth*(1+e.extendX*2),l.height=e.layout.fullHeight*(1+e.extendY*2);const c=l.getContext("2d");c.clearRect(0,0,l.width,l.height),c.translate(e.layout.l+e.layout.fullWidth*e.extendX,e.layout.t+e.layout.fullHeight*e.extendY);let u=new Map;for(const h of e.data)for(let{points:f,fill:d,color:g,linewidth:b,linetype:O,alpha:F,xtranslate:D=0,ytranslate:z=0,$raw:V}of h){if(f=f.map(U=>e.coord2pos(U)).filter(U=>U.x!=null&&U.y!=null),f.length===0)continue;const $=new Path2D;$.moveTo(f[0].x+D,f[0].y+z);for(let U=1;U<f.length;U++)$.lineTo(f[U].x+D,f[U].y+z);$.closePath(),u.set($,V),c.lineWidth=b,c.globalAlpha=F,c.setLineDash(a(O)),d!=="none"&&(c.fillStyle=d,c.fill($)),g!=null&&(c.strokeStyle=g,c.stroke($))}return l.onclick=function(h){const f=l.getBoundingClientRect(),d=h.clientX-f.left,g=h.clientY-f.top;for(const[b,O]of u)if(c.isPointInPath(b,d,g)){i("click",h,O);break}},l});Qe(s,l=>o.value.replaceChildren(l)),t({dispatchEvent:l=>s.value?.dispatchEvent?.(l)});function a(l){return l==null?[]:Array.isArray(l)?l:l==="solid"?[]:l==="dashed"?[4,4]:l==="dotted"?[1,3]:l==="dotdash"?[1,3,4,3]:l==="longdash"?[8,4]:l==="twodash"?[2,2,6,2]:l.includes(" ")?l:l.split("").map(c=>+("0x"+c))}return(l,c)=>(X(),J("foreignObject",we(r.value,{ref:"container",class:"pointer-events-none"}),null,16))}},Mg=Object.freeze(Object.defineProperty({__proto__:null,line:Zl,point:Pg,polygon:Lg,rect:Ql,stick:Zl,text:Ag,tile:Ql},Symbol.toStringTag,{value:"Module"})),Cg={__name:"CoreSvgPoint",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i={triangle:o=>`M0-${o*2/3}L${o*.577},${o/3}L-${o*.577},${o/3}Z`,diamond:o=>`M0-${o*.707}L${o*.707},0L0,${o*.707}L-${o*.707},0Z`,square:o=>`M-${o/2}-${o/2}H${o/2}V${o/2}H-${o/2}Z`,plus:o=>`M-${o/10}-${o/2}V-${o/10}H-${o/2}V${o/10}H-${o/10}V${o/2}H${o/10}V${o/10}H${o/2}V-${o/10}H${o/10}V-${o/2}H-${o/10}Z`},r=ee(()=>{let o=-e.layout.fullWidth*e.extendX-e.layout.l,s=e.layout.fullWidth*(1+e.extendX)-e.layout.l,a=-e.layout.fullHeight*e.extendY-e.layout.t,l=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(c=>c.map(({x:u,y:h,size:f=6,shape:d,color:g,stroke:b,linewidth:O,alpha:F,xtranslate:D=0,ytranslate:z=0,$raw:V})=>{let{x:$,y:U}=e.coord2pos({x:u,y:h});if($<o||$>s||U<a||U>l)return null;let W={fill:g,stroke:b,"stroke-width":O,"fill-opacity":F,"stroke-opacity":F,transform:D||z?`translate(${D}, ${z})`:null,onClick:A=>n("click",A,V),onContextmenu:A=>n("contextmenu",A,V),onPointerover:A=>n("pointerover",A,V),onPointerout:A=>n("pointerout",A,V),onPointerenter:A=>n("pointerenter",A,V),onPointerleave:A=>n("pointerleave",A,V),onPointerdown:A=>n("pointerdown",A,V),onPointerup:A=>n("pointerup",A,V),onPointermove:A=>n("pointermove",A,V)};return String(d).startsWith("path:")?(W.transform=`translate(${$},${U}) scale(${f})`,W.d=d.slice(5)):d in i?(W.transform=`translate(${$},${U})`,W.d=i[d](f)):(W.cx=$,W.cy=U,W.r=f/2),W}).filter(u=>u!=null))});return(o,s)=>(X(),J("g",null,[(X(!0),J(ue,null,Le(r.value,a=>(X(),J("g",null,[(X(!0),J(ue,null,Le(a,l=>(X(),J(ue,null,[l.d?(X(),J("path",we({key:0,ref_for:!0},l),null,16)):(X(),J("circle",we({key:1,ref_for:!0},l),null,16))],64))),256))]))),256))]))}},ea={__name:"CoreSvgLine",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i=ee(()=>{let o=-e.layout.fullWidth*e.extendX-e.layout.l,s=e.layout.fullWidth*(1+e.extendX)-e.layout.l,a=-e.layout.fullHeight*e.extendY-e.layout.t,l=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(c=>c.map(({x:u,y:h,xend:f,yend:d,color:g="black",linewidth:b,alpha:O,linetype:F,xtranslate:D=0,ytranslate:z=0,$raw:V})=>{let{x:$,y:U}=e.coord2pos({x:u,y:h}),{x:W,y:A}=e.coord2pos({x:f,y:d});return $<o&&W<o||$>s&&W>s||U<a&&A<a||U>l&&A>l?null:{x1:$,x2:W,y1:U,y2:A,stroke:g,"stroke-width":b,"stroke-opacity":O,"stroke-dasharray":r(F),transform:D||z?`translate(${D}, ${z})`:null,onClick:T=>n("click",T,V),onContextmenu:T=>n("contextmenu",T,V),onPointerover:T=>n("pointerover",T,V),onPointerout:T=>n("pointerout",T,V),onPointerenter:T=>n("pointerenter",T,V),onPointerleave:T=>n("pointerleave",T,V),onPointerdown:T=>n("pointerdown",T,V),onPointerup:T=>n("pointerup",T,V),onPointermove:T=>n("pointermove",T,V)}}).filter(u=>u!=null))});function r(o){return o==null?null:Array.isArray(o)?o.join(" "):o==="solid"?null:o==="dashed"?"4 4":o==="dotted"?"1 3":o==="dotdash"?"1 3 4 3":o==="longdash"?"8 4":o==="twodash"?"2 2 6 2":o.includes(" ")?o:o.split("").map(s=>+("0x"+s)).join(" ")}return(o,s)=>(X(),J("g",null,[(X(!0),J(ue,null,Le(i.value,a=>(X(),J("g",null,[(X(!0),J(ue,null,Le(a,l=>(X(),J("line",we({ref_for:!0},l),null,16))),256))]))),256))]))}},ta={__name:"CoreSvgRect",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i=ee(()=>{let o=-e.layout.fullWidth*e.extendX-e.layout.l,s=e.layout.fullWidth*(1+e.extendX)-e.layout.l,a=-e.layout.fullHeight*e.extendY-e.layout.t,l=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(c=>c.map(({xmin:u,xmax:h,ymin:f,ymax:d,fill:g="black",color:b,linewidth:O,linetype:F,alpha:D,xtranslate:z=0,ytranslate:V=0,$raw:$})=>({xmin:u,xmax:h,ymin:f,ymax:d}=e.coord2pos({xmin:u,xmax:h,ymin:f,ymax:d}),u<o&&h<o||u>s&&h>s||f<a&&d<a||f>l&&d>l?null:{x:u,width:h-u,y:f,height:d-f,fill:g,stroke:b,"stroke-width":O,"stroke-dasharray":r(F),"fill-opacity":D,"stroke-opacity":D,transform:z||V?`translate(${z}, ${V})`:null,onClick:W=>n("click",W,$),onContextmenu:W=>n("contextmenu",W,$),onPointerover:W=>n("pointerover",W,$),onPointerout:W=>n("pointerout",W,$),onPointerenter:W=>n("pointerenter",W,$),onPointerleave:W=>n("pointerleave",W,$),onPointerdown:W=>n("pointerdown",W,$),onPointerup:W=>n("pointerup",W,$),onPointermove:W=>n("pointermove",W,$)})).filter(u=>u!=null))});function r(o){return o==null||o==="solid"?null:o==="dashed"?"4 4":o==="dotted"?"1 3":o==="dotdash"?"1 3 4 3":o==="longdash"?"8 4":o==="twodash"?"2 2 6 2":o.includes(" ")?o:o.split("").map(s=>+("0x"+s)).join(" ")}return(o,s)=>(X(),J("g",null,[(X(!0),J(ue,null,Le(i.value,a=>(X(),J("g",null,[(X(!0),J(ue,null,Le(a,l=>(X(),J("rect",we({ref_for:!0},l),null,16))),256))]))),256))]))}},Wg={__name:"CoreSvgText",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i=ee(()=>{let o=-e.layout.fullWidth*e.extendX-e.layout.l,s=e.layout.fullWidth*(1+e.extendX)-e.layout.l,a=-e.layout.fullHeight*e.extendY-e.layout.t,l=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(c=>c.map(({x:u,y:h,color:f,size:d=4,label:g,stroke:b,linewidth:O,linetype:F,alpha:D,xtranslate:z=0,ytranslate:V=0,$raw:$})=>{let{x:U,y:W}=e.coord2pos({x:u,y:h});return U<o||U>s||W<a||W>l?null:{x:U,y:W,fill:f,label:g,"font-size":d*4,stroke:b,"stroke-width":O,"stroke-dasharray":r(F),"fill-opacity":D,"stroke-opacity":D,"text-anchor":"middle","alignment-baseline":"central",transform:z||V?`translate(${z}, ${V})`:null,onClick:x=>n("click",x,$),onContextmenu:x=>n("contextmenu",x,$),onPointerover:x=>n("pointerover",x,$),onPointerout:x=>n("pointerout",x,$),onPointerenter:x=>n("pointerenter",x,$),onPointerleave:x=>n("pointerleave",x,$),onPointerdown:x=>n("pointerdown",x,$),onPointerup:x=>n("pointerup",x,$),onPointermove:x=>n("pointermove",x,$)}}).filter(u=>u!=null))});function r(o){return o==null||o==="solid"?null:o==="dashed"?"4 4":o==="dotted"?"1 3":o==="dotdash"?"1 3 4 3":o==="longdash"?"8 4":o==="twodash"?"2 2 6 2":o.includes(" ")?o:o.split("").map(s=>+("0x"+s)).join(" ")}return(o,s)=>(X(),J("g",null,[(X(!0),J(ue,null,Le(i.value,a=>(X(),J("g",null,[(X(!0),J(ue,null,Le(a,l=>(X(),J(ue,null,[l.label?(X(),J("text",we({key:0,ref_for:!0},l),Ee(l.label),17)):rt("",!0)],64))),256))]))),256))]))}},$g={__name:"CoreSvgTextsegment",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i=ee(()=>{let o=-e.layout.fullWidth*e.extendX-e.layout.l,s=e.layout.fullWidth*(1+e.extendX)-e.layout.l,a=-e.layout.fullHeight*e.extendY-e.layout.t,l=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(c=>c.map(({x:u,xend:h,y:f,yend:d,color:g,size:b=4,label:O,stroke:F,linewidth:D,linetype:z,alpha:V,xtranslate:$=0,ytranslate:U=0,$raw:W})=>{let A=r(String(O)),x=(h-u)/(A.length-1||1),T=(d-f)/(A.length-1||1),{x:v,y:H}=e.coord2pos({x:u,y:f}),{x:Z,y:B}=e.coord2pos({x:h,y:d});return v<o&&Z<o||v>s&&Z>s||H<a&&B<a||H>l&&B>l?null:{content:A.map((S,_)=>{let{x:R,y:N}=e.coord2pos({x:u+_*x,y:f+_*T});return{bind:{x:R,y:N,"text-anchor":"middle","alignment-baseline":"central"},label:S}}),fill:g,"font-size":b*4,stroke:F,"stroke-width":D,"stroke-dasharray":z,"fill-opacity":V,"stroke-opacity":V,transform:$||U?`translate(${$}, ${U})`:null,onClick:S=>n("click",S,W),onContextmenu:S=>n("contextmenu",S,W),onPointerover:S=>n("pointerover",S,W),onPointerout:S=>n("pointerout",S,W),onPointerenter:S=>n("pointerenter",S,W),onPointerleave:S=>n("pointerleave",S,W),onPointerdown:S=>n("pointerdown",S,W),onPointerup:S=>n("pointerup",S,W),onPointermove:S=>n("pointermove",S,W)}}).filter(u=>u!=null))});function r(o){let s=[];for(let a=0;a<o.length;a++)if(o[a]==""){let l=a+1;for(;l<o.length&&o[l]!="";)l++;s.push(o.slice(a+1,l)),a=l}else s.push(o[a]);return s}return(o,s)=>(X(),J("g",null,[(X(!0),J(ue,null,Le(i.value,a=>(X(),J("g",null,[(X(!0),J(ue,null,Le(a,l=>(X(),J("text",we({ref_for:!0},{...l,content:null}),[(X(!0),J(ue,null,Le(l.content,c=>(X(),J(ue,null,[c.label?(X(),J("tspan",we({key:0,ref_for:!0},c.bind),Ee(c.label),17)):rt("",!0)],64))),256))],16))),256))]))),256))]))}},Ng={__name:"CoreSvgPolygon",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object},emits:["click","contextmenu","pointerover","pointerout","pointerenter","pointerleave","pointermove","pointerdown","pointerup"],setup(e,{emit:t}){const n=t,i=ee(()=>{let r=-e.layout.fullWidth*e.extendX-e.layout.l,o=e.layout.fullWidth*(1+e.extendX)-e.layout.l,s=-e.layout.fullHeight*e.extendY-e.layout.t,a=e.layout.fullHeight*(1+e.extendY)-e.layout.t;return e.data.map(l=>l.map(({points:c,fill:u,color:h,linewidth:f,alpha:d,xtranslate:g=0,ytranslate:b=0,$raw:O})=>(c=c.map(D=>e.coord2pos(D)),c.every(D=>D.x<r)||c.every(D=>D.x>o)||c.every(D=>D.y<s)||c.every(D=>D.y>a)?null:{points:c.map(D=>`${D.x},${D.y}`).join(" "),fill:u||"black",stroke:h,"stroke-width":f,"fill-opacity":d,"stroke-opacity":d,transform:g||b?`translate(${g}, ${b})`:null,onClick:D=>n("click",D,O),onContextmenu:D=>n("contextmenu",D,O),onPointerover:D=>n("pointerover",D,O),onPointerout:D=>n("pointerout",D,O),onPointerenter:D=>n("pointerenter",D,O),onPointerleave:D=>n("pointerleave",D,O),onPointerdown:D=>n("pointerdown",D,O),onPointerup:D=>n("pointerup",D,O),onPointermove:D=>n("pointermove",D,O)})).filter(c=>c!=null))});return(r,o)=>(X(),J("g",null,[(X(!0),J(ue,null,Le(i.value,s=>(X(),J("g",null,[(X(!0),J(ue,null,Le(s,a=>(X(),J("polygon",we({ref_for:!0},a),null,16))),256))]))),256))]))}},Eg=Object.freeze(Object.defineProperty({__proto__:null,line:ea,point:Cg,polygon:Ng,rect:ta,stick:ea,text:Wg,textsegment:$g,tile:ta},Symbol.toStringTag,{value:"Module"})),Ws="-",Ig=e=>{const t=Vg(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:i}=e;return{getClassGroupId:s=>{const a=s.split(Ws);return a[0]===""&&a.length!==1&&a.shift(),du(a,t)||Og(s)},getConflictingClassGroupIds:(s,a)=>{const l=n[s]||[];return a&&i[s]?[...l,...i[s]]:l}}},du=(e,t)=>{if(e.length===0)return t.classGroupId;const n=e[0],i=t.nextPart.get(n),r=i?du(e.slice(1),i):void 0;if(r)return r;if(t.validators.length===0)return;const o=e.join(Ws);return t.validators.find(({validator:s})=>s(o))?.classGroupId},na=/^\[(.+)\]$/,Og=e=>{if(na.test(e)){const t=na.exec(e)[1],n=t?.substring(0,t.indexOf(":"));if(n)return"arbitrary.."+n}},Vg=e=>{const{theme:t,classGroups:n}=e,i={nextPart:new Map,validators:[]};for(const r in n)Zo(n[r],i,r,t);return i},Zo=(e,t,n,i)=>{e.forEach(r=>{if(typeof r=="string"){const o=r===""?t:ia(t,r);o.classGroupId=n;return}if(typeof r=="function"){if(Dg(r)){Zo(r(i),t,n,i);return}t.validators.push({validator:r,classGroupId:n});return}Object.entries(r).forEach(([o,s])=>{Zo(s,ia(t,o),n,i)})})},ia=(e,t)=>{let n=e;return t.split(Ws).forEach(i=>{n.nextPart.has(i)||n.nextPart.set(i,{nextPart:new Map,validators:[]}),n=n.nextPart.get(i)}),n},Dg=e=>e.isThemeGetter,Rg=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,n=new Map,i=new Map;const r=(o,s)=>{n.set(o,s),t++,t>e&&(t=0,i=n,n=new Map)};return{get(o){let s=n.get(o);if(s!==void 0)return s;if((s=i.get(o))!==void 0)return r(o,s),s},set(o,s){n.has(o)?n.set(o,s):r(o,s)}}},Qo="!",es=":",Fg=es.length,jg=e=>{const{prefix:t,experimentalParseClassName:n}=e;let i=r=>{const o=[];let s=0,a=0,l=0,c;for(let g=0;g<r.length;g++){let b=r[g];if(s===0&&a===0){if(b===es){o.push(r.slice(l,g)),l=g+Fg;continue}if(b==="/"){c=g;continue}}b==="["?s++:b==="]"?s--:b==="("?a++:b===")"&&a--}const u=o.length===0?r:r.substring(l),h=zg(u),f=h!==u,d=c&&c>l?c-l:void 0;return{modifiers:o,hasImportantModifier:f,baseClassName:h,maybePostfixModifierPosition:d}};if(t){const r=t+es,o=i;i=s=>s.startsWith(r)?o(s.substring(r.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:s,maybePostfixModifierPosition:void 0}}if(n){const r=i;i=o=>n({className:o,parseClassName:r})}return i},zg=e=>e.endsWith(Qo)?e.substring(0,e.length-1):e.startsWith(Qo)?e.substring(1):e,Hg=e=>{const t=Object.fromEntries(e.orderSensitiveModifiers.map(i=>[i,!0]));return i=>{if(i.length<=1)return i;const r=[];let o=[];return i.forEach(s=>{s[0]==="["||t[s]?(r.push(...o.sort(),s),o=[]):o.push(s)}),r.push(...o.sort()),r}},Bg=e=>({cache:Rg(e.cacheSize),parseClassName:jg(e),sortModifiers:Hg(e),...Ig(e)}),Xg=/\s+/,Yg=(e,t)=>{const{parseClassName:n,getClassGroupId:i,getConflictingClassGroupIds:r,sortModifiers:o}=t,s=[],a=e.trim().split(Xg);let l="";for(let c=a.length-1;c>=0;c-=1){const u=a[c],{isExternal:h,modifiers:f,hasImportantModifier:d,baseClassName:g,maybePostfixModifierPosition:b}=n(u);if(h){l=u+(l.length>0?" "+l:l);continue}let O=!!b,F=i(O?g.substring(0,b):g);if(!F){if(!O){l=u+(l.length>0?" "+l:l);continue}if(F=i(g),!F){l=u+(l.length>0?" "+l:l);continue}O=!1}const D=o(f).join(":"),z=d?D+Qo:D,V=z+F;if(s.includes(V))continue;s.push(V);const $=r(F,O);for(let U=0;U<$.length;++U){const W=$[U];s.push(z+W)}l=u+(l.length>0?" "+l:l)}return l};function qg(){let e=0,t,n,i="";for(;e<arguments.length;)(t=arguments[e++])&&(n=mu(t))&&(i&&(i+=" "),i+=n);return i}const mu=e=>{if(typeof e=="string")return e;let t,n="";for(let i=0;i<e.length;i++)e[i]&&(t=mu(e[i]))&&(n&&(n+=" "),n+=t);return n};function Gg(e,...t){let n,i,r,o=s;function s(l){const c=t.reduce((u,h)=>h(u),e());return n=Bg(c),i=n.cache.get,r=n.cache.set,o=a,a(l)}function a(l){const c=i(l);if(c)return c;const u=Yg(l,n);return r(l,u),u}return function(){return o(qg.apply(null,arguments))}}const Re=e=>{const t=n=>n[e]||[];return t.isThemeGetter=!0,t},gu=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,pu=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Ug=/^\d+\/\d+$/,Kg=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Jg=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Zg=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,Qg=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,ep=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Mn=e=>Ug.test(e),de=e=>!!e&&!Number.isNaN(Number(e)),nn=e=>!!e&&Number.isInteger(Number(e)),vo=e=>e.endsWith("%")&&de(e.slice(0,-1)),jt=e=>Kg.test(e),tp=()=>!0,np=e=>Jg.test(e)&&!Zg.test(e),yu=()=>!1,ip=e=>Qg.test(e),rp=e=>ep.test(e),op=e=>!te(e)&&!ne(e),sp=e=>Kn(e,wu,yu),te=e=>gu.test(e),fn=e=>Kn(e,vu,np),So=e=>Kn(e,hp,de),ra=e=>Kn(e,xu,yu),lp=e=>Kn(e,bu,rp),Xi=e=>Kn(e,Su,ip),ne=e=>pu.test(e),ti=e=>Jn(e,vu),ap=e=>Jn(e,fp),oa=e=>Jn(e,xu),cp=e=>Jn(e,wu),up=e=>Jn(e,bu),Yi=e=>Jn(e,Su,!0),Kn=(e,t,n)=>{const i=gu.exec(e);return i?i[1]?t(i[1]):n(i[2]):!1},Jn=(e,t,n=!1)=>{const i=pu.exec(e);return i?i[1]?t(i[1]):n:!1},xu=e=>e==="position"||e==="percentage",bu=e=>e==="image"||e==="url",wu=e=>e==="length"||e==="size"||e==="bg-size",vu=e=>e==="length",hp=e=>e==="number",fp=e=>e==="family-name",Su=e=>e==="shadow",dp=()=>{const e=Re("color"),t=Re("font"),n=Re("text"),i=Re("font-weight"),r=Re("tracking"),o=Re("leading"),s=Re("breakpoint"),a=Re("container"),l=Re("spacing"),c=Re("radius"),u=Re("shadow"),h=Re("inset-shadow"),f=Re("text-shadow"),d=Re("drop-shadow"),g=Re("blur"),b=Re("perspective"),O=Re("aspect"),F=Re("ease"),D=Re("animate"),z=()=>["auto","avoid","all","avoid-page","page","left","right","column"],V=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],$=()=>[...V(),ne,te],U=()=>["auto","hidden","clip","visible","scroll"],W=()=>["auto","contain","none"],A=()=>[ne,te,l],x=()=>[Mn,"full","auto",...A()],T=()=>[nn,"none","subgrid",ne,te],v=()=>["auto",{span:["full",nn,ne,te]},nn,ne,te],H=()=>[nn,"auto",ne,te],Z=()=>["auto","min","max","fr",ne,te],B=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],le=()=>["start","end","center","stretch","center-safe","end-safe"],re=()=>["auto",...A()],S=()=>[Mn,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...A()],_=()=>[e,ne,te],R=()=>[...V(),oa,ra,{position:[ne,te]}],N=()=>["no-repeat",{repeat:["","x","y","space","round"]}],Y=()=>["auto","cover","contain",cp,sp,{size:[ne,te]}],Pe=()=>[vo,ti,fn],fe=()=>["","none","full",c,ne,te],ke=()=>["",de,ti,fn],mt=()=>["solid","dashed","dotted","double"],et=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],xe=()=>[de,vo,oa,ra],ct=()=>["","none",g,ne,te],ze=()=>["none",de,ne,te],ye=()=>["none",de,ne,te],Tn=()=>[de,ne,te],p=()=>[Mn,"full",...A()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[jt],breakpoint:[jt],color:[tp],container:[jt],"drop-shadow":[jt],ease:["in","out","in-out"],font:[op],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[jt],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[jt],shadow:[jt],spacing:["px",de],text:[jt],"text-shadow":[jt],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",Mn,te,ne,O]}],container:["container"],columns:[{columns:[de,te,ne,a]}],"break-after":[{"break-after":z()}],"break-before":[{"break-before":z()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:$()}],overflow:[{overflow:U()}],"overflow-x":[{"overflow-x":U()}],"overflow-y":[{"overflow-y":U()}],overscroll:[{overscroll:W()}],"overscroll-x":[{"overscroll-x":W()}],"overscroll-y":[{"overscroll-y":W()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:x()}],"inset-x":[{"inset-x":x()}],"inset-y":[{"inset-y":x()}],start:[{start:x()}],end:[{end:x()}],top:[{top:x()}],right:[{right:x()}],bottom:[{bottom:x()}],left:[{left:x()}],visibility:["visible","invisible","collapse"],z:[{z:[nn,"auto",ne,te]}],basis:[{basis:[Mn,"full","auto",a,...A()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[de,Mn,"auto","initial","none",te]}],grow:[{grow:["",de,ne,te]}],shrink:[{shrink:["",de,ne,te]}],order:[{order:[nn,"first","last","none",ne,te]}],"grid-cols":[{"grid-cols":T()}],"col-start-end":[{col:v()}],"col-start":[{"col-start":H()}],"col-end":[{"col-end":H()}],"grid-rows":[{"grid-rows":T()}],"row-start-end":[{row:v()}],"row-start":[{"row-start":H()}],"row-end":[{"row-end":H()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":Z()}],"auto-rows":[{"auto-rows":Z()}],gap:[{gap:A()}],"gap-x":[{"gap-x":A()}],"gap-y":[{"gap-y":A()}],"justify-content":[{justify:[...B(),"normal"]}],"justify-items":[{"justify-items":[...le(),"normal"]}],"justify-self":[{"justify-self":["auto",...le()]}],"align-content":[{content:["normal",...B()]}],"align-items":[{items:[...le(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...le(),{baseline:["","last"]}]}],"place-content":[{"place-content":B()}],"place-items":[{"place-items":[...le(),"baseline"]}],"place-self":[{"place-self":["auto",...le()]}],p:[{p:A()}],px:[{px:A()}],py:[{py:A()}],ps:[{ps:A()}],pe:[{pe:A()}],pt:[{pt:A()}],pr:[{pr:A()}],pb:[{pb:A()}],pl:[{pl:A()}],m:[{m:re()}],mx:[{mx:re()}],my:[{my:re()}],ms:[{ms:re()}],me:[{me:re()}],mt:[{mt:re()}],mr:[{mr:re()}],mb:[{mb:re()}],ml:[{ml:re()}],"space-x":[{"space-x":A()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":A()}],"space-y-reverse":["space-y-reverse"],size:[{size:S()}],w:[{w:[a,"screen",...S()]}],"min-w":[{"min-w":[a,"screen","none",...S()]}],"max-w":[{"max-w":[a,"screen","none","prose",{screen:[s]},...S()]}],h:[{h:["screen","lh",...S()]}],"min-h":[{"min-h":["screen","lh","none",...S()]}],"max-h":[{"max-h":["screen","lh",...S()]}],"font-size":[{text:["base",n,ti,fn]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[i,ne,So]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",vo,te]}],"font-family":[{font:[ap,te,t]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[r,ne,te]}],"line-clamp":[{"line-clamp":[de,"none",ne,So]}],leading:[{leading:[o,...A()]}],"list-image":[{"list-image":["none",ne,te]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",ne,te]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:_()}],"text-color":[{text:_()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...mt(),"wavy"]}],"text-decoration-thickness":[{decoration:[de,"from-font","auto",ne,fn]}],"text-decoration-color":[{decoration:_()}],"underline-offset":[{"underline-offset":[de,"auto",ne,te]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:A()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",ne,te]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",ne,te]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:R()}],"bg-repeat":[{bg:N()}],"bg-size":[{bg:Y()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},nn,ne,te],radial:["",ne,te],conic:[nn,ne,te]},up,lp]}],"bg-color":[{bg:_()}],"gradient-from-pos":[{from:Pe()}],"gradient-via-pos":[{via:Pe()}],"gradient-to-pos":[{to:Pe()}],"gradient-from":[{from:_()}],"gradient-via":[{via:_()}],"gradient-to":[{to:_()}],rounded:[{rounded:fe()}],"rounded-s":[{"rounded-s":fe()}],"rounded-e":[{"rounded-e":fe()}],"rounded-t":[{"rounded-t":fe()}],"rounded-r":[{"rounded-r":fe()}],"rounded-b":[{"rounded-b":fe()}],"rounded-l":[{"rounded-l":fe()}],"rounded-ss":[{"rounded-ss":fe()}],"rounded-se":[{"rounded-se":fe()}],"rounded-ee":[{"rounded-ee":fe()}],"rounded-es":[{"rounded-es":fe()}],"rounded-tl":[{"rounded-tl":fe()}],"rounded-tr":[{"rounded-tr":fe()}],"rounded-br":[{"rounded-br":fe()}],"rounded-bl":[{"rounded-bl":fe()}],"border-w":[{border:ke()}],"border-w-x":[{"border-x":ke()}],"border-w-y":[{"border-y":ke()}],"border-w-s":[{"border-s":ke()}],"border-w-e":[{"border-e":ke()}],"border-w-t":[{"border-t":ke()}],"border-w-r":[{"border-r":ke()}],"border-w-b":[{"border-b":ke()}],"border-w-l":[{"border-l":ke()}],"divide-x":[{"divide-x":ke()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":ke()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...mt(),"hidden","none"]}],"divide-style":[{divide:[...mt(),"hidden","none"]}],"border-color":[{border:_()}],"border-color-x":[{"border-x":_()}],"border-color-y":[{"border-y":_()}],"border-color-s":[{"border-s":_()}],"border-color-e":[{"border-e":_()}],"border-color-t":[{"border-t":_()}],"border-color-r":[{"border-r":_()}],"border-color-b":[{"border-b":_()}],"border-color-l":[{"border-l":_()}],"divide-color":[{divide:_()}],"outline-style":[{outline:[...mt(),"none","hidden"]}],"outline-offset":[{"outline-offset":[de,ne,te]}],"outline-w":[{outline:["",de,ti,fn]}],"outline-color":[{outline:_()}],shadow:[{shadow:["","none",u,Yi,Xi]}],"shadow-color":[{shadow:_()}],"inset-shadow":[{"inset-shadow":["none",h,Yi,Xi]}],"inset-shadow-color":[{"inset-shadow":_()}],"ring-w":[{ring:ke()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:_()}],"ring-offset-w":[{"ring-offset":[de,fn]}],"ring-offset-color":[{"ring-offset":_()}],"inset-ring-w":[{"inset-ring":ke()}],"inset-ring-color":[{"inset-ring":_()}],"text-shadow":[{"text-shadow":["none",f,Yi,Xi]}],"text-shadow-color":[{"text-shadow":_()}],opacity:[{opacity:[de,ne,te]}],"mix-blend":[{"mix-blend":[...et(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":et()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[de]}],"mask-image-linear-from-pos":[{"mask-linear-from":xe()}],"mask-image-linear-to-pos":[{"mask-linear-to":xe()}],"mask-image-linear-from-color":[{"mask-linear-from":_()}],"mask-image-linear-to-color":[{"mask-linear-to":_()}],"mask-image-t-from-pos":[{"mask-t-from":xe()}],"mask-image-t-to-pos":[{"mask-t-to":xe()}],"mask-image-t-from-color":[{"mask-t-from":_()}],"mask-image-t-to-color":[{"mask-t-to":_()}],"mask-image-r-from-pos":[{"mask-r-from":xe()}],"mask-image-r-to-pos":[{"mask-r-to":xe()}],"mask-image-r-from-color":[{"mask-r-from":_()}],"mask-image-r-to-color":[{"mask-r-to":_()}],"mask-image-b-from-pos":[{"mask-b-from":xe()}],"mask-image-b-to-pos":[{"mask-b-to":xe()}],"mask-image-b-from-color":[{"mask-b-from":_()}],"mask-image-b-to-color":[{"mask-b-to":_()}],"mask-image-l-from-pos":[{"mask-l-from":xe()}],"mask-image-l-to-pos":[{"mask-l-to":xe()}],"mask-image-l-from-color":[{"mask-l-from":_()}],"mask-image-l-to-color":[{"mask-l-to":_()}],"mask-image-x-from-pos":[{"mask-x-from":xe()}],"mask-image-x-to-pos":[{"mask-x-to":xe()}],"mask-image-x-from-color":[{"mask-x-from":_()}],"mask-image-x-to-color":[{"mask-x-to":_()}],"mask-image-y-from-pos":[{"mask-y-from":xe()}],"mask-image-y-to-pos":[{"mask-y-to":xe()}],"mask-image-y-from-color":[{"mask-y-from":_()}],"mask-image-y-to-color":[{"mask-y-to":_()}],"mask-image-radial":[{"mask-radial":[ne,te]}],"mask-image-radial-from-pos":[{"mask-radial-from":xe()}],"mask-image-radial-to-pos":[{"mask-radial-to":xe()}],"mask-image-radial-from-color":[{"mask-radial-from":_()}],"mask-image-radial-to-color":[{"mask-radial-to":_()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":V()}],"mask-image-conic-pos":[{"mask-conic":[de]}],"mask-image-conic-from-pos":[{"mask-conic-from":xe()}],"mask-image-conic-to-pos":[{"mask-conic-to":xe()}],"mask-image-conic-from-color":[{"mask-conic-from":_()}],"mask-image-conic-to-color":[{"mask-conic-to":_()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:R()}],"mask-repeat":[{mask:N()}],"mask-size":[{mask:Y()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",ne,te]}],filter:[{filter:["","none",ne,te]}],blur:[{blur:ct()}],brightness:[{brightness:[de,ne,te]}],contrast:[{contrast:[de,ne,te]}],"drop-shadow":[{"drop-shadow":["","none",d,Yi,Xi]}],"drop-shadow-color":[{"drop-shadow":_()}],grayscale:[{grayscale:["",de,ne,te]}],"hue-rotate":[{"hue-rotate":[de,ne,te]}],invert:[{invert:["",de,ne,te]}],saturate:[{saturate:[de,ne,te]}],sepia:[{sepia:["",de,ne,te]}],"backdrop-filter":[{"backdrop-filter":["","none",ne,te]}],"backdrop-blur":[{"backdrop-blur":ct()}],"backdrop-brightness":[{"backdrop-brightness":[de,ne,te]}],"backdrop-contrast":[{"backdrop-contrast":[de,ne,te]}],"backdrop-grayscale":[{"backdrop-grayscale":["",de,ne,te]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[de,ne,te]}],"backdrop-invert":[{"backdrop-invert":["",de,ne,te]}],"backdrop-opacity":[{"backdrop-opacity":[de,ne,te]}],"backdrop-saturate":[{"backdrop-saturate":[de,ne,te]}],"backdrop-sepia":[{"backdrop-sepia":["",de,ne,te]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":A()}],"border-spacing-x":[{"border-spacing-x":A()}],"border-spacing-y":[{"border-spacing-y":A()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",ne,te]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[de,"initial",ne,te]}],ease:[{ease:["linear","initial",F,ne,te]}],delay:[{delay:[de,ne,te]}],animate:[{animate:["none",D,ne,te]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[b,ne,te]}],"perspective-origin":[{"perspective-origin":$()}],rotate:[{rotate:ze()}],"rotate-x":[{"rotate-x":ze()}],"rotate-y":[{"rotate-y":ze()}],"rotate-z":[{"rotate-z":ze()}],scale:[{scale:ye()}],"scale-x":[{"scale-x":ye()}],"scale-y":[{"scale-y":ye()}],"scale-z":[{"scale-z":ye()}],"scale-3d":["scale-3d"],skew:[{skew:Tn()}],"skew-x":[{"skew-x":Tn()}],"skew-y":[{"skew-y":Tn()}],transform:[{transform:[ne,te,"","none","gpu","cpu"]}],"transform-origin":[{origin:$()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:p()}],"translate-x":[{"translate-x":p()}],"translate-y":[{"translate-y":p()}],"translate-z":[{"translate-z":p()}],"translate-none":["translate-none"],accent:[{accent:_()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:_()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",ne,te]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":A()}],"scroll-mx":[{"scroll-mx":A()}],"scroll-my":[{"scroll-my":A()}],"scroll-ms":[{"scroll-ms":A()}],"scroll-me":[{"scroll-me":A()}],"scroll-mt":[{"scroll-mt":A()}],"scroll-mr":[{"scroll-mr":A()}],"scroll-mb":[{"scroll-mb":A()}],"scroll-ml":[{"scroll-ml":A()}],"scroll-p":[{"scroll-p":A()}],"scroll-px":[{"scroll-px":A()}],"scroll-py":[{"scroll-py":A()}],"scroll-ps":[{"scroll-ps":A()}],"scroll-pe":[{"scroll-pe":A()}],"scroll-pt":[{"scroll-pt":A()}],"scroll-pr":[{"scroll-pr":A()}],"scroll-pb":[{"scroll-pb":A()}],"scroll-pl":[{"scroll-pl":A()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",ne,te]}],fill:[{fill:["none",..._()]}],"stroke-w":[{stroke:[de,ti,fn,So]}],stroke:[{stroke:["none",..._()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},mp=Gg(dp),gp={__name:"CoreLayer",props:{extendX:{type:Number,default:0},extendY:{type:Number,default:0},data:Object,coord2pos:Function,layout:Object,geom:String,render:{type:String,default:"auto"},class:{type:String,default:""}},setup(e,{expose:t}){const n={svg:Eg,canvas:Mg},i=ee(()=>e.render=="auto"?e.data.map(a=>a.length).reduce((a,l)=>a+l,0)>1e3?"canvas":"svg":n[e.render][e.geom]!=null?e.render:"svg"),r=ee(()=>mp(e.class,i.value=="canvas"?"cursor-default":"")),o=at("layer");return t({dispatchEvent:s=>o.value?.dispatchEvent?.(s)}),(s,a)=>(X(),lt(gs(n[i.value][e.geom]),{ref_key:"layer",ref:o,data:e.data,coord2pos:e.coord2pos,"extend-x":e.extendX,"extend-y":e.extendY,layout:e.layout,class:Sn(r.value)},null,8,["data","coord2pos","extend-x","extend-y","layout","class"]))}},pp={class:"vv-interactive"},yp=["onPointerdown"],sa={__name:"CoreSelection",props:Ot({coord2pos:Function,pos2coord:Function,layout:Object,action:Array},{selection:{},selectionModifiers:{}}),emits:Ot(["select","selecting"],["update:selection"]),setup(e,{emit:t}){const n=Ie(e,"selection"),i=ee(()=>{if(n.value==null||n.value.hidden)return{};if(["xmin","xmax","ymin","ymax"].every(b=>n.value?.[b]==null))return{};let s=10,{xmin:a,xmax:l,ymin:c,ymax:u}=e.coord2pos(n.value),h=e.coord2pos(n.value,{unlimited:!0});a!=null&&l!=null&&([a,l]=[a,l].sort((b,O)=>b-O)),c!=null&&u!=null&&([c,u]=[c,u].sort((b,O)=>b-O));let f=l-a,d=u-c,g={"":{x:a,y:c,width:f,height:d,fill:"black","fill-opacity":.1,class:"pointer-events-none"}};return e.action==null||(h.xmin!=null&&(g.l={x:a-s/2,y:c,width:s,height:d,class:"cursor-ew-resize"}),h.xmax!=null&&(g.r={x:l-s/2,y:c,width:s,height:d,class:"cursor-ew-resize"}),h.ymin!=null&&(g.t={x:a,y:c-s/2,width:f,height:s,class:"cursor-ns-resize"}),h.ymax!=null&&(g.b={x:a,y:u-s/2,width:f,height:s,class:"cursor-ns-resize"}),h.xmin!=null&&h.ymin!=null&&(g.tl={x:a-s/2,y:c-s/2,width:s,height:s,class:"cursor-nwse-resize"}),h.xmax!=null&&h.ymin!=null&&(g.tr={x:l-s/2,y:c-s/2,width:s,height:s,class:"cursor-nesw-resize"}),h.xmin!=null&&h.ymax!=null&&(g.bl={x:a-s/2,y:u-s/2,width:s,height:s,class:"cursor-nesw-resize"}),h.xmax!=null&&h.ymax!=null&&(g.br={x:l-s/2,y:u-s/2,width:s,height:s,class:"cursor-nwse-resize"})),g}),r=t;function o(s,a){if(!e.action.find(g=>g.action=="select"&&["buttons","ctrlKey","shiftKey","altKey","metaKey"].every(b=>g[b]==s[b])))return;s.stopPropagation(),s.preventDefault(),s.target.setPointerCapture(s.pointerId);let c=e.coord2pos(n.value,{unlimited:!0}),{xmin:u,xmax:h,ymin:f,ymax:d}=c;s.target.onpointermove=g=>{a.includes("l")&&u!=null&&(u+=g.movementX),a.includes("r")&&h!=null&&(h+=g.movementX),a.includes("t")&&f!=null&&(f+=g.movementY),a.includes("b")&&d!=null&&(d+=g.movementY);let[b,O]=u>h?[h,u]:[u,h],[F,D]=f>d?[d,f]:[f,d],z={xmin:b,xmax:O,ymin:F,ymax:D};r("selecting",e.pos2coord(z))},s.target.onpointerup=g=>{s.target.onpointermove=null,s.target.onpointerup=null;let[b,O]=u>h?[h,u]:[u,h],[F,D]=f>d?[d,f]:[f,d],z={xmin:b,xmax:O,ymin:F,ymax:D},V=e.pos2coord(z);n.value=V;let $=Ro(g);$.type="resize",Object.assign($,V),r("selecting",null),r("select",$)}}return(s,a)=>(X(),J("g",pp,[(X(!0),J(ue,null,Le(i.value,(l,c)=>(X(),J("rect",we({fill:"transparent"},{ref_for:!0},l,{onPointerdown:u=>o(u,c)}),null,16,yp))),256))]))}},xp=["id"],bp=["width","height"],wp=["transform","width","height","fill"],vp=["transform"],Sp=["transform","clip-path"],_p=["transform"],kp={__name:"CorePlot",props:Ot({schema:Object,layers:Array,coordScale:Object,coordDisplay:Object,coordLevels:Object,levels:Object,scales:Object,axes:{type:Array,default:()=>[]},theme:Object,action:{type:Array,default:()=>[]}},{range:{},rangeModifiers:{},selection:{},selectionModifiers:{},activeSelection:{},activeSelectionModifiers:{},translateX:{type:Number,default:0},translateXModifiers:{},translateY:{type:Number,default:0},translateYModifiers:{},transcaleX:{},transcaleXModifiers:{},transcaleY:{},transcaleYModifiers:{}}),emits:Ot(["click","dblclick","contextmenu","pointerdown","pointerup","pointerover","pointerout","pointerenter","pointerleave","pointermove","wheel","select","move","zoom","rescale","nudge","rangechange"],["update:range","update:selection","update:activeSelection","update:translateX","update:translateY","update:transcaleX","update:transcaleY"]),setup(e,{expose:t,emit:n}){const i=Th(),r=e,o=Ie(e,"range"),s=Ie(e,"selection"),a=n,l=Ct(()=>r.theme),c=zr(r.coordScale?.expandAdd||{});Qe(()=>r.coordScale,m=>{o.value=m.range,c.value=m.expandAdd},{immediate:!0});const u=Ie(e,"activeSelection"),h=Ie(e,"translateX"),f=Ie(e,"translateY"),d=Ie(e,"transcaleX"),g=Ie(e,"transcaleY"),b=Ct(()=>{let m=c.value.x??0;Array.isArray(m)?m={min:m[0],max:m[1]}:typeof m=="number"&&(m={min:m,max:m});let y=c.value.y??0;return Array.isArray(y)?y={min:y[0],max:y[1]}:typeof y=="number"&&(y={min:y,max:y}),{x:m,y}}),O=Ct(()=>{let m=r.coordDisplay?.expandMult?.x??0;Array.isArray(m)?m={min:m[0],max:m[1]}:typeof m=="number"&&(m={min:m,max:m});let y=r.coordDisplay?.expandMult?.y??0;return Array.isArray(y)?y={min:y[0],max:y[1]}:typeof y=="number"&&(y={min:y,max:y}),{x:m,y}}),F=Ct(()=>({x:r.coordDisplay?.reverse?.x??!1,y:r.coordDisplay?.reverse?.y??!1})),D=Ct(()=>r.action),z=at("svg"),V=at("layers"),{width:$,height:U}=Sc(z),W=ee(()=>new og(r.schema,r.layers)),A=Ct(()=>{let m=Object.fromEntries(["left","right","top","bottom"].map(L=>[L,r.axes.some(j=>j.position==L)&&l.plot.padding[L]||0])),y=l.plot.margin.left+m.left,k=l.plot.margin.right+m.right,M=l.plot.margin.top+m.top,E=l.plot.margin.bottom+m.bottom;return M+E>U.value&&(M=U.value*(M/(M+E)),E=U.value-M),y+k>$.value&&(y=$.value*(y/(y+k)),k=$.value-y),{l:y,r:k,t:M,b:E,left:y,right:$.value-k,top:M,bottom:U.value-E,width:$.value-y-k,height:U.value-M-E}}),x=ee(()=>{let m=[],y=null,k=h.value+B.left,M=f.value+B.top;(k!=0||M!=0)&&m.push(`translate(${k}, ${M})`);let E=d.value?.ratio??1,L=g.value?.ratio??1;return(E!=1||L!=1)&&(m.push(`scale(${E}, ${L})`),y=`${(d.value?.origin??.5)*A.width-B.left} ${(g.value?.origin??.5)*A.height-B.top}`),{transform:m.join(" "),"transform-origin":y}}),T=ee(()=>W.value.useScales(r.scales,r.levels).useCoordLevels(r.coordLevels).render(o.value,b,O,r.axes,r.coordScale.minRange));t({vplot:T});function v({x:m,y,xmin:k,xmax:M,ymin:E,ymax:L}={}){let j=T.value.coordScales,{width:P,height:q}=B,Q={};return m!=null&&(Q.x=j.x.invert(F.x?1-m/P:m/P)),y!=null&&(Q.y=j.y.invert(F.y?y/q:1-y/q)),F.x?(M!=null&&(Q.xmin=j.x.invert(1-M/P)),k!=null&&(Q.xmax=j.x.invert(1-k/P))):(k!=null&&(Q.xmin=j.x.invert(k/P)),M!=null&&(Q.xmax=j.x.invert(M/P))),F.y?(L!=null&&(Q.ymax=j.y.invert(L/q)),E!=null&&(Q.ymin=j.y.invert(E/q))):(E!=null&&(Q.ymax=j.y.invert(1-E/q)),L!=null&&(Q.ymin=j.y.invert(1-L/q))),Q}function H({x:m,y,xmin:k,xmax:M,ymin:E,ymax:L}={},{unlimited:j=!1,oob:P=R}={}){let q=T.value.coordScales,{l:Q,r:oe,t:ae,b:se,width:me,height:Ae}=B,ge={},Ye={min:-Q,max:me+oe},xt={min:-ae,max:Ae+se};return m!=null&&(ge.x=P(me*(F.x?1-q.x(m):q.x(m)),Ye)),y!=null&&(ge.y=P(Ae*(F.y?q.y(y):1-q.y(y)),xt)),[k,M,E,L].every(Ni=>Ni==null)||(F.x?(M!=null&&(ge.xmin=P(me*(1-q.x(M)),Ye)),k!=null&&(ge.xmax=P(me*(1-q.x(k)),Ye))):(k!=null&&(ge.xmin=P(me*q.x(k),Ye)),M!=null&&(ge.xmax=P(me*q.x(M),Ye))),F.y?(E!=null&&(ge.ymin=P(Ae*q.y(E),xt)),L!=null&&(ge.ymax=P(Ae*q.y(L),xt))):(L!=null&&(ge.ymin=P(Ae*(1-q.y(L)),xt)),E!=null&&(ge.ymax=P(Ae*(1-q.y(E)),xt))),j||(ge.xmin==null&&(ge.xmin=-Q),ge.xmax==null&&(ge.xmax=me+oe),ge.ymin==null&&(ge.ymin=-ae),ge.ymax==null&&(ge.ymax=Ae+se))),ge}function Z({min:m,max:y}={},{min:k=0,max:M=0}={}){let E=y-m,L=m-k*E,j=y+M*E,P=j-L;return{min:P==0?0:(m-L)/P,max:P==0?0:(j-y)/P}}const B=Ct(()=>{let m=T.value.coordScales,y=O,{min:k,max:M}=Z(m.x.range,y.x),{min:E,max:L}=Z(m.y.range,y.y),{width:j,height:P}=A;return{left:j*k||0,right:j*(1-M)||0,top:P*L||0,bottom:P*(1-E)||0,l:j*k||0,r:j*M||0,t:P*L||0,b:P*E||0,width:j*(1-k-M),height:P*(1-L-E),fullWidth:j,fullHeight:P}});function le(m,y){y=y||m.currentTarget;let k=y.getBoundingClientRect();return v({x:m.clientX-(k.left+A.left+B.left),y:m.clientY-(k.top+A.top+B.top)})}function re(m,y){y=y||m.currentTarget;let k=y.getBoundingClientRect();return{l:m.clientX-(k.left+A.left+B.left),t:m.clientY-(k.top+A.top+B.top),r:k.left+A.left+B.right-m.clientX,b:k.top+A.top+B.bottom-m.clientY}}function S(m){let y=z.value.getBoundingClientRect();return m.clientX>y.left+A.l&&m.clientX<y.right-A.r&&m.clientY>y.top+A.t&&m.clientY<y.bottom-A.b}function _(m,{min:y,max:k}){return m<y?y:m>k?k:m}function R(m,{min:y,max:k}){return m==-1/0?y:m==1/0?k:m}let N;function Y(m){if(!S(m))return;let y=le(m);a("pointerdown",m,y);let k=m.currentTarget,M=!1;function E(P){M=M||Math.abs(P.screenX-m.screenX)>3||Math.abs(P.screenY-m.screenY)>3}function L(P){P.preventDefault(),m.target.removeEventListener("pointermove",E),m.target.removeEventListener("pointerup",L),M||(P.button==2&&a("contextmenu",P,le(P)),P.button==0&&(a("click",P,le(P)),S(m)&&V.value.forEach(q=>q.dispatchEvent(new PointerEvent("click",P))))),k.style.userSelect=null}m.target.addEventListener("pointermove",E,{passive:!0}),m.target.addEventListener("pointerup",L);let j=r.action.find(P=>["move","select"].includes(P.action)&&["buttons","ctrlKey","shiftKey","altKey","metaKey"].every(q=>P[q]==m[q]));if(j){if(k.style.userSelect="none",m.target.setPointerCapture(m.pointerId),j.action=="select")m.target.onpointermove=P=>{let{x:q=!1,y:Q=!1}=j,oe=le(P,k);(q||Q)&&(u.value={xmin:q?Math.min(y.x,oe.x):void 0,xmax:q?Math.max(y.x,oe.x):void 0,ymin:Q?Math.min(y.y,oe.y):void 0,ymax:Q?Math.max(y.y,oe.y):void 0})},m.target.onpointerup=P=>{P.currentTarget.onpointerup=null,P.currentTarget.onpointermove=null;let{x:q=!1,y:Q=!1,once:oe=!1}=j;if(u.value=null,M&&(q||Q)){let ae=le(P,k),se=Ro(P);se.type="select",q&&(se.xstart=y.x,se.xend=ae.x,se.xmin=Math.min(y.x,ae.x),se.xmax=Math.max(y.x,ae.x)),Q&&(se.ystart=y.y,se.yend=ae.y,se.ymin=Math.min(y.y,ae.y),se.ymax=Math.max(y.y,ae.y)),oe||(s.value={xmin:se.xmin,xmax:se.xmax,ymin:se.ymin,ymax:se.ymax}),a("select",se)}if(!M&&j.dismissible){s.value={};let ae=Ro(P);ae.type="cancel",a("select",ae)}};else if(j.action=="move"){N=clearTimeout(N);let P=H(j,{unlimited:!0}),q={min:P.xmax==null?-1/0:B.width-P.xmax,max:P.xmin==null?1/0:-P.xmin},Q={min:P.ymax==null?-1/0:B.height-P.ymax,max:P.ymin==null?1/0:-P.ymin};m.target.onpointermove=oe=>{let{x:ae=!1,y:se=!1}=j;ae&&(h.value=_(h.value+oe.movementX,q)),se&&(f.value=_(f.value+oe.movementY,Q))},m.target.onpointerup=oe=>{oe.currentTarget.onpointerup=null,oe.currentTarget.onpointermove=null,N=setTimeout(()=>Pe(j,oe),300)}}}}function Pe(m,y){if(d.value!=null||h.value!=0||g.value!=null||g.value!=0){let k,M,E,L;if(m.x){if(k=0,E=B.width,d.value){let j=d.value.ratio,P=d.value.origin*A.width-B.l;k=k/j+(1-1/j)*P,E=E/j+(1-1/j)*P}h.value&&(k-=h.value,E-=h.value)}if(m.y){if(M=0,L=B.height,g.value){let j=g.value.ratio,P=g.value.origin*A.height-B.t;M=M/j+(1-1/j)*P,L=L/j+(1-1/j)*P}f.value&&(M-=f.value,L-=f.value)}w(v({xmin:k,xmax:E,ymin:M,ymax:L}),m.action,y)}h.value=f.value=0,d.value=g.value=null}let fe=0,ke;function mt(m){if(!S(m))return;let y=D.find(k=>["zoom","nudge"].includes(k.action)&&["ctrlKey","shiftKey","altKey","metaKey"].every(M=>k[M]==m[M]));!y||!y.x&&!y.y||(ke=clearTimeout(ke),m.preventDefault(),a("wheel",m,le(m)),fe+=m.deltaY,et(y,re(m),fe),ke=setTimeout(()=>{Pe(y,m),fe=0},300))}function et(m,y,k){if(m.action=="zoom"){let{x:M=!1,y:E=!1,"min-range-x":L=0,"min-range-y":j=0,sensitivity:P=1.25}=m;P=P**(fe/100);let q=H(m,{unlimited:!0}),Q,oe,ae,se;if(M){if(Q=Math.max(y.l-y.l*P,q.xmin??-1/0),oe=Math.min(y.l+y.r*P,q.xmax??1/0),P<1){let me=v({xmin:Q,xmax:oe}),Ae=me.xmax-me.xmin,ge=(me.xmax+me.xmin)/2;Ae>0&&(Ae<L&&(me.xmin=ge-L/2,me.xmax=ge+L/2),{xmin:Q,xmax:oe}=H(me))}Math.abs(B.width-(oe-Q))>1&&(d.value={ratio:B.width/(oe-Q),origin:(B.l+Q*B.width/(B.width-oe+Q))/A.width})}if(E){if(ae=Math.max(y.t-y.t*P,q.ymin??-1/0),se=Math.min(y.t+y.b*P,q.ymax??1/0),P<1){let me=v({ymin:ae,ymax:se}),Ae=me.ymax-me.ymin,ge=(me.ymax+me.ymin)/2;Ae>0&&(Ae<j&&(me.ymin=ge-j/2,me.ymax=ge+j/2),{ymin:ae,ymax:se}=H(me))}Math.abs(B.height-(se-ae))>1&&(g.value={ratio:B.height/(se-ae),origin:(B.t+ae*B.height/(B.height-se+ae))/A.height})}}if(m.action=="nudge"){let{x:M=!1,y:E=!1,sensitivity:L=.1}=m,j=H(m,{unlimited:!0});if(M){let P=L*B.width*(-k/120),q={min:j.xmax==null?-1/0:B.width-j.xmax,max:j.xmin==null?1/0:-j.xmin};h.value=_(P,q)}if(E){let P=L*B.height*(-k/120),q={min:j.ymax==null?-1/0:B.height-j.ymax,max:j.ymin==null?1/0:-j.ymin};f.value=_(P,q)}}}function xe(m){a("pointerup",m,le(m))}function ct(m){a("pointerover",m,le(m))}function ze(m){a("pointerout",m,le(m))}function ye(m){a("pointerenter",m,le(m))}function Tn(m){a("pointerleave",m,le(m))}function p(m){a("dblclick",m,le(m))}function w(m,y="rescale",k){let M=!1,E={};for(const L of["xmin","xmax","ymin","ymax"])m[L]==null?E[L]=o.value[L]:(E[L]=m[L],E[L]!=o.value[L]&&(M=!0));M&&(c.value={x:0,y:0},o.value=E,a(y,m,k),a("rangechange",E))}const I=ee(()=>{let m=T.value.axes.filter(k=>k.type=="x"),y=T.value.axes.filter(k=>k.type=="y");return{x:{majorBreaks:Ri(m.flatMap(k=>k.majorBreaks)),minorBreaks:Ri(m.flatMap(k=>k.minorBreaks))},y:{majorBreaks:Ri(y.flatMap(k=>k.majorBreaks)),minorBreaks:Ri(y.flatMap(k=>k.minorBreaks))}}}),G=ee(()=>T.value.axes.map(m=>{let{type:y,position:k,title:M,ticks:E,action:L,theme:j}=m;return{type:y,bind:{title:M,ticks:E,action:L,layout:B,theme:Object.assign({},l.axis?.[k]??l.axis?.[y]??{},j),position:k,coord2pos:H,pos2coord:v},on:{zoom:P=>w(P,"zoom"),move:P=>w(P,"move"),rescale:P=>w(P,"rescale"),nudge:P=>w(P,"nudge")}}}));return(m,y)=>(X(),J("svg",{ref:"svg",width:"100%",height:"100%",onWheel:mt,onPointerdown:Y,onPointerup:xe,onPointerover:ct,onPointerout:ze,onPointerenter:ye,onPointerleave:Tn,onDblclick:p,onClick:y[8]||(y[8]=(...k)=>m.svgClick&&m.svgClick(...k)),onDragstart:y[9]||(y[9]=ml(()=>{},["prevent"])),onContextmenu:y[10]||(y[10]=ml(()=>{},["prevent"]))},[ie("defs",null,[ie("clipPath",{id:`${C(i)}-plot-clip`},[ie("rect",{x:"0",y:"0",width:C(A).width,height:C(A).height},null,8,bp)],8,xp)]),ie("rect",{transform:`translate(${C(A).left}, ${C(A).top})`,width:C(A).width,height:C(A).height,fill:C(l).plot.background},null,8,wp),ie("g",{transform:`translate(${C(A).left}, ${C(A).top})`},[C(l).grid.x?(X(),lt(kg,we({key:0},I.value.x,{layout:C(B),theme:C(l).grid.x,translate:h.value,transcale:d.value,coord2pos:H}),null,16,["layout","theme","translate","transcale"])):rt("",!0),C(l).grid.y?(X(),lt(Tg,we({key:1},I.value.y,{layout:C(B),theme:C(l).grid.y,translate:f.value,transcale:g.value,coord2pos:H}),null,16,["layout","theme","translate","transcale"])):rt("",!0)],8,vp),ie("g",{transform:`translate(${C(A).left}, ${C(A).top})`,"clip-path":`url(#${C(i)}-plot-clip)`},[ie("g",ss(Gr(x.value)),[(X(!0),J(ue,null,Le(T.value.layers,k=>(X(),lt(gp,we({ref_for:!0,ref_key:"layers",ref:V,data:k.data},{ref_for:!0},k.vBind,{layout:C(B),geom:k.geom,coord2pos:H}),null,16,["data","layout","geom"]))),256)),K(sa,{selection:s.value,"onUpdate:selection":y[0]||(y[0]=k=>s.value=k),coord2pos:H,pos2coord:v,layout:C(B),onSelect:y[1]||(y[1]=k=>a("select",k)),onSelecting:y[2]||(y[2]=k=>u.value=k),action:r.action},null,8,["selection","layout","action"]),K(sa,{selection:u.value,"onUpdate:selection":y[3]||(y[3]=k=>u.value=k),coord2pos:H,pos2coord:v,layout:C(B)},null,8,["selection","layout"])],16)],8,Sp),ie("g",{transform:`translate(${C(A).left}, ${C(A).top})`},[(X(!0),J(ue,null,Le(G.value.filter(k=>k.type=="x"||k.type=="y"),k=>(X(),lt(_g,we({ref_for:!0},k.bind,Rh(k.on),{translateX:h.value,"onUpdate:translateX":y[4]||(y[4]=M=>h.value=M),transcaleX:d.value,"onUpdate:transcaleX":y[5]||(y[5]=M=>d.value=M),translateY:f.value,"onUpdate:translateY":y[6]||(y[6]=M=>f.value=M),transcaleY:g.value,"onUpdate:transcaleY":y[7]||(y[7]=M=>g.value=M)}),null,16,["translateX","transcaleX","translateY","transcaleY"]))),256))],8,_p)],544))}},Tp=["height","width"],Pp=["transform"],Ap=["fill"],Lp=["stroke","stroke-width","stroke-opacity","stroke-dasharray"],Mp=["r","fill","stroke","stroke-width","stroke-opacity","fill-opacity"],Cp=["fill","stroke","stroke-width","stroke-opacity","fill-opacity"],Wp={x:"20",y:"10","alignment-baseline":"central"},$p=Object.assign({inheritAttrs:!1},{__name:"CoreLegend",props:{scale:Function,geom:{type:Array,default:()=>[]},breaks:Array},setup(e){const t=ee(()=>{if(e.scale==null)return[];if(e.scale.level){let l=Array.from(e.scale.level);return l.level=e.scale.level,l.extent=e.scale.extent,l}else{let l=5,c=new Array(l).fill(0).map((u,h)=>(e.scale.extent.max-e.scale.extent.min)*h/l+e.scale.extent.min);return c.extent=e.scale.extent,c}}),n=ee(()=>e.scale(t.value).map((l,c)=>({[e.scale.aesthetics]:l,label:String(t.value[c])}))),i=ee(()=>({text:["text"].some(l=>e.geom.includes(l)),line:["line","linerange"].some(l=>e.geom.includes(l)),circle:["point"].some(l=>e.geom.includes(l)),rect:["rect","tile","polygon"].some(l=>e.geom.includes(l))}));function r(l){return l==null||l==="solid"?null:l==="dashed"?"4 4":l==="dotted"?"1 3":l==="dotdash"?"1 3 4 3":l==="longdash"?"8 4":l==="twodash"?"2 2 6 2":l.includes(" ")?l:l.split("").map(c=>+("0x"+c)).join(" ")}const o=Ua();ee(()=>Object.fromEntries(Object.entries(o).filter(([l,c])=>l.startsWith("on"))));const s=zr(0),a=at("svg");return Qe(n,async()=>{await Li();let l=a.value?.getBBox?.();l&&(s.value=l.width+l.x)},{immediate:!0}),(l,c)=>(X(),J(ue,null,[Mi(Ee(e.scale.title)+" ",1),(X(),J("svg",{height:n.value.length*20,width:s.value,ref:"svg"},[(X(!0),J(ue,null,Le(n.value,(u,h)=>(X(),J("g",{transform:`translate(0, ${h*20})`},[i.value.text?(X(),J("text",{key:0,x:"10",y:"10",fill:u.color,"alignment-baseline":"central","text-anchor":"middle"},"a",8,Ap)):rt("",!0),i.value.line?(X(),J("line",{key:1,stroke:u.color??"black",x1:5,x2:15,y1:10,y2:10,"stroke-width":u.linewidth??1,"stroke-opacity":u.alpha,"stroke-dasharray":r(u.linetype)},null,8,Lp)):rt("",!0),i.value.circle?(X(),J("circle",{key:2,cx:"10",cy:"10",r:(u.size??6)/2,fill:u.color??"none",stroke:u.stroke,"stroke-width":u.linewidth,"stroke-opacity":u.alpha,"fill-opacity":u.alpha},null,8,Mp)):rt("",!0),i.value.rect?(X(),J("rect",{key:3,x:"5",y:"5",width:"10",height:"10",fill:u.fill,stroke:u.color,"stroke-width":u.linewidth,"stroke-opacity":u.alpha,"fill-opacity":u.alpha},null,8,Cp)):rt("",!0),ie("text",Wp,Ee(u.label),1)],8,Pp))),256))],8,Tp))],64))}}),gt={$_type:"action",$_props:{}},Np={$_type:"layer"},$s={$_props:{geom:"tile",stat:"bar"},$_type:"layer"},_u={$_props:{geom:"rect",stat:"histogram"},$_type:"layer",$_argnames:["bins","binwidth","breaks"]},mi={$_props:{geom:"line",stat:"line"},$_type:"layer",$_argnames:["orientation"]},Ep={$_props:{geom:"line",stat:"linerange"},$_type:"layer"},ku={$_props:{geom:"line",stat:"path"},$_type:"layer"},pt={$_props:{geom:"point",stat:"point"},$_type:"layer"},Tu={$_props:{geom:"polygon",stat:"polygon"},$_type:"layer"},Ip={$_props:{geom:"rect",stat:"rect"},$_type:"layer"},Pu={$_props:{geom:"line",stat:"segment"},$_type:"layer"},Op={$_props:{geom:"stick",stat:"stick"},$_type:"layer"},ts={$_props:{geom:"text",stat:"text"},$_type:"layer"},Vp={$_props:{geom:"textsegment",stat:"textsegment"},$_type:"layer"},Au={$_props:{geom:"tile",stat:"tile"},$_type:"layer"},Dp=Object.freeze(Object.defineProperty({__proto__:null,VVGeom:Np,VVGeomBar:$s,VVGeomHistogram:_u,VVGeomLine:mi,VVGeomLinerange:Ep,VVGeomPath:ku,VVGeomPoint:pt,VVGeomPolygon:Tu,VVGeomRect:Ip,VVGeomSegment:Pu,VVGeomStick:Op,VVGeomText:ts,VVGeomTextsegment:Vp,VVGeomTile:Au},Symbol.toStringTag,{value:"Module"})),Rp={$_type:"axis",$_props:{}},Yt={$_type:"axis",$_props:{type:"x"}},vt={$_type:"axis",$_props:{type:"y"}},Fp=Object.freeze(Object.defineProperty({__proto__:null,VVAxis:Rp,VVAxisX:Yt,VVAxisY:vt},Symbol.toStringTag,{value:"Module"})),jp={class:"absolute right-4 top-4 flex flex-row"},Ve=Object.assign({inheritAttrs:!1},{__name:"Plot",props:Ot({width:Number,height:Number,data:Array,scales:Object,aes:Object,axes:Object,expandAdd:Object,expandMult:Object,levels:Object,range:Object,theme:{type:Object,default:()=>Do},resize:null,legendTeleport:null},{selection:{},selectionModifiers:{},activeSelection:{},activeSelectionModifiers:{},translateX:{},translateXModifiers:{},translateY:{},translateYModifiers:{},transcaleX:{},transcaleXModifiers:{},transcaleY:{},transcaleYModifiers:{}}),emits:Ot(["resize"],["update:selection","update:activeSelection","update:translateX","update:translateY","update:transcaleX","update:transcaleY"]),setup(e,{emit:t}){const n={...Dp,...Fp,VVAction:gt},i=t,r=e;function o(S){return S==null?[]:S.flatMap(_=>_.type==ue?o(_.children):_.type=="template"?o(_.children).map(R=>(R.props={...R.props,..._.props},R)):_)}function s(S){return{props:Object.fromEntries(S.props.map(R=>{try{if(R.type==7)return[R.arg.content,new Function("return "+R.exp.content)()];if(R.type==6)return[R.name,R.value?.content??""]}catch{}}).filter(R=>R!=null)),children:S.children.map(R=>()=>[s(R)]),type:n[S.tag]}}const a=jh(),l=Ua(),c=Ct(()=>{let S=Object.keys(a).filter(R=>R!="toolbar").flatMap(R=>o(a[R]())).flatMap(R=>R.type?.template?Ed(R.type.template,{decodeEntities:!0}).children.map(Y=>s(Y)):R).filter(R=>R!=null),_=Object.groupBy(S.filter(R=>R.type.$_type!=null),R=>R.type.$_type);return _.axis=_.axis??[],_.layer=_.layer??[],_.action=_.action??[],_}),u=ee(()=>{let S={},_={};for(let N in l)typeof l[N]=="function"&&N.startsWith("on")?Array.isArray(S[N])?S[N].push(l[N]):S[N]=[l[N]]:_[N]=l[N];let R=c.axis.filter(N=>N.children).flatMap(N=>Object.keys(N.children).filter(Y=>typeof N.children[Y]=="function").flatMap(Y=>o(N.children[Y]()))).concat(c.axis).concat(c.action);for(let N of R)for(let Y in N.props)typeof N.props[Y]=="function"&&Y.startsWith("on")&&(Array.isArray(S[Y])?S[Y].push(N.props[Y]):S[Y]=[N.props[Y]]);return{plot:S,wrapper:_}}),h=Ct(()=>{let S=c.axis.map(N=>({...N.type.$_props,...N.props})),_=S.filter(N=>N.type==="x"),R=S.filter(N=>N.type==="y");return{x:_.find(N=>N.primary||N.primary=="")??_.find(N=>!("secondary"in N)),y:R.find(N=>N.primary||N.primary=="")??R.find(N=>!("secondary"in N))}}),f=Ie(e,"selection"),d=Ie(e,"activeSelection"),g=Ie(e,"translateX"),b=Ie(e,"translateY"),O=Ie(e,"transcaleX"),F=Ie(e,"transcaleY"),D=ee(()=>({data:r.data,aes:r.aes,extendX:h?.x?.extend??r.extend?.x??0,extendY:h?.y?.extend??r.extend?.y??0})),z=ee(()=>c.layer.map(S=>{let{geom:_,stat:R,scales:N,data:Y,"extend-x":Pe,"extend-y":fe,...ke}={...S.type.$_props,...S.props},mt=S.type.$_argnames||[],et={},xe={},ct={},ze={};for(let ye in ke)ye!="key"&&(mt.includes(ye)?xe[ye]=ke[ye]:typeof ke[ye]=="function"?ye.startsWith("on")?ze[ye]==null?ze[ye]=ke[ye]:Array.isArray(ze[ye])?ze[ye].push(xe[ye]):ze[ye]=[ze[ye],xe[ye]]:et[ye]=ke[ye]:["class","style","render"].includes(ye)?ze[ye]=ke[ye]:ct[ye]=ke[ye]);return{geom:_,stat:R,data:Y,aes:et,attrs:ct,scales:N,args:xe,extendX:Pe,extendY:fe,vBind:ze}})),V=ee(()=>(({x:S,y:_,...R})=>({...R}))(r.levels??{})),$=ee(()=>{let S={};for(let _ of["x","y"])if(h[_]){let R=h[_];S[_]=R.levels??r.levels?.[_]}return S}),U=ee(()=>{let S={},_={x:0,y:0},R={x:0,y:0};for(let N of["x","y"])if(h[N]){let Y=h[N];S[N+"min"]=Y.min??Y.limits?.min??Y.limits?.[0],S[N+"max"]=Y.max??Y.limits?.max??Y.limits?.[1],Number.isNaN(S[N+"min"])&&(S[N+"min"]=null),Number.isNaN(S[N+"max"])&&(S[N+"max"]=null);let Pe=$.value[N];Pe!=null&&(S[N+"min"]=(S[N+"min"]??0)-.5,S[N+"max"]=(S[N+"max"]??Pe.length??Math.max(Object.values(Pe)))-.5),_[N]=Y["expand-add"]??0,R[N]=Y["min-range"]??0}return{range:{...r.range,...S},minRange:{...r.minRange,...R},expandAdd:{...r.expandAdd,..._}}}),W=ee(()=>{let S={x:.05,y:.05},_={x:!1,y:!1};for(let R of["x","y"])if(h[R]){let N=h[R];_[R]=N.reverse===""||N.reverse==!0,S[R]=N["expand-mult"]??.05}return{reverse:{...r.reverse,..._},expandMult:{...r.expandMult,...S}}}),A={left:1,right:2,middle:4,X1:8,X2:16},x=ee(()=>{let S=c.axis.map(_=>{let R={..._.type.$_props,..._.props},N=(({type:Y,title:Pe,position:fe,offset:ke,breaks:mt,labels:et,"minor-breaks":xe,theme:ct})=>({type:Y,title:Pe,position:fe,offset:ke,breaks:mt,labels:et,minorBreaks:xe,theme:ct}))(R);return N.position==null&&(N.position={x:"bottom",y:"left"}[N.type]),N.showGrid=R["show-grid"]!==!1,N.extend=R.extend??h?.[N.type]?.extend,_.children&&(N.action=Object.keys(_.children).filter(Y=>typeof _.children[Y]=="function").flatMap(Y=>o(_.children[Y]())).map(Y=>({...Y.type.$_props,...Y.props})).flatMap(Y=>{let Pe=[];for(let fe of["move","nudge","zoom","rescale"])!Y[fe]&&Y[fe]!=""||Pe.push({action:fe,[R.type+"min"]:Y[fe].min??Y.min,[R.type+"max"]:Y[fe].max??Y.max,["min-range-"+R.type]:Y[fe]["min-range"]??Y["min-range"],ctrlKey:!!(Y[fe].ctrl??(Y.ctrl||Y.ctrl==="")),shiftKey:!!(Y[fe].shift??(Y.shift||Y.shift==="")),altKey:!!(Y[fe].alt??(Y.alt||Y.alt==="")),metaKey:!!(Y[fe].meta??(Y.meta||Y.meta==="")),buttons:Y[fe].buttons??A[Y[fe].button]??Y.buttons??A[Y.button]??1});return Pe})),N});return S.every(_=>_?.type!="x")&&S.push({type:"x",position:"bottom",showGrid:!0}),S.every(_=>_?.type!="y")&&S.push({type:"y",position:"left",showGrid:!0}),S.filter(_=>_!=null)}),T=ee(()=>c.action.map(S=>({...S.type.$_props,...S.props})).flatMap(S=>{let _=[];for(let R of["select","move","nudge","zoom"]){let N=S[R];if(N==null||N===!1)continue;let Y=N.x==null&&N.y==null&&S.x==null&&S.y==null;_.push({action:R,once:N.once??S.once,dismissible:(N.dismissible??S.dismissible)!==!1,x:Y||!!(N.x??(S.x||S.x==="")),y:Y||!!(N.y??(S.y||S.y==="")),xmin:N.xmin??S.xmin,xmax:N.xmax??S.xmax,ymin:N.ymin??S.ymin,ymax:N.ymax??S.ymax,"min-range-x":N["min-range-x"]??S["min-range-x"],"min-range-y":N["min-range-y"]??S["min-range-y"],ctrlKey:!!(N.ctrl??(S.ctrl||S.ctrl==="")),shiftKey:!!(N.shift??(S.shift||S.shift==="")),altKey:!!(N.alt??(S.alt||S.alt==="")),metaKey:!!(N.meta??(S.meta||S.meta==="")),buttons:N.buttons??A[N.button]??S.buttons??A[S.button]??1})}return _})),v=Ct(()=>zd(jd(Mc,Do,r.theme))),H=at("wrapper"),Z=at("plot");Xr(()=>{Qe(()=>r.width,S=>{H.value.style.width=kl(S,"px")},{immediate:!0}),Qe(()=>r.height,S=>{H.value.style.height=kl(S,"px")},{immediate:!0})});const{width:B,height:le}=Sc(Z);Qe([B,le],([S,_])=>{S>0&&_>0&&i("resize",{width:S,height:_})});const re=ee(()=>r.resize=="x"?["resize-x","overflow-auto"]:r.resize=="y"?["resize-y","overflow-auto"]:r.resize==!0||r.resize=="both"||r.resize==""?["resize","overflow-auto"]:[]);return(S,_)=>(X(),J("div",we({ref:"wrapper",class:["vvplot relative overflow-hidden",re.value]},u.value.wrapper),[K(kp,we({ref:"plot",schema:D.value,layers:z.value,"coord-scale":U.value,"coord-display":W.value,"coord-levels":$.value,levels:V.value,scales:r.scales,axes:x.value,theme:C(v),selection:f.value,"onUpdate:selection":_[0]||(_[0]=R=>f.value=R),"active-selection":d.value,"onUpdate:activeSelection":_[1]||(_[1]=R=>d.value=R),"transcale-x":O.value,"onUpdate:transcaleX":_[2]||(_[2]=R=>O.value=R),"transcale-y":F.value,"onUpdate:transcaleY":_[3]||(_[3]=R=>F.value=R),"translate-x":g.value,"onUpdate:translateX":_[4]||(_[4]=R=>g.value=R),"translate-y":b.value,"onUpdate:translateY":_[5]||(_[5]=R=>b.value=R)},u.value.plot,{action:T.value}),null,16,["schema","layers","coord-scale","coord-display","coord-levels","levels","scales","axes","theme","selection","active-selection","transcale-x","transcale-y","translate-x","translate-y","action"]),ie("div",jp,[Lo(S.$slots,"toolbar")]),Lo(S.$slots,"tooltip"),e.legendTeleport?(X(),lt(_h,{key:0,to:e.legendTeleport},[ie("div",{class:"flex flex-col",style:Pi({gap:C(v).legend.spacing+"px"})},[(X(!0),J(ue,null,Le(Z.value?.vplot?.scales,([R,N])=>(X(),lt($p,{geom:Array.from(N),scale:R},null,8,["geom","scale"]))),256))],4)],8,["to"])):rt("",!0)],16))}}),bt=JSON.parse('[{"Sepal_Length":5.1,"Sepal_Width":3.5,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.7,"Sepal_Width":3.2,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.6,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.9,"Petal_Length":1.7,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.4,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.4,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.4,"Sepal_Width":2.9,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3.4,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3,"Petal_Length":1.4,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":4.3,"Sepal_Width":3,"Petal_Length":1.1,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":5.8,"Sepal_Width":4,"Petal_Length":1.2,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.7,"Sepal_Width":4.4,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.9,"Petal_Length":1.3,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.5,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.7,"Sepal_Width":3.8,"Petal_Length":1.7,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.8,"Petal_Length":1.5,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.4,"Petal_Length":1.7,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.6,"Petal_Length":1,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.3,"Petal_Length":1.7,"Petal_Width":0.5,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3.4,"Petal_Length":1.9,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.4,"Petal_Length":1.6,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.2,"Sepal_Width":3.5,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.2,"Sepal_Width":3.4,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.7,"Sepal_Width":3.2,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3.1,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.4,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.2,"Sepal_Width":4.1,"Petal_Length":1.5,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":5.5,"Sepal_Width":4.2,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.2,"Petal_Length":1.2,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.5,"Sepal_Width":3.5,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3.6,"Petal_Length":1.4,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":4.4,"Sepal_Width":3,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.4,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.5,"Petal_Length":1.3,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":4.5,"Sepal_Width":2.3,"Petal_Length":1.3,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":4.4,"Sepal_Width":3.2,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.5,"Petal_Length":1.6,"Petal_Width":0.6,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.8,"Petal_Length":1.9,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.8,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.2,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.3,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.3,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":7,"Sepal_Width":3.2,"Petal_Length":4.7,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":6.4,"Sepal_Width":3.2,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6.9,"Sepal_Width":3.1,"Petal_Length":4.9,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.3,"Petal_Length":4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.5,"Sepal_Width":2.8,"Petal_Length":4.6,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.8,"Petal_Length":4.5,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":3.3,"Petal_Length":4.7,"Petal_Width":1.6,"Species":"versicolor"},{"Sepal_Length":4.9,"Sepal_Width":2.4,"Petal_Length":3.3,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":6.6,"Sepal_Width":2.9,"Petal_Length":4.6,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.2,"Sepal_Width":2.7,"Petal_Length":3.9,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5,"Sepal_Width":2,"Petal_Length":3.5,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.9,"Sepal_Width":3,"Petal_Length":4.2,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":2.2,"Petal_Length":4,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":2.9,"Petal_Length":4.7,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":2.9,"Petal_Length":3.6,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.7,"Sepal_Width":3.1,"Petal_Length":4.4,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":3,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":4.1,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":6.2,"Sepal_Width":2.2,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":2.5,"Petal_Length":3.9,"Petal_Width":1.1,"Species":"versicolor"},{"Sepal_Length":5.9,"Sepal_Width":3.2,"Petal_Length":4.8,"Petal_Width":1.8,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":2.8,"Petal_Length":4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":2.5,"Petal_Length":4.9,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":2.8,"Petal_Length":4.7,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":6.4,"Sepal_Width":2.9,"Petal_Length":4.3,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.6,"Sepal_Width":3,"Petal_Length":4.4,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":6.8,"Sepal_Width":2.8,"Petal_Length":4.8,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":6.7,"Sepal_Width":3,"Petal_Length":5,"Petal_Width":1.7,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":2.9,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.6,"Petal_Length":3.5,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.4,"Petal_Length":3.8,"Petal_Width":1.1,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.4,"Petal_Length":3.7,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":3.9,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":2.7,"Petal_Length":5.1,"Petal_Width":1.6,"Species":"versicolor"},{"Sepal_Length":5.4,"Sepal_Width":3,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":3.4,"Petal_Length":4.5,"Petal_Width":1.6,"Species":"versicolor"},{"Sepal_Length":6.7,"Sepal_Width":3.1,"Petal_Length":4.7,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":2.3,"Petal_Length":4.4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":3,"Petal_Length":4.1,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.5,"Petal_Length":4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.6,"Petal_Length":4.4,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":3,"Petal_Length":4.6,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5.8,"Sepal_Width":2.6,"Petal_Length":4,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":5,"Sepal_Width":2.3,"Petal_Length":3.3,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":2.7,"Petal_Length":4.2,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":3,"Petal_Length":4.2,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.9,"Petal_Length":4.2,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.2,"Sepal_Width":2.9,"Petal_Length":4.3,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.1,"Sepal_Width":2.5,"Petal_Length":3,"Petal_Width":1.1,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.8,"Petal_Length":4.1,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":3.3,"Petal_Length":6,"Petal_Width":2.5,"Species":"virginica"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":5.1,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":7.1,"Sepal_Width":3,"Petal_Length":5.9,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.9,"Petal_Length":5.6,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3,"Petal_Length":5.8,"Petal_Width":2.2,"Species":"virginica"},{"Sepal_Length":7.6,"Sepal_Width":3,"Petal_Length":6.6,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":4.9,"Sepal_Width":2.5,"Petal_Length":4.5,"Petal_Width":1.7,"Species":"virginica"},{"Sepal_Length":7.3,"Sepal_Width":2.9,"Petal_Length":6.3,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":2.5,"Petal_Length":5.8,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":7.2,"Sepal_Width":3.6,"Petal_Length":6.1,"Petal_Width":2.5,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3.2,"Petal_Length":5.1,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":2.7,"Petal_Length":5.3,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":6.8,"Sepal_Width":3,"Petal_Length":5.5,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":5.7,"Sepal_Width":2.5,"Petal_Length":5,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":5.8,"Sepal_Width":2.8,"Petal_Length":5.1,"Petal_Width":2.4,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":3.2,"Petal_Length":5.3,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3,"Petal_Length":5.5,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":3.8,"Petal_Length":6.7,"Petal_Width":2.2,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":2.6,"Petal_Length":6.9,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6,"Sepal_Width":2.2,"Petal_Length":5,"Petal_Width":1.5,"Species":"virginica"},{"Sepal_Length":6.9,"Sepal_Width":3.2,"Petal_Length":5.7,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":5.6,"Sepal_Width":2.8,"Petal_Length":4.9,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":2.8,"Petal_Length":6.7,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.7,"Petal_Length":4.9,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3.3,"Petal_Length":5.7,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":7.2,"Sepal_Width":3.2,"Petal_Length":6,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.2,"Sepal_Width":2.8,"Petal_Length":4.8,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.1,"Sepal_Width":3,"Petal_Length":4.9,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":2.8,"Petal_Length":5.6,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":7.2,"Sepal_Width":3,"Petal_Length":5.8,"Petal_Width":1.6,"Species":"virginica"},{"Sepal_Length":7.4,"Sepal_Width":2.8,"Petal_Length":6.1,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":7.9,"Sepal_Width":3.8,"Petal_Length":6.4,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":2.8,"Petal_Length":5.6,"Petal_Width":2.2,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.8,"Petal_Length":5.1,"Petal_Width":1.5,"Species":"virginica"},{"Sepal_Length":6.1,"Sepal_Width":2.6,"Petal_Length":5.6,"Petal_Width":1.4,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":3,"Petal_Length":6.1,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":3.4,"Petal_Length":5.6,"Petal_Width":2.4,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":3.1,"Petal_Length":5.5,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6,"Sepal_Width":3,"Petal_Length":4.8,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.9,"Sepal_Width":3.1,"Petal_Length":5.4,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3.1,"Petal_Length":5.6,"Petal_Width":2.4,"Species":"virginica"},{"Sepal_Length":6.9,"Sepal_Width":3.1,"Petal_Length":5.1,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":5.1,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":6.8,"Sepal_Width":3.2,"Petal_Length":5.9,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3.3,"Petal_Length":5.7,"Petal_Width":2.5,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3,"Petal_Length":5.2,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.5,"Petal_Length":5,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3,"Petal_Length":5.2,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.2,"Sepal_Width":3.4,"Petal_Length":5.4,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":5.9,"Sepal_Width":3,"Petal_Length":5.1,"Petal_Width":1.8,"Species":"virginica"}]'),zp=[{Admit:"Admitted",Gender:"Male",Dept:"A",Freq:512},{Admit:"Rejected",Gender:"Male",Dept:"A",Freq:313},{Admit:"Admitted",Gender:"Female",Dept:"A",Freq:89},{Admit:"Rejected",Gender:"Female",Dept:"A",Freq:19},{Admit:"Admitted",Gender:"Male",Dept:"B",Freq:353},{Admit:"Rejected",Gender:"Male",Dept:"B",Freq:207},{Admit:"Admitted",Gender:"Female",Dept:"B",Freq:17},{Admit:"Rejected",Gender:"Female",Dept:"B",Freq:8},{Admit:"Admitted",Gender:"Male",Dept:"C",Freq:120},{Admit:"Rejected",Gender:"Male",Dept:"C",Freq:205},{Admit:"Admitted",Gender:"Female",Dept:"C",Freq:202},{Admit:"Rejected",Gender:"Female",Dept:"C",Freq:391},{Admit:"Admitted",Gender:"Male",Dept:"D",Freq:138},{Admit:"Rejected",Gender:"Male",Dept:"D",Freq:279},{Admit:"Admitted",Gender:"Female",Dept:"D",Freq:131},{Admit:"Rejected",Gender:"Female",Dept:"D",Freq:244},{Admit:"Admitted",Gender:"Male",Dept:"E",Freq:53},{Admit:"Rejected",Gender:"Male",Dept:"E",Freq:138},{Admit:"Admitted",Gender:"Female",Dept:"E",Freq:94},{Admit:"Rejected",Gender:"Female",Dept:"E",Freq:299},{Admit:"Admitted",Gender:"Male",Dept:"F",Freq:22},{Admit:"Rejected",Gender:"Male",Dept:"F",Freq:351},{Admit:"Admitted",Gender:"Female",Dept:"F",Freq:24},{Admit:"Rejected",Gender:"Female",Dept:"F",Freq:317}],Lu=`The birch canoe slid on the smooth planks.
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
`,Hp={mpg:18.1,cyl:6,disp:225,hp:105,drat:2.76,wt:3.46,qsec:20.22,vs:1,am:0,gear:3,carb:1},Bp={"Mazda RX4":{mpg:21,cyl:6,disp:160,hp:110,drat:3.9,wt:2.62,qsec:16.46,vs:0,am:1,gear:4,carb:4},"Mazda RX4 Wag":{mpg:21,cyl:6,disp:160,hp:110,drat:3.9,wt:2.875,qsec:17.02,vs:0,am:1,gear:4,carb:4},"Datsun 710":{mpg:22.8,cyl:4,disp:108,hp:93,drat:3.85,wt:2.32,qsec:18.61,vs:1,am:1,gear:4,carb:1},"Hornet 4 Drive":{mpg:21.4,cyl:6,disp:258,hp:110,drat:3.08,wt:3.215,qsec:19.44,vs:1,am:0,gear:3,carb:1},"Hornet Sportabout":{mpg:18.7,cyl:8,disp:360,hp:175,drat:3.15,wt:3.44,qsec:17.02,vs:0,am:0,gear:3,carb:2},Valiant:Hp,"Duster 360":{mpg:14.3,cyl:8,disp:360,hp:245,drat:3.21,wt:3.57,qsec:15.84,vs:0,am:0,gear:3,carb:4},"Merc 240D":{mpg:24.4,cyl:4,disp:146.7,hp:62,drat:3.69,wt:3.19,qsec:20,vs:1,am:0,gear:4,carb:2},"Merc 230":{mpg:22.8,cyl:4,disp:140.8,hp:95,drat:3.92,wt:3.15,qsec:22.9,vs:1,am:0,gear:4,carb:2},"Merc 280":{mpg:19.2,cyl:6,disp:167.6,hp:123,drat:3.92,wt:3.44,qsec:18.3,vs:1,am:0,gear:4,carb:4},"Merc 280C":{mpg:17.8,cyl:6,disp:167.6,hp:123,drat:3.92,wt:3.44,qsec:18.9,vs:1,am:0,gear:4,carb:4},"Merc 450SE":{mpg:16.4,cyl:8,disp:275.8,hp:180,drat:3.07,wt:4.07,qsec:17.4,vs:0,am:0,gear:3,carb:3},"Merc 450SL":{mpg:17.3,cyl:8,disp:275.8,hp:180,drat:3.07,wt:3.73,qsec:17.6,vs:0,am:0,gear:3,carb:3},"Merc 450SLC":{mpg:15.2,cyl:8,disp:275.8,hp:180,drat:3.07,wt:3.78,qsec:18,vs:0,am:0,gear:3,carb:3},"Cadillac Fleetwood":{mpg:10.4,cyl:8,disp:472,hp:205,drat:2.93,wt:5.25,qsec:17.98,vs:0,am:0,gear:3,carb:4},"Lincoln Continental":{mpg:10.4,cyl:8,disp:460,hp:215,drat:3,wt:5.424,qsec:17.82,vs:0,am:0,gear:3,carb:4},"Chrysler Imperial":{mpg:14.7,cyl:8,disp:440,hp:230,drat:3.23,wt:5.345,qsec:17.42,vs:0,am:0,gear:3,carb:4},"Fiat 128":{mpg:32.4,cyl:4,disp:78.7,hp:66,drat:4.08,wt:2.2,qsec:19.47,vs:1,am:1,gear:4,carb:1},"Honda Civic":{mpg:30.4,cyl:4,disp:75.7,hp:52,drat:4.93,wt:1.615,qsec:18.52,vs:1,am:1,gear:4,carb:2},"Toyota Corolla":{mpg:33.9,cyl:4,disp:71.1,hp:65,drat:4.22,wt:1.835,qsec:19.9,vs:1,am:1,gear:4,carb:1},"Toyota Corona":{mpg:21.5,cyl:4,disp:120.1,hp:97,drat:3.7,wt:2.465,qsec:20.01,vs:1,am:0,gear:3,carb:1},"Dodge Challenger":{mpg:15.5,cyl:8,disp:318,hp:150,drat:2.76,wt:3.52,qsec:16.87,vs:0,am:0,gear:3,carb:2},"AMC Javelin":{mpg:15.2,cyl:8,disp:304,hp:150,drat:3.15,wt:3.435,qsec:17.3,vs:0,am:0,gear:3,carb:2},"Camaro Z28":{mpg:13.3,cyl:8,disp:350,hp:245,drat:3.73,wt:3.84,qsec:15.41,vs:0,am:0,gear:3,carb:4},"Pontiac Firebird":{mpg:19.2,cyl:8,disp:400,hp:175,drat:3.08,wt:3.845,qsec:17.05,vs:0,am:0,gear:3,carb:2},"Fiat X1-9":{mpg:27.3,cyl:4,disp:79,hp:66,drat:4.08,wt:1.935,qsec:18.9,vs:1,am:1,gear:4,carb:1},"Porsche 914-2":{mpg:26,cyl:4,disp:120.3,hp:91,drat:4.43,wt:2.14,qsec:16.7,vs:0,am:1,gear:5,carb:2},"Lotus Europa":{mpg:30.4,cyl:4,disp:95.1,hp:113,drat:3.77,wt:1.513,qsec:16.9,vs:1,am:1,gear:5,carb:2},"Ford Pantera L":{mpg:15.8,cyl:8,disp:351,hp:264,drat:4.22,wt:3.17,qsec:14.5,vs:0,am:1,gear:5,carb:4},"Ferrari Dino":{mpg:19.7,cyl:6,disp:145,hp:175,drat:3.62,wt:2.77,qsec:15.5,vs:0,am:1,gear:5,carb:6},"Maserati Bora":{mpg:15,cyl:8,disp:301,hp:335,drat:3.54,wt:3.57,qsec:14.6,vs:0,am:1,gear:5,carb:8},"Volvo 142E":{mpg:21.4,cyl:4,disp:121,hp:109,drat:4.11,wt:2.78,qsec:18.6,vs:1,am:1,gear:4,carb:2}},Mu=`date,pce,pop,psavert,uempmed,unemploy
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
`,Xp=`wave_length,chlorophyll_a,chlorophyll_b,beta_carotene
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
`,to=(e,t)=>{const n=e.__vccOpts||e;for(const[i,r]of t)n[i]=r;return n},Yp={class:"plot-container"},qp={__name:"geom",setup(e){const t=Lu.toLowerCase().replace(/[^a-z]/g,"").split(""),n=Object.entries(Bp).map(([a,l])=>({model:a,...l})),i=o(Mu),r=o(Xp).flatMap(({wave_length:a,...l})=>Object.entries(l).map(([c,u])=>({wave_length:a,pigment:c,molar_extinction:u})));function o(a){function l(h){if(!isNaN(h))return+h;if(/^\d{4}-\d{1,2}-\d{1,2}$/.test(h)){let[f,d,g]=h.split("-").map(b=>+b);return Date.UTC(f,d-1,g)}return h}let[c,...u]=a.replace(/\r/g,"").split(`
`).filter(h=>h);return c=c.split(","),u.map(h=>Object.fromEntries(h.split(",").map((f,d)=>[c[d],l(f)])))}const s=zr("canvas");return(a,l)=>(X(),J(ue,null,[ie("div",null,[l[2]||(l[2]=Mi(" render: ",-1)),Ra(ie("select",{"onUpdate:modelValue":l[0]||(l[0]=c=>s.value=c)},[...l[1]||(l[1]=[ie("option",{value:"svg"},"svg",-1),ie("option",{value:"canvas"},"canvas",-1)])],512),[[wc,s.value]])]),ie("div",Yp,[l[3]||(l[3]=ie("pre",{class:"code"},Ee(`<VVPlot :data="mtcars">
    <VVGeomPoint :x="d => d.wt" :y="d => d.mpg" shape="triangle" />
    <VVGeomText :x="d => d.wt" :y="d => d.mpg" :label="d => d.model" :alpha="0.5" />
    <VVGeomSegment :x="d => d.x1" :y="d => d.y1" :xend="d => d.x2" :yend="d => d.y2"
        :data="[{ x1: 2.62, x2: 3.57, y1: 21, y2: 15 }]" color="red" />
</VVPlot>`),-1)),K(C(Ve),{data:C(n)},{default:Te(()=>[K(C(pt),{x:c=>c.wt,y:c=>c.mpg,shape:"triangle",render:s.value},null,8,["x","y","render"]),K(C(ts),{x:c=>c.wt,y:c=>c.mpg,label:c=>c.model,alpha:.5,render:s.value},null,8,["x","y","label","render"]),K(C(Pu),{x:c=>c.x1,y:c=>c.y1,xend:c=>c.x2,yend:c=>c.y2,data:[{x1:2.62,x2:3.57,y1:21,y2:15}],color:"red",render:s.value},null,8,["x","y","xend","yend","render"])]),_:1},8,["data"]),l[4]||(l[4]=ie("hr",null,null,-1)),l[5]||(l[5]=ie("pre",{class:"code"},Ee(`<VVPlot :data="UCBAdmissions">
    <VVGeomTile :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :fill="d => d.Freq" :width="0.8"
        :height="0.8" :scales="{ fill: vvscale.color.gradient2({ midpoint: null }) }" />
    <VVGeomText :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :color="d => d.Freq" :label="d => d.Freq" />
</VVPlot>`),-1)),K(C(Ve),{data:C(zp)},{default:Te(()=>[K(C(Au),{x:c=>c.Gender+"_"+c.Admit,y:c=>c.Dept,fill:c=>c.Freq,width:.8,height:.8,scales:{fill:C(gn).color.gradient2({midpoint:null})},render:s.value},null,8,["x","y","fill","scales","render"]),K(C(ts),{x:c=>c.Gender+"_"+c.Admit,y:c=>c.Dept,color:c=>c.Freq,label:c=>c.Freq,render:s.value},null,8,["x","y","color","label","render"])]),_:1},8,["data"]),l[6]||(l[6]=ie("hr",null,null,-1)),l[7]||(l[7]=ie("pre",{class:"code"},Ee(`<VVPlot :data="economics">
    <VVAxisX title="unemployment rate" />
    <VVAxisY title="personal savings rate" />
    <VVGeomPath :x="d => d.unemploy / d.pop" :y="d => d.psavert" :color="(d, i) => i"
        :scales="{ color: vvscale.color.hue() }" />
</VVPlot>`),-1)),K(C(Ve),{data:C(i)},{default:Te(()=>[K(C(Yt),{title:"unemployment rate"}),K(C(vt),{title:"personal savings rate"}),K(C(ku),{x:c=>c.unemploy/c.pop,y:c=>c.psavert,color:(c,u)=>u,scales:{color:C(gn).color.hue()},render:s.value},null,8,["x","y","color","scales","render"])]),_:1},8,["data"]),l[8]||(l[8]=ie("hr",null,null,-1)),l[9]||(l[9]=ie("pre",{class:"code"},Ee(`<VVPlot :data="letters">
    <VVAxisY :min="0" :expand-mult="0" />
    <VVGeomBar :x="d => d" :fill="d => d" :scales="{ fill: vvscale.custom((v) => ['blue', 'gold'][v % 2]) }" />
</VVPlot>`),-1)),K(C(Ve),{data:C(t)},{default:Te(()=>[K(C(vt),{min:0,"expand-mult":0}),K(C($s),{x:c=>c,fill:c=>c,scales:{fill:C(gn).custom(c=>["blue","gold"][c%2])},render:s.value},null,8,["x","fill","scales","render"])]),_:1},8,["data"]),l[10]||(l[10]=ie("hr",null,null,-1)),l[11]||(l[11]=ie("pre",{class:"code"},Ee(`<VVPlot :data="iris">
    <VVGeomHistogram :x="d => d.Petal_Width" :color="d => d.Species" :fill="d => d.Species" :alpha="0.5" :scales="{ color: vvscale.color.hue({ l: 45 }) }" />
</VVPlot>`),-1)),K(C(Ve),{data:C(bt)},{default:Te(()=>[K(C(_u),{x:c=>c.Petal_Width,color:c=>c.Species,fill:c=>c.Species,alpha:.5,scales:{color:C(gn).color.hue({l:45})},render:s.value},null,8,["x","color","fill","scales","render"])]),_:1},8,["data"]),l[12]||(l[12]=ie("hr",null,null,-1)),l[13]||(l[13]=ie("pre",{class:"code"},Ee(`<VVPlot :data="pigments">
    <VVGeomLine :x="d => d.wave_length" :y="d => d.molar_extinction" :color="d => d.pigment" :group="d => d.pigment"
        :scales="{ color: vvscale.color.manual({ values: { beta_carotene: 'orangered', chlorophyll_a: 'limegreen', chlorophyll_b: 'royalblue' } }) }" />
</VVPlot>`),-1)),K(C(Ve),{data:C(r)},{default:Te(()=>[K(C(mi),{x:c=>c.wave_length,y:c=>c.molar_extinction,color:c=>c.pigment,group:c=>c.pigment,scales:{color:C(gn).color.manual({values:{beta_carotene:"orangered",chlorophyll_a:"limegreen",chlorophyll_b:"royalblue"}})},render:s.value},null,8,["x","y","color","group","scales","render"])]),_:1},8,["data"]),l[14]||(l[14]=ie("hr",null,null,-1)),l[15]||(l[15]=ie("pre",{class:"code"},Ee(`<VVPlot :data="iris">
    <VVGeomPolygon :points="d => [
        { x: d.Petal_Width - 0.1, y: d.Sepal_Length },
        { x: d.Petal_Width, y: d.Sepal_Length - 0.1 },
        { x: d.Petal_Width + 0.1, y: d.Sepal_Length },
        { x: d.Petal_Width, y: d.Sepal_Length + 0.1 },
    ]" :color="d => d.Species" :fill="d => d.Species" />
</VVPlot>`),-1)),K(C(Ve),{data:C(bt)},{default:Te(()=>[K(C(Tu),{points:c=>[{x:c.Petal_Width-.1,y:c.Sepal_Length},{x:c.Petal_Width,y:c.Sepal_Length-.1},{x:c.Petal_Width+.1,y:c.Sepal_Length},{x:c.Petal_Width,y:c.Sepal_Length+.1}],color:c=>c.Species,fill:c=>c.Species,render:s.value},null,8,["points","color","fill","render"])]),_:1},8,["data"]),l[16]||(l[16]=ie("hr",null,null,-1))])],64))}},Gp=to(qp,[["__scopeId","data-v-ddd48b00"]]),Up={class:"plot-container"},Kp={__name:"theme",setup(e){return(t,n)=>(X(),J("div",Up,[n[0]||(n[0]=ie("h4",null,"default",-1)),K(C(Ve),{data:C(bt)},{default:Te(()=>[K(C(pt),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data"]),n[1]||(n[1]=ie("h4",null,"light",-1)),K(C(Ve),{data:C(bt),theme:C(An).light},{default:Te(()=>[K(C(pt),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data","theme"]),n[2]||(n[2]=ie("h4",null,"classic",-1)),K(C(Ve),{data:C(bt),theme:C(An).classic},{default:Te(()=>[K(C(pt),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data","theme"]),n[3]||(n[3]=ie("h4",null,"gray",-1)),K(C(Ve),{data:C(bt),theme:C(An).gray},{default:Te(()=>[K(C(pt),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data","theme"]),n[4]||(n[4]=ie("h4",null,"dark",-1)),K(C(Ve),{data:C(bt),theme:C(An).dark},{default:Te(()=>[K(C(pt),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data","theme"]),n[5]||(n[5]=ie("h4",null,"linedraw",-1)),K(C(Ve),{data:C(bt),theme:C(An).linedraw},{default:Te(()=>[K(C(pt),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data","theme"]),n[6]||(n[6]=ie("h4",null,"void",-1)),K(C(Ve),{data:C(bt),theme:C(An).void},{default:Te(()=>[K(C(pt),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data","theme"])]))}},Jp=to(Kp,[["__scopeId","data-v-088fffd3"]]),Zp={class:"plot-container"},Qp={__name:"axis",setup(e){const t=Lu.toLowerCase().replace(/[^a-z]/g,"").split(""),n=i(Mu);function i(r){function o(l){if(!isNaN(l))return+l;if(/^\d{4}-\d{1,2}-\d{1,2}$/.test(l)){let[c,u,h]=l.split("-").map(f=>+f);return Date.UTC(c,u-1,h)}return l}let[s,...a]=r.replace(/\r/g,"").split(`
`).filter(l=>l);return s=s.split(","),a.map(l=>Object.fromEntries(l.split(",").map((c,u)=>[s[u],o(c)])))}return(r,o)=>(X(),J("div",Zp,[o[0]||(o[0]=ie("pre",{class:"code"},Ee(`<VVPlot :data="economics" :theme="{ plot: { margin_right: 50 } }">
    <VVAxisY :labels="v => \`\${v * 100}%\`" :expand-mult="{ min: 0.2, max: 0.1 }" title="unemployment rate"
        :theme="{ title_color: 'gray' }">
        <VVAction move rescale zoom />
    </VVAxisY>
    <VVAxisX position="10%"
        :theme="{ ticks_length: 3, title_position: 'right', title_size: 16, text_angle: 45, ticks_anchor_x: 0 }"
        :show-grid="false" title="date" :extend="0.5">
        <VVAction move rescale zoom />
    </VVAxisX>
    <VVGeomLine :x="d => new Date(d.date)" :y="d => d.unemploy / d.pop" />
</VVPlot>`),-1)),K(C(Ve),{data:C(n),theme:{plot:{margin_right:50}}},{default:Te(()=>[K(C(vt),{labels:s=>`${s*100}%`,"expand-mult":{min:.2,max:.1},title:"unemployment rate",theme:{title_color:"gray"}},{default:Te(()=>[K(C(gt),{move:"",rescale:"",zoom:""})]),_:1},8,["labels"]),K(C(Yt),{position:"10%",theme:{ticks_length:3,title_position:"right",title_size:16,text_angle:45,ticks_anchor_x:0},"show-grid":!1,title:"date",extend:.5},{default:Te(()=>[K(C(gt),{move:"",rescale:"",zoom:""})]),_:1}),K(C(mi),{x:s=>new Date(s.date),y:s=>s.unemploy/s.pop},null,8,["x","y"])]),_:1},8,["data"]),o[1]||(o[1]=ie("hr",null,null,-1)),o[2]||(o[2]=ie("pre",{class:"code"},Ee(`<VVPlot :data="economics">
    <VVAxisX :labels="vvlabel.timestamp({ format: 'yyyy/MM' })" position="top" />
    <VVAxisY position="left" primary />
    <VVAxisY position="right" />
    <VVGeomLine :x="d => new Date(d.date)" :y="d => d.pop" />
</VVPlot>`),-1)),K(C(Ve),{data:C(n)},{default:Te(()=>[K(C(Yt),{labels:C(di).timestamp({format:"yyyy/MM"}),position:"top"},null,8,["labels"]),K(C(vt),{position:"left",primary:""}),K(C(vt),{position:"right"}),K(C(mi),{x:s=>new Date(s.date),y:s=>s.pop},null,8,["x","y"])]),_:1},8,["data"]),o[3]||(o[3]=ie("hr",null,null,-1)),o[4]||(o[4]=ie("pre",{class:"code"},Ee(`<VVPlot :data="economics">
    <VVAxisX :labels="vvlabel.timestamp()" :extend="2" :position="0" />
    <VVAxisY :labels="vvlabel.default()" :expand-mult="0" />
    <VVGeomLine :x="d => new Date(d.date)" :y="(d, i, data) => d.unemploy - (data[i - 1] ?? d)?.unemploy" color="#ccc" />
</VVPlot>`),-1)),K(C(Ve),{data:C(n)},{default:Te(()=>[K(C(Yt),{labels:C(di).timestamp(),extend:2,position:0},null,8,["labels"]),K(C(vt),{labels:C(di).default(),"expand-mult":0},null,8,["labels"]),K(C(mi),{x:s=>new Date(s.date),y:(s,a,l)=>s.unemploy-(l[a-1]??s)?.unemploy,color:"#ccc"},null,8,["x","y"])]),_:1},8,["data"]),o[5]||(o[5]=ie("hr",null,null,-1)),o[6]||(o[6]=ie("pre",{class:"code"},Ee(`<VVPlot :data="[{ x: 2, y: -1 }, { x: -1, y: 2 }]">
    <VVAxisX :position="0" :expand-mult="1" :breaks="vvbreak.number({ step: 1 })">
        <VVAction move rescale zoom />
    </VVAxisX>
    <VVAxisY :position="0" :expand-mult="1" :extend="1">
        <VVAction move rescale zoom />
    </VVAxisY>
    <VVGeomPoint :x="d => d.x" :y="d => d.y" />
</VVPlot>`),-1)),K(C(Ve),{data:[{x:2,y:-1},{x:-1,y:2}]},{default:Te(()=>[K(C(Yt),{position:0,"expand-mult":1,breaks:C(or).number({step:1})},{default:Te(()=>[K(C(gt),{move:"",rescale:"",zoom:""})]),_:1},8,["breaks"]),K(C(vt),{position:0,"expand-mult":1,extend:1},{default:Te(()=>[K(C(gt),{move:"",rescale:"",zoom:""})]),_:1}),K(C(pt),{x:s=>s.x,y:s=>s.y},null,8,["x","y"])]),_:1}),o[7]||(o[7]=ie("hr",null,null,-1)),o[8]||(o[8]=ie("pre",{class:"code"},Ee(`<VVPlot :data="letters">
    <VVAxisX :expand-add="1" :expand-mult="0" :levels="['x', 'y', 'z', '', 'a', 'b', 'c']" :position="0" />
    <VVAxisY position="center" :theme="{ ticks_anchor_y: 1 }" />
    <VVGeomBar :x="d => d" />
</VVPlot>`),-1)),K(C(Ve),{data:C(t)},{default:Te(()=>[K(C(Yt),{"expand-add":1,"expand-mult":0,levels:["x","y","z","","a","b","c"],position:0}),K(C(vt),{position:"center",theme:{ticks_anchor_y:1}}),K(C($s),{x:s=>s},null,8,["x"])]),_:1},8,["data"])]))}},ey=to(Qp,[["__scopeId","data-v-2b71243c"]]),ty={class:"plot-container"},ny={__name:"action",setup(e){return(t,n)=>(X(),J("div",ty,[n[0]||(n[0]=ie("pre",{class:"code"},Ee(`<VVPlot :data="iris" resize>
    <VVAxisY :position="0" :extend="1">
        <VVAction :zoom="{ max: 10, min: -2 }" :move="{ min: -2 }" :rescale="{ max: 10 }" />
    </VVAxisY>
    <VVAxisX position="center" :extend="1">
        <VVAction move :nudge="{ shift: true }" :min="-2" :max="10" />
        <VVAction :zoom="{ min: -5 }" :rescale="{ max: 10 }" :min-range="4" />
    </VVAxisX>
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
</VVPlot>`),-1)),K(C(Ve),{data:C(bt),resize:""},{default:Te(()=>[K(C(vt),{position:0,extend:1},{default:Te(()=>[K(C(gt),{zoom:{max:10,min:-2},move:{min:-2},rescale:{max:10}})]),_:1}),K(C(Yt),{position:"center",extend:1},{default:Te(()=>[K(C(gt),{move:"",nudge:{shift:!0},min:-2,max:10}),K(C(gt),{zoom:{min:-5},rescale:{max:10},"min-range":4})]),_:1}),K(C(pt),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data"]),n[1]||(n[1]=ie("hr",null,null,-1)),n[2]||(n[2]=ie("pre",{class:"code"},Ee(`<VVPlot :data="iris" resize>
    <VVAxisX position="0%" :min="0" :max="8" :expand-add="1" :extend="2" />
    <VVAxisY position="0%" :min="0" :max="8" :extend="1" />
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
    <template #action>
        <VVAction select />
        <VVAction nudge shift />
        <VVAction :move="{ button: 'right' }" :xmin="-2" :xmax="10" :ymin="-2" />
        <VVAction :zoom="{ xmin: -5, xmax: 10 }" :ymin="-2" :ymax="10" />
    </template>
</VVPlot>`),-1)),K(C(Ve),{data:C(bt),resize:""},{action:Te(()=>[K(C(gt),{select:""}),K(C(gt),{nudge:"",x:"",shift:""}),K(C(gt),{move:{button:"right"},xmin:-2,xmax:10,ymin:-2}),K(C(gt),{zoom:{xmin:-5,xmax:10},ymin:-2,ymax:10})]),default:Te(()=>[K(C(Yt),{position:"0%",min:0,max:8,"expand-add":1,extend:2}),K(C(vt),{position:"0%",min:0,max:8,extend:1}),K(C(pt),{x:i=>i.Petal_Width,y:i=>i.Sepal_Length,color:i=>i.Species},null,8,["x","y","color"])]),_:1},8,["data"])]))}},iy=to(ny,[["__scopeId","data-v-ddbef8ce"]]),ry={class:"content"},oy=["value"],sy={__name:"index",setup(e){const t=zr("geom"),n={geom:Gp,theme:Jp,axis:ey,action:iy};return(i,r)=>(X(),J("div",ry,[ie("div",null,[r[1]||(r[1]=Mi(" example: ",-1)),Ra(ie("select",{"onUpdate:modelValue":r[0]||(r[0]=o=>t.value=o)},[(X(),J(ue,null,Le(n,(o,s)=>ie("option",{key:s,value:s},Ee(s),9,oy)),64))],512),[[wc,t.value]])]),(X(),lt(gs(n[t.value])))]))}};Zf(sy).mount("#app");
