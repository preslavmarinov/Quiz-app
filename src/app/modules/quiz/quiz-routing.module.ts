import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeQustionsComponent } from './components/type-qustions/type-qustions.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  {path: '', component: TypeQustionsComponent},
  {path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
