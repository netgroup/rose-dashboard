export const ClientKeys = {
    id: 2,
    secret: '12345678',
};

export const StorageKeys = {
    STORAGE_PREFIX: 'rose',
    STORAGE_USER_KEY: 'user',
    STORAGE_TOKEN_EXP_KEY: 'expat',
    STORAGE_TOKEN_KEY: 'auth',
    STORAGE_TOKEN_TYPE: 'auth_type',
};

export const StoreActions = {
    STORE_CONFIG_UPSERT: 'config::upsert',
    STORE_CONFIG_BREADCRUMB_UPDATE: 'config::breadcrumb::update',
    STORE_CONFIG_TITLE_UPDATE: 'config::title::update',
    STORE_AUTH_SIGNIN: 'auth::signin',
    STORE_AUTH_SIGNOUT: 'auth::signout',
    STORE_USER_UPDATE: 'user::update'
};
