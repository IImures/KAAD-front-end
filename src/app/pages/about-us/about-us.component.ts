import {Component, OnInit} from '@angular/core';
import {MainTextSectionComponent} from "./main-text-section/main-text-section.component";
import {OurTeamComponent} from "./our-team/our-team.component";
import {TeamMember} from "../../interfaces/team-member";
import {GeneralInfoDetails} from "../../interfaces/GeneralInfoDetails";
import {GeneralInfoService} from "../../services/general-info.service";
import {LanguageService} from "../../services/language.service";
import {TeamMemberService} from "../../services/team-member.service";
import {NgIf} from "@angular/common";
import {debounceTime, forkJoin} from "rxjs";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    MainTextSectionComponent,
    OurTeamComponent,
    NgIf
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {

  aboutUs!: GeneralInfoDetails;
  ourTeamTitle = 'Nasz Zespół'
  teamMembers!: TeamMember[];

  constructor(
    private generalInfoService: GeneralInfoService,
    private teamMemberService: TeamMemberService,
    private languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
    this.updateInfo();

    this.getInfo();

  }

  private getInfo() {

    this.teamMemberService.getTeamMembers()
      .subscribe(info => {
        this.teamMembers = info;
      });

      const requests = [
        this.generalInfoService.getInfo("aboutUs"),
        this.generalInfoService.getInfo("team"),
      ];

      forkJoin(requests).subscribe({
        next: (response: GeneralInfoDetails[]) => {
          const [aboutInfo, teamInfo] = response;
          this.aboutUs = aboutInfo;
          this.ourTeamTitle = teamInfo.content;
        },
        error: (error) => {
          console.error(error);
        }
      })
  }

  private updateInfo(){
    this.languageService.language$.pipe(
      debounceTime(300)
    ).subscribe(
      ()=> {
        this.getInfo();
      }
    );
  }

}

