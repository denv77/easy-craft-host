import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideRouter, Router} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {authInterceptor, AuthService, credentialsInterceptor, GATEWAY_URL, initializeUser} from '@easy-craft/auth';
import {buildDynamicRoutes} from './utils/build-dynamic-routes';
import {provideUiCore} from '@easy-craft/ui-core';
import {NbThemeModule} from "@nebular/theme";
// import '@angular/common/locales/global/ru';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter([]),
        provideHttpClient(
            withInterceptors([authInterceptor, credentialsInterceptor])
        ),
        importProvidersFrom(NbThemeModule.forRoot({ name: localStorage.getItem('ec-theme') ?? 'dark' })),
        provideUiCore([]),
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
        },
    ]
};
