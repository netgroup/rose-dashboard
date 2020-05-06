import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const validate: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const hasValues = hasValue(control.get('password')) && hasValue(control.get('password-confirm'));
    const valuesMatches = control.get('password').value === control.get('password-confirm').value;

    return hasValues && valuesMatches ? null : { passwordsMismatch: true };
};

function hasValue(control: AbstractControl) {
    return control.value !== null && control.value !== '';
}
