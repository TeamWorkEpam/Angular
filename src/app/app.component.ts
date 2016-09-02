import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { CourseService } from './services/todo.service';
import { BreadcrumbPipe } from './pipes/breadcrumb.pipe';
import { HeaderComponent } from './pages/header';

@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./app.style.css'
	],

	template: `
		<header-component></header-component>
        <main>
            <router-outlet></router-outlet>
        </main>
        <footer>
            Footer 2016 
        </footer>
    `,
	providers: [
		CourseService
	],
	pipes: [BreadcrumbPipe],
	directives: [ROUTER_DIRECTIVES, HeaderComponent]
})
export class App {

	constructor() {
	}



}
