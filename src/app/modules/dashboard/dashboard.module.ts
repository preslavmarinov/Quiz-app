import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { QuestionsComponent } from './components/questions/questions.component';
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
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import { CreateQuestionModalComponent } from './components/create-question-modal/create-question-modal.component';
import { EditQuestionModalComponent } from './components/edit-question-modal/edit-question-modal.component';
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    QuestionsComponent,
    AboutComponent,
    HeaderComponent,
    SideBarComponent,
    CreateUserModalComponent,
    EditUserModalComponent,
    CreateQuestionModalComponent,
    EditQuestionModalComponent
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
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
  ]
})
export class DashboardModule { }
