import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'decodeHTMLEntities'
})
export class DecodeHTMLEntitiesPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(encoded:string) : SafeHtml {
    const decoded = new DOMParser().parseFromString(encoded, 'text/html');
    return this.sanitizer.bypassSecurityTrustHtml(decoded.documentElement.textContent || '');
  }

}

//Not used currently depends on the random questions query params- default encoding or base64 encoding
