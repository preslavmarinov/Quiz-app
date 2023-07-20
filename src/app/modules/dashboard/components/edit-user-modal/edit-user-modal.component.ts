import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {ModalService} from "../../../../core/services/modal.service";
import {passwordValidator} from "../../../authentication/custom-validators";
import {NotifierService} from "angular-notifier";
import {ApiResponseStatusService} from "../../services/api-response-status.service";
import {User} from "../../../../core/models/user";

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit{
  id:number;
  user:User;
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
    return this.form.controls['role'];
  }

  ngOnInit() {
    this.modalService.currElementId$.subscribe(res => {
      this.id=res;
    })
    this.authService.getUserById(this.id.toString()).subscribe((res:User) => {
      this.form = this.fb.group({
        fname: [res.first_name, {
          validators: [Validators.required],
          updateOn: 'change'
        }],
        lname: [res.last_name, {
          validators: [Validators.required],
          updateOn: 'change'
        }],
        email: [res.email, {
          validators: [Validators.required, Validators.email],
          updateOn: 'change'
        }],
        password: [res.password, {
          validators: [Validators.required,Validators.minLength(8),Validators.maxLength(16),passwordValidator()],
          updateOn: 'change'
        }],
        role: [res.role, {
          validators: [Validators.required],
          updateOn: 'change'
        }]
      })
    })
  }

  editUser() {
    if(this.form.invalid) {
      this.notifier.notify('warning', 'Invalid form fields');
    }

    const editedUser: User = {
      first_name: this.fnameFormControl.value,
      last_name: this.lnameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
      role: this.roleFormControl.value
    };

    this.authService.editUser(this.id,editedUser).subscribe({
      next: () =>  {
        this.apiStatusService.setStatusResponse(true);
        this.notifier.notify('success', 'Successfully edited User');
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
