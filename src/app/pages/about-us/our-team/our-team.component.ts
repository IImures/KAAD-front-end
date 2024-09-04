import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {TeamMember} from "../../../interfaces/team-member";

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgOptimizedImage
  ],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.scss'
})
export class OurTeamComponent {

  @Input() title: string ='';
  @Input() teamMembers: TeamMember[] =[];

}
