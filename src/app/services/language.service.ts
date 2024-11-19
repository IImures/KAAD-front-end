import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LanguageDetails} from "../interfaces/language-details";
import {BehaviorSubject, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LanguageService{

  private languageSubject! : BehaviorSubject<string>;
  language$! : Observable<string>;

  private url: string = `${environment.apiUrl}/${environment.apiVersion}/language`;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) {
    const savedLang = this.localStorage.getItem('lang') || 'pl';
    this.languageSubject = new BehaviorSubject(savedLang);
    this.language$ = this.languageSubject.asObservable();
    this.localStorage.setItem('lang', savedLang);
  }

  getLanguages(){
    return this.http.get<LanguageDetails[]>(this.url);
  }

  changeLanguage(lang: LanguageDetails) {
    this.languageSubject.next();
    this.localStorage.setItem('lang', lang.code);
  }

  createLanguage(form: FormData) {
    return this.http.post<LanguageDetails>(this.url, form);
  }

  deleteLanguage(id: string) {
    return this.http.delete<LanguageDetails>(`${this.url}/${id}` );
  }
}
