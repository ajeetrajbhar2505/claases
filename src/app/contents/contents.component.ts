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
      this.fetchContentDetails(param.classId, param.lec_id);
      if (param.reload === 'true') {
        this.fetchContentDetails(param.classId, param.lec_id);
      }
    });
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });
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
    this.router.navigate([this.params.from], {
      queryParams: { classId: this.params.classId, reload: 'true' },
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
  }
}
