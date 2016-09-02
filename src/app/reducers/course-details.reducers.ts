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
		case AppActions.ITEM_LOADED:
			return action.payload;
		default:
			return state;
	}
};
