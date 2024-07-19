import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8082/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  updateUser(userId: number, formData: FormData) {
    console.log(formData);
    
  
    return this.http.put(`http://localhost:8082/api/auth/users/${userId}`, formData);
  }
  forgotPassword(email: any) {
return this.http.post(AUTH_API + 'forgot',{email})  }
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        email,
        password,
      },
      httpOptions
    );
  }
  
  register(firstname: string, lastname:string,phone:string,address:string, email:string, password:string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        firstname,
        lastname,
        phone,
        address,
        email,
        password
      },
      httpOptions
    );
  }


}
