import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  countAdmin: number = 0;
  countEmployee: number = 0;
  userData: any = [];
  gpts: any;
  gbl: any;
  countClient: any;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showEmployeeBoard = false;
  showUserBoard: boolean = false;

  tasks: any;
  taskNumber: any;
  taskCompleted: any;
  taskNotStarted: any;
  taskInProgress: any;
  userId!: number;
  commandsData: any;
  errormessage!: string;
  commandsPending: number = 0;
  commandsCompleted: number = 0;
  commandsTotal: number = 0;
  ngOnInit(): void {
    this.getEmployeeById();

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showEmployeeBoard = this.roles.includes('ROLE_EMPLOYEE');
      this.showUserBoard = this.roles.includes('ROLE_USER');

    }
    this.getAllUsers();
  }
  constructor(private userService: UserService, private storageService: StorageService) { }
  getEmployeeById() {
    this.userId = this.storageService.getUser().id;    
    this.userService.getAdminBoard(this.userId).subscribe(
      (data: any) => {
        this.userData = data;
        this.commandsData = data.commands;
        this.commandsPending = this.commandsData.filter((d:any)=>d.status==='PENDING').length;
        this.commandsCompleted = this.commandsData.filter((d:any)=>d.status==='COMPLETED').length;
        this.commandsTotal = this.commandsData.length;
        console.log(this.userData);
        
      }
    ),
      (err: Error) => {
        this.errormessage = err.message;
        console.log("error");

      }
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.userData = data;
        // Initialize counters for admins and users
        let countAdmin = 0;
        let countUser = 0;
        let countEmployee = 0;

        this.userData.forEach((element: any) => {
          if (element.roles[0].name === 'ROLE_ADMIN') {
            countAdmin++;
          } else if (element.roles[0].name === 'ROLE_EMPLOYEE') {
            countEmployee++;
          }
          else {
            countUser++;
          }
        });

        this.countAdmin = countAdmin;
        this.countEmployee = countEmployee;
        this.countClient = countUser;
      },
      (err: Error) => {
        console.log(err.message);
      }
    );
  }
  receiveData(data: string) {
    this.tasks = data;
    this.taskNumber = this.tasks.length;
    this.taskCompleted = this.tasks.filter((d: any) => d.status === 'COMPLETED').length;
    this.taskNotStarted = this.tasks.filter((d: any) => d.status === 'NOT_STARTED').length;
    this.taskInProgress = this.tasks.filter((d: any) => d.status === 'IN_PROGRESS').length;
  }
}  