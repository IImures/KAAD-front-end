import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {LanguageDetails} from "../../../interfaces/language-details";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LanguageRequest} from "../LanguageRequest";
import {environment} from "../../../../environments/environment";

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
  protected readonly environment = environment;
  languages: LanguageDetails[] = [];
  editingLanguageId: string | null = null;
  editedLanguage: LanguageRequest = {
    code:'',
    defaultLanguage: false,
    language:''
  };
  @Input() languageCreatedFlag!: boolean; //TODO fix this

  previewImage: string | null = null;
  selectedFile: File | null = null;


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
    this.editedLanguage.language = language.language;
    this.editedLanguage.code = language.code;
    this.editedLanguage.defaultLanguage = language.defaultLanguage;
  }

   confirmEditLanguage(id: string) {
    console.log(this.editedLanguage);
    const formData = new FormData();
    formData.append('body', new Blob([JSON.stringify(this.editedLanguage)], { type: 'application/json' }));
    if (this.selectedFile) {
      console.log('Image selected');
      formData.append('image', this.selectedFile);
    }
    this.languageService.updateLanguage(id, formData).subscribe({
      next: value => {
        this.loadLanguages();
        alert("Updated");
      },
      error: err => {
        alert(err.error.message);
      }
    });
    this.cancelEditLanguage();
  }

  cancelEditLanguage(): void {
    this.editingLanguageId = null;
    this.editedLanguage = {
      code:'',
      defaultLanguage: false,
      language:''
    };
    this.selectedFile = null;
    this.previewImage = null;
  }

  deleteLanguage(id: string): void {
    if (confirm('Napewno usunąć ten język?')) {
      this.languageService.deleteLanguage(id).subscribe(() => {
        this.loadLanguages();
      });
    }
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file.type.startsWith('image/')) {
        this.selectedFile = file;

        // Create a preview of the image
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file');
        fileInput.value = '';
      }
    }
  }
}
