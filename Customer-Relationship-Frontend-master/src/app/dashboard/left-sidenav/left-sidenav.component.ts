import { Component } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import { SharedImageUrlService } from 'src/app/_services/shared-image-url.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageServiceService } from 'src/app/_services/image-service.service';


@Component({
  selector: 'app-left-sidenav',
  templateUrl: './left-sidenav.component.html',
  styleUrls: ['./left-sidenav.component.css']
})
export class LeftSidenavComponent {


  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false; 
  showEmployeeBoard = false;
  showUserBoard: boolean=false;
  image:any;
  username!:string;
  userData:any=[];

  userId: any;
  imageUrl!: string;
  selectedImagePreview: any;
  errormessage!: string;
  
  
  constructor(  private storageService: StorageService,
     private authService:UserService,
     private imageUrlService: SharedImageUrlService,
     private sanitizer:DomSanitizer,
     private imageService:ImageServiceService,

     ){}
  // ngOnInit():void{
  //   if(this.isLoggedIn){
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
      this.showEmployeeBoard = this.roles.includes('ROLE_EMPLOYEE');
      this.showUserBoard = this.roles.includes('ROLE_USER');
  
      this.userId = user.id;
      
    }
  
    this.authService.getEmployeeById(this.userId).subscribe(
      (data:any)=>{
        this.userData =data;        
        this.username=this.userData?.firstname;
        
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

  },
  (err: Error) => {
    this.errormessage = err.message;
    console.log("error");
  })
}}
