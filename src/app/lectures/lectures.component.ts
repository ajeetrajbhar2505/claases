import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Subject,takeUntil } from 'rxjs';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Requestmodels } from '../models/Requestmodels.module';
import { WebService } from '../web.service';
import { NavigationExtras } from '@angular/router';

const navigationExtras: NavigationExtras = {
  queryParams: { reload: 'true' }, // Add the "reload" query parameter
};

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss'],
})
export class LecturesComponent  {
  private _unsubscribeAll: Subject<any>;
  lecturesData: any[] = []
  classId = ''
  skeleton:boolean = false

  constructor(public http: HttpClient, public _https:WebService,public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public fb: FormBuilder, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this._unsubscribeAll = new Subject()
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.classId = param.classId
      this.lecturesData = []
      this.fetchlectureDetails(param.classId)

      if (param.reload === 'true') {
        this.fetchlectureDetails(param.classId)
      }
    })
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });

  }


  async fetchlectureDetails(classId:any) {
    this.skeleton = true
    const req = new Requestmodels()
    req.RequestUrl = `lectureDetails/` + classId;
    req.RequestObject = ""
  
    await this._https
     .fetchData(req)
     .pipe(takeUntil(this._unsubscribeAll))
     .subscribe(
      (data) => {
       if (data != null) {
        this.skeleton = false
        if (data.status !== 200) {
         return
        }
  
        
        // fetch
         this.lecturesData = data.response || []
       }
      },
      (_error) => {
       return;
      },
      () => {
  
      }
  
     )
    }


  routeTocontents(lec_id: any) {
    this.router.navigate(['/tabs/contents'],{queryParams : {classId : this.classId, lec_id : lec_id,from : '/tabs/lectures',reload : 'true'}})
   }

  backToclass() {
    this.router.navigate(['/tabs/class'],navigationExtras)
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }


}
