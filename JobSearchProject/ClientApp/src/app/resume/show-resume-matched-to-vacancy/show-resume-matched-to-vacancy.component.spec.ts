import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResumeMatchedToVacancyComponent } from './show-resume-matched-to-vacancy.component';

describe('ShowResumeMatchedToVacancyComponent', () => {
  let component: ShowResumeMatchedToVacancyComponent;
  let fixture: ComponentFixture<ShowResumeMatchedToVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResumeMatchedToVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResumeMatchedToVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
