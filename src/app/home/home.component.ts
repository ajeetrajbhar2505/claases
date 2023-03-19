import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollDetail } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  greeting = ''
  constructor(public http: HttpClient,public router:Router) {}
   menus = [
    { icon : 'bar-chart-outline',title : 'Leadership'},
    { icon : 'medal-outline',title : 'Achievements'},
    { icon : 'heart-outline',title : 'Favorites'},
   ]
   courses = [
    { icon : 'layers-outline',title : 'Shop',ratings : '4.2',contents : '24'},
    { icon : 'bar-chart-outline',title : 'Leadership',ratings : '3.5',contents : '15'},
    { icon : 'medal-outline',title : 'Achievements',ratings : '5',contents : '10'},
    { icon : 'heart-outline',title : 'Favorites',ratings : '2.6',contents : '35'},
   ]
 async ngOnInit() {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good night';
    }
  }

  handleScrollStart() {
    console.log('scroll start');
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    console.log('scroll', ev.detail);
  }

  handleScrollEnd() {
    console.log('scroll end');
  }



}
