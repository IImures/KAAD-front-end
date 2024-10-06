import {Component, OnInit} from '@angular/core';
import {MainTextSectionComponent} from "./main-text-section/main-text-section.component";
import {OurTeamComponent} from "./our-team/our-team.component";
import {TeamMember} from "../../interfaces/team-member";
import {GeneralInfoDetails} from "../../interfaces/GeneralInfoDetails";
import {GeneralInfoService} from "../../services/general-info.service";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    MainTextSectionComponent,
    OurTeamComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {

  aboutUs: GeneralInfoDetails = {
    id:'0',
    content:''
  };

  ourTeamTitle = 'Nasz Zespół'
  teamMembers: TeamMember[] =[
    {
      fullName : 'Anastazja Hroda',
      description : 'prawnik, cudowny żeglarz',
      phoneNumber : '881641440',
      email: 'ahorda@gmail.com',
      img: '/assets/members/anastazja.jpg'
    },
    {
      fullName : 'Adrian Dzienkiewicz',
      description : 'adwokat, morski wilk',
      phoneNumber : '881641440',
      email: 'adzienkiewicz@gmail.com',
      img: '/assets/members/adrian.jpg'
    }
  ]

  constructor(
    private generalInfoService: GeneralInfoService,
    private languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
    this.updateInfo();
    this.generalInfoService.getInfo("aboutUs")
      .subscribe(info => {
        this.aboutUs = info;
      })
  }


  private updateInfo() {
    this.languageService.language$.subscribe(
      {
        next: lang => {
          this.generalInfoService.getInfo("aboutUs")
            .subscribe(info => {
              this.aboutUs = info;
            })
        }
      }
    )
  }
}

