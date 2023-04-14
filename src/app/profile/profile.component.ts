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

  navigateToFeatures()
  {
    this.router.navigate(['/tabs/features'])
  }
  

}
