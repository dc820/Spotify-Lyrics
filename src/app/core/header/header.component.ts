import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginName = 'Login';

  constructor(private httpService: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      console.log('My hash fragment is here => ', fragment);
      if (fragment === null || fragment === undefined) {
        return;
      } else {
        this.loginName = fragment.slice(fragment.indexOf('=') + 1, fragment.indexOf('&session'));
      }
    });
  }

  login() {
    this.httpService.login();
  }
}
