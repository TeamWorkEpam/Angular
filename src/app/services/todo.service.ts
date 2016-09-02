import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CourseItem } from './courseItem';
import { AppActions } from '../app.actions';

@Injectable()
export class CourseService {
	apiUrl: string = 'http://localhost:3333/todo/';

	constructor(private http: Http,
	            private appActions: AppActions) {}

	getCourses() {
		return this.http.get(this.apiUrl)
			.map(res => {
				return res.json().map(i => new CourseItem(
					i.id,
					i.name,
					i.description,
					i.duration,
					i.date,
				));
			})
			.subscribe(res => {
				this.appActions.dispatch(AppActions.COURSES_LOADED, res);
			});
	}

	getCourse(id: number) {
		this.appActions.dispatch(AppActions.START_API_CALL);
		return this.http.get(this.apiUrl + id)
			.map(res => {
				let i = res.json();
				return new CourseItem(
					i.id,
					i.name,
					i.description,
					i.duration,
					i.date,
				);
			})
			.subscribe(res => {
				this.appActions.dispatch(AppActions.COURSE_LOADED, res);
			});
	}

	addCourse(item: CourseItem) {
		return this.http.post(this.apiUrl, item)
			.map(res => {
				let i = res.json();
				return new CourseItem(
					i.id,
					i.name,
					i.description,
					i.duration,
					i.date,
				);
			})
			.subscribe(res => {
				this.appActions.dispatch(AppActions.ADD_ITEM, res);
			});
	}

	updateCourse(item: CourseItem) {
		let observable = this.http.put(this.apiUrl + item.id, item);
		observable.subscribe(res => {
			this.appActions.dispatch(AppActions.UPDATE_ITEM, item);
		});
		return observable;
	}

	deleteCourse(item: CourseItem) {
		return this.http.delete(this.apiUrl + item.id)
			.subscribe(res => {
				this.appActions.dispatch(AppActions.DELETE_ITEM, item);
			});
	}
}
