"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9514],{9514:(p,a,n)=>{n.r(a),n.d(a,{ClassModule:()=>R});var o=n(2078),c=n(6895),d=n(433),m=n(581),r=n(5638),f=n(655),v=n(7579),u=n(2722),h=n(463),t=n(8256),g=n(2684);function T(s,l){1&s&&(t.TgZ(0,"div",5)(1,"ion-thumbnail",6),t._UZ(2,"div",7),t.qZA(),t.TgZ(3,"ion-label",8),t._UZ(4,"div",9),t.qZA()())}const Z=function(){return[1,2,3,4,5,6,7]};function A(s,l){1&s&&(t.TgZ(0,"div"),t.YNc(1,T,5,0,"div",4),t.qZA()),2&s&&(t.xp6(1),t.Q6J("ngForOf",t.DdM(1,Z)))}function x(s,l){if(1&s){const e=t.EpF();t.TgZ(0,"div",11),t.NdJ("click",function(){const D=t.CHM(e).$implicit,E=t.oxw(2);return t.KtG(E.routeTosubjects(D._id))}),t.TgZ(1,"ion-thumbnail",6),t._UZ(2,"img",12),t.qZA(),t.TgZ(3,"ion-label"),t._uU(4),t.qZA()()}if(2&s){const e=l.$implicit;t.xp6(2),t.Q6J("src",e.std_icon,t.LSH),t.xp6(2),t.Oqu(e.classNamme)}}function M(s,l){if(1&s&&(t.TgZ(0,"div"),t.YNc(1,x,5,2,"div",10),t.qZA()),2&s){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.classes)}}const O=[{path:"",component:(()=>{class s{constructor(e,i,C){this.router=e,this._https=i,this.ActivatedRoute=C,this.classes=[],this.skeleton=!1,this._unsubscribeAll=new v.x}routeTosubjects(e){this.router.navigate(["/tabs/lectures"],{queryParams:{classId:e,reload:"true"}})}ngOnInit(){this.fetchClassDetails(),this.ActivatedRoute.queryParams.subscribe(e=>{"true"===e.reload&&this.fetchClassDetails()})}fetchClassDetails(){return(0,f.mG)(this,void 0,void 0,function*(){this.skeleton=!0;const e=new h.i;e.RequestUrl="classDetails",e.RequestObject="",yield this._https.fetchData(e).pipe((0,u.R)(this._unsubscribeAll)).subscribe(i=>{if(null!=i){if(this.skeleton=!1,200!==i.status)return;this.classes=i.response||[]}},i=>{},()=>{})})}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(r.F0),t.Y36(g.Q),t.Y36(r.gz))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-class"]],decls:8,vars:4,consts:[[3,"translucent"],[1,"ion-padding",3,"fullscreen"],["content",""],[4,"ngIf"],["class","quize-cards",4,"ngFor","ngForOf"],[1,"quize-cards"],["slot","start"],[1,"cover-image-skeleton"],[1,"skeleton"],[1,"skeleton-loader"],["class","quize-cards",3,"click",4,"ngFor","ngForOf"],[1,"quize-cards",3,"click"],[3,"src"]],template:function(e,i){1&e&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),t._uU(3," Standards "),t.qZA()()(),t.TgZ(4,"ion-content",1,2),t.YNc(6,A,2,2,"div",3),t.YNc(7,M,2,1,"div",3),t.qZA()),2&e&&(t.Q6J("translucent",!0),t.xp6(4),t.Q6J("fullscreen",!0),t.xp6(2),t.Q6J("ngIf",i.skeleton),t.xp6(1),t.Q6J("ngIf",!i.skeleton))},dependencies:[c.sg,c.O5,o.W2,o.Gu,o.Q$,o.Bs,o.wd,o.sr]}),s})()}];let _=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[r.Bz.forChild(O),r.Bz]}),s})(),R=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[c.ez,_,o.Pc,d.u5,m.e]}),s})()},463:(p,a,n)=>{n.d(a,{i:()=>o});class o{}},2722:(p,a,n)=>{n.d(a,{R:()=>r});var o=n(4482),c=n(5403),d=n(8421),m=n(5032);function r(f){return(0,o.e)((v,u)=>{(0,d.Xf)(f).subscribe((0,c.x)(u,()=>u.complete(),m.Z)),!u.closed&&v.subscribe(u)})}}}]);