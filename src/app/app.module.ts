import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateTeamComponent } from './team/dialogs/create-team/create-team.component';
import { CurrentTeamComponent } from './current-team/current-team.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { CalendarModule } from './calendar/calendar.module';
import { DiscussionComponent } from './discussion/discussion.component';
import { GdprComponent } from './gdpr/gdpr.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TeamComponent,
    CreateTeamComponent,
    CurrentTeamComponent,
    TasksComponent,
    NewTaskComponent,
    ViewTaskComponent,
    DiscussionComponent,
    GdprComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    CalendarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
