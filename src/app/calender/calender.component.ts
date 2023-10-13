import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  currentDate: string = '';
  calendarDates: any[][] = [];
  currentMonth: number;
  currentMonthName: any;
  currentYear: number;
  transformedCalenderEvents: CalendarEvent[] = [];
  calenderEvents: CalendarEvent[] = [];
  spinner: boolean = false;
  

  constructor(public router: Router, public service: WebService) {
    this._unsubscribeAll = new Subject();
    this.currentMonth = new Date().getMonth();
    this.currentMonthName = new Date().toLocaleString('default', {
      month: 'long',
    });
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.generateCalendarDates(this.currentYear, this.currentMonth);
  }

  generateCalendarDates(year: number, month: number) {
    const desiredMonth = new Date(2023, month, 1).toLocaleString('default', {
      month: 'short',
    });
    this.getMonthWiseCalenderDetails(desiredMonth);
    this.calendarDates = [];
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let currentWeek = [];
    let day = 1;

    // Add day names as the first row

    // Add empty slots for days from the previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push('');
    }

    while (day <= daysInMonth) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        this.calendarDates.push([...currentWeek]);
        currentWeek = [];
      }
      day++;
    }

    // Add empty slots for days from the next month
    while (currentWeek.length < 7) {
      currentWeek.push('');
    }

    if (currentWeek.length === 7) {
      this.calendarDates.push([...currentWeek]);
    }

    // Your date transformation logic here
    let count = 0; // Initialize count to 0
    const nextMonth = month + 1;

    this.calendarDates = this.calendarDates.map((row) => {
      return row.map((date) => {
        count++;

        const localday = date.toString().padStart(2, '0');
        const localmonth =
          count > daysInMonth
            ? nextMonth.toString().padStart(2, '0')
            : (month + 1).toString().padStart(2, '0');
        const localyear = year;
        const formattedDate = `${localday}-${localmonth}-${localyear}`;

        return {
          day: date,
          date: formattedDate,
        };
      });
    });
  }

  async getMonthWiseCalenderDetails(desiredMonth: string) {
    this.spinner = true
    this.calenderEvents = [];
    this.transformedCalenderEvents = [];

    const req = new Requestmodels();
    req.RequestUrl = `CalenderDetails/${desiredMonth}`;
    req.RequestObject = '';

    await this.service
      .fetchData(req)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }

            // fetch
            this.spinner = false
            this.calenderEvents = data.response || [];
            // Call the function to transform the array
            this.transformedCalenderEvents = [];
            this.transformedCalenderEvents = this.transformCalendarEvents(
              this.calenderEvents
            );
          }
        },
        (_error) => {
          return;
        },
        () => {}
      );
  }

  // Function to chunk an array into sub-arrays
  chunkArray(array: number[], size: number): number[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  checkDateExists(day: number, date: string): boolean {
    return this.calenderEvents.some(
      (item) => item.day === day && item.date === date
    );
  }

  checkSeriesDateExists(
    startDate: number,
    endDate: number,
    date: any
  ): boolean {
    // Check if the series of consecutive dates exists in the `transformedCalenderEvents` array
    for (let day = startDate; day <= endDate; day++) {
      if (
        !this.calenderEvents.some(
          (item) => item.day === day && item.date === date
        )
      ) {
        return false;
      }
    }
    return true;
  }

  isBetweenSeries(day: number, date: string): boolean {
    // Check if the current date falls in between a series
    return (
      this.checkSeriesDateExists(day - 1, day + 1, date) &&
      !this.checkSeriesDateExists(day - 2, day + 2, date)
    );
  }

  isSeriesEnd(day: number, date: string): boolean {
    // Check if the current date ends a series
    return this.checkSeriesDateExists(day - 2, day, date);
  }

  checkLargestDayEndsAndNextDayStarts(endDate: number, date: string): boolean {
    // Check if the largest day in the series ends and the next day starts
    if (
      this.calenderEvents.some(
        (item) => item.day === endDate && item.date === date
      ) &&
      !this.calenderEvents.some(
        (item) => item.day === endDate + 1 && item.date === date
      )
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
    this.currentMonthName = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).toLocaleString('default', { month: 'long' });
    this.generateCalendarDates(this.currentYear, this.currentMonth);
  }

  backToHome() {
    this.router.navigate(['/tabs/home']);
  }

  routeToEvents(){
    this.router.navigate(['/tabs/Events']);

  }

  goToNextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.currentMonthName = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).toLocaleString('default', { month: 'long' });
    this.generateCalendarDates(this.currentYear, this.currentMonth);
  }

  // Function to transform the array
  transformCalendarEvents(events: CalendarEvent[]): CalendarEvent[] {
    const transformedEvents: CalendarEvent[] = [];
  
    let i = 0;
  
    while (i < events.length) {
      const event = events[i];
  
      // Check if there are consecutive days with the same event name
      let startDay = event.day;
      let endDay = event.day;
      const startMonth = event.month; // Store the start month
      const eventName = event.title; // Store the event name
  
      while (i + 1 < events.length && events[i + 1].day === endDay + 1 && events[i + 1].title === eventName) {
        endDay = events[i + 1].day;
        i++;
      }
  
      event.month = `${startMonth} ${startDay}`

      // Create a range if there are consecutive days
      if (startDay !== endDay) {
        event.month = `${startMonth} ${startDay} - ${startMonth} ${endDay}`;
      }
  
      transformedEvents.push({
        day: startDay,
        time: event.time,
        month: event.month,
        title: eventName, // Use the stored event name
        date: event.date,
      });
  
      i++; // Move to the next event
    }
  
    return transformedEvents;
  }
  
  


}

export interface CalendarEvent {
  day: number;
  time: string;
  month: string;
  title: string;
  date: string;
}
