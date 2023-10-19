import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { WebService } from '../web.service';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit,AfterViewInit {
  isProfileModelOpen = false;
  isPersonalDetailsModelOpen = false;
  loading = false;

  visiblepass = [false, false];
  shakeButton: boolean = false;
  location: location = new location()
  UserProfileDetails: UserProfileDetails = new UserProfileDetails();
  private _unsubscribeAll: Subject<any>;
  uploadStatus: any = { status: false, message: '', statusType: '' };
  statusIcons = [
    { name: 'checkmark-circle-outline', status: 'success' },
    { name: 'close-circle-outline', status: 'failed' },
    { name: 'information-circle-outline', status: 'info' },
  ];
  currentStatusIcon: any = '';
  editable: boolean = false;

  editProfile() {
    this.editable = !this.editable;
  }
  showpassword(index: number) {
    this.visiblepass[index] = !this.visiblepass[index];
  }
  skeleton: boolean = false;
  constructor(
    public _https: WebService,
    public router: Router,
    public menuCtrl: MenuController,
    public service: WebService,
    public ActivatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    this._https.getLocation()
    .then((location: location) => {
      this.location = location
    })
    .catch((error) => {
      console.error("Error:", error);
    });
   this.fetchProfileDetails();
    this.ActivatedRoute.queryParams.subscribe((params: any) => {
      if (params.reload === 'true') {
        this.fetchProfileDetails();
      }
    });
  }

  async ngAfterViewInit() {
   await this.fetchProfileDetails();
  }

  navigateTo(path: any) {
    this.router.navigate(['/tabs/' + path]);
  }

  previewPhoto(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('imageSrc', reader.result as string);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
    reader.readAsDataURL(file);
    this.isProfileModelOpen = false;
  }

  removepreviewPhoto() {
    localStorage.removeItem('imageSrc');
    this.isProfileModelOpen = false;
  }

  toggleprofileMenu() {
    this.isProfileModelOpen = !this.isProfileModelOpen;
  }

  togglePersonalDetails() {
    this.loading = false;
    this.isPersonalDetailsModelOpen = !this.isPersonalDetailsModelOpen;
  }

  logout() {
    this.service.logout();
  }

  async update() {
    this.loading = true;

    const loading = await this.loadingCtrl.create({
      message: 'Saving details...',
      duration: 0,
    });
    loading.present();
    const req = new Requestmodels();
    req.RequestUrl = `updateProfile`;
    req.RequestObject = this.UserProfileDetails;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.loading = false;
            this.editable = false;
            loading.dismiss();
            if (data.status !== 200) {
              this.openSnackbar({
                status: true,
                message: data.response,
                statusType: 'failed',
              });
              return;
            }

            // fetch
            this.openSnackbar({
              status: true,
              message: data.response,
              statusType: 'info',
            });
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  async fetchProfileDetails() {
    this.skeleton = true;
    const req = new Requestmodels();
    req.RequestUrl = `profile`;
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
            this.UserProfileDetails.first_name = data.response.given_name;
            this.UserProfileDetails.last_name = data.response.family_name;
            this.UserProfileDetails.fullName =
              data.response.given_name + ' ' + data.response.family_name;
            this.UserProfileDetails.email = data.response.email;
            this.UserProfileDetails.username = data.response.email;
            this.UserProfileDetails.profile_picture = data.response.picture;
            this.UserProfileDetails.address1 = data.response.address1;
            this.UserProfileDetails.address2 = data.response.address2;
            this.UserProfileDetails.phone = data.response.phone;
            this.UserProfileDetails.country = data.response.country;
            this.UserProfileDetails.city = data.response.city;
            this.UserProfileDetails.ZIP = data.response.ZIP;
            this.UserProfileDetails.bio = data.response.bio;
            this.UserProfileDetails._id = data.response._id;
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  ableToText(show: boolean) {
    this.shakeButton = false;
    this.shakeButton = this.service.shakeButton(this.loading, show);
  }

  limitNumber() {
    const phone = this.UserProfileDetails.phone;
    if (phone && phone.toString().length >= 10) {
      const truncatedNumber = phone.toString().slice(0, 10);
      this.UserProfileDetails.phone = truncatedNumber;
    }
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

  async showLoading(msg: any) {
    const loading = await this.loadingCtrl.create({
      message: msg,
      duration: 0,
    });
    loading.present();
    if (!this.loading) {
      loading.dismiss();
    }
  }
}

export class UserProfileDetails {
  fullName: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_picture: string;
  address1: string;
  address2: string;
  phone: string;
  country: string;
  city: string;
  ZIP: string;
  bio: string;
  _id: string;

  constructor() {
    this.fullName = '';
    this.first_name = '';
    this.last_name = '';
    this.username = '';
    this.email = '';
    this.profile_picture = '';
    this.address1 = '';
    this.address2 = '';
    this.phone = '';
    this.country = '';
    this.city = '';
    this.ZIP = '';
    this.bio = '';
    this._id = '';
  }
}

export class location {
  latitude: any
  longitude: any
}