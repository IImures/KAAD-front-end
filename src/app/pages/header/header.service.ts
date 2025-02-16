import { Injectable } from '@angular/core';
import {Observable, forkJoin, map} from 'rxjs';
import { GeneralInfoService } from '../../services/general-info.service';
import { SpecializationService } from '../../services/specialization.service';
import {HeaderDetails} from "../../interfaces/HeaderDetails";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  headerData!: HeaderDetails;

  constructor(
    private generalInfoService: GeneralInfoService,
    private specializationService: SpecializationService
  ) {}

  loadHeaderData(): Observable<HeaderDetails> {

    const generalInfo$ = forkJoin({
      aboutLabel: this.generalInfoService.getInfo('aboutLabel'),
      specLabel: this.generalInfoService.getInfo('specLabel'),
      blogLabel: this.generalInfoService.getInfo('blogLabel'),
      contactLabel: this.generalInfoService.getInfo('contactLabel'),
    })

    const specialization$ = this.specializationService.getSpecializations()

    return forkJoin({
      generalInfo: generalInfo$,
      specializations: specialization$
    }).pipe(
      map(response =>{
        this.headerData = response;
        return this.headerData;
      }),
    );
  }
}
