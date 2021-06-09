(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{40:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var s=n(0),i=n.n(s),a=n(17),c=n.n(a),r=(n(40),n(5)),o=n(9),u=n.n(o),l=n(2),j=function(){var e=Object(s.useState)(),t=Object(r.a)(e,2),n=t[0],i=(t[1],Object(s.useState)()),a=Object(r.a)(i,2),c=a[0],o=(a[1],function(e){u()("http://127.0.0.1:5000/send_input",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(e)}).then((function(e){return e.text()}))});return Object(l.jsxs)("div",{className:"sequenceentry",children:[Object(l.jsxs)("div",{class:"seq-form",id:"non-mut-form",children:[Object(l.jsx)("label",{for:"non-mut",children:"WT Sequence"}),Object(l.jsx)("input",{type:"text",value:n,id:"non-mut",name:"non-mut",onChange:function(e){return o({WT:e.target.value})}})]}),Object(l.jsxs)("div",{class:"seq-form",id:"mut-form",children:[Object(l.jsx)("label",{for:"mut",children:"Mutated Sequence"}),Object(l.jsx)("input",{type:"text",value:c,id:"mut",name:"mut",onChange:function(e){return o({SNP:e.target.value})}})]})]})},d=function(){var e=Object(s.useState)("21"),t=Object(r.a)(e,2),n=t[0],i=t[1],a=Object(s.useState)("65"),c=Object(r.a)(a,2),o=c[0],j=c[1],d=Object(s.useState)("8"),p=Object(r.a)(d,2),b=p[0],h=p[1],O=function(){var e={temperature:parseFloat(n),sodium:parseFloat(o)/1e3,magnesium:parseFloat(b)/1e3};u()("http://127.0.0.1:5000/send_input",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(e)}).then((function(e){return e.text()}))};return Object(l.jsxs)("div",{className:"conditionentry",children:[Object(l.jsxs)("div",{class:"condition-form",id:"temperature-form",children:[Object(l.jsx)("label",{for:"temperature",children:"Temperature (C)"}),Object(l.jsx)("input",{type:"text",id:"temperature",name:"temperature",onChange:function(e,t){i(t),O()}})]}),Object(l.jsxs)("div",{class:"condition-form",id:"sodium-form",children:[Object(l.jsx)("label",{for:"sodium",children:"[Sodium] (mM)"}),Object(l.jsx)("input",{type:"text",id:"sodium",name:"sodium",onChange:function(e,t){j(t),O()}})]}),Object(l.jsxs)("div",{class:"condition-form",id:"magnesium-form",children:[Object(l.jsx)("label",{for:"magnesium",children:"[Magnesium] (mM)"}),Object(l.jsx)("input",{type:"text",id:"magnesium",name:"magnesium",onChange:function(e,t){h(t),O()}})]})]})},p=n(64);function b(e){return"".concat(Math.pow(2,e))}var h=function(){var e=Object(s.useState)(Math.log2(128)),t=Object(r.a)(e,2),n=t[0],i=t[1];return Object(l.jsxs)("div",{className:"popslider",children:[Object(l.jsxs)("label",{for:"population slider",className:"sliderlabel",children:["Starting Population: ",Math.pow(2,n)]}),Object(l.jsx)(p.a,{defaultValue:Math.log2(128),getAriaValueText:b,"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",onChange:function(e,t){i(t),function(){var e={pop_size:n};u()("http://127.0.0.1:5000/send_input",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(e)}).then((function(e){return e.text()}))}()},step:1,marks:!0,scale:function(e){return Math.pow(2,e)},min:Math.log2(16),max:Math.log2(4096)})]})},O=n(63),m=function(){var e=Object(s.useState)(!1),t=Object(r.a)(e,2),n=t[0],i=t[1];return Object(s.useEffect)((function(){var e=setInterval((function(){u()("http://127.0.0.1:5000/get_progress",{headers:{"Content-Type":"application/json"},method:"POST",body:""}).then((function(e){return e.json()})).then((function(e){i(e.running)})),u()("http://127.0.0.1:5000/get_output",{headers:{"Content-Type":"application/json"},method:"POST",body:""}).then((function(e){return e.json()})).then((function(e){n&&e.finished&&i(!1)}))}),1e3);return function(){clearInterval(e)}}),[]),Object(l.jsxs)("div",{className:"startstopbuttons",children:[Object(l.jsx)(O.a,{className:"startbutton",variant:"contained",disabled:n,color:"primary",onClick:function(){i(!0),u()("http://127.0.0.1:5000/start_optimizer",{headers:{"Content-Type":"application/json"},method:"POST"}).then((function(e){return e.text()}))},children:"Optimize"}),Object(l.jsx)(O.a,{className:"stopbutton",variant:"contained",disabled:!n,color:"default",onClick:function(){i(!1),u()("http://127.0.0.1:5000/stop_optimizer",{headers:{"Content-Type":"application/json"},method:"POST"}).then((function(e){return e.text()}))},children:"Stop"})]})},f=n(30),x=n(60),v=n(62);function g(e){return Object(l.jsxs)(v.a,{position:"relative",display:"inline-flex",children:[Object(l.jsx)(x.a,Object(f.a)({variant:"determinate"},e)),Object(l.jsx)(v.a,{top:0,left:130,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",children:Object(l.jsxs)("label",{for:"progress label",className:"proglabel",children:[e.value,"%"]})})]})}var y=setTimeout((function(){for(var e=y;e>0;e--)clearInterval(e)}),3e3),S=function(){var e=Object(s.useState)(!1),t=Object(r.a)(e,2),n=t[0],i=t[1],a=Object(s.useState)(!1),c=Object(r.a)(a,2),o=c[0],j=c[1],d=Object(s.useState)(0),p=Object(r.a)(d,2),b=p[0],h=p[1],O=Object(s.useState)({finished:!1}),m=Object(r.a)(O,2),f=m[0],x=m[1];return Object(s.useEffect)((function(){var e=setInterval((function(){u()("http://127.0.0.1:5000/get_progress",{headers:{"Content-Type":"application/json"},method:"POST",body:""}).then((function(e){return e.json()})).then((function(e){h(parseInt(e.progress)),i(e.running)})),u()("http://127.0.0.1:5000/get_output",{headers:{"Content-Type":"application/json"},method:"POST",body:""}).then((function(e){return e.json()})).then((function(e){if(x(e),f.hasOwnProperty("sinkC")){var t=f;(t.sinkC.length<7||"None Required"===t.sinkC)&&(t.sinkC="None Required",x(t))}j(e.finished)}))}),1e3);return function(){clearInterval(e)}}),[]),n?Object(l.jsxs)("div",{className:"progress",children:[Object(l.jsx)("h2",{children:"Optimization in Progress..."}),Object(l.jsx)(g,{variant:"determinate",size:"150px",value:b,className:"progressbar"})]}):o?Object(l.jsxs)("div",{className:"outputsequences",children:[Object(l.jsx)("h2",{children:"Output"}),Object(l.jsxs)("div",{className:"sequencelabels",children:[Object(l.jsx)("p",{children:"ProbeF: "}),Object(l.jsx)("p",{children:"ProbeQ: "}),Object(l.jsx)("p",{children:"Sink: "}),Object(l.jsx)("p",{children:"Sink*: "})]}),Object(l.jsxs)("div",{className:"outsequences",children:[Object(l.jsx)("p",{children:f.probeF}),Object(l.jsx)("p",{children:f.probeQ}),Object(l.jsx)("p",{children:f.sink}),Object(l.jsx)("p",{children:f.sinkC})]})]}):Object(l.jsx)("div",{className:"emptyoutput",children:Object(l.jsx)("h2",{children:"Output"})})};var C=function(){return Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)("h1",{children:"SNP-LAMP Designer"}),Object(l.jsx)(j,{}),Object(l.jsx)(d,{}),Object(l.jsx)(h,{}),Object(l.jsx)(m,{}),Object(l.jsx)(S,{})]})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,67)).then((function(t){var n=t.getCLS,s=t.getFID,i=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),s(e),i(e),a(e),c(e)}))};c.a.render(Object(l.jsx)(i.a.StrictMode,{children:Object(l.jsx)(C,{})}),document.getElementById("root")),T()}},[[46,1,2]]]);
//# sourceMappingURL=main.42fbf611.chunk.js.map