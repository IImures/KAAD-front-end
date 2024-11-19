import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./pages/header/header.component";
import {FooterComponent} from "./pages/footer/footer.component";
import {isPlatformBrowser, NgIf} from "@angular/common";
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Kancelaria Adwokacka';
  isBrowser: boolean = false;

  showHeader = false;
  showFooter = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if(!this.isBrowser) {return}
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        this.updateHeaderFooterVisibility(event.urlAfterRedirects);
      }
    });
  }

  updateHeaderFooterVisibility(url: string) {
    const hiddenRoutesForHeader = environment.hideHeaderOn
    this.showHeader = !hiddenRoutesForHeader.some(route => url.includes(route));

    if(this.showHeader) {

    }

    const hiddenRoutesForFooter = environment.hideFooterOn
    this.showFooter = !hiddenRoutesForFooter.some(route => url.includes(route));
  }

}
