import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  API_URL = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

}
