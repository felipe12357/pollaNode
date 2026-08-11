import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchObservableComponent } from './input-search-observable.component';

describe('InputSearchObservableComponent', () => {
  let component: InputSearchObservableComponent;
  let fixture: ComponentFixture<InputSearchObservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSearchObservableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSearchObservableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
