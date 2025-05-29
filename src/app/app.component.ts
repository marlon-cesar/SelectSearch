import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CountrySelectSearchComponent } from './country-select-search/country-select-search.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CountrySelectSearchComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AppComponent implements AfterViewInit {

  form: FormGroup


  @ViewChild('countrySelectSearch') countrySelectSearch: CountrySelectSearchComponent

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      country: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    const selectedCountry: Country = {
      name: { common: 'Brazil' },
      cca2: 'BR'
    }

    this.countrySelectSearch.selectCountry(selectedCountry)
  }

  get countryFormControl(): FormControl {
    return this.form.get('country') as FormControl
  }

  onSubmit() {
    if (this.form.valid)
      console.log(this.form.value);
  }

}
