import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item';
import { TaskModel } from '../models/tasks.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskListComponent {
  @Input() tasks: TaskModel[] = [];
  @Output() edit = new EventEmitter<TaskModel>();
  @Output() delete = new EventEmitter<TaskModel>();
}
