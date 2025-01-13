import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {Cacheable} from "ts-cacheable";
import {UserDetails} from "../interfaces/UserDetails";


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url : string = `${environment.apiUrl}/${environment.apiVersion}/user`;
  private lang! : string;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
  ) {
    this.languageService.language$.subscribe(
      {
        next: lang => {
          this.lang=lang;
        }
      }
    );
  }

  passwordReset(password: string) {
    return this.http.put(`${this.url}/passwordReset`, {
      password: password
    })
  }

  updateUserProfile(formData: FormData) {
    return this.http.put(`${this.url}`, formData);
  }
}
