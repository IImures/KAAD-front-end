import { Component } from '@angular/core';
import {LanguageCreateComponent} from "./language-create/language-create.component";
import {LanguageListComponent} from "./language-list/language-list.component";

@Component({
  selector: 'app-language-edit',
  standalone: true,
  imports: [
    LanguageListComponent,
    LanguageCreateComponent,
    LanguageListComponent
  ],
  templateUrl: './language-edit.component.html',
  styleUrl: './language-edit.component.scss'
})
export class LanguageEditComponent {

  languageCreatedFlag: boolean = false;

  updateList(event: any) {
    this.languageCreatedFlag = !this.languageCreatedFlag;
  }
}
