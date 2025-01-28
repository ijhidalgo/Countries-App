import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  standalone: false,

  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?:Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cServ:CountriesService) {}

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.cServ.searchCountryByAlpha(id))
    )
    .subscribe(country =>{

      if (!country) {
        return this.router.navigateByUrl('');
      }
      console.log(country);
      return this.country = country;
    })
  }


}
