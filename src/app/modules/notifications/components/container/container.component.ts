import {Component, OnDestroy, OnInit} from '@angular/core';
import {trigger, state, style, animate, transition, group} from '@angular/animations';
import {filter, map} from 'rxjs/operators';

import {NotificationsService} from '@modules/notifications/notifications.service';
import {
    Notification,
    NotificationAction,
    NotificationChanges,
    NotificationType
} from '@modules/notifications/notifications.interfaces';

interface NotificationItem {
    notification: Notification;
    state: string;
    timeout: any;
}

@Component({
    selector: 'app-notifications',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss'],
    animations: [
        trigger('notification', [
            state('visible', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            state('closing', style({
                transform: 'translateX(100%)',
                opacity: 0
            })),
            transition('* => visible', [group([
                animate('300ms ease-out', style({
                    transform: 'translateX(0)'
                })),
                animate('300ms ease-out', style({
                    opacity: 1
                }))
            ])]),
            transition('visible => closing', animate('300ms ease-out'))
        ]),
        trigger('mobile-notification', [
            state('visible', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            state('closing', style({
                transform: 'translateY(-120%)',
                opacity: 0
            })),
            transition('* => visible', [group([
                animate('300ms ease-out', style({
                    transform: 'translateY(0)'
                })),
                animate('300ms ease-out', style({
                    opacity: 1
                }))
            ])]),
            transition('visible => closing', animate('300ms ease-out'))
        ])
    ]
})
export class NotificationsContainerComponent implements OnInit, OnDestroy {
    notifications: NotificationItem[];
    types = NotificationType;

    constructor(private notificationService: NotificationsService) {
        this.notifications = [];
    }

    ngOnInit() {
        this.notificationService.changes
            .pipe(
                filter((change: NotificationChanges) => change.action === NotificationAction.ADD),
                map((change: NotificationChanges) => change.notification)
            )
            .subscribe((notification: Notification) => this.onNotificationAdd(notification));

        this.notificationService.changes
            .pipe(
                filter((change: NotificationChanges) => change.action === NotificationAction.REMOVE),
                map((change: NotificationChanges) => change.notification)
            )
            .subscribe((notification: Notification) => this.onNotificationRemove(notification));
    }

    ngOnDestroy() {

    }

    onNotificationAdd(notification: Notification) {
        notification.id = Math.round(Math.random() * 100000);

        const timeout = notification.timeout || this.notificationService.timeout;
        const item: NotificationItem = {
            notification,
            state: 'visible',
            timeout: setTimeout(() => {
                this.notificationService.remove(notification);
            }, timeout)
        };

        if (item.notification.icon) {
            item.notification.icon = `../../../../../assets/icons/notifications/${item.notification.icon}.svg`;
        }

        this.notifications.push(item);
    }

    onNotificationRemove(notification: Notification) {
        const index = this.notifications.findIndex((instance: NotificationItem) => instance.notification.id === notification.id);
        const item = this.notifications[index];

        if (item) {
            item.state = 'closing';
        }
    }

    onNotificationClosed(event: any, notification: Notification) {
        if (event.toState === 'closing') {
            const index = this.notifications.findIndex((instance: NotificationItem) => instance.notification.id === notification.id);

            if (index >= 0) {
                this.notifications.splice(index, 1);
            }
        }
    }
}
