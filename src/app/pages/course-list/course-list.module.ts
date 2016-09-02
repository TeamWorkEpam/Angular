import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';
import { FORM_PROVIDERS } from '@angular/forms';
import { courseListRouting } from './course-list.routes';

import { CourseDetails } from './../course-details';
import { CourseList } from './../course-list';
import { AddCourseComponent } from './../add-course';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		courseListRouting
	],
	declarations: [
		CourseDetails,
		AddCourseComponent,
		CourseList
	],
	providers: [
		FormBuilder,
		FORM_PROVIDERS,
	],
})
export class CoursesModule {}
