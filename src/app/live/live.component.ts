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
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent implements OnInit  {
  @ViewChild("videoPlayer", { static: true }) videoplayer!: ElementRef;
  lastEmittedValue!: RangeValue;
  selectedVideoToWatch = {
    "lec_id": 7,
    "lec_icon": "assets/evs.webp",
    "lec_title": "EVS PART 1",
    "video_link": environment.apifirstKey + "evs-for-class-3-learn-science-for-kids-envir.mp4" + environment.apilastkey,
    "video_title": "Learn Science For Kids | Environmental Science",
    "teacher" : "ajeet rajbhar",
    "published_at": "18/02/2023"
  }

  videoControls = {
    playVideo: false,
    openFullscreen: false,
    Rangeduration: 0,
    currentRangeDuration : 0,
    currentDuration : '',
    duration : ''
  }
  videoLoaded:boolean = false

  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public fb: FormBuilder, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        this.videoLoaded = false
        App.exitApp();
      }
    });

    this.videoControls = {
      playVideo: false,
      openFullscreen: false,
      Rangeduration: 0,
      currentRangeDuration : 0,
      currentDuration : '',
      duration : ''
    }

  }


  fetchLiveLectureDetails(){
   this.selectedVideoToWatch = {
    "lec_id": 7,
    "lec_icon": "assets/evs.webp",
    "lec_title": "EVS PART 1",
    "video_link": environment.apifirstKey + "evs-for-class-3-learn-science-for-kids-envir.mp4" + environment.apilastkey,
    "video_title": "Learn Science For Kids | Environmental Science",
    "teacher" : "ajeet rajbhar",
    "published_at": "18/02/2023"
  }
  }


  ngOnInit(): void {
    this.fetchLiveLectureDetails()
    this.ActivatedRoute.queryParams.subscribe((params: any) => {
      if (params.reload === 'true') {
        this.fetchLiveLectureDetails();
      }
    });
  }

  backToStandard() {
    this.router.navigate(['/tabs/class'])
  }






  getImgContent(url: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  onIonKnobMoveStart(ev:Event)
  {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    var myVideo: any = document.getElementById("liveVideo");
    if (this.lastEmittedValue) {
      myVideo.currentTime = this.lastEmittedValue
    }
    this.videoControls.Rangeduration = myVideo.duration
    this.videoControls.currentRangeDuration = myVideo.currentTime

    if (myVideo.paused) {
      this.videoControls.playVideo = true
    }
    
    if (!myVideo.paused) {
      myVideo.pause();
      this.videoControls.playVideo = true
    }
  }

  onIonKnobMoveEnd(ev:Event)
  {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    var myVideo: any = document.getElementById("liveVideo");
    if (this.lastEmittedValue) {
      myVideo.currentTime = this.lastEmittedValue
    }
    this.videoControls.Rangeduration = myVideo.duration
    this.videoControls.currentRangeDuration = myVideo.currentTime

    if (myVideo.paused) {
      myVideo.play();
      this.videoControls.playVideo = true
    }
    else {
      this.videoControls.playVideo = false
    }

    if (!myVideo.paused) {
      this.videoControls.playVideo = false
    }
    if (Math.floor(this.videoControls.currentRangeDuration) == Math.floor(this.videoControls.Rangeduration)) {
      this.videoControls.playVideo = true
      myVideo.pause();
    }

  }


  checkvideoLoaded(ev:Event)
  {
    var myVideo: any = document.getElementById("liveVideo");
    this.videoControls.Rangeduration = myVideo.duration
    this.videoControls.duration = this.formatTime(myVideo.duration)
    this.videoLoaded = true
  }

  checkContinuousVideoduration(ev:Event)
  {
    var myVideo: any = document.getElementById("liveVideo");
    this.videoControls.currentRangeDuration = myVideo.currentTime.toFixed(2)
   this.videoControls.currentDuration =  this.formatTime(myVideo.currentTime.toFixed(2))
   if (myVideo.paused) {
    this.videoControls.playVideo = true
  }
  }


  formatTime(duration:any) {
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
    this.videoControls.playVideo = !this.videoControls.playVideo
  }

  makeBig() {
    var myVideo: any = document.getElementById("liveVideo");
    myVideo.width = '100%';
    myVideo.height = '100%';
  }

  skipnext(value: any) {
    let video: any = document.getElementById("liveVideo");
    video.currentTime += value;
    this.videoControls.currentRangeDuration = video.currentTime
  }

  skipback(value: any) {
    let video: any = document.getElementById("liveVideo");
    video.currentTime = video.currentTime - value;
    this.videoControls.currentRangeDuration = video.currentTime

  }

  restart() {
    let video: any = document.getElementById("liveVideo");
    video.currentTime = 0;
    this.videoControls.currentRangeDuration = video.currentTime
  }


  openFullscreen() {
    this.videoControls.openFullscreen = !this.videoControls.openFullscreen
  }


  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

}
