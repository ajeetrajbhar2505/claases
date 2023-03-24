import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent implements OnInit  {
  lecturesData:any = []
  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router) {

  }

  async ngOnInit() {
    const response: any = await this.http.get('assets/classWiseLectures.json').toPromise();
    const data = response.filter((data: any) => data.classId === 10)[0];
    this.lecturesData = data.subjects;
  }

  backToHome(){
   this.router.navigate(['/tabs/home'])
  }
}
