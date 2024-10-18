import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {SpecializationDetails} from "../interfaces/specialization-details";

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  private url : string = `${environment.apiUrl}/${environment.apiVersion}/specialization`;
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

  getSpecialization() {
    let params = new HttpParams().set('lang', this.lang);
    return this.http.get<SpecializationDetails[]>(this.url, {params: params});
  }

}
