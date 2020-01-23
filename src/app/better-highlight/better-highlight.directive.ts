import { Directive, Renderer2, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
//we should always use Renderer to make changes to the DOM, as in some
//cases we will not have access to DOM.
  constructor(private elRef: ElementRef, private renderer : Renderer2) { }

  ngOnInit(){
    this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
  }


}
