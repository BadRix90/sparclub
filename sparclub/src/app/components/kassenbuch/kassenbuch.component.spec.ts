import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KassenbuchComponent } from './kassenbuch.component';

describe('KassenbuchComponent', () => {
  let component: KassenbuchComponent;
  let fixture: ComponentFixture<KassenbuchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KassenbuchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KassenbuchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
