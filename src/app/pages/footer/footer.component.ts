import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  links =[
    {
      url: "#test",
      label: 'ul. Żurawia 22 lok.308',
    },
    {
      url: "#test",
      label: '00-515 Warszawa',
    },
    {
      url: "#test",
      label: '22 85 333 88',
    },
    {
      url: "#test",
      label: 'biuro@kancelaria.pl',
    },
  ]
}
