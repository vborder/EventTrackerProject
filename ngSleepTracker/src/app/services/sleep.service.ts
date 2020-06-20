import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  private baseUrl = 'http://localhost:8084';
  private url = this.baseUrl + 'api/sleeplist';

  constructor() { }

  // TODO: get, post, put, delete
}
