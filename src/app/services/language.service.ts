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
    const savedLang = this.localStorage.getItem('lang');
    if(savedLang){
      this.languageSubject = new BehaviorSubject(savedLang);
      this.language$ = this.languageSubject.asObservable();
    }else{
      this.getLanguages().subscribe(
        {next: languages =>{
            let defaultLangCode: string | undefined;
            defaultLangCode = languages.find(language => language.defaultLanguage)?.code;

            if (defaultLangCode) {
              this.languageSubject = new BehaviorSubject(defaultLangCode);
              this.language$ = this.languageSubject.asObservable();
              this.localStorage.setItem('lang', defaultLangCode);
            }
          }
        }
      );
    }
  }

  getLanguages(){
    return this.http.get<LanguageDetails[]>(this.url);
  }


}
