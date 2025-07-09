import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, interval, map, merge, startWith, Subscription, tap } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { AuthService } from '@easy-craft/auth';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SessionService implements OnDestroy {

    maxCookieExpiresTime: number = environment.maxCookieExpiresTime;
    minCookieExpiresTime: number = environment.minCookieExpiresTime;
    maxUserIdleTime: number = environment.maxUserIdleTime;
    logoutCountdown: number = environment.logoutCountdown;

    /** Оставшееся время в секундах */
    readonly remaining$ = new BehaviorSubject<number | null>(null);
    /** Показывать ли предупреждение */
    readonly shouldWarn$ = this.remaining$.pipe(
        tap(remaining => {
            if (remaining !== null && remaining <= this.minCookieExpiresTime) this.logout();
        }),
        map(remaining => {
            const isCookieExpires = remaining !== null && remaining <= this.maxCookieExpiresTime && remaining > this.minCookieExpiresTime;
            const isUserIdle = this.now() - this.lastInteraction >= this.maxUserIdleTime
            return isCookieExpires || isUserIdle;
        })
    );

    private timerSub!: Subscription;
    private activitySub!: Subscription;

    private lastInteraction = this.now();

    constructor(private auth: AuthService) {

        // Отслеживаем сколько секунд осталось до окончания сессии
        this.timerSub = interval(5_000).pipe(
            startWith(0),
            map(() => this.readSessionExpiresAt()),
            map(expiresAt => expiresAt ? expiresAt - this.now() : null)
        ).subscribe(remaining => {
            this.remaining$.next(remaining)
        });

        // Отслеживаем действия пользователя: мышь, клавиатура, скролл, тач
        this.activitySub = merge(
            fromEvent(document, 'mousemove'),
            fromEvent(document, 'mousedown'),
            fromEvent(document, 'keydown'),
            fromEvent(document, 'scroll'),
            fromEvent(document, 'touchstart')
        ).pipe(
            throttleTime(5000)
        ).subscribe(() => {
            this.lastInteraction = this.now();
        });
    }

    /** Возвращает unix-timestamp истечения сессии или null */
    readSessionExpiresAt(): number | null {
        const expiresAt = document.cookie.match(/(?:^|;\s*)SESSION_EXPIRES_AT=(\d+)/);
        return expiresAt ? +expiresAt[1] : null;
    }

    refresh() {
        this.auth.refresh().subscribe();
    }

    logout() {
        this.auth.logout().subscribe();
    }

    now() {
        return Math.floor(Date.now() / 1000)
    }

    ngOnDestroy(): void {
        this.timerSub?.unsubscribe();
        this.activitySub?.unsubscribe();
    }
}
