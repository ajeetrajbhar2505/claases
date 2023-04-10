import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WebService } from '../web.service';

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
  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, private platform: Platform,public service:WebService,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.params = param
     await this.getContentsLectureswise(param.classId,param.lec_id)

    })
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });

  }

  async getContentsLectureswise(classId:any,lec_id:any) {
    try {
      let response:any =  await this.http.get(environment.nodeApi + 'contents/' + classId + '/' + lec_id).toPromise();
      if (response.status == 200) {
        this.contentsData =  response['message']
        this.filteredData =  response['message'].filter((object:any)=> object.content == this.currentContent)

      } else {
      this.contentsData = []
    }
    } catch (error) {
      this.contentsData = []
    }
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
  

  routeTocontentControls(contentDetails:any)
  {
    this.router.navigate(['/tabs/content-controls'],{queryParams : { nested : this.params.from, from : '/tabs/contents', classId : this.params.classId,lec_id : this.params.lec_id,contentId : contentDetails.contentId,content : contentDetails.content}})
  }


  sendMessage(message:any)
  {
    this.service.socket.emit('live',message)
  }
}
