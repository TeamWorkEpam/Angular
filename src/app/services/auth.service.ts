import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserInfo } from './userInfo';
import { Error } from './error';
import { AppActions } from '../app.actions';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
	static LOGIN_KEY: string = 'login';

	apiUrl: string = 'http://localhost:3333/todo/';

	constructor(private http: Http,
	            private appActions: AppActions) {}

	logIn(login: string, password: string) {
		let result = {
			login: login,
			password: password
		};
		return this.http.post(this.apiUrl + 'auth', result)
			.map((res) => {
				let i = res.json();
				if (i.error) {
					return new Error(
						i.code,
						i.message,
						i.error
					);
				} else {
					return new UserInfo(
						i.id,
						i.name,
						i.isLogged
					);
				}
			})
			.subscribe((res) => {
				let error = _.get(res, 'error', false);
				let userName = _.get(res, 'name', '');
				if (!error) {
					localStorage.setItem(AuthService.LOGIN_KEY, userName);
					this.appActions.dispatch(AppActions.LOG_IN, res);
				} else {
					this.appActions.dispatch(AppActions.AUTH_ERROR, res);
				}

			});
	}

	isLoggedIn() {
		let isLoggedIn = !!localStorage.getItem(AuthService.LOGIN_KEY);
		return isLoggedIn;
	}

	getUserInfo() {
		let userName = localStorage.getItem(AuthService.LOGIN_KEY);
		if (userName) {
			return this.http.get(this.apiUrl + 'auth/' + userName)
				.map((res) => {
					let i = res.json();
					return new UserInfo(
						i.id,
						i.name,
						i.isLogged
					);
				})
				.subscribe((res) => {
					this.appActions.dispatch(AppActions.USER_INFO, res);
				});
		}
	}

	logOff() {
		this.appActions.dispatch(AppActions.LOG_OFF);
		localStorage.removeItem(AuthService.LOGIN_KEY);
	}
}
