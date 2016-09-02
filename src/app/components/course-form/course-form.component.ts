import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { CourseItem } from './../../services';
import { Router } from '@angular/router';

import { DateFormat } from '../../pipes/date.pipe';
import { OnlyNumbersDirective } from '../../directives/only-numbers';
import { dateValidator } from '../../validators/dateValidators';
import { defaultCourseValue, dateFormat }  from '../../const/const';

@Component({
	selector: 'course-form',
	styleUrls: [
		'./course-form.css'
	],
	templateUrl: './course-form.html',
	pipes: [DateFormat],
	directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, OnlyNumbersDirective],
	inputs: ['item', 'componentAction', 'courseActions'],
	outputs: ['edit', 'back', 'add']
})

export class CourseFormComponent implements OnInit, OnDestroy {
	item: CourseItem = defaultCourseValue;
	courseActions: any;
	courseForm: FormGroup;
	format: string = dateFormat;
	back = new EventEmitter<CourseItem>();
	edit = new EventEmitter<CourseItem>();
	add = new EventEmitter<CourseItem>();
	notification: any;

	constructor(private fb: FormBuilder,
	            private router: Router) {
	}

	ngOnInit() {
		this.courseForm = this.fb.group({});
		this.initializeForm();
	}

	initializeForm() {
		this.courseForm = this.fb.group({
			'name': [
				this.item.name,
				[
					Validators.required
				]
			],
			'description': [
				this.item.description,
				[
					Validators.required
				]
			],
			'duration': [
				this.item.duration,
				[
					Validators.required
				]
			],
			'date': [
				this.item.date,
				[
					dateValidator()
				]
			]

		});
	}

	ngOnDestroy() {
	}

	onSubmit() {
		if (this.courseForm.valid) {
			this.edit.emit(this.courseForm.value);
			this.add.emit(this.courseForm.value);
		}
		return false;
	}

	openNotification() {
		this.notification = {};
		this.notification = {
			notificationText: 'Вы уверены, что хотите удалить курс',
		};
	}

	backToCourses(res: boolean) {
		this.notification = null;
		if (res) {
			this.router.navigate(['courses']);
		}

	}

}
