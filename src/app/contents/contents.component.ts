import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
})
export class ContentsComponent  {
  contentsData:any =  []
  filteredData:any = []
  currentContent = "video"
  contentDetails: any = {
    from: '',
    classId: '',
    lec_id: '',
    contentId: '',
    content: ''
    };
  params:any = ""
  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.params = param
      const lecturesData: any = await this.http.get('assets/LecturesWiseVideos.json').toPromise()
        lecturesData.filter((Object:any)=>{
          if (Object.lec_id == param.lec_id) {
            this.contentsData = Object['contents']
            this.filteredData =  Object['contents'].filter((object:any)=> object.content == this.currentContent)
          }
      })

    })
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });

  }

  backTolectures() {
    this.router.navigate([this.params.from],{queryParams : { classId : this.params.classId}})
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }


  switchContent(content:any)
  {
   this.filteredData =  this.contentsData.filter((object:any)=> object.content == content)
  }
  
  public uploadContent(content:any){
    this.router.navigate(['/tabs/uploadVideo/' + content],{queryParams : {nested : this.params.from, from : '/tabs/contents',classId : this.params.classId,}})
  }

  routeTocontentControls(contentDetails:any)
  {
    this.router.navigate(['/tabs/content-controls'],{queryParams : { nested : this.params.from, from : '/tabs/contents', classId : this.params.classId,lec_id : this.params.lec_id,contentId : contentDetails.contentId,content : contentDetails.content}})
  }
}
