import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {EcLayoutComponent} from "@easy-craft/layout";

@Component({
  selector: 'ec-root',
  standalone: true,
  imports: [RouterOutlet, EcLayoutComponent],
  template: `
    <ec-layout></ec-layout>
  `,
  styles: [],
})
export class AppComponent {

}
