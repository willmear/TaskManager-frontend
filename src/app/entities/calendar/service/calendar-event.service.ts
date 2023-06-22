import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICalendarEvent, NewCalendarEvent } from '../calendar-event.model';

export type EntityResponseType = HttpResponse<ICalendarEvent>;
export type EntityArrayResponseType = HttpResponse<ICalendarEvent[]>;

@Injectable({
  providedIn: 'root'
})
export class CalendarEventService {

  protected resourceUrl = "https://tskmngrbckend.website/api/v1/calendar-event";

  constructor(protected http: HttpClient) { }

  query(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<ICalendarEvent[]>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  create(calendarEvent: NewCalendarEvent): Observable<EntityResponseType> {
    return this.http.post<ICalendarEvent>(this.resourceUrl, calendarEvent, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
