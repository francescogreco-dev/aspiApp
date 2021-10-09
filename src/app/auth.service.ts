import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(value): Observable<any> {
    const loginURL = "http://francescogreco.ddns.net:3001/users/login";
    return this.http.post(loginURL, { username: value.username, password: value.password });
  }
}
