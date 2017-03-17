import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  providers: [DataService]
})
export class AppComponent {}
