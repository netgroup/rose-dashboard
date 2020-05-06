import {validate as emailValidator} from './functions/email.validator';
import {validate as phoneValidator} from './functions/phone.validator';
import {validate as passwordsValidator} from './functions/passwords.validator';

export const CustomValidators = {
    email: emailValidator,
    phone: phoneValidator,
    passwordsMatch: passwordsValidator,
};
