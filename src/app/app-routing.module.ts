import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuardDashboard, authGuardQuiz} from "./core/guards/auth-guard";

const routes: Routes = [
  {path: '', redirectTo: 'authentication', pathMatch: 'full'},
  {path: 'authentication', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: 'quiz', canActivate: [authGuardQuiz()] , loadChildren: () => import('./modules/quiz/quiz.module').then(m => m.QuizModule)},
  {path: 'dashboard',canActivate:[authGuardDashboard()], loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: '**', redirectTo: 'authentication', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
