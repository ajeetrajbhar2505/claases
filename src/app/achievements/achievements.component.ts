import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Requestmodels } from '../models/Requestmodels.module';
import { WebService } from '../web.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent implements OnInit  {
  lecturesData:any = []
  scoreCard:any[] = []
  private _unsubscribeAll: Subject<any>;
  constructor(public http: HttpClient, public ActivatedRoute: ActivatedRoute, public router: Router,public _https: WebService
    ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    this.ActivatedRoute.queryParams.subscribe(async (params: any) => {
      if (params.reload === 'true') {
        this.getscoreCard()
        return
      }
      this.getscoreCard()
    });
  }

  backToHome(){
   this.router.navigate(['/tabs/home'])
  }

  async getscoreCard() {
    const req = new Requestmodels();
    req.RequestUrl = `scoreCard`;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.scoreCard = data.response || []
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

  calculatePercentage(scored: number, totalMarks: number): number {
    if (totalMarks === 0) {
        return 0;
    }

    const percentage = (scored / totalMarks) * 100;
    // Round to two decimal places
    return Math.round(percentage * 100) / 100;
}


}
