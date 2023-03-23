import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RangeCustomEvent, RangeValue } from '@ionic/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
})
export class ContentsComponent  {
  contentsData:any =  []
  filteredData:any = []
  currentContent = "video"
  from:any = ""
  classId:any = ""
  contentDetails: any = {
    from: '',
    classId: '',
    lectureId: '',
    contentId: '',
    content: ''
    };

  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public fb: FormBuilder, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.classId = param.classId
      this.from = param.from
      let response: any = await this.http.get('assets/LecturesWiseVideos.json').toPromise().then((response: any) => {
        response.filter((Object:any)=>{
          if (Object.lec_id == param.lec_id) {
            this.contentsData = Object['contents']
            this.filteredData =  Object['contents'].filter((object:any)=> object.content == this.currentContent)
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

  backTolectures() {
    this.router.navigate([this.from],{queryParams : { classId : this.classId}})
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }


  switchContent(content:any)
  {
   this.filteredData =  this.contentsData.filter((object:any)=> object.content == content)
  }
  

  routeTocontentControls(contentDetails:any)
  {
    this.router.navigate([this.from],{queryParams : { from : '', classId : contentDetails.classId,lectureId : contentDetails.lectureId,contentId : contentDetails.contentId,content : contentDetails.content}})
  }

}
