import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public countries:Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  searchByRegion(region: Region):void {
    this.selectedRegion = region;
    this.cSer.searchRegion(region).subscribe(
      countries => {
        this.countries = countries
      }
    )
  }

  ngOnInit(): void {
    this.countries = this.cSer.cacheStore.byRegion.countries;
    this.selectedRegion = this.cSer.cacheStore.byRegion.region;
  }

  constructor(private cSer:CountriesService) {}
}
