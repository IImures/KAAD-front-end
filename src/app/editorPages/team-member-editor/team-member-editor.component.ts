import { Component } from '@angular/core';
import {CreateTeamMemberComponent} from "./create-team-member/create-team-member.component";
import {ListTeamMemberComponent} from "./list-team-member/list-team-member.component";

@Component({
  selector: 'app-team-member-editor',
  standalone: true,
  imports: [
    CreateTeamMemberComponent,
    ListTeamMemberComponent
  ],
  templateUrl: './team-member-editor.component.html',
  styleUrl: './team-member-editor.component.scss'
})
export class TeamMemberEditorComponent {

}
