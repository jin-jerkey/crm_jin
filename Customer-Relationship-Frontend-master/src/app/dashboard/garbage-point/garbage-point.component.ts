import { Component, OnInit } from '@angular/core';
import { GarbageServiceService } from '../services/garbage-service.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';

declare let L: { map: (arg0: string) => { (): any; new(): any; setView: { (arg0: number[], arg1: number): any; new(): any; }; }; tileLayer: (arg0: string, arg1: { attribution: string; }) => { (): any; new(): any; addTo: { (arg0: any): void; new(): any; }; }; marker: (arg0: any[]) => { (): any; new(): any; addTo: { (arg0: any): { (): any; new(): any; bindPopup: { (arg0: string): void; new(): any; }; }; new(): any; }; }; };

@Component({
  selector: 'app-garbage-point',
  templateUrl: './garbage-point.component.html',
  styleUrls: ['./garbage-point.component.css']
})
export class GarbagePointComponent implements OnInit{
  allGarbagePts: any;
  values = 0;
  name='';
  map: any;
  previousGarbagePts = null;
  roleAdmin=false;
  isLoggedIn: any;
  roles: any;
  showAdminBoard: any;
  constructor(private http: GarbageServiceService,private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.getAll();
    this.isLoggedIn = this.storageService.isLoggedIn();
  
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
  
      this.roleAdmin = this.roles.includes('ROLE_ADMIN');
      console.log(this.showAdminBoard);
      
    }
  }


  getAll() {
   
  
  }
  
  
 
  deleteProperty(id: number) {
    return this.http.deleteGarbagePoint(id).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: 'Garbage Point Deleted Successfully',
          icon: 'success',
          timer: 3000, // Time in milliseconds (2 seconds in this example)
          timerProgressBar: true, // Show timer progress bar
          showConfirmButton: false, // Hide the "OK" button
        });
        this.reloadPage();
      },
      error: () => {
        Swal.fire({
          title: 'Garbage Point Not Deleted',
          icon: 'error',
          timer: 2000, // Time in milliseconds (2 seconds in this example)
          timerProgressBar: true, // Show timer progress bar
          showConfirmButton: false, // Hide the "OK" button
        });
      },
    });
  }
  reloadPage(){
    window.location.reload();
  }
}
