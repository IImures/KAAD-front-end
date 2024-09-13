import {Component, HostListener,} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  links = [
    {
      label: 'O nas',
      url: 'about',
      action: (i:number) => this.makeActive(i),
      active: true,
      dropdown: []
    },
    {
      label: 'Specjalizacje',
      url: 'specializations',
      action: (i:number) => this.showSpecializationList(i),
      active: false,
      dropdown: [
        {
          id: '1',
          name: 'Odszkodowania',
        },
        {
          id: '2',
          name: 'Windukacja',
        },
        {
          id: '3',
          name: 'Zamówinie publiczne',
        }
      ]
    },
    {
      label: 'Aktualności',
      url: 'blog',
      action: (i:number) => this.makeActive(i),
      active: true,
      dropdown: []
    },
    {
      label: 'Kontakt',
      url: 'contact',
      action: (i:number) => this.makeActive(i),
      active: true,
      dropdown: []
    }
  ];

  activeLinkIndex = -1;

  isScrolled:boolean = false;
  isListShown: boolean = false;
  activeDropdownIndex: number | null = null;

  // @ViewChildren('dropdown') dropdownMenus!: QueryList<ElementRef>;

  constructor(
    private router: Router,
  ) {
  }

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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.isListShown
      && this.isClickInsideDropdown(event)) {
      this.isListShown = false;
      this.activeDropdownIndex = null;
    }
    console.log(this.isListShown);
  }

  private isClickInsideDropdown(event: Event): boolean {
    console.log('Dropdowns:', document.querySelectorAll('.dropdown-menu')); // Check if this logs correctly
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    if (dropdowns.length == 0) {
      console.log('Dropdown not found');
      return false;
    }
    let ifPressedOutside = true;
    dropdowns.forEach(
      dropdown => {
        console.log('Checking dropdown:', dropdown); // Check each dropdown element
        if (dropdown.contains(event.target as Node)) {
          ifPressedOutside = false;
        }
      }
    );
    return ifPressedOutside;
  }

  public makeActive(index: number) {
    this.isListShown = false;
    this.activeLinkIndex = index;
    this.activeDropdownIndex = null;
  }

  public showSpecializationList(index: number) {

    this.activeLinkIndex = index;

    if (this.isListShown && this.activeDropdownIndex === index) {
      this.isListShown = false;
      this.activeDropdownIndex = null;
      this.router.navigate(['specializations']);
    } else {
      this.isListShown = true;
      this.activeDropdownIndex = index;
    }
    console.log(this.isListShown);

  }
}
