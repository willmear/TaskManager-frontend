import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { CurrentTeamComponent } from './current-team/current-team.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { LoginActivateGuard } from './_auth/login-activate.guard';
import { GdprComponent } from './gdpr/gdpr.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'team', component: TeamComponent, canActivate:[LoginActivateGuard] },
  { path: 'team/:id', component: CurrentTeamComponent, canActivate:[LoginActivateGuard] },
  { path: 'tasks', component: TasksComponent, canActivate:[LoginActivateGuard] },
  { path: 'tasks/new', component: NewTaskComponent, canActivate:[LoginActivateGuard] },
  { path: 'tasks/:id', component: ViewTaskComponent, canActivate:[LoginActivateGuard] },
  { path: ':id/calendar', component: CalendarComponent, canActivate:[LoginActivateGuard] },
  { path: ':id/discussion', component: DiscussionComponent, canActivate:[LoginActivateGuard] },
  { path: 'gdpr', component: GdprComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
