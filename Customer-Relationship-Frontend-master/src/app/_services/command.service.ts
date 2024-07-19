import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Command } from '../dashboard/command/command';


const API_URL = 'http://localhost:8082/api/auth/users/clients/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class CommandService {
 
  constructor(private http: HttpClient) {}
}
