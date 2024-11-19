import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {LanguageDetails} from "../../../interfaces/language-details";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LanguageRequest} from "../LanguageRequest";

@Component({
  selector: 'edit-language-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './language-list.component.html',
  styleUrl: './language-list.component.scss'
})
export class LanguageListComponent implements OnInit, OnChanges {
  languages: LanguageDetails[] = [];
  editingLanguageId: string | null = null;
  editedLanguage: LanguageRequest = {
    code:'',
    defaultLanguage: false,
    language:''
  };
  @Input() languageCreatedFlag!: boolean;

  constructor(
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadLanguages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['languageCreatedFlag'] && changes['languageCreatedFlag'].currentValue !== changes['languageCreatedFlag'].previousValue) {
      this.loadLanguages();
    }
  }

  loadLanguages(): void {
    this.languageService.getLanguages().subscribe((data) => {
      this.languages = data;
    });
  }

  editLanguage(id: string, language: LanguageDetails): void {
    this.editingLanguageId = id;
    this.editedLanguage = { ...language };
  }

  confirmEditLanguage(id: string): void {
    // this.languageService.updateLanguage(id, this.editedLanguage).subscribe(() => {
    //   this.loadLanguages();
    //   this.editingLanguageId = null;
    //   this.editedLanguage = {};
    // });
  }

  cancelEditLanguage(): void {
    this.editingLanguageId = null;
    this.editedLanguage = {
      code:'',
      defaultLanguage: false,
      language:''
    };
  }

  deleteLanguage(id: string): void {
    if (confirm('Napewno usunąć ten język?')) {
      this.languageService.deleteLanguage(id).subscribe(() => {
        this.loadLanguages();
      });
    }
  }
}
