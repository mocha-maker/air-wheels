import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {
  // rental list
  private rentals: Rental[] = [
    {
      id: 1,
      title: 'Inmotion V8S',
      city: 'New York, NY',
      country: 'USA',
      category: 'Suspension Wheel',
      battery: '728Wh',
      motor: '1000W',
      range: '38 mi',
      speed: 21.7,
      weight: 33,
      dailyRate: 50,
      image: 'http://via.placeholder.com/350x250',
    },
    {
      id: 2,
      title: 'MTen3',
      city: 'Los Angeles, CA',
      country: 'USA',
      category: 'Portable Wheel',
      battery: '512Wh',
      motor: '800W',
      range: '25-30 mi',
      speed: 23,
      weight: 22,
      dailyRate: 30,
      image: 'http://via.placeholder.com/350x250',
    },
    {
      id: 3,
      title: 'Begode Tesla V3',
      city: 'Toronto, ON',
      country: 'Canada',
      category: 'Advanced Wheel',
      battery: '1500Wh',
      motor: '2000W',
      range: '25-30 mi',
      speed: 31,
      weight: 48.5,
      dailyRate: 60,
      image: 'http://via.placeholder.com/350x250',
    },
  ];

  public getRentalById(rentalId: number): Observable<Rental> {
    return new Observable<Rental>((observer) => {
      setTimeout(() => {
        const foundRental = this.rentals.find((rental) => {
          return rental.id == rentalId;
        });
        console.log(foundRental);
        // Send data
        observer.next(foundRental);
      }, 500);
    });
  }

  public getRentals(): Observable<Rental[]> {
    return new Observable<Rental[]>((observer) => {
      setTimeout(() => {
        // Send data
        observer.next(this.rentals);
      }, 1000);
    });
  }
}
