import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
selector : '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit{
//This is a basic custom attribute directive
    constructor(private elementRef: ElementRef){
    }

    ngOnInit(){
       this.elementRef.nativeElement.style.backgroundColor = 'blue'; 
    }

}