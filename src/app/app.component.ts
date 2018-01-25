import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nz-layout class="layout">
    <nz-header>
      <div class="logo">nz-schema-form</div>
      <ul nz-menu [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
        <li nz-menu-item routerLink="/">Home</li>
        <li nz-menu-item routerLink="/example">Example</li>
        <li nz-menu-item routerLink="/validator">Validator</li>
        <li nz-menu-item><a href="//jsonschemalint.com" target="_blank" title="JSON Schema Lint">Lint</a></li>
        <li nz-menu-item><a href="http://json-schema.org/specification.html" target="_blank" title="JSON Schema Lint">Specification</a></li>
        <li nz-menu-item><a href="//github.com/cipchk/nz-schema-form" target="_blank" title="Fork me on GitHub">Github</a></li>
      </ul>
    </nz-header>
    <nz-content style="padding:0 50px;">
      <div style="background:#fff; padding: 24px; min-height: 280px;"><router-outlet></router-outlet></div>
    </nz-content>
  </nz-layout>
  `,
  styles  : [
      `:host ::ng-deep .logo {
      width: 120px;
      height: 31px;
      background: #333;
      border-radius: 6px;
      margin: 16px 24px 16px 0;
      float: left;
      line-height: 31px;
      text-align: center;
      color: #fff;
    }
    `
  ]
})
export class AppComponent {
}
