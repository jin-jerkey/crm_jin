import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BlockHomeGuard implements CanActivate {
  constructor(private authService: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === '/home' || state.url==='/login' || state.url === '/register') {
      // Allow access to the home page only if the user is NOT authenticated
      if (!this.authService.isLoggedIn()) {
        return true; // Allow route activation
      } else {
        // If authenticated, redirect to the dashboard
        this.router.navigate(['/dashboard/home']); // Replace with your desired dashboard route
        return false; // Prevents route activation
      }
    }

    // For other routes, check if the user is authenticated
    if (this.authService.isLoggedIn()) {
      return true; // Allow route activation
    } else {
      // If not authenticated, redirect to the dashboard
      this.router.navigate(['/dashboard/home']); // Replace with your desired dashboard route
      return false; // Prevents route activation
    }
  }
}
