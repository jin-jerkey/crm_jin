import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  allUsers: any=[];
  errormessage!: string;
  joinedYearNumber:any=[];
  ClientCount!: number;
  EmployeeCount!: number;
  AdminCount!: number;
  AllUsersData: any;


  constructor( private userService: UserService) { }
  ngOnInit(): void {
 this.getAllUsersWithAllCommands();
 this.AllUsers()
  }


  getAllUsersWithAllCommands() {
    this.userService.getAllCommands().subscribe(
      (data: any) => {
        this.allUsers = data;
        console.log(this.allUsers);
        
        this.joinedYearNumber = this.groupClientsByJoinedYear(this.allUsers);
        console.log(this.joinedYearNumber);
        
        }
      // }
    ),
      (err: Error) => {
        this.errormessage = err.message;
        console.log("error");
      }
  }
  
  private groupClientsByJoinedYear(clients: any[]): any[] {
    const groupedData: any[] = [];
    const JoinedYearMap = new Map<string, number>();

    // Loop through clients and group by hire year
    clients.forEach((client) => {
      const joinedDate = new Date(client.joinedDate);
      const joinedYear = joinedDate.getFullYear().toString();

      if (JoinedYearMap.has(joinedYear)) {
        JoinedYearMap.set(joinedYear, JoinedYearMap.get(joinedYear)! + 1);
      } else {
        JoinedYearMap.set(joinedYear, 1);
      }
    });

    // Convert map to an array of objects
    JoinedYearMap.forEach((count, year) => {
      groupedData.push({ year, clientCount: count });
    });

    return groupedData;
  }

 AllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.AllUsersData = data;
        console.log(this.AllUsersData);
  
        this.AdminCount = this.countUsersByRole(this.AllUsersData, 'ROLE_ADMIN');
        this.EmployeeCount = this.countUsersByRole(this.AllUsersData, 'ROLE_EMPLOYEE');
        this.ClientCount = this.countUsersByRole(this.AllUsersData, 'ROLE_USER');
  
        console.log("Admin Count: ", this.AdminCount);
        console.log("Employee Count: ", this.EmployeeCount);
        console.log("Client Count: ", this.ClientCount);
      },
      (err: Error) => {
        console.log(err.message);
      }
    );
  }
  
  countUsersByRole(users: any[], role: string): number {
    return users.reduce((count, user) => {
      const userRoles = user.roles.map((r: any) => r.name);
      if (userRoles.includes(role)) {
        return count + 1;
      }
      return count;
    }, 0);
  }
  
}
