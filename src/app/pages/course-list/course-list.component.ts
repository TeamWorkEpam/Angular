import { Component, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PageComponent } from '../../components/page.component';
import { NotificationComponent } from '../../components/notofication';
import { CourseService, CourseItem } from './../../services';
import { ItemsListComponent } from './items-list/items-list.component';
import { notificationMessage } from '../../const/const';

@Component({
	selector: 'course-list',
	styleUrls: [
		'./course-list.css'
	],
	directives: [ItemsListComponent, NotificationComponent],
	encapsulation: ViewEncapsulation.None,
	template: ` 
        <h1>Course List</h1>
       
        <a class="item-text" routerLink="add">
           Добавить курс
        </a>
        <label>Найти</label>
        <input />
        <notification [notification]="notification"
        (action)="deleteCourse($event)"    
            ></notification>
        <items-list [items]="items"
            (delete)="openNotification($event)"    
            (edit)="editItem($event)">     
        </items-list>
    `

})
export class CourseList extends PageComponent {
	items: CourseItem[];
	notification: any;
	delItem: CourseItem;

	constructor(private courseService: CourseService,
	            private store: Store<any>,
	            private router: Router) {
		super(store, {});
	}

	onInit() {
		this._subscriptions([
			Observable.combineLatest(
				this.store.select('items')
			)
				.subscribe(([items]) => {
					this.items = items as CourseItem[];
				}),
		]);

		this.courseService.getCourses();
	}

	onDestroy() {
	}

	deleteCourse(res: boolean) {
		this.notification = null;
		if (res) {
			this.courseService.deleteCourse(this.delItem);
		}
	}

	openNotification(delItem: CourseItem) {
		this.notification = {};
		this.notification = {
			notificationText: notificationMessage.messageForDeleteCourse,
		};
		this.delItem = delItem;
	}

	editItem(itemId: CourseItem) {
		this.router.navigate([`${'courses/details/'}${itemId}`]);
	}
}
