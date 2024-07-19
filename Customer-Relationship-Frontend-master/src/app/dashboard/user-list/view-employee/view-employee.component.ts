import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {
  id!: number;
  userData: any = [];


  constructor(
    private userService: UserService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    
    this.userService.getEmployeeById(this.id).subscribe(
      (data: any) => {
        this.userData = data;
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

}


