import { Component } from '@angular/core';
import {SpecializationCreateComponent} from "./specialization-create/specialization-create.component";
import {SpecializationListComponent} from "./specialization-list/specialization-list.component";

@Component({
  selector: 'app-specialization-edit',
  standalone: true,
  imports: [
    SpecializationCreateComponent,
    SpecializationListComponent
  ],
  templateUrl: './specialization-edit.component.html',
  styleUrl: './specialization-edit.component.scss'
})
export class SpecializationEditComponent {

}
