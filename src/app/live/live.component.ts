import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RangeCustomEvent, RangeValue } from '@ionic/core';
import { environment } from 'src/environments/environment';
import { WebService } from '../web.service';

interface contentToWatch {
  lec_id: number,
  lec_icon: string,
  lec_title: string,
  content: string,
  content_icon: string,
  content_link: string,
  content_title: string,
  teacher: string,
  published_at: string
}

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})


export class LiveComponent {
  @ViewChild("videoPlayer", { static: true }) videoplayer!: ElementRef;
  lastEmittedValue!: RangeValue;
  socket: any;

  contentLoaded = false;


  contentToWatch: contentToWatch = {
    "lec_id": 7,
    "lec_icon": "assets/evs.webp",
    "lec_title": "EVS PART 1",
    "content": "video",
    "content_icon": "",
    "content_link": environment.apifirstKey + "evs-for-class-3-learn-science-for-kids-envir.mp4" + environment.apilastkey,
    "content_title": "Learn Science For Kids | Environmental Science",
    "teacher": "ajeet rajbhar",
    "published_at": "18/02/2023"
  }

  contentControls = {
    playContent: false,
    openFullscreen: false,
    Rangeduration: 0,
    currentRangeDuration: 0,
    currentDuration: '',
    duration: ''
  }

  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public service: WebService, public fb: FormBuilder, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.contentLoaded = false
    this.getMessage(null)
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });

  }

  backToStandard() {
    this.router.navigate(['/tabs/class'])
  }






  getImgContent(url: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  private getContentElement(): HTMLVideoElement | null {
    return document.querySelector<HTMLVideoElement>('#liveVideo');
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
    this.contentLoaded = true
    var myVideo: any = document.getElementById("liveVideo");
    this.contentControls.Rangeduration = myVideo.duration
    this.contentControls.duration = this.formatTime(myVideo.duration)
  }

  checkContinuousContentduration() {
    var myVideo: any = document.getElementById("liveVideo");
    this.contentControls.currentRangeDuration = myVideo.currentTime.toFixed(2)
    this.contentControls.currentDuration = this.formatTime(myVideo.currentTime.toFixed(2))
    if (myVideo.paused) {
      this.contentControls.playContent = true
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

    return formattedDuration
  }


  pinFormatter(value: number) {
    if (!value) {
      return 0
    }
    return `${value}`;
  }


  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  playPause() {
    var myVideo: any = document.getElementById("liveVideo");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
    this.contentControls.playContent = !this.contentControls.playContent
  }

  makeBig() {
    var myVideo: any = document.getElementById("liveVideo");
    myVideo.width = '100%';
    myVideo.height = '100%';
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
    this.contentControls.openFullscreen = !this.contentControls.openFullscreen
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  isVideoOrAudioContent(content: any) {
    if (content == 'video' || content == 'audio') {
      return true
    }
    return false  
  }


  getMessage(routerEvent: any) {
    this.service.socket.on('live', (data: any) => {
      this.contentToWatch = {
        lec_id: 0,
        lec_icon: '',
        lec_title: '',
        content: '',
        content_icon: '',
        content_link: '',
        content_title: '',
        teacher: '',
        published_at: ''
      }
      this.contentToWatch = data
      this.contentToWatch.content_link = environment.apifirstKey + data.content_link + environment.apilastkey
      var content: any = document.getElementById('liveVideo'); // select the content element by ID
      content.src = this.contentToWatch.content_link; // set the source URL of the content
      content.load(); // load the content
      content.play()
      if (routerEvent instanceof NavigationStart) {
        if (content) {
          if (routerEvent.url !== '/tabs/live') {
            content.muted = true;
          }
          if (routerEvent.url == '/tabs/live') {
            content.muted = false;
          }
        }


      }
    });

  }

}
