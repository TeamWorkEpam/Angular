import { Action, ActionReducer } from '@ngrx/store';
import { UserInfo } from '../services';
import { AppActions } from '../app.actions';

let initialState: UserInfo = {
	id: null,
	name: '',
	isLogged: false,
	error: {}
};

export const auth: ActionReducer<UserInfo> = (state: UserInfo = initialState, action: Action) => {
	switch (action.type) {
		case AppActions.LOG_IN:
			return Object.assign({}, action.payload);
		case AppActions.AUTH_ERROR:
			return Object.assign({}, action.payload);
		case AppActions.LOG_OFF:
			return initialState;
		case AppActions.USER_INFO:
			return Object.assign({}, state, action.payload);

		default:
			return state;
	}
};
