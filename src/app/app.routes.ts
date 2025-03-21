import { Routes } from '@angular/router';
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {SpecializationsComponent} from "./pages/specializations/specializations.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {BlogComponent} from "./pages/blog/blog.component";
import {SpecializationPageComponent} from "./pages/specialization-page/specialization-page.component";
import {RoleGuardService} from "./services/role-guard.service";
import {ContactResolver} from "./pages/contact/contact.reslover";
import {AboutUsResolver} from "./pages/about-us/about-us.resolver";
import {SpecsResolver} from "./pages/specializations/specs.resolver";

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutUsComponent,
    title: 'O nas',
     resolve:{aboutUsPage: AboutUsResolver}
  },
  {
    path: 'specializations',
    component: SpecializationsComponent,
    title: 'Specjalizacje',
    resolve:{specializationsPage: SpecsResolver}
  },
  {
    path: 'specialization/:id',
    component: SpecializationPageComponent,
    title: 'Page',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Kontakt',
    resolve:{contactPage: ContactResolver}
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
      },
      {
        path: 'spec',
        loadComponent: () => import('./editorPages/specialization-edit/specialization-edit.component').then(m => m.SpecializationEditComponent),
      },
      {
        path: 'specialization-page',
        loadComponent: () => import('./editorPages/spec-page-edit/spec-page-edit.component').then(m => m.SpecPageEditComponent),
      },
      {
        path: 'specialization-page/:id',
        loadComponent: () => import('./editorPages/spec-page-edit/page-edit/page-edit.component').then(m => m.PageEditComponent),
      },
      {
        path: 'team-member',
        loadComponent: () => import('./editorPages/team-member-editor/team-member-editor.component').then(m => m.TeamMemberEditorComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./editorPages/profile/profile.component').then(m => m.ProfileComponent),
      },
      {
        path: 'post',
        loadComponent: () => import('./editorPages/post-edit/post-edit.component').then(m => m.PostEditComponent),
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./editorPages/login/login.component').then(m=> m.LoginComponent),
    title:'Login',
  },

];
