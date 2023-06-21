import { Component, OnInit } from '@angular/core';
import { ITeam } from '../entities/team/team.model';
import { TeamService } from '../entities/team/service/team.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-current-team',
  templateUrl: './current-team.component.html',
  styleUrls: ['../tasks/tasks.component.css']
})
export class CurrentTeamComponent implements OnInit {

  team: ITeam = this.teamService.getTeam();
  teamName: string = this.team.name;
  faPlus = faPlus;

  
  constructor(protected teamService: TeamService) {

   }

  ngOnInit(): void {

  }

}
