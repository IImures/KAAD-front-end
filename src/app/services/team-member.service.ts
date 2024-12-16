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

  getTeamMembers(lang : string | null = null) {

    let params = new HttpParams();
    if(lang){params = params.set('lang', lang);}
    else{params = params.set('lang', this.lang);}

    return this.http.get<TeamMember[]>(this.url, {params: params});
  }

  createMember(formData: FormData) {
    return this.http.post<TeamMember>(`${this.url}`, formData);
  }

  updateMember(id: string, formData: FormData) {
    return this.http.put<TeamMember>(`${this.url}/${id}`, formData)
  }

  deleteMember(id: string) {
    return this.http.delete<TeamMember>(`${this.url}/${id}`);
  }
}
