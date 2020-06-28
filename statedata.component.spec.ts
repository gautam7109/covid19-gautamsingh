import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { statedataComponent } from './statedata.component';

describe('statedataComponent', () => {
  let component: statedataComponent;
  let fixture: ComponentFixture<statedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ statedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(statedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
