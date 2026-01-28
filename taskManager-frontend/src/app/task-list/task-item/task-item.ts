import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../../models/tasks.model';
import { TaskCommentsComponent } from './task-comments-component/task-comments-component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [TaskCommentsComponent],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItemComponent {
  @Input() task!: TaskModel;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
