import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = {
    nom: '',
    prenom: '',
    email: '',
    mdp: '',
    isAdmin: false,
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  postUser(user: User): Observable<any> {
    return this.http.post(
      environment.apiBaseUrl + 'inscription',
      user,
      this.noAuthHeader
    );
  }

  login(authCredentials: any): Observable<any> {
    return this.http.post(
      environment.apiBaseUrl + 'authentification',
      authCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + 'profile').pipe(catchError(this.handleError));
  }

  //helper

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  setAuthenticated() {
    localStorage.setItem('authenticated', 'true');
  }

  deleteAuthenticated() {
    localStorage.removeItem('authenticated');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
