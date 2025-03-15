import {HttpInterceptorFn, HttpResponse} from "@angular/common/http";
import {of, tap} from "rxjs";
import {environment} from "../../environments/environment";

const cache = new Map<string, { response: HttpResponse<any>; expiry: number }>();
const DEFAULT_TTL = environment.cacheTtl; // TTL in milliseconds (5 minutes)

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  const cacheKey = req.urlWithParams;
  const cached = cache.get(cacheKey);

  if (cached && cached.expiry > Date.now()) {
    return of(cached.response.clone());
  } else if (cached) {
    cache.delete(cacheKey);
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.set(cacheKey, {
          response: event.clone(),
          expiry: Date.now() + DEFAULT_TTL
        });
      }
    })
  );
};
