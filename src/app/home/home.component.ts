import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollDetail } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  greeting = ''
  isModalOpen:boolean = false

  constructor(public http: HttpClient,public router:Router, public menuCtrl: MenuController) {}
   menus = [
    { icon : 'bar-chart-outline',title : 'Leadership'},
    { icon : 'medal-outline',title : 'Achievements'},
    { icon : 'heart-outline',title : 'Favorites'},
   ]
  lecturesData:any = []
   courses = [
    { icon : 'layers-outline',title : 'Shop',ratings : '4.2',contents : '24'},
    { icon : 'bar-chart-outline',title : 'Leadership',ratings : '3.5',contents : '15'},
    { icon : 'medal-outline',title : 'Achievements',ratings : '5',contents : '10'},
    { icon : 'heart-outline',title : 'Favorites',ratings : '2.6',contents : '35'},
   ]

   notifications:any[] = [
    { icons : 'musical-notes-outline', info : 'Admin uploaded a new audio',from : ''},
    { icons : 'play-circle-outline', info : 'Admin uploaded a new video',from : ''},
    { icons : 'document-text-outline', info : 'Admin uploaded a new document',from : ''},
   ]

   
   setOpen()
   {
    this.isModalOpen = ! this.isModalOpen
   }

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
    let response: any = await this.http.get('assets/classWiseLectures.json').toPromise().then((response: any) => {
      response.filter((data: any) => {
        if (data.classId == 10) {
          this.lecturesData = data['subjects']
          data['subjects'].forEach((element:any) => {
            element.ratings = 25
            element.contents = 16
          });
        }
      })

    })
  }


  beginTest(data:any)
  {
    this.router.navigate(['/tabs/test'],{queryParams : { lec_title : data.lec_title,lec_id : data.lec_id}})

  }


  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
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


  routeTocontents(lec_id: any) {
    this.router.navigate(['/tabs/contents'],{queryParams : {classId : "", lec_id : lec_id,from : '/tabs/home'}})
   }


}
