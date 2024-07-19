import { Injectable } from '@angular/core';
import { Garbagept } from '../classes/garbagept';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:8080/api/';



@Injectable({
  providedIn: 'root'
})

export class GarbageServiceService {
  deleteGarbagePoint(id: number) {
return this.http.delete(`${API_URL}delete/`+id);
  }
  search(name: string) {
    return this.http.get(`${API_URL}garbage-points/search/${name}`); 
  }
  getAllGarbagePts() {
    return this.http.get(`${API_URL}all`);
  }
  constructor(private http: HttpClient) {}

  postAll(garbagept: Garbagept) {
    return this.http.post(`${API_URL}add`, garbagept);
  }
  updategarbagept(id: number, garbagept: Garbagept) {
    return this.http.put(`${API_URL}update/`+id, garbagept);
  }
  getGarbagePoints(id: number) {
    return this.http.get(`${API_URL}`+ id);
  }

}
