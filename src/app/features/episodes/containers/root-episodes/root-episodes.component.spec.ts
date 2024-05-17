import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootEpisodesComponent } from './root-episodes.component';
import { HttpClientModule } from '@angular/common/http';

describe('RootEpisodesComponent', () => {
  let component: RootEpisodesComponent;
  let fixture: ComponentFixture<RootEpisodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootEpisodesComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RootEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
