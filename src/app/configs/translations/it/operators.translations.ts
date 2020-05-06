export const OperatorsLanguagePartialDefinition = {
    list: {
        title: 'Gestione operatori',
        filters: {
            fields: {
                term: {
                    placeholder: 'Cerca per nome, cognome o email'
                },
                roles: {
                    placeholder: 'Tutti i ruoli'
                }
            },
            action: {
                create: 'Crea operatore'
            }
        },
        headers: {
            fullname: 'Operatore',
            role: 'Ruolo',
            actions: 'Actions'
        },
        actions: {
            filter: 'Filter',
            create: 'Crea operatore',
            edit: {
                long: 'Modifica operatore',
                short: 'Edit'
            },
            delete: {
                long: 'Elimina operatore',
                short: 'Delete'
            }
        },
        modals: {
            delete: {
                title: 'Elimina operatore',
                message: 'Stai per eliminare l\'operatore <b>{{ operator }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Delete',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Elimina operatore',
                message: 'Operatore eliminato correttamente'
            }
        },
    },
    edit: {
        title: 'Modifica operatore',
        fields: {
            name: {
                label: 'Nome',
                placeholder: 'Inserisci il nome dell\'operatore'
            },
            surname: {
                label: 'Cognome',
                placeholder: 'Inserisci il cognome dell\'operatore'
            },
            type: {
                label: 'Tipo account',
                placeholder: 'Seleziona tipologia account'
            },
            phone: {
                label: 'Numero di telefono',
                placeholder: 'Inserisci numero di telefono'
            },
            email: {
                label: 'Indirizzo email',
                placeholder: 'Inserisci email'
            },
            password: {
                label: 'Password',
                placeholder: 'Inserisci la password'
            },
            passwordConfirm: {
                label: 'Conferma password',
                placeholder: 'Reinserisci la password'
            }
        },
        actions: {
            create: 'Crea operatore',
            edit: 'Modifica operatore'
        },
        notifications: {
            create: {
                title: 'Creation operatore',
                message: 'L\'operatore <b>{{ fullname }}</b> è stato creato con successo'
            },
            edit: {
                title: 'Modifica operatore',
                message: 'L\'operatore <b>{{ fullname }}</b> è stato modificato con successo'
            }
        }
    }
};
