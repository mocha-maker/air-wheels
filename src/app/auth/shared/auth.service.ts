import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import moment from 'moment';

const helper = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  id: string = '';
  name: string = '';
}

@Injectable()
export class AuthService {
  apiURL: string = 'api/v1/users';
  private decodedToken: any;

  constructor(private http: HttpClient) {
    const metadata = localStorage.getItem('aw_meta');
    this.decodedToken = metadata ? JSON.parse(metadata) : new DecodedToken();
  }

  private saveToken(token: string): string {
    this.decodedToken = helper.decodeToken(token);

    // Save token to local storage
    localStorage.setItem('aw_auth', token);
    localStorage.setItem('aw_meta', JSON.stringify(this.decodedToken));
    console.log(this.decodedToken);
    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData: any): Observable<any> {
    return this.http.post(this.apiURL + '/register', userData);
  }

  public login(loginData: any): Observable<any> {
    return this.http
      .post(this.apiURL + '/auth', loginData)
      .pipe(map((res: any) => this.saveToken(res.token)));
  }

  public logout() {
    console.log('Logging out user and clearing auth in localStorage');

    localStorage.removeItem('aw_auth');
    localStorage.removeItem('aw_meta');

    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string {
    return localStorage.getItem('aw_auth') || '';
  }

  public getUsername(): string {
    return this.decodedToken.name;
  }
}
