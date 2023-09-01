import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzeComponent } from './quizze.component';

describe('QuizzeComponent', () => {
  let component: QuizzeComponent;
  let fixture: ComponentFixture<QuizzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
