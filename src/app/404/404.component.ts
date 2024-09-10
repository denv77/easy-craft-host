import {Component} from '@angular/core';
import {AuthService} from "@easy-craft/auth";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'ec-404',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  template: `
    <div *ngIf="user$ | async as user">
      <h4> {{ user.name }}, запрашиваемая страница не найдена!</h4>
    </div>
  `,
  styles: ``
})
export class NotFoundComponent {

  user$ = this._authService.user$;

  constructor(private _authService: AuthService) {
  }
}
