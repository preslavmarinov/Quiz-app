import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { passwordMismatch, passwordValidator } from '../../custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  hideConfirm = true;
  form:FormGroup;


  constructor(
    private authService:AuthenticationService,
    private router:Router,
    private notifier:NotifierService,
    private fb:FormBuilder) {}

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
  get passwordConfirmFormControl() {
    return this.form.controls['passwordConfirm'];
  }

  ngOnInit(): void {
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
      passwordConfirm: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }]
    }, {validators: passwordMismatch});
  }

  onSubmit() {
    if(this.form.invalid) {
      this.notifier.notify('warning', 'Invalid form fields');
    }

    const newUser: User = {
      first_name: this.fnameFormControl.value,
      last_name: this.lnameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
      role: 'user'
    };

    this.authService.createUser(newUser).subscribe({
      next: () =>  this.router.navigateByUrl('/quiz'),
      error: () => this.notifier.notify('error', "An error occured")
    });
  }

  togglePass() {
    this.hide = !this.hide;
  }
  togglePassConfirm() {
    this.hideConfirm = !this.hideConfirm;
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
