import {Component, Inject, makeStateKey, OnInit, PLATFORM_ID, TransferState,} from '@angular/core';
import {CardComponent} from "./card/card.component";
import {isPlatformServer, NgForOf} from "@angular/common";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {SpecializationDetails} from "../../interfaces/specialization-details";
import {SpecializationService} from "../../services/specialization.service";
import {LanguageService} from "../../services/language.service";
import {GeneralInfoService} from "../../services/general-info.service";
import {debounceTime, forkJoin} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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
  platformId: Object;


  constructor(
    private route: ActivatedRoute,
    private generalInfoService: GeneralInfoService,
    private specializationService: SpecializationService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) platformId: Object,
    private transferState: TransferState
  ) {
    this.platformId = platformId;
  }

  ngOnInit(): void {

    if(this.transferState.hasKey(makeStateKey('specsPage'))){
      let data : any = this.transferState.get(makeStateKey('specsPage'), null);
      this.title = data.specTitle.content;
      this.contactUs = data.contactBanner.content;
      this.specializations = data.specs;
    }else{
      this.getInfo();
    }
    this.updateInfo();
  }

  private updateInfo(){
    this.languageService.language$.pipe(
      debounceTime(300)
    ).subscribe(
      ()=> {
        this.refreshInfo();
      }
    );
  }

  private getInfo() {

    this.route.data.subscribe((data: any) => {
      const resolved = data.specializationsPage;
      if (isPlatformServer(this.platformId)) {
        this.transferState.set(makeStateKey('specsPage'), resolved);
      }
      this.title = resolved.specTitle.content;
      this.contactUs = resolved.contactBanner.content;
      this.specializations = resolved.specs;
    });

  }

  private refreshInfo() {
    const requests = [
      this.generalInfoService.getInfo("specTitle"),
      this.generalInfoService.getInfo("contactBanner"),
      this.specializationService.getSpecializations()
    ];

    forkJoin(requests).subscribe({
      next: (response: any) => {
        const [specTitleInfo, contactTitleInfo, specializations] = response;

        this.title = specTitleInfo.content;
        this.contactUs = contactTitleInfo.content;
        this.specializations = specializations;
      }
    })
  }
}
