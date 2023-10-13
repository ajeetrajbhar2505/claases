import {
  Component,
  ElementRef,
  OnInit,
  Optional,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RangeCustomEvent, RangeValue } from '@ionic/core';
import { environment } from 'src/environments/environment';
import { commonNavigation,ContentControls } from '../models/commonObjects.module';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';
import { WebService } from '../web.service';
import { NavigationExtras } from '@angular/router';

const navigationExtras: NavigationExtras = {
  queryParams: { reload: 'true' }, // Add the "reload" query parameter
};
@Component({
  selector: 'app-content-controls',
  templateUrl: './content-controls.component.html',
  styleUrls: ['./content-controls.component.scss'],
})
export class ContentControlsComponent  {
  private _unsubscribeAll: Subject<any>;
  @ViewChild('contentPlayer', { static: true }) contentplayer!: ElementRef;
  lastEmittedValue!: RangeValue;

  contentToWatch: any = {};

  contentControls: ContentControls = {
    playContent: false,
    openFullscreen: false,
    Rangeduration: 0,
    currentRangeDuration: 0,
    currentDuration: '',
    duration: '',
  };

  contentDetails: commonNavigation = {
    nested: '',
    from: '',
    classId: '',
    lec_id: '',
    contentId: '',
    content: '',
  };

  contentLoaded = false;

  constructor(
    public http: HttpClient,
    public ActivatedRoute: ActivatedRoute,
    public router: Router,
    private sanitizer: DomSanitizer,
    public fb: FormBuilder,public _https:WebService,
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this._unsubscribeAll = new Subject()
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.contentDetails = param;
      this.contentLoaded = false
      this.contentControls =  {
        playContent: false,
        openFullscreen: false,
        Rangeduration: 0,
        currentRangeDuration: 0,
        currentDuration: '',
        duration: '',
      }
      this.contentToWatch = {};
      this.fetchContentDetails(param.classId,param.lec_id,param.contentId)
      this.ActivatedRoute.queryParams.subscribe((params: any) => {
        if (params.reload === 'true') {
          this.fetchContentDetails(param.classId,param.lec_id,param.contentId)
        }
      });
    })
      
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });

  }

  async fetchContentDetails(classId:any,lec_id:any,contentId:any) {
    this.contentLoaded = false
    const req = new Requestmodels()
    req.RequestUrl = `content/` + classId + '/' + lec_id + '/' + contentId;
    req.RequestObject = ""
  
    await this._https
     .fetchData(req)
     .pipe(takeUntil(this._unsubscribeAll))
     .subscribe(
      (data) => {
       if (data != null) {
        if (data.status !== 200) {
         return
        }
  
        
        // fetch 
        this.contentToWatch = data.response[0] || {}
        this.contentLoaded = true

       }
      },
      (_error) => {
       return;
      },
      () => {
  
      }
  
     )
    }


  private getContentElement(): HTMLVideoElement | null {
    return document.querySelector<HTMLVideoElement>('#classContent');
  }

  backToContents() {
    const content = this.getContentElement();
    if (content) {
      content.pause();
    }

    const queryParams:commonNavigation = {
      classId: this.contentDetails.classId,
      lec_id: this.contentDetails.lec_id,
      contentId: this.contentDetails.contentId,
      from: this.contentDetails.nested,
    };
    this.router.navigate([this.contentDetails.from], { queryParams });

    this.contentControls.playContent = false;
    this.contentControls.openFullscreen = false;
  }

  getImgContent(url: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onIonKnobMovecontent(ev: Event, ended: boolean) {
    const detail: any = (ev as CustomEvent<RangeCustomEvent>).detail;
    const content: any = this.getContentElement();
    if (content && detail) {
      content.currentTime = detail.value;
      this.contentControls.Rangeduration = content.duration;
      this.contentControls.currentRangeDuration = content.currentTime;

      if (ended || Math.floor(content.currentTime) >= Math.floor(content.duration)) {
        content.play();
        this.contentControls.playContent = false;
      }
      else {
        content.pause()
      }

    }
  }

  checkContentLoaded() {
    this.contentLoaded = true;
    const content = this.getContentElement();
    if (content) {
      if (content.paused) {
        this.contentControls.playContent = true;
      } else {
        this.contentControls.playContent = false;
      }
      this.contentControls.Rangeduration = content.duration;
      this.contentControls.duration = this.formatTime(content.duration);
    }
  }

  checkContinuousContentduration() {
    const content = this.getContentElement();
    if (content) {
      this.contentControls.currentRangeDuration = parseInt(content.currentTime.toFixed(2));
      this.contentControls.currentDuration = this.formatTime(content.currentTime.toFixed(2));
      if (content.paused) {
        this.contentControls.playContent = true;
      } else {
        this.contentControls.playContent = false;
      }
    }
  }

  formatTime(duration: any) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    let formattedDuration = '';

    if (hours > 0) {
      formattedDuration += `${hours}:`;
    }

    if (minutes < 10) {
      formattedDuration += `0${minutes}:`;
    } else {
      formattedDuration += `${minutes}:`;
    }

    if (seconds < 10) {
      formattedDuration += `0${Math.floor(seconds)}`;
    } else {
      formattedDuration += `${Math.floor(seconds)}`;
    }

    return formattedDuration;
  }

  pinFormatter(value: number) {
    return value ? `${value}` : '0';
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  playPauseContent() {
    if (!this.contentLoaded) {
      return;
    }

    const content = this.getContentElement();
    if (content) {
      if (content.paused) {
        content.play();
      } else {
        content.pause();
      }
      this.contentControls.playContent = !content.paused;
    }
  }


  skipContent(delta: number) {
    const content = this.getContentElement();
    if (content) {
      content.currentTime += delta;
      this.contentControls.currentRangeDuration = content.currentTime;
    }
  }

  rewindContent(delta: number) {
    const content = this.getContentElement();
    if (content) {
      content.currentTime -= delta;
      this.contentControls.currentRangeDuration = content.currentTime;
    }
  }

  restartContent() {
    const content = this.getContentElement();
    if (content) {
      content.currentTime = 0;
      this.contentControls.currentRangeDuration = content.currentTime;
    }
  }

  toggleFullscreenContent() {
      this.contentControls.openFullscreen = !this.contentControls.openFullscreen;
  }


  
  isVideoOrAudioContent(content:any)
  {
    if (content == 'video' || content == 'audio') {
      return true
    }
    return false
  }

  
}
