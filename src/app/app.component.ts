import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})//Hey
export class AppComponent {
  loading:any = true
   constructor(private router: Router) { 
    this.router.events.subscribe((routerEvent: any) => {
      this.checkRouterEvent(routerEvent);
   
  });
  }


    // Auto hide show loader
    checkRouterEvent(routerEvent: Event): void {
      if (routerEvent instanceof NavigationStart) {
          this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError) {
          this.loading = false;
      }
  }

}
