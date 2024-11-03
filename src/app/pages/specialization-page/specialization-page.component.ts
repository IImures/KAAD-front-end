import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpecializationService} from "../../services/specialization.service";
import {NgIf} from "@angular/common";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-specialization-page',
  standalone: true,
  imports: [
    NgIf
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
    const id = this.route.snapshot.paramMap.get('id');

    if(!id) return;
    this.id = id;

    forkJoin({
      specPage: this.specializationService.getSpecializationPage(id),
      specialization: this.specializationService.getSpecialization(id)
    }).subscribe({
      next: ({ specPage, specialization }) => {
        // Handle the responses
        this.specText = specPage.generalInfo.content;
        this.specTitle = specialization.generalInfo.content;
      },
      error: (err) => {
        console.error('Error loading specialization data:', err);
      }
    });
  }

  onImageError() {
    this.imageExists = false;
  }
}
