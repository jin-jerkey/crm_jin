import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService:StorageService, private route:Router){}
  canActivateChild():boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      
      this.route.navigate(['/home']);
      return false;
    }
  }
  
}
