import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[preventBubbling]'
})
export class PreventBubblingDirective {
    @HostListener('click', ['$event']) onClick(event: Event) {
        event.stopPropagation();
    }
}
