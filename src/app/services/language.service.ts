import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LanguageDetails} from "../interfaces/language-details";
import {BehaviorSubject, Observable, skip} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {Meta} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class LanguageService{

  private languageSubject! : BehaviorSubject<string>;
  language$! : Observable<string>;

  private url: string = `${environment.apiUrl}/${environment.apiVersion}/language`;
  private defaultLanguage = environment.defaultLanguage;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private meta: Meta
  ) {
    const savedLang = this.localStorage.getItem('lang') || this.defaultLanguage;
    this.languageSubject = new BehaviorSubject(savedLang);
    this.language$ = this.languageSubject.asObservable().pipe(skip(0));
    this.localStorage.setItem('lang', savedLang);
    this.meta.updateTag({name: "Content-Language", content: this.languageSubject.value});
  }

  getLanguages(){
    return this.http.get<LanguageDetails[]>(this.url);
  }

  changeLanguage(lang: LanguageDetails) {
    if (this.languageSubject.value !== lang.code) {
      this.languageSubject.next(lang.code);
      this.localStorage.setItem('lang', lang.code);
      this.meta.updateTag({ name: 'Content-Language', content: lang.code });
    }
  }

  createLanguage(form: FormData) {
    return this.http.post<LanguageDetails>(this.url, form);
  }

  updateLanguage(id: string, form: FormData) {
    return this.http.put<LanguageDetails>(`${this.url}/${id}`, form);
  }

  deleteLanguage(id: string) {
    return this.http.delete<LanguageDetails>(`${this.url}/${id}` );
  }
}
