import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { passwordValidator } from '../../custom-validators';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  user:User | undefined;
  // form = this.fb.group({
  //   "email": ["", [Validators.required, Validators.email]],
  //   "password": ["", [Validators.required, Validators.minLength(8),Validators.maxLength(16)]]
  // });


  form : FormGroup

  get emailFormControl() {
    return this.form.controls['email'];
  }
  get passwordFormControl() {
    return this.form.controls['password'];
  }

  constructor(
    private authService: AuthenticationService,
    private fb:FormBuilder,
    private router:Router,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    if(
      localStorage.getItem('id') !== null &&
      localStorage.getItem('role') === 'user') {
        this.router.navigateByUrl('/quiz');
    }
    else if(
      localStorage.getItem('id') !== null &&
      localStorage.getItem('role') === 'admin') {
        this.router.navigateByUrl('/dashboard');
    }

    this.form = this.fb.group({
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: 'change'//blur, submit
      }],
      password: ['', {
        validators: [Validators.required,Validators.minLength(8),Validators.maxLength(16),passwordValidator()],          //This syntax is overall better than above one
        updateOn: 'change'////blur, submit
      }]
    })
  }

  onSubmit() {
    let currEmail = this.emailFormControl.value;
    let currPassword = this.passwordFormControl.value;

    if(this.form.invalid) {
      this.notifier.notify('warning', 'Invalid form fields');
    }

    this.authService.checkUserLogin(currEmail,currPassword).subscribe({
      next: (res:User | undefined) => {
        this.user = res;

        if(this.user) {
          sessionStorage.setItem('id', this.user.id!.toString());
          sessionStorage.setItem('role', this.user.role);
          if(this.user.role === 'user') this.router.navigateByUrl("/quiz");
          else this.router.navigateByUrl('/dashboard');
        }
        else this.notifier.notify('warning', 'Wrong credentials');
      },
      error: () => {
        this.notifier.notify('error', 'An error occured');
      }
    })
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
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

//FormBuilder is used to shorten what is originally this:
// form = new FormGroup({
//   "email": new FormControl("", [Validators.required, Validators.email]),
//   "password": new FormControl("", [Validators.required, Validators.maxLength(16)])
// })
