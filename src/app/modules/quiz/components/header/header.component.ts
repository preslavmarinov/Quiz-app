import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  loggedUser:User | undefined;

  constructor(private authService: AuthenticationService,private notifier:NotifierService,private router:Router) {}

  ngOnInit(): void {
    this.authService.getUserById(localStorage.getItem('id')!).subscribe({
      next: (res) => this.loggedUser = res,
      error: () => this.notifier.notify('error', 'Sorry cannot find your name')
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/authentication');
  }
}
