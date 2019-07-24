import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  @ViewChild('search', {read: ElementRef, static: true})
  search: ElementRef;

  ngOnInit() {
    this.search.nativeElement.focus();
  }
}
