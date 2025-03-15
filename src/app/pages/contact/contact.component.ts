import {Component, Inject, makeStateKey, OnDestroy, OnInit, PLATFORM_ID, TransferState, ViewChild} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {GeneralInfoService} from "../../services/general-info.service";
import {debounceTime, forkJoin, Subscription} from "rxjs";
import {SpecializationService} from "../../services/specialization.service";
import {isPlatformServer, NgForOf} from "@angular/common";
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
import {MessageDialogComponent} from "../../components/message-dialog/message-dialog.component";
import {SpecializationDetails} from "../../interfaces/specialization-details";
import {ActivatedRoute} from "@angular/router";
import {ContactPageDetails} from "../../interfaces/ContactPageDetails";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    MessageDialogComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements OnInit, OnDestroy{

  public title!: string;
  public description!: string;
  public fullNameLabel!: string;
  public emailLabel!: string;
  public phoneLabel!: string;
  public serviceTypeLabel!: string;
  public communicationMethodLabel!: string;
  public sendFormLabel!: string;

  public services!: SpecializationDetails[];
  public contactTypes!: ContactTypeDetails[];

  @ViewChild(MessageDialogComponent) messageDialog!: MessageDialogComponent;
  public dialogErrorMessage!: string;
  public dialogSuccessMessage!: string;
  public serverErrorMessage!: string;

  public dialogMessage!: string;

  contactForm: FormGroup;
  platformId: Object;
  private langSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private generalInfoService: GeneralInfoService,
    private specializationService: SpecializationService,
    private contactService: ContactServiceService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object,
    private transferState: TransferState
  ) {
    this.platformId = platformId;

    this.contactForm = this.fb.nonNullable.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.pattern('^\\+?[0-9]{7,15}$')],
      email: ['', Validators.email],
      specializationId: ['', Validators.required],
      contactTypeId: ['', Validators.required]
    } , { validators: this.phoneOrEmailValidator });
    this.updateInfo();
  }

  onSubmit() {

    if (this.contactForm.valid) {
      const formData : ContactDetails = this.contactForm.value;
      this.contactService.sendContact(formData);
      this.contactService.sendContact(formData).subscribe({
        next: () => {
          this.dialogMessage = this.dialogSuccessMessage;
          this.messageDialog.showDialog();
        },
        error: () => {
          this.dialogMessage = this.serverErrorMessage;
          this.messageDialog.showDialog();
        }
      })

    }else{
      this.dialogMessage = this.dialogErrorMessage;
      this.messageDialog.showDialog();
    }

  }

  phoneOrEmailValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const phone = control.get('phoneNumber')?.value;
    const email = control.get('email')?.value;
    if (!phone && !email) {
      return { phoneOrEmailRequired: true };
    }
    return null;
  };

  ngOnInit() {
    if(this.transferState.hasKey(makeStateKey('contactPage'))){
      let data: ContactPageDetails = <ContactPageDetails>this.transferState.get(makeStateKey('contactPage'), null);
      this.setData(data);
    }else{
      this.getInfo();
    }
  }

  ngOnDestroy() {
    this.langSub.unsubscribe();
  }

  getInfo() {
    this.route.data.subscribe((data: any) => {
      const resolved : ContactPageDetails = data.contactPage;
      if(isPlatformServer(this.platformId)){
        this.transferState.set(makeStateKey('contactPage'), data.contactPage)
      }
      this.setData(resolved);
    });
  }

  private setData(data: ContactPageDetails) {
    this.title = data.generalInfo.contactTitle.content;
    this.description = data.generalInfo.contactDescription.content;
    this.fullNameLabel = data.generalInfo.fullNameLabel.content;
    this.emailLabel = data.generalInfo.emailLabel.content;
    this.phoneLabel = data.generalInfo.phoneLabel.content;
    this.serviceTypeLabel = data.generalInfo.serviceTypeLabel.content;
    this.communicationMethodLabel = data.generalInfo.communicationMethodLabel.content;
    this.sendFormLabel = data.generalInfo.sendFormLabel.content;
    this.dialogErrorMessage = data.generalInfo.errorFormLabel.content;
    this.dialogSuccessMessage = data.generalInfo.successFormLabel.content;
    this.serverErrorMessage = data.generalInfo.serverErrorFormLabel.content;

    this.services = data.services;
    this.contactTypes = data.contactTypes;
  }

  private updateInfo(){
    this.langSub = this.languageService.language$.pipe(
      debounceTime(300)
    ).subscribe(
      ()=> {
        this.refreshInfo();
      }
    )
  }

  private refreshInfo(){
    const requests = [
      this.generalInfoService.getInfo('contactTitle'),
      this.generalInfoService.getInfo('contactDescription'),
      this.generalInfoService.getInfo('fullNameLabel'),
      this.generalInfoService.getInfo('emailLabel'),
      this.generalInfoService.getInfo('phoneNumberLabel'),
      this.generalInfoService.getInfo('serviceTypeLabel'),
      this.generalInfoService.getInfo('communicationMethodLabel'),
      this.generalInfoService.getInfo('sendFormLabel'),
      this.generalInfoService.getInfo('errorFormLabel'),
      this.generalInfoService.getInfo('successFormLabel'),
      this.generalInfoService.getInfo('serverErrorFormLabel'),
    ];

    this.specializationService.getSpecializations(true).subscribe(
      (responses) => {
        this.services = responses;
      }
    );

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
        errorFormLabel,
        successFormLabel,
        serverErrorFormLabel,
      ] = responses;

      this.title = contactTitle.content;
      this.description = contactDescription.content;
      this.fullNameLabel = fullNameLabel.content;
      this.emailLabel = emailLabel.content;
      this.phoneLabel = phoneLabel.content;
      this.serviceTypeLabel = serviceTypeLabel.content;
      this.sendFormLabel = sendFormLabel.content;
      this.communicationMethodLabel = communicationMethodLabel.content;
      this.dialogErrorMessage = errorFormLabel.content;
      this.dialogSuccessMessage = successFormLabel.content;
      this.serverErrorMessage = serverErrorFormLabel.content;
    });
  }

}
