(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[22],{341:function(e,a,t){"use strict";var n=t(1),r=t(2),s=t(0),l=t.n(s),c=(t(3),t(4)),i=t(100),o=t(5),m=l.a.forwardRef((function(e,a){var t=e.classes,s=e.className,o=e.raised,m=void 0!==o&&o,d=Object(r.a)(e,["classes","className","raised"]);return l.a.createElement(i.a,Object(n.a)({className:Object(c.a)(t.root,s),elevation:m?8:1,ref:a},d))}));a.a=Object(o.a)({root:{overflow:"hidden"}},{name:"MuiCard"})(m)},342:function(e,a,t){"use strict";var n=t(1),r=t(2),s=t(0),l=t.n(s),c=(t(3),t(4)),i=t(5),o=l.a.forwardRef((function(e,a){var t=e.classes,s=e.className,i=e.component,o=void 0===i?"div":i,m=Object(r.a)(e,["classes","className","component"]);return l.a.createElement(o,Object(n.a)({className:Object(c.a)(t.root,s),ref:a},m))}));a.a=Object(i.a)({root:{padding:16,"&:last-child":{paddingBottom:24}}},{name:"MuiCardContent"})(o)},453:function(e,a,t){"use strict";var n=t(1),r=t(2),s=t(0),l=t.n(s),c=(t(3),t(4)),i=t(5),o=l.a.forwardRef((function(e,a){var t=e.disableSpacing,s=void 0!==t&&t,i=e.classes,o=e.className,m=Object(r.a)(e,["disableSpacing","classes","className"]);return l.a.createElement("div",Object(n.a)({className:Object(c.a)(i.root,o,!s&&i.spacing),ref:a},m))}));a.a=Object(i.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(o)},576:function(e,a,t){"use strict";var n=t(1),r=t(2),s=t(0),l=t.n(s),c=(t(3),t(4)),i=t(5),o=t(64),m=l.a.forwardRef((function(e,a){var t=e.action,s=e.avatar,i=e.classes,m=e.className,d=e.component,u=void 0===d?"div":d,b=e.disableTypography,p=void 0!==b&&b,f=e.subheader,v=e.subheaderTypographyProps,h=e.title,g=e.titleTypographyProps,j=Object(r.a)(e,["action","avatar","classes","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"]),O=h;null==O||O.type===o.a||p||(O=l.a.createElement(o.a,Object(n.a)({variant:s?"body2":"h5",className:i.title,component:"span",display:"block"},g),O));var N=f;return null==N||N.type===o.a||p||(N=l.a.createElement(o.a,Object(n.a)({variant:s?"body2":"body1",className:i.subheader,color:"textSecondary",component:"span",display:"block"},v),N)),l.a.createElement(u,Object(n.a)({className:Object(c.a)(i.root,m),ref:a},j),s&&l.a.createElement("div",{className:i.avatar},s),l.a.createElement("div",{className:i.content},O,N),t&&l.a.createElement("div",{className:i.action},t))}));a.a=Object(i.a)({root:{display:"flex",alignItems:"center",padding:16},avatar:{flex:"0 0 auto",marginRight:16},action:{flex:"0 0 auto",alignSelf:"flex-start",marginTop:-8,marginRight:-8},content:{flex:"1 1 auto"},title:{},subheader:{}},{name:"MuiCardHeader"})(m)},594:function(e,a,t){"use strict";t.r(a);var n=t(37),r=t(13),s=t(26),l=t(82),c=t(0),i=t.n(c),o=t(43),m=t(4),d=t(110),u=t(341),b=t(576),p=t(191),f=t(342),v=t(604),h=t(396),g=t(453),j=t(178),O=t(50),N=Object(d.a)((function(){return{root:{}}}));a.default=Object(o.b)((function(e){return{user:e.auth.user}}),{updateUser:O.e})((function(e){var a=e.className,t=e.user,o=e.updateUser,d=Object(l.a)(e,["className","user","updateUser"]),O=N(),y=Object(c.useState)({firstName:null!==t?t.firstName:"",lastName:null!==t?t.lastName:""}),E=Object(s.a)(y,2),x=E[0],T=E[1],C=Object(c.useState)(!0),S=Object(s.a)(C,2),w=S[0],P=S[1],R=function(e){T(Object(r.a)({},x,Object(n.a)({},e.target.name,e.target.value))),P(!1)};return i.a.createElement(u.a,Object.assign({},d,{className:Object(m.a)(O.root,a)}),i.a.createElement("form",{autoComplete:"off",noValidate:!0,onSubmit:function(e){return function(e){e.preventDefault(),o(x),P(!0)}(e)}},i.a.createElement(b.a,{subheader:"The information can be edited",title:"Profile"}),i.a.createElement(p.a,null),i.a.createElement(f.a,null,i.a.createElement(v.a,{container:!0,spacing:3},i.a.createElement(v.a,{item:!0,md:6,xs:12},i.a.createElement(h.a,{fullWidth:!0,helperText:"Please specify the first name",label:"First name",margin:"dense",name:"firstName",onChange:R,required:!0,value:x.firstName,variant:"outlined"})),i.a.createElement(v.a,{item:!0,md:6,xs:12},i.a.createElement(h.a,{fullWidth:!0,label:"Last name",helperText:"Please specify the last name",margin:"dense",name:"lastName",onChange:R,required:!0,value:x.lastName,variant:"outlined"})),i.a.createElement(v.a,{item:!0,md:6,xs:12},i.a.createElement(h.a,{fullWidth:!0,label:"Email Address",margin:"dense",name:"email",required:!0,value:t.email,variant:"outlined",disabled:!0})))),i.a.createElement(p.a,null),i.a.createElement(g.a,null,i.a.createElement(j.a,{color:"primary",variant:"contained",type:"submit",disabled:w},"Save details"))))}))}}]);
//# sourceMappingURL=22.0f7a9af1.chunk.js.map