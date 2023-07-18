import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { SideBarComponent } from './components/side-bar/side-bar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    QuestionsComponent,
    UserInfoComponent,
    AboutComponent,
    HeaderComponent,
    SideBarComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MatIconModule
  ]
})
export class DashboardModule { }
