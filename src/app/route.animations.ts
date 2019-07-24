import {
  trigger,
  transition,
  style,
  query,
  animate,
  group
} from '@angular/animations';

export const fader =
trigger('routeAnimations', [
  transition('HomePage <=> ResultsPage', [
    query(':leave', [
      style({
        position: 'absolute',
        top: '25%',
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ opacity: 1, })
    ]),
    group([
      query(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ]),
      query(':enter', [
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ]),
  ]),
]);
