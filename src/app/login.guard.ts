import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public service:WebService,public router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.IsLogged();
  }

  IsLogged(): boolean {
    if (this.service.checkLoggedIn()) {
      return true;
    } else {
      // Clear cache and redirect to login page
      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
      });
      return false;
    }
  }
  
}
