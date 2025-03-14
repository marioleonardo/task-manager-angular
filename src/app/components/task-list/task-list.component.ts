import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Subscription } from 'rxjs';

@Component({
  standalone: false,

  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private tasksSubscription: Subscription | undefined;
  filter: 'all' | 'completed' | 'incomplete' = 'all'; // Add filter property

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.tasksSubscription = this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }
  // Method to filter tasks based on the selected filter
  get filteredTasks(): Task[] {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'incomplete') {
      return this.tasks.filter(task => !task.completed);
    } else {
      return this.tasks; // 'all'
    }
  }

  onDeleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  onToggleCompleted(id: string): void {
        this.taskService.toggleCompleted(id);
    }
  // Add a trackBy function to improve performance
  trackByFn(index: number, task: Task): string {
    return task.id;
  }
}