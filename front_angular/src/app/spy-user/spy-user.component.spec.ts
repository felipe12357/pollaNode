import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpyUserComponent } from './spy-user.component';

describe('SpyUser', () => {
  let component: SpyUserComponent;
  let fixture: ComponentFixture<SpyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpyUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpyUserComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
