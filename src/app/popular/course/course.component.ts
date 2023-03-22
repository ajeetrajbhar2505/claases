import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, ItemReorderEventDetail, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent  {
  lecturesData: any[] = []
  classId = ''
  

  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public fb: FormBuilder, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.classId = param.classId
      this.lecturesData = []
      let response: any = await this.http.get('assets/classWiseLectures.json').toPromise().then((response: any) => {
        response.filter((data: any) => {
          if (data.classId == 10) {
            this.lecturesData = data['subjects']
          }
        })

      })

    })
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });

  }

  routeTocontents(lecId: any) {
    this.router.navigate(['/tabs/contents'],{queryParams : {classId : this.classId, lecId : lecId,from : '/tabs/popular-course'}})
   }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }
}
