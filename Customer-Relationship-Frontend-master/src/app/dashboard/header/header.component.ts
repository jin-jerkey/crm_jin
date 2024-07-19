import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

// private roles!:string[];
// isLoggedIn = false;
// showAdminBoard = false;
// username!:string;

private roles: string[] = [];
isLoggedIn = false;
showAdminBoard = false; 
showModeratorBoard = false;
username?: string;

eventBusSub?: Subscription;

constructor(private route:Router, private eventBusService: EventBusService,  private storageService: StorageService){}

//     this.showAdminBoard = this.roles.includes('ADMIN');
//   }
// }
// RegisterPage(){
// this.route.navigate(['authentication/register']);
// }
// loginPage(){
//   this.route.navigate(['authentication/login']);
// }





ngOnInit(): void {
  this.isLoggedIn = this.storageService.isLoggedIn();

  if (this.isLoggedIn) {
    const user = this.storageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    this.username = user.username;
  }

  this.eventBusSub = this.eventBusService.on('logout', () => {
    this.logout();
  });
}

logout(): void {
  this.storageService.signOut();
}
}
