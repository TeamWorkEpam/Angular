import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FORM_PROVIDERS } from '@angular/forms';

import { App } from './app.component';

export * from './app.component';
export * from './app.routes';
import { provideStore } from '@ngrx/store';

import { routing, appRoutingProviders } from './app.routes';
import { AppActions } from './app.actions';
import { AuthService, CourseService } from './services';
import { LoggedInGuard } from './guards';
import { auth, errors, items, courseDetail } from './reducers';

export const APP_PROVIDERS = [
	AppActions,
	AuthService,
	CourseService,
	LoggedInGuard,
];

import { AddCourseComponent } from './pages/add-course';
import { LoginComponent } from './pages/login';
import { CourseDetails } from './pages/course-details';
import { CourseList } from './pages/course-list';
import { HeaderComponent } from './pages/header';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [App],
	declarations: [
		App,
		CourseDetails,
		AddCourseComponent,
		LoginComponent,
		CourseList,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	providers: [

		APP_PROVIDERS,
		appRoutingProviders,
		FormBuilder,
		FORM_PROVIDERS,
		provideStore({
			auth,
			errors,
			items,
			courseDetail
		})
	]
})
export class AppModule {
}
