import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollDetail } from '@ionic/angular';
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
  greeting = '';
  isModalOpen = false;
  menus: MenuItem[] = [
    { icon: 'bar-chart-outline', title: 'Leadership' },
    { icon: 'medal-outline', title: 'Achievements' },
    { icon: 'heart-outline', title: 'Favorites' },
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
    const data = response.filter((data: any) => data.classId === 10)[0];
    this.lecturesData = data.subjects;
    this.lecturesData.forEach((element: any) => {
      element.ratings = 25;
      element.contents = 16;
    });
  }

  beginTest(data: any) {
    this.router.navigate(['/tabs/test'], { queryParams: { lec_title: data.lec_title, lec_id: data.lec_id } });
  }

  toggleMenu() {
    this.menuCtrl.toggle();
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
      classId: '', 
      lec_id: lec_id,
      from: '/tabs/home' 
    }
    this.router.navigate(['/tabs/contents'], { queryParams });
  }

  routeTocontentControls(content:any)
  {
    const contentMap:any = {
      'audio': '9',
      'video': '3',
      'document': '11',
    };
    const contentId = contentMap[content];
    const queryParams = {
      classId: 1,
      lec_id: 4,
      contentId: contentId,
      from: "/tabs/home",
    };
    this.router.navigate(['/tabs/content-controls'], { queryParams });
  }

}
