"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1914],{463:(z,h,s)=>{s.d(h,{i:()=>a});class a{}},1914:(z,h,s)=>{s.r(h),s.d(h,{QuizModule:()=>U});var a=s(2078),m=s(6895),v=s(581),_=s(5638),g=s(655),r=s(433),f=s(463),b=s(7579),C=s(2722),t=s(8256),M=s(529),Q=s(1481),O=s(2684);function P(o,u){if(1&o){const e=t.EpF();t.TgZ(0,"ion-item",10),t.NdJ("click",function(){const l=t.CHM(e).$implicit,c=t.oxw();return t.KtG(c.routeToQuiz(l))}),t.TgZ(1,"ion-label")(2,"strong"),t._uU(3),t.qZA(),t.TgZ(4,"ion-text"),t._uU(5),t.qZA(),t._UZ(6,"br"),t.TgZ(7,"ion-note",11),t._uU(8),t.qZA()(),t.TgZ(9,"div",12)(10,"ion-note",13),t._uU(11),t.qZA(),t._UZ(12,"ion-icon",14),t.qZA()()}if(2&o){const e=u.$implicit;t.Q6J("button",!0),t.xp6(3),t.Oqu(e.paper_title),t.xp6(2),t.AsE("",e.className," ",e.paper,""),t.xp6(3),t.hij(" ",e.date," "),t.xp6(3),t.Oqu(e.time)}}function T(o,u){if(1&o&&(t.TgZ(0,"ion-select-option",41),t._uU(1),t.qZA()),2&o){const e=u.$implicit;t.Q6J("value",e._id),t.xp6(1),t.Oqu(e.classNamme)}}function Z(o,u){if(1&o&&(t.TgZ(0,"ion-select-option",41),t._uU(1),t.qZA()),2&o){const e=u.$implicit;t.Q6J("value",e._id),t.xp6(1),t.Oqu(e.lec_title)}}function y(o,u){1&o&&t._UZ(0,"ion-spinner",42)}function k(o,u){if(1&o&&(t.TgZ(0,"div",43),t._UZ(1,"ion-icon",44),t.TgZ(2,"span",45),t._uU(3),t.qZA()()),2&o){const e=t.oxw(2);t.xp6(1),t.Q6J("name",e.currentStatusIcon),t.xp6(2),t.Oqu(e.uploadStatus.message)}}function q(o,u){if(1&o){const e=t.EpF();t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),t._uU(3," Create Question Paper "),t.qZA(),t.TgZ(4,"ion-buttons",1)(5,"ion-icon",2),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.cancel())}),t.qZA()()()(),t.TgZ(6,"ion-content",15)(7,"ion-card-content",16)(8,"a",17)(9,"ion-button",18),t._uU(10,"Download Sample Paper "),t.qZA()(),t.TgZ(11,"ion-item",19)(12,"ion-label",20),t._uU(13,"Paper title"),t.qZA(),t._UZ(14,"ion-input",21),t.qZA(),t.TgZ(15,"ion-list")(16,"ion-item",19)(17,"div",22)(18,"div",23)(19,"label",24),t._uU(20," Date & Time"),t.qZA()()()(),t.TgZ(21,"div",23),t._UZ(22,"input",25),t.TgZ(23,"div",26)(24,"ion-datetime",27),t.NdJ("ionChange",function(i){t.CHM(e);const l=t.oxw();return t.KtG(l.dateTimeUpdated(i))}),t.qZA()()()(),t.TgZ(25,"ion-list")(26,"ion-item",19)(27,"ion-label",20),t._uU(28,"Class"),t.qZA(),t.TgZ(29,"ion-select",28),t.NdJ("ionChange",function(i){t.CHM(e);const l=t.oxw();return t.KtG(l.getSubjectsByclassId(i))}),t.YNc(30,T,2,2,"ion-select-option",29),t.qZA()()(),t.TgZ(31,"ion-list")(32,"ion-item",19)(33,"ion-label",20),t._uU(34,"Lecture"),t.qZA(),t.TgZ(35,"ion-select",30),t.NdJ("ionChange",function(i){t.CHM(e);const l=t.oxw();return t.KtG(l.onchange_lecture(i))}),t.YNc(36,Z,2,2,"ion-select-option",29),t.qZA()()(),t.TgZ(37,"div",31)(38,"label",32)(39,"span",33),t._UZ(40,"img",34),t.qZA(),t.TgZ(41,"h3",35),t._uU(42," Choose file here "),t.qZA(),t.TgZ(43,"input",36),t.NdJ("change",function(i){t.CHM(e);const l=t.oxw();return t.KtG(l.filechange(i))}),t.qZA(),t._uU(44),t.qZA()(),t.TgZ(45,"ion-button",37),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.uploadExcel())}),t._UZ(46,"ion-icon",38),t._uU(47),t.YNc(48,y,1,0,"ion-spinner",39),t.qZA()(),t.YNc(49,k,4,2,"div",40),t.qZA()}if(2&o){const e=t.oxw();let n;t.Q6J("translucent",!0),t.xp6(7),t.Q6J("formGroup",e.uploadQuizgroup),t.xp6(17),t.Q6J("showDefaultButtons",!0),t.xp6(5),t.Q6J("multiple",!1),t.xp6(1),t.Q6J("ngForOf",e.classData),t.xp6(5),t.Q6J("multiple",!1),t.xp6(1),t.Q6J("ngForOf",e.lecturesData),t.xp6(8),t.hij(" ",null==(n=e.uploadQuizgroup.get("file"))?null:n.value.name," "),t.xp6(3),t.hij(" ",e.uploading?"Uploading ":"Upload"," "),t.xp6(1),t.Q6J("ngIf",e.uploading),t.xp6(1),t.Q6J("ngIf",e.uploadStatus.status)}}const w=[{path:"",component:(()=>{class o{constructor(e,n,i,l,c,p,d){var x;this.http=e,this.sanitizer=n,this.router=i,this.service=l,this.ActivatedRoute=c,this.fb=p,this.loadingCtrl=d,this.lecturesData=[],this.classData=[],this.params={},this.currentpaper="",this.uploading=!1,this.papers=[],this.skeleton=!0,this.uploadStatus={status:!1,message:"",statusType:""},this.statusIcons=[{name:"checkmark-circle-outline",status:"success"},{name:"close-circle-outline",status:"failed"},{name:"information-circle-outline",status:"info"}],this.currentStatusIcon="",this._unsubscribeAll=new b.x,this.uploadQuizgroup=this.fb.group({classId:["",r.kI.required],lec_id:["",r.kI.required],paper_icon:["",r.kI.required],paper_link_duplicate:[""],paper_link:[""],paper_title:["",r.kI.required],paper:["",r.kI.required],date:["",r.kI.required],time:["",r.kI.required],published_at:["",r.kI.required],file:["",r.kI.required]}),null===(x=this.uploadQuizgroup.get("published_at"))||void 0===x||x.patchValue(this.service.getCurrentDate())}ngOnInit(){return(0,g.mG)(this,void 0,void 0,function*(){this.fetchClassDetails(),this.fetchpapersDetails(),this.ActivatedRoute.queryParams.subscribe(e=>{this.params=e,"true"===e.reload&&(this.fetchClassDetails(),this.fetchpapersDetails())})})}cancel(){this.modal.dismiss(null,"cancel"),this.fetchpapersDetails()}fetchClassDetails(){return(0,g.mG)(this,void 0,void 0,function*(){const e=new f.i;e.RequestUrl="classDetails",e.RequestObject="",yield this.service.fetchData(e).pipe((0,C.R)(this._unsubscribeAll)).subscribe(n=>{if(null!=n){if(200!==n.status)return void this.openSnackbar({status:!0,message:n.response,statusType:"failed"});this.classData=n.response||[]}},n=>{},()=>{})})}fetchpapersDetails(){return(0,g.mG)(this,void 0,void 0,function*(){if(!this.params.classId&&!this.params.lec_id)return;this.skeleton=!0;const e=new f.i;e.RequestUrl=`fetchquizes/${this.params.classId}/${this.params.lec_id}`,e.RequestObject="",yield this.service.fetchData(e).pipe((0,C.R)(this._unsubscribeAll)).subscribe(n=>{if(null!=n){if(this.skeleton=!1,200!==n.status)return void this.openSnackbar({status:!0,message:n.response,statusType:"failed"});this.papers=n.response||[]}},n=>{},()=>{})})}dateTimeUpdated(e){var n,i;const l=new Date(e.detail.value),c=l.toTimeString().split(" ")[0].slice(0,-3),p=String(l.getDate()).padStart(2,"0"),d=String(l.getMonth()+1).padStart(2,"0"),D=`${p}-${d}-${l.getFullYear()}`;new Date(2023,parseInt(d)-1,1).toLocaleString("default",{month:"short"}),null===(n=this.uploadQuizgroup.get("time"))||void 0===n||n.patchValue(c),null===(i=this.uploadQuizgroup.get("date"))||void 0===i||i.patchValue(D)}routeToQuiz(e){this.router.navigate(["/tabs/test"],{queryParams:{classId:e.classId,lec_id:e.lec_id,contentId:e._id,from:"/tabs/quiz",reload:"true"}})}readUrl(e){var n,i;if(e.target.files[0]&&e.target.files[0].size>73400320)return alert("File size exceeds the maximum allowed size (10MB). Please choose a smaller file."),void(null===(n=this.uploadQuizgroup.get("file"))||void 0===n||n.setValue(""));null===(i=this.uploadQuizgroup.get("file"))||void 0===i||i.patchValue(e.target.files[0])}getImgpaper(e){return this.sanitizer.bypassSecurityTrustResourceUrl(e)}getSubjectsByclassId(e){return(0,g.mG)(this,void 0,void 0,function*(){const n=e?e.target.value:null;n&&this.fetchlectureDetails(n)})}fetchlectureDetails(e){return(0,g.mG)(this,void 0,void 0,function*(){const n=new f.i;n.RequestUrl="lectureDetails/"+e,n.RequestObject="",yield this.service.fetchData(n).pipe((0,C.R)(this._unsubscribeAll)).subscribe(i=>{if(null!=i){if(200!==i.status)return void this.openSnackbar({status:!0,message:i.response,statusType:"failed"});this.lecturesData=i.response||[]}},i=>{},()=>{})})}switchpaper(e){var n;this.currentpaper=e,null===(n=this.uploadQuizgroup.get("paper"))||void 0===n||n.patchValue(e)}onchange_lecture(e){var n,i;null===(n=this.uploadQuizgroup.get("paper_icon"))||void 0===n||n.patchValue(this.getpaper_icon()),null===(i=this.uploadQuizgroup.get("paper"))||void 0===i||i.patchValue(this.getpaper_name())}getpaper_icon(){return this.lecturesData.find(e=>{var n;return e._id==(null===(n=this.uploadQuizgroup.get("lec_id"))||void 0===n?void 0:n.value)}).lec_icon}getpaper_name(){return this.lecturesData.find(e=>{var n;return e._id==(null===(n=this.uploadQuizgroup.get("lec_id"))||void 0===n?void 0:n.value)}).lec_title}backTopaper(){this.router.navigate([this.params.from],{queryParams:{classId:this.params.classId,lec_id:this.params.lec_id,paperId:this.params.paperId,from:"/tabs/lectures",reload:"true"}})}clearformcontrols(){var e,n,i,l,c,p;null===(e=this.uploadQuizgroup.get("classId"))||void 0===e||e.setValue(""),null===(n=this.uploadQuizgroup.get("lec_id"))||void 0===n||n.setValue(""),null===(i=this.uploadQuizgroup.get("paper_icon"))||void 0===i||i.setValue(""),null===(l=this.uploadQuizgroup.get("paper_title"))||void 0===l||l.setValue(""),null===(c=this.uploadQuizgroup.get("published_at"))||void 0===c||c.patchValue(this.service.getCurrentDate()),null===(p=this.uploadQuizgroup.get("file"))||void 0===p||p.setValue("")}getSnackbarStatus(e){this.uploadStatus.status=e}openSnackbar(e){this.uploadStatus=e,this.currentStatusIcon=this.statusIcons.filter(n=>n.status==this.uploadStatus.statusType)[0].name,this.uploadStatus.status=!0,setTimeout(()=>{this.uploadStatus.status=!1},2e3)}filechange(e){var n;null===(n=this.uploadQuizgroup.get("file"))||void 0===n||n.setValue(e.target.files[0])}uploadExcel(){var e,n;return(0,g.mG)(this,void 0,void 0,function*(){if(!this.uploadQuizgroup.valid)return void this.openSnackbar({status:!0,message:"Please choose the file to upload!",statusType:"failed"});if(null===(e=this.uploadQuizgroup.get("file"))||void 0===e||!e.valid)return void this.openSnackbar({status:!0,message:"Please choose the file to upload!",statusType:"failed"});this.uploading=!0,this.uploadStatus.status=!1;const i=yield this.loadingCtrl.create({message:"Uploading file...",duration:0});i.present();const l=yield this.service.uploadQuizExcelFile(null===(n=this.uploadQuizgroup.get("file"))||void 0===n?void 0:n.value),c=Object.assign(l,this.uploadQuizgroup.value);delete c.file;const p=new f.i;p.RequestUrl="quizes",p.RequestObject=c;try{const d=yield this.service.PostData(p).toPromise();if(null!=d){if(i.dismiss(),d.error)return this.openSnackbar({status:!0,message:d.response,statusType:"failed"}),"";this.uploading=!1,this.openSnackbar({status:!0,message:d.response||"File uploaded successfully!",statusType:"info"}),this.clearformcontrols()}}catch(d){console.error(d)}})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(M.eN),t.Y36(Q.H7),t.Y36(_.F0),t.Y36(O.Q),t.Y36(_.gz),t.Y36(r.qu),t.Y36(a.HT))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-quiz"]],viewQuery:function(e,n){if(1&e&&t.Gf(a.ki,5),2&e){let i;t.iGM(i=t.CRH())&&(n.modal=i.first)}},decls:14,vars:4,consts:[[3,"translucent"],["slot","start"],["name","chevron-back-outline",3,"click"],[1,"ion-padding",3,"fullscreen"],[3,"inset"],["detail","false",3,"button","click",4,"ngFor","ngForOf"],["slot","fixed","vertical","bottom","horizontal","end"],["size","small","id","open-modal","expand","block"],["name","add"],["trigger","open-modal"],["detail","false",3,"button","click"],["color","medium",1,"ion-text-wrap"],["slot","end",1,"metadata-end-wrapper"],["color","medium"],["color","medium","name","chevron-forward"],["id","white-background",1,"ion-padding"],[3,"formGroup"],["href","assets\\sample question paper.xlsx","download","","vertical","top","horizontal","end"],["fill","outline",2,"margin-top","20px"],["fill",""],["position","floating"],["formControlName","paper_title","placeholder","Enter text"],[1,"tabs"],[1,"tab"],["for","chck3",1,"tab-label"],["type","checkbox","id","chck3"],[1,"tab-content"],["displayFormat","DD.MM.YYYY HH:mm",3,"showDefaultButtons","ionChange"],["formControlName","classId","placeholder","Select Class",3,"multiple","ionChange"],[3,"value",4,"ngFor","ngForOf"],["formControlName","lec_id","placeholder","Select Lecture",3,"multiple","ionChange"],[1,"drag-file-area"],["for","choose-file"],[1,"material-icons-outlined","upload-icon"],["src","assets\\upload.png","alt","","width","30px"],[1,"dynamic-message","browse-files-text"],["type","file","id","choose-file","accept",".xlsx","formControlName","file",1,"default-file-input",3,"change"],["expand","block",2,"margin-top","20px",3,"click"],["slot","start","name","cloud-upload-outline"],["name","lines-sharp-small",4,"ngIf"],["class","card",4,"ngIf"],[3,"value"],["name","lines-sharp-small"],[1,"card"],["size","large",3,"name"],[1,"message"]],template:function(e,n){1&e&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),t._uU(3," Quizes "),t.qZA(),t.TgZ(4,"ion-buttons",1)(5,"ion-icon",2),t.NdJ("click",function(){return n.backTopaper()}),t.qZA()()()(),t.TgZ(6,"ion-content",3)(7,"ion-list",4),t.YNc(8,P,13,6,"ion-item",5),t.qZA(),t.TgZ(9,"ion-fab",6)(10,"ion-fab-button",7),t._UZ(11,"ion-icon",8),t.qZA()(),t.TgZ(12,"ion-modal",9),t.YNc(13,q,50,11,"ng-template"),t.qZA()()),2&e&&(t.Q6J("translucent",!0),t.xp6(6),t.Q6J("fullscreen",!0),t.xp6(1),t.Q6J("inset",!0),t.xp6(1),t.Q6J("ngForOf",n.papers))},dependencies:[m.sg,m.O5,a.YG,a.Sm,a.FN,a.W2,a.x4,a.IJ,a.W4,a.Gu,a.gu,a.pK,a.Ie,a.Q$,a.q_,a.uN,a.t9,a.n0,a.PQ,a.yW,a.wd,a.sr,a.ki,a.QI,a.j9,r.Fj,r.JJ,r.JL,r.sg,r.u],styles:['@charset "UTF-8";.card[_ngcontent-%COMP%]{position:fixed;width:85%;bottom:0;z-index:1000;animation:_ngcontent-%COMP%_snackbar .3s cubic-bezier(.215,.61,.355,1);background:transparent;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);transition:al .3s ease-in}@keyframes _ngcontent-%COMP%_snackbar{0%{left:-200px}50%{left:10px}to{left:18px}}.drag-file-area[_ngcontent-%COMP%]{border:2px dashed #7b2cbf;border-radius:40px;margin:10px 0 15px;padding:30px 50px;width:100%;text-align:center}.drag-file-area[_ngcontent-%COMP%]   .upload-icon[_ngcontent-%COMP%]{font-size:50px}.drag-file-area[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:26px;margin:15px 0}.drag-file-area[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:19px}.drag-file-area[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .browse-files-text[_ngcontent-%COMP%]{color:#7b2cbf;font-weight:bolder;cursor:pointer}.browse-files[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:relative;top:-25px}.default-file-input[_ngcontent-%COMP%]{opacity:0}.header__btn--right[_ngcontent-%COMP%]{padding-right:32px;right:-25px;text-align:right}.header__btn[_ngcontent-%COMP%]{background-color:#86d8c9;border-radius:50%;box-shadow:0 2px 2px rgba(0,0,0,.1);cursor:pointer;height:80px;padding-top:18px;position:absolute;top:20px;width:80px;z-index:1200}.item.sc-ion-label-ios-h[_ngcontent-%COMP%], .item[_ngcontent-%COMP%]   .sc-ion-label-ios-h[_ngcontent-%COMP%]{padding:10px}#icon[_ngcontent-%COMP%]{font-size:30px}*[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}.unread-indicator[_ngcontent-%COMP%]{background:var(--ion-color-primary);width:10px;height:10px;border-radius:100%;position:absolute;inset-inline-start:12px;top:12px}.metadata-end-wrapper[_ngcontent-%COMP%]{position:absolute;top:10px;inset-inline-end:10px;font-size:.8rem;display:flex;align-items:center}ion-label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;max-width:calc(100% - 60px);overflow:hidden;text-overflow:ellipsis}ion-label[_ngcontent-%COMP%]   ion-note[_ngcontent-%COMP%]{font-size:.9rem}body[_ngcontent-%COMP%]{color:#fff;background:white;padding:0 1em 1em}h1[_ngcontent-%COMP%]{margin:0;line-height:2;text-align:center}h2[_ngcontent-%COMP%]{margin:0 0 .5em;font-weight:400}input[_ngcontent-%COMP%]{position:absolute;opacity:0;z-index:-1}.row[_ngcontent-%COMP%]{display:flex}.row[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%]{flex:1}.row[_ngcontent-%COMP%]   .col[_ngcontent-%COMP%]:last-child{margin-left:1em}.tabs[_ngcontent-%COMP%]{border-radius:8px;overflow:hidden;width:100%}.tab[_ngcontent-%COMP%]{width:100%;color:#000;overflow:hidden}.tab-label[_ngcontent-%COMP%]{display:flex;justify-content:space-between;background:white;cursor:pointer}.tab-label[_ngcontent-%COMP%]:after{content:"\\276f";width:1em;height:1em;text-align:center;transition:all .35s}.tab-content[_ngcontent-%COMP%]{max-height:0;padding:0 1em;color:#000;background:white;transition:all .35s}.tab-close[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding:1em;font-size:.75em;background:white;cursor:pointer}input[_ngcontent-%COMP%]:checked + .tab-label[_ngcontent-%COMP%]:after{transform:rotate(90deg)}input[_ngcontent-%COMP%]:checked ~ .tab-content[_ngcontent-%COMP%]{max-height:100vh;padding:1em}.default-rotated[_ngcontent-%COMP%]:after{transform:rotate(90deg)}.default-rotated[_ngcontent-%COMP%]:after{content:""}.default-opened[_ngcontent-%COMP%]{max-height:100vh;padding:1em}a[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:right}']}),o})()}];let I=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[_.Bz.forChild(w),_.Bz]}),o})(),U=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[m.ez,I,a.Pc,r.u5,r.UX,v.e]}),o})()},2722:(z,h,s)=>{s.d(h,{R:()=>g});var a=s(4482),m=s(5403),v=s(8421),_=s(5032);function g(r){return(0,a.e)((f,b)=>{(0,v.Xf)(r).subscribe((0,m.x)(b,()=>b.complete(),_.Z)),!b.closed&&f.subscribe(b)})}}}]);