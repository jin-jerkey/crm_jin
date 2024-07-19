import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/_services/auth.service';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import { FileHandle } from './file-handle';
import { ImageServiceService } from 'src/app/_services/image-service.service';
import { SharedImageUrlService } from 'src/app/_services/shared-image-url.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: any = {
    firstname: null,
    lastname: null,
    phone: null,
    address: null,
    email: null,
    password: null,
    profilePicture:[]
  };
  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';

  allUsers: any;
  isLoggedIn: any;
  username: any;
  content: any;
  errormessage = ''
  roles: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  userData: any = [];
  selectedImage: any;
  userId!: number;
  selectedImagePreview: any;
  imageUrl!: string;
  constructor(private userService: UserService, 
    private storageService: StorageService, 
    private authService: AuthService, 
    private sharedDataService: SharedDataService,
    private sanitizer:DomSanitizer,
    private imageService:ImageServiceService,
    private imageUrlService: SharedImageUrlService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.userId = user.id;
    }
    
    this.getEmployeeById()
    this.imageUrlService.imageUrl$.subscribe(url => {
      this.imageUrl = url;
    });
  }
  openFileDialog() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*'; // Accept only image files
    inputElement.onchange = (event: any) => {
      this.onImageSelected(event);
    };
    inputElement.click();
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
    const fileHandle: FileHandle = {
      file: this.selectedImage,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(this.selectedImage)
      )
    }
    this.form.profilePicture=fileHandle;
  }
  
  getEmployeeById() {
    this.userService.getAdminBoard(this.userId).subscribe(
      (data: any) => {
        this.userData = this.form = data;
        console.log(this.userData);
  
        this.sharedDataService.setFirstName(this.userData.firstname);
  
        // Assuming your backend response has profilePicture with picByte as base64 string
        if (this.userData.profilePicture?.picByte) {
          this.selectedImagePreview = {
            picByte: this.userData.profilePicture.picByte,
            type: 'image/jpeg' // Adjust content type based on actual image type
          };
  
          const reader = new FileReader();
          reader.readAsDataURL(this.imageService.dataURItoBlob(this.selectedImagePreview.picByte, this.selectedImagePreview.type));
          reader.onloadend = () => {
            if (reader.result) {
              this.selectedImagePreview.url = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
              this.imageUrlService.setImageUrl(this.selectedImagePreview.url);            }
          };
        } else {
          // Handle case where profilePicture is missing or doesn't have picByte
          this.selectedImagePreview = null; // Or set a default placeholder image URL
        }
  
        console.log(this.selectedImagePreview?.url); // Check if url is set after conversion
      },
      (err: Error) => {
        this.errormessage = err.message;
        console.log("error");
      }
    );
  
  }

  onSubmit(): void {

    const { firstname, lastname, phone, address,profilePicture } = this.form;
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('phone', phone);
    formData.append('address', address);
    if(profilePicture){
    formData.append('profilePicture',profilePicture.file,profilePicture.file?.name);
    }
    console.log(formData);



    this.authService.updateUser(this.userId, formData).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isUpdateFailed = false;
        Swal.fire({
          title: 'profil mis à jour avec succès',
          icon: 'success',
          timer: 3000, // Time in milliseconds (2 seconds in this example)
          timerProgressBar: true, // Show timer progress bar
          showConfirmButton: false, // Hide the "OK" button
        });
        this.reloadPage()
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

  reloadPage(): void {
    window.location.reload();
  }
}
