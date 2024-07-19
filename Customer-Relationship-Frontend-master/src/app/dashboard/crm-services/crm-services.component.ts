import { Component } from '@angular/core';
import { ServicesDialogComponent } from './services-dialog/services-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crm-services',
  templateUrl: './crm-services.component.html',
  styleUrls: ['./crm-services.component.css']
})
export class CrmServicesComponent {
  services = [
    {
      "id": 1,
      "icon": "fas fa-desktop",
      "title": "Conception Web",
      "description": "Améliorez votre présence en ligne avec notre expertise en conception web."
    },
    {
      "id": 2,
      "icon": "fas fa-network-wired",
      "title": "Virtualisation des Infrastructures",
      "description": "Optimisez l'efficacité de votre infrastructure informatique grâce à notre expertise en virtualisation."
    },
    {
      "id": 3,
      "icon": "fas fa-tools",
      "title": "Maintenance Informatique et Réseaux",
      "description": "Assurez le bon fonctionnement de votre système informatique et de vos réseaux avec notre service de maintenance dédié."
    },
    {
      "id": 4,
      "icon": "fas fa-shield-alt",
      "title": "Sécurité",
      "description": "Protégez vos données sensibles et votre infrastructure contre les cybermenaces avec nos solutions de sécurité avancées."
    },
    {
      "id": 5,
      "icon": "fas fa-video",
      "title": "Visioconférence",
      "description": "Collaborez efficacement et en toute sécurité avec vos équipes à distance grâce à notre service de visioconférence."
    },
    {
      "id": 6,
      "icon": "fas fa-database",
      "title": "Datacenter",
      "description": "Centralisez et sécurisez vos données avec notre solution de datacenter de pointe."
    },
    {
      "id": 7,
      "icon": "fas fa-lightbulb",
      "title": "Conseil et Consulting",
      "description": "Profitez de notre expertise stratégique pour optimiser vos processus informatiques et atteindre vos objectifs commerciaux."
    },
    {
      "id": 8,
      "icon": "fas fa-graduation-cap",
      "title": "Formation",
      "description": "Investissez dans le développement de vos équipes avec nos programmes de formation sur mesure."
    }
  ];
  isLoggedIn!: boolean;
  userId: any;


  hoverCard(service: any) {
    service.hovered = true;
  }

  unhoverCard(service: any) {
    service.hovered = false;
  }
  animal!: string;
  name!: string;
  index!: number;

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.userId = user.id;
    }
  }
  constructor(public dialog: MatDialog, private userService: UserService,
    private storageService: StorageService,
    private route: Router) { }
  openDialog(index: number, title: string): void {
    console.log('Index:', index);
    console.log('Title:', title);
    const dialogRef = this.dialog.open(ServicesDialogComponent, {
      data: { index: index, title: title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      this.userService.saveCommand(this.userId, result).subscribe({
        next: (data: any) => {
          console.log(data);
          Swal.fire({
            title: 'La commande a été transmise avec succès',
            icon: 'success',
            timer: 3000, // Time in milliseconds (2 seconds in this example)
            timerProgressBar: true, // Show timer progress bar
            showConfirmButton: false, // Hide the "OK" button
          });
          this.route.navigate(['/dashboard/command'])
        },
        error: (err: any) => {
          console.log(err);
          
          Swal.fire({
            title: 'Echec de l\'envoi d\'une commande',
            icon: 'error',
            timer: 2000, // Time in milliseconds (2 seconds in this example)
            timerProgressBar: true, // Show timer progress bar
            showConfirmButton: false, // Hide the "OK" button
          });
        },
      });
    });
  }
  command(userId: any, command: any) {
    throw new Error('Method not implemented.');
  }

}


