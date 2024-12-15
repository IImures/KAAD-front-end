import {GeneralInfoRequest} from "./GeneralInfoRequest";

export interface MemberRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  priority: number;
  description: GeneralInfoRequest[];
}
