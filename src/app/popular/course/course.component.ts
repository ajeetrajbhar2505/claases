import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonRouterOutlet,
  ItemReorderEventDetail,
  Platform,
} from '@ionic/angular';
import { App } from '@capacitor/app';
import { Requestmodels } from 'src/app/models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  lecturesData: any[] = [];

  constructor(
    public _https: WebService,
    public http: HttpClient,
    public ActivatedRoute: ActivatedRoute,
    public router: Router,
    private sanitizer: DomSanitizer,
    public fb: FormBuilder,
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this._unsubscribeAll = new Subject();

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });
  }

  async ngOnInit() {
    this.fetchMostWatched();
    this.ActivatedRoute.queryParams.subscribe((params: any) => {
      if (params.reload === 'true') {
        this.fetchMostWatched();
      }
    });
  }

  async fetchMostWatched() {
    const req = new Requestmodels();
    req.RequestUrl = `mostWatched`;
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
            this.lecturesData = data.response || [];
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  routeTocontents(classId: any, lec_id: any) {
    this.router.navigate(['/tabs/contents'], {
      queryParams: {
        classId: classId,
        lec_id: lec_id,
        from: '/tabs/popular-lectures',
      },
    });
  }

  backTohome() {
    this.router.navigate(['/tabs/home']);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }
}
