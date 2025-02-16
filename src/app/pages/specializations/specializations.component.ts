import {Component, OnInit} from '@angular/core';
import {CardComponent} from "./card/card.component";
import {NgForOf} from "@angular/common";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {SpecializationDetails} from "../../interfaces/specialization-details";
import {SpecializationService} from "../../services/specialization.service";
import {LanguageService} from "../../services/language.service";
import {GeneralInfoService} from "../../services/general-info.service";
import {debounceTime, forkJoin, skip} from "rxjs";
import {GeneralInfoDetails} from "../../interfaces/GeneralInfoDetails";

@Component({
  selector: 'app-specializations',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    ContactUsComponent
  ],
  templateUrl: './specializations.component.html',
  styleUrl: './specializations.component.scss'
})
export class SpecializationsComponent implements OnInit {

  public title: string = "Główne specjalizacje";
  public specializations: SpecializationDetails[] = []

  public contactUs! : string;

  constructor(
    private generalInfoService: GeneralInfoService,
    private specializationService: SpecializationService,
    private languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
    this.updateInfo();
    this.getInfo();
  }

  private updateInfo(){
    this.languageService.language$.pipe(
      skip(1),
      debounceTime(300)
    ).subscribe(
      ()=> {
        this.getInfo();
      }
    );
  }

  private getInfo() {
    this.generalInfoService.getInfo('specTitle')
      .subscribe({
        next: data => {
          this.title = data.content;
        }
      });

    const requests = [
      this.generalInfoService.getInfo("specTitle"),
      this.generalInfoService.getInfo("contactBanner"),
    ];

    forkJoin(requests).subscribe({
      next: (response: GeneralInfoDetails[]) => {
        const [specTitleInfo, contactTitleInfo] = response;

        this.title = specTitleInfo.content;
        this.contactUs = contactTitleInfo.content;
      }
    })

    this.specializationService.getSpecializations()
      .subscribe({
        next: data => {
          this.specializations = data;
        }
      });
  }
}
