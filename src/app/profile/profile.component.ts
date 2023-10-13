import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { WebService } from '../web.service';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isProfileModelOpen = false;
  isPersonalDetailsModelOpen = false;
  loading = false;

  visiblepass = [false, false];
  shakeButton: boolean = false;
  UserProfileDetails: UserProfileDetails = new UserProfileDetails();
  private _unsubscribeAll: Subject<any>;

  showpassword(index: number) {
    this.visiblepass[index] = !this.visiblepass[index];
  }

  constructor(
    public _https: WebService,
    public router: Router,
    public menuCtrl: MenuController,
    public service: WebService,
    public ActivatedRoute: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.fetchcontentDetails();
    this.ActivatedRoute.queryParams.subscribe((params: any) => {
      if (params.reload === 'true') {
        this.fetchcontentDetails();
      }
    });
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

  update() {
    this.loading = !this.loading;
  }

  async fetchcontentDetails() {
    const req = new Requestmodels();
    req.RequestUrl = `profile`;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.UserProfileDetails.first_name = data.response.given_name;
            this.UserProfileDetails.last_name = data.response.family_name;
            this.UserProfileDetails.email = data.response.email;
            this.UserProfileDetails.username = data.response.email;
            this.UserProfileDetails.profile_picture = data.response.picture;
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  ableToText(show: boolean) {
    this.shakeButton = this.service.shakeButton(this.loading, show);
  }
}

export class UserProfileDetails {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_picture: string;

  constructor() {
    this.first_name = '';
    this.last_name = '';
    this.username = '';
    this.email = '';
    this.profile_picture = '';
  }
}
