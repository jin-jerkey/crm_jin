import { Component } from '@angular/core';
import { Garbagept } from '../../classes/garbagept';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import { GarbageServiceService } from '../../services/garbage-service.service';

@Component({
  selector: 'app-garbage-management',
  templateUrl: './garbage-management.component.html',
  styleUrls: ['./garbage-management.component.css']
})
export class GarbageManagementComponent {
  actionBtn="save";
  garbagept: Garbagept = {
    name: '',
    town: '',
    lat: '',
    lon: '',
  }
  id!: number;
  read: boolean=false;
  allGarbagePts: any;
  
  constructor( private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private formbuilder: FormBuilder, private http: GarbageServiceService) { }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.read = true;
      this.actionBtn = "Update";
      this.http.getGarbagePoints(this.id).subscribe(
        (data: any) => {
          this.garbagept = data;
    
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
  }
    updateUser(){
      console.log(this.garbagept);
      this.http.updategarbagept(this.id,this.garbagept).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: 'Garbage Point Updated Successfully',
            icon: 'success',
            timer: 3000, // Time in milliseconds (2 seconds in this example)
            timerProgressBar: true, // Show timer progress bar
            showConfirmButton: false, // Hide the "OK" button
          });
        },
        error: () => {
          Swal.fire({
            title: 'Garbage Point Failed to update',
            icon: 'error',
            timer: 2000, // Time in milliseconds (2 seconds in this example)
            timerProgressBar: true, // Show timer progress bar
            showConfirmButton: false, // Hide the "OK" button
          });
        },
      });
    }

    
    
      saveUser() {
    
    
        if (this.actionBtn == "Update") {
            this.updateUser();
        } else {
    
       
    
          this.http.postAll(this.garbagept).subscribe({
            next: (res: any) => {
              console.log(res);
              Swal.fire({
                title: 'Garbage Point Added Successfully',
                icon: 'success',
                timer: 3000, // Time in milliseconds (2 seconds in this example)
                timerProgressBar: true, // Show timer progress bar
                showConfirmButton: false, // Hide the "OK" button
              });
            },
            error: () => {
              Swal.fire({
                title: 'Garbage Point not added',
                icon: 'error',
                timer: 2000, // Time in milliseconds (2 seconds in this example)
                timerProgressBar: true, // Show timer progress bar
                showConfirmButton: false, // Hide the "OK" button
              });
            },
          });
        }
      }
  
    }
  