import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services';
import { Store } from '@ngrx/store';
import { ErrorSummaryComponent } from '../../components/error-summary';
import { Observable } from 'rxjs';
import { Error } from '../../services';

@Component({
	selector: 'login',
	styleUrls: ['./login.css'],
	templateUrl: './login.html',
	encapsulation: ViewEncapsulation.None,
	directives: [ErrorSummaryComponent, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
})
export class LoginComponent implements OnInit{
	login: string = '';
	password: string = '';
	loginForm: FormGroup;
	errors: Error[];

	constructor(private authService: AuthService,
	            private router: Router,
	            private fb: FormBuilder,
	            private store: Store<any>) {
	}

	ngOnInit() {
		this.loginForm = this.fb.group({});
		Observable.combineLatest(
			this.store.select('errors'),
		)
		.subscribe(([error]) => {
			this.errors = error as Error[];
		});
		this.initializeForm();
	}

	initializeForm() {
		this.loginForm = this.fb.group({
			'login': [
				this.login,
				[
					Validators.pattern('[A-Za-z]+'),
					Validators.required
				]
			],
			'password': [
				this.password,
				[
					Validators.pattern('[A-Za-z0-9]+'),
					Validators.required
				]
			]

		});
	}

	onSubmit() {
		if (this.loginForm.valid) {
			this.logIn();
		}
		return false;
	}

	logIn() {
		this.authService.logIn(this.login, this.password);
		Observable.combineLatest(
			this.store.select('auth'),
		)
			.subscribe(([auth]) => {
				if (auth) {
					this.router.navigate(['courses']);
				}

		});
	}
}
