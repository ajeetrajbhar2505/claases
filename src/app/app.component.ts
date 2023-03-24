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

  private getContentElement(): HTMLVideoElement | null {
    return document.querySelector<HTMLVideoElement>('#classContent');
  }
  private getliveContentElement(): HTMLVideoElement | null {
    return document.querySelector<HTMLVideoElement>('#liveVideo');
  }

    // Auto hide show loader


    
    checkRouterEvent(routerEvent: any): void {
      if (routerEvent instanceof NavigationStart) {
        if (this.getContentElement()) {
          this.getContentElement()?.pause()
        }
        if (routerEvent.url !== '/tabs/live' && this.getliveContentElement()) {
          this.getliveContentElement()?.pause()
        }
      }

      if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError) {
      }
  }

}
