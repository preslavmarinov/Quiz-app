import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../../core/models/user";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {filter} from "rxjs";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements  OnInit{
  dataSource: MatTableDataSource<User>
  displayedColumns = ['id', 'first_name', 'last_name', 'email', 'password', 'role', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() createModal = new EventEmitter<boolean>();

  constructor(
    private authService: AuthenticationService,
    private notifier:NotifierService) {
  }
  ngOnInit() {
    this.getUsers();
  }

  openCreateModal() {
    this.createModal.emit(true);
  }

  getUsers() {
    this.authService.getUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<User>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilter(event:Event) {
    const filterWord = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterWord.trim().toLowerCase();
    this.dataSource.paginator?.firstPage;
  }

  deleteUser(id:number) {
    if(confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(id).subscribe({
        next: (res: {}) => {
          this.getUsers();
          this.notifier.notify('success', 'Succesfully deleted user');
        },
        error: (err) => this.notifier.notify('error', 'An error ocurred')
      });
    }
  }
}
