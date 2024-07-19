import { EventEmitter, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertingService {

  constructor() { }
  messageEmitter: EventEmitter<string> = new EventEmitter<string>();

  sendMessage(message: string) {
    this.messageEmitter.emit(message);
  }
  showSweetAlert(message: string) {
    Swal.fire({
      title: `⏰ Il est temps de faire la tâche: ${message}`,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }
}