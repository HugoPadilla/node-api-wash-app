import{_ as y,u as V,r as c,d as C,o as d,c as p,b as e,w as I,e as _,v as m,f as x,a as L,g as S,h as k,i as B,j as v,p as N,k as U,l as E,m as R}from"./index.9899c874.js";import{_ as T}from"./img-wash-auto.dc610275.js";const a=t=>(N("data-v-724915cb"),t=t(),U(),t),q={class:"login-page"},A=a(()=>e("div",{class:"constainer-imagen"},[e("img",{src:T,alt:"Imagen principal"})],-1)),M={class:"container-formulario"},j={class:"wrapper-formulario"},D=a(()=>e("img",{class:"logo",src:E,alt:"Logo principal"},null,-1)),F=a(()=>e("div",{class:"formulario-title"},[e("h6",null,"Login"),e("p",null,"Ingresa tus credenciales para ingresar a tu perfil")],-1)),P={id:"algo",class:"formulario"},W=["onSubmit"],z=a(()=>e("label",{for:"email"},"Correo electronico",-1)),G=a(()=>e("label",{for:"password"},"Constrase\xF1a",-1)),H={key:0,class:"message-error"},J=B(" No tienes una cuenta aun? "),K={__name:"LoginView",setup(t){const g="http://localhost:3000/api/",f=V(),i=c(""),r=c(""),u=c(!1),l=c(!1),h=C(()=>i.value===""||r.value==="");async function w(){l.value=!0,u.value=!1;try{const n={user:{email:i.value,password:r.value}},s=await R.post(g+"login",n);console.log(s);const o={currentUser:s.data.data};f.commit("setCurrentUser",o),l.value=!1,await v.push("/")}catch(n){l.value=!1,u.value=!0,console.log(n)}}function b(){v.push("/register")}return(n,s)=>(d(),p("div",q,[A,e("div",M,[e("div",j,[D,F,e("div",P,[e("form",{onSubmit:I(w,["prevent"])},[z,_(e("input",{id:"email",type:"email",placeholder:"correo@emai.com",required:"","onUpdate:modelValue":s[0]||(s[0]=o=>i.value=o)},null,512),[[m,i.value]]),G,_(e("input",{type:"password",name:"password",id:"password","onUpdate:modelValue":s[1]||(s[1]=o=>r.value=o)},null,512),[[m,r.value]]),u.value?(d(),p("p",H,"* Correo electronico o contrase\xF1a incorectas, revisa tu credenciales.")):x("",!0),L(k,{label:"Iniciar sesion","is-loading":l.value,"is-disable":S(h),style:{width:"100%"}},null,8,["is-loading","is-disable"]),e("div",{class:"label-registro"},[e("p",null,[J,e("span",{onClick:b},"Registrate aqui!")])])],40,W)])])])]))}},X=y(K,[["__scopeId","data-v-724915cb"]]);export{X as default};
