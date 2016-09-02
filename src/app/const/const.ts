import * as moment from 'moment';
import { CourseItem } from '../services';

export let dateFormat: string = 'DD.MM.YYYY';
export let errorMessage: Object = {
	pattern: {
		login: 'Поле «Логин» может содержать, только латинские буквы.',
		password: 'Поле «Пароль» может содержать, латинские буквы и цифры.'
	}
};
export let defaultCourseValue: CourseItem = {
	id: null,
	date: moment(),
	name: 'New course',
	description: 'New description',
	duration: ''
};
export let notificationMessage: any = {
	messageForDeleteCourse: 'Вы уверены, что хотите удалить курс',
	backToCourses: 'Do you want to leave without save?'
};
