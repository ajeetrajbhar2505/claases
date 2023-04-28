import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { WebService } from '../web.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage  {
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



  ngDoCheck(): void {
    // Check for changes to login status
    if (this.service.checkLoggedIn()) {
      this.showSidebar();
    } else {
      this.hideSidebar();
    }
  }

  private showSidebar(): void {
    // Show sidebar
    setTimeout(() => {
      this.splash_loaded = true
    }, 3000);

  }

  private hideSidebar(): void {
    // Hide sidebar
    setTimeout(() => {
      this.splash_loaded = false
    }, 3000);

  }


  routesTo(path:any)
  {
    this.router.navigate(['/tabs/' + path])
  }

}
