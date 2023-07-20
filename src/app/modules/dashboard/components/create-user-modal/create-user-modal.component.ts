import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {passwordValidator} from "../../../authentication/custom-validators";
import {ModalService} from "../../../../core/services/modal.service";
import {User} from "../../../../core/models/user";
import {NotifierService} from "angular-notifier";
import {ApiResponseStatusService} from "../../services/api-response-status.service";

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
    private fb:FormBuilder,
    private modalService:ModalService,
    private notifier: NotifierService,
    private apiStatusService: ApiResponseStatusService
  ) {
  }

  close() {
    this.modalService.closeModal('create-user-modal');
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
    return this.form.controls['role'];
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
      role: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }]
    })
  }

  createUser() {
    if(this.form.invalid) {
      this.notifier.notify('warning', 'Invalid form fields');
    }

    const newUser: User = {
      first_name: this.fnameFormControl.value,
      last_name: this.lnameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
      role: this.roleFormControl.value
    };

    this.authService.createUser(newUser).subscribe({
      next: () =>  {
        this.apiStatusService.setStatusResponse(true);
        this.notifier.notify('success', 'Successfully created User');
        this.close();
      },
      error: () => {
        this.apiStatusService.setStatusResponse(false);
        this.notifier.notify('error', "An error occured")
      }
    });
  }

  togglePass() {
    this.hidePassword = !this.hidePassword;
  }
  emailErrors() {
    if(this.emailFormControl.errors!['required']) return "Email field is required";
    if(this.emailFormControl.errors!['email']) return "Invalid email";
    return null;
  }

  passwordErrors() {
    if(this.passwordFormControl.errors!['required']) return "Password field is required";
    if(this.passwordFormControl.errors!['minlength'] || this.passwordFormControl.errors!['maxlength']) return "Password must be between 8 and 16 characters"
    if(this.passwordFormControl.errors!['passStrength']) return "Password must contain a small, a capital, a numeric and a special character";
    return null;
  }

}
