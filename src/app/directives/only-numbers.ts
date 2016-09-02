import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[only-numbers]'
})
export class OnlyNumbersDirective implements OnInit, OnDestroy {
    public key: string = '';
    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.el.nativeElement.addEventListener('keypress', this.onKeyPress, false);
    }

    onKeyPress(e) {
        let event = e || window.event;
        let keyCode = event.keyCode || event.which;
        keyCode = String.fromCharCode(keyCode);
        let regex = /[0-9]|\./;
        if (!regex.test(keyCode)) {
            event.returnValue = false;
            event.preventDefault();
        }
    }

    ngOnDestroy() {
        this.el.nativeElement.removeEventListener('keypress', this.onKeyPress);
    }
}
