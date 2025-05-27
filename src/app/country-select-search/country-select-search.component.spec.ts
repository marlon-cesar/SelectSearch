import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectSearchComponent } from './country-select-search.component';

describe('CountrySelectSearchComponent', () => {
  let component: CountrySelectSearchComponent;
  let fixture: ComponentFixture<CountrySelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySelectSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
