import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmePopupComponent } from './filme-popup.component';

describe('FilmePopupComponent', () => {
  let component: FilmePopupComponent;
  let fixture: ComponentFixture<FilmePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
