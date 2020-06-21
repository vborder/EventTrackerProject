import { Component, OnInit } from '@angular/core';
import { Sleep } from 'src/app/models/sleep';
import { SleepService } from 'src/app/services/sleep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newSleep: Sleep = new Sleep();
  sleep: Sleep[] = [];
  selected: Sleep = null;
  editSleep: Sleep = null;

  constructor(private sleepService: SleepService, private router: Router) { }

  ngOnInit() {
    this.getAll();

  }

  getAll(): void {
    // return [...this.sleeps];
    this.sleepService.getAll().subscribe(
      data  => {
        console.log(data);
        this.sleep = data;
      },
      err => {
        console.error('Observer for an error: ' + err);
        // console.log(sleeps);
      }

    );

  }

  selectSleep(sleep) {
    this.selected = sleep;
  }

  create() {
    this.sleepService.create(this.newSleep).subscribe(
      data => {
        this.newSleep = data;
        this.getAll();
      },
      err => {
        console.error('Observer for an error: ' + err);
      }

    );
  }

  updateSleep(sleep: Sleep) {
    console.log('In homeComponentUpdate');
    console.log(sleep.id);


    this.sleepService.update(sleep).subscribe(
      updated => {
        this.reload();
        this.selected = this.editSleep;
        this.editSleep = null;
      },
      failed => {

      }

    );
    this.editSleep = null;
    this.reload();

  }

  setEditSleep(sleep: Sleep) {
    console.log('setEdit: ' + sleep);

    // this.editSleep = Object.assign({}, this.selected);
    this.editSleep = sleep;
  }

  deleteSleep(id: number) {
    this.sleepService.destroy(id).subscribe(
      deleted => {
        this.reload();
      },
      error => {
      }
    );
    this.reload();
  }

  reload() {
    console.log('reload');
    this.sleepService.getAll().subscribe(
      data => {
        this.sleep = data;
      },
      fail => {
        console.error('HomeComponent.getAll(): error retrieving sleep');
        console.error(fail);
      }
    );
  }

}
