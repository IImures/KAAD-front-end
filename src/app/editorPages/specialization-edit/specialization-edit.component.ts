import { Component } from '@angular/core';
import {SpecializationCreateComponent} from "./specialization-create/specialization-create.component";

@Component({
  selector: 'app-specialization-edit',
  standalone: true,
  imports: [
    SpecializationCreateComponent
  ],
  templateUrl: './specialization-edit.component.html',
  styleUrl: './specialization-edit.component.scss'
})
export class SpecializationEditComponent {

}
