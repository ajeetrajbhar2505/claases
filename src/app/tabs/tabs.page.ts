import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { WebService } from '../web.service';
import { NavigationExtras } from '@angular/router';

const navigationExtras: NavigationExtras = {
  queryParams: { reload: 'true' }, // Add the "reload" query parameter
};
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
      this.router.navigate(['/tabs/uploadVideo'],navigationExtras)
    }
    else if (result.role == 'live') {
      this.router.navigate(['/tabs/live'],navigationExtras)
    }
       
  }


  async presentActionSheetMore() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'More tabs',
      // subHeader: 'Example subheader',
      buttons: [
        {
          text: 'Chat',
          role: 'chat',
          data: {
            action: 'Chat',  
          },
        },
        {
          text: 'Calender',
          role: 'calender',
          data: {
            action: 'Calender',
          },
        },
        {
          text: 'Score card',
          role: 'scorecard',
          data: {
            action: 'achievements',
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
    if (result.role == 'chat') {
      this.router.navigate(['/tabs/search'],navigationExtras)
    }
    else if (result.role == 'calender') {
      this.router.navigate(['/tabs/calender'],navigationExtras)
    }
    else if (result.role == 'scorecard') {
      this.router.navigate(['/tabs/achievements'],navigationExtras)
    }
       
  }

  ngDoCheck(): void {
    // Check for changes to login status
    if (localStorage.getItem('token')) {
      this.splash_loaded = true
    } else {
      this.splash_loaded = false
    }
  }



  routesTo(path:any)
  {
    this.router.navigate(['/tabs/' + path],navigationExtras)
  }

}
