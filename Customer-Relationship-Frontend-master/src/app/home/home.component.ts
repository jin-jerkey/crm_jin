// home.component.ts

import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {


  constructor(private userAuthService:StorageService,
    private router:Router,
    public userService:UserService) { }

  ngOnInit(): void {
    
  }
  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }
  public logout(){
    this.userAuthService.signOut();
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.reload();
  }
}
