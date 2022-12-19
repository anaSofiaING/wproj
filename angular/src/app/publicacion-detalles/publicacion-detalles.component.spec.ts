import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionDetallesComponent } from './publicacion-detalles.component';

describe('PublicacionDetallesComponent', () => {
  let component: PublicacionDetallesComponent;
  let fixture: ComponentFixture<PublicacionDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionDetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
