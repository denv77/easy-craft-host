import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme';
import { interval, Subscription } from 'rxjs';
import { SessionService } from '../../services/session.service';

@Component({
    standalone: true,
    imports: [NbCardModule, NbButtonModule],
    selector: 'app-session-warning',
    template: `
        <nb-card>
            <nb-card-header>Предупреждение о завершении сессии</nb-card-header>
            <nb-card-body>Ваша сессия истекает через {{ countdown }} секунд.</nb-card-body>
            <nb-card-footer class="confirm-dialog-footer">
                <button nbButton [status]="'basic'" (click)="onStay()">Остаться</button>
                <button nbButton [status]="'primary'" (click)="onLogout()">Выйти</button>
            </nb-card-footer>
        </nb-card>
    `,
    styles: `
        .confirm-dialog-footer {
            display: flex;
            gap: 0.5rem;;
        }
    `
})
export class SessionWarningComponent implements OnInit, OnDestroy {
    constructor(private dialogRef: NbDialogRef<SessionWarningComponent>,
                private sessionService: SessionService,) {
    }

    countdown = this.sessionService.logoutCountdown;
    private timerSub?: Subscription;

    ngOnInit(): void {
        this.timerSub = interval(1000).subscribe(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                this.onLogout();          // auto‑logout when timer hits zero
            }
        });
    }

    onStay() {
        this.dialogRef.close(true);
    }

    onLogout() {
        this.dialogRef.close(false);
    }

    ngOnDestroy(): void {
        this.timerSub?.unsubscribe();
    }
}
