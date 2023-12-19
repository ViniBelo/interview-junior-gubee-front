import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareHeroesComponent } from './compare-heroes.component';

describe('CompareHeroesComponent', () => {
  let component: CompareHeroesComponent;
  let fixture: ComponentFixture<CompareHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareHeroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompareHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
