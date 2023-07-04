import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { TeamService } from 'src/app/entities/team/service/team.service';
import { NewTeam } from '../../../entities/team/team.model';
import { NewUser } from '../../../entities/user/user.model';


@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  faUserPlus = faUserPlus;
  currentMembers: number = 0;
  fields:any;
  errorMessage: string = '';

  constructor(protected activeModal: NgbActiveModal, protected teamService: TeamService) {
    this.fields = Array(this.currentMembers).fill(this.currentMembers);

  }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close();
  }


  // FIX THIS CRAP WITH A DROPDOWN CHECKBOX MENU
  // USE TEAM MODEL TO CREATE TEAM


  onTeamCreate(team: {id:null, name: string, member0?: string, member1?: string, member2?: string, member3?: string, member4?: string,
    member5?: string, member6?: string, member7?: string, member8?: string, member9?: string,}): void {
      const {name, id, ...membersObject} = team;
      const Team: NewTeam = { id: null, name: team.name, members: Object.values(membersObject)}

      if (Team.name.length < 1) {
        this.errorMessage = 'Team name cannot be empty';
        return;
      }

      this.teamService.create(Team).subscribe({
        next: data => {
          console.log(data);
          this.close();
        },
        error: error => {
          if(error.status == 400) {
            this.errorMessage = 'Team name already exists'
            return;
          }
          if(error.status == 404) {
            this.errorMessage = 'One or more users do not exist'
            return;
          }
        }
        
      });
  }

  addMemberField(): void {
    if(this.currentMembers == 10) {
      return;
    } 
    this.currentMembers++;
    this.fields = Array(this.currentMembers).fill(this.currentMembers);

  }

}

