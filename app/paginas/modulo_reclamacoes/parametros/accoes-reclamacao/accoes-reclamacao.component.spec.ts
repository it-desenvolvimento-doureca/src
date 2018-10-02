import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoesReclamacaoComponent } from './accoes-reclamacao.component';

describe('AccoesReclamacaoComponent', () => {
  let component: AccoesReclamacaoComponent;
  let fixture: ComponentFixture<AccoesReclamacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccoesReclamacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccoesReclamacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
