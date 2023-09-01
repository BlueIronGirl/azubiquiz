import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Test} from '../../../entity/test';
import {selectMaxTestId, selectTestById} from '../../store/test/test.selectors';
import {Store} from '@ngrx/store';
import {addTest, loadTests, updateTest} from '../../store/test/test.actions';
import {Frage} from '../../../entity/frage';
import {ANSWERTYPE_MULTIPLECHOICE, ANSWERTYPE_TEXT} from '../../../entity/antwort';

@Component({
    selector: 'pn-edit-test',
    templateUrl: './edit-test.component.html',
    styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {
    testForm: FormGroup = this.formBuilder.group({
        id: [{value: ''}, Validators.required],
        version: [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(1)])],
        name: ['', Validators.required],
        beschreibung: ['', Validators.required],
        fragen: this.buildFragenArray([])
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
            this.testForm.setControl('fragen', this.buildFragenArray(newTest.fragen));
            this.testForm.patchValue(newTest);
        });
    }

    private static createEmptyTest(newId: number): Test {
        return {
            id: newId,
            version: 1,
            name: '',
            beschreibung: '',
            fragen: [
                {
                    id: 1,
                    name: '',
                    beschreibung: '',
                    hinweis: '',
                    antwortTyp: ANSWERTYPE_TEXT,
                    antworten: [
                        {
                            id: 2,
                            beschreibung: '',
                            korrekt: false,
                            korrekterAntwortText: ''
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
            if (test?.fragen) {
                this.testForm.setControl('fragen', this.buildFragenArray(test.fragen));
            }
            this.testForm.patchValue(test);
        });
    }

    private buildFragenArray(values: Frage[]): FormArray {
        return this.formBuilder.array(
            values.map(q => this.formBuilder.group({
                ...q,
                'antworten': this.buildAntwortArray(q)
            })));
    }

    private buildAntwortArray(frage: Frage): FormArray {
        return this.formBuilder.array(
            frage.antworten.map(a => this.formBuilder.group({...a,}))
        );
    }

    get fragen(): FormArray {
        return this.testForm.get('fragen') as FormArray;
    }

    antworten(indexQuestion: number): FormArray {
        return (this.fragen.at(indexQuestion) as FormGroup).get('antworten') as FormArray;
    }

    addFrageControl() {
        this.fragen.push(
            this.formBuilder.group({
                id: (this.fragen.length + 1), name: '', beschreibung: '', hinweis: '',
                antwortTyp: ANSWERTYPE_TEXT,
                antworten: this.formBuilder.array([
                    this.formBuilder.group({
                        id: 1,
                        beschreibung: '',
                        korrekt: false,
                        korrekterAntwortText: ''
                    })
                ])
            })
        );
    }

    addAntwortControl(indexQuestion: number) {
        const antwortArray: FormArray = ((this.fragen.at(indexQuestion) as FormGroup).get('antworten') as FormArray);
        antwortArray.push(this.formBuilder.group({
            id: '',
            beschreibung: '',
            korrekt: false,
            korrekterAntwortText: ''
        }));
    }

    toggleAntwortTyp(frage: AbstractControl<any>): void {
        const formgroup = frage as FormGroup;
        let newAnswerType = ANSWERTYPE_TEXT;

        if (frage.get('antwortTyp')?.value === ANSWERTYPE_TEXT) {
            newAnswerType = ANSWERTYPE_MULTIPLECHOICE;
        }

        formgroup.controls['antwortTyp'].patchValue(newAnswerType);
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
