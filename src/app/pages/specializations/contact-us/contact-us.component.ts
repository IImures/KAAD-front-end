import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NavigationalListService} from "../../../services/navigational-list.service";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  constructor(
    public navListService: NavigationalListService
  ) {
  }
}
