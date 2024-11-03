import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {ContactTypeDetails} from "../interfaces/ContactTypeDetails";

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private url : string = `${environment.apiUrl}/${environment.apiVersion}/contact`;
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

  getContactTypes() {
    return this.http.get<ContactTypeDetails[]>(`${this.url}/type`);
  }

}