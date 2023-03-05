import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'class',
        loadChildren: () => import('../class/class.module').then(m => m.ClassModule)
      },
      {
        path: 'lectures',
        loadChildren: () => import('../lectures/lectures.module').then(m => m.LecturesModule)
      },
      {
        path: 'contents',
        loadChildren: () => import('../contents/contents.module').then(m => m.ContentsModule)
      },
      {
        path: 'live',
        loadChildren: () => import('../live/live.module').then(m => m.LiveModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'uploadVideo',
        loadChildren: () => import('../upload-video/upload-video.module').then(m => m.UploadVideoModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'splash',
        loadChildren: () => import('../splash/splash.module').then(m => m.SplashModule)
      },

      {
        path: '',
        redirectTo: '/tabs/splash',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/splash',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
