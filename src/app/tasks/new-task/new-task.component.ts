import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from 'src/app/entities/task/service/task.service';
import { ITask, NewTask } from 'src/app/entities/task/task.model';
import { TeamService } from 'src/app/entities/team/service/team.service';
import { ITeam } from 'src/app/entities/team/team.model';
import { IUser } from 'src/app/entities/user/user.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css', '../../current-team/current-team.component.css', '../tasks.component.css']
})
export class NewTaskComponent implements OnInit {

  team: ITeam = this.teamService.getTeam();
  teamName: string = this.team.name;
  faPlus = faPlus;
  members: IUser[] = [];
  errorMessage = '';

  constructor(protected teamService: TeamService, protected taskService: TaskService, protected router: Router) { }

  ngOnInit(): void {

    this.teamService.getMembers(this.team.id).subscribe((res:HttpResponse<IUser[]>) => {
      this.members = res.body || [];
      console.log(this.members);
    });
      
  }

  createTask(task: NewTask): void {

    if (!task.title) {
      this.errorMessage = 'Please enter a title for the task';
      return;
    }
    if (!task.description) {
      this.errorMessage = 'Please enter a description for the task';
      return;
    }
    if (!task.priority) {
      this.errorMessage = 'Please enter a priority for the task';
      return;
    }
    if (!task.assignee) {
      this.errorMessage = 'Please select an assignee for the task';
      return;
    }
    if (!task.dueDate) {
      this.errorMessage = 'Please enter a due date for the task';
      return;
    }
    
    console.log(task);
    task.teamId = this.team.id;
    this.taskService.create(task).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/tasks']);
      },
      error: error => {
        if (error.status === 404) {
          this.errorMessage = 'Assignee not found';
        } else {
          this.errorMessage = 'Error creating task';
        }
      }
    });
  }

}
