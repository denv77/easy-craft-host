import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideRouter, Router} from '@angular/router';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {authInterceptor, AuthService, initializeUser} from "@easy-craft/auth";
import {buildDynamicRoutes} from "./utils/build-dynamic-routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimationsAsync(),
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: buildDynamicRoutes,
      deps: [Router],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUser,
      multi: true
    }
  ]
};
