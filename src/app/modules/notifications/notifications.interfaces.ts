export enum NotificationType {
    SUCCESS,
    ERROR
}

export enum NotificationAction {
    ADD,
    REMOVE
}

export interface NotificationChanges {
    action: NotificationAction;
    notification: Notification;
}

export interface Notification {
    id?: number;
    type: NotificationType;
    title?: any;
    message: any;
    icon?: string;
    timeout?: number;
}
