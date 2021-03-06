import { OnInit, OnDestroy } from '@angular/core';
import { Store, combineReducers } from '@ngrx/store';
import { Subscription } from 'rxjs';

export abstract class PageComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];

	constructor(private _store: Store<any>,
	            private _reducers: any) {
	}

	ngOnInit() {
		this.onInit();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
		this.onDestroy();
	}

	protected _subscription(subscription: Subscription) {
		this.subscriptions.push(subscription);
	}

	protected _subscriptions(subscriptions: Subscription[]) {
		this.subscriptions = this.subscriptions.concat(subscriptions);
	}

	abstract onInit();

	abstract onDestroy();
}
