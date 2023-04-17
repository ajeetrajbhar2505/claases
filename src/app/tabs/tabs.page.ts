import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { WebService } from '../web.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  result:string = ""
  splash_loaded = false
  constructor(private actionSheetCtrl: ActionSheetController,public router:Router,public service:WebService) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Create +',
      // subHeader: 'Example subheader',
      buttons: [
        {
          text: 'Upload a video',
          role: 'upload',
          data: {
            action: 'upload',  
          },
        },
        {
          text: 'Go live',
          role: 'live',
          data: {
            action: 'live',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if (result.role == 'upload') {
      this.router.navigate(['/tabs/uploadVideo'])
    }
    else if (result.role == 'live') {
      this.router.navigate(['/tabs/live'])
    }
       

    
  }

  ngOnInit(): void {
// Set initial state of sidebar
if (this.service.getToken()) {
  this.showSidebar();
} else {
  this.hideSidebar();
}
  }

  ngDoCheck(): void {
    // Check for changes to login status
    if (this.service.getToken()) {
      this.showSidebar();
    } else {
      this.hideSidebar();
    }
  }

  private showSidebar(): void {
    // Show sidebar
    this.splash_loaded = true

  }

  private hideSidebar(): void {
    // Hide sidebar
    this.splash_loaded = false

  }


  routesTo(path:any)
  {
    this.router.navigate(['/tabs/' + path])
  }

}
