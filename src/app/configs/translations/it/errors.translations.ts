export const ErrorsLanguagePartialDefinition = {
    generic: 'Si è verificato un errore nel compiere questa azione',
    forbidden: 'Non hai i permessi necessari per accedere a questa risorsa.',
    unauthorized: 'La sessione è scaduta o è invalida, effettua l\'accesso per proseguire.',
    validations: {
        required: 'Questo campo è obbligatorio',
        invalidDomain: 'L\'indirizzo risulta non valido',
        maxlength: 'Questo campo ha superato il numero massimo di caratteri consentiti',
        roles: {
            required: 'Seleziona un ruolo per il nuovo operatore'
        },
        passwords: {
            required: 'La password è richiesta per proseguire',
            minlength: 'La password deve essere lunga almeno {{requiredLength}} caratteri',
            mismatch: '<b>Attenzione:</b> le password non coincidono'
        }
    }
};
