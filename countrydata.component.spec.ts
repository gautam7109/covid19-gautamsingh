import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDataComponent } from './countrydata.component';

describe('CountrydataComponent', () => {
  let component: CountryDataComponent;
  let fixture: ComponentFixture<CountryDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
