import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, switchMap, tap } from 'rxjs';
import { Country } from '../../models/country.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-input-search-observable',
  imports: [AsyncPipe],
  templateUrl: './input-search-observable.component.html',
  styleUrl: './input-search-observable.component.scss',
})
export class InputSearchObservableComponent implements AfterViewInit {

  private readonly countryService = inject(CountryService);
  private readonly cdr = inject(ChangeDetectorRef);
  @ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>;

  countryList$!: Observable<Country[]>;

  ngAfterViewInit(): void {
    this.countryList$ = fromEvent(this.inputSearch.nativeElement,'input').pipe(
      map(event => (event.target as HTMLInputElement).value),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap(search => this.countryService.countryList$.pipe(
       map((countryList) => 
        countryList.filter(country => !search ? false :
          country.name.toLowerCase().includes(search.toLocaleLowerCase())))
      )),
      tap(val => console.log(val))
    )

     this.cdr.detectChanges();
  }

}
