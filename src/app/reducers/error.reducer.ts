import { Action, ActionReducer } from '@ngrx/store';
import { Error } from '../services';
import { AppActions } from '../app.actions';

export const errors: ActionReducer<Error[]> = (state: Error[] = [], action: Action) => {
	switch (action.type) {
		case AppActions.AUTH_ERROR:
			return [
				...state,
				action.payload
			];
		default:
			return state;
	}
};
