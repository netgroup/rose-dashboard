import * as GooglePhoneNumberUtils from 'google-libphonenumber';
import {FormControl} from '@angular/forms';

export function validate(control: FormControl) {
    if (!control.value || control.value.length === 0) {
        return null;
    }

    const phoneNumberUtilsInstance = GooglePhoneNumberUtils.PhoneNumberUtil.getInstance();
    let validation = null;

    try {
        validation = phoneNumberUtilsInstance.isValidNumber(phoneNumberUtilsInstance.parse(control.value)) ? null : {
            valid: false,
            invalidNumber: true
        };
    } catch (exception) {
        validation = {
            valid: false,
            invalidNumber: true
        };
    }

    return !validation ? null : validation;
}
