import { Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: false,

  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() taskToEdit: Task | null = null;
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false] // Initialize completed as false
    });
  }

    ngOnInit(): void {
        this.setupForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['taskToEdit']) {
          this.setupForm();
        }
    }
    private setupForm() {
        if (this.taskToEdit) {
            this.taskForm.setValue({
                title: this.taskToEdit.title,
                description: this.taskToEdit.description || '',
                completed: this.taskToEdit.completed
            });
        } else {
            this.taskForm.reset({ completed: false }); // Reset form, but ensure 'completed' is set
        }
    }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.taskToEdit) {
        // Update existing task
        const updatedTask: Task = {
          ...this.taskToEdit,
          ...this.taskForm.value
        };
        this.taskService.updateTask(updatedTask)
        this.taskUpdated.emit(updatedTask);

      } else {
        // Add new task
        const newTask: Task = {
          id: this.generateId(), // Use the id generation method
          ...this.taskForm.value
        };
        this.taskService.addTask(newTask)
        this.taskAdded.emit(newTask);
      }
      this.taskForm.reset({ completed: false }); // Reset the form after submission
      this.taskToEdit = null; // Clear taskToEdit after updating
    }
  }
    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}