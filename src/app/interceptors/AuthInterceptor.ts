import {inject} from "@angular/core";
import {HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {LocalStorageService} from "../services/local-storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

function getToken(): string | null {
  return inject(LocalStorageService).getToken();
}

export function setAuthHeader(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
    const token = getToken();

  if(request.headers.get("Authorization")) {
    return next(request);
  }


  if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  return next(request);
}

export function retryInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response && event.status === 403) {
        const refreshToken = localStorageService.getToken();
        if (!refreshToken) {
          router.navigate(['/login']);
        }
      }
    }),
    catchError(error => {
      if (error.status === 403) {
        const refreshToken = localStorageService.getRefreshToken();

        if (!refreshToken) {
          router.navigate(['/login']);
          return throwError(() => error); // return the error
        }

        return authService.refresh(refreshToken).pipe(
          switchMap(authResponse => {
            if (!authResponse) {
              return throwError(() => error);
            }

            localStorageService.setTokens(authResponse);

            const newReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${authResponse.token}`)
            });

            return next(newReq);
          }),
          catchError(() => {
            router.navigate(['/login']);
            return throwError(() => error);
          })
        );
      } else {
        return throwError(() => error);
      }
    })
  );
}
