import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  standalone: false,

  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries:Country[] = [];
  public initialValue: string = '';

  searchByCountry (val: string):void {
    this.cServ.searchCountry(val)
    .subscribe(countries => {
      this.countries = countries
    }
    )
  }

  ngOnInit(): void {
    this.countries = this.cServ.cacheStore.byCountry.countries;
    this.initialValue = this.cServ.cacheStore.byCountry.term;
  }

  constructor(private cServ:CountriesService) {}
}
