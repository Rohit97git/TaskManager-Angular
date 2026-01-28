import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskManagerComponent } from './taskmanager/taskmanager';

@Component({
  selector: 'app-root',
  imports: [TaskManagerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('taskManager');
}
