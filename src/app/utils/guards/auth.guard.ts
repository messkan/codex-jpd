import { Injectable } from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {Router} from '@angular/router';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(private authorizationService: AuthorizationService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
        
      const allowedRole = next.data.allowedRole;
      const isAuthorized = this.authorizationService.isAuthorized(allowedRole);

      if (!isAuthorized) {

        this.router.navigate(['/accessdenied']);
      }
      
      return isAuthorized;

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
     
      const allowedRole = next.data.allowedRole;
      const isAuthorized = this.authorizationService.isAuthorized(allowedRole);

      if (!isAuthorized) {

        this.router.navigate(['/accessdenied']);
      }
      
    return isAuthorized;
  
  }
}
