import { Component, OnInit } from '@angular/core';
import { ITeam } from '../entities/team/team.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TeamService } from '../entities/team/service/team.service';
import { Calendar, CalendarOptions } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ICalendarEvent } from '../entities/calendar/calendar-event.model';
import { CalendarEventService } from '../entities/calendar/service/calendar-event.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCalendarEventComponent } from './dialogs/create-calendar-event/create-calendar-event.component';
import { CalendarEventClickComponent } from './dialogs/calendar-event-click/calendar-event-click.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css', '../tasks/tasks.component.css']
})
export class CalendarComponent implements OnInit {

  team: ITeam = this.teamService.getTeam();
  teamName: string = this.team.name;
  faPlus = faPlus;

  calendar: any;
  events: ICalendarEvent[] = [];
  

  constructor(protected teamService: TeamService, protected calendarEventService: CalendarEventService, protected modalService: NgbModal) {}

  ngOnInit(): void {
    let calendarEl: HTMLElement = document.getElementById('calendar')!;
    this.calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      eventClick: this.CalendarEventClick,
      eventMouseEnter(arg) {
        arg.el.style.cursor = 'pointer';
      },

    });

    this.calendarEventService.query(this.team.id).subscribe((res: HttpResponse<ICalendarEvent[]>)  => this.onCalendarEventSuccess(res.body));

    this.calendar.render();
  }

  addCalendarEvent(calendarEvent: ICalendarEvent): void {
    this.calendar.addEvent({
      id: calendarEvent.id,
      title: calendarEvent.title,
      start: calendarEvent.startDate,
      end: calendarEvent.endDate,
      description: calendarEvent.description,
      taskId: calendarEvent.taskId,
      allDay: true,
    });
  }

  onCalendarEventSuccess(calendarEvent: ICalendarEvent[] | null): void {
    this.events = calendarEvent || [];
    this.events.forEach(e => this.addCalendarEvent(e));
  }

  createCalendarEvent(): void {
    const modalRef = this.modalService.open(CreateCalendarEventComponent, { size: 'lg', backdrop: 'static', centered: true, keyboard: true });
    modalRef.result.then(res => {
      this.ngOnInit();
    });
  }

  CalendarEventClick = (info: any) => {
    const modalRef = this.modalService.open(CalendarEventClickComponent, { size: 'lg', backdrop: 'static', centered: true, keyboard: true });
    modalRef.componentInstance.event = {title: info.event.title, description: info.event.extendedProps.description, start: info.event.start, end: info.event.end, id: info.event.id, taskId: info.event.extendedProps.taskId};
    modalRef.result.then(res => {
      this.ngOnInit();
    });
  }


}
