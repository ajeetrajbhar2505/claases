import {
  Component,
  ElementRef,
  OnInit,
  Optional,
  ViewChild,
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

@Component({
  selector: 'app-content-controls',
  templateUrl: './content-controls.component.html',
  styleUrls: ['./content-controls.component.scss'],
})
export class ContentControlsComponent {
  @ViewChild('contentPlayer', { static: true }) contentplayer!: ElementRef;
  lastEmittedValue!: RangeValue;

  contentToWatch = {
    content_icon: '',
    content_id: '',
    course: '',
    time: '',
    content_title: '',
    content_link: '',
    teacher: '',
    published_at: '18/02/2023',
  };

  contentControls = {
    playContent: false,
    openFullscreen: false,
    Rangeduration: 0,
    currentRangeDuration: 0,
    currentDuration: '',
    duration: '',
  };

  contentDetails: any = {
    from: '',
    classId: '',
    lec_id: '',
    contentId: '',
    content: ''
    };

  contentLoaded: boolean = false;
  constructor(
    public http: HttpClient,
    public ActivatedRoute: ActivatedRoute,
    public router: Router,
    private sanitizer: DomSanitizer,
    public fb: FormBuilder,
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.contentDetails.from = param.from;
      this.contentDetails.classId = param.classId;
      this.contentDetails.lec_id = param.lec_id;
      this.contentDetails.contentId = param.contentId;
      this.contentDetails.content = param.content;

      let response: any = await this.http.get('assets/LecturesWiseVideos.json').toPromise()
      response.filter((Object:any)=>{
        if (Object.lec_id == param.lec_id) {
        }
      })


    });
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        this.setClose();
        App.exitApp();
      }
    });
  }

  backToContents() {
    this.router.navigate([this.contentDetails.from], {
      queryParams: {
        classId: this.contentDetails.classId,
        lec_id: this.contentDetails.lec_id,
        contentId: this.contentDetails.contentId,
      },
    });
  }

  setClose() {
    this.contentControls.playContent = false;
    this.contentControls.openFullscreen = false;
  }

  getImgContent(url: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onIonKnobMovecontentStart(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    var content: any = document.getElementById('classContent');
    if (this.lastEmittedValue) {
      content.currentTime = this.lastEmittedValue;
    }
    this.contentControls.Rangeduration = content.duration;
    this.contentControls.currentRangeDuration = content.currentTime;

    if (content.paused) {
      this.contentControls.playContent = true;
    }

    if (!content.paused) {
      content.pause();
      this.contentControls.playContent = false;
    }
  }

  onIonKnobMovecontentEnd(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    var content: any = document.getElementById('classContent');
    if (this.lastEmittedValue) {
      content.currentTime = this.lastEmittedValue;
    }
    this.contentControls.Rangeduration = content.duration;
    this.contentControls.currentRangeDuration = content.currentTime;

    if (content.paused) {
      content.play();
      this.contentControls.playContent = true;
    } else {
      this.contentControls.playContent = false;
    }

    if (!content.paused) {
      this.contentControls.playContent = false;
    }
    if (
      Math.floor(this.contentControls.currentRangeDuration) ==
      Math.floor(this.contentControls.Rangeduration)
    ) {
      this.contentControls.playContent = true;
      content.pause();
    }
  }

  checkContentLoaded(ev: Event) {
    this.contentLoaded = true;
    var content: any = document.getElementById('classContent');
    this.contentControls.Rangeduration = content.duration;
    this.contentControls.duration = this.formatTime(content.duration);
  }

  checkContinuousContentduration(ev: Event) {
    var content: any = document.getElementById('classContent');
    this.contentControls.currentRangeDuration = content.currentTime.toFixed(2);
    this.contentControls.currentDuration = this.formatTime(
      content.currentTime.toFixed(2)
    );
    if (content.paused) {
      this.contentControls.playContent = true;
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
    if (!value) {
      return 0;
    }
    return `${value}`;
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  playPauseContent() {
    var content: any = document.getElementById('classContent');
    if (content.paused) content.play();
    else content.pause();
    this.contentControls.playContent = !this.contentControls.playContent;
  }

  skipnextContent(value: any) {
    var content: any = document.getElementById('classContent');
    content.currentTime += value;
    this.contentControls.currentRangeDuration = content.currentTime;
  }

  skipbackContent(value: any) {
    var content: any = document.getElementById('classContent');
    content.currentTime = content.currentTime - value;
    this.contentControls.currentRangeDuration = content.currentTime;
  }

  restartContent() {
    var content: any = document.getElementById('classContent');
    content.currentTime = 0;
    this.contentControls.currentRangeDuration = content.currentTime;
  }

  openFullscreencontent() {
    this.contentControls.openFullscreen = !this.contentControls.openFullscreen;
  }
}
