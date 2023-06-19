import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TeamService } from '../entities/team/service/team.service';
import { ITeam } from '../entities/team/team.model';
import { Router } from '@angular/router';
import { TaskService } from '../entities/task/service/task.service';
import { HttpResponse } from '@angular/common/http';
import { GetTask, ITask } from '../entities/task/task.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  team: ITeam = this.teamService.getTeam();
  teamName: string = this.team.name;
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  task: any;
  tasks: GetTask[];

  constructor(protected teamService: TeamService, protected taskService: TaskService , protected router: Router) { 
    this.tasks = [];
  }

  ngOnInit(): void {
    this.onOpenClick();
  }
  
  addTask(task: GetTask): void {
    this.task.addTask({
      id: task.id,
      title: task.title,
      assignee: task.assignee,
      dueDate: task.dueDate,
      description: task.description,
      priority: task.priority,
      status: task.status,
      startDate: new Date(task.startDate).toISOString().split('T')[0],
    });
  }

  onTaskSuccess(task: GetTask[] | null): void {
    this.tasks = task || [];
    this.tasks.forEach(e => this.addTask(e));
  }

  navigateToCreateTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  onOpenClick(): void {
    this.taskService.queryOpen(this.team.id).subscribe((res: HttpResponse<GetTask[]>) => this.onTaskSuccess(res.body));
  }

  onClosedClick(): void {
    this.taskService.queryClosed(this.team.id).subscribe((res: HttpResponse<GetTask[]>) => this.onTaskSuccess(res.body)); 
  }

  onAllClick(): void {
    this.taskService.queryAll(this.team.id).subscribe((res: HttpResponse<GetTask[]>) => this.onTaskSuccess(res.body)); 
  }

  viewTask(id: number): void {
    this.router.navigate(['/tasks', id]);
  }

  onDeleteTask(id: number): void {
    console.log(id);
    this.taskService.delete(id).subscribe((res: HttpResponse<{}>) => {
      console.log(res);
    })
    this.ngOnInit();
  }


}
