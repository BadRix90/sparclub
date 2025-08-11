import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparerCardComponent } from './sparer-card.component';

describe('SparerCardComponent', () => {
  let component: SparerCardComponent;
  let fixture: ComponentFixture<SparerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
