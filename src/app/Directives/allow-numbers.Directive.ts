
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[onlyNumbers]'
})
export class AllowNumbers {

    constructor(public el: ElementRef) {
        this.el.nativeElement.onkeypress = (evt) => {
            let allowKeys = [8, 9, 27, 13];
            if (!allowKeys.some(x => x === evt.which)) {
                if ((evt.which < 48 || evt.which > 57) || evt.which === 46) {
                    evt.preventDefault();
                }
            }
        };

    }
}