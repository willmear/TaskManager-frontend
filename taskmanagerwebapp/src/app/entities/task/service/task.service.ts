import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetTask, ITask, NewTask, UpdateTask } from '../task.model';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<ITask>;
export type EntityArrayResponseType = HttpResponse<ITask[]>;


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  protected resourceUrl = "http://localhost:8080/api/v1/task";

  constructor(protected http: HttpClient) { }

  create(task: NewTask): Observable<EntityResponseType> {
    return this.http.post<ITask>(`${this.resourceUrl}`, task, { observe : 'response' });
  }

  query(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<ITask[]>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  queryOpen(id: number): Observable<HttpResponse<GetTask[]>> {
    return this.http.get<GetTask[]>(`${this.resourceUrl}/${id}/open`, { observe: 'response' });
  }

  queryClosed(id: number): Observable<HttpResponse<GetTask[]>> {
    return this.http.get<GetTask[]>(`${this.resourceUrl}/${id}/closed`, { observe: 'response' });
  }

  queryAll(id: number): Observable<HttpResponse<GetTask[]>> {
    return this.http.get<GetTask[]>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  find(teamId: number, taskId: number): Observable<HttpResponse<GetTask>> {
    return this.http.get<GetTask>(`${this.resourceUrl}/${teamId}/${taskId}`, { observe: 'response' });
  }

  update(teamId: number, taskId: number, task: UpdateTask): Observable<HttpResponse<UpdateTask>> {
    return this.http.put<UpdateTask>(`${this.resourceUrl}/update/${teamId}/${taskId}`, task, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
