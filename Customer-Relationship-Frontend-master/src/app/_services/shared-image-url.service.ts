import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedImageUrlService {

  private imageUrlSubject = new BehaviorSubject<string>('');
  imageUrl$ = this.imageUrlSubject.asObservable();

  setImageUrl(url: string) {
    this.imageUrlSubject.next(url);
  }}
