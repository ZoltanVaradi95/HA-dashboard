import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BkkComponent } from './bkk.component';

describe('BkkComponent', () => {
  let component: BkkComponent;
  let fixture: ComponentFixture<BkkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BkkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BkkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
