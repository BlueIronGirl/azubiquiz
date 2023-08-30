import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {TestsComponent} from "./tests/tests.component";
import {EditTestComponent} from "./edit-test/edit-test.component";

const routes: Routes = [
  {path: '', redirectTo: 'tests', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'tests/:id', component: EditTestComponent},
  {path: 'tests/new', component: EditTestComponent},
  {path: 'tests', component: TestsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
