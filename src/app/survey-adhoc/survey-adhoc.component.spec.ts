import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAdhocComponent } from './survey-adhoc.component';

describe('SurveyAdhocComponent', () => {
  let component: SurveyAdhocComponent;
  let fixture: ComponentFixture<SurveyAdhocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyAdhocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyAdhocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
