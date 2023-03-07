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
  lecturesData:any = []
  greeting = ''
  constructor(public http: HttpClient,public router:Router) {}

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
        if (data.classId == 1) {
          this.lecturesData = data['subjects']
        }
      })

    })
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

  beginTest(data:any)
  {
    this.router.navigate(['/tabs/test'],{queryParams : { lec_title : data.lec_title,lec_id : data.lec_id}})

  }

}
