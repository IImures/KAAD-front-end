import {Component, HostListener} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  links = [
    { label: 'O nas', url: 'about' },
    { label: 'Specjalizacje', url: 'specializations' },
    { label: 'Aktualności', url: 'blog' },
    { label: 'Kontakt', url: 'contact' }
  ];

  activeLinkIndex = -1;

  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const minWidth = 768;

    if (window.innerWidth > minWidth) {
      const scrollOffset = window.scrollY + document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.isScrolled = scrollOffset > 800;
    }else{
      this.isScrolled = false;
    }
  }

  public makeActive(index: number) {
    this.activeLinkIndex = index;
  }
}