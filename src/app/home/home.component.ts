import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, ScrollDetail } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

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
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('searchBar', { static: false }) searchBar!: IonSearchbar;

  greeting = '';
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
  notifications: Notification[] = [
    { icon: 'musical-notes-outline', info: 'Admin uploaded a new audio', content : 'audio' },
    { icon: 'play-circle-outline', info: 'Admin uploaded a new video', content : 'video' },
    { icon: 'document-text-outline', info: 'Admin uploaded a new document', content : 'document' },
  ];
  contentId = 10
  classId = 10
  LecturesWiseVideos:any = []
  SearchedContents:any = []
  constructor(public http: HttpClient, public router: Router, public menuCtrl: MenuController) {}

  async ngOnInit() {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good night';
    }
    const response: any = await this.http.get('assets/classWiseLectures.json').toPromise();
    const data = response.filter((data: any) => data.classId === this.classId)[0];
    this.lecturesData = data.subjects;
    this.lecturesData.forEach((element: any) => {
      element.ratings = 25;
      element.contents = 16;
    });
    this.getLecturesWiseVideos()
  }


  async getLecturesWiseVideos()
  {
    const response:any = await this.http.get('assets/LecturesWiseVideos.json').toPromise();
    response.forEach((element:any) => {
      element['contents'].forEach((object:any)=>{
        object.lec_id = element.lec_id
        this.LecturesWiseVideos.push(object)
      })
    });
  }

  searchData(event:any)
  {
    const text = event.target.value.toLowerCase()
    this.SearchedContents = this.LecturesWiseVideos.filter((element:any)=> element['content_title'].toLowerCase().includes(text))
  }


  focusSearchBar() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 10);
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
  }

  toggleSeachmenu()
  {
    this.isSearchOpen = ! this.isSearchOpen
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

  routeTocontentControls(content: string | { lec_id: number; contentId: number }, from: 'notification' | 'other') {
    const contentMap:any = {
      audio: '9',
      video: '3',
      document: '11',
    };
    const queryParams: { classId: number; lec_id: number; contentId: string | number; from: string } = {
      classId: 1,
      lec_id: typeof content === 'string' ? 4 : content.lec_id,
      contentId: typeof content === 'string' ? contentMap[content] : content.contentId,
      from: `/tabs/home`,
    };
    setTimeout(() => {
    this.router.navigate(['/tabs/content-controls'], { queryParams });
  }, 10);
  }
  

  routeToAchievements()
  {
    this.router.navigate(['/tabs/achievements']);
  }

}
