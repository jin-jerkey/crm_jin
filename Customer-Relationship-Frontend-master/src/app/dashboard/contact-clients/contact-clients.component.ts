import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MailServiceService } from 'src/app/_services/mail-service.service';

@Component({
  selector: 'app-contact-clients',
  templateUrl: './contact-clients.component.html',
  styleUrls: ['./contact-clients.component.css']
})
export class ContactClientsComponent {
  data:any;
  constructor(private httpservice:MailServiceService,private route:Router) { }

  ngOnInit(): void {
    this.httpservice.getMail().subscribe(
      data=>{
        this.data=data;
        console.log(data)
      }
    )
  }
  openPropertyDetails(id: number) {
    this.route.navigate(['admins/readmail/', id]);
  }

}