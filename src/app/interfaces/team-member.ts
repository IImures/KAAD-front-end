import {GeneralInfoDetails} from "./GeneralInfoDetails";

export interface TeamMember{
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  description: GeneralInfoDetails;
}
