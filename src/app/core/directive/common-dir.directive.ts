import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[saCommonDir]'
})
export class CommonDirDirective {
  @Input('dirType') dirType: string;

  private regex = {
    number: new RegExp(/^\d+$/),
    decimal: new RegExp(/^\d{1,18}(\.\d{0,2})?$/),   //^[0-9]+(\.[0-9]*){0,1}$/g
    alphanumeric: new RegExp(/^[a-zA-Z0-9\s-/]+$/),
    alphaonly: new RegExp(/^[a-zA-Z\s]+$/),
    alphanumericupper:new RegExp(/^[a-zA-Z0-9\s-/]+$/),
    alphaonlyupper: new RegExp(/^[a-zA-Z\s]+$/)
  };

  private specialKeys = {
    number: ['Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'],
    decimal: ['Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'],
    alphanumeric: ['Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'],
    alphaonly: ['Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'],
    alphanumericupper: ['Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'],
    alphaonlyupper: ['Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight']
  };
  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  @HostListener('keyup', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.specialKeys[this.dirType].indexOf(event.key) !== -1) {
      return;
    }
    // Do not use event.keycode this is deprecated.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    let current: string = this.el.nativeElement.value;
    // if(this.dirType=='alphanumericupper' || this.dirType=='alphaonlyupper'){
    //  // this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();
    //   if (event.keyCode>32 && event.keyCode<128)
    //   {
    //      event.target['value']+=event.key.toUpperCase();
    //      event.preventDefault(); //stop propagation
    //      //must create a "input" event, if not, there are no change in your value
    //      var evt = document.createEvent("HTMLEvents");
    //      evt.initEvent("input", false, true);
    //      event.target.dispatchEvent(evt);
    //    }
    // }
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex[this.dirType])) {
      event.preventDefault();
    }
  }
  }
