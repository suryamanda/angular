import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  @Input() set appUnless(condition: boolean){
    //name should match with the selector name
    if(!condition){
  this.vcRef.createEmbeddedView(this.templateRef);
    }else{

    }
  }

  constructor(private templateRef : TemplateRef<any>, private vcRef: ViewContainerRef) {

   }

}
