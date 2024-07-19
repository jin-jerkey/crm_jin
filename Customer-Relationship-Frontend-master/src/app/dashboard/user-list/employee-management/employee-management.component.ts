import { Component, Inject, OnInit } from '@angular/core';
import { UserClass } from '../../classes/user-class';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../../profile/file-handle';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit{
  price: number = 0;
  role = ['ROLE_ADMIN','ROLE_USER','ROLE_EMPLOYEE'];
  actionBtn: string = "Sauvegarder";
  users: UserClass = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    roles: [],
    phone: '',
    address: ''
  }
  id!: number;
  read: boolean=false;
  
  constructor( private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private formbuilder: FormBuilder, private http: UserService) { }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.read = true;
      this.actionBtn = "Update";
      this.http.getEmployeeById(this.id).subscribe(
        (data: any) => {
          this.users = data;
          this.users.roles = data.roles[0].name;
          console.log(this.users);

        },
        (error: any) => {
          console.log(error);
        }
      )
    }
  }
    updateUser(){
      console.log(this.users);
      this.http.updateEmployee(this.id,this.users).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: 'Employee updated Successfully',
            icon: 'success',
            text: 'The user has been updated successfully!',
            timer: 3000, // Time in milliseconds (2 seconds in this example)
            timerProgressBar: true, // Show timer progress bar
            showConfirmButton: false, // Hide the "OK" button
          });
        },
        error: () => {
          Swal.fire({
            title: 'Failed to update User',
            icon: 'error',
            timer: 2000, // Time in milliseconds (2 seconds in this example)
            timerProgressBar: true, // Show timer progress bar
            showConfirmButton: false, // Hide the "OK" button
          });
        },
      });
    }

    
    
      saveUser() {
        if (typeof this.users.roles === 'string') {
          this.users.roles = [this.users.roles];
        }
    
        if (this.actionBtn == "Update") {
            this.updateUser();
        } else {
    
       
    console.log(this.users);
    
          this.http.postAll(this.users).subscribe({
            next: (res: any) => {
              console.log(this.users);
              Swal.fire({
                title: 'User Added Successfully',
                icon: 'success',
                timer: 3000, // Time in milliseconds (2 seconds in this example)
                timerProgressBar: true, // Show timer progress bar
                showConfirmButton: false, // Hide the "OK" button
              });
            },
            error: () => {
              Swal.fire({
                title: 'User data not added',
                icon: 'error',
                text: 'The new user data was not added!',
                timer: 2000, // Time in milliseconds (2 seconds in this example)
                timerProgressBar: true, // Show timer progress bar
                showConfirmButton: false, // Hide the "OK" button
              });
            },
          });
        }
      }
  
  }