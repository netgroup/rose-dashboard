import {EventEmitter, Injectable} from '@angular/core';

import {Notification, NotificationAction, NotificationChanges, NotificationType} from '@modules/notifications/notifications.interfaces';

@Injectable()
export class NotificationsService {
    timeout: number;
    changes: EventEmitter<NotificationChanges>;

    constructor() {
        this.timeout = 6000;
        this.changes = new EventEmitter<NotificationChanges>();
    }

    add(notification: Notification) {
        this.changes.emit({
            action: NotificationAction.ADD,
            notification: notification
        });
    }

    remove(notification: Notification) {
        this.changes.emit({
            action: NotificationAction.REMOVE,
            notification: notification
        });
    }

    success(title: string, message: string) {
        this.add({
            type: NotificationType.SUCCESS,
            title: title,
            message: message
        });
    }

    error(title: string, message: string) {
        this.add({
            type: NotificationType.ERROR,
            title: title,
            message: message
        });
    }
}
