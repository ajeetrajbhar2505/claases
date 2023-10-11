import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent {
  currentDate: string = '';
  calendarDates: any[][] = [];
  currentMonth: number;
  currentMonthName: any;
  currentYear: number;
  transformedCalenderEvents: CalendarEvent[] = [];
  calenderEvents: CalendarEvent[] = [
    {
      day: 1,
      time: '14.00',
      month: 'Oct',
      titile: 'Biology Test',
      date: '01-11-2023',
    },
    {
      day: 5,
      time: '14.00',
      month: 'Oct',
      titile: 'English Test',
      date: '05-10-2023',
    },
    {
      day: 7,
      time: '14.00',
      month: 'Oct',
      titile: 'History Test',
      date: '07-10-2023',
    },
    {
      day: 25,
      time: '12.00',
      month: 'Oct',
      titile: 'Zoom Meeting',
      date: '25-10-2023',
    },
    {
      day: 26,
      time: '16.00',
      month: 'Oct',
      titile: 'Maths Test',
      date: '26-10-2023',
    },
    {
      day: 27,
      time: '10.00',
      month: 'Oct',
      titile: 'History Test',
      date: '27-10-2023',
    },
  ];

  constructor(public router: Router,public service:WebService) {
    this.currentMonth = new Date().getMonth();
    this.currentMonthName = new Date().toLocaleString('default', { month: 'long' });
    this.currentYear = new Date().getFullYear();
    this.generateCalendarDates(this.currentYear, this.currentMonth);
  }

  generateCalendarDates(year: number, month: number) {
    this.calendarDates = [];
  
    // Calculate the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Get the day of the week for the 1st day of the month (0: Sunday, 1: Monday, ..., 6: Saturday)
    const firstDayOfWeek = new Date(year, month, 1).getDay();
  
    // Calculate the number of days from the previous month to include
    const daysFromPreviousMonth = firstDayOfWeek;
  
    // Create an array containing days from the previous month
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
    // Chunk the array into rows
    this.calendarDates = this.chunkArray(daysArray, 7);
  
    // Set the current day
    this.currentDate = this.service.getCurrentDate();
  
    // Call the function to transform the array
    this.transformedCalenderEvents = this.transformCalendarEvents(this.calenderEvents);
  
    let count = 0; // Initialize count to 0
    const nextMonth = month + 1;
  
    this.calendarDates = this.calendarDates.map(row => {
      return row.map(date => {
        count++;
  
        const localday = date.toString().padStart(2, '0');
        const localmonth = (count > daysInMonth) ? (nextMonth).toString().padStart(2, '0') : (month + 1).toString().padStart(2, '0');
        const localyear = year;
        const formattedDate = `${localday}-${localmonth}-${localyear}`;
  
        return {
          day: date,
          date: formattedDate
        };
      });
    });
  }
  

  // Function to chunk an array into sub-arrays
  chunkArray(array: number[], size: number): number[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }


  checkDateExists(day:number,date:string):boolean{
    return this.calenderEvents.some(item => item.day === day && item.date === date);
  }

  checkSeriesDateExists(startDate: number, endDate: number,date:any): boolean {
    // Check if the series of consecutive dates exists in the `transformedCalenderEvents` array
    for (let day = startDate; day <= endDate; day++) {
      if (!this.calenderEvents.some(item => item.day === day && item.date === date)) {
        return false;
      }
    }
    return true;
  }

  isBetweenSeries(day: number,date:string): boolean {
    // Check if the current date falls in between a series
    return this.checkSeriesDateExists(day - 1, day + 1,date) && !this.checkSeriesDateExists(day - 2, day + 2,date);
  }

  isSeriesEnd(day: number,date:string): boolean {
    // Check if the current date ends a series
    return this.checkSeriesDateExists(day - 2, day,date);
  }

  checkLargestDayEndsAndNextDayStarts(endDate: number,date:string): boolean {
    // Check if the largest day in the series ends and the next day starts
    if (
      this.calenderEvents.some(item => item.day === endDate && item.date === date) &&
      !this.calenderEvents.some(item => item.day === endDate + 1 && item.date === date)
    ) {
      return true;
    }
    return false;
  }

  

  goToPreviousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.currentMonthName = new Date(this.currentYear, this.currentMonth, 1).toLocaleString('default', { month: 'long' });
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
    this.currentMonthName = new Date(this.currentYear, this.currentMonth, 1).toLocaleString('default', { month: 'long' });
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
