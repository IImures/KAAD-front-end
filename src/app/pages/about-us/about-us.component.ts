import {Component, OnInit} from '@angular/core';
import {MainTextSectionComponent} from "./main-text-section/main-text-section.component";
import {OurTeamComponent} from "./our-team/our-team.component";
import {TeamMember} from "../../interfaces/team-member";
import {GeneralInfoDetails} from "../../interfaces/GeneralInfoDetails";
import {GeneralInfoService} from "../../services/general-info.service";
import {LanguageService} from "../../services/language.service";
import {TeamMemberService} from "../../services/team-member.service";
import {NgIf} from "@angular/common";

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
  //   = {
  //   id:'0',
  //   content:'',
  //   code: '',
  //   language: {
  //     id: '',
  //     language:'',
  //     code:'',
  //     defaultLanguage: false
  //   },
  // };

  ourTeamTitle = 'Nasz Zespół'
  teamMembers!: TeamMember[];
  //   =[
  //   // {
  //   //   fullName : 'Anastazja Hroda',
  //   //   description : 'prawnik, cudowny żeglarz',
  //   //   phone : '881641440',
  //   //   email: 'ahorda@gmail.com',
  //   //   img: '/assets/members/anastazja.jpg'
  //   // },
  //   // {
  //   //   fullName : 'Adrian Dzienkiewicz',
  //   //   description : 'adwokat, morski wilk',
  //   //   phone : '881641440',
  //   //   email: 'adzienkiewicz@gmail.com',
  //   //   img: '/assets/members/adrian.jpg'
  //   // }
  // ]

  constructor(
    private generalInfoService: GeneralInfoService,
    private teamMemberService: TeamMemberService,
    private languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
    this.updateInfo();

    this.generalInfoService.getInfo("aboutUs")
      .subscribe(info => {
        this.aboutUs = info;
      });

    this.generalInfoService.getInfo("team")
      .subscribe(info=>{
        this.ourTeamTitle = info.content;
      })

    this.teamMemberService.getTeamMembers()
      .subscribe(info =>{
        this.teamMembers = info;
      });


  }


  private updateInfo() {

    this.languageService.language$.subscribe(
      {
        next: async () => {

          this.generalInfoService.getInfo("aboutUs")
            .subscribe(info => {
              this.aboutUs = info;
            });

          this.generalInfoService.getInfo("team")
            .subscribe(info=>{
              this.ourTeamTitle = info.content;
            })

          this.teamMemberService.getTeamMembers()
            .subscribe(info =>{
              this.teamMembers = info;
            });

        }
      }
    );

  }
}

