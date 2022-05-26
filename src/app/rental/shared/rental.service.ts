import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {
  constructor(private http: HttpClient) {}

  public getRentalById(rentalId: number): Observable<any> {
    return this.http.get('/api/v1/rentals/' + rentalId);
  }

  public getRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals');
  }
}
