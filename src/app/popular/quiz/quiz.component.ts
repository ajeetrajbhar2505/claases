import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  lecturesData:any = []

  constructor(public http:HttpClient,public router:Router) { }

 async ngOnInit() {
    let response: any = await this.http.get('assets/classWiseLectures.json').toPromise().then((response: any) => {
      response.filter((data: any) => {
        if (data.classId == 1) {
          this.lecturesData = data['subjects']
        }
      })

    })
  }


  beginTest(data:any)
  {
    this.router.navigate(['/tabs/test'],{queryParams : { lec_title : data.lec_title,lec_id : data.lec_id}})

  }
}
