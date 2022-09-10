import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from 'src/models/pokemon';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService extends HttpService {

    ENDPOINT = "/Pokedex"
    
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    pokemons(name: string) {
        return this.get<Pokemon[]>(`${this.ENDPOINT}?expression=${name}`);
    }

  

}