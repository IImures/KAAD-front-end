import { Component } from '@angular/core';
import {MainTextSectionComponent} from "./main-text-section/main-text-section.component";
import {OurTeamComponent} from "./our-team/our-team.component";
import {TeamMember} from "../../interfaces/team-member";

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
export class AboutUsComponent {

  firstArticle = {
    header: "About Us",
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisl leo, rhoncus nec sem vel, malesuada vestibulum enim. Mauris hendrerit eros nec sapien vestibulum pellentesque. Proin finibus efficitur lacinia. Proin fringilla, magna dapibus maximus porta, metus purus commodo ipsum, sit amet venenatis massa ante nec sapien. In semper velit id libero ornare tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus pellentesque, metus quis vehicula pharetra, nunc turpis laoreet velit, nec commodo enim felis ac nibh. Nunc ut nulla viverra sapien tincidunt elementum eget ac arcu. In semper sed justo a tincidunt. Nullam orci velit, rhoncus a lacinia et, consectetur non eros. Sed commodo ex leo. Aliquam erat volutpat.",
  }

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

}

