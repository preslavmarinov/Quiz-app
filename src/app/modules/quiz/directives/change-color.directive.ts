import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective implements OnChanges {
  @Input('appChangeColor') color:string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    this.changeTextColor()
  }

  private changeTextColor() {
    if(this.color) {
      this.renderer.setStyle(this.el.nativeElement, 'color', this.color);
    }
    else {
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }
  }

}
