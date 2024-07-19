import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {

  users:any[]= [];
  constructor(private serv: ServiceService) { }
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    return this.serv.getUsers().subscribe({
      next:(data: any) => {
        this.users = data;
        console.log(this.users);
      }
  })
  }

}
