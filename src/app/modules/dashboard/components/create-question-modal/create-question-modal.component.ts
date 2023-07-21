import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionService} from "../../../../core/services/question.service";
import {NotifierService} from "angular-notifier";
import {ModalService} from "../../../../core/services/modal.service";
import {ApiResponseStatusService} from "../../services/api-response-status.service";
import {Question} from "../../../../core/models/question";

@Component({
  selector: 'app-create-question-modal',
  templateUrl: './create-question-modal.component.html',
  styleUrls: ['./create-question-modal.component.scss']
})
export class CreateQuestionModalComponent implements OnInit{
  form:FormGroup;

  constructor(
    private questionService:QuestionService,
    private notifier: NotifierService,
    private modalService: ModalService,
    private fb:FormBuilder,
    private apiStatusService: ApiResponseStatusService

  ) {
  }

  get questionFormControl() {
    return this.form.controls['question'];
  }
  get optionsFormControl() {
    return this.form.controls['options'];
  }
  get correctFormControl() {
    return this.form.controls['correct'];
  }
  get explanationFormControl() {
    return this.form.controls['explanation'];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      question: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      options: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      correct: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      explanation: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }],
    })
  }

  close() {
    this.modalService.closeModal('create-question-modal');
  }

  createQuestion() {
    if(this.form.invalid) {
      this.notifier.notify('warning', 'Invalid form fields');
    }

    const newQuestion: Question = {
      question: this.questionFormControl.value,
      options: this.optionsFormControl.value,
      correct: this.correctFormControl.value,
      explanation: this.explanationFormControl.value
    };

    this.questionService.createQuestion(newQuestion).subscribe({
      next: () =>  {
        this.apiStatusService.setStatusResponse(true);
        this.notifier.notify('success', 'Successfully created Question');
        this.close();
      },
      error: () => {
        this.apiStatusService.setStatusResponse(false);
        this.notifier.notify('error', "An error occurred");
      }
    });
  }


}
