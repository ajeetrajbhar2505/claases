import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  lecturesData = [
    {
      lec_id: 1,
      lec_icon: 'assets/english.webp',
      lec_title: 'English',
      video_link:
        'assets/video/A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4',
      video_title: 'A For Apple - ABC Alphabet Songs with Sounds for Children',
      liked: false

    },
    {
      lec_id: 2,
      lec_icon: 'assets/maths.webp',
      lec_title: 'Maths',
      video_link:
        'assets/video/Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4',
      video_title: 'Tables1 to 10 || English Table of One to Ten Tables Song ',
      liked: false

    },
    {
      lec_id: 3,
      lec_icon: 'assets/biology.webp',
      lec_title: 'Biology',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 4, lec_icon: 'assets/chemistry.webp', lec_title: 'Chemistry',
      video_link: '',
      video_title: '',
      liked: false

    },

    {
      lec_id: 5,
      lec_icon: 'assets/economic.webp',
      lec_title: 'Economics',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 6,
      lec_icon: 'assets/history.webp',
      lec_title: 'History',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 7,
      lec_icon: 'assets/hindi.webp',
      lec_title: 'Hindi',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 8,
      lec_icon: 'assets/physics.webp',
      lec_title: 'Physics',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 9,
      lec_icon: 'assets/urdu.webp',
      lec_title: 'Urdu',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 10,
      lec_icon: 'assets/psychology.webp',
      lec_title: 'Psychology',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 11,
      lec_icon: 'assets/computer-science.webp',
      lec_title: 'Computer Science',
      video_link: '',
      video_title: '',
      liked: false

    },
  ];

  constructor(public http:HttpClient) { }

  ngOnInit() {
 
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

}
