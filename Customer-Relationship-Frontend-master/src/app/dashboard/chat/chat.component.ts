import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'src/app/_services/message-service.service';
import { SharedDataService } from 'src/app/_services/shared-data.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{
  input!: string; 
  
  allUsers:any;
  isLoggedIn: any;
  username: any;
  content: any;
  errormessage = ''
  roles: any;
  showAdminBoard: any;
  showModeratorBoard: any;
 userData:any = [];
 userId!:number;
  constructor(private userService: UserService, public messageService: MessageService,private storageService: StorageService, private authService:AuthService,

  ) { }
  

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.userId=user.id;
    }
    this.getEmployeeById()
  }

  getEmployeeById(){
  this.userService.getAdminBoard(this.userId).subscribe(
    (data:any)=>{
this.userData =data;
console.log(data);

      
    }
  ),
  (err:Error)=>{
    this.errormessage=err.message;
    console.log("error");
    
    }
  }

  sendMessage() {
    const firstname=this.userData.firstname
    if (this.input) {
      const messagePayload = {
        senderName: firstname,
        message: this.input,
      };
      this.messageService.sendMessage(messagePayload);
      this.input = '';
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}