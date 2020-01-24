import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{
/*
This directive helps us to toggle dropdown menu
the calss which is being used fo rtoggle a dropdown menu is open
so we need to make changes to class.open on the target element
*/
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }

}