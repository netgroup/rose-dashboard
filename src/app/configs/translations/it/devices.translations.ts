export const DevicesLanguagePartialDefinition = {
    list: {
        title: 'Devices List',
        filters: {
            fields: {
                term: {
                    placeholder: 'Search...'
                },
                type: {
                    placeholder: 'All type',
                },
                status: {
                    placeholder: 'All status'
                }
            }
        },
        headers: {
            actions: 'Actions',
            id: 'Id',
            name: 'Name',
            type: 'Type',
            extReachability: 'extReachability',
            ipAddress: 'Ip Address'

        },
        actions: {
            filter: 'Filter',
            
            details: {
                long: 'Show device',
                short: 'Show'
            },

        },
        modals: {
            delete: {
                title: 'Remove device',
                message: 'Stai per eliminare device <b>{{ device }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Remove',
                    cancel: 'Cancel'
                }
            },

        },
        notifications: {
            delete: {
                title: 'Remove device',
                message: 'Device eliminato correttamente'
            },
            
        },
    },
    edit: {
        title: {
            edit: 'Configure Device'
        },
        fields: {
            name: {
                label: 'Name',
                placeholder: 'Insert a name'
            },
            type: {
                label: 'Type',
                placeholder: ''
            },
            
        },
        actions: {
            edit: 'Save'
        },
        notifications: {
            edit: {
                title: 'Edit Device',
                message: 'Device <b>{{ fullname }}</b> modified'
            }
        },
        modals: {
            edit: {
                title: 'Configure device',
                message: 'Stai per configurare il device <b>{{ device }}</b>.<br />Sei sicuro di voler procedere?',
                actions: {
                    confirm: 'Configure',
                    cancel: 'Cancel'
                }
            },
            
        },
    },

    types: {
        undefined: 'Undefined',
        router: 'Router'
    }
};
