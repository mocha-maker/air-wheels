import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import moment from 'moment';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'aw-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  @Input() rental!: Rental;

  selected: any = { start: Date, end: Date };

  daterange: any;

  alwaysShowCalendars: boolean;

  public options: any = { showClearButton: true };

  constructor() {
    this.alwaysShowCalendars = true;
  }

  ngOnInit(): void {}

  chosenDates(event: Event): void {}
}
