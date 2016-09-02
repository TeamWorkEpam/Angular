import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import * as _ from 'lodash';

import { BreadcrumbPipe } from '../../pipes/breadcrumb.pipe';

@Component({
	selector: 'breadcrumbs-component',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./breadcrumbs.css'
	],

	template: `
        <div *ngIf="breadcrumbs">
            <a routerLink="{{breadcrumb}}" 
               class="breadcrumbs__item" 
               *ngFor="let breadcrumb of breadcrumbs.previousUrl">{{breadcrumb | getBreadcrumbName}}
            </a> 
            <a class="breadcrumbs__item--current">{{breadcrumbs.currentUrl | getBreadcrumbName}}</a>
		</div>
    `,
	pipes: [BreadcrumbPipe],
	directives: [ROUTER_DIRECTIVES]
})
export class Breadcrumbs implements OnInit {
	breadcrumbs: Object;

	constructor(private router: Router) {
	}

	ngOnInit() {
		this.router.events
			.subscribe(params => {
				let url = params.url.split('/');
				let currentUrl = _.get(url, url.length - 1);
				let previousUrl = _.filter(url, o => { return o !== currentUrl && o !== ''; });
				this.breadcrumbs = {
					previousUrl: previousUrl,
					currentUrl: currentUrl
				};
			});
	}
}
