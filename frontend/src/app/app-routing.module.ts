import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CanNavigateToAdminGuard} from "./guard/can-navigate-to-admin.guard";
import {QuizComponent} from "./components/quiz/quiz.component";
import {QuizzeComponent} from "./components/quizze/quizze.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "./guard/auth-guard";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'quizze', component: QuizzeComponent, canActivate: [AuthGuard]},
    {path: 'quiz', component: QuizComponent, canActivate: [AuthGuard]},
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [CanNavigateToAdminGuard, AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        {preloadingStrategy: PreloadAllModules}
    )],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
