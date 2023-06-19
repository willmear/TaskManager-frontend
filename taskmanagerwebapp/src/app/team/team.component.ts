import { Component, OnInit } from '@angular/core';
import { TeamService } from '../entities/team/service/team.service';
import { HttpResponse } from '@angular/common/http';
import { ITeam } from '../entities/team/team.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTeamComponent } from './dialogs/create-team/create-team.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: ITeam[];
  team: any;
  faPlus = faPlus;
  

  constructor(protected teamService: TeamService, protected modalService: NgbModal, private router: Router) {
    this.teams = [];
  }

  ngOnInit(): void {
    this.teamService.query().subscribe((res: HttpResponse<ITeam[]>) => this.onTeamSuccess(res.body));
  }


  addTeam(team: ITeam): void {
    this.team.addTeam({
      id: team.id,
      name: team.name,
      members: team.members,
      admin: team.admin,
    });
  }

  onTeamSuccess(teams: ITeam[] | null): void {
    this.teams = teams || [];
    this.teams.forEach(team => this.addTeam(team));
  }

  teamModal(): void {
    const modalRef = this.modalService.open(CreateTeamComponent, { size: 'lg', backdrop: 'static', centered: true, keyboard: true });
    modalRef.result.then(res => {
      this.ngOnInit();
    })
  }

  onSelectedTeam(team: ITeam): void {
    this.teamService.setTeam(team);
    this.router.navigate(['/team', team.id]);
  }
}
