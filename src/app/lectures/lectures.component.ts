import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, LoadingController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Subject,takeUntil } from 'rxjs';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Requestmodels } from '../models/Requestmodels.module';
import { WebService } from '../web.service';
import { NavigationExtras } from '@angular/router';

const navigationExtras: NavigationExtras = {
  queryParams: { reload: 'true' }, // Add the "reload" query parameter
};

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss'],
})
export class LecturesComponent  {
  private _unsubscribeAll: Subject<any>;
  lecturesData: any[] = []
  classData: any = [];
  classId = ''
  skeleton:boolean = false
  uploading: boolean = false;
  lectureGroup!: FormGroup;
  uploadStatus: any = { status: false, message: '', statusType: '' };
  statusIcons = [
    { name: 'checkmark-circle-outline', status: 'success' },
    { name: 'close-circle-outline', status: 'failed' },
    { name: 'information-circle-outline', status: 'info' },
  ];
  currentStatusIcon: any = '';
  isModelOpen: boolean = false
  constructor(public http: HttpClient, public _https:WebService,public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public fb: FormBuilder, private platform: Platform,
    private loadingCtrl: LoadingController,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this._unsubscribeAll = new Subject()
    this.fetchClassDetails()
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      this.classId = param.classId
      this.lecturesData = []
      this.fetchlectureDetails(param.classId)

      if (param.reload === 'true') {
        this.fetchlectureDetails(param.classId)
      }
    })
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });

   this.createLectureGroup()
  }

  createLectureGroup(){
    this.lectureGroup = this.fb.group({
      classId: ['', Validators.required],
      lec_icon: ['assets/std_icon.webp', Validators.required],
      lec_title: ['', Validators.required],
    })
  }

  OpenDialog(){
    this.isModelOpen = !this.isModelOpen
  }


  async createLecture() {
    if (!this.lectureGroup.valid) {
      this.openSnackbar({
        status: true,
        message: 'Fill all the details!',
        statusType: 'failed',
      });
      return;
    }
    this.uploading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Creating lecture...',
      duration: 0,
    });
    loading.present()
    const payload = this.lectureGroup.value;
    const req = new Requestmodels();
    req.RequestUrl = `upsertLecture`;
    req.RequestObject = payload;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            loading.dismiss()
            if (data.status !== 200) {
              this.openSnackbar({
                status: true,
                message: data.response,
                statusType: 'failed',
              });
              return;
            }

            // fetch
            this.uploading = false;
            this.openSnackbar({
              status: true,
              message: 'Lecture created successfully',
              statusType: 'success',
            });
            this.createLectureGroup()
            this.isModelOpen = false
            this.fetchlectureDetails(this.classId)
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



  async fetchlectureDetails(classId:any) {
    this.skeleton = true
    const req = new Requestmodels()
    req.RequestUrl = `lectureDetails/` + classId;
    req.RequestObject = ""
  
    await this._https
     .fetchData(req)
     .pipe(takeUntil(this._unsubscribeAll))
     .subscribe(
      (data) => {
       if (data != null) {
        this.skeleton = false
        if (data.status !== 200) {
         return
        }
  
        
        // fetch
         this.lecturesData = data.response || []
       }
      },
      (_error) => {
       return;
      },
      () => {
  
      }
  
     )
    }

    async fetchClassDetails() {
      const req = new Requestmodels();
      req.RequestUrl = `classDetails`;
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
              this.classData = data.response || [];
            }
          },
          (_error) => {
            return;
          },
          () => {}
        );
    }
  


  routeTocontents(lec_id: any) {
    this.router.navigate(['/tabs/contents'],{queryParams : {classId : this.classId, lec_id : lec_id,from : '/tabs/lectures',reload : 'true'}})
   }

  backToclass() {
    this.router.navigate(['/tabs/class'],navigationExtras)
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }


}
