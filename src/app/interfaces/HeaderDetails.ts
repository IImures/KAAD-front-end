import {GeneralInfoDetails} from "./GeneralInfoDetails";
import {SpecializationDetails} from "./specialization-details";

export interface HeaderDetails {
  generalInfo:{
    aboutLabel: GeneralInfoDetails;
    specLabel: GeneralInfoDetails;
    blogLabel: GeneralInfoDetails;
    contactLabel: GeneralInfoDetails;
  }
  specializations: SpecializationDetails[]; // adjust the type as needed
}
