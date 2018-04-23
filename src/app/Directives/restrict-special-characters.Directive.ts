
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[restrictSpecialCharacters]'
})

export class RestrictSpecialCharactersDirective {
    constructor(public el: ElementRef) {
        this.el.nativeElement.onkeypress = (evt) => {
            var regex = new RegExp("^[a-zA-Z0-9]+$");
            var key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
            if (!regex.test(key)) {
                evt.preventDefault();
                return false;
            }
        };

    }
}