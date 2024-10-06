import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {LanguageDetails} from "../../../interfaces/language-details";
import {NgForOf, NgIf} from "@angular/common";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-laguage-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './language-list.component.html',
  styleUrl: './language-list.component.scss'
})
export class LanguageListComponent implements OnInit {

  languages!: LanguageDetails[];
  langLoaded: boolean = false;

  constructor(
    private languageService: LanguageService,
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.languages = await firstValueFrom(this.languageService.getLanguages());
    this.langLoaded = true;
  }

  changeLanguage(lang: LanguageDetails) {
    this.languageService.changeLanguage(lang);
  }

  protected readonly environment = environment;
}
