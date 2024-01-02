import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Requestmodels } from '../models/Requestmodels.module';
import { WebService } from '../web.service';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  classes: any = [];
  isModelOpen:boolean = false
  skeleton: boolean = false;
  uploading: boolean = false;
  classGroup!: FormGroup;
  queryParams:any = ""
  private _unsubscribeAll: Subject<any>;
  uploadStatus: any = { status: false, message: '', statusType: '' };
  statusIcons = [
    { name: 'checkmark-circle-outline', status: 'success' },
    { name: 'close-circle-outline', status: 'failed' },
    { name: 'information-circle-outline', status: 'info' },
  ];
  currentStatusIcon: any = '';
  constructor(
    public router: Router,
    public _https: WebService,
    public ActivatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private fb:FormBuilder

  ) {
    this._unsubscribeAll = new Subject();
  }
  
  routeToSubjects(classId: any) {
    const practice = this.queryParams?.practice === 'true';
    const queryParams = { classId, reload: 'true', practice: practice ? 'true' : '' };
    this.router.navigate(['/tabs/lectures'], {
      queryParams,
    });
  }
  
  
  ngOnInit() {
    this.fetchClassDetails();
    this.ActivatedRoute.queryParams.subscribe((params: any) => {
      this.queryParams = params
      if (params.reload === 'true') {
        this.fetchClassDetails();
      }
    });
    this.classGroup = this.fb.group({
      classNamme: ['', Validators.required],
      std_icon: ['assets/std_icon.webp', Validators.required]
    })
  }

  async fetchClassDetails() {
    this.skeleton = true;
    const req = new Requestmodels();
    req.RequestUrl = `classDetails`;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.skeleton = false;
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.classes = data.response || [];
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  OpenDialog(){
    this.isModelOpen = !this.isModelOpen
  }


  async createGroup() {
    if (!this.classGroup.valid) {
      this.openSnackbar({
        status: true,
        message: 'Fill all the details!',
        statusType: 'failed',
      });
      return;
    }
    this.uploading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Creating group...',
      duration: 0,
    });
    loading.present()
    const payload = this.classGroup.value;
    const req = new Requestmodels();
    req.RequestUrl = `upsertGroup`;
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
              message: 'Class created successfully',
              statusType: 'success',
            });
            this.classGroup.reset()
            this.isModelOpen = false
            this.fetchClassDetails()
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

}
