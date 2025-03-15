import {Component, Inject, makeStateKey, OnDestroy, OnInit, PLATFORM_ID, TransferState} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpecializationService} from "../../services/specialization.service";
import {isPlatformServer, NgIf, NgOptimizedImage} from "@angular/common";
import {debounceTime, forkJoin, Subscription, switchMap} from "rxjs";
import {environment} from "../../../environments/environment";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-specialization-page',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './specialization-page.component.html',
  styleUrl: './specialization-page.component.scss'
})
export class SpecializationPageComponent implements OnInit, OnDestroy {

  id!: string;
  specText!: string;
  specTitle!: string;
  imageExists: boolean = true;

  platformId: Object;
  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private specializationService: SpecializationService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) platformId: Object,
    private transferState: TransferState
  ) {
    this.platformId = platformId;
  }

  ngOnInit() {
    if(
      this.transferState.hasKey(makeStateKey('specsText')) &&
      this.transferState.hasKey(makeStateKey('specTitle')) &&
      this.transferState.hasKey(makeStateKey('id'))
    ){
      this.specText = this.transferState.get(makeStateKey('specsText'), '')
      this.specTitle = this.transferState.get(makeStateKey('specTitle'),'')
      this.id = <string>this.transferState.get(makeStateKey('id'), null);
    }else{
      this.getInfo();
    }
    this.updateInfo();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onImageError() {
    this.imageExists = false;
  }
  private updateInfo() {
    this.sub = this.languageService.language$.pipe(
      debounceTime(300)
    ).subscribe(
      ()=> {
        this.getInfo();
      }
    );
  }

  private getInfo(){
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (!id) {
            throw new Error('No ID found in route parameters');
          }
          this.id = id;

          return forkJoin({
            specPage: this.specializationService.getSpecializationPage(id),
            specialization: this.specializationService.getSpecialization(id),
          });
        })
      )
      .subscribe({
        next: ({ specPage, specialization }) => {

          if (isPlatformServer(this.platformId)) {
            // @ts-ignore
            this.transferState.set(makeStateKey('specsText'), specPage.generalInfo.content);
            // @ts-ignore
            this.transferState.set(makeStateKey('specTitle'), specialization.generalInfo.content);
            // @ts-ignore
            this.transferState.set(makeStateKey('id'), this.id);
          }

          this.specText = specPage.generalInfo.content;
          this.specTitle = specialization.generalInfo.content;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  protected readonly environment = environment;


}
