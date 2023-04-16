import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  greeting = ''

  constructor(public router: Router) { }

  ngOnInit() {

  }




  backToHome() {
    this.router.navigate(['/tabs/profile'])
  }

}
