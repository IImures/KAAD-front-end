import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LanguageService} from "../../../services/language.service";
import {LanguageDetails} from "../../../interfaces/language-details";
import {SpecializationService} from "../../../services/specialization.service";

@Component({
  selector: 'app-specialization-create',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './specialization-create.component.html',
  styleUrl: './specialization-create.component.scss'
})
export class SpecializationCreateComponent implements OnInit {

  specializationForm: FormGroup;
  languages!: LanguageDetails[];
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private specializationService: SpecializationService,
  ) {
    this.specializationForm = this.fb.group({
      specializationNames: this.fb.array([this.createGeneralInfo()]),
      isHidden: [false]
    });
  }

  ngOnInit(): void {
    this.languageService.getLanguages().subscribe(
      {
        next: langs =>{
          this.languages = langs;
        }
      }
    );

  }

  get specializationNames(): FormArray<FormGroup> {
    return this.specializationForm.get('specializationNames') as FormArray<FormGroup>;
  }

  createGeneralInfo(): FormGroup {
    return this.fb.group({
      languageId: [null, Validators.required],
      content: ['', Validators.required],
      code: ['odk']
    });
  }

  addGeneralInfo(): void {
    this.specializationNames.push(this.createGeneralInfo());
  }

  removeGeneralInfo(index: number): void {
    this.specializationNames.removeAt(index);
  }

  onSubmit(): void {
    if (this.specializationForm.valid && this.selectedImage) {
      console.log('Sending payload to backend:', this.specializationForm.value);
      const formData = new FormData();

      formData.append('image', this.selectedImage);
      formData.append('body', new Blob([JSON.stringify(this.specializationForm.getRawValue())], { type: 'application/json' }));

      this.specializationService.createSpecialization(formData).subscribe({

      })

    }else if (!this.selectedImage) {
      alert("Please select a image");
    }else {
      alert("Error on the page contact with Vlad");
    }
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file.type.startsWith('image/')) {
        this.selectedImage = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file');
        fileInput.value = '';
      }
    }
  }

}
