import { Component, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CourseItem } from './../../../../services';
import { DurationPipe, DateFormat } from '../../../../pipes/date.pipe';
import { dateFormat } from '../../../../const/const';

@Component({
	selector: 'todo-item',
	styleUrls: [
		'./course-item.css'
	],
	template: `
        <div class="course">
            <div class="left">
                <a class="course__name" routerLink="details/{{item.id}}">
                   {{ item.name }}
                </a>
                <span class="course__duration">{{ item.duration | duratioFormat }}</span>
                <div class="course__date">{{ item.date | dateFormat: format }}</div>
                <div class="course__description">{{ item.description }}</div>
            </div>

            <div class="right">
                <button class="course__edit" (click)="edit.emit(item.id)">Редактировать</button>
                <button class="course__del" (click)="delete.emit(item)">Удалить</button>
            </div>

        </div>
    `,
	pipes: [DurationPipe, DateFormat],
	inputs: ['item'],
	outputs: ['delete', 'edit'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
	item: CourseItem;
	format: string = dateFormat;
	edit: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();
	delete: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();
}
