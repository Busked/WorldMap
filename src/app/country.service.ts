import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  // Get general country information
  getCountryInfo(countryCode: string): Observable<any> {
    const url = `http://api.worldbank.org/v2/country/${countryCode}?format=json&per_page=1&order=desc`;
    return this.http.get(url);
  }

  // Get GDP per capita (current US$)
  getGDPPerCapita(countryCode: string): Observable<any> {
    const url = `http://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.PCAP.CD?format=json&per_page=1&order=desc`;
    return this.http.get(url);
  }

  // Get Population Data (Total Population)
  getPopulation(countryCode: string): Observable<any> {
    const url = `http://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json&per_page=1&order=desc`;
    return this.http.get(url);
  }
}
