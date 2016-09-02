import { Action } from '@ngrx/store';
import { AppActions } from '../../app.actions';

export class NotificationReducers {
	static getReducers() {
		return {
			errors
		};
	}
}

function errors(state: Array= [], action: Action) {
	switch (action.type) {
		case AppActions.AUTH_ERROR:
			return [
				...state,
				action.payload
			];
		default:
			return state;
	}
}
