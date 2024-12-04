import {GeneralInfoRequest} from "./GeneralInfoRequest";

export interface SpecializationRequest {
  specializationNames : GeneralInfoRequest[],
  isHidden: boolean,
}
