import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backAccountFormat'
})
export class BackAccountFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const formattedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
    const chunks = formattedValue.match(/.{1,4}/g); // Split into chunks of 4 characters

    if (chunks) {
      return chunks.join('-');
    } else {
      return formattedValue;
    }
  }

}
