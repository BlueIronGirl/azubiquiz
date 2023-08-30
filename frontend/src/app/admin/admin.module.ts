import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DateValueAccessorModule} from "angular-date-value-accessor";
import {UsersComponent} from "./users/users.component";
import {TableModule} from "primeng/table";
import {StoreModule} from '@ngrx/store';
import * as fromUser from './store/user/user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/user/user.effects';
import {CheckboxModule} from "primeng/checkbox";
import {TestsComponent} from "./tests/tests.component";
import * as fromTest from './store/test/test.reducer';
import { TestEffects } from './store/test/test.effects';
import {TreeTableModule} from "primeng/treetable";
import {ButtonModule} from "primeng/button";
import {EditTestComponent} from "./edit-test/edit-test.component";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {SplitterModule} from "primeng/splitter";
import {FieldsetModule} from "primeng/fieldset";
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from "primeng/dropdown";


@NgModule({
  declarations: [UsersComponent, EditTestComponent, TestsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DateValueAccessorModule,
    ButtonModule,
    TableModule,
    TreeTableModule,
    CheckboxModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    CardModule,
    DividerModule,
    SplitterModule,
    FieldsetModule,
    DropdownModule,
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects, TestEffects]),
    StoreModule.forFeature(fromTest.testFeatureKey, fromTest.reducer)
  ]
})
export class AdminModule {
}
