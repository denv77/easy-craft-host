import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {EcLayoutComponent} from '@easy-craft/layout';
import {AuthService} from '@easy-craft/auth';

@Component({
    selector: 'ec-root',
    standalone: true,
    imports: [RouterOutlet, EcLayoutComponent],
    template: `
        <ec-layout (logout)="logout()"></ec-layout>
    `,
    styles: [],
})
export class AppComponent {
    constructor(private _authService: AuthService) {
    }

    logout() {
        this._authService.logout().subscribe();
    }
}
