import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject, Subject, filter, takeUntil, debounceTime, switchMap } from 'rxjs';
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-select-search',
  templateUrl: './country-select-search.component.html',
  styleUrl: './country-select-search.component.scss',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, NgxMatSelectSearchModule],
})
export class CountrySelectSearchComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() control: FormControl
  @Input() label: string | null = 'Country'
  @Input() placeholder: string = 'Type country name'

  @Output() readonly countrySelected = new EventEmitter<Country>()

  filteredCountries: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1)
  searchControl: FormControl<string> = new FormControl()

  private _country: Country | null
  searching: boolean = false

  private _filteredCountriesArray: Country[] = []
  private _onDestroy = new Subject<void>()

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this._configSearchCountry()
  }

  ngOnDestroy(): void {
    this._onDestroy.next()
    this._onDestroy.complete()
  }

  writeValue(obj: any): void {
    this.control.setValue(obj, {
      emitEvent: false,
      emitModelToViewChange: false,
      emitViewToModelChange: true,
    })
  }

  registerOnChange(fn: any): void {
    this.control.registerOnChange(fn)
  }

  registerOnTouched(fn: any): void { }

  onChange(event: any) {
    const selectedCountry = this._filteredCountriesArray.find(x => x.cca2 === event)
    this._country = selectedCountry!
    this.countrySelected.emit(this._country)
  }

  selectCountry(country: Country | null) {
    if (!country) {
      return
    }

    this.filteredCountries.next([country])
    this.searchControl.setValue(country.name.common) 
    this.searchControl.updateValueAndValidity()    
    this.control.setValue(country.cca2)

    this.countrySelected.emit(country)
  }

  clearSelection(): void {
    this.control.setValue(null, {
      emitEvent: false,
      emitModelToViewChange: false,
      emitViewToModelChange: true,
    })

    this.control.updateValueAndValidity()
    this.filteredCountries.next([])
  }

  limparContratosFiltrados(): void {
    this.filteredCountries.next([])
    this.searchControl.setValue('')
  }

  private _configSearchCountry(): void {
    this.searchControl.valueChanges
      .pipe(
        filter(search => !!search),
        takeUntil(this._onDestroy),
        debounceTime(300),
        switchMap(text => {
          this.searching = true
          return this.countryService.search(text)
        })
      )
      .subscribe({
        next: result => {
          this.filteredCountries.next(result)
          this._filteredCountriesArray = result

          if (!result.length) {
            this.clearSelection()
          }
        },
        error: () => {
          this.filteredCountries.next([])
        },
        complete: () => {
          this.searching = false
        }
      })
    
  }



}
