import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesDetailsModalComponent } from './episodes-details-modal.component';

describe('EpisodesDetailsModalComponent', () => {
  let component: EpisodesDetailsModalComponent;
  let fixture: ComponentFixture<EpisodesDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodesDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpisodesDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
