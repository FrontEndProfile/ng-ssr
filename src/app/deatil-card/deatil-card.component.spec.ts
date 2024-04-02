import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatilCardComponent } from './deatil-card.component';

describe('DeatilCardComponent', () => {
  let component: DeatilCardComponent;
  let fixture: ComponentFixture<DeatilCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeatilCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeatilCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
