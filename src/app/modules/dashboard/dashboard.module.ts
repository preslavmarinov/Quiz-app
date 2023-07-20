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
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { CreateUserModalComponent } from './components/create-user-modal/create-user-modal.component';
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    QuestionsComponent,
    UserInfoComponent,
    AboutComponent,
    HeaderComponent,
    SideBarComponent,
    CreateUserModalComponent,
    EditUserModalComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
