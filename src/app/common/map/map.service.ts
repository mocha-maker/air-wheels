import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jasmine from 'jasmine';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Rental } from 'src/app/rental/shared/rental.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // Define API
  apiURL: string = 'https://api.geoapify.com/v1/geocode/search?';

  apiKey: string = '2978d70db69944229594010dafc370bd';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getCoordinates(rental: Rental): Observable<any> {
    const { city, state, country } = rental;
    return this.http
      .get<JSON>(
        this.apiURL +
          'city=' +
          city +
          '&state=' +
          state +
          '&country=' +
          country +
          '&format=json&apiKey=' +
          this.apiKey
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
