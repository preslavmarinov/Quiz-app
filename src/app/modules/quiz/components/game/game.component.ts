import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Answers } from 'src/app/core/models/answers';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  type:string = '';
  answers:Answers = new Answers(0,0);
  questions:any[];
  curr: number = 0;
  shuffledArray:string[] = [];

  constructor(private questionService:QuestionService, private notifier: NotifierService) {}

  ngOnInit(): void {
    this.getAllQustions();
  }

  getAllQustions() {
    this.questionService.selectedType$.subscribe({
      next: (res) => {
        this.type = res;
      },

      error: (err) => {
        console.log(err);
        this.notifier.notify('error', 'Sorry, cannot get questions');
      }
    });

    if(this.type === 'random' || this.type === '') {
      this.questionService.getRandomQuestions().subscribe(res => {this.questions = res; this.answers.setTotal(res.length);});
    }
      else this.questionService.getQuestions().subscribe(res => {this.questions = res; this.answers.setTotal(res.length)});
    console.log(this.questions);
  }

  getNextQuestion(value:{count:number, ans:string}) {
    if(this.curr <this.questions.length) {
      if(this.type === 'random' && value.ans === this.questions[this.curr].correct_answer) this.answers.incrementCorrect();
      else if(this.type === 'defined' && value.ans === this.questions[this.curr].correct) this.answers.incrementCorrect();
      this.curr = value.count;
    }
  }

  tryAgain() {
    this.curr = 0;
    this.answers.setCorrect(0);
    this.getAllQustions();
  }

}
