import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss'
})
export class MessageDialogComponent {
  isVisible: boolean = false;
  @Input() message: string = '';

  showDialog() {
    this.isVisible = true;
  }

  // Method to close the dialog
  closeDialog() {
    this.isVisible = false;
  }
}
