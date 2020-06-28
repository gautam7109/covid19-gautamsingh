import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataserverService {
  cashCountry: Observable<any>;
  cashState: Observable<any>;

  constructor(private http: HttpClient) {}
  requestServer(url, data: any = ''): Observable<any> {
    return this.http.post(url, data);
  }
  getCountryData(): Observable<any> {
    if (!this.cashCountry) {
      console.log('fetching country data from server....');
      this.cashCountry = this.http.get(
        'https://api.covid19india.org/data.json'
      );
    }
    return this.cashCountry;
  }
  getStateData(): Observable<any> {
    if (!this.cashState) {
      console.log('fetching states data from server....');
      this.cashState = this.http.get(
        'https://api.covid19india.org/v2/state_district_wise.json'
      );
    }
    return this.cashState;
  }
}