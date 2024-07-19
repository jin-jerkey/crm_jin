import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../dashboard/profile/file-handle';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  constructor(private sanitizer: DomSanitizer) { }

 
  public dataURItoBlob(picBytes: string, imageType: any): Blob {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], { type: imageType });
  }
}
