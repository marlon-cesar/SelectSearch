import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root', // <---- Adiciona isto ao serviço
  })
export class HttpService {

    protected API_URL = 'https://localhost:7143/api';

    constructor(protected httpClient: HttpClient) {
    }

    get<T>(url: string, args = {}): Observable<T> {
        return this.httpClient.get<T>(this.API_URL + url, args);
    }

    put<T>(url: string, body: any, args = {}): Observable<T> {
        return this.httpClient.put<T>(this.API_URL + url, body, args);
    }

    post<T>(url: string, body: any, args = {}): Observable<T> {
        return this.httpClient.post<T>(this.API_URL + url, body, args);
    }

    delete<T>(url: string, args = {}): Observable<T> {
        return this.httpClient.delete<T>(this.API_URL + url, args);
    }

}