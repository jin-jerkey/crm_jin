import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

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
    this.router.navigate(['/home']);
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.reload();
  }
}
