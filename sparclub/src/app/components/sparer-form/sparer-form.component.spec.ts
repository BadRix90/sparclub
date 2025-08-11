import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparerFormComponent } from './sparer-form.component';

describe('SparerFormComponent', () => {
  let component: SparerFormComponent;
  let fixture: ComponentFixture<SparerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
