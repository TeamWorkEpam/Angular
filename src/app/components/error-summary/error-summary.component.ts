import { Component, ViewEncapsulation } from '@angular/core';
import { SummaryError } from './summary-error';

@Component({
	selector: 'error-summary',
	styleUrls: [
		'./error-summary.css'
	],
	template: `
	    <div class="error-block" *ngIf="errors?.length">
           <div class="error-block__error-message" *ngFor="let error of errors">
               <i>{{error.message}}</i>
           </div>
	    </div>
    `,
	inputs: ['errors'],
	encapsulation: ViewEncapsulation.None,
})
export class ErrorSummaryComponent {
	errors: SummaryError[];
}
