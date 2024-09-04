import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-main-text-section',
  standalone: true,
  imports: [],
  templateUrl: './main-text-section.component.html',
  styleUrl: './main-text-section.component.scss'
})
export class MainTextSectionComponent {

  @Input() title: string ='';
  @Input() text: string = '';

}
