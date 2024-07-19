import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const USER_KEY = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  saveItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  removeToken() {
    localStorage.removeItem(USER_KEY);
  }

  
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
  public signOut(): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear(); 
    window.history.replaceState({}, document.title, window.location.href);
  }
}
