import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const SPOTIFY_ENDPOINT = 'http://localhost:3000/api/spotify/';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private authenticated: boolean;
  private loginURL: string;
  private searchURL: string;

  constructor(private http: HttpClient) { }

  login() {
    location.assign('http://localhost:4000/api/spotify/login');
  }
}
