import { Component, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
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

  form: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private areaService: AreaService) {

    this.form = this.formBuilder.group({
      areas: this.formBuilder.array([])
    });

    this.areaForm = new BehaviorSubject<FormGroup>(this.form);
    this.areaForm.next(this.form);
  }


  ngOnInit(): void {
  }
  

  get pokemons(): FormArray {
    return this.form.get('pokemons') as FormArray;
  }

  selectedPokemon(event:any) {
    this.selectSearchComponent.last.setError('');

    let areasSelecionadas = this.selectSearchComponent.map(e => e.selectedElement);
    // let index = areasSelecionados.findIndex(e => e.id == event.id);
    if (areasSelecionadas.filter(e => e && e.id == event.id).length > 1) {
      this.selectSearchComponent.last.setError('Este pokémon já foi selecionada');
    }
  }

  get getPokemons(){
    const areas = this.selectSearchComponent.filter(e => e.selectedElement != '').map(e => e.selectedElement);
    return areas;
  }

  public get formValid() {
    return this.selectSearchComponent.filter(c => c.error != null && c.error != '').length <= 0;
  }

  filterPokemons(expressao:string){
    this.filteredPokemons = this.areaService.areas(expressao);    
  }


}
