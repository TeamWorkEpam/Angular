import { Injectable } from '@angular/core';
import { Store, Action, combineReducers } from '@ngrx/store';

@Injectable()
export class AppActions {
    static COURSES_LOADED = 'COURSES_LOADED';
    static LOG_IN = 'LOG_IN';
    static ADD_ITEM = 'ADD_ITEM';
    static UPDATE_ITEM = 'UPDATE_ITEM';
    static DELETE_ITEM = 'DELETE_ITEM';
    static AUTH_ERROR = 'AUTH_ERROR';
    static USER_INFO = 'USER_INFO';
    static LOG_OFF = 'LOG_OFF';
    static START_API_CALL = 'START_API_CALL';
    static CLEAR_ERROR = 'CLEAR_ERROR';
    static COURSE_LOADED = 'COURSE_LOADED';

    constructor(private _store: Store<any>) {
    }

    dispatch(type: string, payload?: any) {
        this._store.dispatch({
            type,
            payload
        });
    }
}
