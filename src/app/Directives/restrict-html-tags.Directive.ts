
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[restrictHtmlTags]'
})

export class RestrictHtmlTagsDirective {
    constructor(public el: ElementRef) {
        this.el.nativeElement.onkeypress = (evt) => {
            let allowKeys = [60, 62];
            if (allowKeys.some(x => x === evt.which)) {
                evt.preventDefault();
            }
        };

    }
}