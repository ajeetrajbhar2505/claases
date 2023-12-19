import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { WebService } from '../web.service';
import { NavigationExtras } from '@angular/router';
const navigationExtras: NavigationExtras = {
  queryParams: { reload: 'true',from : '/tabs/home' },
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
      buttons: [
        {
          text: 'Upload Video',
          role: 'upload',
          data: {
            action: 'video',  
          },
        },
        {
          text: 'Upload Audio',
          role: 'upload',
          data: {
            action: 'audio',  
          },
        },
        {
          text: 'Upload Document',
          role: 'upload',
          data: {
            action: 'document',  
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
      const navigationExtras: NavigationExtras = {
        queryParams: { reload: 'true',from : '/tabs/home',content : result.data.action },
      };
      this.router.navigate(['/tabs/uploadVideo'],navigationExtras)
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
