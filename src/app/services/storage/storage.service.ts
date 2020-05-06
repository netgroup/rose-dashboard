import {Subject} from 'rxjs';

import {StorageAddEvent, StorageChangeEvent, StorageDeleteEvent} from './storage.events.definitions';
import {StorageKeys} from 'app/app.constants';


export class StorageService {
    private storage: Storage;

    public change: Subject<StorageChangeEvent>;
    public add: Subject<StorageAddEvent>;
    public remove: Subject<StorageDeleteEvent>;

    constructor() {
        this.storage = localStorage;

        this.change = new Subject();
        this.add = new Subject();
        this.remove = new Subject();
    }

    /**
     * Returns all keys present in localstorage
     */
    public keys(prefix?: string): string[] {
        const keys = [];
        const matchPrefix = prefix ? `${StorageKeys.STORAGE_PREFIX}.${prefix}` : StorageKeys.STORAGE_PREFIX;

        for (const key in this.storage) {
            if (this.storage.hasOwnProperty(key) && key.startsWith(matchPrefix)) {
                keys.push(this.extractKey(key));
            }
        }

        return keys;
    }

    /**
     * Returns the related value if the given key exists
     */
    public get(key: string): any {
        return this.extract(this.storage.getItem(this.buildKey(key)));
    }

    /**
     * Sets a value for a specific key. Note that if the value exists yet, it wil be replaced and the subject 'change' will be triggered.
     * The value will be added otherwise and the 'add' subject will be triggered.
     */
    public set(key: string, value: any): boolean {
        const completeKey = this.buildKey(key);
        const oldValue = this.extract(this.storage.getItem(completeKey));

        this.storage.setItem(completeKey, this.prepareForSave(value));

        if (!oldValue) {
            this.add.next({
                key,
                value
            });
        } else {
            this.change.next({
                key,
                oldValue,
                newValue: value
            });
        }

        return true;
    }

    /**
     * Removes a specific key form localstorage
     */
    public unset(key: string): boolean {
        let result = false;

        const completeKey = this.buildKey(key);
        const oldValue = this.storage.getItem(completeKey);

        if (oldValue) {
            result = true;

            this.storage.removeItem(completeKey);
            this.remove.next({
                key,
                oldValue
            });
        }

        return result;
    }

    private buildKey(key: string): string {
        return `${StorageKeys.STORAGE_PREFIX}.${key}`;
    }

    private extractKey(key: string): string {
        const prefixLength = StorageKeys.STORAGE_PREFIX.length;

        return key.substr(prefixLength + 1, key.length - prefixLength);
    }

    private prepareForSave(value: any): string {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }

        return value.toString();
    }

    private extract(value): any {
        try {
            return JSON.parse(value);
        } catch(e) {
            return value;
        }
    }
}
