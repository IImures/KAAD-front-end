import {Component, Input, ViewEncapsulation} from '@angular/core';
import {GeneralInfoDetails} from "../../../interfaces/GeneralInfoDetails";

@Component({
  selector: 'app-main-text-section',
  standalone: true,
  imports: [],
  templateUrl: './main-text-section.component.html',
  styleUrl: './main-text-section.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MainTextSectionComponent {


  @Input() content!: GeneralInfoDetails;

}
