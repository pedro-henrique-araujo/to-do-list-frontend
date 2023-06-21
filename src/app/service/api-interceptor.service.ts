import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const modifiedRequest = request.clone({
      url: `${environment.apiUrl}/${request.url}`,
      setHeaders: {
        UserId: this.userService.getUserId()
      }
    });

    return next.handle(modifiedRequest);
  }
}
