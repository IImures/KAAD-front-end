import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {GeneralInfoDetails} from "../interfaces/GeneralInfoDetails";
import {GeneralInfoRequest} from "../interfaces/GeneralInfoRequest";
import {Cacheable} from "ts-cacheable";

@Injectable({
  providedIn: 'root'
})
export class GeneralInfoService {

  private url : string = `${environment.apiUrl}/${environment.apiVersion}/gen-inf`;
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
  @Cacheable()
  getInfo(code: string) {
    let params = new HttpParams().set('lang', this.lang);
    return this.http.get<GeneralInfoDetails>(`${this.url}/${code}`,
      {params: params}
    );
  }
  @Cacheable()
  getInfoWithLang(code: string, lang: string) {
    let params = new HttpParams().set('lang', lang);
    return this.http.get<GeneralInfoDetails>(`${this.url}/${code}`,
      {params: params}
    );
  }
  @Cacheable()
  getLabels() {
    return this.http.get<GeneralInfoDetails[]>(`${this.url}/labels`);
  }

  updateLabel(updatedLabel: GeneralInfoRequest, lang: string) {
    let params = new HttpParams().set('lang', lang).set('code', updatedLabel.code);
    return this.http.put<GeneralInfoDetails>(`${this.url}`, updatedLabel,{params: params});
  }
}
