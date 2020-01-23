import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  @Input() defaultColor : string = 'transparent';
  @Input() highlightColor : string = 'blue';

@HostBinding('style.backgroundColor') backgroundColor : string = this.defaultColor;
/* 
with the help of @HostBinding we dnt need to use Renderer and ElementRef, 
we can directly select the DOM element and apply the changes
*/
  constructor(/* private elRef: ElementRef, private renderer : Renderer2 */) { }

  ngOnInit(){
    this.backgroundColor= this.defaultColor;
    //this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue', false, false);
  }

@HostListener('mouseenter') mouseOver(eventData : Event){
  //this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
  this.backgroundColor = this.highlightColor;
}

@HostListener('mouseleave') mouseLeave(eventData : Event){
  //this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'transparent');
  this.backgroundColor = this.defaultColor;
}

}
