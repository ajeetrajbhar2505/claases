import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {}


  backToHome() {
    this.router.navigate(['/tabs/home'])
  }

}
