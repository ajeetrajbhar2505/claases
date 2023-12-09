import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';
import { environment } from 'src/environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { Requestmodels } from '../models/Requestmodels.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  
  private _unsubscribeAll: Subject<any>;
  visiblepass:any = [false,false];
  isPersonalDetailsModelOpen = false;
  currentStatusIcon: any = '';
  uploadStatus: any = { status: false, message: '', statusType: '' };
  loading: boolean = false;

  statusIcons = [
    { name: 'checkmark-circle-outline', status: 'success' },
    { name: 'close-circle-outline', status: 'failed' },
    { name: 'information-circle-outline', status: 'info' },
  ];

  constructor(
    public router: Router,
    public service: WebService,
    private actionSheetCtrl: ActionSheetController,
    public _https: WebService,
    public fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  otpgroup!: FormGroup;
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.otpgroup = this.fb.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    });
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      firstname : ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
    });
  }

  restrictmaxNumber(event: any, name: any) {
    const formcontrol: any = this.otpgroup.get(name);
    if (formcontrol.value.toString().length > 1) {
      const truncatedNumber = formcontrol.value.toString().slice(0, 1);
      formcontrol.patchValue(truncatedNumber);
    }
    const nextInput = event.target.nextElementSibling;

    if (nextInput && nextInput.tagName === 'INPUT') {
      nextInput.focus();
    }
  }

  showpassword(index: number) {
    this.visiblepass[index] = !this.visiblepass[index];
  }

  LogiinWithGoogle() {
    this.otpgroup.reset();
    this.isPersonalDetailsModelOpen = true;
    const firstOTPInput = document.getElementById('otp1');
    if (firstOTPInput) {
      firstOTPInput.focus();
    }
    const url = environment.nodeApi + 'google';
    // // Use "_blank" as the target to open in a new tab
    window.open(url, '_blank');
  }

  async register() {
      if (!this.registerForm.valid) {
        this.openSnackbar({
          status: true,
          message: 'Please fill all the detauils',
          statusType: 'failed',
        });
        return;
      }
      this.loading = true;
      const req = new Requestmodels();
      req.RequestUrl = `Register`;
  
      req.RequestObject = this.registerForm.value;
  
      await this._https
        .PostData(req)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
          (data) => {
            if (data != null) {
              this.loading = false;
            
              this.registerForm.reset();
              this.openSnackbar({
                status: true,
                message: data.response,
                statusType: 'failed',
              });
              this.router.navigate(['/login'])
              return;

            }
          },
          (_error) => {
            return;
          },
          () => {}
        );
  }

  closeModel() {
    this.isPersonalDetailsModelOpen = false;
  }

  validate(): boolean {
    if (!this.otpgroup.valid) {
      // At least one field is empty, so the OTP is invalid
      return false;
    }
    return true;
  }


  async verifyOTP() {
    this.loading = true;
    const otp =
      this.otpgroup.get('otp1')?.value +
      '' +
      this.otpgroup.get('otp2')?.value +
      '' +
      this.otpgroup.get('otp3')?.value +
      '' +
      this.otpgroup.get('otp4')?.value;
    const body = {
      otp: parseInt(otp),
    };
    const req = new Requestmodels();
    req.RequestUrl = `verifyOTP`;

    req.RequestObject = body;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.loading = false;
            if (data.status !== 200) {
              this.openSnackbar({
                status: true,
                message: data.response,
                statusType: 'failed',
              });
              return;
            }

            this.isPersonalDetailsModelOpen = false;
            this.otpgroup.reset();
            const url = `/sucessfull/${data.response.userId}/${data.response.token}`;
            setTimeout(() => {
              this.router.navigate([url]);
            }, 100);
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
