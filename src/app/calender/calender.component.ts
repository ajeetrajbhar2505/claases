import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent {
  currentDay: number = 1;
  calendarDates: number[][] = [];
  currentMonth: number;
  currentYear: number;
  transformedCalenderEvents: CalendarEvent[] = [];
  calenderEvents: CalendarEvent[] = [
    {
      day: 1,
      time: '14.00',
      month: 'Oct',
      titile: 'Biology Test',
      date: new Date().toString(),
    },
    {
      day: 5,
      time: '14.00',
      month: 'Oct',
      titile: 'English Test',
      date: new Date().toString(),
    },
    {
      day: 7,
      time: '14.00',
      month: 'Oct',
      titile: 'History Test',
      date: new Date().toString(),
    },
    {
      day: 25,
      time: '12.00',
      month: 'Oct',
      titile: 'Zoom Meeting',
      date: new Date().toString(),
    },
    {
      day: 26,
      time: '16.00',
      month: 'Oct',
      titile: 'Maths Test',
      date: new Date().toString(),
    },
    {
      day: 27,
      time: '10.00',
      month: 'Oct',
      titile: 'History Test',
      date: new Date().toString(),
    },
  ];

  constructor(public router: Router) {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.generateCalendarDates(this.currentYear, this.currentMonth);
  }

  generateCalendarDates(year: number, month: number) {
    // Generate an array of arrays for a month, where each inner array represents a row of dates
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.calendarDates = this.chunkArray(
      Array.from({ length: daysInMonth }, (_, i) => i + 1),
      7
    );
    this.currentDay = new Date().getDate();
    // Call the function to transform the array
    this.transformedCalenderEvents = this.transformCalendarEvents(
      this.calenderEvents
    );
  }

  checkDateExists(date:number):boolean{
    return this.calenderEvents.some(item => item.day === date);
  }

  checkSeriesDateExists(startDate: number, endDate: number): boolean {
    // Check if the series of consecutive dates exists in the `transformedCalenderEvents` array
    for (let date = startDate; date <= endDate; date++) {
      if (!this.calenderEvents.some(item => item.day === date)) {
        return false;
      }
    }
    return true;
  }

  isBetweenSeries(date: number): boolean {
    // Check if the current date falls in between a series
    return this.checkSeriesDateExists(date - 1, date + 1) && !this.checkSeriesDateExists(date - 2, date + 2);
  }

  isSeriesEnd(date: number): boolean {
    // Check if the current date ends a series
    return this.checkSeriesDateExists(date - 2, date);
  }
  

  // Function to chunk an array into sub-arrays
  chunkArray(array: number[], size: number): number[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  goToPreviousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendarDates(this.currentYear, this.currentMonth);
  }

  backToHome() {
    this.router.navigate(['/tabs/home']);
  }

  goToNextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendarDates(this.currentYear, this.currentMonth);
  }

  // Function to transform the array
  transformCalendarEvents(events: CalendarEvent[]): CalendarEvent[] {
    const transformedEvents: CalendarEvent[] = [];

    for (let i = 0; i < events.length; i++) {
      const event = events[i];

      // Check if there are consecutive days
      let startDay = event.day;
      let endDay = event.day;
      while (i + 1 < events.length && events[i + 1].day === endDay + 1) {
        endDay = events[i + 1].day;
        i++;
      }

      // Create a range if there are consecutive days
      if (startDay !== endDay) {
        event.month += ` ${startDay} - ${endDay}`;
      }

      transformedEvents.push({
        day: startDay,
        time: event.time,
        month: event.month,
        titile: event.titile,
        date: event.date,
      });
    }

    return transformedEvents;
  }
}

export interface CalendarEvent {
  day: number;
  time: string;
  month: string;
  titile: string;
  date: string;
}
