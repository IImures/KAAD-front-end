import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SpecializationDetails} from "../../../interfaces/specialization-details";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() data!: SpecializationDetails;

  protected readonly environment = environment;
}
