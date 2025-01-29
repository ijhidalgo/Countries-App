import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  standalone: false,

  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries:Country[] = [];
  public isLoading:boolean = false;
  public initialValue: string = '';

  public searchByCapital(term: string):void {

    this.isLoading = true;

    this.cServ.searchCapital(term)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.countries = this.cServ.cacheStore.byCapital.countries;
    this.initialValue = this.cServ.cacheStore.byCapital.term;
  }

  constructor(private cServ:CountriesService) {}
}
