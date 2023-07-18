import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-qustion',
  templateUrl: './qustion.component.html',
  styleUrls: ['./qustion.component.scss']
})
export class QustionComponent implements OnChanges {
  @Input() type:string;
  @Input() question:any;
  @Input() questionNumber: number;
  @Output() next = new EventEmitter<{count:number, ans: string}>();
  chosenAnswer:string
  randomOptions:string[];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.question);
    if(this.type === 'random' || this.type === '') {
      this.randomOptions = this.shuffleArray(
        [this.question.correct_answer,
        this.question.incorrect_answers[0],
        this.question.incorrect_answers[1],
        this.question.incorrect_answers[2]
      ]);
    }
  }


  nextQuestion() : void {
    console.log(this.chosenAnswer);
    this.next.emit({count: this.questionNumber+1, ans: this.chosenAnswer});
    this.chosenAnswer = '';
  }

  onChangeAnswer(event: any) {
    this.chosenAnswer = event.value;
  }

  shuffleArray(array:string[]): string[] {
      const shuffledArray = [...array];
      let currentIndex = shuffledArray.length;
    
      while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
    
        currentIndex--;
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
      }
    
      return shuffledArray;
  }
}
