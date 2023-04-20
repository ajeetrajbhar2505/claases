import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { WebService } from '../web.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isProfileModelOpen = false
  isPersonalDetailsModelOpen = false
  visiblepass = false
  loading = false

  showpassword()
  {
     this.visiblepass = ! this.visiblepass
  }
  constructor(public router:Router,public menuCtrl: MenuController,public service:WebService) { }

  ngOnInit() {}

  navigateTo(path:any)
  {
    this.router.navigate(['/tabs/' + path])
  }
  

  previewPhoto(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('imageSrc',reader.result as string)
    };
    reader.onerror = (error) => {
      console.log(error);
    }
    reader.readAsDataURL(file);
    this.isProfileModelOpen = false
  }
  

  getImgSrc()
  {
    return localStorage.getItem('imageSrc')
  }

  removepreviewPhoto()
  {
    localStorage.removeItem('imageSrc')
    this.isProfileModelOpen = false
  }
  

  toggleprofileMenu()
  {
    this.isProfileModelOpen = ! this.isProfileModelOpen
  }

  togglePersonalDetails()
  {
    this.isPersonalDetailsModelOpen = ! this.isPersonalDetailsModelOpen
  }


  logout()
  {
     this.service.logout()
  }

  update()
  {
   this.loading = ! this.loading
  }
  

}
