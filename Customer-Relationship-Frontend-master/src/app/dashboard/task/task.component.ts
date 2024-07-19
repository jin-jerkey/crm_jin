import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from './task';
import Swal from 'sweetalert2';
import { AlertingService } from './alerting.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {


  constructor(private alertservice:AlertingService){}
  @Output() formContent = new EventEmitter<Task>();
  
    ngOnInit() {
      // Retrieve tasks from local storage
      this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      // Set up task alerts
      this.setupTaskAlerts();
    }
  
  
    task: Task = { content: '', time: '', date: '' };
  
    onSubmit() {
      // Save the task to local storage
      const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(this.task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    
      // Update the tasks array immediately
      this.tasks = tasks;
      this.setupTaskAlerts();
  
      // Clear the form fields
      this.task = { content: '', time: '', date: '' };
    }
    
  
    tasks: Task[] = [];
  
   
    deleteTodo(index: number) {
      // Remove the task from the list
      this.tasks.splice(index, 1);
    
      // Update local storage to reflect the removed task
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    setupTaskAlerts() {
      console.log('Setting up task alerts...');
  
      const now = new Date();
  
      this.tasks.forEach((task) => {
        const taskTime = new Date(`${task.date}T${task.time}`);
        const timeDifference = taskTime.getTime() - now.getTime();
  
        console.log(`Task: ${task.content}, Time Difference: ${timeDifference}ms`);
  
        if (timeDifference > 0) {
          setTimeout(() => {
            // Use the NotificationService to display the SweetAlert notification
            this.alertservice.showSweetAlert(`${task.content}`);
            this.formContent.emit(task);
  
          }, timeDifference);
        }
      });
    }
   
    
  }
