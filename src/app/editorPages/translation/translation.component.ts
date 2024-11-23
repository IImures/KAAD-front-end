import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LanguageDetails} from "../../interfaces/language-details";
import {NgForOf, NgIf} from "@angular/common";
import {LanguageService} from "../../services/language.service";
import {GeneralInfoDetails} from "../../interfaces/GeneralInfoDetails";
import {GeneralInfoService} from "../../services/general-info.service";
import {GeneralInfoRequest} from "../../interfaces/GeneralInfoRequest";

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss'
})
export class TranslationComponent implements OnInit {

  languages!: LanguageDetails[];
  selectedLanguage: LanguageDetails | null = null;
  labels! : any[]; //interface GeneralInfoDetails + translatedValue

  constructor(
    private languageService: LanguageService,
    private generalInfoService: GeneralInfoService,
  ) {
  }

  ngOnInit(): void {
    this.languageService.getLanguages().subscribe(
      languages => {
        this.languages = languages;
      }
    );

    this.generalInfoService.getLabels().subscribe({
        next: labels => {
          this.labels = labels.map(label => ({
            ...label,
            translatedValue: ''
          }));
        }}
    );

  }

  selectLanguage(event :Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value;

    this.selectedLanguage = this.languages.find(
      (language) => language.id == selectedId
    ) || null;

    if(!this.selectedLanguage) return;

    this.labels.forEach(label => {
      this.generalInfoService.getInfoWithLang(label.code, this.selectedLanguage!.code).subscribe(
        {
          next: value => {
            label.translatedValue = value.content;
          }
        }
      )
    })
  }

  saveTranslation(label: any): void {
    const updatedLabel : GeneralInfoRequest = {
      content: label.translatedValue,
      code: label.code,
      isLabel: label.isLabel,
      languageId: this.selectedLanguage!.id,
    }
    console.log(updatedLabel);
    this.generalInfoService.updateLabel(updatedLabel, this.selectedLanguage!.code).subscribe(
      {
        error: err => {
          console.log(err);
          alert(err.error.message);
        }
      }
    );
  }

}

