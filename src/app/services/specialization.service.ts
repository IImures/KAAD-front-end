import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {SpecializationDetails} from "../interfaces/specialization-details";
import {SpecializationPageDetails} from "../interfaces/specialization-page-details";
import {LanguageDetails} from "../interfaces/language-details";

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

  getSpecializations(showHidden : boolean = false, lang: string | null = null) {
    let params = new HttpParams().set('showHidden', showHidden);
    if(lang){
      params = params.set('lang', lang);
    }
    else{
      params = params.set('lang', this.lang);
    }
    return this.http.get<SpecializationDetails[]>(this.url, {params: params});
  }

  getSpecialization(specId: string) {
    let params = new HttpParams().set('lang', this.lang);
    return this.http.get<SpecializationDetails>(`${this.url}/${specId}`, {params: params});
  }

  getSpecializationPage(specId: string, lang: string | null = null) {
    let params = new HttpParams();
    if(lang){params = params.set('lang', lang);}
    else{params = params.set('lang', this.lang);}

    return this.http.get<SpecializationPageDetails>(`${this.url}/${specId}/page`, {params: params});
  }

  updateSpecialization(id: string, form: FormData) {
    return this.http.put<SpecializationDetails>(`${this.url}/${id}`, form);
  }

  deleteSpecialization(id: any) {
    return this.http.delete<SpecializationDetails>(`${this.url}/${id}`);
  }

  updateSpecializationPage(formData: FormData, specId: string) {
    return this.http.put<SpecializationDetails>(`${this.url}/${specId}/page`, formData);
  }

  createSpecializationPage(formData: FormData, specId: string) {
    return this.http.post<SpecializationDetails>(`${this.url}/${specId}/page`, formData);
  }

  deleteSpecializationPage(specId: string, lang: string | null = null) {
    let params = new HttpParams();
    if(lang){params = params.set('lang', lang);}
    return this.http.delete<SpecializationDetails>(`${this.url}/${specId}/page`, {params: params});
  }

  deleteSpecializationPagePhoto(specId: string) {
    return this.http.delete<SpecializationDetails>(`${this.url}/${specId}/page/photo`);
  }

  createSpecialization(formData: FormData) {
    return this.http.post<SpecializationDetails>(`${this.url}`, formData)
  }
}
