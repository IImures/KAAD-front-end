import {GeneralInfoDetails} from "./GeneralInfoDetails";
import {TeamMember} from "./team-member";

export interface AboutUsPageDetails {
  aboutUs: GeneralInfoDetails;
  ourTeamTitle: GeneralInfoDetails;
  teamMembers: TeamMember[];
}
