import { Routes } from '@angular/router';
import {AboutUsComponent} from "./about-us/about-us.component";

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutUsComponent
  }

];
