import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [],
  templateUrl: './task-header.html',
  styleUrl: './task-header.css',
})
export class TaskHeaderComponent {
  @Input() count = 0;
  @Input() error = '';
}
