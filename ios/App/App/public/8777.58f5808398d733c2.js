"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8777],{8777:(r,g,t)=>{t.r(g),t.d(g,{TabsPageModule:()=>y});var e=t(4556),m=t(6895),u=t(433),h=t(5638),f=t(655),o=t(8256),c=t(2684);function C(n,d){if(1&n){const l=o.EpF();o.TgZ(0,"ion-tabs")(1,"ion-tab-bar",1)(2,"ion-tab-button",2),o.NdJ("click",function(){o.CHM(l);const a=o.oxw();return o.KtG(a.routesTo("home"))}),o._UZ(3,"ion-icon",3),o._uU(4," Home "),o.qZA(),o.TgZ(5,"ion-tab-button",2),o.NdJ("click",function(){o.CHM(l);const a=o.oxw();return o.KtG(a.routesTo("class"))}),o._UZ(6,"ion-icon",4),o._uU(7," Course "),o.qZA(),o.TgZ(8,"ion-tab-button",2),o.NdJ("click",function(){o.CHM(l);const a=o.oxw();return o.KtG(a.routesTo("live"))}),o._UZ(9,"ion-icon",5),o._uU(10," Live "),o.qZA(),o.TgZ(11,"ion-tab-button",2),o.NdJ("click",function(){o.CHM(l);const a=o.oxw();return o.KtG(a.routesTo("calender"))}),o._UZ(12,"ion-icon",6),o._uU(13," Calender "),o.qZA(),o.TgZ(14,"ion-tab-button",2),o.NdJ("click",function(){o.CHM(l);const a=o.oxw();return o.KtG(a.routesTo("profile"))}),o._UZ(15,"ion-icon",7),o._uU(16," Profile "),o.qZA()()()}}const i={queryParams:{reload:"true"}},P=[{path:"login",loadChildren:()=>t.e(5823).then(t.bind(t,5823)).then(n=>n.LoginModule)},{path:"register",loadChildren:()=>t.e(8951).then(t.bind(t,8951)).then(n=>n.RegisterModule)},{path:"sucessfull/:userId/:token",loadChildren:()=>Promise.all([t.e(8592),t.e(772)]).then(t.bind(t,772)).then(n=>n.SucessfulPageModule)},{path:"tabs",component:(()=>{class n{constructor(l,s,a){this.actionSheetCtrl=l,this.router=s,this.service=a,this.result="",this.splash_loaded=!1}presentActionSheet(){return(0,f.mG)(this,void 0,void 0,function*(){const l=yield this.actionSheetCtrl.create({header:"Create +",buttons:[{text:"Upload a video",role:"upload",data:{action:"upload"}},{text:"Go live",role:"live",data:{action:"live"}},{text:"Cancel",role:"cancel",data:{action:"cancel"}}]});yield l.present();const s=yield l.onDidDismiss();this.result=JSON.stringify(s,null,2),"upload"==s.role?this.router.navigate(["/tabs/uploadVideo"],i):"live"==s.role&&this.router.navigate(["/tabs/live"],i)})}ngDoCheck(){this.splash_loaded=!!localStorage.getItem("token")}routesTo(l){this.router.navigate(["/tabs/"+l],i)}}return n.\u0275fac=function(l){return new(l||n)(o.Y36(e.BX),o.Y36(h.F0),o.Y36(c.Q))},n.\u0275cmp=o.Xpm({type:n,selectors:[["app-tabs"]],decls:2,vars:1,consts:[[4,"ngIf"],["slot","bottom"],[3,"click"],["name","home"],["name","play-circle"],["name","radio"],["name","calendar-outline"],["name","person-outline"]],template:function(l,s){1&l&&(o._UZ(0,"ion-router-outlet"),o.YNc(1,C,17,0,"ion-tabs",0)),2&l&&(o.xp6(1),o.Q6J("ngIf",s.splash_loaded))},dependencies:[e.gu,e.yq,e.ZU,e.UN,e.jP,m.O5]}),n})(),canActivate:[(()=>{class n{constructor(l,s){this.service=l,this.router=s}canActivate(l,s){return this.IsLogged()}IsLogged(){return!!localStorage.getItem("token")||(setTimeout(()=>{this.router.navigateByUrl("/login",{skipLocationChange:!0}).then(()=>{this.router.navigate(["/login"])})},100),!1)}}return n.\u0275fac=function(l){return new(l||n)(o.LFG(c.Q),o.LFG(h.F0))},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()],children:[{path:"home",loadChildren:()=>Promise.all([t.e(8592),t.e(3828)]).then(t.bind(t,3828)).then(n=>n.HomeModule)},{path:"calender",loadChildren:()=>Promise.all([t.e(5548),t.e(6529),t.e(5215)]).then(t.bind(t,5215)).then(n=>n.CalenderModule)},{path:"Events",loadChildren:()=>t.e(3303).then(t.bind(t,3303)).then(n=>n.EventsModule)},{path:"class",loadChildren:()=>Promise.all([t.e(8592),t.e(9514)]).then(t.bind(t,9514)).then(n=>n.ClassModule)},{path:"lectures",loadChildren:()=>Promise.all([t.e(5548),t.e(8592),t.e(1962)]).then(t.bind(t,1962)).then(n=>n.LecturesModule)},{path:"contents",loadChildren:()=>Promise.all([t.e(5548),t.e(392)]).then(t.bind(t,392)).then(n=>n.ContentsModule)},{path:"content-controls",loadChildren:()=>Promise.all([t.e(5548),t.e(6529),t.e(7763)]).then(t.bind(t,7763)).then(n=>n.ContentControlsModule)},{path:"live",loadChildren:()=>Promise.all([t.e(5548),t.e(8592),t.e(5356)]).then(t.bind(t,5356)).then(n=>n.LiveModule)},{path:"profile",loadChildren:()=>Promise.all([t.e(8592),t.e(5058)]).then(t.bind(t,5058)).then(n=>n.ProfileModule)},{path:"uploadVideo",loadChildren:()=>Promise.all([t.e(8592),t.e(2183)]).then(t.bind(t,2183)).then(n=>n.UploadVideoModule)},{path:"search",loadChildren:()=>Promise.all([t.e(8592),t.e(3696)]).then(t.bind(t,3696)).then(n=>n.SearchModule)},{path:"splash",loadChildren:()=>t.e(140).then(t.bind(t,140)).then(n=>n.SplashModule)},{path:"test",loadChildren:()=>Promise.all([t.e(8592),t.e(5322)]).then(t.bind(t,5322)).then(n=>n.TestModule)},{path:"quiz",loadChildren:()=>Promise.all([t.e(8592),t.e(1914)]).then(t.bind(t,1914)).then(n=>n.QuizModule)},{path:"popular-quiz",loadChildren:()=>t.e(8050).then(t.bind(t,8050)).then(n=>n.QuizModule)},{path:"popular-lectures",loadChildren:()=>Promise.all([t.e(5548),t.e(8019)]).then(t.bind(t,8019)).then(n=>n.CourseModule)},{path:"achievements",loadChildren:()=>t.e(7537).then(t.bind(t,7537)).then(n=>n.AchievementsModule)},{path:"features",loadChildren:()=>Promise.all([t.e(8592),t.e(7405)]).then(t.bind(t,7405)).then(n=>n.FeaturesModule)},{path:"privacy-policy",loadChildren:()=>Promise.all([t.e(8592),t.e(8928)]).then(t.bind(t,8928)).then(n=>n.PrivacyPolicyModule)}]},{path:"",redirectTo:"/tabs/home",pathMatch:"full"}];let v=(()=>{class n{}return n.\u0275fac=function(l){return new(l||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[h.Bz.forChild(P)]}),n})();var T=t(529),M=t(9476);let y=(()=>{class n{}return n.\u0275fac=function(l){return new(l||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[e.Pc,m.ez,u.u5,v,T.JF,u.UX,M.z]}),n})()}}]);