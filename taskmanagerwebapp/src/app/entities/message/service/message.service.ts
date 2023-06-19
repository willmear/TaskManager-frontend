import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage, NewMessage } from '../message.model';
import { Observable } from 'rxjs/internal/Observable';

export type EntityResponseType = HttpResponse<IMessage>;
export type EntityArrayResponseType = HttpResponse<IMessage[]>;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  protected resourceUrl = "http://localhost:8080/api/v1/discussion";


  constructor(protected http: HttpClient) { }

  create(message: NewMessage, teamId: number): Observable<EntityResponseType> {
    return this.http.post<IMessage>(`${this.resourceUrl}/${teamId}`, message, { observe : 'response' });
  }

  query(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IMessage[]>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
