"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5215],{5215:(N,b,c)=>{c.r(b),c.d(b,{CalenderModule:()=>A});var h=c(6895),u=c(5638),C=c(655),x=c(463),M=c(7579),O=c(2722),e=c(8256),P=c(2684),s=c(4556);function w(r,i){if(1&r&&(e.TgZ(0,"div")(1,"div",28)(2,"span"),e._uU(3),e.qZA()()()),2&r){const t=i.$implicit,n=e.oxw(2);e.Tol(n.currentDate===t.date?"calendar-table__col calendar-table__today":n.checkSeriesDateExists(t.day,t.day+2,t.date)?"calendar-table__col calendar-table__event calendar-table__event--long calendar-table__event--start":n.isBetweenSeries(t.day,t.date)?"calendar-table__col calendar-table__event calendar-table__event--long":n.isSeriesEnd(t.day,t.date)?"calendar-table__col calendar-table__event calendar-table__event--long calendar-table__event--end":n.checkDateExists(t.day,t.date)?"calendar-table__col calendar-table__event":(n.checkLargestDayEndsAndNextDayStarts(t.day,t.date),"calendar-table__col")),e.xp6(3),e.Oqu(t.day)}}function y(r,i){if(1&r&&(e.TgZ(0,"div",18),e.YNc(1,w,4,3,"div",27),e.qZA()),2&r){const t=i.$implicit;e.xp6(1),e.Q6J("ngForOf",t)}}function k(r,i){1&r&&(e.TgZ(0,"div",29),e._UZ(1,"img",30),e.qZA())}function Z(r,i){if(1&r&&(e.TgZ(0,"li",31)(1,"div",32)(2,"span",33),e._uU(3),e.qZA(),e.TgZ(4,"span",34),e._uU(5),e.qZA()(),e.TgZ(6,"span",35),e._uU(7),e.qZA()()),2&r){const t=i.$implicit,n=i.index;e.xp6(3),e.Oqu(t.title),e.xp6(2),e.Oqu(t.month),e.xp6(1),e.Q6J("ngClass",n%2==0?"events__tag--highlighted":""),e.xp6(1),e.Oqu(t.time)}}const f={queryParams:{reload:"true"}},D=[{path:"",component:(()=>{class r{constructor(t,n,a){this.router=t,this.service=n,this.ActivatedRoute=a,this.currentDate="",this.calendarDates=[],this.transformedCalenderEvents=[],this.calenderEvents=[],this.spinner=!1,this._unsubscribeAll=new M.x,this.currentMonth=(new Date).getMonth(),this.currentMonthName=(new Date).toLocaleString("default",{month:"long"}),this.currentYear=(new Date).getFullYear()}ngOnInit(){this.generateCalendarDates(this.currentYear,this.currentMonth),this.ActivatedRoute.queryParams.subscribe(t=>{"true"===t.reload&&this.generateCalendarDates(this.currentYear,this.currentMonth)})}generateCalendarDates(t,n){const a=new Date(2023,n,1).toLocaleString("default",{month:"short"});this.getMonthWiseCalenderDetails(a),this.calendarDates=[];const o=new Date(t,n,1).getDay(),d=new Date(t,n+1,0).getDate();let l=[],_=1;for(let p=0;p<o;p++)l.push("");for(;_<=d;)l.push(_),7===l.length&&(this.calendarDates.push([...l]),l=[]),_++;for(;l.length<7;)l.push("");7===l.length&&this.calendarDates.push([...l]);let g=0;const S=n+1;this.calendarDates=this.calendarDates.map(p=>p.map(v=>{g++;const U=v.toString().padStart(2,"0");return{day:v,date:`${U}-${g>d?S.toString().padStart(2,"0"):(n+1).toString().padStart(2,"0")}-${t}`}}))}getMonthWiseCalenderDetails(t){return(0,C.mG)(this,void 0,void 0,function*(){this.spinner=!0,this.calenderEvents=[],this.transformedCalenderEvents=[];const n=new x.i;n.RequestUrl=`CalenderDetails/${t}`,n.RequestObject="",yield this.service.fetchData(n).pipe((0,O.R)(this._unsubscribeAll)).subscribe(a=>{if(null!=a){if(200!==a.status)return;this.spinner=!1,this.calenderEvents=a.response||[],this.transformedCalenderEvents=[],this.transformedCalenderEvents=this.transformCalendarEvents(this.calenderEvents)}},a=>{},()=>{})})}chunkArray(t,n){const a=[];for(let o=0;o<t.length;o+=n)a.push(t.slice(o,o+n));return a}checkDateExists(t,n){return this.calenderEvents.some(a=>a.day===t&&a.date===n)}checkSeriesDateExists(t,n,a){for(let o=t;o<=n;o++)if(!this.calenderEvents.some(d=>d.day===o&&d.date===a))return!1;return!0}isBetweenSeries(t,n){return this.checkSeriesDateExists(t-1,t+1,n)&&!this.checkSeriesDateExists(t-2,t+2,n)}isSeriesEnd(t,n){return this.checkSeriesDateExists(t-2,t,n)}checkLargestDayEndsAndNextDayStarts(t,n){return!(!this.calenderEvents.some(a=>a.day===t&&a.date===n)||this.calenderEvents.some(a=>a.day===t+1&&a.date===n))}goToPreviousMonth(){0===this.currentMonth?(this.currentMonth=11,this.currentYear--):this.currentMonth--,this.currentMonthName=new Date(this.currentYear,this.currentMonth,1).toLocaleString("default",{month:"long"}),this.generateCalendarDates(this.currentYear,this.currentMonth)}backToHome(){this.router.navigate(["/tabs/home"],f)}routeToEvents(){this.router.navigate(["/tabs/Events"],f)}goToNextMonth(){11===this.currentMonth?(this.currentMonth=0,this.currentYear++):this.currentMonth++,this.currentMonthName=new Date(this.currentYear,this.currentMonth,1).toLocaleString("default",{month:"long"}),this.generateCalendarDates(this.currentYear,this.currentMonth)}transformCalendarEvents(t){const n=[];let a=0;for(;a<t.length;){const o=t[a];let d=o.day,l=o.day;const _=o.month,g=o.title;for(;a+1<t.length&&t[a+1].day===l+1&&t[a+1].title===g;)l=t[a+1].day,a++;o.month=`${_} ${d}`,d!==l&&(o.month=`${_} ${d} - ${_} ${l}`),n.push({day:d,time:o.time,month:o.month,title:g,date:o.date}),a++}return n}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(u.F0),e.Y36(P.Q),e.Y36(u.gz))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-calender"]],decls:47,vars:8,consts:[[3,"translucent"],["slot","start"],["size","large","name","chevron-back-outline",3,"click"],[3,"fullscreen"],[1,"main-container-wrapper"],["title","Add event",1,"header__btn","header__btn--right",3,"click"],["width","26px","xmlns","http://www.w3.org/2000/svg","viewBox","0 0 512 512",1,"icon"],["fill","#fff","d","M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"],[1,"calendar-container"],[1,"calendar-container__header"],["title","Previous",1,"calendar-container__btn","calendar-container__btn--left",3,"click"],["name","chevron-back-outline"],[1,"calendar-container__title"],["title","Next",1,"calendar-container__btn","calendar-container__btn--right",3,"click"],["name","chevron-back-outline",2,"transform","rotate(180deg)"],[1,"calendar-container__body"],[1,"calendar-table"],[1,"calendar-table__header"],[1,"calendar-table__row"],[1,"calendar-table__col"],[1,"calendar-table__body"],["class","calendar-table__row",4,"ngFor","ngForOf"],[1,"events-container"],[1,"events__title"],[1,"events__list"],["style","text-align: center;",4,"ngIf"],["class","events__item",4,"ngFor","ngForOf"],[3,"class",4,"ngFor","ngForOf"],[1,"calendar-table__item"],[2,"text-align","center"],["src","assets\\loader\\spin.gif","width","50px","alt",""],[1,"events__item"],[1,"events__item--left"],[1,"events__name"],[1,"events__date"],[1,"events__tag",3,"ngClass"]],template:function(t,n){1&t&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e._uU(3," Scheduled Lectures "),e.qZA(),e.TgZ(4,"ion-buttons",1)(5,"ion-icon",2),e.NdJ("click",function(){return n.backToHome()}),e.qZA()()()(),e.TgZ(6,"ion-content",3)(7,"div",4)(8,"header")(9,"button",5),e.NdJ("click",function(){return n.routeToEvents()}),e.O4$(),e.TgZ(10,"svg",6),e._UZ(11,"path",7),e.qZA()()(),e.kcU(),e.TgZ(12,"main")(13,"div",8)(14,"div",9)(15,"button",10),e.NdJ("click",function(){return n.goToPreviousMonth()}),e._UZ(16,"ion-icon",11),e.qZA(),e.TgZ(17,"h2",12),e._uU(18),e.qZA(),e.TgZ(19,"button",13),e.NdJ("click",function(){return n.goToNextMonth()}),e._UZ(20,"ion-icon",14),e.qZA()(),e.TgZ(21,"div",15)(22,"div",16)(23,"div",17)(24,"div",18)(25,"div",19),e._uU(26,"S"),e.qZA(),e.TgZ(27,"div",19),e._uU(28,"M"),e.qZA(),e.TgZ(29,"div",19),e._uU(30,"T"),e.qZA(),e.TgZ(31,"div",19),e._uU(32,"W"),e.qZA(),e.TgZ(33,"div",19),e._uU(34,"T"),e.qZA(),e.TgZ(35,"div",19),e._uU(36,"F"),e.qZA(),e.TgZ(37,"div",19),e._uU(38,"S"),e.qZA()(),e.TgZ(39,"div",20),e.YNc(40,y,2,1,"div",21),e.qZA()()()()(),e.TgZ(41,"div",22)(42,"span",23),e._uU(43),e.qZA(),e.TgZ(44,"ul",24),e.YNc(45,k,2,0,"div",25),e.YNc(46,Z,8,4,"li",26),e.qZA()()()()()),2&t&&(e.Q6J("translucent",!0),e.xp6(6),e.Q6J("fullscreen",!0),e.xp6(12),e.AsE("",n.currentMonthName," ",n.currentYear,""),e.xp6(22),e.Q6J("ngForOf",n.calendarDates),e.xp6(3),e.hij("",n.transformedCalenderEvents.length||n.spinner?"":"No "," Upcoming events this month"),e.xp6(2),e.Q6J("ngIf",n.spinner),e.xp6(1),e.Q6J("ngForOf",n.transformedCalenderEvents))},dependencies:[h.mk,h.sg,h.O5,s.Sm,s.W2,s.Gu,s.gu,s.wd,s.sr],styles:["*[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%}body[_ngcontent-%COMP%]{-webkit-font-smoothing:antialiased;font-family:Montserrat,sans-serif;text-rendering:optimizeLegibility;background:#fcfcfc}.mock-up-link[_ngcontent-%COMP%]{display:none}@media (min-width: 768px){.mock-up-link[_ngcontent-%COMP%]{display:block}}.main-container-wrapper[_ngcontent-%COMP%]{background-color:#f8fafa;min-width:320px;min-height:100%;max-width:414px;overflow-y:auto}@media (min-width: 415px){.main-container-wrapper[_ngcontent-%COMP%]{box-shadow:0 32px 47px rgba(32,23,23,.09);margin:24px auto}}header[_ngcontent-%COMP%]{background-color:#fff;display:flex;height:58px;justify-content:space-between;overflow:hidden;position:relative}.header__btn[_ngcontent-%COMP%]{background-color:#86d8c9;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 2px rgba(0,0,0,.1);cursor:pointer;height:80px;padding-top:18px;position:absolute;top:-25px;width:80px}.header__btn[_ngcontent-%COMP%]:hover, .header__btn[_ngcontent-%COMP%]:focus{background:#67cebb;transition:all .3s ease-in;outline:none}.header__btn[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{display:inline-block}.header__btn--left[_ngcontent-%COMP%]{left:-25px;padding-left:38px;text-align:left}.header__btn--right[_ngcontent-%COMP%]{padding-right:32px;right:-25px;text-align:right}.calendar-container[_ngcontent-%COMP%]{background-color:#fff;padding:16px;margin-bottom:24px}.calendar-container__header[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.calendar-container__btn[_ngcontent-%COMP%]{background:transparent;border:0;cursor:pointer;font-size:16px;outline:none;color:#e9e8e8}.calendar-container__btn[_ngcontent-%COMP%]:hover, .calendar-container__btn[_ngcontent-%COMP%]:focus{color:#9faab7;transition:all .3s ease-in}.calendar-container__title[_ngcontent-%COMP%]{color:#222741;font-size:20px;font-weight:700}.calendar-table[_ngcontent-%COMP%]{margin-top:12px;width:100%}.calendar-table__item[_ngcontent-%COMP%]{border:2px solid transparent;border-radius:50%;color:#424588;font-size:12px;font-weight:700;width:100%;height:100%;display:flex;align-items:center;justify-content:center;cursor:pointer}.calendar-table__item[_ngcontent-%COMP%]:hover{background:#f8fafa;box-shadow:0 2px 2px rgba(0,0,0,.1);transition:.2s all ease-in}.calendar-table__row[_ngcontent-%COMP%]{display:flex}.calendar-table__header[_ngcontent-%COMP%]{border-bottom:2px solid #F2F6F8;margin-bottom:4px}.calendar-table__header[_ngcontent-%COMP%]   .calendar-table__col[_ngcontent-%COMP%]{display:inline-block;color:#99a4ae;font-size:12px;font-weight:700;padding:12px 3px;text-align:center;text-transform:uppercase;width:40px;height:38px}@media (min-width: 360px){.calendar-table__header[_ngcontent-%COMP%]   .calendar-table__col[_ngcontent-%COMP%]{width:46px}}@media (min-width: 410px){.calendar-table__header[_ngcontent-%COMP%]   .calendar-table__col[_ngcontent-%COMP%]{width:54px}}.calendar-table__body[_ngcontent-%COMP%]   .calendar-table__col[_ngcontent-%COMP%]{width:40px;height:45px;padding-bottom:2px}@media (min-width: 360px){.calendar-table__body[_ngcontent-%COMP%]   .calendar-table__col[_ngcontent-%COMP%]{width:46px;height:51px}}@media (min-width: 410px){.calendar-table__body[_ngcontent-%COMP%]   .calendar-table__col[_ngcontent-%COMP%]{width:55px;height:60px}}.calendar-table__today[_ngcontent-%COMP%]   .calendar-table__item[_ngcontent-%COMP%]{border-color:#fefefe;background-color:#f2f6f8;box-shadow:0 2px 2px rgba(0,0,0,.1)}.calendar-table__event[_ngcontent-%COMP%]   .calendar-table__item[_ngcontent-%COMP%]{background-color:#66dcec;border-color:#fefefe;color:#fff}.calendar-table__event--long[_ngcontent-%COMP%]{overflow-x:hidden}.calendar-table__event--long[_ngcontent-%COMP%]   .calendar-table__item[_ngcontent-%COMP%]{border-radius:0;border-width:2px 0}.calendar-table__event--start[_ngcontent-%COMP%]   .calendar-table__item[_ngcontent-%COMP%]{border-left:2px solid #fff;border-radius:50% 0 0 50%}.calendar-table__event--start.calendar-table__col[_ngcontent-%COMP%]:last-child   .calendar-table__item[_ngcontent-%COMP%]{border-width:2px}.calendar-table__event--end[_ngcontent-%COMP%]   .calendar-table__item[_ngcontent-%COMP%]{border-right:2px solid #fff;border-radius:0 50% 50% 0}.calendar-table__event--end.calendar-table__col[_ngcontent-%COMP%]:first-child   .calendar-table__item[_ngcontent-%COMP%]{border-width:2px}.calendar-table__inactive[_ngcontent-%COMP%]   .calendar-table__item[_ngcontent-%COMP%]{color:#dcdce3;cursor:default}.calendar-table__inactive[_ngcontent-%COMP%]   .calendar-table__item[_ngcontent-%COMP%]:hover{background:transparent;box-shadow:none}.calendar-table__inactive.calendar-table__event[_ngcontent-%COMP%]   .calendar-table__item[_ngcontent-%COMP%]{color:#fff;opacity:.25}.calendar-table__inactive.calendar-table__event[_ngcontent-%COMP%]   .calendar-table__item[_ngcontent-%COMP%]:hover{background:#66DCEC;box-shadow:0 2px 2px rgba(0,0,0,.1)}.events-container[_ngcontent-%COMP%]{padding:0 15px}.events__title[_ngcontent-%COMP%]{color:#bec1ca;display:inline-block;font-size:14px;font-weight:600;margin-bottom:16px}.events__tag[_ngcontent-%COMP%]{background:#66DCEC;border:2px solid #FEFEFE;box-shadow:0 2px 2px rgba(0,0,0,.1);border-radius:20px;color:#fff;font-size:10px;font-weight:600;width:60px;margin-left:16px;padding:5px 2px;text-align:center}.events__tag--highlighted[_ngcontent-%COMP%]{background:#FDCA40}.events__item[_ngcontent-%COMP%]{background:#fff;border-left:8px solid #86D8C9;border-radius:2px;box-shadow:0 6px 12px rgba(0,0,0,.05);padding:15px 16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.events__item--left[_ngcontent-%COMP%]{width:calc(100% - 76px)}.events__name[_ngcontent-%COMP%]{font-size:12px;font-weight:700;color:#222741;display:block;margin-bottom:6px}.events__date[_ngcontent-%COMP%]{font-size:12px;color:#9faab7;display:inline-block}"]}),r})()}];let T=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[u.Bz.forChild(D),u.Bz]}),r})();var m=c(433),E=c(6529);let A=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[h.ez,T,E.a,s.Pc,m.u5,m.UX]}),r})()}}]);