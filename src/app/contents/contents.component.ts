import {
  Component,
  ElementRef,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  commonNavigation,
  ContentControls,
} from '../models/commonObjects.module';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';
import { WebService } from '../web.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
})
export class ContentsComponent {
  private _unsubscribeAll: Subject<any>;
  contentsData: any = [];
  filteredData: any = [];
  currentContent = 'video';
  contentDetails: commonNavigation = {
    from: '',
    classId: '',
    lec_id: '',
    contentId: '',
    content: '',
  };
  params: any = '';
  skeleton:boolean = false
  papers: any[] = [];
  uploadStatus: any = { status: false, message: '', statusType: '' };
  statusIcons = [
    { name: 'checkmark-circle-outline', status: 'success' },
    { name: 'close-circle-outline', status: 'failed' },
    { name: 'information-circle-outline', status: 'info' },
  ];
  currentStatusIcon: any = '';
  constructor(
    public http: HttpClient,
    public _https: WebService,
    public ActivatedRoute: ActivatedRoute,
    public router: Router,
    private sanitizer: DomSanitizer,  
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this._unsubscribeAll = new Subject();
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.params = param;
      if (param.reload === 'true') {
        this.fetchContentDetails(param.classId, param.lec_id);
        this.fetchpapersDetails()
        return
      }
      this.fetchContentDetails(param.classId, param.lec_id);
      this.fetchpapersDetails()

    });
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });
    this.papers = []
  }

  async fetchContentDetails(classId: any, lec_id: any) {
    this.skeleton = true
    const req = new Requestmodels();
    req.RequestUrl = `contentDetails/` + classId + '/' + lec_id;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.skeleton = false
            if (data.status !== 200) {
              return;
            }
            // fetch
            this.contentsData = data.response || [];
            this.filteredData = data.response.filter(
              (object: any) => object.content == this.currentContent
            );
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  backTolectures() {
    const classId = this.params?.classId;
    const practice = this.params?.practice === 'true' ? 'true' : '';
    const queryParams = { classId, reload: 'true', practice };
    const from = this.params?.from;
    this.router.navigate([from], {
      queryParams,
    });
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  switchContent(content: any) {
    this.filteredData = this.contentsData.filter(
      (object: any) => object.content == content
    );
  }

  public uploadContent(content: any) {
    const queryParams: commonNavigation = {
      classId: this.params.classId,
      lec_id: this.params.lec_id,
      contentId: this.params.contentId,
      from: '/tabs/contents',
      content: content,
      nested: this.params.nested,
      reload: 'true',
    };
    this.router.navigate(['/tabs/uploadVideo'], { queryParams });
  }

  public uploadQuiz(content: any) {
    const queryParams: commonNavigation = {
      classId: this.params.classId,
      lec_id: this.params.lec_id,
      contentId: this.params.contentId,
      from: '/tabs/contents',
      content: content,
      nested: this.params.nested,
      reload: 'true',
    };
    this.router.navigate(['/tabs/quiz'], { queryParams });
  }

  routeTocontentControls(contentDetails: any) {
    this.router.navigate(['/tabs/content-controls'], {
      queryParams: {
        nested: this.params.from,
        from: '/tabs/contents',
        classId: this.params.classId,
        lec_id: this.params.lec_id,
        contentId: contentDetails._id,
        content: contentDetails.content,
        reload: 'true',
      },
    });

    const userProfile = {
      userid: this._https.UserProfile.userId, // Replace with the actual user ID
      datetime: new Date().toISOString(), // Current date and time in ISO format
    };
    
    this.addViewCount(contentDetails._id,userProfile)
  }


  async fetchpapersDetails() {
    this.papers = []
    if (!this.params.classId && !this.params.lec_id) {
      return
    }
    this.skeleton = true
    const req = new Requestmodels();
    req.RequestUrl = `fetchquizes/${this.params.classId}/${this.params.lec_id}`;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.skeleton = false
            if (data.status !== 200) {
              this.openSnackbar({
                status: true,
                message: data.response,
                statusType: 'failed',
              });
              return;
              return;
            }

            // fetch
            this.papers = data.response || [];
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }


  openSnackbar(uploadStatus: any) {
    this.uploadStatus = uploadStatus;
    this.currentStatusIcon = this.statusIcons.filter(
      (obj) => obj.status == this.uploadStatus.statusType
    )[0].name;
    this.uploadStatus.status = true;
    setTimeout(() => {
      this.uploadStatus.status = false;
    }, 2000);
  }

  

  async addViewCount(contentId:any,userProfile:any){
    const payload = {
      classId : this.params.classId,
      lec_id : this.params.lec_id,
      contentId : contentId,
      userProfile : userProfile
    }
    this.skeleton = true
    const req = new Requestmodels();
    req.RequestUrl = `upsertViewCount`;
    req.RequestObject = payload;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.skeleton = false
            if (data.status !== 200) {
              return;
            }
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  routeToQuiz(data: any) {
    const queryParams = {
      classId: data.classId,
      lec_id: data.lec_id,
      paperId: data._id,
      from: '/tabs/contents',
      reload: 'true',
    };
    this.router.navigate(['/tabs/test'], { queryParams });

    const userProfile  = {
      userId: this._https.UserProfile.userId,
      time: new Date().toISOString(),
    }

    this.addAttemptedUsers(data._id,userProfile)
  }

  async addAttemptedUsers(paperId:any,userProfile:any){

    const payload = {
      classId : this.params.classId,
      lec_id : this.params.lec_id,
      paperId : paperId,
      userProfile : userProfile
    }
    this.skeleton = true
    const req = new Requestmodels();
    req.RequestUrl = `upsertAttemptedUsers`;
    req.RequestObject = payload;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.skeleton = false
            if (data.status !== 200) {
              return;
            }
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

}
