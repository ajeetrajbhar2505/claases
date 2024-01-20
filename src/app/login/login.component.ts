import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';
import { environment } from 'src/environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, retry, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  visiblepass: boolean = false;
  isPersonalDetailsModelOpen = false;
  currentStatusIcon: any = '';
  loading: boolean = false;
  showpassword() {
    this.visiblepass = !this.visiblepass;
  }
  constructor(
    public router: Router,
    public service: WebService,
    private actionSheetCtrl: ActionSheetController,
    public _https: WebService,
    public fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject(); ``
  }

  otpgroup!: FormGroup;
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.otpgroup = this.fb.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    });
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  
  restrictmaxNumber(event: any, name: any) {
    const formcontrol: any = this.otpgroup.get(name);
    
    // Check if the event is a delete key press
    if (event.keyCode === 46) {
      // Move to the previous input element
      const previousInput = event.target.previousElementSibling;
      
      // If there is a previous input and it's an <input> element
      if (previousInput && previousInput.tagName === 'INPUT') {
        // Set focus on the previous input
        previousInput.focus();
        
        // Remove the value of the previous input
        const previousFormControl: any = this.otpgroup.get(previousInput.name);
        if (previousFormControl) {
          previousFormControl.patchValue('');
        }
      }
    } else if (formcontrol.value.toString().length > 1) {
      // If not a delete key press and length is greater than 1, truncate to the first character
      const truncatedNumber = formcontrol.value.toString().slice(0, 1);
      formcontrol.patchValue(truncatedNumber);
    }
  
    // Focus on the next input
    const nextInput = event.target.nextElementSibling;
    if (nextInput && nextInput.tagName === 'INPUT') {
      nextInput.focus();
    }
  }
  

  LoginWithGoogle() {
    this.otpgroup.reset();
    this.isPersonalDetailsModelOpen = true;
    const firstOTPInput = document.getElementById('otp1');
    if (firstOTPInput) {
      firstOTPInput.focus();
    }

    const url = environment.nodeApi + 'google';
    const width = 600;
    const height = 600;

    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes,status=no`;

    // Open the URL in a popup
    const popup = window.open(url, '_blank', features);

    if (popup) {
      // Focus on the popup if it was successfully opened
      popup.focus();
    } else {
      // Handle cases where the popup was blocked
      alert("Please allow pop-ups for this site to log in with Google.");
    }
  }


  login() {
    this.service.login();
  }

  closeModel() {
    this.loading = false
    this.isPersonalDetailsModelOpen = false;
  }

  validate(): boolean {
    if (!this.otpgroup.valid) {
      // At least one field is empty, so the OTP is invalid
      return false;
    }
    return true;
  }

  isValidEmail(email: string): boolean {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
    return email.match(validRegex) !== null;
  }

  async getOTP() {
    if (!this.loginForm.valid) {
      this._https.openToast('Please enter your email', 'danger');
      return;
    }
  
    if (!this.isValidEmail(this.loginForm.get('username')?.value)) {
      this._https.openToast('Please enter a valid email', 'danger');
      return;
    }
  
    this.loading = true;

    this.loading = true;
    const req = new Requestmodels();
    req.RequestUrl = `Login`;

    req.RequestObject = this.loginForm.value;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.loading = false;
            if (data.status !== 200) {
              this._https.openToast(data.response, 'danger')
              return;
            }
            this.loginForm.reset();
            this.isPersonalDetailsModelOpen = true;
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

  async verifyOTP() {
    if (!this.otpgroup.valid) {
      return;
    }
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
            console.log(data.status);
            
            if (data.status !== 200) {
              this._https.openToast(data.response, 'danger')
              return;
            }

            this.isPersonalDetailsModelOpen = false;
            this.otpgroup.reset();
            localStorage.setItem('picture', data.response.picture)
            const url = `/sucessfull/${data.response.userId}/${data.response.token}`;
            setTimeout(() => {
              this.router.navigate([url]);
            }, 100);
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

}
