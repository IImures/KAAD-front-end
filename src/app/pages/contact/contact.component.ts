import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {GeneralInfoService} from "../../services/general-info.service";
import {debounceTime, forkJoin} from "rxjs";
import {SpecializationService} from "../../services/specialization.service";
import {NgForOf} from "@angular/common";
import {ContactServiceService} from "../../services/contact-service.service";
import {ContactTypeDetails} from "../../interfaces/ContactTypeDetails";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ContactDetails} from "../../interfaces/ContactDetails";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements OnInit{

  public title!: string;
  public description!: string;
  public fullNameLabel!: string;
  public emailLabel!: string;
  public phoneLabel!: string;
  public serviceTypeLabel!: string;
  public communicationMethodLabel!: string;
  public sendFormLabel!: string;

  public services!: string[];
  public contactTypes!: ContactTypeDetails[];

  contactForm: FormGroup;

  constructor(
    private languageService: LanguageService,
    private generalInfoService: GeneralInfoService,
    private specializationService: SpecializationService,
    private contactService: ContactServiceService,
    private fb: FormBuilder,
  ) {
    this.contactForm = this.fb.nonNullable.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.pattern('^\\+?[0-9]{7,15}$')]],
      email: ['', [Validators.email]],
      serviceType: ['', Validators.required],
      communicationMethod: ['', Validators.required]
    }, { validators: this.phoneOrEmailValidator });
  }

  onSubmit() {

    if (this.contactForm.valid) {
      const formData : ContactDetails = this.contactForm.value;
      console.log(formData);
      // this.http.post('https://your-backend-api.com/submit', formData)
      //   .subscribe({
      //     next: (response: any) => {
      //
      //     },
      //     error: (error) => {
      //
      //     }
      //   });
    }

  }

  phoneOrEmailValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const phone = control.get('phone')?.value;
    const email = control.get('email')?.value;
    if (!phone && !email) {
      return { phoneOrEmailRequired: true };
    }
    return null;
  };

  ngOnInit() {
    this.updateInfo();
    this.getInfo();
  }

  getInfo() {
    const requests = [
      this.generalInfoService.getInfo('contactTitle'),
      this.generalInfoService.getInfo('contactDescription'),
      this.generalInfoService.getInfo('fullNameLabel'),
      this.generalInfoService.getInfo('emailLabel'),
      this.generalInfoService.getInfo('phoneNumberLabel'),
      this.generalInfoService.getInfo('serviceTypeLabel'),
      this.generalInfoService.getInfo('comunicationMethodLabel'),
      this.generalInfoService.getInfo('sendFormLabel'),
    ];

    this.specializationService.getSpecializations().subscribe(
      (responses) => {
        this.services = responses.map((value) => {
          return value.generalInfo.content;
        });
      }
    );

    this.contactService.getContactTypes().subscribe(
      (responses) => {
        this.contactTypes = responses;
      }
    )

    forkJoin(requests).subscribe((responses) => {
      const [
        contactTitle,
        contactDescription,
        fullNameLabel,
        emailLabel,
        phoneLabel,
        serviceTypeLabel,
        communicationMethodLabel,
        sendFormLabel,
      ] = responses;

      this.title = contactTitle.content;
      this.description = contactDescription.content;
      this.fullNameLabel = fullNameLabel.content;
      this.emailLabel = emailLabel.content;
      this.phoneLabel = phoneLabel.content;
      this.serviceTypeLabel = serviceTypeLabel.content;
      this.sendFormLabel = sendFormLabel.content;
      this.communicationMethodLabel = communicationMethodLabel.content;
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
