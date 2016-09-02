import { Action, ActionReducer } from '@ngrx/store';
import { UserInfo } from '../services';
import { AppActions } from '../app.actions';

let initialState: UserInfo = {
	id: null,
	name: '',
	isLogged: false,

};

export const auth: ActionReducer<UserInfo> = (state: UserInfo = initialState, action: Action) => {
	switch (action.type) {
		case AppActions.LOG_IN:
			return action.payload;
		case AppActions.LOG_OFF:
			return initialState;
		case AppActions.USER_INFO:
			return Object.assign({}, state, action.payload);

		default:
			return state;
	}
};
