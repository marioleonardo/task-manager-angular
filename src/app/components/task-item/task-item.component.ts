import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  standalone: false,

  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input()
  task!: Task;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() toggleCompleted = new EventEmitter<string>();

  onDeleteClick(): void {
    this.deleteTask.emit(this.task.id);
  }

  onCheckboxChange(): void {
    this.toggleCompleted.emit(this.task.id)
  }
}