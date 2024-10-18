import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '@easy-craft/auth';
import {MainLayoutComponent} from '@easy-craft/ui-core';
import {manifestService, MfConfig} from './utils/manifest-service';

@Component({
    selector: 'ec-root',
    standalone: true,
    imports: [RouterOutlet, MainLayoutComponent],
    template: `
        <ec-main-layout [menu]="menu" (onLogoutClick)="logout()"></ec-main-layout>
    `,
    styles: [],
})
export class AppComponent implements OnInit {

    menu: any[] = [];

    constructor(private _authService: AuthService) {
    }

    ngOnInit() {
        const manifest = manifestService.getManifest();

        if (manifest) {
            this.menu = manifest.map((mf: MfConfig) => ({
                    title: mf.displayName,
                    link: mf.routePath,
                    icon: mf.remoteName === 'dashboard' ? 'home-outline' : 'person-outline',
                    home: mf.remoteName === 'dashboard'
                }
            ));
        } else {
            console.error('Manifest is not loaded');
        }
    }

    logout() {
        this._authService.logout().subscribe();
    }

}
