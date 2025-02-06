import {APP_INITIALIZER, ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {retryInterceptor, setAuthHeader} from "./interceptors/AuthInterceptor";
import {ErrorInterceptor} from "./interceptors/ErrorInterceptor";
import {lastValueFrom} from "rxjs";
import {HeaderService} from "./pages/header/header.service";

export function initializeHeaderData(headerDataService: HeaderService) {
  console.log(0);
  return () => lastValueFrom(headerDataService.loadHeaderData());
}

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
    {
      provide: APP_INITIALIZER,
      useFactory: initializeHeaderData,
      deps: [HeaderService],
      multi: true
    },
    provideClientHydration()
  ]
};
