import { Component, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Notification } from './notification';

@Component({
	selector: 'notification',
	styleUrls: [
		'./notification.css'
	],
	template: `
		<div class="notification-backdrop" *ngIf="notification" (click)="closeNotification(false)"></div>
		<div class="notification" *ngIf="notification">
			<div class="notification__inner" >
				<div>{{ notification.notificationText }}</div>
				<button (click)="closeNotification(true)">Да</button>
				<button (click)="closeNotification(false)">Нет</button>
			</div>
		</div>

    `,
	inputs: ['notification'],
	outputs: ['action'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
	notification: Notification;
	action: EventEmitter<any> = new EventEmitter<any>();

	closeNotification(performAction) {
		performAction ? this.action.emit(true) : this.action.emit(false);
	}
}
