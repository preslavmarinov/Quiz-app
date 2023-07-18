import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSideBarOpen:boolean = false;

  toggleSideBar(value: boolean) {
    this.isSideBarOpen = value;
  }

}
