import { Component } from '@angular/core';
import {SpecializationCard} from "../interfaces/specialization-card";
import {CardComponent} from "./card/card.component";
import {NgForOf} from "@angular/common";
import {ContactUsComponent} from "./contact-us/contact-us.component";

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
export class SpecializationsComponent {
  public specializations: SpecializationCard[] = [
    {
      id: '1',
      name: 'Odszkodowania',
      icon: '/assets/icons/gavel.png',
    },
    {
      id: '2',
      name: 'Windukacja',
      icon: '/assets/icons/justice-scale.png',
    },
    {
      id: '3',
      name: 'Zamówinie publiczne',
      icon: '/assets/icons/commercial.png',
    },
    {
      id: '1',
      name: 'Odszkodowania',
      icon: '/assets/icons/gavel.png',
    },
    {
      id: '2',
      name: 'Windukacja',
      icon: '/assets/icons/justice-scale.png',
    },
    {
      id: '3',
      name: 'Zamówinie publiczne',
      icon: '/assets/icons/commercial.png',
    },
  ]
}
