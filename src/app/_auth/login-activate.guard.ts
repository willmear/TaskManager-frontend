import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../entities/user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate {

  constructor(protected userService: UserService, protected router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return true;
  }
  
}
