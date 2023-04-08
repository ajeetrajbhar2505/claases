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
        const contentElement = this.getContentElement();
        if (contentElement) {
          contentElement.pause();
        }
        const liveContentElement = this.getliveContentElement();
        if (liveContentElement) {
          if (routerEvent.url !== '/tabs/live') {
            liveContentElement.muted = true;
          }
          if (routerEvent.url == '/tabs/live') {
            liveContentElement.muted = false;
          }
        }
        
      
      } else if (routerEvent instanceof NavigationError) {
        this.router.navigate(['/tabs/home']);
        // handle NavigationError here
      }
    }
    

}
