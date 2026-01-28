import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../models/tasks.model';
import { TaskServices } from '../services/task-services';
import { TaskHeaderComponent } from '../task-header/task-header';
import { TaskFormComponent } from '../task-form/task-form';
import { TaskFilterComponent } from '../task-filter/task-filter';
import { TaskListComponent } from '../task-list/task-list';
@Component({
  selector: 'app-taskmanager',
  standalone: true,
  imports: [
    CommonModule,
    TaskHeaderComponent,
    TaskFormComponent,
    TaskFilterComponent,
    TaskListComponent,
    FormsModule,
  ],
  templateUrl: './taskmanager.html',
  styleUrl: './taskmanager.css',
})
export class TaskManagerComponent implements OnInit {
  tasks: TaskModel[] = [];
  filteredTask: TaskModel[] = [];
  searchTitle = '';

  priorityOrder = { high: 1, medium: 2, low: 3 };
  //Filters
  sortBy: 'priority' | 'status' = 'priority';
  filterStatus: 'all' | 'active' | 'completed' = 'all';

  //taskForm
  taskForm: TaskModel = {
    title: '',
    description: '',
    priority: 'medium',
    status: 'active',
  };

  editingTask: number | null = null;
  errorMsg = '';
  isLoading = false;
  //DI
  constructor(private taskService: TaskServices) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Error Loading Tasks';
        this.isLoading = false;
      },
    });
  }

  //Add Task
  addTask(name: string): void {
    if (!name.trim()) return;

    const newTask: TaskModel = {
      title: name,
      description: '',
      priority: 'medium',
      status: 'active',
    };
    console.log(newTask);

    this.taskService.addTask(newTask).subscribe({
      next: () => this.loadTasks(),
      error: () => (this.errorMsg = 'Create Failed'),
    });
  }

  //toggleTask
  toggleTask(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTasks: TaskModel = {
      ...task,
      status: task.status === 'active' ? 'completed' : 'active',
    };

    this.taskService.updateTask(updatedTasks).subscribe({
      next: () => this.loadTasks(),
      error: () => (this.errorMsg = 'Update Failed!'),
    });
  }

  //Filter Logic

  applyFilter(): void {
    let result = [...this.tasks];

    //Filter by Title
    if (this.searchTitle) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(this.searchTitle.toLowerCase()),
      );
    }

    //Filter by status
    if (this.filterStatus !== 'all') {
      result = result.filter((task) => task.status === this.filterStatus);
    }

    //Sorting
    result.sort((a, b): number =>
      this.sortBy === 'priority'
        ? this.priorityOrder[a.priority] - this.priorityOrder[b.priority]
        : a.status.localeCompare(b.status),
    );
    this.filteredTask = result;
  }

  submitTask(): void {
    if (!this.taskForm.title.trim()) return;

    if (this.editingTask) {
      const updatedTask = { ...this.taskForm, id: this.editingTask };

      this.taskService.updateTask(updatedTask).subscribe({
        next: () => this.loadTasks(),
        error: () => (this.errorMsg = 'Update Failed'),
      });
    } else {
      this.taskService.addTask(this.taskForm).subscribe({
        next: () => this.loadTasks(),
        error: () => (this.errorMsg = 'Create Failed'),
      });
    }
    this.resetForm();
  }

  editTask(task: TaskModel): void {
    this.taskForm = { ...task };
    this.editingTask = task.id!;
  }

  deleteTask(task: TaskModel): void {
    const confirmed = window.confirm(`Are you sure you want to delelte "${task.title}"?`);
    if (!confirmed) return;

    this.taskService.deleteTask(task.id!).subscribe({
      next: () => this.loadTasks(),
      error: () => (this.errorMsg = 'Delete Failed!'),
    });
  }

  //Reset Form
  resetForm(): void {
    this.taskForm = {
      title: '',
      description: '',
      priority: 'medium',
      status: 'active',
    };
    this.editingTask = null;
  }

  onFilterChange(filters: {
    searchTitle: string;
    filterStatus: 'all' | 'active' | 'completed';
    sortBy: 'priority' | 'status';
  }) {
    this.searchTitle = filters.searchTitle;
    this.filterStatus = filters.filterStatus;
    this.sortBy = filters.sortBy;
    this.applyFilter();
  }
  //Increase the count
  // increase() {
  //   this.count.update((v) => v + 1);
  // }
}
