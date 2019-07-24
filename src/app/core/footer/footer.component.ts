import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from '../../route.animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    fader
  ]
})
export class FooterComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
