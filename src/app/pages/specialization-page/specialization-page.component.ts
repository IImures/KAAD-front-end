import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpecializationService} from "../../services/specialization.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {forkJoin, switchMap} from "rxjs";
import {environment} from "../../../environments/environment";

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
export class SpecializationPageComponent implements OnInit{

  id!: string;
  specText!: string;
  specTitle!: string;
  imageExists: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private specializationService: SpecializationService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          console.log(id);
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
          this.specText = specPage.generalInfo.content;
          this.specTitle = specialization.generalInfo.content;
          this.imageExists = true;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  onImageError() {
    this.imageExists = false;
  }

  protected readonly environment = environment;
}
