import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparerDashboardComponent } from './sparer-dashboard.component';

describe('SparerDashboardComponent', () => {
  let component: SparerDashboardComponent;
  let fixture: ComponentFixture<SparerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
