import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./components/users/users.component";
import {TestsComponent} from "./components/tests/tests.component";
import {EditTestComponent} from "./components/edit-test/edit-test.component";

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
