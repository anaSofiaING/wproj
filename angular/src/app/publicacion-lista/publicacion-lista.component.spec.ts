import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionListaComponent } from './publicacion-lista.component';

describe('PublicacionListaComponent', () => {
  let component: PublicacionListaComponent;
  let fixture: ComponentFixture<PublicacionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
