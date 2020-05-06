export interface StorageAddEvent {
    key: string;
    value: any;
}

export interface StorageChangeEvent {
    key: string;
    oldValue: any;
    newValue: any;
}

export interface StorageDeleteEvent {
    key: string;
    oldValue: any;
}
