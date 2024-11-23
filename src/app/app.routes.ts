import { Routes } from '@angular/router';
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {SpecializationsComponent} from "./pages/specializations/specializations.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {BlogComponent} from "./pages/blog/blog.component";
import {SpecializationPageComponent} from "./pages/specialization-page/specialization-page.component";
import {RoleGuardService} from "./services/role-guard.service";
import {TranslationComponent} from "./editorPages/translation/translation.component";

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
    title: 'Specjalizacje',
  },
  {
    path: 'specialization/:id',
    component: SpecializationPageComponent,
    title: 'Page',
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
  },
  {
    path: 'edit',
    canActivate: [RoleGuardService],
    loadComponent: ()=> import('./editorPages/editor/editor.component').then(m => m.EditorComponent),
    title: 'Configuracja',
    children: [
      {
        path: '',
        loadComponent: ()=> import('./editorPages/editor-home/editor-home.component').then(m => m.EditorHomeComponent),
      },
      {
        path: 'language',
        loadComponent: ()=> import('./editorPages/language-edit/language-edit.component').then(m => m.LanguageEditComponent),
      },
      {
        path: 'translate',
        loadComponent: () => import('./editorPages/translation/translation.component').then(m => m.TranslationComponent),
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./editorPages/login/login.component').then(m=> m.LoginComponent),
    title:'Login',
  },

];
