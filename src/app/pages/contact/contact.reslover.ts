import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { GeneralInfoService } from '../../services/general-info.service';
import { SpecializationService } from '../../services/specialization.service';
import { ContactServiceService } from '../../services/contact-service.service';
import {ContactPageDetails} from "../../interfaces/ContactPageDetails";

@Injectable({
  providedIn: 'root'
})
export class ContactResolver implements Resolve<ContactPageDetails> {
  constructor(
    private generalInfoService: GeneralInfoService,
    private specializationService: SpecializationService,
    private contactService: ContactServiceService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContactPageDetails> {
    const generalInfo$ = forkJoin({
      contactTitle: this.generalInfoService.getInfo('contactTitle'),
      contactDescription: this.generalInfoService.getInfo('contactDescription'),
      fullNameLabel: this.generalInfoService.getInfo('fullNameLabel'),
      emailLabel: this.generalInfoService.getInfo('emailLabel'),
      phoneLabel: this.generalInfoService.getInfo('phoneNumberLabel'),
      serviceTypeLabel: this.generalInfoService.getInfo('serviceTypeLabel'),
      communicationMethodLabel: this.generalInfoService.getInfo('communicationMethodLabel'),
      sendFormLabel: this.generalInfoService.getInfo('sendFormLabel'),
      errorFormLabel: this.generalInfoService.getInfo('errorFormLabel'),
      successFormLabel: this.generalInfoService.getInfo('successFormLabel'),
      serverErrorFormLabel: this.generalInfoService.getInfo('serverErrorFormLabel')
    });

    const services$ = this.specializationService.getSpecializations(true);
    const contactTypes$ = this.contactService.getContactTypes();

    return forkJoin({
      generalInfo: generalInfo$,
      services: services$,
      contactTypes: contactTypes$
    });
  }
}
