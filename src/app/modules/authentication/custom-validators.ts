import {AbstractControl,ValidatorFn,ValidationErrors, FormGroup} from '@angular/forms'

export function passwordValidator() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const hasSpecialSymbol = /[\W_]/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialSymbol;

        return passwordValid ? null : {passStrength:{ hasUpper:hasUpperCase,
            hasLower:hasLowerCase,
            hasNum: hasNumeric,
            hasSpecial: hasSpecialSymbol}};
    }
}

export const passwordMismatch: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
    const pass = control.get('password');
    const confirmPass = control.get('passwordConfirm');
    //console.log(pass!.value,confirmPass!.value);
    return pass!.value === confirmPass!.value ? null : {passwordMatch: false}
}