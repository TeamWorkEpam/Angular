import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login';
import { CourseList } from './pages/course-list';
import { AddCourseComponent } from './pages/add-course';
import { CourseDetails } from './pages/course-details';
import { LoggedInGuard } from './guards';


export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'courses'
	},

	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'courses',
		canActivate: [LoggedInGuard],
		children: [
			{
				path: '',
				component: CourseList,
			},
			{
				path: 'details/:id',
				component: CourseDetails,
			},
			{
				path: 'add',
				component: AddCourseComponent,
			},
			{
				path: '**',
				redirectTo: ''
			},
		]
	},
	{
		path: '**',
		redirectTo: 'courses'
	},
];



export const appRoutingProviders: any[] = [

];
export const routing = RouterModule.forRoot(routes);
