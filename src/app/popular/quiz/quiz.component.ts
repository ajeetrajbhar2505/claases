import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commonNavigation } from 'src/app/models/commonObjects.module';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  lecturesData:any = []
  classId:any = 1
  contentId:any = 1
  constructor(public http:HttpClient,public router:Router) { }

 async ngOnInit() {
    let response: any = await this.http.get('assets/classWiseLectures.json').toPromise().then((response: any) => {
      response.filter((data: any) => {
        if (data.classId == this.classId) {
          this.lecturesData = data['subjects']
        }
      })

    })
  }


  beginTest(data:any)
  {
    const queryParams:commonNavigation = {
      classId: this.classId,
      lec_id: data.lec_id,
      lec_title : data.lec_title,
      contentId: this.contentId,
      from: '/tabs/popular-quiz',
    };
    this.router.navigate(['/tabs/test'],{queryParams})
  }
  
  backTohome() {
    this.router.navigate(['/tabs/home'])
  }
}
