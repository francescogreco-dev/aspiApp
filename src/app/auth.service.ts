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
    const loginURL = "http://www.bebgestory.it:3000/api/users/login";
    console.log(value)
    return this.http.post(loginURL, { email: value.email, password: value.password });
  }
}
