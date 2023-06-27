import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITeam } from '../team.model';
import { NewTeam } from '../team.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export type EntityResponseType = HttpResponse<ITeam>;
export type EntityArrayResponseType = HttpResponse<ITeam[]>;

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  protected resourceUrl = `${environment.apiUrl}/teams`;

  constructor(protected http: HttpClient) { }

  create(team: NewTeam): Observable<any> {
    return this.http.post<ITeam>(`${this.resourceUrl}/new-team`, team, { observe : 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http.get<ITeam[]>(`${this.resourceUrl}`, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITeam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  public setTeam(team: ITeam): void {
    localStorage.setItem('team', JSON.stringify(team));
  }

  public getTeam(): ITeam {
    const team = localStorage.getItem('team')
    return (JSON.parse(team || '{}'));
  }

}
