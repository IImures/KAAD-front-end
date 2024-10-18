import {Component, HostListener, OnInit,} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NavigationalListService} from "../../services/navigational-list.service";
import {LanguageListComponent} from "./laguage-list/language-list.component";
import {GeneralInfoService} from "../../services/general-info.service";
import {LanguageService} from "../../services/language.service";
import {SpecializationService} from "../../services/specialization.service";
import {HeaderLinks} from "../../interfaces/HeaderLinks";
import {debounceTime, forkJoin} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf,
    LanguageListComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  links : HeaderLinks[] = [
    {
      label: '',
      code: "aboutLabel",
      url: 'about',
      action: (i:number) => this.makeActive(i),
      active: true,
      dropdown: []
    },
    {
      label: '',
      code: "specLabel",
      url: 'specializations',
      action: (i:number) => this.showSpecializationList(i),
      active: false,
      dropdown: [
        // {
        //   id: '1',
        //   name: 'Odszkodowania',
        // },
        // {
        //   id: '2',
        //   name: 'Windukacja',
        // },
        // {
        //   id: '3',
        //   name: 'Zamówinie publiczne',
        // }
      ]
    },
    {
      label: '',
      code: "blogLabel",
      url: 'blog',
      action: (i:number) => this.makeActive(i),
      active: true,
      dropdown: []
    },
    {
      label: '',
      code: "contactLabel",
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
  loaded = false;

  constructor(
    private router: Router,
    public navListService: NavigationalListService,
    private generalInfoService: GeneralInfoService,
    private languageService: LanguageService,
    private specializationService: SpecializationService,
  ) {
  }

  ngOnInit() {
    this.updateInfo();
    //this.getInfo();
  }

  private updateInfo(){
    this.languageService.language$.pipe(
      debounceTime(300)
    ).subscribe(
      ()=> {
        this.getInfo();
      }
    )
  }

  getInfo() {
    const requests = [
      this.generalInfoService.getInfo('aboutLabel'),
      this.generalInfoService.getInfo('specLabel'),
      this.generalInfoService.getInfo('blogLabel'),
      this.generalInfoService.getInfo('contactLabel')
    ];

    forkJoin(requests).subscribe((responses) => {
      const [aboutInfo, specInfo, blogInfo, contactInfo] = responses;

      this.updateLinkInfo(aboutInfo);
      this.updateLinkInfo(specInfo);

      const specLinkInfo = this.links.find(link => link.code === specInfo.code);
      if (specLinkInfo) {
        specLinkInfo.label = specInfo.content;
        this.loadSpecializations(specLinkInfo);
      }

      this.updateLinkInfo(blogInfo);
      this.updateLinkInfo(contactInfo);
      this.loaded = true;
    });
  }

  private updateLinkInfo(info: any) {
    const linkInfo = this.links.find(link => link.code === info.code);
    if (linkInfo) {
      linkInfo.label = info.content;
    }
  }

  private loadSpecializations(linkInfo: any) {
    this.specializationService.getSpecialization().subscribe(infos => {
      linkInfo.dropdown = infos.map(info => ({
        id: info.id,
        name: info.generalInfo.content
      }));
    });
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
  }

  private isClickInsideDropdown(event: Event): boolean {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    if (dropdowns.length == 0) {
      return false;
    }
    let ifPressedOutside = true;
    dropdowns.forEach(
      dropdown => {
        if (dropdown.contains(event.target as Node)) {
          ifPressedOutside = false;
        }
      }
    );
    return ifPressedOutside;
  }

  public makeActive(index: number) {
    this.isListShown = false;
    this.navListService.setActive(index);
    this.activeDropdownIndex = null;
  }

  public showSpecializationList(index: number) {

    if (this.isListShown && this.activeDropdownIndex === index) {
      this.isListShown = false;
      this.activeDropdownIndex = null;
      this.navListService.setActive(index);
      this.router.navigate(['specializations']);
    } else {
      this.isListShown = true;
      this.activeDropdownIndex = index;
    }

  }
}
