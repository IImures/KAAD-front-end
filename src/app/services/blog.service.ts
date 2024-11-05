import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {ContactTypeDetails} from "../interfaces/ContactTypeDetails";
import {ContactDetails} from "../interfaces/ContactDetails";

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  private url : string = `${environment.apiUrl}/${environment.apiVersion}/post`;
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

  sendContact(form: ContactDetails) {
    return this.http.post<ContactDetails>(this.url, {params: form});
  }

}
