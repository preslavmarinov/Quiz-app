import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {passwordValidator} from "../../../authentication/custom-validators";

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit{
  hidePassword = true;
  form:FormGroup;

  constructor(
    private authService:AuthenticationService,
    private fb:FormBuilder
  ) {
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
