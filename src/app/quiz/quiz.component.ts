import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WebService } from '../web.service';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  lecturesData: any[] = [];
  classData: any = [];
  params: any = {};
  uploadVideogroup!: FormGroup;
  currentpaper: any = '';
  uploading: boolean = false;
  uploadStatus: any = { status: false, message: '', statusType: '' };
  statusIcons = [
    { name: 'checkmark-circle-outline', status: 'success' },
    { name: 'close-circle-outline', status: 'failed' },
    { name: 'information-circle-outline', status: 'info' },
  ];
  currentStatusIcon: any = '';
  constructor(
    public http: HttpClient,
    private sanitizer: DomSanitizer,
    public router: Router,
    public service: WebService,
    public ActivatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private loadingCtrl: LoadingController

  ) {
    this._unsubscribeAll = new Subject();
    this.uploadVideogroup = this.fb.group({
      classId: ['', Validators.required],
      lec_id: ['', Validators.required],
      paper_icon: ['', Validators.required],
      paper_link_duplicate: [''],
      paper_link: [''],
      paper_title: ['', Validators.required],
      paper: ['', Validators.required],
      published_at: ['', Validators.required],
      file: ['', Validators.required],
    });
    this.uploadVideogroup
      .get('published_at')
      ?.patchValue(this.service.getCurrentDate());
  }

  async ngOnInit() {
    this.fetchClassDetails();
    this.ActivatedRoute.queryParams.subscribe((params: any) => {
      if (params.reload === 'true') {
        this.fetchClassDetails();
      }
    });
  }

  async fetchClassDetails() {
    const req = new Requestmodels();
    req.RequestUrl = `classDetails`;
    req.RequestObject = '';

    await this.service
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

  readUrl(event: any) {
    const maxSizeInBytes = 70 * 1024 * 1024; // 70MB  : 0:40 minutes
    if (event.target.files[0] && event.target.files[0].size > maxSizeInBytes) {
      alert("File size exceeds the maximum allowed size (10MB). Please choose a smaller file.");
      this.uploadVideogroup.get('file')?.setValue('');
      return
  }
    this.uploadVideogroup.get('file')?.patchValue(event.target.files[0]);
  }

  getImgpaper(url: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async getSubjectsByclassId(event: any) {
    const classId = event ? event.target.value : null;
    if (classId) {
      this.fetchlectureDetails(classId);
    }
  }

  async fetchlectureDetails(classId: any) {
    const req = new Requestmodels();
    req.RequestUrl = `lectureDetails/` + classId;
    req.RequestObject = '';

    await this.service
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.lecturesData = data.response || [];
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  switchpaper(paper: any) {
    this.currentpaper = paper;
    this.uploadVideogroup.get('paper')?.patchValue(paper);
  }

  onchange_lecture(event: any) {
    this.uploadVideogroup
      .get('paper_icon')
      ?.patchValue(this.getpaper_icon());
      this.uploadVideogroup
      .get('paper')
      ?.patchValue(this.getpaper_name());
  }

  getpaper_icon(): string {
    return this.lecturesData.find(
      (object) => object._id == this.uploadVideogroup.get('lec_id')?.value
    ).lec_icon;
  }

  getpaper_name(): string {
    return this.lecturesData.find(
      (object) => object._id == this.uploadVideogroup.get('lec_id')?.value
    ).lec_title;
  }
  backTopaper() {
    const queryParams = {
      classId: this.params.classId,
      lec_id: this.params.lec_id,
      paperId: this.params.paperId,
      from: '/tabs/lectures',
      reload : 'true'
    };
    this.router.navigate([this.params.from], { queryParams });
  }

  async uploadpaper(): Promise<string> {
    if (!this.uploadVideogroup.valid) {
      this.openSnackbar({
        status: true,
        message: 'Fill all the details!',
        statusType: 'failed',
      });
      return '';
    }
    this.uploading = true;
    this.uploadStatus.status = false;
    const loading = await this.loadingCtrl.create({
      message: 'Uploading file...',
      duration: 0,
    });
    loading.present()
    const req = new Requestmodels();
    // create a new FormData object
    const formData = new FormData();

    const classId = this.uploadVideogroup.get('classId')?.value || '';
    const lec_id = this.uploadVideogroup.get('lec_id')?.value || '';
    const paper_icon =
      this.uploadVideogroup.get('paper_icon')?.value || '' || '';
    const paper_link = this.uploadVideogroup.get('paper_link')?.value || '';
    const paper_title =
      this.uploadVideogroup.get('paper_title')?.value || '';
    const paper = this.uploadVideogroup.get('paper')?.value || '';
    const published_at = this.uploadVideogroup.get('published_at')?.value || '';
    const file = this.uploadVideogroup.get('file')?.value || '';

    formData.append('classId', classId);
    formData.append('lec_id', lec_id);
    formData.append('paper_icon', paper_icon);
    formData.append('paper_link', paper_link);
    formData.append('paper_title', paper_title);
    formData.append('paper', paper);
    formData.append('published_at', published_at);
    formData.append('file', file);

    req.RequestUrl = `upload`;

    try {
      const data: any = await this.service
        .UploadFile(req, formData)
        .toPromise();
      if (data != null) {
        loading.dismiss()
        if (data.error) {
          this.openSnackbar({
            status: true,
            message: data.response,
            statusType: 'failed',
          });
          return '';
        }
        this.uploading = false;
        this.openSnackbar({
          status: true,
          message: data.response || 'File uploaded successfully!',
          statusType: 'info',
        });
        this.clearformcontrols()
      }
    } catch (error) {
      console.error(error);
    }

    return '';
  }

  clearformcontrols(){
    this.uploadVideogroup.get('classId')?.setValue('');
    this.uploadVideogroup.get('lec_id')?.setValue('');
    this.uploadVideogroup.get('paper_icon')?.setValue('');
    this.uploadVideogroup.get('paper_title')?.setValue('');
    this.uploadVideogroup
      .get('published_at')
      ?.patchValue(this.service.getCurrentDate());
    this.uploadVideogroup.get('file')?.setValue('');
  }

  getSnackbarStatus(status: any) {
    this.uploadStatus.status = status;
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


  async uploadExcel(event: any) {
    this.uploadStatus.status = true
    this.uploadStatus = await this.service.uploadExcelFile(event.target.files[0])
  }
  
}
