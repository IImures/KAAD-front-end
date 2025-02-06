import {GeneralInfoDetails} from "./GeneralInfoDetails";
import {SpecializationDetails} from "./specialization-details";
import {ContactTypeDetails} from "./ContactTypeDetails";

export interface ContactPageDetails {
  generalInfo: {
    contactTitle: GeneralInfoDetails;
    contactDescription: GeneralInfoDetails;
    fullNameLabel: GeneralInfoDetails;
    emailLabel: GeneralInfoDetails;
    phoneLabel: GeneralInfoDetails;
    serviceTypeLabel: GeneralInfoDetails;
    communicationMethodLabel: GeneralInfoDetails;
    sendFormLabel: GeneralInfoDetails;
    errorFormLabel: GeneralInfoDetails;
    successFormLabel: GeneralInfoDetails;
    serverErrorFormLabel: GeneralInfoDetails;
  }
  services: SpecializationDetails[],
  contactTypes: ContactTypeDetails[]
}
