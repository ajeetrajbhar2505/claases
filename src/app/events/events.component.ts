import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';
import { WebService } from '../web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  calenderGroup!: FormGroup;
  lecturesData: any[] = [];
  classData: any = [];
  uploading: boolean = false;
  uploadStatus: any = { status: false, message: '', statusType: '' };
  datetime: any;
  statusIcons = [
    { name: 'checkmark-circle-outline', status: 'success' },
    { name: 'close-circle-outline', status: 'failed' },
    { name: 'information-circle-outline', status: 'info' },
  ];
  currentStatusIcon: any = '';

  constructor(
    public router: Router,
    public service: WebService,
    public fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
    this.createCalenderGroup();
  }

  ngOnInit() {
    this.fetchClassDetails();
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
    const calenderGroup = this.calenderGroup;
    calenderGroup.get('day')?.patchValue(parseInt(day));
    calenderGroup.get('time')?.patchValue(time);
    calenderGroup.get('month')?.patchValue(desiredMonth);
    calenderGroup.get('date')?.patchValue(formattedDate);
  }

  async createEvent() {
    if (!this.calenderGroup.valid) {
      this.openSnackbar({
        status: true,
        message: 'Fill all the details!',
        statusType: 'failed',
      });
      return;
    }
    this.uploading = true;
    const payload = this.calenderGroup.value;
    const req = new Requestmodels();
    req.RequestUrl = `upsertCalenderDetails`;
    req.RequestObject = payload;

    await this.service
      .PostData(req)
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
            this.uploading = false;
            this.openSnackbar({
              status: true,
              message: 'Event created successfully',
              statusType: 'success',
            });
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  createCalenderGroup() {
    this.calenderGroup = this.fb.group({
      classId: ['', Validators.required],
      lec_id: ['', Validators.required],
      day: ['', Validators.required],
      time: ['', Validators.required],
      month: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
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

  backToCalender() {
    this.router.navigate(['/tabs/calender']);
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
