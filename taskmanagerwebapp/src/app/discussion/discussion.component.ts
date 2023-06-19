import { Component, OnInit } from '@angular/core';
import { ITeam } from '../entities/team/team.model';
import { TeamService } from '../entities/team/service/team.service';
import { faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '../entities/message/service/message.service';
import { IMessage, NewMessage } from '../entities/message/message.model';
import { HttpResponse } from '@angular/common/http';
import { UserService } from '../entities/user/service/user.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css', '../current-team/current-team.component.css', '../tasks/tasks.component.css']
})
export class DiscussionComponent implements OnInit{

  team: ITeam = this.teamService.getTeam();
  teamName: string = this.team.name;
  faPlus = faPlus;
  faPaperPlane = faPaperPlane;
  messages: IMessage[] = [];

  constructor(protected teamService: TeamService, protected messageService: MessageService, protected userService: UserService) { }

  ngOnInit(): void {
    this.messageService.query(this.team.id).subscribe((res: HttpResponse<IMessage[]>) => this.onMessageSuccess(res.body));
      
  }

  sendMessage(message: NewMessage): void {
    this.messageService.create(message, this.team.id).subscribe(res => {
      console.log(res);
    });
    this.ngOnInit();
  }

  onMessageSuccess(message: IMessage[] | null): void {
    this.messages = message || [];
  }

}
