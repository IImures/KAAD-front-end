import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {GeneralInfoService} from "../../services/general-info.service";
import {debounceTime, forkJoin} from "rxjs";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements OnInit{

  public title!: string;
  public description!: string;

  constructor(
    private languageService: LanguageService,
    private generalInfoService: GeneralInfoService,
  ) {
  }

  ngOnInit() {
    this.updateInfo();
    this.getInfo();
  }

  getInfo() {
    const requests = [
      this.generalInfoService.getInfo('contactTitle'),
      this.generalInfoService.getInfo('contactDescription'),
    ];

    forkJoin(requests).subscribe((responses) => {
      const [contactTitle, contactDescription] = responses;

      this.title = contactTitle.content;
      this.description = contactDescription.content;
    });
  }

  private updateInfo(){
    this.languageService.language$.pipe(
      debounceTime(300)
    ).subscribe(
      ()=> {
        this.getInfo();
      }
    )
  }

}
