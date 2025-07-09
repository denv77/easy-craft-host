import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from '@easy-craft/ui-core';
import { manifestService, MfConfig } from './utils/manifest-service';
import { NbDialogService, NbThemeService } from "@nebular/theme";
import { SessionService } from './services/session.service';
import { SessionWarningComponent } from './components/session-warning/session-warning.component';

@Component({
    selector: 'ec-root',
    standalone: true,
    imports: [MainLayoutComponent],
    template: `
        <ec-main-layout [menu]="menu" (onLogoutClick)="logout()" title="Личный кабинет"></ec-main-layout>
    `,
    styles: [],
})
export class AppComponent implements OnInit {

    menu: any[] = [];

    isDialogOpened: boolean = false;

    constructor(private _themeService: NbThemeService,
                private _sessionService: SessionService,
                private _dialogService: NbDialogService) {

        this._themeService.onThemeChange().subscribe(theme => {
            localStorage.setItem('ec-theme', theme.name);
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

        this._sessionService.shouldWarn$
            .subscribe(shouldWarn => {
                if (shouldWarn && !this.isDialogOpened) {
                    this.openDialog();
                }
            })

    }

    openDialog() {
        this.isDialogOpened = true;
        this._dialogService
            .open(SessionWarningComponent, {
                closeOnBackdropClick: false,
                closeOnEsc: false,
            })
            .onClose
            .subscribe(dialogResult => {
                this.isDialogOpened = false
                if (dialogResult) {
                    this._sessionService.refresh();
                } else {
                    this._sessionService.logout();
                }
            });
    }

    logout() {
        this._sessionService.logout();
    }

}
