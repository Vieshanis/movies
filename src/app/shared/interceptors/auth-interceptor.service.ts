import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { API_TOKEN } from '../globals';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    req = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', `Bearer ${API_TOKEN}`)
    });

    return next.handle(req);
  }
}
