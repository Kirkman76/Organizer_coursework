import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddUser } from './models/add-user.model';
import { LoginUser } from './models/login-user.model';
import { ServerAuthAnswer } from './models/server-auth-answer.model';

export const ACCESS_TOKEN_KEY = 'org_token';
export const USER_NAME_KEY = 'org_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() onGetData = new EventEmitter();

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  getToken$(logUser: LoginUser): Observable<ServerAuthAnswer>{
    return this.http.post<ServerAuthAnswer>("auth/login", logUser)
    .pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.value.accessToken);
        localStorage.setItem(USER_NAME_KEY, token.value.userName);
        this.onGetData.emit();
      })
    )
  }

  isAuthenticated(): boolean {
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    this.onGetData.emit();
  }

  addUser$(user: AddUser): Observable<any> {
    return this.http.post("auth/register", user);
  }
}
