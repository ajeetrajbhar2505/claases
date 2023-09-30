import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject,takeUntil } from 'rxjs';
import { Requestmodels } from '../models/Requestmodels.module';
import { WebService } from '../web.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  classes: any = [];
  private _unsubscribeAll: Subject<any>;
  constructor(public router: Router,public _https:WebService) {
    this._unsubscribeAll = new Subject()
  }

  routeTosubjects(classId: any) {
    this.router.navigate(['/tabs/lectures'], {
      queryParams: { classId: classId },
    });
  }

  ngOnInit() {
    this.fetchClassDetails()
  }

 async fetchClassDetails() {
  const req = new Requestmodels()
  req.RequestUrl = `classDetails`;
  req.RequestObject = ""

  await this._https
   .fetchData(req)
   .pipe(takeUntil(this._unsubscribeAll))
   .subscribe(
    (data) => {
     if (data != null) {
      if (data.status !== 200) {
       return
      }

      
      // fetch banklist
       this.classes = data.response || []
     }
    },
    (_error) => {
     return;
    },
    () => {

    }

   )
  }

}
