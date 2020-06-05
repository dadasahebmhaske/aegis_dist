
import {Validator, NG_VALIDATORS, AbstractControl} from '@angular/forms';
import { directiveDef } from '@angular/core/src/view';
import { Directive, Input } from '@angular/core';
@Directive({
selector:'[appPassNotEqualValidator]',
providers:[{provide:NG_VALIDATORS,
useExisting:NewpassNotEqualValidatorDirective,
multi:true}]
})
export class NewpassNotEqualValidatorDirective implements Validator{
    @Input() appPassNotEqualValidator:string;
    validate(control:AbstractControl):{[key:string]:any} | null{
        const controlToCompare =control.parent.get(this.appPassNotEqualValidator);
        if(controlToCompare && controlToCompare.value === control.value){
            return {"Equal":true};
        }
        return null;
    }

}