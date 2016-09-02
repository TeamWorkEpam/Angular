import { Component, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CourseItem } from './../../../services';
import { CourseItemComponent } from './course-item/course-item.component';

@Component({
	selector: 'items-list',
	template: `
       <div class="items">
            <todo-item *ngFor="let item of items" 
                [item]="item"
                (delete)="delete.emit(item)"
                (edit)="edit.emit(item.id)">
            </todo-item>
        </div>
    `,
	inputs: ['items'],
	outputs: ['edit', 'delete'],
	directives: [CourseItemComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsListComponent {
	items: CourseItem[];
	edit: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();
	delete: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();
}
