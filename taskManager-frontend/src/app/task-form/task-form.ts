import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../models/tasks.model';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskFormComponent {
  @Input() task!: TaskModel;
  @Input() isEditing = false;
  @Output() submitTask = new EventEmitter<TaskModel>();
}
