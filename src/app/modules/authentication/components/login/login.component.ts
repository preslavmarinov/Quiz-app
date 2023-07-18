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
  hide:boolean = true;
  user:User | undefined;
  // form = this.fb.group({
  //   "email": ["", [Validators.required, Validators.email]],
  //   "password": ["", [Validators.required, Validators.minLength(8),Validators.maxLength(16)]]
  // });


  form : FormGroup

  get email() {
    return this.form.controls['email'];
  }
  get password() {
    return this.form.controls['password'];
  }

  constructor(private authService: AuthenticationService,private fb:FormBuilder,private router:Router,private notifier: NotifierService) {}

  ngOnInit(): void {
    if(localStorage.getItem('id') !== null && localStorage.getItem('role') === 'user') this.router.navigateByUrl('/quiz');
    else if(localStorage.getItem('id') !== null && localStorage.getItem('role') === 'admin') console.log('admin');

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
    let currEmail = this.email.value;
    let currPassword = this.password.value;    

    if(this.form.valid) {
      this.authService.getUsers().subscribe({
        next: (res) => {
          this.user = res.find((x: User) => x.email === currEmail && x.password === currPassword);
  
          if(this.user) {
            localStorage.setItem('id', this.user.id!.toString());
            localStorage.setItem('role', this.user.role);
            if(this.user.role === 'user') this.router.navigateByUrl("/quiz");
            else console.log('admin');
          }
          else this.notifier.notify('warning', 'Wrong credentials');
        },

        error: () => {
          this.notifier.notify('error', 'An error occured');
        }
      })
    }
    else this.notifier.notify('warning', 'Invalid form fields');
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
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

//FormBuilder is used to shorten what is originally this:
// form = new FormGroup({
//   "email": new FormControl("", [Validators.required, Validators.email]),
//   "password": new FormControl("", [Validators.required, Validators.maxLength(16)])
// })


//Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$')
