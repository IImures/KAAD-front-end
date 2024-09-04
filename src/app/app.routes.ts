import { Routes } from '@angular/router';
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {SpecializationsComponent} from "./pages/specializations/specializations.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {BlogComponent} from "./pages/blog/blog.component";

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutUsComponent,
    title: 'O nas'
  },
  {
    path: 'specializations',
    component: SpecializationsComponent,
    title: 'Specjalizacje'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Kontakt'
  },
  {
    path: 'blog',
    component: BlogComponent,
    title: 'Blog'
  }

];
