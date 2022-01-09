import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://ifelseelif-api.azurewebsites.net/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'registration', {
      username,
      password
    }, httpOptions);
  }
}
