import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootWorkspaceComponent } from './root-workspace.component';

describe('RootWorkspaceComponent', () => {
  let component: RootWorkspaceComponent;
  let fixture: ComponentFixture<RootWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootWorkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
