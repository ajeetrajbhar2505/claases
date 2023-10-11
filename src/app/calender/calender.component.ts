import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent {
  currentDay: number = 1;
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
      date: this.service.getCurrentDate(),
    },
    {
      day: 5,
      time: '14.00',
      month: 'Oct',
      titile: 'English Test',
      date: this.service.getCurrentDate(),
    },
    {
      day: 7,
      time: '14.00',
      month: 'Oct',
      titile: 'History Test',
      date: this.service.getCurrentDate(),
    },
    {
      day: 25,
      time: '12.00',
      month: 'Oct',
      titile: 'Zoom Meeting',
      date: this.service.getCurrentDate(),
    },
    {
      day: 26,
      time: '16.00',
      month: 'Oct',
      titile: 'Maths Test',
      date: this.service.getCurrentDate(),
    },
    {
      day: 27,
      time: '10.00',
      month: 'Oct',
      titile: 'History Test',
      date: this.service.getCurrentDate(),
    },
  ];

  constructor(public router: Router,public service:WebService) {
    this.currentMonth = new Date().getMonth();
    this.currentMonthName = new Date().toLocaleString('default', { month: 'long' });
    this.currentYear = new Date().getFullYear();
    this.generateCalendarDates(this.currentYear, this.currentMonth);
  }

  generateCalendarDates(year: number, month: number) {
    // Calculate the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Get the day of the week for the 1st day of the month (0: Sunday, 1: Monday, ..., 6: Saturday)
    const firstDayOfWeek = new Date(year, month, 1).getDay();
  
    // Calculate the number of days from the previous month to include
    const daysFromPreviousMonth = firstDayOfWeek;
  
    // Calculate the number of days from the next month to include
    const totalDays = daysInMonth + daysFromPreviousMonth;
    console.log(totalDays);
    
    const daysFromNextMonth = Math.ceil(totalDays / 7) * 7 - totalDays;
  
    // Create an array containing days from the previous month
    const daysArray = [
      ...Array.from({ length: daysFromPreviousMonth }, (_, i) => daysInMonth - daysFromPreviousMonth + i + 1),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
      ...Array.from({ length: daysFromNextMonth }, (_, i) => i + 1),
    ];
  
    // Chunk the array into rows
    this.calendarDates = this.chunkArray(daysArray, 7);
    
  
    // Set the current day
    this.currentDay = new Date().getDate();
  
    
    // Call the function to transform the array
    this.transformedCalenderEvents = this.transformCalendarEvents(this.calenderEvents);
    let count = 1; // Initialize count outside the map function
    this.calendarDates = this.calendarDates.map(row => {
      return row.map(date => {
        const dateObj = new Date(year, month, date);
        const localday = dateObj.getDate().toString().padStart(2, '0');
        
        if (totalDays === date) {
          count++;
        }
        
        const localmonth = (totalDays === date)?(dateObj.getMonth() + 1).toString().padStart(2, '0'):(dateObj.getMonth() + count).toString().padStart(2, '0');
        const localyear = dateObj.getFullYear();
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


  checkDateExists(date:number):boolean{
    return this.calenderEvents.some(item => item.day === date);
  }

  checkCurrentMonthExists(date:number):boolean{
    return true
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

  checkLargestDayEndsAndNextDayStarts(endDate: number): boolean {
    // Check if the largest day in the series ends and the next day starts
    if (
      this.calenderEvents.some(item => item.day === endDate) &&
      !this.calenderEvents.some(item => item.day === endDate + 1)
    ) {
      return true;
    }
    return false;
  }


  isPreviousValueGreater(prev: number, current: number): boolean {
    return prev > current;
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
