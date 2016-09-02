import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { dateFormat } from '../const/const';

export function dateValidator() {
	return function (ctrl: FormControl) {
		let date: string = ctrl.value;
		let dateIsValid = moment(date, dateFormat, true).isValid();
		if (!dateIsValid) {
			return {
				validateDate: false
			};
		}
		return null;
	};
}
