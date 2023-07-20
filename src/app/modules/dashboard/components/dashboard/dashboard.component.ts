import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../../core/services/modal.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy{
  isSideBarOpen:boolean = false;

  constructor(public modalService:ModalService) {
  }

  ngOnInit() {
    this.modalService.addModal('create-user-modal');
    this.modalService.addModal('edit-user-modal');
  }
  ngOnDestroy() {
    this.modalService.removeModal('create-user-modal');
    this.modalService.removeModal('edit-user-modal');
  }

  toggleSideBar(value: boolean) {
    this.isSideBarOpen = value;
  }

}
