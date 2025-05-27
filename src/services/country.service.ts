import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../models/country.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CountryService {
    private urlApi: string = 'https://restcountries.com/v3.1/name';

    constructor(protected http: HttpClient) { }

    search(text: string): Observable<Country[]> {
        const url = `${this.urlApi}/${text}`
        return this.http.get<Country[]>(url)
    }
}

