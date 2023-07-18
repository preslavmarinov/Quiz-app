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
  hide:boolean = true;
  hideConfirm:boolean = true;
  form:FormGroup; 


  constructor(private authService:AuthenticationService,private router:Router,private notifier:NotifierService,private fb:FormBuilder) {}

  get fname() {
    return this.form.controls['fname'];
  }
  get lname() {
    return this.form.controls['lname'];
  }
  get email() {
    return this.form.controls['email'];
  }
  get password() {
    return this.form.controls['password'];
  }
  get passwordConfirm() {
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
    if(this.form.valid) {
      const newUser: User = {
        first_name: this.fname.value,
        last_name: this.lname.value,
        email: this.email.value,
        password: this.password.value,
        role: 'user'
      };

      this.authService.createUser(newUser).subscribe({
        next: () =>  this.router.navigateByUrl('/quiz'),
        error: () => this.notifier.notify('error', "An error occured")
      });
    }
    else {
      this.notifier.notify('warning', 'Invalid form fields');
    }
  }

  togglePass() {
    this.hide = !this.hide;
  }
  togglePassConfirm() {
    this.hideConfirm = !this.hideConfirm;
  }

  emailErrors() {
    if(this.email.errors === null) return;
    else {
      if(this.email.errors['required']) return "Email field is required";
      else return "Invalid email";
    }
  }

  passwordErrors() {
    if(this.password.errors === null) return;
    else {
      if(this.password.errors['required']) return "Password field is required";
      else if(this.password.errors['minlength'] || this.password.errors['maxlength']) return "Password must be between 8 and 16 characters" 
      else return "Password must contain a small, a capital, a numeric and a special character";
    }
  }
}
