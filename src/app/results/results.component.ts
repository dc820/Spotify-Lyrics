import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    // SUBSCRIBE FOR HTTP GET REQUEST TO RETRIEVE MOST RECENTLY PLAYED SONGS BY USER
  }
}
