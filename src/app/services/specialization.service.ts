import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {SpecializationDetails} from "../interfaces/specialization-details";
import {SpecializationPageDetails} from "../interfaces/specialization-page-details";

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

  getSpecializations(showHidden : boolean = false) {
    let params = new HttpParams().set('lang', this.lang).set('showHidden', showHidden);
    return this.http.get<SpecializationDetails[]>(this.url, {params: params});
  }

  getSpecialization(specId: string) {
    let params = new HttpParams().set('lang', this.lang);
    return this.http.get<SpecializationDetails>(`${this.url}/${specId}`, {params: params});
  }

  getSpecializationPage(specId: string){
    let params = new HttpParams().set('lang', this.lang);
    return this.http.get<SpecializationPageDetails>(`${this.url}/${specId}/page`, {params: params});
  }

}
