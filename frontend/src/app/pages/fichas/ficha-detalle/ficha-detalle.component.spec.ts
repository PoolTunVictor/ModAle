import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDetalleComponent } from './ficha-detalle.component';

describe('FichaDetalleComponent', () => {
  let component: FichaDetalleComponent;
  let fixture: ComponentFixture<FichaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
