import {Component, Input} from '@angular/core';
import {TeamMember} from "../about-us.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.scss'
})
export class OurTeamComponent {

  @Input() title: string ='';
  @Input() teamMembers: TeamMember[] =[];

}
