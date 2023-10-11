import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {
  CalendarOptions,
  EventInput,
  EventApi,
  DateSelectArg,
} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  @ViewChild('fullCalendar') fullCalendar!: FullCalendarComponent;


  calendarEvents: EventInput[] = [
    { title: 'Zoom meeting', start: new Date() }
  ];

  isStartTimeCleared = false;
  isEndTimeCleared = false;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    editable: true,
    plugins: [dayGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'today,prev,next,title',
      center: '',
      right: 'dayGridMonth,listMonth',
    },
    // validRange: {
    //   start: new Date(), // Set the start date to today
    // },
    datesSet: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    firstDay: 1,
    views: {
      dayGrid: {
        dayMaxEvents: 3,
      },
    },
    events: [],
  };
  constructor(public router: Router) {}

  ngOnInit() {}

  handleDateSelect(selectInfo: any) {
    console.log(selectInfo);
    const currentDate = new Date(selectInfo.startStr);
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
  }
  handleEventClick(clickInfo: any) {
    const event = clickInfo.event;
    let extendedProps = event.extendedProps;
  }

  backToHome() {
    this.router.navigate(['/tabs/home']);
  }
}
