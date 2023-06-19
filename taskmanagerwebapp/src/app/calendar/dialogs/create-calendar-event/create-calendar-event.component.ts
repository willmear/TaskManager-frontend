import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICalendarEvent, NewCalendarEvent } from 'src/app/entities/calendar/calendar-event.model';
import { CalendarEventService } from 'src/app/entities/calendar/service/calendar-event.service';
import { TeamService } from 'src/app/entities/team/service/team.service';
import { ITeam } from 'src/app/entities/team/team.model';

@Component({
  selector: 'app-create-calendar-event',
  templateUrl: './create-calendar-event.component.html',
  styleUrls: ['./create-calendar-event.component.css']
})
export class CreateCalendarEventComponent implements OnInit {

  team: ITeam = this.teamService.getTeam()
  dateError: string = "Start date must be before end date";
  dateErrorVisible: boolean = false;

  constructor(protected activeModal: NgbActiveModal, protected teamService: TeamService, protected calendarEventService: CalendarEventService) { }

  ngOnInit(): void {}

  close(): void {
    this.activeModal.close();
  }

  createCalendarEvent(event: NewCalendarEvent): void {
    if(event.startDate > event.endDate) {
      this.dateErrorVisible = true;
      return;
    } else {
      this.dateErrorVisible = false;
    }
    event.id = null;
    event.team = { id: this.team.id };

    this.calendarEventService.create(event).subscribe(res => {
      console.log(res);
      this.close();
    });

    console.log(event);

  }

}
