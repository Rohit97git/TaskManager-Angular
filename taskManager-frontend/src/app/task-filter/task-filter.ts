import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css',
})
export class TaskFilterComponent {
  @Input() searchTitle = '';
  @Input() filterStatus: 'all' | 'active' | 'completed' = 'all';
  @Input() sortBy: 'priority' | 'status' = 'priority';

  @Output() filterChange = new EventEmitter<{
    searchTitle: string;
    filterStatus: 'all' | 'active' | 'completed';
    sortBy: 'priority' | 'status';
  }>();
}
