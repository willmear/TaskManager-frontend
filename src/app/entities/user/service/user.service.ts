import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser, IUser, NewUser } from '../user.model';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<IUser>;
export type EntityArrayResponseType = HttpResponse<IUser[]>;



@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected resourceUrl = "http://18.132.170.53:5000//api/v1/auth";

  constructor(protected http: HttpClient,) { }

  register(user: NewUser): Observable<EntityResponseType> {
    return this.http.post<IUser>(`${this.resourceUrl}/register`, user, { observe: 'response' });
  }

  authenticate(user: AuthUser): Observable<HttpResponse<{access_token: string, refresh_token: string}>> {
    return this.http.post<any>(`${this.resourceUrl}/authenticate`, user, { observe: 'response' });
  }

  setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn() {
    return this.getToken();
  }

  clear() {
    localStorage.clear();
  }

  setCurrentlyLoggedIn(email: string) {
    localStorage.setItem('email', email);
  }

  getCurrentlyLoggedIn() {
    return localStorage.getItem('email');
  }

}
