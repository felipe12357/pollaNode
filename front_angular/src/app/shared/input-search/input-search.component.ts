import { Component, effect, ElementRef, inject, Injector, OnInit, Signal, untracked, viewChild, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, tap } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-search',
  imports: [],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
}) export class InputSearchComponent {
  private readonly countryService = inject(CountryService);
  private readonly injector = inject(Injector);
  inputSearch = viewChild<ElementRef<HTMLInputElement>>('inputSearch');
  countryList!: Signal<Country[] | undefined>;

  /* countryList = toSignal(
    toObservable(this.inputSearch).pipe(
      filter(Boolean),
      switchMap(inputRef =>
        fromEvent<InputEvent>(inputRef.nativeElement, 'input')
      ),
      map(event => (event.target as HTMLInputElement).value),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap(search => this.countryService.countryList$.pipe(
        map(countryList => countryList.filter(country =>
          !search ? false : country.name.toLowerCase().includes(search.toLowerCase()))
        ))
      )
    ),
    { initialValue: [] }
  ); */
  

  constructor() {
    effect(() => {
      const inputSearchRef = this.inputSearch();
      untracked(() => {
        this.countryList = toSignal(fromEvent(inputSearchRef!.nativeElement,'input').pipe(
            map(event => (event.target as HTMLInputElement).value),
            distinctUntilChanged(),
            debounceTime(500),
            switchMap(search => this.countryService.countryList$.pipe(
            map((countryList) => 
              countryList.filter(country => !search ? false :
                country.name.toLowerCase().includes(search.toLocaleLowerCase())))
            )),
            tap(val => console.log(val))
          ), { initialValue: [],  injector: this.injector })
      })
    })
  }

  

}
/* export class InputSearchComponent implements OnInit {

  private readonly countryService = inject(CountryService);
  @ViewChild('inputSearch', { static: true }) inputSearch!: ElementRef<HTMLInputElement>;

  countryList!: Signal<Country[] | undefined>;
  
  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.countryList = toSignal(fromEvent(this.inputSearch.nativeElement,'input').pipe(
      map(event => (event.target as HTMLInputElement).value),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap(search => this.countryService.countryList$.pipe(
       map((countryList) => 
        countryList.filter(country => !search ? false :
          country.name.toLowerCase().includes(search.toLocaleLowerCase())))
      )),
      tap(val => console.log(val))
    ), { initialValue: [], injector: this.injector })
  }

} */
