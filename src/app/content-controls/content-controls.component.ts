import {
  Component,
  ElementRef,
  OnInit,
  Optional,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RangeCustomEvent, RangeValue } from '@ionic/core';
import {
  commonNavigation,
  ContentControls,
} from '../models/commonObjects.module';
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
export class ContentControlsComponent implements OnDestroy {
  private _unsubscribeAll: Subject<any>;
  @ViewChild('contentPlayer', { static: true }) contentplayer!: ElementRef;
  lastEmittedValue!: RangeValue;

  contentToWatch: any = {};
  imagepath!: SafeUrl;

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
  loading: boolean = false;
  socket: any;
  FAQS: FAQ[] = [
    // { _id : '',author : 'ajeet rajbhar',authorProfile : 'https://lh3.googleusercontent.com/a/ACg8ocJALTzS2fpPpBzI01LiCts6FCCnlZtDhG0RRq_r_Jbfhx3S=s96-c',authorId : '47239478237847',label : 'Who invented OOP?',content : 'Alan Kay invented OOP, Andrea Ferro was a part of SmallTalk Development. Dennis invented C++ and Adele Goldberg was in team to develop SmallTalk but Alan actually had got rewarded for OOP'}
  ];

  FAQ: FAQ = new FAQ();
  videoPlaying: boolean = false
  isModelOpen:boolean = false


  constructor(
    public http: HttpClient,
    public ActivatedRoute: ActivatedRoute,
    public router: Router,
    private sanitizer: DomSanitizer,
    public fb: FormBuilder,
    public _https: WebService,
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this._unsubscribeAll = new Subject();
    this.socket = _https.socket;
    this.FAQS = [];
    this.FAQ = new FAQ();
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.getMessage(param.contentId);
      this.contentDetails = param;
      this.contentLoaded = false;
      this.contentControls = {
        playContent: false,
        openFullscreen: false,
        Rangeduration: 0,
        currentRangeDuration: 0,
        currentDuration: '',
        duration: '',
      };
      this.contentToWatch = {};

      this.fetchContentDetails(param.contentId);
      this.Querries();
      if (param.reload === 'true') {
        this.fetchContentDetails(param.contentId);
        this.Querries();
      }
    });

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });
    
  }

  OpenDialog(){
    this.isModelOpen = !this.isModelOpen
  }


  async fetchContentDetails(contentId: any) {
    this.contentLoaded = false;
    const req = new Requestmodels();
    req.RequestUrl = `content/` + contentId;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.contentToWatch = data.response || {};
            this.contentLoaded = true;
           this.imagepath =  this.sanitizer.bypassSecurityTrustResourceUrl(this.contentToWatch.content_link);
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

  private getContentElement(): HTMLVideoElement | null {
    return document.querySelector<HTMLVideoElement>('#classContent');
  }

  backToContents() {
    const content = this.getContentElement();
    if (content) {
      content.pause();
    }

    const queryParams: commonNavigation = {
      classId: this.contentDetails.classId,
      lec_id: this.contentDetails.lec_id,
      contentId: this.contentDetails.contentId,
      from: this.contentDetails.nested,
      reload: 'true',
    };
    this.router.navigate([this.contentDetails.from], { queryParams });

    this.contentControls.playContent = false;
    this.contentControls.openFullscreen = false;
    this.updateUserwiseVideoTime()
  }

  onIonKnobMovecontent(ev: Event, ended: boolean) {
    const detail: any = (ev as CustomEvent<RangeCustomEvent>).detail;
    const content: any = this.getContentElement();
    if (content && detail) {
      content.currentTime = detail.value;
      this.contentControls.Rangeduration = content.duration;
      this.contentControls.currentRangeDuration = content.currentTime;

      if (
        ended ||
        Math.floor(content.currentTime) >= Math.floor(content.duration)
      ) {
        content.play();
        this.contentControls.playContent = false;
      } else {
        content.pause();
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
      this.contentControls.currentRangeDuration = parseInt(
        content.currentTime.toFixed(2)
      );
      this.contentControls.currentDuration = this.formatTime(
        content.currentTime.toFixed(2)
      );
      this.videoPlaying = true
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
        this.contentControls.playContent = false;
      } else {
        content.pause();
        this.contentControls.playContent = true;
      }
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

  isVideoOrAudioContent(content: any) {
    if (content == 'video' || content == 'audio') {
      return true;
    }
    return false;
  }

  generateStyle(icon: any) {
    return `background-image: url('${icon}');`;
  }

  getMessage(classRoom: any) {
    this.socket.on(classRoom, (data: any) => {
      const index = this.FAQS.findIndex((item) => item._id === data._id);
      if (index !== -1) {
        // If the object with the same _id exists, replace it
        this.FAQS[index] = data;
      } else {
        // If no object with the same _id is found, push the new object into the array
        this.FAQS.push(data);
      }
    });
  }

  async Querries() {
    this.loading = true;
    const req = new Requestmodels();
    req.RequestUrl = `Querries/` + this.contentDetails.contentId;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.loading = false;
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.FAQS = [];
            this.FAQS = data.response || [];
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

  async sendTeacherMessage(content: any, _id: any) {
    const payload = {
      content: content,
      id: _id,
      contentId: this.contentDetails.contentId,
      notification: {
        icon: 'chatbox-ellipses-outline',
        content: this.contentDetails.content,
        classId: this.contentDetails.classId,
        lec_id: this.contentDetails.lec_id,
        contentId: this.contentDetails.contentId,
        from: '/tabs/home',
        topic: this.contentToWatch.content_title
      },
    };
    const req = new Requestmodels();
    req.RequestUrl = `upsertTeacherResponse`;
    req.RequestObject = payload;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }

            // fetch
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

  async sendAuthorMessage() {
    const payload = {
      label: this.FAQ.label,
      contentId: this.contentDetails.contentId,
      notification: {
        icon: 'chatbox-ellipses-outline',
        content: this.contentDetails.content,
        classId: this.contentDetails.classId,
        lec_id: this.contentDetails.lec_id,
        contentId: this.contentDetails.contentId,
        from: '/tabs/home',
        topic: this.contentToWatch.content_title
      },
    };
    const req = new Requestmodels();
    req.RequestUrl = `upsertUserQuerries`;
    req.RequestObject = payload;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.FAQ.label = '';
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

  async ngOnDestroy() {
    this.updateUserwiseVideoTime()
  }

  async updateUserwiseVideoTime() {

    const userProfile = {
      userid: this._https.UserProfile.userId, // Replace with the actual user ID
      datetime: new Date().toISOString(), // Current date and time in ISO format
      watchTime : this.contentControls.currentDuration,
      duration : this.contentControls.duration
    };

    const payload = {
      classId: this.contentDetails.classId,
      lec_id: this.contentDetails.lec_id,
      contentId: this.contentDetails.contentId,
      userProfile: userProfile
    }
    const req = new Requestmodels();
    req.RequestUrl = `upsertWatchTime`;
    req.RequestObject = payload;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

}

export class FAQ {
  _id: any;
  label: any;
  content: any;
  author: any;
  authorProfile: any;
  authorId: any;
  TeacherMessage: any;
  teacher: any;
}
