import {ErrorHandler, Injectable} from "@angular/core";


@Injectable()
export class ErrorInterceptor implements ErrorHandler {

  constructor() {}

  handleError(error: any): void {
    console.warn(error);
  }
}
