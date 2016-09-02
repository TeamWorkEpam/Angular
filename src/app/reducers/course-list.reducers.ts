import { Action, ActionReducer } from '@ngrx/store';
import { CourseItem } from '../services';
import { AppActions } from '../app.actions';

export const items: ActionReducer<CourseItem[]> = (state: CourseItem[] = [], action: Action) => {
	switch (action.type) {
		case AppActions.COURSES_LOADED:
			return action.payload;

		case AppActions.ADD_ITEM:
			return [
				...state,
				action.payload
			];

		case AppActions.UPDATE_ITEM:
			return state.map(i => {
				if (i.id === action.payload.id) {
					return Object.assign({}, i, action.payload);
				}
				return i;
			});

		case AppActions.DELETE_ITEM:
			return state.filter(i => i.id !== action.payload.id);

		default:
			return state;
	}
};
