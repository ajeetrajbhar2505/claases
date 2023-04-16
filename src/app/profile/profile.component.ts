import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(public router:Router) { }

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
  }
  

  getImgSrc()
  {
    return localStorage.getItem('imageSrc')
  }

  

}
