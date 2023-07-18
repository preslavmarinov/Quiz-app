import { NgModule } from '@angular/core';

import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameComponent } from './components/game/game.component';
import { QustionComponent } from './components/qustion/qustion.component';
import { TypeQustionsComponent } from './components/type-qustions/type-qustions.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/header/header.component';
import { DecodeHTMLEntitiesPipe } from './pipes/decode-htmlentities.pipe';
import { Base64DecodePipe } from './pipes/base64-decode.pipe';
import { ChangeColorDirective } from './directives/change-color.directive';


@NgModule({
  declarations: [GameComponent,QustionComponent,TypeQustionsComponent, HeaderComponent, DecodeHTMLEntitiesPipe, Base64DecodePipe, ChangeColorDirective],
  imports: [
    SharedModule,
    QuizRoutingModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class QuizModule { }
