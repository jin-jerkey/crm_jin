import { Component, ElementRef, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent {
  userData: any = [];
  allUsers: any = [];
  user_id!: number;
  errormessage!: string;
  username: any;


  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;

  data: any;
  displayedColumns: string[] = [ 'firstname', 'lastname', 'email', 'phone', 'address', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id: any;
  snapshot: any;
  roles: any;
  showAdminBoard: any;

  ngOnInit(): void {
    const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      if(this.showAdminBoard){
        this.getAllUsersForAdmin();
        console.log(this.showAdminBoard);
        
      }




  }

  constructor(private router: ActivatedRoute, private userService: UserService, private storageService: StorageService) { }



  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.allUsers = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.allUsers);
      }
    ),
      (err: Error) => {
        this.errormessage = err.message;
        console.log("error");
      }
  }
  getAllUsersForAdmin() {
    this.userService.getAllEmployees().subscribe(
      (data: any) => {
        this.allUsers = data.filter((user: { roles: { name: string; }[]; }) => user.roles[0].name === 'ROLE_ADMIN');        
        this.dataSource = new MatTableDataSource(this.allUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        console.log(this.allUsers);
      },
      (err: Error) => {
        this.errormessage = err.message;
        console.log("error");
      }
    );
  }
  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProperty(id: number) {
    return this.userService.deleteEmployee(id).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: 'User Deleted Successfully',
          icon: 'success',
          timer: 3000, // Time in milliseconds (2 seconds in this example)
          timerProgressBar: true, // Show timer progress bar
          showConfirmButton: false, // Hide the "OK" button
        });
        this.reloadPage();
      },
      error: () => {
        Swal.fire({
          title: 'User Not Deleted',
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