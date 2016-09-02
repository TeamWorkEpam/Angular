import { Action, ActionReducer } from '@ngrx/store';
import { CourseItem } from '../services';
import { AppActions } from '../app.actions';

let initialState: CourseItem = {
	id: null,
	name: '',
	description: '',
	duration: '',
	date: {}
};

export const courseDetail: ActionReducer<CourseItem> = (state: CourseItem = initialState, action: Action) => {
	switch (action.type) {
		case AppActions.START_API_CALL:
			return Object.assign({}, state);
		case AppActions.COURSE_LOADED:
			return Object.assign({}, action.payload);
		default:
			return state;
	}
};
