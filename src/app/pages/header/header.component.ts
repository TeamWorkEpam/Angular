import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppActions } from '../../app.actions';

import { CourseService } from '../../services/todo.service';
import { AuthService } from '../../services';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { PageComponent } from '../../components/page.component';

@Component({
	selector: 'header-component',
	encapsulation: ViewEncapsulation.None,

	template: `
        <header>
            ToDo Application Header
            <div class="user" *ngIf="userInfo.isLogged">
                <div class="user-info">Имя пользователя: {{userInfo.name}}</div>
            	<button (click)="logOff()">Выйти</button>
			</div>	

			<breadcrumbs-component></breadcrumbs-component>
        </header>

    `,
	directives: [ROUTER_DIRECTIVES, Breadcrumbs]
})
export class HeaderComponent implements OnInit {
	userInfo: any;

	constructor(private authService: AuthService,
	            private store: Store<any>,
	            private router: Router) {}

	ngOnInit() {
		Observable.combineLatest(
			this.store.select('auth')
		)
			.subscribe(([auth]) => {
				this.userInfo = auth;
			});
		this.authService.getUserInfo();

	}

	logOff() {
		this.authService.logOff();
		this.router.navigate(['login']);
	}
}
