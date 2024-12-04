import {Component, OnInit} from '@angular/core';
import {SpecializationService} from "../../../services/specialization.service";
import {LanguageService} from "../../../services/language.service";
import {SpecializationDetails} from "../../../interfaces/specialization-details";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LanguageDetails} from "../../../interfaces/language-details";
import {environment} from "../../../../environments/environment";
import {SpecializationRequest} from "../../../interfaces/SpecializationRequest";

@Component({
  selector: 'app-specialization-list',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './specialization-list.component.html',
  styleUrl: './specialization-list.component.scss'
})
export class SpecializationListComponent implements OnInit {

  specializationList! : SpecializationDetails[];
  selectedLanguage: LanguageDetails | null = null;
  languages!: LanguageDetails[];

  previewImage: string | null = null;
  selectedFile: File | null = null;
  editedSpecializationId :string | null = null;
  editedSpecialization: SpecializationRequest = {
    specializationNames: [
      {
        code: 'spec',
        content: '',
        languageId : '',
        isLabel: null,
      },
    ],
    isHidden : false
  };

  constructor(
    private specializationService: SpecializationService,
    private languageService: LanguageService
  )
  { }


  ngOnInit() {
    this.languageService.getLanguages().subscribe(
      (languages: LanguageDetails[]) => {
        this.languages = languages;
      }
    );


  }

  deleteItem(item : SpecializationDetails) {
    if (confirm('Napewno usunąć tą specializację?')) {
      this.specializationService.deleteSpecialization(item.id).subscribe(() => {
        this.loadSpecializations();
      });
    }
  }

  editItem(item : SpecializationDetails) {
    this.editedSpecializationId = item.id;
    this.editedSpecialization.specializationNames[0].content = item.generalInfo.content;
    this.editedSpecialization.specializationNames[0].languageId = this.selectedLanguage!.id;
    this.editedSpecialization.isHidden = item.isHidden;
  }

  selectLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value;

    this.selectedLanguage = this.languages.find(
      (language) => language.id == selectedId
    ) || null;

    if(!this.selectedLanguage) return;

    this.loadSpecializations();
  }

  private loadSpecializations() {
    if(this.selectedLanguage == null) return;
    this.specializationService.getSpecializations(true, this.selectedLanguage.code).subscribe(
      (data: SpecializationDetails[]) => {
        this.specializationList = data;
      }
    );
  }

  protected readonly environment = environment;

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

  cancelEditSpec() {
    this.selectedFile = null;
    this.editedSpecializationId = null;
    this.previewImage = null;
    this.editedSpecialization = {
      specializationNames: [
        {
          code: 'spec',
          content: '',
          languageId : '',
          isLabel: null,
        },
      ],
      isHidden : false
    };
  }

  confirmEditSpec(id: string) {
    const formData = new FormData();
    formData.append('body', new Blob([JSON.stringify(this.editedSpecialization)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.specializationService.updateSpecialization(id, formData).subscribe({
      next: () => {
        alert("Updated");
        this.loadSpecializations();
      },
      error: err => {
        alert(err.error.message);
      }
    });
    this.cancelEditSpec();
  }
}

