import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../../core/services/question.service";
import {Question} from "../../../../core/models/question";
import {NotifierService} from "angular-notifier";
import {ModalService} from "../../../../core/services/modal.service";
import {ApiResponseStatusService} from "../../services/api-response-status.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit{
  questions: Question[];

  constructor(
    private questionService: QuestionService,
    private notifier: NotifierService,
    private modalService: ModalService,
    private apiStatusService: ApiResponseStatusService) {
  }

  ngOnInit() {
    this.apiStatusService.statusResp$.subscribe((res:boolean) => {
      if(res) {
        this.getQuestions();
      }
    })
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe(res => {
      this.questions = res;
    })
  }

  deleteQuestion(id:number) {
    if(confirm("Are you sure you want to delete this question?")) {
      this.questionService.deleteQuestion(id).subscribe({
        next: () => {
          this.notifier.notify('success', 'Successfully deleted question');
          this.getQuestions();
        },
        error: (err) => {
          this.notifier.notify('error', 'An error occurred');
        }
      });
    }
  }

  openModal(id:string, currElId:number = -1) {
    this.modalService.setCurrElementId(currElId);
    this.modalService.openModal(id);
  }

}
