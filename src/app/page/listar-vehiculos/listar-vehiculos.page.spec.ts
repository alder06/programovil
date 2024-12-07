import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarVehiculosPage } from './listar-vehiculos.page';

describe('ListarVehiculosPage', () => {
  let component: ListarVehiculosPage;
  let fixture: ComponentFixture<ListarVehiculosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVehiculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
