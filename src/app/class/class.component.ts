import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Requestmodels } from '../models/Requestmodels.module';
import { WebService } from '../web.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  classes: any = [];
  skeleton: boolean = false;
  private _unsubscribeAll: Subject<any>;
  constructor(
    public router: Router,
    public _https: WebService,
    public ActivatedRoute: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  }

  routeTosubjects(classId: any) {
    this.router.navigate(['/tabs/lectures'], {
      queryParams: { classId: classId, reload: 'true' },
    });
  }

  ngOnInit() {
    this.fetchClassDetails();
    this.ActivatedRoute.queryParams.subscribe((params: any) => {
      if (params.reload === 'true') {
        this.fetchClassDetails();
      }
    });
  }

  async fetchClassDetails() {
    this.skeleton = true;
    const req = new Requestmodels();
    req.RequestUrl = `classDetails`;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.skeleton = false;
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.classes = data.response || [];
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }
}
