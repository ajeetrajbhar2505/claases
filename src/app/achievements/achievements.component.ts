import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent  {
  contentsData:any = []
  filteredData:any = []
  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router) {
    this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
      const lecturesData: any = await this.http.get('assets/LecturesWiseVideos.json').toPromise()
        lecturesData.filter((Object:any)=>{
          if (Object.lec_id == 2) {
            this.contentsData = Object['contents']
            this.filteredData =  Object['contents'].filter((object:any)=> object.content == 'video')
          }
      })

    })
  }

  backToHome(){
   this.router.navigate(['/tabs/home'])
  }
}
