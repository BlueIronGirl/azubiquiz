import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Test} from '../../shared/entities/test';
import {selectMaxTestId, selectTestById} from '../store/test/test.selectors';
import {Store} from '@ngrx/store';
import {addTest, loadTests, updateTest} from '../store/test/test.actions';
import {TestValidators} from '../shared/test-validators';
import {Question} from '../../shared/entities/question';
import {ANSWERTYPE_MULTIPLECHOICE, ANSWERTYPE_TEXT} from '../../shared/entities/answer';

@Component({
  selector: 'pn-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {
  testForm: FormGroup = this.formBuilder.group({
    id: [{value: ''}, Validators.required],
    version: [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(1)])],
    lehrjahr: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(3)]),],
    name: ['', Validators.required],
    description: ['', Validators.required],
    questions: this.buildQuestionsArray([])
  });

  edit: boolean = false;
  header: string = 'Test hinzufügen';
  marginRightStyle: string = 'margin-right: .5em';
  minWidthMinHeightStyle: string = 'display: inline-block; min-width: 140px; min-height: 50px;';
  centerVerticallyStyleClass: string = 'align-items-center';
  centerStyleClass: string = 'align-items-center justify-content-center';

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadTests());

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id >= 0) {
      this.initEdit(id);
    } else {
      this.initNew();
    }
  }

  private initNew() {
    let newId = 0;
    this.store.select(selectMaxTestId).subscribe(maxId => {
      newId = maxId + 1;
      const newTest = EditTestComponent.createEmptyTest(newId);
      this.testForm.setControl('questions', this.buildQuestionsArray(newTest.questions));
      this.testForm.patchValue(newTest);
    });
  }

  private static createEmptyTest(newId: number): Test {
    return {
      id: newId,
      version: 1,
      lehrjahr: 1,
      name: '',
      description: '',
      questions: [
        {
          id: 1,
          name: '',
          description: '',
          hint: '',
          answerType: ANSWERTYPE_TEXT,
          answers: [
            {
              id: 2,
              description: '',
              correctValue: false,
              correctAnswertext: ''
            }
          ]
        }
      ]
    };
  }

  private initEdit(id: number) {
    this.edit = true;
    this.header = 'Test editieren';

    this.store.select(selectTestById(id)).subscribe(test => {
      if (test?.questions) {
        this.testForm.setControl('questions', this.buildQuestionsArray(test.questions));
      }
      this.testForm.patchValue(test);
    });
  }

  private buildQuestionsArray(values: Question[]): FormArray {
    return this.formBuilder.array(
      values.map(q => this.formBuilder.group({
        ...q,
        'answers': this.buildAnswerArray(q)
      })), Validators.compose([TestValidators.atLeastOneElementInArray]));
  }

  private buildAnswerArray(question: Question): FormArray {
    return this.formBuilder.array(
      question.answers.map(a => this.formBuilder.group({...a,}))
    );
  }

  get questions(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

  answers(indexQuestion: number): FormArray {
    return (this.questions.at(indexQuestion) as FormGroup).get('answers') as FormArray;
  }

  addQuestionControl() {
    this.questions.push(
      this.formBuilder.group({
        id: (this.questions.length + 1), name: '', description: '', hint: '',
        answerType: ANSWERTYPE_TEXT,
        answers: this.formBuilder.array([
          this.formBuilder.group({
            id: 1,
            description: '',
            correctValue: false,
            correctAnswertext: ''
          })
        ])
      })
    );
  }

  addAnswerControl(indexQuestion: number) {
    const answerArray: FormArray = ((this.questions.at(indexQuestion) as FormGroup).get('answers') as FormArray);
    answerArray.push(this.formBuilder.group({
      id: '',
      description: '',
      correctValue: false,
      correctAnswertext: ''
    }));
  }

  toggleAnswertype(question: AbstractControl<any>): void {
    const formgroup = question as FormGroup;
    let newAnswerType = ANSWERTYPE_TEXT;

    if (question.get('answerType')?.value === ANSWERTYPE_TEXT) {
      newAnswerType = ANSWERTYPE_MULTIPLECHOICE;
    }

    formgroup.controls['answerType'].patchValue(newAnswerType);
  }

  save(): void {
    const formValue = this.testForm.getRawValue();
    const test: Test = {...formValue};

    console.table(test);

    if (this.edit) {
      this.store.dispatch(updateTest({test}));
    } else {
      this.store.dispatch(addTest({test}));
    }
  }

}
