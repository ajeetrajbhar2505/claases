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
  @ViewChild("videoPlayer", { static: true }) videoplayer!: ElementRef;
  lastEmittedValue!: RangeValue;
  videoModalOpen = false;
  audioModalOpen = false;
  documentModalOpen = false;
  contentsData:any = {
     videos : [],
     audios : [],
     documents : []
  }
  selectedVideoToWatch = {
    video_icon: '',
    video_id: '',
    course: '',
    time: '',
    video_title: '',
    video_link: '',
    teacher: '',
    published_at: '18/02/2023'
  };
  selectedAudioToWatch = {
    audio_icon: '',
    audio_id: '',
    course: '',
    time: '',
    audio_title: '',
    audio_link: '',
    teacher: '',
    published_at: '18/02/2023'
  };
  selectedDocumentToWatch = {
    document_icon: '',
    document_id: '',
    course: '',
    time: '',
    document_title: '',
    document_link: '',
    teacher: '',
    published_at: '18/02/2023'
  };
  tab1formgroup!: FormGroup
  comment_text: any = ""
  classId: any = ""
  videoControls = {
    playVideo: false,
    openFullscreen: false,
    Rangeduration: 0,
    currentRangeDuration : 0,
    currentDuration : '',
    duration : ''
  }
  AudioControls = {
    playAudio: false,
    openFullscreen: false,
    Rangeduration: 0,
    currentRangeDuration : 0,
    currentDuration : '',
    duration : ''
  }
  DocumentControls = {
    openFullscreen: false,
  }
  currentContent = 'video'
  videoLoaded:boolean = false
  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public fb: FormBuilder, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.classId = param.classId
      this.contentsData.videos = []
      let response: any = await this.http.get('assets/LecturesWiseVideos.json').toPromise().then((response: any) => {
        response.filter((Object:any)=>{
          if (Object.lec_id == param.lecId) {
            this.contentsData.videos = Object['videos']
            this.contentsData.audios = Object['audios']
            this.contentsData.documents = Object['documents']
          }
        })
      })

    })
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        this.setClose()
        App.exitApp();
      }
    });

  }

  backTolectures() {
    this.router.navigate(['/tabs/lectures'],{queryParams : { classId : this.classId}})
  }

  setClose() {
    this.videoLoaded  = false
    this.videoModalOpen = false;
    this.audioModalOpen = false;
    this.documentModalOpen = false;
    this.videoControls.playVideo = false
    this.videoControls.openFullscreen = false
  }

  setOpenvideoModal(isOpen: boolean, video: any) {
    this.videoControls.playVideo = false
    this.videoModalOpen = true;
    this.selectedVideoToWatch.video_icon = video.video_icon;
    this.selectedVideoToWatch.course = video.video_title;
    this.selectedVideoToWatch.time = '01:30';
    this.selectedVideoToWatch.video_title = video.video_title + ' - ' + video.video_title;
    this.selectedVideoToWatch.video_link = environment.apifirstKey + video.video_link + environment.apilastkey;
    this.selectedVideoToWatch.teacher = 'Ajeet Rajbhar';
    this.selectedVideoToWatch.published_at = video.published_at;
    this.videoControls = {
      playVideo: false,
      openFullscreen: false,
      Rangeduration: 0,
      currentRangeDuration : 0,
      currentDuration : '',
      duration : ''
    }
  }


  setOpenaudioModal(isOpen: boolean, audio: any) {
    this.AudioControls.playAudio = false
    this.audioModalOpen = true;
    this.selectedAudioToWatch.audio_icon = audio.audio_icon;
    this.selectedAudioToWatch.course = audio.audio_title;
    this.selectedAudioToWatch.time = '01:30';
    this.selectedAudioToWatch.audio_title = audio.audio_title + ' - ' + audio.audio_title;
    this.selectedAudioToWatch.audio_link = environment.apifirstKey + audio.audio_link + environment.apilastkey;
    this.selectedAudioToWatch.teacher = 'Ajeet Rajbhar';
    this.selectedAudioToWatch.published_at = audio.published_at;
    this.AudioControls = {
      playAudio: false,
      openFullscreen: false,
      Rangeduration: 0,
      currentRangeDuration : 0,
      currentDuration : '',
      duration : ''
    }
  }

  setOpendocumentModal(isOpen: boolean, document: any) {
    this.documentModalOpen = true;
    this.selectedDocumentToWatch.document_icon = document.document_icon;
    this.selectedDocumentToWatch.course = document.document_title;
    this.selectedDocumentToWatch.time = '01:30';
    this.selectedDocumentToWatch.document_title = document.document_title + ' - ' + document.document_title;
    this.selectedDocumentToWatch.document_link = environment.apifirstKey + document.document_link + environment.apilastkey;
    this.selectedDocumentToWatch.teacher = 'Ajeet Rajbhar';
    this.selectedDocumentToWatch.published_at = document.published_at;
  }






  getImgContent(url: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  onIonKnobMoveVideoStart(ev:Event)
  {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    var myVideo: any = document.getElementById("classVideo");
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
      this.videoControls.playVideo = false
    }
  }

  onIonKnobMoveAudioStart(ev:Event)
  {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    var myAudio: any = document.getElementById("classAudio");
    if (this.lastEmittedValue) {
      myAudio.currentTime = this.lastEmittedValue
    }
    this.AudioControls.Rangeduration = myAudio.duration
    this.AudioControls.currentRangeDuration = myAudio.currentTime

    if (myAudio.paused) {
      this.AudioControls.playAudio = true
    }
    
    if (!myAudio.paused) {
      myAudio.pause();
      this.AudioControls.playAudio = false
    }
  }

  onIonKnobMoveVideoEnd(ev:Event)
  {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    var myVideo: any = document.getElementById("classVideo");
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

  onIonKnobMoveAudioEnd(ev:Event)
  {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    var myVideo: any = document.getElementById("classAudio");
    if (this.lastEmittedValue) {
      myVideo.currentTime = this.lastEmittedValue
    }
    this.AudioControls.Rangeduration = myVideo.duration
    this.AudioControls.currentRangeDuration = myVideo.currentTime

    if (myVideo.paused) {
      myVideo.play();
      this.AudioControls.playAudio = true
    }
    else {
      this.AudioControls.playAudio = false
    }

    if (!myVideo.paused) {
      this.AudioControls.playAudio = false
    }
    if (Math.floor(this.AudioControls.currentRangeDuration) == Math.floor(this.AudioControls.Rangeduration)) {
      this.AudioControls.playAudio = true
      myVideo.pause();
    }

  }


  checkVideoLoaded(ev:Event)
  {
    this.videoLoaded  = true
    var myVideo: any = document.getElementById("classVideo");
    this.videoControls.Rangeduration = myVideo.duration
    this.videoControls.duration = this.formatTime(myVideo.duration)
  }

  checkAudioLoaded(ev:Event)
  {
    var myAudio: any = document.getElementById("classAudio");
    this.AudioControls.Rangeduration = myAudio.duration
    this.AudioControls.duration = this.formatTime(myAudio.duration)
  }

  checkContinuousVideoduration(ev:Event)
  {
    var myVideo: any = document.getElementById("classVideo");
    this.videoControls.currentRangeDuration = myVideo.currentTime.toFixed(2)
   this.videoControls.currentDuration =  this.formatTime(myVideo.currentTime.toFixed(2))
   if (myVideo.paused) {
    this.videoControls.playVideo = true
  }
  }

  checkContinuousAudioduration(ev:Event)
  {
    var myAudio: any = document.getElementById("classAudio");
    this.AudioControls.currentRangeDuration = myAudio.currentTime.toFixed(2)
   this.AudioControls.currentDuration =  this.formatTime(myAudio.currentTime.toFixed(2))
   if (myAudio.paused) {
    this.AudioControls.playAudio = true
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

  playPauseVideo() {
    var myVideo: any = document.getElementById("classVideo");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
    this.videoControls.playVideo = !this.videoControls.playVideo
  }

  playPauseAudio() {
    var myAudio: any = document.getElementById("classAudio");
    if (myAudio.paused) myAudio.play();
    else myAudio.pause();
    this.AudioControls.playAudio = !this.AudioControls.playAudio
  }


  skipnextVideo(value: any) {
    let video: any = document.getElementById("classVideo");
    video.currentTime += value;
    this.videoControls.currentRangeDuration = video.currentTime
  }

  skipnextAudio(value: any) {
    let audio: any = document.getElementById("classAudio");
    audio.currentTime += value;
    this.AudioControls.currentRangeDuration = audio.currentTime
  }

  skipbackVideo(value: any) {
    let video: any = document.getElementById("classVideo");
    video.currentTime = video.currentTime - value;
    this.videoControls.currentRangeDuration = video.currentTime
  }

  
  skipbackAudio(value: any) {
    let audio: any = document.getElementById("classAudio");
    audio.currentTime = audio.currentTime - value;
    this.AudioControls.currentRangeDuration = audio.currentTime
  }

  restartVideo() {
    let video: any = document.getElementById("classVideo");
    video.currentTime = 0;
    this.videoControls.currentRangeDuration = video.currentTime
  }


  restartAudio() {
    let audio: any = document.getElementById("classAudio");
    audio.currentTime = 0;
    this.AudioControls.currentRangeDuration = audio.currentTime
  }

  openFullscreenVideo() {
    this.videoControls.openFullscreen = !this.videoControls.openFullscreen
  }

  openFullscreenAudio() {
    this.AudioControls.openFullscreen = !this.AudioControls.openFullscreen
  }

  openFullscreenDocument() {
    this.DocumentControls.openFullscreen = !this.DocumentControls.openFullscreen
  }

}
