import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicacoesComponent } from './indicacoes.component';

describe('LoginComponent', () => {
  let component: IndicacoesComponent;
  let fixture: ComponentFixture<IndicacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
