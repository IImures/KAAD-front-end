import {Component, HostListener} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  links = [
    { label: 'O nas', url: '#about' },
    { label: 'Specjalizacje', url: '#spec' },
    { label: 'Aktualności', url: '#news' },
    { label: 'Kontakt', url: '#contact' }
  ];

  activeLinkIndex = -1;

  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollOffset = window.scrollY + document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollOffset > 800;
  }

  public makeActive(index: number) {
    this.activeLinkIndex = index;
  }
}
