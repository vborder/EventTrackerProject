import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sleep } from '../models/sleep';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/sleeplist';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
    ) { }

  getAll() {
    return this.http.get<Sleep[]>(this.url).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('SleepService.getAll() Error retrieving sleep entries ' + err);
      })
    );

  }

  getById(sleepId: number) {
    return this.http.get<Sleep>(`${this.url}/${sleepId}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('SleepService.getById() Error retrieving sleep entry ' + err);
      })
    );

  }

  create(newSleep) {
    return this.http.post<Sleep>(this.url, newSleep).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('SleepService.create() Error creating sleep entry ' + err);
      })
    );

  }

  update(sleep: Sleep) {
    console.log('in update method');

    console.log(sleep.id);

    return this.http.put(this.url + "/" + sleep.id, sleep).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('SleepService.update() Error updating sleep entry ' + err);
      })
    );

  }

  destroy(id) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('SleepService.destroy() Error deleting sleep entry ' + err);
      })
    );

  }

}
