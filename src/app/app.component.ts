import { Component } from '@angular/core';

import { SignalsDemoComponent } from './components/signals-demo/signals-demo.component';
import { DeferrableDemoComponent } from './components/deferrable-demo/deferrable-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SignalsDemoComponent, DeferrableDemoComponent],
  template: `
    <main class="container">
      <h1>Angular 17/18 New Features</h1>
      <app-signals-demo></app-signals-demo>
      <app-deferrable-demo></app-deferrable-demo>
    </main>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      h1 {
        color: #1976d2;
        margin-bottom: 2rem;
      }
    `,
  ],
})
export class AppComponent {}
