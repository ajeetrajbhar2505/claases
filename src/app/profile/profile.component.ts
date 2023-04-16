import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isModelOpen = false
  constructor(public router:Router,public menuCtrl: MenuController) { }

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
    this.isModelOpen = false
  }
  

  getImgSrc()
  {
    return localStorage.getItem('imageSrc')
  }

  removepreviewPhoto()
  {
    localStorage.removeItem('imageSrc')
    this.isModelOpen = false
  }
  
  toggleMenu() {
    this.isModelOpen = ! this.isModelOpen
  }
  

}
