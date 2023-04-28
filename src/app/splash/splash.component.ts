import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  constructor(private router: Router,public service:WebService) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/tabs/home']);
      this.service.isSplashLoaded = true
    }, 3000);
  }

}
