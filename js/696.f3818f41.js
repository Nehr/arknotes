"use strict";(self["webpackChunkarknotes"]=self["webpackChunkarknotes"]||[]).push([[696],{5364:(e,a,l)=>{l.r(a),l.d(a,{default:()=>H});var t=l(3673),u=l(2323);const o=(0,t.Uk)(" Links "),n=(0,t.Uk)("Home"),m=(0,t.Uk)("To do"),r=(0,t.Uk)(" Stuff left to do ");function s(e,a,l,s,d,p){const i=(0,t.up)("q-btn"),w=(0,t.up)("q-toolbar-title"),c=(0,t.up)("q-toolbar"),f=(0,t.up)("q-header"),v=(0,t.up)("q-item-label"),W=(0,t.up)("q-icon"),g=(0,t.up)("q-item-section"),k=(0,t.up)("q-item"),_=(0,t.up)("q-list"),b=(0,t.up)("q-drawer"),h=(0,t.up)("router-view"),Z=(0,t.up)("q-page-container"),q=(0,t.up)("q-layout");return(0,t.wg)(),(0,t.j4)(q,{view:"lHh Lpr lFf"},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{elevated:""},{default:(0,t.w5)((()=>[(0,t.Wm)(c,null,{default:(0,t.w5)((()=>[(0,t.Wm)(i,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer},null,8,["onClick"]),(0,t.Wm)(w,null,{default:(0,t.w5)((()=>[(0,t.Uk)((0,u.zw)(e.title),1)])),_:1}),(0,t.Wm)("div",null,"ARK notes v"+(0,u.zw)(e.version),1)])),_:1})])),_:1}),(0,t.Wm)(b,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":a[1]||(a[1]=a=>e.leftDrawerOpen=a),"show-if-above":"",bordered:"",class:"bg-grey-1"},{default:(0,t.w5)((()=>[(0,t.Wm)(_,null,{default:(0,t.w5)((()=>[(0,t.Wm)(v,{header:"",class:"text-grey-8"},{default:(0,t.w5)((()=>[o])),_:1}),(0,t.Wm)(k,{clickable:"",tag:"a",to:"/"},{default:(0,t.w5)((()=>[(0,t.Wm)(g,{avatar:""},{default:(0,t.w5)((()=>[(0,t.Wm)(W,{name:"house"})])),_:1}),(0,t.Wm)(g,null,{default:(0,t.w5)((()=>[(0,t.Wm)(v,null,{default:(0,t.w5)((()=>[n])),_:1})])),_:1})])),_:1}),((0,t.wg)(!0),(0,t.j4)(t.HY,null,(0,t.Ko)(e.maps,(e=>((0,t.wg)(),(0,t.j4)(k,{clickable:"",tag:"a",key:e,to:`/notes/${e}`},{default:(0,t.w5)((()=>[(0,t.Wm)(g,{avatar:""},{default:(0,t.w5)((()=>[(0,t.Wm)(W,{name:"school"})])),_:1}),(0,t.Wm)(g,null,{default:(0,t.w5)((()=>[(0,t.Wm)(v,null,{default:(0,t.w5)((()=>[(0,t.Uk)((0,u.zw)(e),1)])),_:2},1024),(0,t.Wm)(v,{caption:""})])),_:2},1024)])),_:2},1032,["to"])))),128)),(0,t.Wm)(k,{clickable:"",tag:"a",to:"/todo"},{default:(0,t.w5)((()=>[(0,t.Wm)(g,{avatar:""},{default:(0,t.w5)((()=>[(0,t.Wm)(W,{name:"school"})])),_:1}),(0,t.Wm)(g,null,{default:(0,t.w5)((()=>[(0,t.Wm)(v,null,{default:(0,t.w5)((()=>[m])),_:1}),(0,t.Wm)(v,{caption:""},{default:(0,t.w5)((()=>[r])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,t.Wm)(Z,null,{default:(0,t.w5)((()=>[(0,t.Wm)(h,{key:e.$route.fullPath})])),_:1})])),_:1})}var d=l(1959),p=l(7874);const i={i8:"0.0.4"};var w=l(9582);const c=(0,t.aZ)({name:"MainLayout",components:{},setup(){const e=(0,p.oR)(),a=(0,w.yj)(),l=(0,d.iH)(!1),u=localStorage.getItem("wsARKnotes");console.log("savedNotes",JSON.parse(u)),u&&e.commit("example/setHiddenNotes",JSON.parse(u));const o=(0,t.Fl)({get:()=>e.state.example.maps,set:a=>{e.commit("example/setMapList",a)}}),n=(0,t.Fl)((()=>a)),m=(0,d.iH)(`${0!==Object.keys(n.value.params).length?`${n.value.name}: ${n.value.params.map}`:n.value.name}`);return(0,t.YP)(n.value,(()=>{console.log("new route",n.value),m.value=`${0!==Object.keys(n.value.params).length?`${n.value.name}: ${n.value.params.map}`:n.value.name}`})),{version:i.i8,leftDrawerOpen:l,toggleLeftDrawer(){l.value=!l.value},title:m,maps:o.value}}});var f=l(3066),v=l(3812),W=l(9570),g=l(269),k=l(3747),_=l(3949),b=l(7011),h=l(2350),Z=l(3414),q=l(2035),Q=l(4554),y=l(2652),L=l(7518),$=l.n(L);c.render=s;const H=c;$()(c,"components",{QLayout:f.Z,QHeader:v.Z,QToolbar:W.Z,QBtn:g.Z,QToolbarTitle:k.Z,QDrawer:_.Z,QList:b.Z,QItemLabel:h.Z,QItem:Z.Z,QItemSection:q.Z,QIcon:Q.Z,QPageContainer:y.Z})}}]);