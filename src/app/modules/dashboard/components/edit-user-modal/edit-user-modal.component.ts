import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {ModalService} from "../../../../core/services/modal.service";
import {passwordValidator} from "../../../authentication/custom-validators";

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit{
  hidePassword = true;
  form:FormGroup;
  id:number;

  constructor(
    private authService:AuthenticationService,
    private fb:FormBuilder,
    private modalService:ModalService
  ) {
  }

  close() {
    this.modalService.closeModal('edit-user-modal');
  }

  get fnameFormControl() {
    return this.form.controls['fname'];
  }
  get lnameFormControl() {
    return this.form.controls['lname'];
  }
  get emailFormControl() {
    return this.form.controls['email'];
  }
  get passwordFormControl() {
    return this.form.controls['password'];
  }
  get roleFormControl() {
    return this.form.controls['passwordConfirm'];
  }

  ngOnInit() {
    this.modalService.currElementId$.subscribe((res:number) => {
      this.id = res;
    })

    this.form = this.fb.group({
      fname: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      lname: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: 'change'
      }],
      password: ['', {
        validators: [Validators.required,Validators.minLength(8),Validators.maxLength(16),passwordValidator()],
        updateOn: 'change'
      }],
    })
  }
}
