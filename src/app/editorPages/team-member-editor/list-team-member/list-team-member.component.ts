import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {LanguageDetails} from "../../../interfaces/language-details";
import {LanguageService} from "../../../services/language.service";
import {MemberRequest} from "../../../interfaces/MemberRequest";
import {TeamMemberService} from "../../../services/team-member.service";
import {TeamMember} from "../../../interfaces/team-member";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-list-team-member',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './list-team-member.component.html',
  styleUrl: './list-team-member.component.scss'
})
export class ListTeamMemberComponent implements OnInit {

  selectedLanguage: LanguageDetails | null = null;
  languages!: LanguageDetails[];
  memberList:  (TeamMember & { priority: number })[] = [];

  previewImage: string | null = null;
  selectedFile: File | null = null;
  editedMemberId : string | null = null;
  editedMember : MemberRequest = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    priority: 100,
    description: [
      {
        code: '',
        content: 'member',
        languageId: '',
        isLabel : false
      }
    ]
  }

  constructor(
    private memberService: TeamMemberService,
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

  selectLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value;

    this.selectedLanguage = this.languages.find(
      (language) => language.id == selectedId
    ) || null;

    if(!this.selectedLanguage) return;

    this.loadTeamMembers();
  }


  private loadTeamMembers() {
    if(this.selectedLanguage == null) return;

    this.memberService.getTeamMembers(this.selectedLanguage.code).subscribe(
      (members :any) => {
        this.memberList = members;
        this.cancelUpdateItem();
      }
    )
  }

  protected readonly environment = environment;

  editItem(item: TeamMember & { priority: number }) {
    this.editedMemberId = item.id;
    this.editedMember = {
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email || '',
      phone: item.phone || '',
      priority: item.priority,
      description: [
        {
          code: 'member',
          content: item.description.content || '',
          languageId: this.selectedLanguage!.id,
          isLabel: false,
        },
      ],
    };
  }

  deleteItem(item: TeamMember & { priority: number }) {
    if(confirm('Napewno usunąć go?')) {
      this.memberService.deleteMember(item.id).subscribe({
        next: ()=> {
          alert("Udało się");
          this.loadTeamMembers();
        },
        error: error => {
          alert(error.error.message);
        }
      });
    }
  }

  updateItem() {
    const formData = new FormData();
    formData.append('body', new Blob([JSON.stringify(this.editedMember)], {type: 'application/json'}));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.memberService.updateMember(this.editedMemberId!, formData).subscribe({
      next: ()=>{
        alert("Udało się");
        this.loadTeamMembers();
      },error: error =>{
        alert(error.error.message);
      }
    })
  }

  cancelUpdateItem() {
    this.previewImage = null;
    this.selectedFile = null;
    this.editedMemberId = null;
    this.editedMember = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      priority: 100,
      description: [
        {
          code: '',
          content: 'member',
          languageId: '',
          isLabel : false
        }
      ]
    };
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
