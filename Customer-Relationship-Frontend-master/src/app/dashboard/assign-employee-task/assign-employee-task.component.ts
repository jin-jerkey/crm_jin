import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, first, map, startWith } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-employee-task',
  templateUrl: './assign-employee-task.component.html',
  styleUrls: ['./assign-employee-task.component.css']
})
export class AssignEmployeeTaskComponent implements OnInit {
  tasks: any;
  task = {
    description: null,
    date_limit: null,
    user: null
  }
  userData: any;
  employeeList:any[]=[];
  filterValue!: string;
  constructor(private userService: UserService) { }




  control = new FormControl('');
  streets: string[] = [];
  filteredStreets!: Observable<string[]>;

  ngOnInit() {
    this.getAllUsers()
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    
  }

  private _filter(value: string): string[] {
     this.filterValue = this._normalizeValue(value);    
    return this.streets.filter(street => this._normalizeValue(street).includes(this.filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.userData = data;

        this.userData.forEach((element: any) => {
          if (element.roles[0].name === 'ROLE_EMPLOYEE') {
            this.streets.push( element.firstname+" "+element.lastname+"-"+element.email);
            // this.employeeList.push(element.email)
            
          }

        });
      })
  }
  onSubmit() {
      const mymail =this.filterValue.split('-')[1];
      console.log(mymail);
       const userId = this.userData.find((d:any)=>d.email === mymail)
       const id =userId.id;
       const description = this.task?.description;
       const date_limit = this.task?.date_limit;
       

       this.userService.addTask(id,description,date_limit).subscribe({
        next: (data: any) => {
          console.log(data);
          Swal.fire({
            title: 'Tâche assignée avec succès',
            icon: 'success',
            timer: 3000, 
            timerProgressBar: true, 
            showConfirmButton: false, 
          });
        },
        error: (err: any) => {
          console.log(err.message);

          Swal.fire({
            title: 'Échec de l\'attribution de la tâche',
            icon: 'error',
            timer: 2000, 
            timerProgressBar: true, 
            showConfirmButton: false, 
          });
        },
      });
    }

  deleteTodo(_t50: number) {
    throw new Error('Method not implemented.');
  }

}