import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSearchbar, ScrollDetail } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { WebService } from '../web.service';
import { commonNavigation } from '../models/commonObjects.module';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserProfile } from '../models/UserProfile.module';

const navigationExtras: NavigationExtras = {
  queryParams: { reload: 'true',from : '/tabs/home'},
};
interface MenuItem {
  icon: string;
  title: string;
}

interface Course {
  icon: string;
  title: string;
  ratings: string;
  contents: string;
}

interface Notification {
  icon: string;
  info: string;
  content: string;
  classId: any;
  lec_id: any;
  contentId: any;
  from: string;
  authorId: any
}

interface LectureWiseVideosData {
  lec_id: number;
  contents: {
    title: string;
    desc: string;
    duration: number;
    thumbnail: string;
    url: string;
    lec_id?: number; // optional property
  }[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  @ViewChild('searchBar', { static: false }) searchBar!: IonSearchbar;
  socket: any;
  greeting = '';
  isModalOpen = false;
  isSearchOpen: boolean = false;
  menus: MenuItem[] = [{ icon: 'ribbon-outline', title: 'Achievements' }];
  mostWatched: any[] = [];
  contentDetails: any[] = [];
  courses: Course[] = [
    { icon: 'layers-outline', title: 'Shop', ratings: '4.2', contents: '24' },
    {
      icon: 'bar-chart-outline',
      title: 'Leadership',
      ratings: '3.5',
      contents: '15',
    },
    {
      icon: 'medal-outline',
      title: 'Achievements',
      ratings: '5',
      contents: '10',
    },
    {
      icon: 'heart-outline',
      title: 'Favorites',
      ratings: '2.6',
      contents: '35',
    },
  ];

  notifications: Notification[] = [];
  //   notifications: Notification[] = [
  //   {
  //     icon: 'musical-notes-outline',
  //     info: 'Admin uploaded a new audio',
  //     content: 'audio',
  //     classId: '642f2337de637e0827864e06',
  //     lec_id: '642f2a79eb0a076652aa32fc',
  //     contentId: '6529140a98e2dda6637e57aa',
  //     from: '/tabs/home',
  //   },
  //   {
  //     icon: 'play-circle-outline',
  //     info: 'Admin uploaded a new video',
  //     content: 'video',
  //     classId: '642f2337de637e0827864e06',
  //     lec_id: '642f2a79eb0a076652aa32fc',
  //     contentId: '652913c098e2dda6637e57a9',
  //     from: '/tabs/home',
  //   },
  //   {
  //     icon: 'document-text-outline',
  //     info: 'Admin uploaded a new document',
  //     content: 'document',
  //     classId: '642f2337de637e0827864e06',
  //     lec_id: '642f2a79eb0a076652aa32fc',
  //     contentId: '6529143c98e2dda6637e57ab',
  //     from: '/tabs/home',
  //   },
  // ];
  notification_count = this.notifications.length;
  contentId: any = 10;
  LecturesWiseVideos: any = [];
  SearchedContents: any = [];
  colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
  skeleton = {
    mostWatched: false,
    lectureDetails: false
  };
  lectureDetails: any = []
  loading: boolean = false
  UserProfile: UserProfile = new UserProfile();

  getColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    public http: HttpClient,
    public _https: WebService,
    public ActivatedRoute: ActivatedRoute,
    public router: Router,
    public menuCtrl: MenuController,
    public service: WebService
  ) {
    this._unsubscribeAll = new Subject();
    this.socket = service.socket;
    this.UserProfile = service.UserProfile
  }

  async ngOnInit() {
    // Get the current hour to determine the greeting message
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good night';
    }

    this.fetchMostWatched();
    this.popular_lectureDetails();
    this.fetchNotifications()

    // socket connection
    this.getMessage();

