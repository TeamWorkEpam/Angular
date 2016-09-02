import { Pipe, PipeTransform } from '@angular/core';

const breadcrumbs = {
	courses: 'Курсы',
	add: 'Добавление курса',
	details: 'Курс'
};

@Pipe({ name: 'getBreadcrumbName' })
export class BreadcrumbPipe implements PipeTransform {
	transform(value: string): string {
		return breadcrumbs[value];
	}
}

