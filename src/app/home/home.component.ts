import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, ScrollDetail } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { WebService } from '../web.service';



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
  classId : any,
  lec_id : any,
  contentId : any,
  from : string,
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
  @ViewChild('searchBar', { static: false }) searchBar!: IonSearchbar;
  socket: any;
  greeting = '';
  notification_count = 0
  isModalOpen = false;
  isSearchOpen: boolean = false;
  menus: MenuItem[] = [
    { icon: 'ribbon-outline', title: 'Achievements' },
  ];
  lecturesData: any[] = [];
  courses: Course[] = [
    { icon: 'layers-outline', title: 'Shop', ratings: '4.2', contents: '24' },
    { icon: 'bar-chart-outline', title: 'Leadership', ratings: '3.5', contents: '15' },
    { icon: 'medal-outline', title: 'Achievements', ratings: '5', contents: '10' },
    { icon: 'heart-outline', title: 'Favorites', ratings: '2.6', contents: '35' },
  ];

  notifications: Notification[] = [];
  contentId = 10
  classId = 10
  LecturesWiseVideos:any = []
  SearchedContents:any = []
  constructor(public http: HttpClient, public router: Router, public menuCtrl: MenuController,public service:WebService) {
    this.socket = service.socket
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
    
    // Fetch class wise lectures data and update the UI
    const response:any = await this.http.get('assets/classWiseLectures.json').toPromise();
    const classData = response.find((data:any) => data.classId === this.classId);
    if (classData) {
      this.lecturesData = classData.subjects.map((subject:any) => {
        return {
          ...subject,
          ratings: 25,
          contents: 16
        };
      });
    }
    
    // Fetch lectures wise videos
    this.getLecturesWiseVideos();

    // socket connection
    this.getMessage()
  }
  


  async getLecturesWiseVideos() {
    const response:any = await this.http.get<LectureWiseVideosData[]>('assets/LecturesWiseVideos.json').toPromise();
    const lecturesWiseVideos = response.map((lectureData:any) =>
      lectureData.contents.map((videoData:any) => ({ ...videoData, lec_id: lectureData.lec_id }))
    );
    this.LecturesWiseVideos = lecturesWiseVideos.flat();
  }

  searchData(event: any) {
    const text = event.target.value.trim().toLowerCase();
    this.SearchedContents = this.LecturesWiseVideos.filter((element:any) => {
      const contentTitle = element.content_title.trim().toLowerCase();
      return contentTitle.includes(text);
    });
  }
  


  focusSearchBar() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 20);
  }

  beginTest(data:any)
  {
    const queryParams = {
      classId: this.classId,
      lec_id: data.lec_id,
      lec_title : data.lec_title,
      contentId: this.contentId,
      from: '/tabs/home',
    };
    this.router.navigate(['/tabs/test'],{queryParams})
  }

  toggleMenu() {
    this.menuCtrl.toggle();
    this.notification_count = 0
  }

  toggleSeachmenu()
  {
    this.SearchedContents = []
    this.isSearchOpen = !this.isSearchOpen
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

  routeTocontents(lec_id: any) {

    const queryParams = { 
      classId: 1, 
      lec_id: lec_id,
      from: '/tabs/home' 
    }
    this.router.navigate(['/tabs/contents'], { queryParams });
  }

  routeTocontentControls(content: any) {
    const queryParams = { ...content,from : '/tabs/home' };
    delete queryParams.icon;
    delete queryParams.info;
    
    // Delay navigation by 10 milliseconds to ensure that the 
    // UI updates before navigating to the next page
    setTimeout(() => {
      this.router.navigate(['/tabs/content-controls'], { queryParams });
    }, 10);
  }
  
  

  routeToAchievements()
  {
    this.router.navigate(['/tabs/achievements']);
  }



  getMessage(){
    this.socket.on('message', (data: any) => {
      this.notifications.push(data)
      this.notification_count = this.notification_count +  1
    });

  }



}
