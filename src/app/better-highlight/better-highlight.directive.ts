import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
//we should always use Renderer to make changes to the DOM, as in some
//cases we will not have access to DOM.

@HostBinding('style.backgroundColor') backgroundColor : string = 'transparent';
/* 
with the help of @HostBinding we dnt need to use Renderer and ElementRef, 
we can directly select the DOM element and apply the changes
*/
  constructor(/* private elRef: ElementRef, private renderer : Renderer2 */) { }

  ngOnInit(){
    //this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue', false, false);
  }

@HostListener('mouseenter') mouseOver(eventData : Event){
  //this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
  this.backgroundColor = 'blue';
}

@HostListener('mouseleave') mouseLeave(eventData : Event){
  //this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'transparent');
  this.backgroundColor = 'transparent';
}

}
