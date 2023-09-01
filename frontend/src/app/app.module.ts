import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TreeTableModule} from 'primeng/treetable';
import {HomeComponent} from './components/home/home.component';
import {MenubarModule} from "primeng/menubar";
import {TableModule} from "primeng/table";
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CheckboxModule} from "primeng/checkbox";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {QuizComponent} from './components/quiz/quiz.component';
import {QuizzeComponent} from './components/quizze/quizze.component';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {PasswordModule} from "primeng/password";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {MessageService} from "primeng/api";
import {TokenInterceptor} from "./interceptor/token-interceptor.service";
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        QuizComponent,
        QuizzeComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
        EffectsModule.forRoot([]),

        // primeng
        ButtonModule,
        CheckboxModule,
        PasswordModule,
        InputTextModule,
        TableModule,
        TreeTableModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        ToastModule
    ],
    providers: [
        MessageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
