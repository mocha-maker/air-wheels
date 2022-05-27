import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';


@Component({
  selector: 'aw-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss'],
})
export class RentalDetailComponent implements OnInit {
  public rental!: Rental;
  location!: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _rentalService: RentalService
  ) {}

  ngOnInit() {
    // Retrieve rentalId from route params
    this._activatedRoute.params.subscribe((params) => {
      this.getRental(params['rentalId']);
    });
  }

  // Get Rental Details using rental id and service
  getRental(rentalIdValue: number) {
    this._rentalService
      .getRentalById(rentalIdValue)
      .subscribe((rental: Rental) => {
        this.rental = rental;
      });
  }
}
