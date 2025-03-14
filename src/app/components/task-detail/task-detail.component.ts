import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  task: Task | null = null;
  private routeSubscription: Subscription = new Subscription;
  editing = false; // Add an editing flag


  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    public router: Router
  ) {}

    ngOnInit(): void {
      this.routeSubscription = this.route.paramMap.pipe(
        switchMap(params => {
          const id = params.get('id');
          if (id) {
            return this.taskService.getTask(id);
          } else {
            return [null]; // Return an observable with null if no id
          }
        })
      ).subscribe(task => {
          this.task = task || null; // Handle potential undefined task
          if (!this.task) {
              // Optionally navigate back or show an error if task not found
            this.router.navigate(['/']); // Redirect to list if no task
          }
      });
    }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

    onTaskUpdated(): void {
        this.editing = false; // Turn off editing mode after update
        // No need to refetch; the service updates the shared data
    }
      toggleEdit(): void {
        this.editing = !this.editing;
    }
}