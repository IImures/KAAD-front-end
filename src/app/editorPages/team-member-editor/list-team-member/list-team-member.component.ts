import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {LanguageDetails} from "../../../interfaces/language-details";
import {SpecializationService} from "../../../services/specialization.service";
import {LanguageService} from "../../../services/language.service";
import {MemberRequest} from "../../../interfaces/MemberRequest";
import {TeamMemberService} from "../../../services/team-member.service";
import {TeamMember} from "../../../interfaces/team-member";

@Component({
  selector: 'app-list-team-member',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './list-team-member.component.html',
  styleUrl: './list-team-member.component.scss'
})
export class ListTeamMemberComponent implements OnInit {

  selectedLanguage: LanguageDetails | null = null;
  languages!: LanguageDetails[];
  memberList!: TeamMember & {priority: string}[];

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
    this.memberService.getTeamMembers().subscribe(
      (members :any) => {
        this.memberList = members;
        console.log(this.memberList);
      }
    )
  }
}
