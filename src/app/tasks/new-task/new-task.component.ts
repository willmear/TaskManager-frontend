import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from 'src/app/entities/task/service/task.service';
import { ITask, NewTask } from 'src/app/entities/task/task.model';
import { TeamService } from 'src/app/entities/team/service/team.service';
import { ITeam } from 'src/app/entities/team/team.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css', '../../current-team/current-team.component.css', '../tasks.component.css']
})
export class NewTaskComponent implements OnInit {

  team: ITeam = this.teamService.getTeam();
  teamName: string = this.team.name;
  faPlus = faPlus;

  constructor(protected teamService: TeamService, protected taskService: TaskService, protected router: Router) { }

  ngOnInit(): void {
      
  }

  createTask(task: NewTask): void {
    console.log(task);
    task.teamId = this.team.id;
    this.taskService.create(task).subscribe(res => {
      console.log(res);
    });
    this.ngOnInit();
    this.router.navigate(['/tasks']);
  }

}
