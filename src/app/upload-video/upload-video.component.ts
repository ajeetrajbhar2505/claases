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

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss'],
})
export class UploadVideoComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  lecturesData: any[] = [];
  classData: any = [];
  params: any = {};
  uploadVideogroup!: FormGroup;
  currentContent: any = '';
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
    public fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
    this.uploadVideogroup = this.fb.group({
      classId: ['', Validators.required],
      lec_id: ['', Validators.required],
      content_icon: ['', Validators.required],
      content_link: [''],
      content_title: ['', Validators.required],
      content: ['', Validators.required],
      published_at: ['', Validators.required],
      file: ['', Validators.required],
    });
    this.uploadVideogroup
      .get('published_at')
      ?.patchValue(this.service.getCurrentDate());
    ActivatedRoute.queryParams.subscribe((params: any) => {
      this.params = params;
      this.uploadVideogroup.get('content')?.patchValue(params.content);
    });
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
    this.uploadVideogroup.get('file')?.patchValue(event.target.files[0]);
  }

  getImgContent(url: any): SafeUrl {
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

  switchContent(content: any) {
    this.currentContent = content;
    this.uploadVideogroup.get('content')?.patchValue(content);
  }

  onchange_lecture(event: any) {
    this.uploadVideogroup
      .get('content_icon')
      ?.patchValue(this.getContent_icon());
  }

  getContent_icon(): string {
    return this.lecturesData.find(
      (object) => object._id == this.uploadVideogroup.get('lec_id')?.value
    ).lec_icon;
  }

  backToContent() {
    const queryParams = {
      classId: this.params.classId,
      lec_id: this.params.lec_id,
      contentId: this.params.contentId,
      from: '/tabs/lectures',
      reload : 'true'
    };
    this.router.navigate([this.params.from], { queryParams });
  }

  async uploadContent(): Promise<string> {
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
    const req = new Requestmodels();
    // create a new FormData object
    const formData = new FormData();

    const classId = this.uploadVideogroup.get('classId')?.value || '';
    const lec_id = this.uploadVideogroup.get('lec_id')?.value || '';
    const content_icon =
      this.uploadVideogroup.get('content_icon')?.value || '' || '';
    const content_link = this.uploadVideogroup.get('content_link')?.value || '';
    const content_title =
      this.uploadVideogroup.get('content_title')?.value || '';
    const content = this.uploadVideogroup.get('content')?.value || '';
    const published_at = this.uploadVideogroup.get('published_at')?.value || '';
    const file = this.uploadVideogroup.get('file')?.value || '';

    formData.append('classId', classId);
    formData.append('lec_id', lec_id);
    formData.append('content_icon', content_icon);
    formData.append('content_link', content_link);
    formData.append('content_title', content_title);
    formData.append('content', content);
    formData.append('published_at', published_at);
    formData.append('file', file);

    req.RequestUrl = `upload`;

    try {
      const data: any = await this.service
        .UploadFile(req, formData)
        .toPromise();
      if (data != null) {
        if (data.error) {
          return '';
        }
        this.uploading = false;
        this.openSnackbar({
          status: true,
          message: data.response || 'File uploaded successfully!',
          statusType: 'info',
        });
        this.uploadVideogroup.get('classId')?.setValue('');
        this.uploadVideogroup.get('lec_id')?.setValue('');
        this.uploadVideogroup.get('content_icon')?.setValue('');
        this.uploadVideogroup.get('content_title')?.setValue('');
        this.uploadVideogroup
          .get('published_at')
          ?.patchValue(this.service.getCurrentDate());
        this.uploadVideogroup.get('file')?.setValue('');
      }
    } catch (error) {
      console.error(error);
    }

    return '';
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
}
