import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import { FileHandle } from '../../profile/file-handle';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {

    form: any = {
      firstname: null,
      lastname: null,
      phone: null,
      address: null,
      email: null,
      password: null,
      profile:null
    };
    isSuccessful = false;
    isUpdateFailed = false;
    errorMessage = '';
  
    allUsers:any;
    isLoggedIn: any;
    username: any;
    content: any;
    errormessage = ''
    roles: any;
    selectedImage: File | null = null; 
    showAdminBoard: any;
    showModeratorBoard: any;
   userData:any = [];
   userId!:number;
   selectedImagePreview: any;
   selectedFile: any;
    constructor(private userService: UserService, 
      private storageService: StorageService, 
      private authService:AuthService,
      private route:Router,
      private sanitizer:DomSanitizer,
      private router: ActivatedRoute
  
    ) { }  
    
  
    ngOnInit(): void {
      this.userId = this.router.snapshot.params['id'];
      this.isLoggedIn = this.storageService.isLoggedIn();
      if (this.isLoggedIn) {
      
      }
      this.getEmployeeById()
    }
  
    getEmployeeById(){
    this.userService.getAdminBoard(this.userId).subscribe(
      (data:any)=>{
        this.userData=this.form = data;
        
        console.log(this.userData);
        
      }
    ),
    (err:Error)=>{
      this.errormessage=err.message;
      console.log("error");
      
      }
    }
  
    // openFileDialog() {
    //   const inputElement = document.createElement('input');
    //   inputElement.type = 'file';
    //   inputElement.accept = 'image/*'; // Accept only image files
    //   inputElement.onchange = (event: any) => {
    //     this.onImageSelected(event);
    //   };
    //   inputElement.click();
    // }
  
    // onImageSelected(event: any) {
    //   this.selectedImage = event.target.files[0];
    //   if (this.selectedImage) {
    //     const reader = new FileReader();
    //     reader.onload = (e: any) => {
    //       this.selectedImagePreview = e.target.result;
    //     };
    //     reader.readAsDataURL(this.selectedImage);
    //   }
    // }
    onFileSelectedEvent(event: any) {
      if (event.target.files) {
        this.selectedFile = event.target.files[0];
  
        if (this.selectedFile) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.selectedImagePreview = e.target.result;
          };
          reader.readAsDataURL(this.selectedFile);
        }
      }
      
    }
     onSubmit(): void {
      const {firstname,lastname,phone,address,profile}=this.form;
      console.log(firstname);
      const formData = new FormData();
      formData.append('firstname', firstname); 
      formData.append('lastname', lastname); 
      formData.append('address', address); 
      formData.append('phone', phone); 
      if (this.selectedFile) {
        formData.append('profilePicture', profile, this.selectedFile?.name); // Append selected image
      }

      this.authService.updateUser(this.userId, formData).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;

          this.isUpdateFailed = false;
                  Swal.fire({
            title: 'Client mis à jour avec succès',
            icon: 'success',
            timer: 3000, // Time in milliseconds (2 seconds in this example)
            timerProgressBar: true, // Show timer progress bar
            showConfirmButton: false, // Hide the "OK" button
          });
          this.route.navigate(['/dashboard/client'])

        },
        error: err => {
          // this.errorMessage = err.error.message;
          // this.isUpdateFailed = true;
          Swal.fire({
            title: this.errorMessage,
            icon: 'error',
            timer: 2000, // Time in milliseconds (2 seconds in this example)
            timerProgressBar: true, // Show timer progress bar
            showConfirmButton: false, // Hide the "OK" button
          });
        },
      });
    }
        
    
  }
  