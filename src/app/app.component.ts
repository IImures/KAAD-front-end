import {Component, ContentChild, ElementRef, OnInit, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kancelaria-adwokacka';
  // @ViewChild('test', {static : true}) testElement!: ElementRef;
  //
  // ngOnInit(){
  //   this.testElement.nativeElement.innerText ="test";
  //   console.log(this.testElement);
  // }
}
