import { Routes } from '@angular/router';
import {AboutUsComponent} from "./about-us/about-us.component";
import {SpecializationsComponent} from "./specializations/specializations.component";

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'specializations',
    component: SpecializationsComponent
  }

];
