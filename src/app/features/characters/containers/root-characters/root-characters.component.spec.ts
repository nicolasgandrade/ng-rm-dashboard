import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootCharactersComponent } from './root-characters.component';

describe('RootCharactersComponent', () => {
  let component: RootCharactersComponent;
  let fixture: ComponentFixture<RootCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootCharactersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
