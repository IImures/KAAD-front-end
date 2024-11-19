import {Component, Output} from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LanguageRequest} from "../LanguageRequest";

@Component({
  selector: 'app-language-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './language-create.component.html',
  styleUrl: './language-create.component.scss'
})
export class LanguageCreateComponent {
  languageForm!: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  // @Output() languageCreated = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {

    this.languageForm = this.fb.group({
      language: ['', Validators.required],
      code: ['', [Validators.required, Validators.minLength(2)]],
      defaultLanguage: [false],
    });
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file.type.startsWith('image/')) {
        this.selectedImage = file;

        // Create a preview of the image
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

  onSubmit(): void {
    if (this.languageForm.valid && this.selectedImage) {
      const formData = new FormData();
      const languageRequest : LanguageRequest = this.languageForm.getRawValue();
      console.log(languageRequest);
      formData.append('body',new Blob([JSON.stringify(languageRequest)], { type: 'application/json' }));
      formData.append('image', this.selectedImage);

      console.log('Form submitted:', formData);
      this.languageService.createLanguage(formData)
        .subscribe({
          next: () => {
            // this.languageCreated.emit('languageCreated');
          },
          error: error => {
            console.log(error);
            alert(error.error.message);
          }
        });
    }
  }
}

