
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fixBrokenImage]'
})

export class FixBrokenImageDirective {
    constructor(public el: ElementRef) {
        this.el.nativeElement.onerror = (evt) => {
            if (evt && evt.target && evt.target.src) {
                evt.target.src = "assets/img/NoImage.jpg";
            }
        };

    }
}