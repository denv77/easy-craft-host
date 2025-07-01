import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '@easy-craft/auth';
import {MainLayoutComponent} from '@easy-craft/ui-core';
import {manifestService, MfConfig} from './utils/manifest-service';
import {NbThemeService} from "@nebular/theme";

@Component({
    selector: 'ec-root',
    standalone: true,
    imports: [RouterOutlet, MainLayoutComponent],
    template: `
        <ec-main-layout [menu]="menu" (onLogoutClick)="logout()" title="Личный кабинет"></ec-main-layout>
    `,
    styles: [],
})
export class AppComponent implements OnInit {

    menu: any[] = [];

    constructor(private _authService: AuthService, private _themeService: NbThemeService  ) {
        this._themeService.onThemeChange().subscribe(theme => {
            localStorage.setItem('ec-theme',theme.name);
        });
    }

    ngOnInit() {
        const manifest = manifestService.getManifest();

        if (manifest) {
            this.menu = manifest.map((mf: MfConfig) => ({
                    title: mf.displayName,
                    link: mf.routePath,
                    icon: mf.icon,
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
