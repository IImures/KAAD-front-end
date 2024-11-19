import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {PostDetails} from "../interfaces/post-details";
import {PageInterface} from "../interfaces/PageInterface";

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

  getPosts(
    limit: number,
    page: number,

  ){
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());
    return this.http.get<PageInterface<PostDetails>>(this.url, {params: params});
  }


}
