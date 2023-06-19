import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CreateCalendarEventComponent } from './dialogs/create-calendar-event/create-calendar-event.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarEventClickComponent } from './dialogs/calendar-event-click/calendar-event-click.component';



@NgModule({
  declarations: [CalendarComponent, CreateCalendarEventComponent, CalendarEventClickComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule,
    FullCalendarModule,
    BrowserModule,
    FormsModule
  ],
  exports: [CalendarComponent],
})
export class CalendarModule { }
