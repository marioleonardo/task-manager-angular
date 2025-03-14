import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
standalone: false,  
    selector: 'app-task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
    task: Task | null = null;
    editing = false;
    private routeSubscription: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private taskService: TaskService,
        public router: Router
    ) {}

    ngOnInit(): void {
        this.routeSubscription = this.route.paramMap
            .pipe(
                switchMap(params => {
                    const id = params.get('id');
                    return id ? this.taskService.getTask(id) : of(null);
                })
            )
            .subscribe(task => {
                this.task = task ?? null;
                if (!this.task) {
                    // Redirect to list if task not found
                    this.router.navigate(['/']);
                }
            });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

    toggleEdit(): void {
        this.editing = !this.editing;
    }

    onTaskUpdated(): void {
        this.editing = false;
        // Optionally, handle any additional logic after updating the task
    }
}
