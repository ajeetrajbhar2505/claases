import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';
import { environment } from 'src/environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, retry, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  visiblepass: boolean = false;
  presentingElement: any;
  otp1 = '';
  otp2 = ''
  otp3 = ''
  otp4 = ''

  isPersonalDetailsModelOpen = false;

  showpassword() {
    this.visiblepass = !this.visiblepass;
  }
  constructor(
    public router: Router,
    public service: WebService,
    private actionSheetCtrl: ActionSheetController,
    public _https: WebService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.presentingElement = document.querySelector('.ion-page');
  }

  LogiinWithGoogle() {
    this.isPersonalDetailsModelOpen = true;
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
    if (!this.otp1 || !this.otp2 || !this.otp3 || !this.otp4) {
      // At least one field is empty, so the OTP is invalid
      return false;
    }
    return true;
  }
  

  async verifyOTP() {
    const otp = this.otp1 + '' + this.otp2 + '' + this.otp3 + ''+  this.otp4
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
