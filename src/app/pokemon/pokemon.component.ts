import { Component, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from 'src/models/pokemon';
import { PokemonService } from 'src/services/pokemon-service';
import { SelectSearchComponent } from '../select-search/select-search.component';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {


  @ViewChildren("selectSearchComponent") selectSearchComponent!: QueryList<SelectSearchComponent>;
  @Output() areaForm: BehaviorSubject<FormGroup>;

  filteredPokemons: Observable<any[]>;
  selectedPokemons: Pokemon[] = [];

  form: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private pokemonService: PokemonService) {

    this.form = this.formBuilder.group({
      pokemon: []
    });

    this.areaForm = new BehaviorSubject<FormGroup>(this.form);
    this.areaForm.next(this.form);
  }


  ngOnInit(): void {
  }


  get pokemons(): FormArray {
    return this.form.get('pokemons') as FormArray;
  }

  selectedPokemon(event: any) {

    this.selectSearchComponent.last.setError('');

    let pokemons = this.selectedPokemons.filter(e => e && e.order == event.order);

    if (pokemons.length > 0) {
      this.selectSearchComponent.last.setError('Este pokémon já foi selecionado');
    }else{
      this.selectedPokemons.push(event);
      this.selectSearchComponent.last.form.get('userInput')!.setValue('');
    }
  }

  get getPokemons() {
    if (this.selectSearchComponent && this.selectSearchComponent.first.selectedElement) {
      const pokemons = this.selectSearchComponent.filter(e => e.selectedElement != '').map(e => e.selectedElement);
      return pokemons;
    }
    return null;
  }

  public get formValid() {
    return this.selectSearchComponent.filter(c => c.error != null && c.error != '').length <= 0;
  }

  pokemonFilter(expressao: string) {
    this.filteredPokemons = this.pokemonService.pokemons(expressao == "null" ? "" : expressao);
  }


}
