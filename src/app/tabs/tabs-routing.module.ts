import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginGuard } from '../login.guard';

const routes: Routes = [
  {
    path : 'login',
    loadChildren : () => import('../login/login.module').then(m => m.LoginModule)
  },
  {
    path : 'register',
    loadChildren : () => import('../register/register.module').then(m => m.RegisterModule)
  },
  {
    path : 'sucessfull/:userId/:token',
    loadChildren : () => import('../sucessful-page/sucessful-page.module').then(m => m.SucessfulPageModule)
  },
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'calender',
        loadChildren: () => import('../calender/calender.module').then(m => m.CalenderModule)
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
        path: 'content-controls',
        loadChildren: () => import('../content-controls/content-controls.module').then(m => m.ContentControlsModule)
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
        path : 'test',
        loadChildren : () => import('../test/test.module').then(m => m.TestModule)
      },
      {
        path : 'quiz',
        loadChildren : () => import('../quiz/quiz.module').then(m => m.QuizModule)
      },
      {
        path : 'popular-quiz',
        loadChildren : () => import('../popular/quiz/quiz.module').then(m => m.QuizModule)
      },
      {
        path : 'popular-lectures',
        loadChildren : () => import('../popular/course/course.module').then(m => m.CourseModule)
      },
      {
        path : 'achievements',
        loadChildren : () => import('../achievements/achievements.module').then(m => m.AchievementsModule)
      },
      {
        path : 'features',
        loadChildren : () => import('../features/features.module').then(m => m.FeaturesModule)
      }
      ,
      {
        path : 'privacy-policy',
        loadChildren : () => import('../privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
