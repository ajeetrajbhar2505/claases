import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/tabs/login']);
    }, 3000);
  }

}
