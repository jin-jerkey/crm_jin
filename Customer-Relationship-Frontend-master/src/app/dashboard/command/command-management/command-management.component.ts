import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import { CommandService } from 'src/app/_services/command.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-command-management',
  templateUrl: './command-management.component.html',
  styleUrls: ['./command-management.component.css']
})
export class CommandManagementComponent {
//   command: Command = {
//     // products: []
//   };

//   form: Product = {
//     name: '',
//     description: '',
//     quantity: 0,
//     price: 0
//   };
//   isSuccessful = false;
//   isUpdateFailed = false;
//   errorMessage = '';
//   action = 'Add';
//   allUsers: any;
//   isLoggedIn: any;
//   username: any;
//   content: any;
//   errormessage = ''
//   roles: any;
//   showAdminBoard: any;
//   showModeratorBoard: any;
//   userData: any = [];
//   userId!: number;
//   constructor(private userService: UserService,
//     private storageService: StorageService,
//    private route:Router

//   ) { }
//   profileImage: string = 'assets/img/user4-128x128.jpg'; // Default image


//   ngOnInit(): void {
//     this.isLoggedIn = this.storageService.isLoggedIn();
//     if (this.isLoggedIn) {
//       const user = this.storageService.getUser();
//       this.roles = user.roles;
//       this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
//       this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
//       this.username = user.username;
//       this.userId = user.id;
//     }
//   }

  


//   onSubmit() {
//     console.log(this.command);


//     this.userService.saveCommandWithProducts(this.userId, this.command).subscribe({
//       next: (data: any) => {
//         console.log(data);
//         this.isSuccessful = true;
//         this.isUpdateFailed = false;
//         Swal.fire({
//           title: 'Command Added Successfully',
//           icon: 'success',
//           timer: 3000, // Time in milliseconds (2 seconds in this example)
//           timerProgressBar: true, // Show timer progress bar
//           showConfirmButton: false, // Hide the "OK" button
//         });
//         this.route.navigate(['/dashboard/command'])
//       },
//       error: (err: any) => {
        
//         Swal.fire({
//           title: err.error.message,
//           icon: 'error',
//           timer: 2000, // Time in milliseconds (2 seconds in this example)
//           timerProgressBar: true, // Show timer progress bar
//           showConfirmButton: false, // Hide the "OK" button
//         });
//       },
//     });
//   }

//   addProduct() {
//     if (this.validateProduct(this.form)) {
//       this.command.products.push({ ...this.form });
//       this.resetProductForm();
//     }
//   }

//   private validateProduct(product: Product): boolean {
//     return product.name.trim() !== '' && product.description.trim() !== '' && product.quantity > 0 && product.price > 0;
//   }

//   private resetProductForm() {
//     this.form = {
//       name: '',
//       description: '',
//       quantity: 0,
//       price: 0
//     };
//   }
// }
}