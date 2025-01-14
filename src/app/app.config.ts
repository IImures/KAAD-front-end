import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {retryInterceptor, setAuthHeader} from "./interceptors/AuthInterceptor";
import {ErrorInterceptor} from "./interceptors/ErrorInterceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([setAuthHeader, retryInterceptor])
     ),
    { provide: ErrorHandler, useClass: ErrorInterceptor },
    provideClientHydration()
  ]
};
