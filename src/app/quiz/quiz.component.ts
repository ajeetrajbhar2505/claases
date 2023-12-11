import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  private _unsubscribeAll: Subject<any>;
  lecturesData: any[] = [];
  classData: any = [];
  params: any = {};
  uploadQuizgroup!: FormGroup;
  currentpaper: any = '';
  uploading: boolean = false;
  papers: any[] = [];
  skeleton:boolean = true
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
    this.uploadQuizgroup = this.fb.group({
      classId: ['', Validators.required],
      lec_id: ['', Validators.required],
      paper_icon: ['', Validators.required],
      paper_link_duplicate: [''],
      paper_link: [''],
      paper_title: ['', Validators.required],
      paper: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      published_at: ['', Validators.required],
      file: ['', Validators.required],
    });
    this.uploadQuizgroup
      .get('published_at')
      ?.patchValue(this.service.getCurrentDate());
  }

  async ngOnInit() {
    this.fetchClassDetails();
    this.fetchpapersDetails();
    this.ActivatedRoute.queryParams.subscribe((params: any) => {
      this.params = params
      if (params.reload === 'true') {
        this.fetchClassDetails();
        this.fetchpapersDetails();
      }
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.fetchpapersDetails();
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
              this.openSnackbar({
                status: true,
                message: data.response,
                statusType: 'failed',
              });
              return;
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

  async fetchpapersDetails() {
    if (!this.params.classId && !this.params.lec_id) {
      return
    }
    this.skeleton = true
    const req = new Requestmodels();
    req.RequestUrl = `fetchquizes/${this.params.classId}/${this.params.lec_id}`;
    req.RequestObject = '';

    await this.service
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.skeleton = false
            if (data.status !== 200) {
              this.openSnackbar({
                status: true,
                message: data.response,
                statusType: 'failed',
              });
              return;
              return;
            }

            // fetch
            this.papers = data.response || [];
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }


  dateTimeUpdated(event: any) {
    const dateTime = new Date(event.detail.value);
    // Extract the date and time components
    const time = dateTime.toTimeString().split(' ')[0].slice(0, -3); // Removing the seconds

    // Extract and format the date in "dd-mm-yyyy" format
    const day = String(dateTime.getDate()).padStart(2, '0');
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Note: Month is zero-based, so we add 1
    const year = dateTime.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    const desiredMonth = new Date(2023, parseInt(month) - 1, 1).toLocaleString(
      'default',
      {
        month: 'short',
      }
    );

    // patch fromgroup values
    this.uploadQuizgroup.get('time')?.patchValue(time);
    this.uploadQuizgroup.get('date')?.patchValue(formattedDate);


  }

  routeToQuiz(data: any) {
    const queryParams = {
      classId: data.classId,
      lec_id: data.lec_id,
      paperId: data._id,
      from: '/tabs/quiz',
      reload: 'true',
    };
    this.router.navigate(['/tabs/test'], { queryParams });

  
  }

  readUrl(event: any) {
    const maxSizeInBytes = 70 * 1024 * 1024; // 70MB  : 0:40 minutes
    if (event.target.files[0] && event.target.files[0].size > maxSizeInBytes) {
      alert(
        'File size exceeds the maximum allowed size (10MB). Please choose a smaller file.'
      );
      this.uploadQuizgroup.get('file')?.setValue('');
      return;
    }
    this.uploadQuizgroup.get('file')?.patchValue(event.target.files[0]);
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
              this.openSnackbar({
                status: true,
                message: data.response,
                statusType: 'failed',
              });
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
    this.uploadQuizgroup.get('paper')?.patchValue(paper);
  }

  onchange_lecture(event: any) {
    this.uploadQuizgroup.get('paper_icon')?.patchValue(this.getpaper_icon());
    this.uploadQuizgroup.get('paper')?.patchValue(this.getpaper_name());
  }

  getpaper_icon(): string {
    return this.lecturesData.find(
      (object) => object._id == this.uploadQuizgroup.get('lec_id')?.value
    ).lec_icon;
  }

  getpaper_name(): string {
    return this.lecturesData.find(
      (object) => object._id == this.uploadQuizgroup.get('lec_id')?.value
    ).lec_title;
  }
  backTopaper() {
    const queryParams = {
      classId: this.params.classId,
      lec_id: this.params.lec_id,
      paperId: this.params.paperId,
      from: '/tabs/lectures',
      reload: 'true',
    };
    this.router.navigate([this.params.from], { queryParams });
  }

  clearformcontrols() {
    this.uploadQuizgroup.get('classId')?.setValue('');
    this.uploadQuizgroup.get('lec_id')?.setValue('');
    this.uploadQuizgroup.get('paper_icon')?.setValue('');
    this.uploadQuizgroup.get('paper_title')?.setValue('');
    this.uploadQuizgroup
      .get('published_at')
      ?.patchValue(this.service.getCurrentDate());
    this.uploadQuizgroup.get('file')?.setValue('');
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

  filechange(event: any) {
    this.uploadQuizgroup.get('file')?.setValue(event.target.files[0]);
  }

  async uploadExcel() {
    if (!this.uploadQuizgroup.valid) {
      this.openSnackbar({
        status: true,
        message: 'Please choose the file to upload!',
        statusType: 'failed',
      });
      return;
    }
    if (!this.uploadQuizgroup.get('file')?.valid) {
      this.openSnackbar({
        status: true,
        message: 'Please choose the file to upload!',
        statusType: 'failed',
      });
      return;
    }
    this.uploading = true;
    this.uploadStatus.status = false;
    const loading = await this.loadingCtrl.create({
      message: 'Uploading file...',
      duration: 0,
    });
    loading.present();
    const convertedExcelToJsonQuizData = await this.service.uploadQuizExcelFile(
      this.uploadQuizgroup.get('file')?.value
    );
    const body = Object.assign(
      convertedExcelToJsonQuizData,
      this.uploadQuizgroup.value
    );
    delete body.file;
    const req = new Requestmodels();
    req.RequestUrl = `quizes`;
    req.RequestObject = body;

    try {
      const data: any = await this.service.PostData(req).toPromise();
      if (data != null) {
        loading.dismiss();
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
        this.clearformcontrols();
      }
    } catch (error) {
      console.error(error);
    }
    return;
  }
}
