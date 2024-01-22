import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { catchError } from 'rxjs/operators';
import { HttpServerService } from './http-server.service';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

const USER_KEY = 'user'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private httpServer: HttpServerService, private router: Router) { }

  public register(user: IUserRegister) {
    return this.http.post(this.httpServer.HTPP_SERVER + "/api/users", user, this.httpServer.httpOptions)
    // .pipe(
    //   catchError(this.httpServer.handleError)
    // );
  }

  public login(user: IUserRegister) {
    return this.http.post(this.httpServer.HTPP_SERVER + "/api/users/login", user, this.httpServer.httpOptions)
    // .pipe(
    //   catchError(this.httpServer.handleError)
    // );
  }

  public getAllUsers() {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/users", this.httpServer.httpOptions)
  }

  public deleteUser(userId: string) {
    return this.http.delete(this.httpServer.HTPP_SERVER + "/api/users/" + userId, this.httpServer.httpOptions)
  }
  public setUserToSessionStorage(user: User) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromSessionStorage(): User {
    const userJson = sessionStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  logout() {
    sessionStorage.removeItem(USER_KEY);
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
