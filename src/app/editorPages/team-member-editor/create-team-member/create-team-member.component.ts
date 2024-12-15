import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LanguageDetails} from "../../../interfaces/language-details";
import {LanguageService} from "../../../services/language.service";
import {NgForOf, NgIf} from "@angular/common";
import {TeamMemberService} from "../../../services/team-member.service";
import {MemberRequest} from "../../../interfaces/MemberRequest";

@Component({
  selector: 'app-create-team-member',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './create-team-member.component.html',
  styleUrl: './create-team-member.component.scss'
})
export class CreateTeamMemberComponent implements OnInit{


  memberFrom: FormGroup;
  languages!: LanguageDetails[];
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb : FormBuilder,
    private languageService: LanguageService,
    private memberService : TeamMemberService
  ) {
    this.memberFrom = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      priority: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: this.fb.array([this.createGeneralInfo()])
    });
  }

  ngOnInit() {
    this.languageService.getLanguages().subscribe(languages => this.languages = languages);

  }

  createGeneralInfo(): FormGroup {
    return this.fb.group({
      languageId: [null, Validators.required],
      content: ['', Validators.required],
      code:['member']
    });
  }

  get description(): FormArray<FormGroup> {
    return this.memberFrom.get('description') as FormArray<FormGroup>;
  }

  addGeneralInfo(): void {
    this.description.push(this.createGeneralInfo());
  }

  removeGeneralInfo(index: number): void {
    this.description.removeAt(index);
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

  onSubmit() {
    if (this.memberFrom.invalid || !this.selectedImage) {
      return;
    }
    const formData = new FormData();
    const memberRequest: MemberRequest = this.memberFrom.getRawValue();

    formData.append('body', new Blob([JSON.stringify(memberRequest)], {type: 'application/json'}));
    formData.append('image', this.selectedImage);

    this.memberService.createMember(formData).subscribe({
      next: value =>{
        alert("Udało się")
      },
      error: error => {
        console.log(error);
        alert(error.error.message);
      }
    });

  }

}
