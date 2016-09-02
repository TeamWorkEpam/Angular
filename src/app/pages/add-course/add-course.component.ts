import { Component } from '@angular/core';
import { CourseItem, CourseService } from './../../services';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PageComponent } from '../../components/page.component';

import { DateFormat } from '../../pipes/date.pipe';
import { defaultCourseValue }  from '../../const/const';
import { CourseFormComponent }  from '../../components/course-form';

@Component({
	selector: 'add-course',
	styleUrls: [
		'./add-course.css'
	],
	templateUrl: './add-course.html',
	pipes: [DateFormat],
	directives: [CourseFormComponent]
})

export class AddCourseComponent extends PageComponent {
	courseActions: any =
		[
			{
				type: 'submit',
				name: 'Добавить курс'
			},
			{
				type: 'button',
				action: 'back',
				name: 'Назад'
			}
		];

	item: CourseItem = defaultCourseValue;

	constructor(private router: Router,
	            private store: Store<any>,
	            private courseService: CourseService) {
		super(store, {});

	}

	onInit() {
	}

	onDestroy() {
	}

	gotoList() {
		this.router.navigate(['courses']);
	}

	addCourse(course: CourseItem) {
		let newItem = new CourseItem(null, course.name, course.description, course.duration, course.date);
		this.courseService.addCourse(newItem);
		this.router.navigate(['courses']);
	}
}
