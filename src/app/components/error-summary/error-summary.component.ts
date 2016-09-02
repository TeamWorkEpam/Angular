import { Component, ViewEncapsulation } from '@angular/core';
import { SummaryError } from './summary-error';

@Component({
	selector: 'error-summary',
	styleUrls: [
		'./error-summary.css'
	],
	template: `
	    <div class="error-block" *ngIf="error.error">
           <div class="error-block__error-message" >
               <i>{{error.message}}</i>
           </div>
	    </div>
    `,
	inputs: ['error'],
	encapsulation: ViewEncapsulation.None,
})
export class ErrorSummaryComponent {
	error: SummaryError[];
}
