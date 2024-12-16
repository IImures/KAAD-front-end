import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponse} from "../interfaces/AuthResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = `${environment.apiUrl}/${environment.apiVersion}/user`;

  constructor(
    private http: HttpClient,
  ) { }

  login(login: string, password: string) {
    return this.http.post<AuthResponse>(`${this.url}/login`, {
      login : login,
      password: password
    });
  }

  verify(token: string) {
    let httpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}/valid`, {}, { headers: httpHeaders });
  }

  refresh(refreshToken: string) {
    let httpHeaders = new HttpHeaders().set('Authorization', `Bearer ${refreshToken}`);
    return this.http.post<AuthResponse>(`${this.url}/refresh`, {}, { headers: httpHeaders });
  }
}
