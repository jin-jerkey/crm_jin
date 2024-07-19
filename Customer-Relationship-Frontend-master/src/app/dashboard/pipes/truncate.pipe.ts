import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return ''; // Return empty string if value is null or undefined
    }

    const words = value.split(' ');
    if (words.length > 30) {
      return words.slice(0, 30).join(' ') + '...';
    }
    return value;
  }
}
