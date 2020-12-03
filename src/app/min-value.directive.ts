import { Directive } from '@angular/core';  
import { Validator, NG_VALIDATORS, ValidatorFn, FormControl } from '@angular/forms';  
  
@Directive({  
  selector: '[appMinValueValidator]',  
  providers: [  
    {  
      provide: NG_VALIDATORS,  
      useClass: MinValueValidatorDirective,  
      multi: true  
    }  
  ]  
})  
export class MinValueValidatorDirective implements Validator {  
  
  validator: ValidatorFn;  
  constructor() {  
    this.validator = this.minValueValidator();  
  }  
  
  validate(c: FormControl) {  
    return this.validator(c);  
  }  
  
  minValueValidator(): ValidatorFn {  
    return (control: FormControl) => {  
      if (control.value >= 0 && control.value !== '') return null;  
      else return { minValueValidator: { valid: false } };  
    };  
  }  
}  