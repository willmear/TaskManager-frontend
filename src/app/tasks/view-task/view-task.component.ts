import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from 'src/app/entities/task/service/task.service';
import { UpdateTask } from 'src/app/entities/task/task.model';
import { TeamService } from 'src/app/entities/team/service/team.service';
import { ITeam } from 'src/app/entities/team/team.model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css', '../tasks.component.css']
})
export class ViewTaskComponent implements OnInit {

  team: ITeam = this.teamService.getTeam();
  teamName: string = this.team.name;
  faPlus = faPlus;
  id: string | null = null;
  task: any;
  title: string = "";
  timeSinceCreated: any;
  editting: boolean = false;

  constructor(protected teamService: TeamService, protected route: ActivatedRoute, protected taskService: TaskService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.taskService.find(this.team.id, Number(this.id)).subscribe(res => {
      this.task = res.body;
      this.title = this.task.title;
      this.task.dueDate = new Date(this.task.dueDate).toISOString().split('T')[0];
      this.timeSinceCreated = this.getTimeSinceCreated(this.task.startDate);
    });
  }

  getTimeSinceCreated(startDate: number): number {
    var timeNow = new Date();
    var startDates = new Date(startDate);
    return Math.ceil(Math.abs(timeNow.getTime() - startDates.getTime()) / (1000 * 3600 * 24))-1;
  }

  onEdit(): void {
    this.editting=true;
  }

  updateTask(task: UpdateTask): void {
    if (task.status == "") {
      task.status = this.task.status;
    }
    if(!task.assignee) {
      task.assignee = this.task.assignee.id;
    }
    if(!task.dueDate) {
      task.dueDate = this.task.dueDate;
    }
    if(task.description == "") {
      task.description = this.task.description;
    }
    if(task.title == "") {
      task.title = this.task.title;
    }
    if (task.priority == "") {
      task.priority = this.task.priority;
    }
    task.id = this.task.id;
    task.startDate = this.task.startDate;
  

    this.taskService.update(this.team.id, this.task.id, task).subscribe(res => {
      console.log(res.body);
    });

  }

}
