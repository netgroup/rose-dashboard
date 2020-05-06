import {StorageKeys} from '@rose/app.constants';
import {Operator} from '@models/operators.model';
import {OperatorsFactory} from '@models/factories/operators.factory';
import {StorageService} from '@services/storage/storage.service';

export interface AuthenticationState {
    user: Operator;
}

export function defineAuthenticationInitialState(): AuthenticationState {
    const storageService = new StorageService();
    const user = storageService.get(StorageKeys.STORAGE_USER_KEY);

    return {
        user: user ? OperatorsFactory.restoreFromStorage(user) as Operator : null
    };
}

