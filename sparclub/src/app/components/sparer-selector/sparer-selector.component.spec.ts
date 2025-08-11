import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparerSelectorComponent } from './sparer-selector.component';

describe('SparerSelectorComponent', () => {
  let component: SparerSelectorComponent;
  let fixture: ComponentFixture<SparerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparerSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
