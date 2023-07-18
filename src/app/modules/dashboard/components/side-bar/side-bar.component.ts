import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements AfterViewInit {
  @Output() closeSideBar = new EventEmitter<boolean>()

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngAfterViewInit(): void {
    
  }

  close() {
    this.closeSideBar.emit(false);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/authentication/login');
  }
}
