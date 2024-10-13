import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {TeamMember} from "../interfaces/team-member";

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  private url : string = `${environment.apiUrl}/${environment.apiVersion}/team-member`;
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

  getTeamMembers() {
    let params = new HttpParams().set('lang', this.lang);
    return this.http.get<TeamMember[]>(this.url, {params: params});
  }

}
