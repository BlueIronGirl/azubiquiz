import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TreeTableModule} from 'primeng/treetable';
import { HomeComponent } from './home/home.component';
import {MenubarModule} from "primeng/menubar";
import {TableModule} from "primeng/table";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from "@angular/common/http";
import {CheckboxModule} from "primeng/checkbox";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { QuizComponent } from './quiz/quiz.component';
import { QuizzeComponent } from './quizze/quizze.component';

@NgModule({
            declarations: [
              AppComponent,
              HomeComponent,
              QuizComponent,
              QuizzeComponent
            ],
            imports: [
              BrowserModule,
              BrowserAnimationsModule,
              AppRoutingModule,
              FormsModule,
              ReactiveFormsModule,
              ButtonModule,
              CheckboxModule,
              InputTextModule,
              TableModule,
              TreeTableModule,
              MenubarModule,
              HttpClientModule,
              // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
              StoreModule.forRoot({}, {}),
              StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
              EffectsModule.forRoot([])
            ],
            providers: [],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
