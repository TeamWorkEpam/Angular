import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, CourseItem } from './../../services';
import { ErrorSummaryComponent } from './../../components/error-summary';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PageComponent } from '../../components/page.component';
import { CourseFormComponent } from '../../components/course-form';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
	selector: 'course-details',
	styleUrls: [
		'./course-details.css'
	],
	directives: [ErrorSummaryComponent, REACTIVE_FORM_DIRECTIVES, CourseFormComponent],
	templateUrl: 'course-details.html'
})
export class CourseDetails extends PageComponent {
	item: CourseItem;
	sub: Subscription;
	courseActions: any =
		[
			{
				type: 'submit',
				name: 'Редактировать курс'
			},
			{
				type: 'button',
				action: 'back',
				name: 'Назад'
			}
		];

	formErrors: any;

	constructor(private courseService: CourseService,
	            private activatedRoute: ActivatedRoute,
	            private router: Router,
	            private store: Store<any>) {
		super(store, {});
	}

	onInit() {
		this._subscriptions([
			this.activatedRoute.params
				.subscribe(params => {
					let itemId = +params['id'];
					this.courseService.getCourse(itemId);

				}),
			this.store.select('courseDetail')
				.subscribe((item: CourseItem) => {
					if (item) {
						this.item = item;
					}
				})
		]);
	}

	onDestroy() {
	}

	back($event) {
		$event.preventDefault();
	}

	updateCourse(value) {
		Object.assign(this.item, value);
		console.log(this.item)
		this._subscription(
			this.courseService.updateCourse(this.item)
				.subscribe(res => {
					if (res) {
						this.goToList();
					}
				})
		);
	}

	goToList() {
		this.router.navigate(['courses']);
	}
}
