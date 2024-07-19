import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private firstNameSource = new BehaviorSubject<string>('');
  currentFirstName = this.firstNameSource.asObservable();

  setFirstName(firstName: string) {
    this.firstNameSource.next(firstName);
  }
  constructor() { }
}
