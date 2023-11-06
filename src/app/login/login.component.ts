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

  isPersonalDetailsModelOpen = true;

  showpassword() {
    this.visiblepass = !this.visiblepass;
  }
  constructor(
    public router: Router,
    public service: WebService,
    private actionSheetCtrl: ActionSheetController,
    public _https: WebService,
    public fb:FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  otpgroup!:FormGroup

  ngOnInit(): void {
    this.otpgroup = this.fb.group({
      otp1 : ['',Validators.required],
      otp2 : ['',Validators.required],
      otp3 : ['',Validators.required],
      otp4 : ['',Validators.required]
    })
  }

  restrictmaxNumber(event:any,name:any){
    const formcontrol:any =  this.otpgroup.get(name)
    if (formcontrol.value.toString().length > 1) {
      const truncatedNumber = formcontrol.value.toString().slice(0, 1);
      formcontrol.patchValue(truncatedNumber);
    }
    const nextInput = event.target.nextElementSibling;

    if (nextInput && nextInput.tagName === 'INPUT') {
      nextInput.focus();
    }
  
  }


  
  LogiinWithGoogle() {
    this.isPersonalDetailsModelOpen = true;
    const firstOTPInput = document.getElementById("otp1");
    if (firstOTPInput) {
      firstOTPInput.focus();
    }
    const url = environment.nodeApi + 'google';
    // // Use "_blank" as the target to open in a new tab
    window.open(url, '_blank');
  }

  login() {
    this.service.login();
  }

  closeModel(){
    this.isPersonalDetailsModelOpen = false
  }

  validate(): boolean {
    if (!this.otpgroup.valid) {
      // At least one field is empty, so the OTP is invalid
      return false;
    }
    return true;
  }
  

  async verifyOTP() {
    const otp = this.otpgroup.get('otp1')?.value + '' + this.otpgroup.get('otp2')?.value + '' + this.otpgroup.get('otp3')?.value + ''+  this.otpgroup.get('otp4')?.value
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
            if (data.status !== 200) {
              return;
            }
            this.isPersonalDetailsModelOpen = false;
            const url = `/sucessfull/${data.response.userId}/${data.response.token}`
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
}
