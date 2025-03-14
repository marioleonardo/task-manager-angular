import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks: Task[] = [];
  public tasksSubject = new BehaviorSubject<Task[]>([]);
  public storageKey = 'tasks';

  constructor() {
    this.loadTasks();
   }

   public loadTasks() {
    const storedTasks = localStorage.getItem(this.storageKey);
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.tasksSubject.next([...this.tasks]);  // Emit a copy
  }

   public saveTasks() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
        this.tasksSubject.next([...this.tasks]); // Emit a copy
    }

    public getTasks(): Observable<Task[]> {
        return this.tasksSubject.asObservable();
    }

    public getTask(id: string): Observable<Task | undefined> {
        const task = this.tasks.find(t => t.id === id);
        return of(task);
    }

    public addTask(task: Task): void {
        this.tasks.push(task);
        this.saveTasks();
    }

    public updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveTasks();
    }
  }

  public deleteTask(id: string): void {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
    }

    public toggleCompleted(id: string): void {
      const task = this.tasks.find(t => t.id === id);
      if(task) {
        task.completed = !task.completed;
        this.saveTasks();
      }
    }
}