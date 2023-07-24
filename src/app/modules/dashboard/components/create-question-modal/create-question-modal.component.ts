import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  enteredOptions: string[] = [];
  @ViewChild('options') optionsList: ElementRef;

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
        validators: [],
        updateOn: 'change'
      }],
      correct: ['', {
        validators: [Validators.required],
        updateOn: 'submit'
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
      console.log(this.form);
      this.notifier.notify('warning', 'Invalid form fields');
      return;
    }

    if(this.enteredOptions.length < 2) {
      this.notifier.notify('warning', 'Enter between 2 and 4 options');
      return;
    }

    const newQuestion: Question = {
      question: this.questionFormControl.value,
      options: this.enteredOptions,
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

  addOption() {
    if(this.optionsFormControl.value !== '') {
      this.enteredOptions.push(this.optionsFormControl.value);
      this.optionsFormControl.setValue('');
    }
  }

  removeOption(index:number) {
    if(this.enteredOptions[index] === this.correctFormControl.value) {
      this.correctFormControl.setValue('');
    }
    this.enteredOptions.splice(index, 1);
  }


}