    // Fetch class wise lectures data and update the UI
    this.ActivatedRoute.queryParams.subscribe((params: any) => {
      if (params.reload === 'true') {
        this.fetchMostWatched();
        this.popular_lectureDetails();
      }
    });
  }

  async fetchNotifications() {
    this.skeleton.mostWatched = true;
    const req = new Requestmodels();
    req.RequestUrl = `notifications`;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.skeleton.mostWatched = false;
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.notifications = data.response || []
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }


  async popular_lectureDetails() {
    this.skeleton.mostWatched = true;
    const req = new Requestmodels();
    req.RequestUrl = `popular_lectureDetails`;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.skeleton.mostWatched = false;
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.lectureDetails = data.response || []
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

  async fetchMostWatched() {
    this.skeleton.mostWatched = true;
    const req = new Requestmodels();
    req.RequestUrl = `mostWatched`;
    req.RequestObject = '';

    await this._https
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.skeleton.mostWatched = false;
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.mostWatched = data.response.map((data: any) => {
              return {
                ...data,
                ratings: 25,
                contents: 16,
              };
            });
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

  async fetchlectureDetails() {

    this.skeleton.lectureDetails = true
    const req = new Requestmodels();
    req.RequestUrl = `lectureDetails`;
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
            this.lectureDetails = data.response.map((data: any) => {
              return {
                ...data,
                ratings: 25,
                contents: 16,
              };
            });
            this.skeleton.lectureDetails = this.lectureDetails.length ? false : true
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

  searchData(event: any) {
    const text = event.target.value.trim().toLowerCase();
    this.SearchedContents = this.contentDetails.filter((element: any) => {
      const contentTitle = element.content_title
        ? element.content_title.toLowerCase()
        : '';
      return contentTitle.includes(text);
    });
  }

  async searchText() {
    if (!this.searchQuery) {
      return
    }
    this.loading = true
    const payload = {
      searchText: this.searchQuery
    }
    const req = new Requestmodels();
    req.RequestUrl = `search_contentDetails`;
    req.RequestObject = payload;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            this.loading = false
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.SearchedContents = data.response || [];
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }


  focusSearchBar() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 100);
  }

  beginTest(data: any) {
    const queryParams: commonNavigation = {
      classId: data.classId,
      lec_id: data._id,
      lec_title: data.lec_title,
      contentId: this.contentId,
      from: '/tabs/home',
      reload: 'true',
    };
    this.router.navigate(['/tabs/quiz'], { queryParams });
  }

  toggleMenu() {
    this.menuCtrl.toggle();
    this.notification_count = 0;
  }

  toggleSeachmenu() {
    this.SearchedContents = [];
    this.isSearchOpen = !this.isSearchOpen;
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

  routeTocontents(classId: any, lec_id: any) {
    const queryParams: commonNavigation = {
      classId: classId,
      lec_id: lec_id,
      from: '/tabs/home',
      reload: 'true',
    };
    this.router.navigate(['/tabs/contents'], { queryParams });
  }

  routeTocontentControls(contentDetails: any) {
    const queryParams = {
      from: '/tabs/home',
      classId: contentDetails.classId,
      lec_id: contentDetails.lec_id,
      contentId: contentDetails._id,
      content: contentDetails.content,
      reload: 'true',
    }

    setTimeout(() => {
      this.router.navigate(['/tabs/content-controls'], { queryParams });
    }, 10);

    const userProfile = {
      userid: this._https.UserProfile.userId, // Replace with the actual user ID
      datetime: new Date().toISOString(), // Current date and time in ISO format
    };

    this.addViewCount(contentDetails, userProfile)
    this.searchQuery = ""
  }

  async addViewCount(contentDetails: any, userProfile: any) {
    const payload = {
      classId: contentDetails.classId,
      lec_id: contentDetails.lec_id,
      contentId: contentDetails._id,
      userProfile: userProfile
    }
    const req = new Requestmodels();
    req.RequestUrl = `upsertViewCount`;
    req.RequestObject = payload;

    await this._https
      .PostData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

  routeTocontentControls1(content: any) {
    const queryParams = {
      ...content,
      contentId: content.contentId ? content.contentId : content._id,
      from: '/tabs/home',
      reload: 'true',
    };
    delete queryParams.icon;
    delete queryParams.info;
    // Delay navigation by 10 milliseconds to ensure that the
    // UI updates before navigating to the next page
    setTimeout(() => {
      this.router.navigate(['/tabs/content-controls'], { queryParams });
    }, 10);
  }

  routeToAchievements() {
    this.router.navigate(['/tabs/achievements'], navigationExtras);
  }

  routeToPupularLectures() {
    this.router.navigate(['/tabs/popular-lectures'], navigationExtras);
  }

  routeToPupularQuiz() {
    this.router.navigate(['/tabs/popular-quiz'], navigationExtras);
  }

  getMessage() {
    this.socket.on('notification', (data: any) => {
      if (data.authorId != this._https.UserProfile.userId) {
        this.notifications.push(data);
        this.notification_count = this.notification_count + 1;
      }
    });
  }


  routesTo(path:any)
  {
    this.router.navigate(['/tabs/' + path],navigationExtras)
  }

}
