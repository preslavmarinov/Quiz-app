import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-type-qustions',
  templateUrl: './type-qustions.component.html',
  styleUrls: ['./type-qustions.component.scss']
})
export class TypeQustionsComponent  {
  loggedUser:User | undefined;

  constructor(private questionService: QuestionService,private router:Router) {}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/authentication');
  }

  chooseRandom() {
    this.questionService.setTypeQuestions('random');
    this.router.navigateByUrl('/quiz/game');
  }

  chooseDefined() {
    this.questionService.setTypeQuestions('defined');
    this.router.navigateByUrl('/quiz/game');
  }


}
