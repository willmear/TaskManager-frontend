import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEventService } from 'src/app/entities/calendar/service/calendar-event.service';

@Component({
  selector: 'app-calendar-event-click',
  templateUrl: './calendar-event-click.component.html',
  styleUrls: ['./calendar-event-click.component.css']
})
export class CalendarEventClickComponent implements OnInit {

  event: any;
  faArrow = faArrowUpRightFromSquare;

  constructor(protected activeModal: NgbActiveModal, protected calendarEventService: CalendarEventService, protected router: Router) { }

  ngOnInit(): void {
    
  }

  close(): void {
    this.activeModal.close();
  }

  onDelete(): void {
    this.calendarEventService.delete(this.event.id).subscribe(() => this.activeModal.close());
  }

  onViewTask(): void {
    this.activeModal.close();
    this.router.navigate(['/tasks', this.event.taskId,]);
  }

}

