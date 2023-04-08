import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss'],
})
export class LecturesComponent  {
  lecturesData: any[] = []
  classId = ''
  

  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public fb: FormBuilder, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.classId = param.classId
       await this.getLecturesClasseswise(this.classId)

    })
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });

  }

  async getLecturesClasseswise(classId:any) {
    try {
      let response:any =  await this.http.get(environment.nodeApi + 'lectures/' + classId).toPromise();
      if (response.status == 200) {
        this.lecturesData =  response['message']
      } else {
      this.lecturesData = []
    }
    } catch (error) {
      this.lecturesData = []
    }
  }


  routeTocontents(lec_id: any) {
    this.router.navigate(['/tabs/contents'],{queryParams : {classId : this.classId, lec_id : lec_id,from : '/tabs/lectures'}})
   }

  backToclass() {
    this.router.navigate(['/tabs/class'])
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }


}
