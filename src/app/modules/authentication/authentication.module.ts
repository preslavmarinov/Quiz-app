import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    BlockCopyPasteDirective
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class AuthenticationModule { }
