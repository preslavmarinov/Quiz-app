import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSideBarOpen:boolean = false;
  createUserModalVisibility = false;

  toggleSideBar(value: boolean) {
    this.isSideBarOpen = value;
  }

  openCreateModal(value:boolean) {
    this.createUserModalVisibility = value;
  }

}
