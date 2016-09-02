import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'duratioFormat' })
export class DurationPipe implements PipeTransform {
	transform(value: number): string {
		let hour = Math.floor(value / 60);
		let min = value % 60;
		let duration =
			(hour ? moment.duration(hour, 'hours').humanize() : '')
			+ ' ' +
			(min ? moment.duration(min, 'minutes').humanize() : '');
		return duration;
	}
}
@Pipe({ name: 'dateFormat' })
export class DateFormat implements PipeTransform {
	transform(value: string, format: string): string {
		console.log('format', format)
		return moment(new Date(value)).format(format);
	}
}
